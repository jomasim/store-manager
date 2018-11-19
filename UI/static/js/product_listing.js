import ApiClient from './client.js'

let client = new ApiClient()
window.onload = function(event) {
    event.preventDefault();
    let container = document.getElementById("product-listing");
    client.get('products')
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            if (payload.status === 200) {
                let products = payload.body.products;
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
    var quantity = product.quantity ? product.quantity : 0

    var product = JSON.stringify(product)
    var list_string = " " + product + " "


    let card = `
                <div class="card">
                    <img src="static/images/shoes.jpeg"> 
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    <h1>${price}</h2>
                    <button onclick='addToCart(${list_string})'>Add to Cart</button>
                    <h3>Available(${quantity})</h3>
                </div>
            `
    return card
}

document.getElementById("search-product").addEventListener("keyup", searchProduct)


function searchProduct(e) {
        // get search text from search input
    let search_text = document.getElementById("search-product").value.toLowerCase();
    //collect all items with class card
    let products = document.getElementsByClassName("card");
    console.log(products[0])
    for (let x = 0; x < products.length; x++) {
        if (products[x].innerText.toLowerCase().includes(search_text)) {
            // display found products
            products[x].style.display = "flex"
        } else {
            products[x].style.display = "none"
        }

    }
}