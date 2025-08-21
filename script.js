// Profile page functionality
function initializeProfile() {
    const personalInfoForm = document.getElementById('personal-info-form');
    const addressList = document.getElementById('address-list');
    const orderList = document.getElementById('order-list');
    const addAddressBtn = document.getElementById('add-address-btn');

    // Load saved user data
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: '',
        email: '',
        phone: '',
        addresses: [],
        orders: []
    };

    // Initialize form with saved data
    if (personalInfoForm) {
        personalInfoForm.name.value = userData.name;
        personalInfoForm.email.value = userData.email;
        personalInfoForm.phone.value = userData.phone;

        personalInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            userData.name = personalInfoForm.name.value;
            userData.email = personalInfoForm.email.value;
            userData.phone = personalInfoForm.phone.value;
            localStorage.setItem('userData', JSON.stringify(userData));
            alert('Personal information saved successfully!');
        });
    }

    // Display addresses
    if (addressList) {
        function renderAddresses() {
            addressList.innerHTML = userData.addresses.map((address, index) => `
                <div class="address-item">
                    <p>${address.street}</p>
                    <p>${address.city}, ${address.state} ${address.zip}</p>
                    <button onclick="removeAddress(${index})" class="save-btn">Remove</button>
                </div>
            `).join('');
        }

        window.removeAddress = (index) => {
            userData.addresses.splice(index, 1);
            localStorage.setItem('userData', JSON.stringify(userData));
            renderAddresses();
        };

        addAddressBtn.addEventListener('click', () => {
            const street = prompt('Enter street address:');
            const city = prompt('Enter city:');
            const state = prompt('Enter state:');
            const zip = prompt('Enter ZIP code:');

            if (street && city && state && zip) {
                userData.addresses.push({ street, city, state, zip });
                localStorage.setItem('userData', JSON.stringify(userData));
                renderAddresses();
            }
        });

        renderAddresses();
    }

    // Display orders
    if (orderList) {
        orderList.innerHTML = userData.orders.length ? 
            userData.orders.map(order => `
                <div class="order-item">
                    <p>Order #${order.id}</p>
                    <p>Date: ${order.date}</p>
                    <p>Total: $${order.total.toFixed(2)}</p>
                </div>
            `).join('') :
            '<p>No orders yet</p>';
    }
}

// Initialize profile when the page loads
window.addEventListener('load', () => {
    if (document.querySelector('.profile-container')) {
        initializeProfile();
    }
});

// DOM Elements
const dealsOfTheDay = document.getElementById('deals-of-the-day');
const recommended = document.getElementById('recommended');
const cartIcon = document.querySelector('.cart');
const signInModal = document.getElementById('signInModal');
const closeModal = document.querySelector('.close');
const accountLink = document.querySelector('.account');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const productContainer = document.querySelector('.product-container');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const ratingFilter = document.getElementById('rating-filter');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const productsContainer = document.getElementById('products-container');
const sortSelect = document.getElementById('sort-select');

// Cart state
let cart = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupEventListeners();
    init();
});

function setupEventListeners() {
    // Sign In Modal
    accountLink.addEventListener('click', () => {
        signInModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        signInModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === signInModal) {
            signInModal.style.display = 'none';
        }
    });

    // Cart Navigation
    cartIcon.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    // Search Functionality
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function displayProducts(productsToDisplay = products) {
    dealsOfTheDay.innerHTML = '';
    recommended.innerHTML = '';

    // Split products into deals and recommended
    const deals = productsToDisplay.slice(0, 4);
    const recommendedProducts = productsToDisplay.slice(4);

    deals.forEach(product => {
        dealsOfTheDay.appendChild(createProductCard(product));
    });

    recommendedProducts.forEach(product => {
        recommended.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discountBadge = product.discount ? 
        `<div class="discount-badge">-${product.discount}%</div>` : '';
    
    const originalPrice = product.originalPrice ? 
        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            ${discountBadge}
            <img src="${product.image}" alt="${product.name}">
            <div class="product-overlay">
                <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-rating">
                ${generateStarRating(product.rating)}
                <span>(${product.rating})</span>
            </div>
            <div class="product-price">
                ${originalPrice}
                <span class="current-price">$${product.price.toFixed(2)}</span>
            </div>
            <p class="product-brand">${product.brand}</p>
            <p class="product-stock">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        </div>
    `;

    // Add event listeners
    card.querySelector('.quick-view-btn').addEventListener('click', () => showQuickView(product));
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product));

    return card;
}

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize the page
function init() {
    populateFilters();
    displayProducts(products);
    updateCart();
}

// Populate filter dropdowns
function populateFilters() {
    // Populate categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Populate price ranges
    priceRanges.forEach(range => {
        const option = document.createElement('option');
        option.value = `${range.min}-${range.max}`;
        option.textContent = range.label;
        priceFilter.appendChild(option);
    });

    // Populate ratings
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}+ Stars`;
        ratingFilter.appendChild(option);
    }
}

// Display products
function displayProducts(productsToShow) {
    productContainer.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return `
        ${'★'.repeat(fullStars)}
        ${halfStar ? '½' : ''}
        ${'☆'.repeat(emptyStars)}
    `;
}

// Show quick view modal
function showQuickView(product) {
    const modal = document.getElementById('quick-view-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="quick-view-content">
            <img src="${product.image}" alt="${product.name}">
            <div class="quick-view-details">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    <h3>Features:</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-colors">
                    <h3>Available Colors:</h3>
                    <div class="color-options">
                        ${product.colors.map(color => `
                            <span class="color-option" style="background-color: ${color.toLowerCase()}"></span>
                        `).join('')}
                    </div>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    modal.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product));
}

// Update cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-from-cart" data-id="${item.id}">×</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Filter products
function filterProducts() {
    const category = categoryFilter.value;
    const [minPrice, maxPrice] = priceFilter.value.split('-').map(Number);
    const minRating = Number(ratingFilter.value);
    const searchTerm = searchInput.value.toLowerCase();

    let filteredProducts = products;

    // Apply category filter
    if (category !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    // Apply rating filter
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);

    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts(filteredProducts);
}

// Event listeners
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
ratingFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const quickViewModal = document.getElementById('quick-view-modal');
    if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
    }
});

// Render products to the page
function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Populate category filter
function populateCategories() {
    const categories = [...new Set(products.map(product => product.category))];
    categoryFilter.innerHTML = `
        <option value="">All Categories</option>
        ${categories.map(category => 
            `<option value="${category}">${category}</option>`
        ).join('')}
    `;
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    sortSelect.addEventListener('change', filterProducts);
}

// Filter and sort products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortBy = sortSelect.value;
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    // Sort products
    switch(sortBy) {
        case 'price-low-high':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'discount':
            filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
    }
    
    renderProducts(filteredProducts);
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Here you would typically add the product to a cart array or state
        console.log(`Added to cart: ${product.name}`);
        // You can implement a more sophisticated cart system here
    }
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);