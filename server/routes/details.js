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
    let response = {
        status: 400,
        message: 'Some Error'
    };
    if (!id) {
        res.status(400).send(response);
    }
    const result = deleteFighterById(id);
    if (result) {
        response.status = 200;
        response.message = 'Done';
        res.status(200).send(response);
    } else {
        res.status(400).send(response);
    }
});

module.exports = router;
