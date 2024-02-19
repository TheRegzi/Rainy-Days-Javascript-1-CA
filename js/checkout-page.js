
function displayCart() { 
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    cart.forEach((item) => { 
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        const itemDetails = `
        <div class="item-details">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.title}</p>
                <p>Size: ${item.selectedSize}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price}</p>
            </div>
        </div>
        `;

        itemElement.innerHTML = itemDetails;

        const removeButton = createRemoveButton(item.id, item.selectedSize);
        removeButton.classList.add("remove-button");
        itemElement.appendChild(removeButton);

        cartContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    const totalElement = document.createElement("p");
    totalElement.textContent = `Total: $${total}`;
    cartContainer.appendChild(totalElement);
    totalElement.classList.add("total");
    createPlaceOrderButton();
}

displayCart();

function createRemoveButton(productId, selectedSize) {
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", function() {
        removeFromCart(productId, selectedSize);
    });
    return button;
}

function removeFromCart(productId, selectedSize) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.id === productId && item.selectedSize === selectedSize);
    
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1); 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        displayCart(); 
    }
}

function createPlaceOrderButton() {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        let existingButton = cartContainer.querySelector(".place-order");
        if (!existingButton) {
            const placeOrderButton = document.createElement("button");
            placeOrderButton.textContent = "Place Order";
            placeOrderButton.classList.add("place-order");
            placeOrderButton.addEventListener("click", () => {
                window.location.href = 'checkout-success.html';
            });
            cartContainer.appendChild(placeOrderButton);
        }
    } else {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
}

