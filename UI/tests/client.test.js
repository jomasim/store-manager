const ApiClient = require('../static/js/client.js')

const client = new ApiClient()
const token = "@hhre5ytrytuyu"

describe('AuthTests', function() {

    it('test retrieve saved token', function() {
        client.setToken(token)
        retrieved = client.getToken()
        expect(retrieved).toBe(token)
    })

    it('test delete token', function() {
        client.revokeToken()
        retrieved = client.getToken()
        expect(retrieved).toBe(null)
    })
});