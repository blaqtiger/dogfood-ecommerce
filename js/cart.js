function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.innerHTML = "";
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>
        Quantity: 
        <button onclick="updateQuantity(${item.id}, -1)">−</button>
        ${item.quantity}
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </p>
      <p>Total: $${itemTotal.toFixed(2)}</p>
      <button onclick="removeItem(${item.id})">Remove</button>
      <hr />
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function removeItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);
 