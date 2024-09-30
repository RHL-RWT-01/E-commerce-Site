let cart = [];

// Load products from JSON and display on the products page
function loadProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

// Add item to cart
function addToCart(productId) {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                updateCartCount();
                alert(`${product.name} added to cart!`);
            }
        })
        .catch(error => console.error('Error adding to cart:', error));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Load cart items on cart page
function loadCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsDiv.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}
