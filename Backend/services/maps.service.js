const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
    if (!address) {
        throw new Error("Address is required");
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    const response = await axios.get(url, {
        headers: {
            "User-Agent": "UberCloneApp/1.0 (dev@uberclone.local)"
        }
    });

    if (!response.data || response.data.length === 0) {
        throw new Error("Location not found");
    }

    return {
        lat: Number(response.data[0].lat),
        lng: Number(response.data[0].lon)
    };
};

module.exports.getDistanceAndTime = async (origin, destination) => {
    if (
        !origin?.lat || !origin?.lng ||
        !destination?.lat || !destination?.lng
    ) {
        throw new Error("Invalid coordinates passed to OSRM");
    }

    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;

    const response = await axios.get(url);

    if (!response.data.routes || response.data.routes.length === 0) {
        throw new Error("Route not found");
    }

    const route = response.data.routes[0];

    return {
        distance_km: (route.distance / 1000).toFixed(2),
        duration_min: (route.duration / 60).toFixed(1)
    };
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Query is required");
    }

    const url = `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(input)}` +
        `&format=json` +
        `&addressdetails=1` +
        `&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "UberCloneApp/1.0 (dev@uberclone.local)"
            }
        });

        // 🔁 Convert OSM → Google Places format
        const predictions = response.data.map(place => ({
            description: place.display_name,
            place_id: place.place_id,
            structured_formatting: {
                main_text: place.name || place.display_name.split(",")[0],
                secondary_text: place.display_name
                    .split(",")
                    .slice(1)
                    .join(",")
                    .trim()
            }
        }));

        return predictions;

    } catch (error) {
        console.error("OSM Autocomplete Error:", error.message);
        throw error;
    }
};

