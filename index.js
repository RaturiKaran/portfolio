/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

 const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

/* -----------------------------------------
  Back to Top Button
 ---------------------------------------- */
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Mobile Menu
 ---------------------------------------- */
const navBurger = document.querySelector('.nav__burger');
const navItems = document.querySelector('.nav__items');

if (navBurger && navItems) {
  navBurger.addEventListener('click', () => {
    navItems.classList.toggle('nav__items--open');
    
    // Accessibility: toggle aria-expanded if we were using it, 
    // or just toggle a class for visual change on the button
    navBurger.classList.toggle('is-active');
  });

  // Close menu when clicking a link
  navItems.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navItems.classList.remove('nav__items--open');
      navBurger.classList.remove('is-active');
    });
  });
}

/* -----------------------------------------
  Scroll Animations (Intersection Observer)
 ---------------------------------------- */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add simple fade-in class to sections and cards
document.querySelectorAll('.project-card, .about__text, .contact__container').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Add the 'in-view' class style dynamically or in CSS
// For simplicity, we can just modify the style directly in the loop above? 
// No, the observer adds a class. We need the CSS for that class.
// Let's add specific styles for .in-view in JS for now to avoid another CSS edit,
// or better, just depend on the class being added and write the CSS for it.
// Actually, I didn't add .in-view styles to CSS. 
// I will just add the styles inline via JS when intersecting for maximum simplicity 
// without editing CSS again, OR I can edit CSS again. 
// Let's do the JS inline style mutation for simplicity here.

const jsObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
   });
});

document.querySelectorAll('.project-card, .about__text, .contact__container').forEach((el) => {
    // Initial state set above
    jsObserver.observe(el);
});
