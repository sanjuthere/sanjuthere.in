(async function(){
  const jsonPath = 'images/images.json';
  const slideshowId = 'slideshow';
  const quoteId = 'quoteBox';
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4200;

  const quotes = [
    "Quality Containers. Reliable Engineering.",
    "Innovation in Steel — Building the Future of Logistics.",
    "Custom Fabrication for Every Industry Need.",
    "Durability. Precision. Performance.",
    "Delivering Strength in Every Container."
  ];

  // Fetch image list
  async function fetchImageList(path) {
    try {
      const resp = await fetch(`${path}?v=${Date.now()}`, { cache: "no-cache" });
      if (!resp.ok) throw new Error('Not found');
      const data = await resp.json();

      // ✅ Works with both formats
      const list = Array.isArray(data) ? data : data.images || [];
      return list.filter(fn => /\.(jpe?g|png|webp|svg)$/i.test(fn));
    } catch (err) {
      console.warn('Could not load images.json —', err);
      return [];
    }
  }

  // Slideshow
  function buildSlideshow(list){
    const container = document.getElementById(slideshowId);
    if (!container) return;
    container.innerHTML = '';
    if (!list.length){
      container.innerHTML = '<div style="color:#cfeeea;padding:20px">No images found.</div>';
      return;
    }

    list.forEach((file, i) => {
      const img = document.createElement('img');
      img.src = `images/${file}?v=${Date.now()}`;
      img.alt = file;
      if (i===0) img.classList.add('active');
      container.appendChild(img);
      img.onerror = () => { img.style.display='none'; };
    });

    let idx = 0;
    const slides = container.querySelectorAll('img');
    if (slides.length <= 1) return;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, slideIntervalMs);
  }

  // Quotes
  function buildQuotes(){
    const quoteElement = document.querySelector('.animated-quote');
    if (!quoteElement) return;
    let i = 0;
    setInterval(() => {
      quoteElement.style.opacity = "0";
      setTimeout(() => {
        i = (i + 1) % quotes.length;
        quoteElement.textContent = quotes[i];
        quoteElement.style.opacity = "1";
      }, 600);
    }, quoteIntervalMs);
  }

  // Init
  const images = await fetchImageList(jsonPath);
  buildSlideshow(images);
  buildQuotes();
})();
