require = require("esm")(module /* options*/ )
const api = require('../static/js/client.js')
    //const setup = require('../../setup.js')


const ApiClient = api.default
    // const LocalStorageMock = setup.default
    // global.localstorage = {}


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