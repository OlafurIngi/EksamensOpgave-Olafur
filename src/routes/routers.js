// Constants that will be used multiple times
const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const productModel = require("../models/product");
const database = require("../helpers/db");
const databaseProducts = require("../helpers/dbprod");
const formData = require("express-form-data");
const productData = require("../../data/products");

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
  uploadDir: "/../../data/uploads"
}

router.post("/item", formData.parse(photos), (req, res) => {
  const product = new productModel(req.body.title, req.body.price, req.body.brand, req.body.thumbnail);
  databaseProducts.saveProduct(product);

  res.status(200).send(true);
});

// Get method to get table overview of all products
router.get('/items', (req, res) => {
  res.json(productData);
})

// Delete method to delete a product
router.delete("/deleteProduct", (req, res) => {
  const product = new productModel(req.body.title, req.body.price, req.body.brand, req.body.thumbnail);
  databaseProducts.deleteProduct(productData);
  res.status(200).send(true);
});


module.exports = router;