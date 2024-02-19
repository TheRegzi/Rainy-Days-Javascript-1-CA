export async function getProducts() {
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

 
  

 