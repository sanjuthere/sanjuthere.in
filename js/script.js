(async function () {
  // ---------- Config ----------
  const jsonPath = 'images/images.json';
  const slideshowId = 'slideshow'; // ✅ matches index.html
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4200;

  // ---------- Helper: Smooth Fade Transition ----------
  function fadeInOut(elements, interval) {
    let index = 0;
    elements.forEach(el => {
      el.style.display = "none";
      el.style.opacity = "0";
      el.style.transition = "opacity 0.6s ease";
    });
    if (elements.length > 0) {
      elements[0].style.display = "block";
      setTimeout(() => elements[0].style.opacity = "1", 100);
    }

    setInterval(() => {
      if (elements.length === 0) return;
      elements[index].style.opacity = "0";
      setTimeout(() => {
        elements[index].style.display = "none";
        index = (index + 1) % elements.length;
        elements[index].style.display = "block";
        setTimeout(() => elements[index].style.opacity = "1", 100);
      }, 600);
    }, interval);
  }

  // ---------- Load Images ----------
  async function loadImages() {
    const container = document.getElementById(slideshowId);
    if (!container) return;
    try {
      const res = await fetch(jsonPath);
      const data = await res.json();
      if (!data.images || !Array.isArray(data.images)) {
        console.error("Invalid JSON format: missing 'images' array");
        return;
      }

      data.images.forEach(imgName => {
        const img = document.createElement("img");
        img.src = `images/${imgName}`;
        img.alt = imgName;
        container.appendChild(img);
      });

      const images = container.querySelectorAll("img");
      fadeInOut(images, slideIntervalMs);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  }

  // ---------- Auto-Rotating Quotes ----------
  const quotes = [
    "Quality Containers. Reliable Engineering.",
    "Innovation in Steel — Building the Future of Logistics.",
    "Custom Fabrication for Every Industry Need.",
    "Durability. Precision. Performance.",
    "Delivering Strength in Every Container."
  ];

  function rotateQuotes() {
    const quoteElement = document.querySelector('.animated-quote');
    if (!quoteElement) return;
    let quoteIndex = 0;
    setInterval(() => {
      quoteElement.style.opacity = "0";
      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[quoteIndex];
        quoteElement.style.opacity = "1";
      }, 600);
    }, quoteIntervalMs);
  }

  // ---------- Smooth Scroll ----------
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

  // ---------- Fade-in Animations on Scroll ----------
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
  document.addEventListener("DOMContentLoaded", () => document.body.classList.add("page-loaded"));
  await loadImages();
  rotateQuotes();
})();
