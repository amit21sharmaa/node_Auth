const express = require('express');
const user = require("../user.model")
const router = express.Router();

/* GET users listing. */
router.get('/',async function(req, res, next) {
    const userList = await user.find({});
    res.status(200).send({"All Users":userList});
});

module.exports = router;
