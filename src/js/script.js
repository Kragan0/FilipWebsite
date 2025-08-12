// ----------------- TRANSLATIONS -----------------
const translations = {
  sk: {
    home: "Domov",
    about: "O advokátovi",
    services: "Služby",
    pricing: "Cenník",
    contact: "Kontakt",
    details: "Kontaktné údaje:",
    street: "Ulica:",
    city: "Mesto:",
    republic: "Slovenská republika",
    country: "Štát:",
    number: "Tel. číslo:"
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    pricing: "Pricing",
    contact: "Contact",
    details: "Contact details:",
    street: "Street:",
    city: "City:",
    republic: "Slovak Republic",
    country: "Country:",
    number: "Tel. number:"
  }
};

// ----------------- Local Storage -----------------
function getLanguage() {
  return localStorage.getItem("lang") || "sk";
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

function applyTranslations(lang = getLanguage()) {
  const dict = translations[lang] || translations.sk;
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (!key || !(key in dict)) return;
    const attr = el.getAttribute("data-translate-attr"); 
    const val = dict[key];
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });
}

function initLanguageSwitchers(root = document) {
  root.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang); // store first

      const href = btn.getAttribute("href");
      // Only prevent navigation in SPA mode
      if (!href || href === "#" || href === "") {
        e.preventDefault();
      }
    });
  });
}

// ----------------- APP -----------------
document.addEventListener('DOMContentLoaded', () => {
  const currentLanguage = getLanguage();

  // NAVBAR (load once)
  fetch("./src/components/navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;

      requestAnimationFrame(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          // initial state on reload
          const isScrolled = window.scrollY > 50;
          navbar.classList.toggle('navbar-scrolled', isScrolled);
          navbar.classList.toggle('navbar-animated-scrolled', isScrolled);

          window.addEventListener('scroll', () => {
            const s = window.scrollY > 50;
            navbar.classList.toggle('navbar-scrolled', s);
            navbar.classList.toggle('navbar-animated-scrolled', s);
          }, { passive: true });
        }

        // Bind SK/EN and translate navbar now that it exists
        initLanguageSwitchers(document);
        applyTranslations(currentLanguage);
      });
    });

  // FOOTER
  fetch("./src/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
      applyTranslations(currentLanguage);
    });

  // Banner hide on scroll
  window.addEventListener('scroll', () => {
    const banner = document.querySelector('.top-banner');
    if (banner) banner.classList.toggle('banner-hidden', window.scrollY > 10);
  }, { passive: true });

  // Hero text fade-in
  const heroText = document.querySelector(".hero-text-inner");
  if (heroText) setTimeout(() => heroText.classList.add('visible'), 50);

  // Translate anything already present in index.html
  applyTranslations(currentLanguage);
});
