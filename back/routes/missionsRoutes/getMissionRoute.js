const express = require('express');
const router = express.Router();
const helperDb = require('../../db/db_module/dbFunctions')

router.get('/getAll', async(req, res) => {
    missions = await helperDb.getAllMissions()
    res.json(missions)
});

module.exports = router;    
