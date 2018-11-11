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
                if (payload.status === 200) {

                    setTimeout(() => {
                        //notify success message
                        document.getElementById('notification').innerHTML = message
                        document.getElementById('notification').className = "success"
                        document.getElementById('notification').focus()
                    }, 1000)

                } else {
                    // notify  errors 
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "error"
                    document.getElementById('notification').focus()
                }

            })
    }

}