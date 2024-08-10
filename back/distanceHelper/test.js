const threatPosition = { latitude: 33.9416, longitude: -118.4085 }; // LAX coordinates
const radius = 560000; // Radius in meters (50 km)
const {findNearestPlaneWithinRadius}  = require('../distanceHelper/calcDis')

findNearestPlaneWithinRadius(threatPosition, radius)
    .then(nearestPlane => {
        if (nearestPlane) {
            console.log('Nearest plane within radius:', nearestPlane);
        } else {
            console.log('No planes found within the specified radius.');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });