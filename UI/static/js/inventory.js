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
                let edit_btn = `
                        <td>
                            <a href="#" class="isDisabled"><img src="static/images/edit.png"></a>
                         </td>
                        `

                let delete_btn = `
                         <td>
                            <a href="#" class="isDisabled"><img src="static/images/delete.png"></a>
                         </td>
                        `

                let table = document.getElementById("products-table");
                table.innerHTML = header

                products.forEach(product => {
                    table.innerHTML += '<tr>' +
                        '<td >' + product.id + '</td>' +
                        '<td >' + product.name + '</td>' +
                        '<td >' + product.category + '</td>' +
                        '<td >' + product.quantity + '</td>' +
                        '<td >' + "Ksh " + product.price + "/=" + '</td>' +
                        edit_btn + delete_btn + '</tr>'
                });
            }

        })

}