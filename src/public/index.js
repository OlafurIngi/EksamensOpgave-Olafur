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


    // Inspired from this https://www.codegrepper.com/code-examples/javascript/fetch+put+request+javascript
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
      .then((res) => res.json())
      .then((res) => {
        if (res) {
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


// Button to logout of account
document.addEventListener("DOMContentLoaded", (event) => {
  // Define the form for logout
  const form = document.getElementById("logout")

  // Add event listener to the form in form of an event
  form.addEventListener("submit", (event) => {

    // Prevent default action
    event.preventDefault();

    // Removes the user from the localstorage on the page
    localStorage.removeItem("user");
    // Sends you back to the login page
    location.href = "login.html";
  });

});

// Submit form functionality and table view of products functionality
document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("submitForm")


    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new  FormData(form)

      const data = {}
      formData.forEach((value, key) => (data[key] = value))
      console.log(data);

      await fetch("products/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
    });
    

    let refresh = document.getElementById("refresh");
    let list = document.getElementById("list");

    refresh.addEventListener('click', async () => {
      list.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Brand</th>
        <th>Photo</th>
      </tr>
      `;

      await fetch("products/items", {
        method: "GET",
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        res.forEach((e) => {
          list.innerHTML += `
          <tr>
            <td>${e.title}</td>
            <td>${e.price}</td>
            <td>${e.brand}</td>
            <td> <img src="${e.thumbnail}" style="height:100px; width:100px;"</td>
          </tr>
          `
        })
          
        });
      });
    });


// Delete your product functionality (NOT DONE)