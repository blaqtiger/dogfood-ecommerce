function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.innerHTML = "";
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("disabled");
    }
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
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="cart-item-details">
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
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("disabled");
  }
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

function closeModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.style.display = "none";
}

function handlePaymentChange() {
  const payment = document.getElementById("payment").value;
  const extraDiv = document.getElementById("payment-extra");

  switch (payment) {
    case "Mpesa":
      extraDiv.innerHTML = `
        <label for="mpesa-code">Mpesa Number:</label>
        <input type="tel" id="mpesa-code" required />
      `;
      break;
    case "Card":
      extraDiv.innerHTML = `
        <label for="card-number">Card Number:</label>
        <input type="text" id="card-number" required />
      `;
      break;
    case "PayPal":
      extraDiv.innerHTML = `
        <label for="paypal-email">PayPal Email:</label>
        <input type="email" id="paypal-email" required />
      `;
      break;
    case "Cash on Delivery":
      extraDiv.innerHTML = `<p><em>Pay when your order arrives.</em></p>`;
      break;
    default:
      extraDiv.innerHTML = "";
  }
}

function submitCheckout(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.getElementById('payment').value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!name || !phone || !address || !payment || cart.length === 0) {
    alert("Please complete the form and ensure your cart is not empty.");
    return;
  }

  // Optional extra payment details
  let paymentDetails = {};
  if (payment === "Mpesa") {
    paymentDetails.number = document.getElementById("mpesa-code").value;
  } else if (payment === "Card") {
    paymentDetails.card = document.getElementById("card-number").value;
  } else if (payment === "PayPal") {
    paymentDetails.email = document.getElementById("paypal-email").value;
  }

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product.price * item.quantity);
  }, 0);

  const receipt = `
    <h3>🧾 Receipt</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Payment:</strong> ${payment}</p>
    <hr />
    ${cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return `<p>${product.name} (x${item.quantity}) - $${(product.price * item.quantity).toFixed(2)}</p>`;
    }).join('')}
    <hr />
    <p><strong>Total: $${total.toFixed(2)}</strong></p>
  `;

  document.getElementById("cart-items").innerHTML = receipt;
  document.getElementById("cart-total").innerHTML = "";
  localStorage.removeItem("cart");
  document.getElementById("checkoutForm").reset();
  closeModal();
  loadCart(); // refresh UI
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  const checkoutBtn = document.getElementById("checkout-btn");
  const form = document.getElementById("checkoutForm");
  const closeBtn = document.querySelector(".close-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      document.getElementById("checkoutModal").style.display = "block";
    });
  }

  if (form) {
    form.addEventListener("submit", submitCheckout);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  window.addEventListener("click", function (e) {
    const modal = document.getElementById("checkoutModal");
    if (e.target === modal) closeModal();
  });

  const paymentSelect = document.getElementById("payment");
  if (paymentSelect) {
    paymentSelect.addEventListener("change", handlePaymentChange);
  }
});
