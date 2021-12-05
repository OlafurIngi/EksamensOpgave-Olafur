// Denne sektion er inspireret af Søren's forelæsning og videor fra Thomas på canvas

// We require file system
var fs = require("fs");

// Variables for the main path in the directory and for the user file in data

const fileOfUser = "/users.json";

const mainPathOfUser = __dirname + "/../../data";


class DB {
  constructor() {
    this.users = this.openFile(fileOfUser);
  }
 
    // Method to save file
    saveFile(fileName, contentString) {
    fs.writeFileSync(mainPathOfUser + fileName, contentString);
  }

    // Method to login from the database
    saveUser(user) {
    // This method pushes the user to the "database"
    this.users.push(user);
    this.saveFile(fileOfUser, JSON.stringify(this.users));
  }

  // Method to open file
    openFile(fileName) {
    const file = fs.readFileSync(mainPathOfUser + fileName);
    return JSON.parse(file);
  }



  // The more specific applications

  // Method to delete the user 
    deleteUser(user) {
    this.users = this.users.filter((x) => x.email != user.email);
    this.saveFile(fileOfUser, JSON.stringify(this.users));
  }

    // Method to find the user in the database
    findUser(user) {
    return this.users.find((x) => user.email == x.email);
  }
}

module.exports = new DB();
