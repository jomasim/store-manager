import ApiClient from './client.js'

let client = new ApiClient()
window.onload = function(event) {
    event.preventDefault();

    client.get('products')
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            if (payload.status === 200) {
                let products = payload.body.products


                let container = document.getElementById("product-listing");

                products.forEach(product => {
                    var item = card(product)
                    container.innerHTML += item;
                });
            }

        })

}

function card(product) {
    var title = product.name
    var desc = product.description.info
    var price = "Ksh " + product.price + "/="

    var product = JSON.stringify(product)
    var list_string = " " + product + " "


    let card = `
                <div class="card">
                    <img src="static/images/shoes.jpeg" class="product">
                    <hr class="break">
                    <div class="description">
                        <h4>${title}</h4>
                        <p>
                            ${desc}
                        </p>
                        <h2>${price}</h2>
                    </div>
                    <div>
                         <button id="add-cart-btn" class="btn-add-to-cart" onclick='addToCart(${list_string})' >ADD TO CART
                         </button>
                    </div>
                </div>
            `
    return card
}