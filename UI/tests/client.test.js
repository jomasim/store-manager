require = require("esm")(module /* options*/ )
const api = require('../static/js/client.js')
    //const setup = require('../../setup.js')


const ApiClient = api.default
    // const LocalStorageMock = setup.default
    // global.localstorage = {}


const client = new ApiClient()
const token = "@hhre5ytrytuyu"


describe('AuthTests', function() {


    let fetchMock;
    let assignMock;

    beforeEach(() => {
        document.body.innerHTML += `
        <div id="notification">
        </div>
        <form>
        <input type="email" value="johndoe@gmail.com">
        <input type="passoword" value="123456" >
        <input type="submit" id="submit">
        </form>

        `

        fetchMock = jest.spyOn(global, 'fetch')
        fetchMock.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ Message: "login successful" })
        }));

    })
    afterEach(() => {
        fetchMock.mockRestore();
        jest.resetModules();
    })


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

    it('test login with invalid email', async() => {
        fetchMock = jest.spyOn(global, 'fetch')
        fetchMock.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ 'Message': 'user with email does not exist' })
        }))

        document.getElementById('submit').click()
            // expect(fetchMock).toHaveBeenCalled()

    })
});