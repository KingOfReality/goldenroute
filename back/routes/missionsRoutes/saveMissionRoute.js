const express = require('express');
const router = express.Router();
const helperDb = require('../../db/db_module/dbFunctions')

router.post('/saveMission', async(req, res) => {
    const { plane, threat,time } = req.body;
    if (!plane || !threat) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const newMission = await helperDb.addMission(plane,threat,time)
        res.status(201).json(newMission);
    } catch (error) {
        console.error('Error saving mission:', error);
        res.status(500).json({ error: 'Failed to save mission' });
    }
});

module.exports = router;    
