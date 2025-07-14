document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-detail");

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  const product = products.find(p => p.id === productId);

  if (product) {
    productContainer.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
  } else {
    productContainer.innerHTML = `<p>Product not found.</p>`;
  }
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}
