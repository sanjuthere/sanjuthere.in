// -----------------------------
// IMAGE SLIDESHOW (TOP SECTION)
// -----------------------------
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow img');

function showSlides() {
  slides.forEach((slide, index) => {
    slide.style.display = "none";
    slide.style.opacity = "0";
  });

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  const currentSlide = slides[slideIndex - 1];
  currentSlide.style.display = "block";
  setTimeout(() => { currentSlide.style.opacity = "1"; }, 50);

  setTimeout(showSlides, 4000); // Change every 4 seconds
}

if (slides.length > 0) showSlides();


// -----------------------------
// AUTO-ROTATING QUOTES
// -----------------------------
const quotes = [
  "Quality Containers. Reliable Engineering.",
  "Innovation in Steel — Building the Future of Logistics.",
  "Custom Fabrication for Every Industry Need.",
  "Durability. Precision. Performance.",
  "Delivering Strength in Every Container."
];

let quoteIndex = 0;
const quoteElement = document.querySelector('.animated-quote');

function rotateQuotes() {
  if (!quoteElement) return;
  quoteElement.style.opacity = "0";

  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteElement.textContent = quotes[quoteIndex];
    quoteElement.style.opacity = "1";
  }, 600);
}

setInterval(rotateQuotes, 4000);


// -----------------------------
// IMAGE GALLERY (FROM images/images.json)
// -----------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const imageGallery = document.getElementById("imageGallery");
  if (!imageGallery) return;

  try {
    const response = await fetch("images/images.json");
    const data = await response.json();
    const images = data.images;

    if (!images || images.length === 0) {
      imageGallery.textContent = "No images found.";
      return;
    }

    images.forEach((imgName, index) => {
      const img = document.createElement("img");
      img.src = `images/${imgName}`;
      img.alt = `Container Image ${index + 1}`;
      img.classList.add("slide-img");
      if (index !== 0) img.style.display = "none";
      imageGallery.appendChild(img);
    });

    // Fade animation for gallery images
    let current = 0;
    const galleryImages = imageGallery.querySelectorAll("img");

    function showNextImage() {
      galleryImages[current].style.opacity = 0;
      setTimeout(() => {
        galleryImages[current].style.display = "none";
        current = (current + 1) % galleryImages.length;
        galleryImages[current].style.display = "block";
        setTimeout(() => (galleryImages[current].style.opacity = 1), 50);
      }, 600);
    }

    setInterval(showNextImage, 3500);
  } catch (err) {
    console.error("Error loading images.json:", err);
    imageGallery.textContent = "Error loading images.";
  }
});


// -----------------------------
// SMOOTH SCROLLING NAV LINKS
// -----------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// -----------------------------
// FADE-IN ON SCROLL
// -----------------------------
const faders = document.querySelectorAll('.service-card, .slider-box, .quote-box, .contact form');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


// -----------------------------
// SMALL ANIMATION ENHANCEMENTS
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});
