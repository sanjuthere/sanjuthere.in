/* script.js - category gallery + quotes + whatsapp obfuscation */

(() => {
  const jsonPath = "images/images.json";
  const slideshowContainer = document.getElementById("slideshowContainer");
  const dotsContainer = document.getElementById("slideDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const quoteText = document.getElementById("quoteText");
  const galleryTabs = document.querySelectorAll(".gallery-tab");

  let galleryData = {};
  let currentCategory = "farming";
  let slides = [];
  let currentIndex = 0;
  let slideInterval = null;
  const SLIDE_TIME = 5000;

  // Quotes array (kept in English; you can expand for multi-lingual)
  const quotes = [
    "From Indian soil to global shelves.",
    "Every grain tells a story of care.",
    "Quality harvested with integrity.",
    "Connecting farmers to the world.",
    "Sustainably sourced, globally delivered."
  ];

  // ------------- fetch gallery JSON -------------
  async function initGallery() {
    try {
      const res = await fetch(jsonPath, {cache: "no-cache"});
      galleryData = await res.json();
      // handle structure: { categories: { farming: [...], ... } }
      if (galleryData && galleryData.categories) {
        galleryData = galleryData.categories;
      }
      // load default
      loadCategory(currentCategory);
    } catch (err) {
      console.error("Error loading images.json", err);
      slideshowContainer.innerHTML = "<div style='padding:24px;color:#333'>Could not load gallery.</div>";
    }
  }

  // ------------- build slides for a category -------------
  function loadCategory(cat) {
    if (!galleryData[cat]) {
      console.warn("Category not found:", cat);
      slideshowContainer.innerHTML = "<div style='padding:20px;color:#333'>No images for this category.</div>";
      return;
    }
    currentCategory = cat;
    slides = galleryData[cat].slice(); // copy
    currentIndex = 0;
    renderSlides();
    startAutoplay();
  }

  function renderSlides() {
    // clear
    slideshowContainer.innerHTML = "";
    dotsContainer.innerHTML = "";

    slides.forEach((src, i) => {
      const slideDiv = document.createElement("div");
      slideDiv.className = "slide";
      if (i === 0) slideDiv.classList.add("active");

      const img = document.createElement("img");
      img.src = src;
      img.alt = `${currentCategory} ${i+1}`;
      img.loading = "lazy";
      slideDiv.appendChild(img);
      slideshowContainer.appendChild(slideDiv);

      const dot = document.createElement("span");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  // ------------- slide controls -------------
  function goToSlide(n) {
    const slideEls = slideshowContainer.querySelectorAll(".slide");
    const dotEls = dotsContainer.querySelectorAll(".dot");
    if (!slideEls.length) return;
    slideEls.forEach(s => s.classList.remove("active"));
    dotEls.forEach(d => d.classList.remove("active"));

    currentIndex = (n + slideEls.length) % slideEls.length;
    slideEls[currentIndex].classList.add("active");
    dotEls[currentIndex].classList.add("active");
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const slideEls = slideshowContainer.querySelectorAll(".slide");
      if (!slideEls.length) return;
      // update index relative to elements
      const dotEls = dotsContainer.querySelectorAll(".dot");
      slideEls[currentIndex].classList.remove("active");
      dotEls[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slideEls.length;
      slideEls[currentIndex].classList.add("active");
      dotEls[currentIndex].classList.add("active");
    }, SLIDE_TIME);
  }

  function resetAutoplay() {
    startAutoplay();
  }

  // ------------- attach UI listeners -------------
  galleryTabs.forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelector(".gallery-tab.active")?.classList.remove("active");
      btn.classList.add("active");
      loadCategory(btn.dataset.category);
    });
  });

  prevBtn?.addEventListener("click", () => { prevSlide(); resetAutoplay(); });
  nextBtn?.addEventListener("click", () => { nextSlide(); resetAutoplay(); });

  // ------------- quotes -------------
  let quoteIndex = 0;
  function rotateQuotes() {
    if (!quoteText) return;
    quoteText.style.opacity = "0";
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteText.textContent = quotes[quoteIndex];
      quoteText.style.opacity = "1";
    }, 500);
  }
  setInterval(rotateQuotes, 5000);

  // ------------- WhatsApp obfuscation (BASE64 stored) -------------
  // Base64 encoded number (contains +country prefix); decoded then remove non-digits
  (function setWhatsAppLink() {
    try {
      // change this string if you use a different number. This decodes to "+918712231501"
      const encoded = "KzkxODcxMjIzMTUwMQ==";
      const decoded = atob(encoded || "");
      const digits = decoded.replace(/\D/g, "");
      const anchors = document.querySelectorAll(".social-link-whatsapp, .btn-whatsapp");
      anchors.forEach(a => {
        a.href = `https://wa.me/${digits}`;
      });
    } catch (e) {
      // nothing
    }
  })();

  // ------------- Init -------------
  document.addEventListener("DOMContentLoaded", () => {
    initGallery();
    // ensure quotes text initial
    if (quoteText) quoteText.textContent = quotes[0];
  });

})();
