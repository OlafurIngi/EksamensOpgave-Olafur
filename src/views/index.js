// Code inspired from https://www.youtube.com/watch?v=-RCnNyD0L-s

// Add event listener that says if the user, which is stored in the database, 
// is not an user, send user back to login.html
document.addEventListener("DOMContentLoaded", (event) => {
  const user = localStorage.getItem("user");
  if (!user) {
    location.href = "/login.html";
  }

  // This is the event which deletes the user.

  // here we define the form ("delete") for delete
  const form = document.getElementById("delete")
 form.addEventListener("submit", (event) => {

    // Prevent any default action
    event.preventDefault();

    // Create a constant for the logged in user in the json database
    const user = JSON.parse(localStorage.getItem("user"));


    // Fetch the endpoint
    fetch("http://localhost:3000/users/delete", {
      // Here it is a delete method because we delete the user
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    // if there is a response, remove the user from the json database,
    // and locate back to the login.html page
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.removeItem("user");
          location.href = "/login.html";
        }
      })
      // if there is an error catch it with a window alert message
      .catch(() => {
        window.alert("Error, try again");
      });
  });
});


document.getElementById("logout").addEventListener("submit", (event) => {
  event.preventDefault();
  Storage.removeItem("user");
  location.href = "login.html";
});