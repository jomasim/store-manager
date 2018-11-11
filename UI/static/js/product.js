import ApiClient from './client.js'


document.getElementById('add-product-form').addEventListener("submit", addProduct);
document.getElementById('notification').removeAttribute("class")
let client = new ApiClient()


export function addProduct(e) {
    e.preventDefault();
    let add_form = document.getElementById('add-product-form')

    let product_name = add_form.elements.namedItem('product-name').value;
    let category = add_form.elements.namedItem('category').value;
    let description = add_form.elements.namedItem('description').value;
    let quantity = add_form.elements.namedItem('quantity').value;
    let price = add_form.elements.namedItem('price').value;


    let data = {
        "name": product_name,
        "category": category,
        description: {
            "info": description
        },
        "quantity": quantity,
        "price": price
    }
    console.log(data)
    client.post('products', data)
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            console.log(payload)
            let message = payload.body.message
            if (payload.status === 201) {

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