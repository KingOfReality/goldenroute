const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const {getAllPlanes}  = require('../distanceHelper/calcDis')
router.get('/',async (req, res) => {
    try {
        const planes = await getAllPlanes(); 
        res.json(planes);
    } catch (error) {
        console.error('Error fetching planes:', error);
        res.status(500).json({ error: 'Failed to fetch planes' });
    }
});

module.exports = router;
