const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { genToken } = require("../auth/tokenService");
const Users = require("../users/usersModel");

router.post("/register", async (req, res) => {
  let user = req.body;
  if (!user.username || !user.password) {
    res.status(400).json({
      message: "please provide a username and password for registration"
    });
  } else {
    try {
      //Hash the password
      const hash = bcrypt.hashSync(user.password, 13);
      user.password = hash;
      // add the user to the database
      const newUser = await Users.insert(user);
      const token = genToken(newUser);
      res.status(201).json({ token });
    } catch (e) {
      res.status(201).json({ error: "could not create user" });
    }
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ message: "please provide a username and password to login" });
  } else {
    try {
      const user = await Users.findByUsername(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } catch (e) {
      res.status(500).json({ e });
    }
  }
});

module.exports = router;
