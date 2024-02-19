
import { getProducts } from "./api.js";

export function filterProducts(products, filter) {
    let filteredProducts;
    if (filter === 'all') {
    filteredProducts = products;
    } 
    else {
    filteredProducts = products.filter(product => product.gender && product.gender.toLowerCase() === filter.toLowerCase());
    }
    displayProducts(filteredProducts);
}

export function displayProducts(products) {
    const productContainer = document.getElementById("bestsellers_frame");
    productContainer.innerHTML = ''; 

    products.forEach(product => {
    const productLink = document.createElement("a");
    productLink.href = `/product.html?productId=${product.id}`;
    productLink.classList.add("product-link");

        const productElement = document.createElement("div");
        productElement.classList.add("product");

        const productTitle = document.createElement("h3");
        productTitle.textContent = product.title;
        productTitle.classList.add("product-title");

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: $${product.price}`;
        productPrice.classList.add("product-price");

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.title;
        productImage.classList.add("product-img");

        productElement.append(productImage, productTitle, productDescription, productPrice);
        productLink.appendChild(productElement);

        productContainer.appendChild(productLink);
    });
}

getProducts()
    .then(products => {
    displayProducts(products);

        const buttons = document.querySelectorAll(".btn");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                const filter = button.getAttribute("data-filter");
                filterProducts(products, filter);
            });
        });
    })
    .catch(error => console.error("Error fetching products:", error));