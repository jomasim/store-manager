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
            let message = "An error occured"
            if (payload.status === 200) {
                message = "Login Successful!"
                    // save token to localstorage
                client.setToken(payload.body.access_token)

                // set exp time
                let exp = new Date('1970-01-01T' + payload.body.exp + 'Z');
                let time = new Date()

                // add  exp to current time
                time = new Date(time.setMinutes(time.getMinutes() + exp.getMinutes()))
                client.setExpTime(time)

                //notify success on login
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "success"

                setTimeout(() => {
                    document.getElementById('notification').removeAttribute("class")
                    document.getElementById('notification').innerHTML = ""
                    window.location.href = 'home.html'
                }, 2500)

            } else {
                // notify login errors 
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                setTimeout(() => {
                    document.getElementById('notification').removeAttribute("class")
                    document.getElementById('notification').innerHTML = ""
                }, 2500)
            }

        }).catch(err => console.log(err))
}