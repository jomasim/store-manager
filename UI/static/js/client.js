let base_url = 'https://store-api-v2.herokuapp.com/api/v2/'

class ApiClient {

    // method set api access token 

    constructor() {

    }

    setToken(token) {
        localStorage.setItem("access_token", token)
    }

    //method saves retrives access token from local storage

    getToken() {
        return localStorage.getItem("access_token")
    }

    revokeToken() {
        return localStorage.removeItem("access_token")
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

    get(url) {
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
            body: JSON.stringify(data)
        });
    }

    delete(url) {
        url = base_url + url
        let token = this.getToken()
        let access_token = `Bearer ${token}`
        console.log(access_token)
        console.log(url)
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

export default ApiClient