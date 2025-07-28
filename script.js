// Sample product data
const sampleProducts = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones with 30-hour battery life",
        price: 99.99,
        originalPrice: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        rating: 4.5,
        reviews: 1234,
        category: "electronics",
        retailers: [
            { name: "Amazon", price: 99.99, isBest: true },
            { name: "Best Buy", price: 109.99, isBest: false },
            { name: "Target", price: 119.99, isBest: false }
        ]
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitor and GPS",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        rating: 4.3,
        reviews: 856,
        category: "electronics",
        retailers: [
            { name: "Amazon", price: 199.99, isBest: true },
            { name: "Walmart", price: 209.99, isBest: false },
            { name: "Best Buy", price: 219.99, isBest: false }
        ]
    },
    {
        id: 3,
        title: "Organic Cotton T-Shirt",
        description: "Comfortable, sustainable, and stylish everyday wear",
        price: 24.99,
        originalPrice: 34.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        rating: 4.2,
        reviews: 445,
        category: "fashion",
        retailers: [
            { name: "Target", price: 24.99, isBest: true },
            { name: "Amazon", price: 27.99, isBest: false },
            { name: "H&M", price: 29.99, isBest: false }
        ]
    },
    {
        id: 4,
        title: "Coffee Maker Machine",
        description: "12-cup programmable coffee maker with auto-shutoff",
        price: 79.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
        rating: 4.4,
        reviews: 623,
        category: "home",
        retailers: [
            { name: "Amazon", price: 79.99, isBest: true },
            { name: "Target", price: 84.99, isBest: false },
            { name: "Walmart", price: 89.99, isBest: false }
        ]
    },
    {
        id: 5,
        title: "Yoga Exercise Mat",
        description: "Non-slip premium yoga mat with carrying strap",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
        rating: 4.6,
        reviews: 789,
        category: "sports",
        retailers: [
            { name: "Dick's Sporting", price: 39.99, isBest: true },
            { name: "Amazon", price: 42.99, isBest: false },
            { name: "Target", price: 44.99, isBest: false }
        ]
    },
    {
        id: 6,
        title: "Bestselling Novel",
        description: "Award-winning fiction book by renowned author",
        price: 14.99,
        originalPrice: 24.99,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
        rating: 4.7,
        reviews: 2341,
        category: "books",
        retailers: [
            { name: "Amazon", price: 14.99, isBest: true },
            { name: "Barnes & Noble", price: 16.99, isBest: false },
            { name: "Target", price: 18.99, isBest: false }
        ]
    }
];

// Global variables
let allProducts = [...sampleProducts];
let filteredProducts = [...sampleProducts];
let currentPage = 1;
const productsPerPage = 6;

// DOM elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const ratingFilter = document.getElementById('rating-filter');
const clearFiltersBtn = document.getElementById('clear-filters');
const productsGrid = document.getElementById('products-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const loading = document.getElementById('loading');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    displayProducts();
    setupMobileNavigation();
    generateDeals();
    setTimeout(() => {
        loading.style.display = 'none';
    }, 1000);
}

function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    loadMoreBtn.addEventListener('click', loadMoreProducts);
}

function setupMobileNavigation() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayProducts();
}

function applyFilters() {
    let filtered = [...allProducts];
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm !== '') {
        filtered = filtered.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    const categoryValue = categoryFilter.value;
    if (categoryValue !== '') {
        filtered = filtered.filter(product => product.category === categoryValue);
    }
    
    // Apply price filter
    const priceValue = priceFilter.value;
    if (priceValue !== '') {
        filtered = filtered.filter(product => {
            const price = product.price;
            switch(priceValue) {
                case '0-25': return price <= 25;
                case '25-50': return price > 25 && price <= 50;
                case '50-100': return price > 50 && price <= 100;
                case '100+': return price > 100;
                default: return true;
            }
        });
    }
    
    // Apply rating filter
    const ratingValue = ratingFilter.value;
    if (ratingValue !== '') {
        const minRating = parseFloat(ratingValue);
        filtered = filtered.filter(product => product.rating >= minRating);
    }
    
    filteredProducts = filtered;
    currentPage = 1;
    displayProducts();
}

function clearAllFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    priceFilter.value = '';
    ratingFilter.value = '';
    filteredProducts = [...allProducts];
    currentPage = 1;
    displayProducts();
}

function displayProducts() {
    const startIndex = 0;
    const endIndex = currentPage * productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="no-products"><h3>No products found</h3><p>Try adjusting your search or filters</p></div>';
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    
    // Show/hide load more button
    if (endIndex >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function createProductCard(product) {
    const stars = generateStars(product.rating);
    const savings = ((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0);
    
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <div class="product-price">$${product.price}</div>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-text">(${product.reviews})</span>
                    </div>
                </div>
                ${savings > 0 ? `<div class="savings">Save ${savings}%!</div>` : ''}
                <div class="price-comparison">
                    <h4>Price Comparison:</h4>
                    <div class="price-list">
                        ${product.retailers.map(retailer => `
                            <div class="price-item ${retailer.isBest ? 'best-price' : ''}">
                                <span class="retailer">${retailer.name}</span>
                                <span class="price">$${retailer.price}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="product-buttons">
                    <a href="#" class="btn btn-primary" onclick="trackClick('${product.title}', 'buy-now')">Buy Now</a>
                    <a href="#" class="btn btn-secondary" onclick="trackClick('${product.title}', 'compare')">Compare</a>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function loadMoreProducts() {
    currentPage++;
    displayProducts();
}

function generateDeals() {
    const deals = [
        {
            title: "Flash Sale",
            description: "Up to 50% off electronics",
            discount: "50% OFF",
            price: "Starting at $29.99"
        },
        {
            title: "Weekly Special",
            description: "Free shipping on orders over $50",
            discount: "FREE SHIP",
            price: "Save on delivery"
        },
        {
            title: "Bundle Deal",
            description: "Buy 2 get 1 free on selected items",
            discount: "BUY 2 GET 1",
            price: "Mix & Match"
        }
    ];
    
    const dealsGrid = document.getElementById('deals-grid');
    dealsGrid.innerHTML = deals.map(deal => `
        <div class="deal-card">
            <div class="deal-badge">${deal.discount}</div>
            <h3 class="deal-title">${deal.title}</h3>
            <p class="deal-description">${deal.description}</p>
            <div class="deal-price">${deal.price}</div>
            <a href="#products" class="btn btn-primary">Shop Now</a>
        </div>
    `).join('');
}

function trackClick(productName, action) {
    // Analytics tracking would go here
    console.log(`User clicked ${action} for ${productName}`);
    
    // Simulate redirect to affiliate link
    alert(`Redirecting to purchase ${productName}...\n\nIn a real implementation, this would redirect to the affiliate link.`);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}