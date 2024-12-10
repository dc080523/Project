// Static list of products
const products = [
  {
    id: "P001",
    name: "Coffee Mug",
    description: "A stylish coffee mug for your mornings.",
    price: "₱199.99",
    image: "path/to/coffee-mug.jpg",
  },
  {
    id: "P002",
    name: "T-Shirt",
    description: "Comfortable and trendy T-shirt.",
    price: "₱499.99",
    image: "path/to/t-shirt.jpg",
  },
];

// Load products on the Ordering Page
function loadProducts() {
  const productContainer = document.getElementById("products");
  if (productContainer) {
    productContainer.innerHTML = products.length
      ? products
          .map(
            (product) => `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price}</strong></p>
          </div>
        `
          )
          .join("")
      : "<p>No products available yet. Check back soon!</p>";
  }
}

// Add new product temporarily (on the Add Product page)
document.getElementById("add-product-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = document.getElementById("product-name").value.trim();
  const productDescription = document.getElementById("product-description").value.trim();
  const productPrice = document.getElementById("product-price").value.trim();
  const productImage = document.getElementById("product-image").files[0];

  if (!productName || !productDescription || !productPrice || !productImage) {
    alert("Please fill in all the required fields and upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const newProduct = {
      id: `P${products.length + 1}`, // Auto-generate ID
      name: productName,
      description: productDescription,
      price: `₱${productPrice}`,
      image: reader.result, // Convert image to Base64
    };

    products.unshift(newProduct); // Add product to the top of the list
    alert("Product added successfully!");

    // Simulate updating the Ordering Page
    loadProducts(); 

    // Clear the form
    document.getElementById("add-product-form").reset();
  };
  reader.readAsDataURL(productImage);
});

// Load products initially on page load
loadProducts();
