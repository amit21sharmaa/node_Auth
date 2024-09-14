const express = require('express');
const user = require("../user.model")
const bycrpt = require("bcryptjs");
const { nanoid } = require('nanoid');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
