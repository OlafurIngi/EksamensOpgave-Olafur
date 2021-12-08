// Code inspired from https://www.youtube.com/watch?v=b91

document.addEventListener("DOMContentLoaded", (event) => {
    // Here I define the form that is related in the html file
    const form = document.getElementById("form")
    form.addEventListener("submit", (event) => {
              // Prevent any default action
              event.preventDefault();
  
      // defining email and password by their ID in the form, 
      // and getting the value of that input with .value   
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Define the user parameter so we can use it in our fetch statement
      const user = {
        email: email,
        password: password,
      };
  
  
      // Inspired from this https://www.codegrepper.com/code-examples/javascript/fetch+put+request+javascript
      // Fetch the information of the user
      fetch("http://localhost:3000/users/update", {
  
        // We use a post method to create the user
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
  
      })
  
        // If response is found go to login.html, if not, prompt error.
        .then((res) => res.json())
        .then((res) => {
          if (res) {
  
            location.href = "/login.html";
  
          }
        })
        // Catch the error 
        .catch(() => {
         
          window.alert("Error, try again");
  
        });
    });
  });
  