console.log("Site loaded");

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  if (!products || products.length === 0) {
    productList.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <a href="product.html?id=${product.id}" class="btn">View</a>
    `;

    productList.appendChild(card);
  });
});

// Firebase logout function
function logout() {
  firebase.auth().signOut()
    .then(() => {
      alert("Logged out!");
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error("Logout error:", error.message);
      alert("Error logging out. Try again.");
    });
}

// Firebase config (your real config here)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  appId: "YOUR-APP-ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const shopNowBtn = document.getElementById('shopNowBtn');

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ Logged in - allow shop access
    shopNowBtn.href = "/shop.html";
    shopNowBtn.classList.remove("disabled");
    shopNowBtn.textContent = "Shop Now";
  } else {
    // ❌ Not logged in - redirect to login or disable
    shopNowBtn.href = "/login.html";
    shopNowBtn.classList.add("disabled");
    shopNowBtn.textContent = "Login to Shop";
  }
});

