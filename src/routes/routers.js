// Constants that will be used multiple times
const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const productModel = require("../models/product");
const database = require("../helpers/db");
const formData = require("express-form-data");


// POST method to create a user, which calls the saveUser method from the database.js file.
router.post("/create", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  database.saveUser(user);

  res.status(200).send(true);
});


// POST method to log in, which calls the findUser method the database.js file
router.post("/login", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  const found = database.findUser(user);
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

// DELETE method to delete a user, which calls the deleteUser method from the database.js file.
router.delete("/delete", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  database.deleteUser(user);
  res.status(200).send(true);
});

// POST method to Update the user (NOT DONE)






// POST method to create a product on the home site
const photos = {
  uploadDir: "/../../data/product/uploads"
}

const products = [];

router.post("/item", formData.parse(photos), (req, res, next) => {
  let { title, price, brand, thumbnail } = req.body;
  // let thumbnail = req.files.thumbnail.path.replace('\\', '/');

  products.push({ title, price, brand, thumbnail });
  console.log(products);
  res.send();

})

router.get('/items', (req, res) => {
  res.json(products);
})




module.exports = router;