let cart = [];

function addToCart(item, price) {
    const existingItem = cart.find(entry => entry.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateCartDisplay();
}

function removeFromCart(itemName) {
    cart = cart.filter(entry => entry.item !== itemName);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (cartItems) cartItems.innerHTML = "";

    let total = 0;
    let count = 0;
    cart.forEach(({ item, price, quantity }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="item-name">${item} x${quantity}</span>
            <span class="item-price">$${(price * quantity).toFixed(2)}</span>
            <button class="delete-btn" onclick="removeFromCart('${item}')">🗑️</button>
        `;
        if (cartItems) cartItems.appendChild(li);
        total += price * quantity;
        count += quantity;
    });

    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    const themeToggle = document.getElementById("toggle-theme");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
});

// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides[currentSlideIndex].classList.add('active');
}

function moveSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);