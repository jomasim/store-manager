import ApiClient from './client.js'

let client = new ApiClient()

if (document.getElementById("checkout")) {
    document.getElementById("checkout").addEventListener("click", createSale)
}

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

if (document.getElementById("sales-table")) {
    window.onload = getSales();
}

function getSales() {
    client.get('sales')
        .then(response => response.json().then(
            payload => ({ status: response.status, body: payload })
        ))
        .then(payload => {
            if (payload.status === 200) {
                let sales = payload.body.sales
                console.log(sales)
                updateSalesTable(sales)
            }
        })
}

function salesHeader() {
    let header = `
    <tr>
        <th>Sale ID</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
        <th></th>
        <th></th>
    </tr>
    `
    return header
}

function updateSalesTable(sales) {
    let table = document.getElementById("sales-table");
    let header = salesHeader();
    table.innerHTML = header
    sales.forEach(sale => {
        let date = getParsedDate(sale.create_at)
            //divider
        table.innerHTML += '<tr class="divider">' +
            '<td colspan="5" >' + '</td>' +
            '<td>' + "Attendant :" + sale.created_by + '</td>' +
            '<td>' + date + '</td>' +
            '</tr>'

        sale.line_items.forEach(line_item => {
            let selling_price = "Ksh " + line_item.selling_price + "/="
            let total = Number(line_item.item_count) * Number(line_item.selling_price);
            total = "Ksh " + total + "/="

            table.innerHTML +=
                `
                <tr>
                    <td>${sale.id}</td>
                    <td>${line_item.product_id}</td>
                    <td>${line_item.item_count}</td>
                    <td>${selling_price}</td>
                    <td>${total}</td>
                    <td></td>
                    <td></td>
                </tr>
            `
        })
    });

}

function getParsedDate(raw_date) {
    let date = new Date(Date.parse(raw_date))
    date = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + " \
    " + date.getUTCHours() + ":" + date.getMinutes()

    return date
}