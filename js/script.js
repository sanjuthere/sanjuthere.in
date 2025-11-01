/* script.js - Final version for Sanjuthere.in
   Combines animation + old JSON flexibility + quotes
*/

(async function(){
  // ---------- Config ----------
  const jsonPath = 'images/images.json';
  const slideshowId = 'slideshow';
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4200;

  // ---------- Quotes ----------
  const quotes = [
    "Quality Containers. Reliable Engineering.",
    "Innovation in Steel — Building the Future of Logistics.",
    "Custom Fabrication for Every Industry Need.",
    "Durability. Precision. Performance.",
    "Delivering Strength in Every Container."
  ];

  // ---------- Fetch Images JSON (supports both formats) ----------
  async function fetchImageList(path) {
    try {
      const resp = await fetch(path, { cache: "no-cache" });
      if (!resp.ok) throw new Error('File not found');
      const data = await resp.json();

      // ✅ Support both: { "images": [...] } OR [ ... ]
      const list = Array.isArray(data) ? data : data.images;
      if (!Array.isArray(list)) throw new Error("Invalid JSON format");

      // filter only image files
      return list.filter(fn => /\.(jpe?g|png|webp|svg)$/i.test(fn));
    } catch (err) {
      console.error('Error loading images.json:', err);
      return [];
    }
  }

  // ---------- Slideshow ----------
  function buildSlideshow(list){
    const container = document.getElementById(slideshowId);
    if (!container) return;
    container.innerHTML = '';

    if (!list.length){
      container.innerHTML = '<div style="color:#cfeeea;padding:20px">No images found in images.json</div>';
      return;
    }

    // Add images
    list.forEach((file, i) => {
      const img = document.createElement('img');
      img.src = `images/${file}`;
      img.alt = file;
      if (i === 0) img.classList.add('active');
      container.appendChild(img);
    });

    const slides = container.querySelectorAll('img');
    if (slides.length <= 1) return;

    // Smooth fade-in/out
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, slideIntervalMs);
  }

  // ---------- Quotes Rotator ----------
  function buildQuotes() {
    const quoteElement = document.querySelector('.animated-quote');
    if (!quoteElement) return;

    let index = 0;
    quoteElement.textContent = quotes[0];
    quoteElement.style.opacity = "1";

    setInterval(() => {
      quoteElement.style.opacity = "0";
      setTimeout(() => {
        index = (index + 1) % quotes.length;
        quoteElement.textContent = quotes[index];
        quoteElement.style.opacity = "1";
      }, 600);
    }, quoteIntervalMs);
  }

  // ---------- Smooth Scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---------- Fade-in On Scroll ----------
  const faders = document.querySelectorAll('.service-card, .slider-box, .quote-box, .contact form');
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // ---------- Init ----------
  const images = await fetchImageList(jsonPath);
  buildSlideshow(images);
  buildQuotes();
})();
