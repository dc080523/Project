let products = [];

// Add product functionality
document.getElementById("add-product-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const productId = document.getElementById("product-id").value;
  const productName = document.getElementById("product-name").value;
  const productDescription = document.getElementById("product-description").value;
  const productPrice = document.getElementById("product-price").value;
  const productImage = document.getElementById("product-image").files[0];

  if (!productImage) {
    alert("Please upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const product = {
      id: productId,
      name: productName,
      description: productDescription,
      price: `₱${productPrice}`,
      image: reader.result, // Base64 image data
    };

    products.unshift(product);
    alert("Product added successfully!");
    window.location.href = "index.html";
  };
  reader.readAsDataURL(productImage);
});

// Load products on Ordering Page
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

loadProducts();
