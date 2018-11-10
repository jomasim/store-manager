// Get the modal
var modal = document.getElementById('edit-modal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function updateRecord(product) {
    // handle edit events on products table
    var modal = document.getElementById('edit-modal');
    modal.style.display = "block";

    //set values on the form 
    let edit_form = document.getElementById('edit-product-form')
    edit_form.elements.namedItem('name').value = product.name
    edit_form.elements.namedItem('category').value = product.category
    edit_form.elements.namedItem('description').value = product.description.info
    edit_form.elements.namedItem('quantity').value = product.quantity
    edit_form.elements.namedItem('price').value = product.price

    // add hidden field id

    var input = document.createElement("input")
    input.setAttribute("type", "hidden")
    input.setAttribute("id", "product_id")
    input.setAttribute("value", product.id)

    // append field to form
    edit_form.appendChild(input)
}