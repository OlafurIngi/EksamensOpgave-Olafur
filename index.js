// We require express

const express = require("express");
const app = express();

// Controllers
const userController = require("./src/controllers/user-controller");

const PORT = process.env.PORT || 3000;

// Middleware - endnu et fedt term
app.use(express.static("./src/views"));
// Kommer som string -> JSON
app.use(express.json());

// Routes
app.use("/users", userController);


// We start the server and provide a message for the terminal so we know it started
app.listen(PORT, console.log("Server is running on port " + PORT ));
