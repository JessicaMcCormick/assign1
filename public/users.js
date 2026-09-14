const userList = document.getElementById("user-list");
const userForm =  document.getElementById("user-form");
const message = document.getElementById("message");

async function getUsers() {
    try{
        const response = await fetch("/users");
        if(!response.ok){
            throw new Error ("Unable to retrieve users");
        }
        const users = await response.json();
        displayUsers(users);
    }catch (error){
        console.error(error);
        message.textContent = "Unable to load users.";
    }

function displayUsers(users){
    userList.innerHTML = "";
    users.forEach(function(user){
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = user.userID;

        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.username;

        const firstnameCell = document.createElement("td");
        firstnameCell.textContent = user.firstname;

        const lastnameCell = document.createElement("td");
        lastnameCell.textContent = user.lastname;

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;

        const roleCell = document.createElement("td");
        roleCell.textContent = user.urole;


        row.appendChild(idCell);
        row.appendChild(usernameCell);
        row.appendChild(firstnameCell);
        row.appendChild(lastnameCell);
        row.appendChild(emailCell);
        row.appendChild(roleCell);

        userList.appendChild(row);
    });
}

userForm.addEventListener("submi", async function(event){
    event.preventDefault();

    const newUser = {
        username: document.getElementById("username").ariaValueMax,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        passwd:document.getElementById("email").value,
        urole: document.getElementById("urole").value
    };
    try{
        const response = await fetch("/users", {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)

    
});
const result = await response.json();
if(!response.ok){
    throw new Error(result.erro || "Unalbe to add user");
}
message.textContent = "User added successfully";
userForm.rest();
getUsers();
    }catch(error){
        console.error(error);
        message.textContent = error.message;
    }
});
}
getUsers();
