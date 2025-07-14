// Static products array with categories
const products = [
  {
    id: 1,
    name: "Premium Dry Dog Food",
    price: 24.99,
    image: "assets/images/dry-dog-food.jpg",
    description: "Nutritious dry food for adult dogs.",
    category: "Dry Food"
  },
  {
    id: 2,
    name: "Chicken & Rice Wet Food",
    price: 18.99,
    image: "assets/images/wet-dog-food.jpg",
    description: "Tasty wet food with real chicken and rice.",
    category: "Wet Food"
  },
  {
    id: 3,
    name: "Grain-Free Puppy Formula",
    price: 29.99,
    image: "assets/images/puppy-food.jpg",
    description: "Specially made for growing puppies.",
    category: "Puppy Food"
  }
];

// Render product cards into product-list container, grouped by category
function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  productList.innerHTML = '';

  // Group products by unique categories
  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(category => {
    // Create section for each category
    const section = document.createElement('section');
    section.className = 'product-category';

    // Add category title
    const title = document.createElement('h3');
    title.textContent = category;
    section.appendChild(title);

    // Create a scrollable row
    const row = document.createElement('div');
    row.className = 'product-row';

    // Filter products by category and render each card
    products
      .filter(p => p.category === category)
      .forEach(product => {
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

        row.appendChild(card);
      });

    // Append the row to the section and section to the product list
    section.appendChild(row);
    productList.appendChild(section);
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
