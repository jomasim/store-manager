import ApiClient from './client.js'
let client = new ApiClient()
var products = new Array()


function getProducts() {
    client.get('products')
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            if (payload.status === 200) {
                products = payload.body.products
                updateTable(products)
            } else if (payload.status === 401) {
                // revoke token 
                client.revokeToken()

                // redirect to login page for login
                let message = "you must login first!"
                document.getElementById('notification').innerHTML = message
                document.getElementById('notification').className = "error"
                document.getElementById('notification').focus()
                    // window.location.replace('index.html')

            }

        }).catch(err => console.log(err))

}

function updateTable(products) {
    let header = tableHeader()
    let table = document.getElementById("products-table");
    table.innerHTML = header

    products.forEach(product => {
        let edit_btn = editBtn(product)
        let delete_btn = deleteBtn(product.id)
        table.innerHTML += '<tr>' +
            '<td >' + product.id + '</td>' +
            '<td >' + product.name + '</td>' +
            '<td >' + product.category + '</td>' +
            '<td >' + product.quantity + '</td>' +
            '<td >' + "Ksh " + product.price + "/=" + '</td>' +
            edit_btn + delete_btn + '</tr>'
    });

}

function deleteBtn(id) {
    var id = id
    var delete_btn = `
    <td>
       <button id="delete-product-btn" onclick="deleteRecord(${id})"><img src="static/images/delete.png"></button>
    </td
    `
    return delete_btn;
}

function editBtn(product) {
    var product = JSON.stringify(product)
    var list_string = "" + product + ""
    console.log(product)
    var edit_btn = `
                    <td>
                        <button id="edit-product-btn" onclick='updateRecord(${list_string})'>
                        <img src="static/images/edit.png"></button>
                    </td>
                `
    return edit_btn;
}

function tableHeader() {
    let header = `
                <tr>
                    <th>Product ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Quantity(in store)</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                </tr>  
             `
    return header
}

function getProductById(id) {
    let product = products.find(product => product.id === id)
    return product
}

window.onload = getProducts()

document.getElementById('edit-product-form').addEventListener('submit', updateProduct)

function updateProduct(e) {
    e.preventDefault()

    let edit_form = document.getElementById('edit-product-form')
        //get values on the form 

    let product_id = edit_form.elements.namedItem('product_id').value;
    let product_name = edit_form.elements.namedItem('name').value;
    let category = edit_form.elements.namedItem('category').value;
    let description = edit_form.elements.namedItem('description').value;
    let quantity = edit_form.elements.namedItem('quantity').value;
    let price = edit_form.elements.namedItem('price').value;


    let data = {
        "name": product_name,
        "category": category,
        description: {
            "info": description
        },
        "quantity": quantity,
        "price": price
    }

    let url = 'products/' + product_id

    client.put(url, data)
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
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