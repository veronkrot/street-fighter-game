const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const fighters = require('../resources/api/fighters');
  if (fighters) {
    res.send(fighters);
  } else {
    res.status(400).send('Some error');
  }
});

module.exports = router;
