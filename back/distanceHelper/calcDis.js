const axios = require('axios');
const geolib = require('geolib');


const OPENSKY_API_URL = 'https://opensky-network.org/api/states/all';


const findNearestPlaneWithinRadius = async (threatPosition, radius) => {
    try {
        console.log('Threat Position:', threatPosition);
        console.log('Radius:', radius);
        const response = await axios.get(OPENSKY_API_URL);
        const planes = response.data.states;
        let nearestPlane = null;
        let nearestDistance = Infinity;
        planes.forEach(plane => {
            const [icao24, callsign, country, lastPosition, lastContact, longitude,latitude , altitude, onGround, velocity, heading, verticalRate, sensors, geoAltitude, squawk, spi, positionSource] = plane;
            if (latitude && longitude) {
                const distanceMeters = geolib.getDistance(
                    
                    { latitude: threatPosition.latitude, longitude: threatPosition.longitude },
                    { latitude, longitude }
                );
                const distance = distanceMeters/1000
                if (distance <= radius && distance < nearestDistance) {
                    console.log(distance)
                    nearestDistance = distance;
                    const speed = velocity * 3.6;
                    nearestPlane = { icao24, callsign, country, lastPosition, lastContact, latitude, longitude, distance, speed };
                }
            }
        });
        return nearestPlane;
    } catch (error) {
        console.error('Error fetching aircraft data:', error);
        throw new Error('Failed to fetch aircraft data.');
    }
};

const getAllPlanes = async ()=>{
    try {
        const response = await axios.get(OPENSKY_API_URL);
        const planes = response.data.states;
        const transformedPlanes = planes
            .slice(0, 50) 
            .map(plane => {
                return plane;
            });
        return transformedPlanes;
    } catch (error) {
        console.error('Error fetching aircraft data:', error);
        throw new Error('Failed to fetch aircraft data.');
    }    
}
module.exports = { findNearestPlaneWithinRadius,getAllPlanes };
