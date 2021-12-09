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

    // Here we make an asynchronized function
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // We use FormData
      const formData = new  FormData(form)

      const data = {}
      formData.forEach((value, key) => (data[key] = value))
      console.log(data);

      // The fetch request of the endpoint, it is a post method
      await fetch("products/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
    });
    

    // Button to view table of Products functionality
    let refresh = document.getElementById("refresh");
    let table = document.getElementById("table");

    refresh.addEventListener('click', async () => {
      // Write HTML directly in JS, make the table headers
      table.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Brand</th>
        <th>Photo</th>
      </tr>
      `;

      // We get the information from the database in products.json
      await fetch("products/items", {
        method: "GET",
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        // For each element produce the data of heading
        res.forEach((element) => {
          table.innerHTML += `
          <tr class='phoneTableRow'>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td>${element.brand}</td>
            <td> <img src="${element.thumbnail}" style="height:100px; width:100px;"</td>
          </tr>
          `
          });
        });
      });
    });


// View categories functionality (NOT DONE)
document.addEventListener("DOMContentLoaded", (event) => {
  category = document.getElementById("brandCategory");

  category.addEventListener("change", (event) => {
    event.preventDefault();

    const val = document.getElementById("brandCategory");
    const endpoint = "http://localhost:3000/products/category/" + val.value;

    const trs = document.getElementById(".phoneTableRow");

    for (const el of trs) {
      el.parentNode.removeChild(el);
    }

    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      // For each element produce the data of heading
      res.forEach((element) => {
        var html = "<tr class='phoneTableRow'>";
        html += `<td>${element.title}</td>`;
        html += `<td>${element.price}</td>`;
        html += `<td>${element.brand}</td>`;
        html += `<td> <img src="${element.thumbnail}" style="height:100px; width:100px;"</td>`;
        html += "</tr>";

        document.getElementById("submitForm").innerHTML += html;
        });
      })
      .catch(() => {
        window.alert("Error, try again");
      });
  });
});


// Delete your product functionality (NOT DONE)
