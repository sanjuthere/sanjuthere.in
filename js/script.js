// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable keyboard shortcuts for saving and inspecting
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 's')) {
        e.preventDefault();
    }
});

// ===== Language Toggle =====
const langToggle = document.getElementById('langToggle');
const currentLangSpan = document.getElementById('currentLang');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    currentLangSpan.textContent = currentLang.toUpperCase();
    translatePage(currentLang);
});

function translatePage(lang) {
    const elements = document.querySelectorAll('[data-en][data-hi]');
    elements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
}

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Image Slideshow =====
let currentSlide = 0;
let slides = [];
let slideInterval;

// Load images from JSON
fetch('images/images.json')
    .then(response => response.json())
    .then(data => {
        slides = data.images;
        initSlideshow();
    })
    .catch(error => {
        console.error('Error loading images:', error);
        // Fallback images
        slides = [
            'https://images.unsplash.com/photo-1618987488789-91fb25bf66bc',
            'https://images.unsplash.com/photo-1618987488793-78738e8f80d0',
            'https://images.unsplash.com/photo-1755690092121-fac906e01c04',
            'https://images.unsplash.com/photo-1709693298800-7e35fc0c8a2a',
            'https://images.unsplash.com/photo-1739204618173-3e89def7140f',
            'https://images.unsplash.com/photo-1681464084016-145257261809'
        ];
        initSlideshow();
    });

function initSlideshow() {
    const container = document.getElementById('slideshowContainer');
    const dotsContainer = document.getElementById('slideDots');
    
    // Create slides
    slides.forEach((imgSrc, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        if (index === 0) slideDiv.classList.add('active');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Agricultural operations ${index + 1}`;
        img.loading = 'lazy';
        
        slideDiv.appendChild(img);
        container.appendChild(slideDiv);
        
        // Create dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Start auto-play
    startSlideshow();
}

function showSlide(n) {
    const slideElements = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= slideElements.length) currentSlide = 0;
    if (n < 0) currentSlide = slideElements.length - 1;
    
    slideElements.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideElements[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
    resetSlideshow();
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Navigation buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    resetSlideshow();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    resetSlideshow();
});

// ===== Animated Quotes =====
const quotes = [
    { en: "From Indian soil to global shelves.", hi: "भारतीय धरती से वैश्विक बाजार तक।" },
    { en: "Every grain tells a story of care.", hi: "हर अनाज देखभाल की कहानी बताता है।" },
    { en: "Quality harvested with integrity.", hi: "ईमानदारी के साथ कटाई की गई गुणवत्ता।" },
    { en: "Connecting farmers to the world.", hi: "किसानों को दुनिया से जोड़ना।" },
    { en: "Sustainably sourced, globally delivered.", hi: "स्थायी रूप से प्राप्त, विश्व स्तर पर वितरित।" }
];

let currentQuote = 0;
const quoteText = document.getElementById('quoteText');

function changeQuote() {
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        quoteText.textContent = quotes[currentQuote][currentLang];
        quoteText.style.opacity = '1';
        quoteText.style.transform = 'translateY(0)';
    }, 500);
}

// Initialize quote
quoteText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
quoteText.textContent = quotes[0].en;

// Change quote every 5 seconds
setInterval(changeQuote, 5000);

// Update quotes when language changes
function updateQuoteLanguage(lang) {
    quoteText.textContent = quotes[currentQuote][lang];
}

// Override translatePage to include quote translation
const originalTranslatePage = translatePage;
translatePage = function(lang) {
    originalTranslatePage(lang);
    updateQuoteLanguage(lang);
};

// ===== Form Handling =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    // Form will submit to Formspree naturally
    // Add visual feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'en' ? 'Sending...' : 'भेज रहे हैं...';
    submitBtn.disabled = true;
    
    // Re-enable after 3 seconds (Formspree will handle actual submission)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.service-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
/* 🔒 WhatsApp Number – Hidden/Protected */
const WA = [8,7,1,2,2,3,1,5,0,1];  // your number split
document.getElementById("whatsappBtn").addEventListener("click", () => {
    const hiddenNum = WA.join("");
    window.open("https://wa.me/" + hiddenNum, "_blank");
});

