(async function(){
  // ---------- Config ----------
  const jsonPath = 'images/images.json';
  const slideshowId = 'slideshow';
  const quoteId = 'quoteBox';
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4200;

  // Simple quotes (you can edit)
  const quotes = [
    "Automate everything — repeatable steps reduce mistakes.",
    "Infrastructure as code: treat your infra like software.",
    "Small, consistent improvements beat occasional big rewrites.",
    "Monitor first, optimize later — data drives decisions.",
    "Ship small. Ship often. Learn faster.",
    "Security and backups are not optional — they are guarantees."
  ];

  // ---------- Helper to fetch images JSON ----------
  async function fetchImageList(path) {
    try {
      // ⭐️ Add cache-busting query parameter here:
      const resp = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
      if (!resp.ok) throw new Error('Not found');
      const list = await resp.json();

      // ⭐️ Handle both array or {images:[]} formats
      const imageList = Array.isArray(list) ? list : list.images;
      if (!imageList || !imageList.length) throw new Error("No images found");

      // filter to jpg/png files only
      return imageList.filter(fn => /\.(jpe?g|png|webp|svg)$/i.test(fn));
    } catch (err) {
      console.warn('Could not load images.json — falling back to manual list.', err);
      return [];
    }
  }

  // ---------- Slideshow builder ----------
  function buildSlideshow(list){
    const container = document.getElementById(slideshowId);
    if (!container) return;
    container.innerHTML = '';
    if (!list.length){
      container.innerHTML = '<div style="color:#cfeeea;padding:20px">No images listed in images/images.json</div>';
      return;
    }

    list.forEach((file, i) => {
      const img = document.createElement('img');
      img.src = `images/${file}`;
      img.alt = file;
      if (i===0) img.classList.add('active');
      container.appendChild(img);
      img.onerror = () => { img.style.display='none'; };
    });

    // start cycling
    let idx = 0;
    const slides = container.querySelectorAll('img');
    if (slides.length <= 1) return;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, slideIntervalMs);
  }

  // ---------- Quote box ----------
  function buildQuotes(){
    const qbox = document.getElementById(quoteId);
    if(!qbox) return;
    qbox.innerHTML = '';
    const p = document.createElement('div');
    p.className = 'quote-text';
    p.textContent = quotes[0];
    qbox.appendChild(p);

    let qi = 0;
    function showQuote(i){
      p.classList.remove('show');
      setTimeout(()=> {
        p.textContent = quotes[i];
        p.classList.add('show');
      }, 200);
    }

    setInterval(()=> {
      qi = (qi+1) % quotes.length;
      showQuote(qi);
    }, quoteIntervalMs);

    setTimeout(()=> p.classList.add('show'), 100);
  }

  // ---------- Init ----------
  const images = await fetchImageList(jsonPath);
  buildSlideshow(images);
  buildQuotes();

})();
// Disable right-click and common save shortcuts
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (event.ctrlKey && (event.key === 's' || event.key === 'u' || event.key === 'p')) {
    event.preventDefault();
  }
});
