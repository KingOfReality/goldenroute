const express = require('express');
const {findNearestPlaneWithinRadius}  = require('../distanceHelper/calcDis')
const router = express.Router();

router.post('/', async(req, res) => {
    const { radius, speed, position } = req.body;
    const latitude = position[0];
    const longitude = position[1];
    const threatPosition = { latitude, longitude };
    
    const nearestPosition =  await findNearestPlaneWithinRadius(threatPosition, radius);
    if (nearestPosition) {
        res.json(nearestPosition);
    } else {
        res.json({}); 
    }

});

module.exports = router;
