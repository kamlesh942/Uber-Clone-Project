const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedAddress = encodeURIComponent(address);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    console.log(encodedAddress);
    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

// module.exports.getDistanceAndTime = async (origin, destination) => {
//     if(!origin || !destination){
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
//     try {
//         const response = await axios.get(url);
//         if(response.data.status === 'OK'){
//             if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
//                 throw new Error('No route could be found between the origin and destination');
//             }
//             return response.data.rows[0].elements[0];
//         }
//         else{
//             throw new Error('Unable to fetch distance and time');
//         }
//     }
//     catch(err){
//         console.log(err);
//         throw err;
//     }
// }


module.exports.getDistanceAndTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    console.log(response.data);

    if (response.data.status === 'OK') {
        const leg = response.data.routes[0].legs[0];

        return {
            distance: leg.distance.text,
            duration: leg.duration.text,
            distanceValue: leg.distance.value,
            durationValue: leg.duration.value
        };
    } else {
        throw new Error('Unable to fetch distance and time');
    }
};
