// Static products array
const products = [
  {
    id: 1,
    name: "Premium Dry Dog Food",
    price: 24.99,
    image: "assets/images/dry-dog-food.jpg",
    description: "Nutritious dry food for adult dogs."
  },
  {
    id: 2,
    name: "Chicken & Rice Wet Food",
    price: 18.99,
    image: "assets/images/wet-dog-food.jpg",
    description: "Tasty wet food with real chicken and rice."
  },
  {
    id: 3,
    name: "Grain-Free Puppy Formula",
    price: 29.99,
    image: "assets/images/puppy-food.jpg",
    description: "Specially made for growing puppies."
  }
];

// Render product cards into product-list container
function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return; // Safeguard in case element not found

  productList.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <a href="product-details.html?id=${product.id}" style="text-decoration: none; color: inherit;">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">KES ${product.price.toFixed(2)}</p>
      </a>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(card);
  });
}

// Add item to localStorage cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added "${product.name}" to cart!`);
}

// Load products on page load
document.addEventListener("DOMContentLoaded", renderProducts);
