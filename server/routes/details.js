const express = require('express');
const router = express.Router();

const {getFighterById} = require('../services/fighters.services');

router.get('/fighter/:id.json', function (req, res, next) {
    const id = req.params.id;
    const fighter = getFighterById(id);
    if (fighter) {
        res.send(fighter);
    } else {
        res.status(400).send('Some error');
    }
});

module.exports = router;
