const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { genToken } = require("../auth/tokenService");
const db = require("../database/dbConfig");

router.post("/register", async (req, res) => {
  const user = req.body;
  if (!user.username || !user.password) {
    res
      .status(400)
      .json({
        message: "please provide a username and password for registration"
      });
  }
});

module.exports = router;
