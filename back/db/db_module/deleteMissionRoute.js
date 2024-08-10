const express = require('express');
const router = express.Router();
const helperDb = require('../../db/db_module/dbFunctions')
const {deleteMission} = require('../../db/db_module/dbFunctions')
router.delete('/deleteOperation/:id', async(req, res) => {
    const {id} = req.params;
    await deleteMission(id)
    res.status(200).json({ message: `Delete operation successful for id: ${id}` });

});

module.exports = router;    
