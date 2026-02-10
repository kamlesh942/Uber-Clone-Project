const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');

async function getFare(pickup, destination) {
  const pickupCoords =
        typeof pickup === "string"
            ? await mapService.getAddressCoordinates(pickup)
            : pickup;

    const destinationCoords =
        typeof destination === "string"
            ? await mapService.getAddressCoordinates(destination)
            : destination;

    const distanceTime = await mapService.getDistanceAndTime(
        pickupCoords,
        destinationCoords
    );
    

    const baseFare = {
        auto : 30,
        car : 50,
        motorcycle : 20
    }
    const perKmRate = {
         auto : 10,
        car : 15,
        motorcycle : 8
    }
    const perMinRate = {
         auto : 2,
        car : 3,
        motorcycle : 1.5
    }
    // console.log("Distance and time from OSRM:", distanceTime);
    console.log("distanceTime:", distanceTime);
console.log("distance:", distanceTime?.distance, typeof distanceTime?.distance);
console.log("duration:", distanceTime?.duration, typeof distanceTime?.duration);

    const km = distanceTime.distance / 1000;
    const min = distanceTime.duration / 60;

const fare = {
        auto: baseFare.auto + perKmRate.auto * km + perMinRate.auto * min,
        car: baseFare.car + perKmRate.car * km + perMinRate.car * min,
        motorcycle:
            baseFare.motorcycle +
            perKmRate.motorcycle * km +
            perMinRate.motorcycle * min
};

    return fare;
}



module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);
    console.log("Calculated fare:", fare);
    const ride = new rideModel({
        user,
        pickup,
        destination,
        vehicleType,
        fare: fare[vehicleType]
    })
    return ride;
}


