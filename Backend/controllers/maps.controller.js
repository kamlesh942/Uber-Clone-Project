const mapService = require('../services/maps.service');

module.exports.getAddressCoordinates = async (req, res, next) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: "Address is required" });
    }

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports.getDistanceAndTime = async (req, res, next) => {
    try {
        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ message: "Origin and destination are required" });
        }

        const originCoords = await mapService.getAddressCoordinates(origin);
        const destinationCoords = await mapService.getAddressCoordinates(destination);

        const distanceTime = await mapService.getDistanceAndTime(
            originCoords,
            destinationCoords
        );

        return res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
    }
};

// 


const { validationResult } = require("express-validator");

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        if (!input || input.trim().length < 2) {
            return res.status(400).json({
                message: "Input must be at least 2 characters"
            });
        }

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        return res.status(200).json({
            success: true,
            suggestions
        });

    } catch (error) {
        console.error("Autocomplete Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

