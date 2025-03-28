// Initial cart data
let cartItems = [
    { name: "Burger", price: 50, quantity: 1 },
    { name: "Biriyani", price: 150, quantity: 1 },
    { name: "Pizza", price: 99, quantity: 1 }
];

// Update quantity and price
function updateQuantity(change, index) {
    const quantityInput = document.getElementById(`quantity${index}`);
    let quantity = parseInt(quantityInput.value);

    quantity += change;
    if (quantity < 1) quantity = 1;

    cartItems[index].quantity = quantity;
    quantityInput.value = quantity;

    updateSummary();
}

// Remove item from cart
function removeItem(index) {
    cartItems.splice(index, 1);
    renderCart();
}

// Update order summary
function updateSummary() {
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('product-total').innerText = `Rs.${totalPrice.toFixed(2)}`;
    document.getElementById('total-price').innerText = `Rs.${totalPrice.toFixed(2)}`;
}

// Render cart after changes
function renderCart() {
    const cartHTML = document.querySelector('.card-body');
    cartHTML.innerHTML = `
        <h5 class="card-title">Cart - ${cartItems.length} items</h5>
    `;

    cartItems.forEach((item, index) => {
        cartHTML.innerHTML += `
        <div class="row mb-4 align-items-center">
            <div class="col-md-2">
                <img src="images/${item.name.toLowerCase()}.jpg" class="img-fluid" alt="${item.name}">
            </div>
            <div class="col-md-4">
                <h6>${item.name}</h6>
                <p class="text-muted">Price: Rs.${item.price.toFixed(2)}</p>
            </div>
            <div class="col-md-3">
                <div class="input-group quantity">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(-1, ${index})">-</button>
                    <input type="text" class="form-control text-center" value="${item.quantity}" id="quantity${index}" readonly>
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(1, ${index})">+</button>
                </div>
            </div>
            <div class="col-md-2">
                <h6 class="text-success">Rs.${(item.price * item.quantity).toFixed(2)}</h6>
            </div>
            <div class="col-md-1">
                <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">❌</button>
            </div>
        </div>
        `;
    });

    updateSummary();
}

// Checkout simulation
function checkout() {
    if (cartItems.length === 0) {
        alert("🛒 Your cart is empty. Add items to proceed!");
        return;
    }
    alert("✅ Order Placed Successfully!");
    cartItems = [];
    renderCart();
}

// Initial render
window.onload = renderCart;
