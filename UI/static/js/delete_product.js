function deleteRecord(id) {
    var token = localStorage.getItem("access_token")
    token = "Bearer " + token
    base_url = 'https://store-api-v2.herokuapp.com/api/v2/'

    if (confirm("are you sure you want to delete?")) {
        url = base_url + "products/" + id;
        fetch(url, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': token,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Request-Method': 'DELETE',
                },
            }).then(response => response.json().then(
                payload => ({ status: response.status, body: payload })
            ))
            .then(payload => {
                let message = payload.body.message
                message = message.charAt(0).toUpperCase() + message.slice(1);
                if (payload.status === 200) {
                    //notify success message
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "success"

                    setTimeout(() => {
                        document.getElementById('notification').removeAttribute("class")
                        document.getElementById('notification').innerHTML = ""
                    }, 2500)

                } else {
                    // notify  errors 
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "error"
                    setTimeout(() => {
                        document.getElementById('notification').removeAttribute("class")
                        document.getElementById('notification').innerHTML = ""
                    }, 2500)
                }

            })
    }

}