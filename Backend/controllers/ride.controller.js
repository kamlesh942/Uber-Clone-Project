const rideService = require("../services/ride.service");

const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.user) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {

    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

    if (
      !pickupCoordinates ||
      typeof pickupCoordinates.lat !== "number" ||
      typeof pickupCoordinates.lng !== "number"
    ) {
      return res.status(400).json({
        message: "Invalid pickup coordinates",
      });
    }

    const captainInRadius = await mapService.getCaptainsinTheRadius(
      pickupCoordinates.lng,
      pickupCoordinates.lat,
      5
    );

    console.log("Captains in radius:", captainInRadius);

    ride.otp = "";

    const rideWithUSer = await rideModel.findOne({ _id: ride._id }).populate("user");

    // SEND RIDE TO CAPTAINS
    for (const captain of captainInRadius) {

      if (captain.socketId) {

        console.log("Sending ride to captain:", captain._id);

        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUSer,
        });

      }

    }

    // SEND RESPONSE ONLY ONCE
    return res.status(201).json({
      ride,
      captainInRadius,
    });

  } catch (error) {

    console.error("Error in createRide controller:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }

  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (Err) {
    return res.status(500).json({ message: Err.message });
  }
};
