function addToCart(product) {
    let span = document.getElementById("cart-items");
    let items = JSON.parse(getCart())
    if (span.innerText === "") {
        span.innerText = items ? items.length : 0
    }
    var original = span.innerText
    var new_count = Number(original) + 1
    span.innerHTML = new_count
    span.className = "numberCircle"

    //save product to cart
    saveToCart(product)


}

function saveToCart(product) {
    let items = []
    if (getCart() !== null) {
        items = JSON.parse(getCart())
    }
    items.push(product)
    localStorage.setItem("cart_items", JSON.stringify(items))
}

function getCart() {
    return localStorage.getItem('cart_items')
}

function clearCart() {
    return localStorage.removeItem('cart_items')
}

function checkout(items) {
    localStorage.setItem('checkout', JSON.stringify(items))
}

function clearCheckout() {
    localStorage.removeItem('checkout')
}

function updateCartTable() {
    // clear checkout first

    clearCheckout()

    products = JSON.parse(getCart())
    var collection = []

    if (products) {

        // creates set from products
        let product_set = new Set();
        let set = products.filter(item => !product_set.has(JSON.stringify(item)) ? product_set.add(JSON.stringify(item)) : false);

        collection = set.map(function(item) {
            // get count of identical products in cart
            count = products.filter(obj => obj.id === item.id).length;
            item.count = count
                //calculate total for each item
            item.total = item.price * item.count;
            return item
        })

        // set items ready for checkout 
        checkout(collection)
    } else {
        notify = document.getElementById("notification")
        notify.innerHTML = "No items in the cart"
        notify.className = "error"
    }


    let header = `
            <tr>
                <th>Product ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        `
    let table = document.getElementById("cart-table");
    table.innerHTML = header

    collection.forEach(product => {
        table.innerHTML += '<tr>' +
            '<td >' + product.id + '</td>' +
            '<td >' + product.name + '</td>' +
            '<td >' + product.count + '</td>' +
            '<td >' + product.price + '</td>' +
            '<td >' + product.total + '</td>'
    });
}

window.onload = function(event) {
    // set cart items
    if (document.getElementById("cart-table")) {
        updateCartTable()
    }
}

if (document.getElementById("clear-cart")) {
    document.getElementById("clear-cart").addEventListener("click", clearItems)
}

function clearItems() {

    setTimeout(() => {
        clearCart()
        message = "items cleared successfully"
        document.getElementById('notification').innerHTML = message
        document.getElementById('notification').className = "success"
        window.location.href = "home.html"
    }, 300)
}