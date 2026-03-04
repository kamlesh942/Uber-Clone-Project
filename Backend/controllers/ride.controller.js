const rideService = require("../services/ride.service");

const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");

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
  const { userId, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    // res.status(201).json(ride);

    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

    // console.log("Pickup Coordinates:", pickupCoordinates); // DEBUG

    if (
      !pickupCoordinates ||
      typeof pickupCoordinates.lat !== "number" ||
      typeof pickupCoordinates.lng !== "number" ||
      Number.isNaN(pickupCoordinates.lat) ||
      Number.isNaN(pickupCoordinates.lng)
    ) {
      return res.status(400).json({
        message: "Invalid pickup coordinates",
      });
    }

    // console.log("Pickup coordinates:", pickupCoordinates);

    const captainInRadius = await mapService.getCaptainsinTheRadius(
      pickupCoordinates.lng,
      pickupCoordinates.lat,
      5,
    ); // 5 km radius
    console.log("Captains in radius:", captainInRadius);

    ride.otp = "";
    
    captainInRadius.forEach((captain) => {
      console.log("Captain:", captain._id);
      console.log("Ride:", ride._id);

      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride,
      });
    });

    return res.status(201).json({
      ride,
      captainInRadius,
    });
  } catch (error) {
    console.error("Error in createRide controller:", error);
    return res.status(500).json({ message: error.message });
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
