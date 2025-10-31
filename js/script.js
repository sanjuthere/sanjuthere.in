// Auto-load all images from images.json and show slideshow
fetch("images/images.json")
  .then(res => res.json())
  .then(imageFiles => {
    const slideshow = document.getElementById("slideshow");

    imageFiles.forEach((file, i) => {
      const img = document.createElement("img");
      img.src = `images/${file}`;
      if (i === 0) img.classList.add("active");
      slideshow.appendChild(img);
    });

    let current = 0;
    const slides = document.querySelectorAll("#slideshow img");

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 4000);
  });
