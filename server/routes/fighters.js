const express = require('express');
const router = express.Router();

const {getFighters} = require('../services/fighters.services');

router.get('/fighters.json', function (req, res, next) {
    const fighters = getFighters();
    if (fighters) {
        res.send(fighters);
    } else {
        res.status(400).send('Some error');
    }
});

module.exports = router;
