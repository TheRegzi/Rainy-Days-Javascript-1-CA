import { getProducts } from "./api.js";
import { filterProducts, displayProducts } from "./filter.js";
import { visibleLoader, invisibleLoader } from "./loader.js";


document.addEventListener("DOMContentLoaded", async () => {
    visibleLoader(); 
    try {
        const products = await getProducts();
        displayProducts(products); 
    } catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        invisibleLoader(); 
    }

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {
            visibleLoader(); 
            setTimeout(() => {
                const filter = button.getAttribute("data-filter");
                filterProducts(products, filter); 
                invisibleLoader(); 
            }, 100); 
        });
    });
});
