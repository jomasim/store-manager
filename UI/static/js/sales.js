import ApiClient from './client.js'

let client = new ApiClient()

document.getElementById("checkout").addEventListener("click", createSale)


function createSale(e) {
    e.preventDefault()
    let products = []
    if (getCheckout() !== null) {
        products = JSON.parse(getCheckout())
    }

    let checkout = products.map(function(product) {
        let item = new Object()
        item.product_id = product.id
        item.item_count = product.count
        item.selling_price = product.price

        return item
    });
    let sale = new Object()
    sale.line_items = checkout
    console.log(sale)

    client.post('sales', sale)
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            console.log(payload)
            let message = payload.body.message
            if (payload.status === 401) {
                message = "you must login first"
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                document.getElementById('notification').focus()

                window.location.href = 'index.html'

            }
            if (payload.status === 201) {

                setTimeout(() => {
                    //notify create sale success message
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "success"
                    document.getElementById('notification').focus()
                    window.location.href = 'home.html'
                        // clear cart store
                    localStorage.removeItem("cart_items")
                }, 300)


            } else {
                // notify post errors 
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                document.getElementById('notification').focus()
            }

        })

}

function getCheckout() {
    return localStorage.getItem("checkout")
}