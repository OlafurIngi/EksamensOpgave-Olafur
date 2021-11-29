// Constants that will be used multiple times
const express = require("express");
const router = express.Router();
const userModel = require("./../models/user");
const db = require("./../helpers/db");


// POST method to create a user, which calls the saveUser method from the db.js file.
router.post("/create", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  db.saveUser(user);
  res.status(200).send(true);
});


// POST method to log in, which calls the findUser method the db.js file
router.post("/login", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  const found = db.findUser(user);
  if (found) {
    // If the password and email of the user is the same as the password and email in the databate, send true
    if (user.password == found.password) {
      res.status(200).send(true);
    // Else send false
    } else {
      res.status(401).send(false);
    }
  } else {
    res.status(404).send(false);
  }
});

// DELETE method to delete a user, which calls the deleteUser method from the db.js file.
router.delete("/delete", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  db.deleteUser(user);
  res.status(200).send(true);
});



module.exports = router;