const express = require('express');
const router = express.Router();
router.post('/', async(req, res) => {
    const {distance,planeSpeed,threatSpeed} = req.body
    {/*The normal calculation of the closing time*/}    
    // const distanceNum = parseFloat(distance);
    // const speedNum = parseFloat(threatSpeed);
    // const time = distanceNum / speedNum;
    {/*Bonus*/}
    const time = distance/(Math.sqrt(planeSpeed*planeSpeed + threatSpeed*threatSpeed))// im using the formula t = d/((v1^2+v2^2)^0.5)
    res.json(parseFloat(time.toFixed(2)))
});

module.exports = router;
