const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { genToken } = require("../auth/tokenService");

router.post("/register", (req, res) => {});

module.exports = router;
