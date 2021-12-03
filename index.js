// We require express
const express = require("express");
const app = express();



// Controllers
const userControl = require("./src/routes/routers");

// I define the port which i want the server to run on
const PORT = process.env.PORT || 3000;

// Middleware - endnu et fedt term
app.use(express.static("./src/public"));


// Middleware which decodes the body that is coming in
app.use(express.json());

// Routes for the userControl const
app.use("/users", userControl);


// We start the server and provide a message for the terminal so we know it started
app.listen(PORT, console.log("Server is running on port " + PORT ));
