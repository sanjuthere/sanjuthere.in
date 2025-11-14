/* script.js — category gallery + i18n + hidden whatsapp */
(function(){
  "use strict";

  /* ---------- Config ---------- */
  const imagesJsonPath = 'images/images.json'; // category-wise JSON
  const defaultLang = 'en';
  let currentLang = defaultLang;
  const categoriesOrder = ['farming','fruits','vegetables','spices','mandi'];

  /* ---------- Simple multilingual content (you can expand) ---------- */
  const LANG = {
    en: {
      brandName: "Sanjuthere Agro Exports",
      tagline: "Harvesting Quality • Delivering Globally",
      navHome: "Home", navServices: "Services", navGallery: "Gallery", navProducts: "Products", navContact: "Contact",
      heroTitle: "Your Reliable Partner in Agricultural Procurement & Global Export",
      heroSubtitle: "We specialize in sourcing, processing, and delivering the finest agricultural products — from farms to international markets.",
      ctaInquiry: "Send Inquiry", ctaWhatsapp: "WhatsApp Inquiry",
      galleryTitle: "Our Operations", gallerySubtitle: "From Indian soil to global shelves",
      contactTitle: "Get In Touch", contactSubtitle: "For bulk orders or custom procurement requests, please include product details and destination.",
      sendMessage: "Send Message",
      footerText: "© 2025 Sanjuthere Agro Exports | Procurement • Packaging • Export"
    },
    hi: { brandName:"संजुथेरे एग्रो एक्सपोर्ट्स", tagline:"गुणवत्ता की कटाई • विश्व स्तर पर वितरण", navHome:"होम",navServices:"सेवाएं",navGallery:"गैलरी",navProducts:"उत्पाद",navContact:"संपर्क",
      heroTitle:"कृषि खरीद और वैश्विक निर्यात में आपका विश्वसनीय साथी", heroSubtitle:"हम बेहतरीन कृषि उत्पादों की खरीद, प्रसंस्करण और वितरण में विशेषज्ञ हैं - खेतों से अंतर्राष्ट्रीय बाजारों तक।",
      ctaInquiry:"पूछताछ भेजें", ctaWhatsapp:"व्हाट्सएप पूछताछ", galleryTitle:"हमारे संचालन", gallerySubtitle:"भारतीय धरती से वैश्विक बाजार तक", contactTitle:"संपर्क करें", contactSubtitle:"थोक आदेश या कस्टम खरीद अनुरोधों के लिए, कृपया उत्पाद विवरण और गंतव्य शामिल करें।", sendMessage:"संदेश भेजें", footerText:"© 2025 संजुथेरे एग्रो एक्सपोर्ट्स | खरीद • पैकेजिंग • निर्यात"
    },
    ar: { brandName:"سانجوثير للصادرات الزراعية", tagline:"الحصاد بالجودة • التوصيل عالمياً", navHome:"الرئيسية",navServices:"الخدمات",navGallery:"المعرض",navProducts:"المنتجات",navContact:"اتصل بنا",
      heroTitle:"شريكك الموثوق في شراء وتصدير المنتجات الزراعية", heroSubtitle:"نحن متخصصون في التوريد والتعبئة والتوصيل للأسواق العالمية.", ctaInquiry:"أرسل استفسار", ctaWhatsapp:"استفسار واتساب", galleryTitle:"عملياتنا", gallerySubtitle:"من التربة الهندية إلى الأسواق العالمية", contactTitle:"تواصل معنا", contactSubtitle:"لطلبات الجملة أو طلبات التوريد المخصصة، يرجى تضمين تفاصيل المنتج والوجهة.", sendMessage:"إرسال", footerText:"© 2025 سانجوثير للصادرات الزراعية | شراء • تعبئة • تصدير"
    },
    fr: { brandName:"Sanjuthere Agro Exports", tagline:"Récolter la qualité • Livrer mondialement", navHome:"Accueil",navServices:"Services",navGallery:"Galerie",navProducts:"Produits",navContact:"Contact",
      heroTitle:"Votre partenaire fiable en approvisionnement agricole et export", heroSubtitle:"Nous sommes spécialisés dans l'approvisionnement, la transformation et la livraison des meilleurs produits agricoles.",
      ctaInquiry:"Envoyer une demande", ctaWhatsapp:"Demande WhatsApp", galleryTitle:"Nos opérations", gallerySubtitle:"Du sol indien aux rayons mondiaux", contactTitle:"Contactez-nous", contactSubtitle:"Pour commandes en gros ou demandes personnalisées, inclure détails et destination.", sendMessage:"Envoyer", footerText:"© 2025 Sanjuthere Agro Exports | Approvisionnement • Emballage • Export"
    },
    ne: { brandName:"Sanjuthere Agro Exports", tagline:"गुणस्तरको पैदावार • विश्वव्यापी वितरण", navHome:"गृहपृष्ठ",navServices:"सेवाहरू",navGallery:"ग्यालरी",navProducts:"उत्पादन",navContact:"सम्पर्क",
      heroTitle:"कृषि खरिद र विश्वव्यापी निर्यातमा तपाईंको भरपर्दो साझेदार", heroSubtitle:"हामी फार्महरूबाट अन्तर्राष्ट्रिय बजारसम्म उत्कृष्ट कृषि उत्पादनहरू ख़रीद, प्रशोधन र वितरणमा विशेषज्ञ छौं।", ctaInquiry:"अनुरोध पठाउनुहोस्", ctaWhatsapp:"व्हाट्सएप अनुरोध", galleryTitle:"हाम्रो सञ्चालन", gallerySubtitle:"भारतीय माटोबाट विश्वव्यापी शेल्फसम्म", contactTitle:"सम्पर्क गर्नुहोस्", contactSubtitle:"थोक अर्डर वा कस्टम खरिद अनुरोधको लागि, उत्पादन विवरण र गन्तव्य समावेश गर्नुहोस्।", sendMessage:"पठाउनुहोस्", footerText:"© 2025 Sanjuthere Agro Exports | खरिद • प्याकेजिङ • निर्यात"
    },
    ur: { brandName:"Sanjuthere Agro Exports", tagline:"معیار کی کٹائی • عالمی سطح پر ترسیل", navHome:"ہوم",navServices:"خدمات",navGallery:"گیلری",navProducts:"مصنوعات",navContact:"رابطہ",
      heroTitle:"زرعی خریداری اور عالمی برآمدات میں آپ کا قابل اعتماد پارٹنر", heroSubtitle:"ہم فارمز سے بین الاقوامی مارکیٹ تک بہترین زرعی مصنوعات کی خرید، پروسس اور ڈیلیور کرنے میں ماہر ہیں۔", ctaInquiry:"استفسار بھیجیں", ctaWhatsapp:"واٹس ایپ استفسار", galleryTitle:"ہماری کارروائیاں", gallerySubtitle:"بھارتی مٹی سے عالمی شیلف تک", contactTitle:"ہم سے رابطہ کریں", contactSubtitle:"بلک آرڈرز یا کسٹم پروکیورمنٹ کی درخواستوں کے لیے، براہِ کرم پروڈکٹ کی تفصیلات اور منزل شامل کریں۔", sendMessage:"پیغام بھیجیں", footerText:"© 2025 Sanjuthere Agro Exports | خرید • پیکیجنگ • ایکسپورٹ"
    },
    bn: { brandName:"Sanjuthere Agro Exports", tagline:"গুণগত ফলন • বিশ্বব্যাপী ডেলিভারি", navHome:"হোম",navServices:"সেবা",navGallery:"গ্যালারি",navProducts:"পণ্য",navContact:"কনট্যাক্ট",
      heroTitle:"কৃষি সংগ্রহ এবং বিশ্ববাজারে রপ্তানির আপনার নির্ভরযোগ্য অংশীদার", heroSubtitle:"আমরা খামার থেকে আন্তর্জাতিক বাজার পর্যন্ত শ্রেষ্ঠ কৃষি পণ্য সংগ্রহ, প্রক্রিয়াকরণ ও সরবরাহে বিশেষজ্ঞ।", ctaInquiry:"অনুরোধ পাঠান", ctaWhatsapp:"হোয়াটসঅ্যাপ অনুরোধ", galleryTitle:"আমাদের কার্যক্রম", gallerySubtitle:"ভারতীয় মাটি থেকে বৈশ্বিক তাক পর্যন্ত", contactTitle:"যোগাযোগ করুন", contactSubtitle:"বাল্ক অর্ডার বা কাস্টম চাহিদার জন্য পণ্য বিবরণ ও গন্তব্য দিন।", sendMessage:"পাঠান", footerText:"© 2025 Sanjuthere Agro Exports | প্রোকিউরমেন্ট • প্যাকেজিং • রপ্তানি"
    }
  };

  /* ---------- Quotes for quote-box (multi-language) ---------- */
  const QUOTES = {
    en:["From Indian soil to global shelves.","Every grain tells a story of care.","Quality harvested with integrity.","Connecting farmers to the world.","Sustainably sourced, globally delivered."],
    hi:["भारतीय धरती से वैश्विक बाजार तक।","हर अनाज देखभाल की कहानी बताता है।","ईमानदारी के साथ कटाई की गई गुणवत्ता।","किसानों को दुनिया से जोड़ना।","स्थायी रूप से प्राप्त, विश्व स्तर पर वितरित।"],
    ar:["من التربة الهندية إلى الرفوف العالمية.","كل حبة تحكي قصة رعاية.","جودة تم حصادها بنزاهة.","ربط المزارعين بالعالم.","مصدر مستدام، تسليم عالمي."],
    fr:["Du sol indien aux rayons mondiaux.","Chaque grain raconte une histoire de soin.","Qualité récoltée avec intégrité.","Connecter les agriculteurs au monde.","Source durable, livraison mondiale."],
    ne:["भारतीय माटोबाट विश्वव्यापी शेल्फसम्म।","हरेक दाना हेरचाहको कथा भन्छ।","सत्यनिष्ठासँग उठाइएको गुणस्तर।","किसानहरुलाई संसारसँग जोड्दै।","स्थायी रुपमा स्रोत, विश्वव्यापी वितरण।"],
    ur:["بھارتی مٹی سے عالمی شیلف تک۔","ہر دانہ دیکھ بھال کی کہانی بتاتا ہے۔","ایمانداری کے ساتھ فصل کی صاف معیار۔","زرعیوں کو دنیا سے جوڑنا۔","پائیدار طور پر حاصل شدہ، عالمی سطح پر فراہم۔"],
    bn:["ভারতীয় মাটি থেকে বৈশ্বিক তাক পর্যন্ত।","প্রতিটি শস্য যত্নের গল্প বলে।","নিষ্ঠার সাথে সংগ্রহিত মান।","কৃষকদের বিশ্বের সাথে সংযুক্ত করা।","টেকসইভাবে প্রাপ্ত, বিশ্বব্যাপী বিতরণ।"]
  };

  /* ---------- Utils: translate page by LANG object ---------- */
  function applyLang(lang){
    currentLang = lang;
    document.getElementById('currentLang').textContent = lang.toUpperCase();
    // static keys: data-key attributes
    document.querySelectorAll('[data-key]').forEach(el=>{
      const k = el.getAttribute('data-key');
      if(LANG[lang] && LANG[lang][k]) {
        el.textContent = LANG[lang][k];
      }
    });
    // update quote text now
    const qEl = document.getElementById('quoteText');
    if(qEl) qEl.textContent = (QUOTES[lang] && QUOTES[lang][0])||QUOTES['en'][0];
  }

  // language toggle UI
  const langToggle = document.getElementById('langToggle');
  if(langToggle){
    langToggle.addEventListener('click',()=>{
      // rotate languages list
      const list = Object.keys(LANG);
      let idx = list.indexOf(currentLang);
      idx = (idx+1)%list.length;
      applyLang(list[idx]);
    });
  }

  /* ---------- Mobile menu toggle ---------- */
  const mobBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if(mobBtn && navMenu){
    mobBtn.addEventListener('click',()=>{ navMenu.classList.toggle('active'); mobBtn.classList.toggle('active'); })
  }

  /* ---------- Fetch category JSON and build gallery ---------- */
  async function fetchCategories(){
    try{
      const r = await fetch(imagesJsonPath,{cache:"no-cache"});
      if(!r.ok) throw new Error('no json');
      const data = await r.json();
      return data;
    }catch(e){
      console.warn('images JSON load failed, using fallback',e);
      return null;
    }
  }

  function buildCategoryControls(data){
    const ctl = document.getElementById('categoryControls');
    if(!ctl) return;
    ctl.innerHTML = '';
    const cats = Object.keys(data).filter(c=>data[c] && data[c].length);
    // ensure desired order
    const order = categoriesOrder.filter(c=>cats.includes(c)).concat(cats.filter(c=>!categoriesOrder.includes(c)));
    order.forEach((c,i)=>{
      const btn = document.createElement('button');
      btn.className = 'category-btn'+(i===0?' active':'');
      btn.textContent = c.charAt(0).toUpperCase()+c.slice(1);
      btn.dataset.cat = c;
      btn.addEventListener('click',()=> {
        document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        populateGallery(data[c]);
      });
      ctl.appendChild(btn);
    });
    // default populate first
    if(order[0]) populateGallery(data[order[0]]);
  }

  function populateGallery(list){
    const grid = document.getElementById('galleryGrid'); if(!grid) return;
    grid.innerHTML=''; if(!list || !list.length){ grid.innerHTML='<div style="padding:20px">No images</div>'; return; }
    list.forEach((src,idx)=>{
      const item = document.createElement('div'); item.className='gallery-item';
      const img = document.createElement('img'); img.loading='lazy'; img.alt='photo '+(idx+1);
      img.src = src;
      item.appendChild(img);
      item.addEventListener('click',()=> openLightbox(list, idx));
      grid.appendChild(item);
    });
  }

  /* ---------- Lightbox ---------- */
  const lb = { el:document.getElementById('lightbox'), img:document.getElementById('lbImg'), wrap:document.getElementById('lbImgWrap'),
    close:document.getElementById('lbClose'), next:document.getElementById('lbNext'), prev:document.getElementById('lbPrev') };
  let lbList=[], lbIndex=0;
  function openLightbox(list,idx){
    if(!lb.el) return; lbList=list; lbIndex=idx;
    lb.img.src = list[idx]; lb.el.classList.add('active'); lb.el.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){ if(!lb.el) return; lb.el.classList.remove('active'); lb.el.setAttribute('aria-hidden','true'); lb.img.src=''; }
  function lbNext(){ if(lbList.length===0) return; lbIndex=(lbIndex+1)%lbList.length; lb.img.src=lbList[lbIndex]; }
  function lbPrev(){ if(lbList.length===0) return; lbIndex=(lbIndex-1+lbList.length)%lbList.length; lb.img.src=lbList[lbIndex]; }

  if(lb.close) lb.close.addEventListener('click',closeLightbox);
  if(lb.next) lb.next.addEventListener('click',()=>{ lbNext(); resetSlideTimer(); });
  if(lb.prev) lb.prev.addEventListener('click',()=>{ lbPrev(); resetSlideTimer(); });
  // close on outside click
  if(lb.el) lb.el.addEventListener('click',(e)=>{ if(e.target===lb.el) closeLightbox(); });

  /* ---------- Quotes auto-rotate ---------- */
  function startQuoteRotation(){
    const qEl = document.getElementById('quoteText'); if(!qEl) return;
    let i=0; setInterval(()=>{ i=(i+1)% (QUOTES[currentLang] ? QUOTES[currentLang].length : QUOTES['en'].length); qEl.style.opacity=0; setTimeout(()=>{ qEl.textContent=(QUOTES[currentLang]||QUOTES['en'])[i]; qEl.style.opacity=1; },300); },5000);
  }

  /* ---------- WhatsApp hidden (base64) ---------- */
  // Base64 of "+918712231501" => "KzkxODcxMjIzMTUwMQ==" (we store without plus)
  const phone_b64 = "KzkxODcxMjIzMTUwMQ==";
  function getWhatsAppNumber(){ try{ return atob(phone_b64); }catch(e){ return "918712231501"; } }
  function buildWhatsAppButton(){
    const wbtn = document.getElementById('whatsappBtn');
    const waf = document.getElementById('waf');
    const n = getWhatsAppNumber();
    const waUrl = `https://wa.me/${encodeURIComponent(n)}?text=${encodeURIComponent('Hello Sanjuthere Agro Exports, I would like to inquire about...')}`;
    if(wbtn) { wbtn.href = waUrl; }
    if(waf) { waf.href = waUrl; waf.innerHTML = "💬"; }
    // also attach to footer social if wanted
  }

  /* ---------- Init ---------- */
  async function init(){
    applyLang(defaultLang);
    buildWhatsAppButton();
    startQuoteRotation();
    // load categories JSON
    const data = await fetchCategories();
    if(data){
      // if file already category-wise
      if(typeof data === 'object' && (data.farming || data.fruits || data.vegetables)) {
        buildCategoryControls(data);
      } else {
        // older flat array -> put in farming category
        buildCategoryControls({ farming: Array.isArray(data)?data:[] });
      }
    } else {
      // fallback sample (empty)
      buildCategoryControls({ farming:[] });
    }
  }

  // simple reset timer placeholder for lightbox navigation
  function resetSlideTimer(){ /* noop */ }

  // run
  document.addEventListener('DOMContentLoaded', init);
})();
