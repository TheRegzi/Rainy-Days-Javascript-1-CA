import { getProducts } from "./api.js";

function visibleLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
}

function invisibleLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "none"; 
}

document.addEventListener('DOMContentLoaded', async () => {
    visibleLoader();
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const productId = queryParams.get('productId');
        const products = await getProducts();
        const product = products.find(p => p.id.toString() === productId);
        if (product) {
            displayProductDetails(product);
        } else {
            console.error('Product not found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        invisibleLoader(); // Ensures loader is hidden regardless of success or failure
    }
});

function displayProductDetails(product) {
    const productImage = document.getElementById("product-image");

    productImage.innerHTML = `<img src="${product.image}" alt="${product.title}" class="detail-img">`;

    const productTitle = document.getElementById("product-name");
    productTitle.textContent = product.title;
    productTitle.classList.add("product-title");

    const productDescription = document.getElementById("product-description");
    productDescription.textContent = product.description;
    productDescription.classList.add("detail-description");

    const productPrice = document.getElementById("product-price");
    productPrice.textContent = `Price: $${product.price}`;
    productPrice.classList.add("product-price");
    
    const productColor = document.getElementById("color");
    productColor.textContent = "Color: " + product.baseColor;

    setupSizes(product.sizes);

    initAddToCartButton(product);
}

function setupSizes(sizes) {    
    const productSizeSelect = document.getElementById("sizes");
    productSizeSelect.innerHTML = ""; 
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a size";
    defaultOption.value = "";
    productSizeSelect.appendChild(defaultOption);

    sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        productSizeSelect.appendChild(option);
    });
}

function initAddToCartButton(product) {
    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.removeEventListener('click', addToCartHandler);
    addToCartButton.addEventListener('click', () => {
        addToCartHandler(product)();
    });
}

function addToCartHandler(product) {
    return function() {
        const selectedSize = document.getElementById('sizes').value;
        if (selectedSize === "") {
            alert('Please select a size before adding to cart.');
            return;
        }

        const productToAdd = { ...product, selectedSize };
        addToCart(productToAdd);
    };
}

function addToCart(productToAdd) {
    // Try to retrieve the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product (with the selected size) is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize);
    
    if (existingProductIndex !== -1) {
        // If the product exists, increase its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product doesn't exist, add it with a quantity of 1
        cart.push({ ...productToAdd, quantity: 1 });
    }
    
    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart!');
}

document.getElementById('go-to-checkout').addEventListener('click', () => {
    window.location.href = 'checkout-page.html'; 
});
