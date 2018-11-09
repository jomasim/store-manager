import ApiClient from './client.js'

let client = new ApiClient()
window.onload = function(event) {
    event.preventDefault();

    client.get('products')
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            if (payload.status == 200) {
                let products = payload.body.products


                let container = document.getElementById("product-listing");

                products.forEach(product => {
                    var item = card(product.name, product.description.info, product.price)
                    container.innerHTML += item;
                });
            }

        })

}

function card(title, desc, price) {
    var title = title
    var desc = desc
    var price = "Ksh " + price + "/="

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
                         <input type="button" value="ADD TO CART" name="add-cart" class="btn-add-to-cart">
                    </div>
                </div>
            `
    return card
}