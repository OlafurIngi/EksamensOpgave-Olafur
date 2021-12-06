// Denne sektion er inspireret af Søren's forelæsning og videor fra Thomas på canvas

// We require file system
var fs = require("fs");

// Variables for the main path in the directory and for the product file in data

const fileofProduct = "/products.json";

const mainPathOfProduct = __dirname + "/../../data";

class DBproducts {
    constructor() {
      this.products = this.openFile(fileofProduct);
    }
   
      // Method to save file
      saveFile(fileName, contentString) {
      fs.writeFileSync(mainPathOfProduct + fileName, contentString);
    }
  
     
      saveProduct(product) {
      // This method pushes the product to the "database"
      this.products.push(product);
      this.saveFile(fileofProduct, JSON.stringify(this.products));
    }
  
    // Method to open file
      openFile(fileName) {
      return JSON.parse(fs.readFileSync(mainPathOfProduct + fileName));
    }
  
  
  
    // The more specific applications
  
    // Method to delete the product 
      deleteProduct(product) {
      
      this.saveFile(fileofProduct, JSON.stringify(this.products.filter((x) => x.title != product.title)));
    }
  
      // Method to find the product in the database
      findProduct(product) {
      return this.products.find((x) => product.title == x.title);
    }
  }
  
  module.exports = new DBproducts();