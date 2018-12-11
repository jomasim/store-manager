import ApiClient from './client.js'


document.getElementById('add-attendant-form').addEventListener("submit", addAttendant);
document.getElementById('notification').removeAttribute("class")
let client = new ApiClient()


function addAttendant(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let data = {
        "name": name,
        "email": email,
        "username": username,
        "password": password
    }

    client.post('user', data)
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            let message = payload.body.message
            message = message.charAt(0).toUpperCase() + message.slice(1);
            if (payload.status === 201) {

                //notify user sign up success message
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "success"

                setTimeout(() => {
                    document.getElementById('notification').removeAttribute("class")
                    document.getElementById('notification').innerHTML = ""
                }, 2500)

            } else {
                // notify sign up errors 
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                setTimeout(() => {
                    document.getElementById('notification').removeAttribute("class")
                    document.getElementById('notification').innerHTML = ""
                }, 2500)
            }

        })
}

function getUsers() {
    client.get('user')
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            if (payload.status === 200) {
                let users = payload.body.users
                console.log(users)
                updateUsersTable(users)
            }
        })
}

function updateUsersTable(data) {
    let table = document.getElementById("users-table");
    table.innerHTML = tableHeader()
    let id = 0;
    data.forEach(user => {
        id += 1
        table.innerHTML +=
            `
                <tr>
                    <td>${id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                </tr>
            `
    });
}

function tableHeader() {
    let header = `
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>  
             `
    return header
}
window.onload = function(event) {
    if (document.getElementById("users-table")) {
        getUsers()
    }
}