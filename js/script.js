(async function () {
  const jsonPath = 'images/images.json';
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4200;

  // Load images and create slideshow
  async function loadImages() {
    const container = document.getElementById('slideshow');
    if (!container) return;
    try {
      const res = await fetch(jsonPath);
      const data = await res.json();
      const list = data.images || data;
      list.forEach((imgName, i) => {
        const img = document.createElement('img');
        img.src = `images/${imgName}`;
        if (i === 0) img.classList.add('active');
        container.appendChild(img);
      });
      const slides = container.querySelectorAll('img');
      let idx = 0;
      setInterval(() => {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
      }, slideIntervalMs);
    } catch (err) {
      console.error('Error loading images:', err);
    }
  }

  // Rotating quotes
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

  // Initialize
  await loadImages();
  rotateQuotes();
})();
