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

function getCheckout() {
    return localStorage.getItem('checkout')
}

function clearCheckout() {
    localStorage.removeItem('checkout')
}

function getCartData() {
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
    }
    return collection;
}

function updateCartTable(collection) {
    // clear checkout first

    clearCheckout()

    if (collection) {
        // set items ready for checkout 
        checkout(collection)
    } else {
        notify = document.getElementById("notification")
        notify.innerHTML = "No items in the cart"
        notify.className = "error"
    }


    let header = `
            <tr>
                <th colspan="2">Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        `
    let table = document.getElementById("cart-table");
    table.innerHTML = header
    var grandTotal = 0;
    collection.forEach(product => {
        let product_item = JSON.stringify(product)

        var count = quantityItem(product_item)
        grandTotal += parseInt(product.total)

        var tr = `
            <tr id=${product.id}>
        `
        table.innerHTML += tr +
            '<td>' + '<span class="close">&times;</span>' + '</td>' +
            '<td >' + product.name + '</td>' +
            '<td >' + count + '</td>' +
            '<td >' + "Ksh " + product.price + "/=" + '</td>' +
            '<td >' + "Ksh " + product.total + "/=" + '</td>'
    });

    table.innerHTML += '<tr id="total-row">' +
        '<td colspan="4">' + "Total" + '</td>' +
        '<td>' + "Ksh " + grandTotal + "/=" + '</td>'
}

window.onload = function(event) {
    // set cart items
    if (document.getElementById("cart-table")) {
        var collection = getCartData()
        updateCartTable(collection)
    }
}

if (document.getElementById("clear-cart")) {
    document.getElementById("clear-cart").addEventListener("click", clearItems)
}

function clearItems() {
    message = "Items cleared successfully"
    document.getElementById('notification').innerHTML = message
    document.getElementById('notification').className = "success"
    clearCart()
    setTimeout(() => {
        document.getElementById('notification').removeAttribute("class")
        document.getElementById('notification').innerHTML = ""
        window.location.href = "home.html"
    }, 2500)
}

function quantityItem(product) {
    product = JSON.parse(product)
    let count = product.count
    count = count ? count : 0
    var countItem = `
                    <input  name="count" id=${product.id} type='number' value=${count} min=1 max=${product.quantity}
                    onchange="updateLineItem(${product.id})">
                `
    return countItem;

}

function updateLineItem(id) {
    let new_count = document.getElementById(id).getElementsByTagName("input").namedItem("count").value;
    let collection = JSON.parse(getCheckout())
    collection = collection.map(item => {
        if (item.id === id) {
            item.count = new_count;
            item.total = parseInt(item.price) * parseInt(item.count)
        }
        return item;
    })
    updateCartTable(collection)

}