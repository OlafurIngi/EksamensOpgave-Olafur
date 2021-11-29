// Code inspired from https://www.youtube.com/watch?v=b91

document.addEventListener("DOMContentLoaded", (event) => {
  // Here I define the form that is related in the html file
  const form = document.getElementById("form")
  form.addEventListener("submit", (event) => {
            // Prevent any default action
            event.preventDefault();

    // defining email and password by their ID in the form     
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Define the user parameter so we can use it in our fetch statement
    const user = {
      email: email,
      password: password,
    };

    // Fetch the information of the user
    fetch("http://localhost:3000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })


      // If response is found go to login.html, if not, prompt error.
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          location.href = "/login.html";
        }
      })
      // Catch the error 
      .catch(() => {
        window.alert("Error, try again");
      });
  });
});
