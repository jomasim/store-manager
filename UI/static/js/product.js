import ApiClient from './client.js'


document.getElementById('add-product-form').addEventListener("submit", addProduct);
document.getElementById('notification').removeAttribute("class")
let client = new ApiClient()


function addProduct(e) {
    e.preventDefault();

    let product_name = document.getElementById('product-name').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;


    let data = {
        "name": product_name,
        "category": category,
        description: {
            "info": description
        },
        "quantity": quantity,
        "price": price
    }

    client.post('products', data)
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            let message = payload.body.message
            if (payload.status == 200) {

                setTimeout(() => {
                    //notify product posting success message
                    document.getElementById('notification').innerHTML = message
                    document.getElementById('notification').className = "success"
                    document.getElementById('notification').focus()
                }, 1000)

            } else {
                // notify post errors 
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                document.getElementById('notification').focus()
            }

        })


}