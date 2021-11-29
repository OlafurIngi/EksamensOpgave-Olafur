// We make a constructor which defines what the user is supposed to contain

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}


// Export the user
module.exports = User;
