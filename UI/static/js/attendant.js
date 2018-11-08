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
            if (payload.status == 200) {

                setTimeout(() => {
                    //notify user sign up success message
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "success"
                    document.getElementById('notification').focus()
                }, 1000)

            } else {
                // notify sign up errors 
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                document.getElementById('notification').focus()
            }

        })


}