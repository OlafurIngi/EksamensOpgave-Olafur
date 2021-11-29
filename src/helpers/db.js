// Denne sektion er inspireret af Søren's forelæsning.

// We require file system
var fs = require("fs");

// Variables for the main path in the directory and for the user file in data

const fileOfUser = "/users.json";

const mainPath = __dirname + "/../../data";


class DB {
  constructor() {
    this.users = this.openFile(fileOfUser);
  }
 
    // Method to save file
    saveFile(fileName, contentString) {
    fs.writeFileSync(mainPath + fileName, contentString);
  }

    // Method to login from the database
    saveUser(user) {
    // This method pushes the user to the "database"
    this.users.push(user);
    this.saveFile(fileOfUser, JSON.stringify(this.users));
  }

  // Method to open file
    openFile(fileName) {
    const file = fs.readFileSync(mainPath + fileName);
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

// Det her er en singleton -- laaangt over pensum, men et ret fedt term at fyre af
module.exports = new DB();
