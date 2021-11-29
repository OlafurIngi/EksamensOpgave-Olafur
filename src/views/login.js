// Code inpsired by https://www.youtube.com/watch?v=-RCnNyD0L-s

// I add an event listener to read the content
document.addEventListener("DOMContentLoaded", (event) => {
  // A constant is made to get the information of the user from the local storage
  const isUser = localStorage.getItem("user");
  // If it is a user, send user to the dashboard
  if (isUser) {
    location.href = "/";
  }

  // Make a constant for the form
  const form = document.getElementById("form")
  form.addEventListener("submit", (event) => {
    // Prevent any default action Ie. Refresh the page
    event.preventDefault();

    // defining email and password by their ID in the form, 
    // and getting the value of that input with .value 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Define the user parameter to ease workflow
    const user = {
      email: email,
      password: password,
    };

    // Inspired from this https://www.codegrepper.com/code-examples/javascript/fetch+put+request+javascript
    // Fetch the information of the user in the database
    fetch("http://localhost:3000/users/login", {

      // We use a post method to login the user
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),

    })


      // If the response is found in the JSON database, go to the dashboard
      // else prompt wrong information to the user
      // If there is an error catch it and prompt an error message
      .then((response) => response.json())
      .then((response) => {

        if (response) {

          // Here the information of the user is being saved so we stayed logged in
          localStorage.setItem("user", JSON.stringify(user));
          location.href = "/";

          // Wrong information input from the user
        } else {
          window.alert("Email or Password incorrect");
        }
      })

      // Error message if something goes wrong
      .catch(() => {
        window.alert("Error, try again");
      });
  });
});
