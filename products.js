const products = [
    {
        id: 1,
        name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
        price: 349.99,
        originalPrice: 399.99,
        discount: 12,
        rating: 4.8,
        image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
        description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.",
        category: "Electronics",
        brand: "Sony",
        stock: 15,
        features: [
            "Industry-leading noise canceling",
            "30-hour battery life",
            "Touch sensor controls",
            "Built-in Alexa"
        ],
        colors: ["Black", "Silver"]
    },
    {
        id: 2,
        name: "Apple Watch Series 7 (GPS, 45mm)",
        price: 399.99,
        originalPrice: 429.99,
        discount: 7,
        rating: 4.7,
        image: "https://m.media-amazon.com/images/I/71XMTLvq+8L._AC_SL1500_.jpg",
        description: "Always-On Retina display. The most durable Apple Watch ever. Built-in GPS, heart rate sensor, and blood oxygen sensor.",
        category: "Electronics",
        brand: "Apple",
        stock: 20,
        features: [
            "Always-On Retina display",
            "GPS tracking",
            "Heart rate monitoring",
            "Water resistant"
        ],
        colors: ["Midnight", "Starlight", "Green"]
    },
    {
        id: 3,
        name: "Ninja Foodi 8-in-1 Digital Air Fryer",
        price: 149.99,
        originalPrice: 199.99,
        discount: 25,
        rating: 4.6,
        image: "https://m.media-amazon.com/images/I/61YvF1Gp3YL._AC_SL1500_.jpg",
        description: "8-in-1 functionality: Air Fry, Air Roast, Bake, Broil, Dehydrate, Keep Warm, Reheat, and Steam.",
        category: "Home",
        brand: "Ninja",
        stock: 12,
        features: [
            "8 cooking functions",
            "Digital display",
            "Non-stick coating",
            "Dishwasher safe parts"
        ],
        colors: ["Black", "Silver"]
    },
    {
        id: 4,
        name: "Logitech MX Master 3 Advanced Wireless Mouse",
        price: 99.99,
        originalPrice: 129.99,
        discount: 23,
        rating: 4.8,
        image: "https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg",
        description: "Ultra-fast scrolling, precise tracking, and comfortable ergonomic design for productivity.",
        category: "Electronics",
        brand: "Logitech",
        stock: 25,
        features: [
            "Ultra-fast scrolling",
            "Precision tracking",
            "Multi-device connectivity",
            "Rechargeable battery"
        ],
        colors: ["Graphite", "Pale Grey"]
    },
    {
        id: 5,
        name: "Philips Hue White and Color Ambiance Smart Bulb",
        price: 49.99,
        originalPrice: 59.99,
        discount: 17,
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/61+Q6Rh3OEL._AC_SL1500_.jpg",
        description: "16 million colors, voice control, and smart home integration.",
        category: "Home",
        brand: "Philips",
        stock: 30,
        features: [
            "16 million colors",
            "Voice control",
            "Energy efficient",
            "Smart home compatible"
        ],
        colors: ["White", "Color"]
    },
    {
        id: 6,
        name: "The North Face Borealis Backpack",
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        rating: 4.7,
        image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UL1500_.jpg",
        description: "Versatile backpack with laptop sleeve, multiple compartments, and comfortable straps.",
        category: "Sports",
        brand: "The North Face",
        stock: 18,
        features: [
            "Laptop sleeve",
            "Multiple compartments",
            "Padded straps",
            "Water resistant"
        ],
        colors: ["Black", "Grey", "Blue"]
    },
    {
        id: 7,
        name: "Anker 737 Power Bank (PowerCore 24K)",
        price: 149.99,
        originalPrice: 179.99,
        discount: 17,
        rating: 4.6,
        image: "https://m.media-amazon.com/images/I/61I9tK3yJEL._AC_SL1500_.jpg",
        description: "24000mAh portable charger with 140W output, perfect for laptops and mobile devices.",
        category: "Electronics",
        brand: "Anker",
        stock: 22,
        features: [
            "24000mAh capacity",
            "140W output",
            "Multiple ports",
            "Digital display"
        ],
        colors: ["Black"]
    },
    {
        id: 8,
        name: "Lululemon The Reversible Mat 5mm",
        price: 78.00,
        originalPrice: 98.00,
        discount: 20,
        rating: 4.8,
        image: "https://m.media-amazon.com/images/I/71YtJh+6VEL._AC_UL1500_.jpg",
        description: "Premium yoga mat with dual-sided design, perfect for all types of yoga and fitness.",
        category: "Sports",
        brand: "Lululemon",
        stock: 15,
        features: [
            "5mm thickness",
            "Dual-sided design",
            "Non-slip surface",
            "Moisture resistant"
        ],
        colors: ["Black/White", "Purple/Blue"]
    },
    {
        id: 9,
        name: "KitchenAid Stand Mixer Professional 5qt",
        price: 379.99,
        originalPrice: 449.99,
        discount: 16,
        rating: 4.9,
        image: "https://m.media-amazon.com/images/I/71F5Jwpx0BL._AC_SL1500_.jpg",
        description: "Professional-grade stand mixer with 10 speeds and multiple attachments.",
        category: "Home",
        brand: "KitchenAid",
        stock: 10,
        features: [
            "10 speeds",
            "5-quart bowl",
            "Multiple attachments",
            "Professional grade"
        ],
        colors: ["Black", "Silver", "Red"]
    },
    {
        id: 10,
        name: "Samsung 49\" Odyssey G9 Gaming Monitor",
        price: 999.99,
        originalPrice: 1299.99,
        discount: 23,
        rating: 4.7,
        image: "https://m.media-amazon.com/images/I/81WBbJOIi8L._AC_SL1500_.jpg",
        description: "Ultra-wide curved gaming monitor with 240Hz refresh rate and 1ms response time.",
        category: "Electronics",
        brand: "Samsung",
        stock: 8,
        features: [
            "49\" curved display",
            "240Hz refresh rate",
            "1ms response time",
            "HDR support"
        ],
        colors: ["White"]
    }
];

// Filter functions
const filterProducts = {
    byCategory: (category) => {
        return category === 'All' ? products : products.filter(product => product.category === category);
    },
    
    byPriceRange: (min, max) => {
        return products.filter(product => product.price >= min && product.price <= max);
    },
    
    byRating: (minRating) => {
        return products.filter(product => product.rating >= minRating);
    },
    
    bySearch: (searchTerm) => {
        const term = searchTerm.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term)
        );
    }
};

// Get unique categories
const categories = ['All', ...new Set(products.map(product => product.category))];

// Price ranges for filter
const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity }
]; 