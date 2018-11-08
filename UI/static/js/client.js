let base_url = 'https://store-api-v2.herokuapp.com/api/v2/'

export default class ApiClient {

    // method set api access token 

    setToken(token) {
        localStorage.setItem("access_token", token)
    }

    //method saves retrives access token from local storage

    getToken() {
        return localStorage.getItem("access_token")
    }


    post(url, data) {
        url = base_url + url
        let token = this.getToken()
        let access_token = `Bearer ${token}`

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': access_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'POST',
            },
            body: JSON.stringify(data)
        });
    }

    get(url, data) {
        url = base_url + url
        let token = this.getToken()
        let access_token = `Bearer ${token}`

        return fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': access_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'GET',
            },
        });

    }

    put(url, data) {
        url = base_url + url
        let token = this.getToken()
        let access_token = `Bearer ${token}`

        return fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': access_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'PUT',
            },
        });
    }

    delete(url, data) {
        url = base_url + url
        let token = this.getToken()
        let access_token = `Bearer ${token}`

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': access_token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'DELETE',
            },
        });
    }

    session() {
        if (this.getToken()) {
            return true
        } else {
            return false
        }
    }
}