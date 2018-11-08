import ApiClient from './client.js'

document.getElementById('login').addEventListener("click", function(event) {
    console.log("starting")
})

console.log("starting")
let client = new ApiClient()

let data = { "email": "support@gmail.com", "password": "123456" }

client.post('login', data)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })