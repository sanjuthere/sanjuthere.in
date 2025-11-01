/* Robust gallery + quote script
   - Loads images from images/images.json
   - Creates slideshow with fade + gentle zoom
   - Shows placeholder if no images or fetch fails
   - Adds console warnings for debugging
*/

(async function(){
  const jsonPath = 'images/images.json';
  const slideshowId = 'slideshow';
  const quoteId = 'quoteBox';
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4200;

  const quotes = [
    "Precision engineering for reliable containers and industrial vessels.",
    "Design, simulate, and manufacture with data-driven confidence.",
    "We provide structural FEA, thermal & dynamic checks for real-world use.",
    "Custom containers, pressure vessels, and industrial enclosures — engineered to spec."
  ];

  // helper to fetch image filenames
  async function fetchImageList(path){
    try {
      const res = await fetch(path, {cache: "no-cache"});
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const list = await res.json();
      if (!Array.isArray(list)) throw new Error('images.json does not contain an array');
      // keep only allowed extensions
      return list.filter(fn => /\.(jpe?g|png|webp|svg)$/i.test(fn));
    } catch (err) {
      console.warn('Could not load images.json:', err);
      return [];
    }
  }

  // build slideshow (fade + zoom)
  function buildSlideshow(list){
    const container = document.getElementById(slideshowId);
    if (!container) return;
    container.innerHTML = '';

    if (!list || list.length === 0){
      // show friendly placeholder (no external file needed)
      const ph = document.createElement('div');
      ph.className = 'placeholder';
      ph.innerHTML = '<div><strong>No images available</strong><div style="margin-top:8px;color:#4b5563">Upload images to /images and add filenames to images/images.json</div></div>';
      container.appendChild(ph);
      console.warn('Slideshow: no images found in images/images.json or folder.');
      return;
    }

    // create img elements
    list.forEach((file, i) => {
      const img = document.createElement('img');
      img.src = `images/${file}`;
      img.alt = file;
      img.loading = 'lazy';
      if (i === 0) img.classList.add('active');
      // hide broken images automatically and warn
      img.onerror = () => {
        console.warn(`Image load failed: images/${file}. Check filename and case-sensitivity.`);
        img.style.display = 'none';
      };
      container.appendChild(img);
    });

    // start cycle
    const slides = container.querySelectorAll('img');
    if (slides.length <= 1) return;
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, slideIntervalMs);
  }

  // build simple rotating quote box
  function buildQuotes(){
    const qBox = document.getElementById(quoteId);
    if (!qBox) return;
    qBox.innerHTML = '';
    const p = document.createElement('div');
    p.className = 'quote-text';
    p.textContent = quotes[0];
    qBox.appendChild(p);

    let qi = 0;
    function showQuote(i){
      p.classList.remove('show');
      setTimeout(()=> {
        p.textContent = quotes[i];
        p.classList.add('show');
      }, 200);
    }

    setInterval(()=> {
      qi = (qi + 1) % quotes.length;
      showQuote(qi);
    }, quoteIntervalMs);

    const prev = document.getElementById('prevQuote');
    const next = document.getElementById('nextQuote');
    if (prev) prev.addEventListener('click', ()=> {
      qi = (qi - 1 + quotes.length) % quotes.length;
      showQuote(qi);
    });
    if (next) next.addEventListener('click', ()=> {
      qi = (qi + 1) % quotes.length;
      showQuote(qi);
    });

    setTimeout(()=> p.classList.add('show'), 120);
  }

  // init
  const images = await fetchImageList(jsonPath);
  buildSlideshow(images);
  buildQuotes();

})();
