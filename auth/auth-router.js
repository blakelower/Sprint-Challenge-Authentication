const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./auth-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();
    const validPassword = await bcrypt.compare(password, user.password);
    if (user && validPassword) {
      const token = token(user);
      res
        .header("authorization", token)
        .status(200)
        .json({
          token,
          message: `Hi ${user.username}! Welcome to Dad Jokes`,
        });
    } else {
      res.status(401).json({ message: "Invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

function token(user) {
  const payload = {
    username: user.username,
  };
  const secret = process.env.JWT_SECRET || "its a secret";

  const options = {
    expiresIn: "2h",
  };
  return jwt.sign(payload, secret, options);
}
module.exports = router;
