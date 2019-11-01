const express = require('express');
const router = express.Router();
const fs = require('fs');

const {getFighterById, deleteFighterById} = require('../services/fighters.services');

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    const fighter = getFighterById(id);
    if (fighter) {
        res.send(fighter);
    } else {
        res.status(400).send('Some error');
    }
});

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send('Some error');
    }
    const result = deleteFighterById(id);
    if (result) {
        res.status(200).send("Done");
    } else {
        res.status(400).send('Some error');
    }
});

module.exports = router;
