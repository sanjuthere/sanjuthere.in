
// Smooth scroll highlight for navbar
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) current = section.getAttribute("id");
  });
  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

// Auto-load all images from /images folder (requires filenames to be known)
const imageGallery = document.getElementById("imageGallery");
const imageList = [
  "container-01.jpg",
  "container-02.jpg",
  "plant-view.jpg",
  "team-photo.jpg"
  // 👆 add more filenames here
];

imageList.forEach(imgName => {
  const img = document.createElement("img");
  img.src = `images/${imgName}`;
  img.alt = imgName;
  imageGallery.appendChild(img);
});
