import ApiClient from './client.js'


document.getElementById('login-form').addEventListener("submit", login);
document.getElementById('notification').removeAttribute("class")
let client = new ApiClient()


/* check if session still running
       and redirect to home
  */

if (client.session()) {
    window.location.href = 'home.html'
}

function login(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = { "email": email, "password": password }

    client.post('login', data)
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            let message = payload.body.message
            if (payload.status == 200) {

                // save token to localstorage
                client.setToken(payload.body.access_token)

                setTimeout(() => {
                    //notify success on login
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "success"
                    document.getElementById('notification').focus()
                    window.location.href = 'home.html'
                }, 1000)

            } else {
                // notify login errors 
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                document.getElementById('notification').focus()
            }

        }).catch(err => console.log(err))
}