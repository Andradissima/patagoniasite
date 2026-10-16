document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MULTIIDIOMA
  ========================= */

  window.setLang = function (lang) {
    const elements = document.querySelectorAll("[data-" + lang + "]");

    elements.forEach(el => {
      const text = el.getAttribute("data-" + lang);
      if (text) el.textContent = text;
    });
  };

  // Idioma por defecto
  setLang("pt");


  /* =========================
     LIGHTBOX + GALERÍAS
  ========================= */

  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox .prev");
  const nextBtn = document.querySelector(".lightbox .next");

  let currentIndex = 0;
  let currentGallery = [];

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      currentGallery = Array.from(img.parentElement.querySelectorAll("img"));
      currentIndex = currentGallery.indexOf(img);
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = currentGallery[currentIndex].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex =
      (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex].src;
  });

  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex =
      (currentIndex + 1) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex].src;
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });


  /* =========================
     BUSCADOR (TÍTULOS + ITEMS)
  ========================= */

  const searchInput = document.getElementById("search-input");
  const sections = document.querySelectorAll("main section");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      if (query === "") {
        sections.forEach(section => {
          section.style.display = "block";
          section.querySelectorAll(".item").forEach(item => {
            item.style.display = "flex";
          });
        });
        return;
      }

      sections.forEach(section => {
        const title =
          section.querySelector("h2")?.innerText.toLowerCase() || "";
        const items = section.querySelectorAll(".item");

        // Si coincide el título
        if (title.includes(query)) {
          section.style.display = "block";
          items.forEach(item => item.style.display = "flex");
          return;
        }

        // Si no, filtrar item por item
        let anyVisible = false;

        items.forEach(item => {
          const text = item.innerText.toLowerCase();
          if (text.includes(query)) {
            item.style.display = "flex";
            anyVisible = true;
          } else {
            item.style.display = "none";
          }
        });

        section.style.display = anyVisible ? "block" : "none";
      });
    });
  }


  /* =========================
     CONTADOR DE VISITAS
  ========================= */

  let visits = localStorage.getItem("patagonia_visits");
  visits = visits ? parseInt(visits, 10) + 1 : 1;
  localStorage.setItem("patagonia_visits", visits);

  const counter = document.getElementById("visit-count");
  if (counter) counter.textContent = visits;
    /* =========================
     DESPLEGAR SABORES DE BEBIDAS
  ========================= */

  document.querySelectorAll(".flavors-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const isOpen = button.getAttribute("aria-expanded") === "true";

      panel.hidden = isOpen;
      button.setAttribute("aria-expanded", String(!isOpen));

      button.textContent = isOpen
        ? "Ver sabores ▼"
        : "Ocultar sabores ▲";
    });
  });

});
