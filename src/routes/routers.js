// Constants that will be used multiple times
const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const productModel = require("../models/product");
const database = require("../classes/db");
const databaseProducts = require("../classes/dbprod");
const formData = require("express-form-data");
const userData = require("../../data/users");
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
  const TheUserDatabase = database.findUser(user);
  if (TheUserDatabase) {
    // If the password and email of the user is the same as the password and email in the databate, send true
    if (user.password == TheUserDatabase.password) {
      res.status(200).send(true);
    // Else send false
    } else {
      res.status(401).send(false);
    }
  } else {
    res.status(404).send(false);
  }
});

// POST method to Update the user (NOT DONE)
router.put("/update", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);

  const account = userData[user];

  if (!account) {
    return res
            .status(404)
            .json({ error: 'User not found' });
  }
  if (req.body.email) {
    account.email = req.body.password;
  }

  if (req.body.password) {
    account.password = req.body.password;
  }

  return res.status(201).json(account);
})


// DELETE method to delete a user, which calls the deleteUser method from the database.js file.
router.delete("/delete", (req, res) => {
  const user = new userModel(req.body.email, req.body.password);
  database.deleteUser(user);
  res.status(200).send(true);
});







// POST method to create a product on the home site
const photos = {
  uploadDir: "/../../data/uploads"
}

router.post("/item", formData.parse(photos), (req, res) => {
  // Define product from our model in helpers
  const product = new productModel(req.body.title, req.body.price, req.body.brand, req.body.thumbnail);
  databaseProducts.saveProduct(product);
  res.status(200).send(true);
});

// Get method to get table overview of all products
router.get('/items', (req, res) => {
  res.json(productData);
})

// Get method to get Phone category
router.get("/category", (req, res) => {
  res.json(productData);
})

// Delete method to delete a product (NOT DONE)
router.delete("/deleteProduct", (req, res) => {
  
});




module.exports = router;