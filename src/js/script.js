
document.addEventListener('DOMContentLoaded', () => {
    fetch("./src/components/navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;
  
      requestAnimationFrame(() => {
      const navbar = document.querySelector('.navbar');
      
      if (!navbar) {
        return;
      } 
      // Note: Need to check the scroll on reload
      if (window.scrollY > 50)
      {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.add('navbar-animated-scrolled');
      }

      window.addEventListener('scroll', () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        navbar.classList.toggle("navbar-animated-scrolled", window.scrollY > 50);
        });
      });
    });
    fetch("./src/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
      
    });
    fetch("./src/components/footer-map.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('map-placeholder').innerHTML = html;
    });
    
    const heroText = document.querySelector(".hero-text-inner"); 
    if (heroText) {
      
      setTimeout(() => {
      heroText.classList.add('visible'); 
       },50);
    }
    else {
      console.log("Not found");
    }



  // Insert map

});
