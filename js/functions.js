let allPlants = [];
let cart = [];

// DOM elements
const categoryList = document.getElementById("category-list");
const treeCardsContainer = document.getElementById("tree-cards-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const plantModal = document.getElementById("plant-modal");
const closeModalButton = document.querySelector(".close-button");
const modalDetails = document.getElementById("modal-details");

// Load categories
function loadCategories(categories) {
  categoryList.innerHTML = "";

  // All Trees option
  const allLi = document.createElement("li");
  allLi.textContent = "All Trees";
  allLi.classList.add("category-item", "active");
  allLi.addEventListener("click", function() {
    setActiveCategory(allLi);
    loadPlants(allPlants); 
  });
  categoryList.appendChild(allLi);

  // Other categories
  for (let i = 0; i < categories.length; i++) {
    const li = document.createElement("li");
    li.textContent = categories[i].category_name;
    li.classList.add("category-item");
    li.addEventListener("click", function() {
      setActiveCategory(li);
      filterPlants(categories[i].category_name); 
    });
    categoryList.appendChild(li);
  }
}

// Load plant cards 
function loadPlants(plants) {
  treeCardsContainer.innerHTML = ""; 

  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    const card = document.createElement("div");
    card.classList.add("tree-card");
    card.setAttribute('data-plant-id', plant.id);

    // Simple card layout
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}">
      <h4 class="tree-card-name">${plant.name}</h4>
      <p class="tree-card-description">${plant.description || "No description available."}</p>
      <div class="card-price-add">
        <span class="card-category-tag">${plant.category || "Tree"}</span>
        <div class="price-cart-wrapper">
          <span class="card-price">৳${plant.price}</span>
          <button class="add-to-cart-button" onclick="addToCart(${plant.id})">Add to Cart</button>
        </div>
      </div>
    `;

    card.querySelector('.tree-card-name').addEventListener('click', () => {
        showPlantDetails(plant.id);
    });

    treeCardsContainer.appendChild(card);
  }
}

// Filter plants by category
function filterPlants(categoryName) {
  const filtered = [];
  for (let i = 0; i < allPlants.length; i++) {
    if (allPlants[i].category === categoryName) {
      filtered.push(allPlants[i]);
    }
  }
  loadPlants(filtered);
}

// Highlight the active category
function setActiveCategory(selected) {
  const items = document.querySelectorAll(".category-item");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
  selected.classList.add("active");
}

// Add plant 
function addToCart(plantId) {
  for (let i = 0; i < allPlants.length; i++) {
    if (allPlants[i].id === plantId) {
      cart.push(allPlants[i]);
      break;
    }
  }
  renderCart();
}

// Remove plant 
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Render cart items and total
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-price">৳${item.price}</span>
      <button onclick="removeFromCart(${i})" class="remove-button">✕</button>
    `;

    cartItems.appendChild(div);
  }

  cartTotal.textContent = `Total: ৳${total}`;
}

// Show modal with plant details
function showPlantDetails(plantId) {
    const plant = allPlants.find(p => p.id === plantId);
    if (!plant) return;

    modalDetails.innerHTML = `
        <div class="modal-content-inner">
            <img src="${plant.image}" alt="${plant.name}" class="modal-image">
            <div class="modal-info">
                <h3 class="modal-name">${plant.name}</h3>
                <p class="modal-category">Category: ${plant.category}</p>
                <p class="modal-description">${plant.description}</p>
                <p class="modal-price">Price: ৳${plant.price}</p>
            </div>
        </div>
    `;
    plantModal.style.display = "block";
}

// Close the modal when the close button is clicked
closeModalButton.onclick = function() {
    plantModal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === plantModal) {
        plantModal.style.display = "none";
    }
}

async function init() {
  try {
    const catRes = await fetch("https://openapi.programming-hero.com/api/categories");
    const catData = await catRes.json();
    loadCategories(catData.categories || []);

    const plantRes = await fetch("https://openapi.programming-hero.com/api/plants");
    const plantData = await plantRes.json();
    allPlants = plantData.plants || [];
    loadPlants(allPlants);
  } catch (error) {
    console.log("API failed:", error.message);
  }
}

// Start app
init();
