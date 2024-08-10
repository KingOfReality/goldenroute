const express = require('express');
const router = express.Router();
const { deleteMission } = require('../../db/db_module/dbFunctions');

router.delete('/deleteOperation/:id', async (req, res) => {
    const { id } = req.params;
    const intId = parseInt(id, 10);

    if (isNaN(intId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        await deleteMission(intId);
        res.status(200).json({ message: `Delete operation successful for id: ${id}` });
    } catch (error) {
        res.status(500).json({ message: `Error deleting mission: ${error.message}` });
    }
});

module.exports = router;
