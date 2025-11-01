/* script.js — loads images/images.json for slideshow and provides rotating quote box
   Works on static GitHub Pages (no server required).
*/

(async function(){
  // ---------- Config ----------
  const jsonPath = 'images/images.json';
  const slideshowId = 'slideshow';
  const quoteId = 'quoteBox';
  const slideIntervalMs = 3800;
  const quoteIntervalMs = 4400;

  // Engineering / CAE style quotes (edit or extend)
  const quotes = [
    "Simulate with clarity — design with confidence.",
    "FEA reveals what the eye alone cannot see.",
    "Precision modeling reduces rework and accelerates manufacturing.",
    "Good meshing is the foundation of reliable results.",
    "Optimize structures, reduce weight, and keep strength where it matters."
  ];

  // ---------- Helper to fetch images JSON ----------
  async function fetchImageList(path) {
    try {
      const resp = await fetch(path, {cache: "no-cache"});
      if (!resp.ok) throw new Error('Not found');
      const list = await resp.json();
      // filter allowed types
      return list.filter(fn => /\.(jpe?g|png|webp|svg)$/i.test(fn));
    } catch (err) {
      console.warn('Could not load images.json — falling back to empty list.', err);
      return [];
    }
  }

  // ---------- Slideshow builder ----------
  function buildSlideshow(list){
    const container = document.getElementById(slideshowId);
    if (!container) return;
    container.innerHTML = '';
    if (!list.length){
      container.innerHTML = '<div style="padding:20px;color:#334155">No images listed in images/images.json</div>';
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

    // auto cycle
    setInterval(()=> {
      qi = (qi+1) % quotes.length;
      showQuote(qi);
    }, quoteIntervalMs);

    // manual control
    const prev = document.getElementById('prevQuote');
    const next = document.getElementById('nextQuote');
    if(prev) prev.addEventListener('click', ()=> {
      qi = (qi -1 + quotes.length) % quotes.length;
      showQuote(qi);
    });
    if(next) next.addEventListener('click', ()=> {
      qi = (qi +1) % quotes.length;
      showQuote(qi);
    });

    // show first
    setTimeout(()=> p.classList.add('show'), 120);
  }

  // ---------- Init ----------
  const images = await fetchImageList(jsonPath);
  buildSlideshow(images);
  buildQuotes();

})();
