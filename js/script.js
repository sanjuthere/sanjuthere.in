// ========================================
// Security & Protection
// ========================================

// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Disable F12 (DevTools)
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+S (Save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
});

// Console message
console.log('Protected by Sanjuthere.in © 2025');

// ========================================
// Navigation
// ========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Update active state
        navLinkItems.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// ========================================
// Slideshow
// ========================================

let images = [];
let currentImageIndex = 0;
const slideshowImage = document.getElementById('slideshowImage');
const prevButton = document.querySelector('.slide-control.prev');
const nextButton = document.querySelector('.slide-control.next');

// Load images from JSON
fetch('images/images.json')
    .then(response => response.json())
    .then(data => {
        images = data.images;
        if (images.length > 0) {
            loadImage(0);
            startSlideshow();
        }
    })
    .catch(error => {
        console.error('Error loading images:', error);
    });

function loadImage(index) {
    if (images.length === 0) return;
    
    // Fade out
    slideshowImage.classList.remove('active');
    
    // Wait for fade out, then change image
    setTimeout(() => {
        slideshowImage.src = images[index];
        slideshowImage.alt = `Container Fabrication Portfolio - Image ${index + 1}`;
        
        // Fade in after image loads
        slideshowImage.onload = () => {
            slideshowImage.classList.add('active');
        };
    }, 400);
    
    currentImageIndex = index;
}

function nextSlide() {
    const nextIndex = (currentImageIndex + 1) % images.length;
    loadImage(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    loadImage(prevIndex);
}

// Manual controls
if (nextButton) {
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetSlideshow();
    });
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetSlideshow();
    });
}

// Auto slideshow
let slideshowInterval;

function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 5000);
}

function resetSlideshow() {
    clearInterval(slideshowInterval);
    startSlideshow();
}

// ========================================
// Rotating Quotes
// ========================================

const quotes = [
    "Quality Containers. Reliable Engineering.",
    "Innovation in Steel — Building the Future of Logistics.",
    "Durability. Precision. Performance.",
    "Engineered Solutions for Industrial Excellence.",
    "Crafting Strength, Delivering Quality."
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById('rotatingQuote');

function loadQuote(index) {
    // Fade out
    quoteElement.classList.remove('active');
    
    // Wait for fade out, then change quote
    setTimeout(() => {
        quoteElement.textContent = quotes[index];
        quoteElement.classList.add('active');
    }, 300);
    
    currentQuoteIndex = index;
}

function nextQuote() {
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    loadQuote(nextIndex);
}

// Initialize first quote
if (quoteElement) {
    loadQuote(0);
    // Auto rotate quotes every 4 seconds
    setInterval(nextQuote, 4000);
}

// ========================================
// Contact Form
// ========================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again.';
            formStatus.className = 'form-status error';
        }
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    });
}

// ========================================
// Smooth Scroll Enhancement
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});