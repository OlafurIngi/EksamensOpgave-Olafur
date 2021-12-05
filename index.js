// We require express
const express = require("express");
const app = express();

var FormData = require("form-data")


// Controllers
const routers = require("./src/routes/routers");

// I define the port which i want the server to run on
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("./src/public"));

app.use(express.static("./data/product/uploads"));


// Middleware which decodes the body that is coming in
app.use(express.json());

// Routes for the routers const
app.use("/users", routers);

app.use("/products", routers);


// We start the server and provide a message for the terminal so we know it started
app.listen(PORT, console.log("Server is running on port " + PORT ));
