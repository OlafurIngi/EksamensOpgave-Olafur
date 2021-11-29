// We require express
const express = require("express");
const app = express();



// Controllers
const userController = require("./src/controllers/user-controller");

// I define the port which i want the server to run on
const PORT = process.env.PORT || 3000;

// Middleware - endnu et fedt term
app.use(express.static("./src/views"));


// Middleware which decodes the body that is coming in
app.use(express.json());

// Routes for the userControl const
app.use("/users", userController);


// We start the server and provide a message for the terminal so we know it started
app.listen(PORT, console.log("Server is running on port " + PORT ));
