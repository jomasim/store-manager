import ApiClient from './client.js'


let client = new ApiClient()
let url = window.location.href;
var route_name = url.substr(url.lastIndexOf('/') + 1);

if (!client.session() && route_name !== "index.html") {
    // notify session errors 
    let message = "you must login first!"
    document.getElementById('notification').innerHTML = message
    document.getElementById('notification').className = "error"
    document.getElementById('notification').focus()
    window.location.href = 'index.html'

}

if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener("click", logout)
}

function logout() {
    client.revokeToken()
    localStorage.removeItem("exp")
    let message = "logged out successfully"
    setTimeout(() => {
        //notify logout success message
        document.getElementById('notification').innerHTML = message
        document.getElementById('notification').className = "success"
        document.getElementById('notification').focus()
        window.location.href = 'index.html'
    }, 100)
}