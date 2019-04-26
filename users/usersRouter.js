const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { genToken } = require("../auth/tokenService");
const Users = require("../users/usersModel");
const { dumpError } = require("../utils/dumpError");

router.post("/register", async (req, res) => {
  let userInfo = req.body;
  //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties

  //check for credentials
  if (!userInfo.username || !userInfo.password) {
    res.status(400).json({
      message: "please provide a username and password for registration"
    });
  } else {
    try {
      //Hash the password
      const hash = bcrypt.hashSync(userInfo.password, 13);
      userInfo.password = hash;

      // add the user to the database
      const newUser = await Users.insert(userInfo);

      //generate token
      const token = genToken(newUser);

      //return token
      res.status(201).json({ token });
    } catch (e) {
      dumpError(e);
      https: res.status(500).json({ error: "could not create user" });
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

//get info about single user
router.get("/:user", (req, res) => {});

module.exports = router;
