const express = require('express');
const { authJWT } = require('../middleware/app.logger');
const router = express.Router();

router.get("/logout", function (req, res) {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  });