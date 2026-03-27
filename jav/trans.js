// ===== LOADING & TRANSITION SCRIPT =====
// THREE.js removed — it was rendering an empty scene (no 3D objects, just lights)

// ===== SECTION REFERENCES =====
const loadingSection = document.getElementById('loadingSection');
const animationSection = document.getElementById('animationSection');
const portfolioSection = document.getElementById('portfolioSection');

let animationVisible = true;

// ===== SESSION CHECK: Skip loading for returning visitors =====
const hasSeenLoading = sessionStorage.getItem('ra-loading-seen');

if (hasSeenLoading) {
  // Returning visitor in this session — skip straight to animation section
  loadingSection.style.display = 'none';
  animationSection.style.opacity = '1';
  animationVisible = true;
  document.body.style.overflow = 'auto';
} else {
  // First visit this session — show loading, then mark as seen
  document.body.style.overflow = 'hidden';

  const loadingImage = document.getElementById('loadingImage');
  loadingImage.style.opacity = '1';

  const loadingBar = document.getElementById('loadingBar');
  const loadingPercentage = document.getElementById('loadingPercentage');
  let progress = 0;

  // Transition from loading to animation section
  function showAnimationSection() {
    loadingSection.style.opacity = '0';
    setTimeout(() => {
      loadingSection.style.display = 'none';
      animationSection.style.opacity = '1';
      animationVisible = true;

      // Enable scrolling
      document.body.style.overflow = 'auto';

      // Scroll down prompt
      const scrollPrompt = document.createElement('div');
      scrollPrompt.textContent = 'Scroll Down';
      scrollPrompt.style.cssText = `
        position: fixed; bottom: 30px; left: 50%;
        transform: translateX(-50%); font-size: 16px;
        font-family: Arial, sans-serif; color: white;
        text-shadow: 0 0 5px rgba(0,0,0,0.5);
        padding: 10px 20px; border-radius: 20px;
        background-color: rgba(0,0,0,0.5);
        animation: bounce 1s infinite;
        transition: opacity 0.5s ease;
      `;
      document.body.appendChild(scrollPrompt);

      // Remove prompt after 5 seconds
      setTimeout(() => {
        scrollPrompt.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(scrollPrompt)) {
            document.body.removeChild(scrollPrompt);
          }
        }, 500);
      }, 5000);

      // Mark loading as seen for this session
      sessionStorage.setItem('ra-loading-seen', 'true');
    }, 300);
  }

  // Loading bar — faster: 10% every 150ms = ~1.5 seconds total
  const loadingInterval = setInterval(() => {
    if (progress < 100) {
      progress += 10;
      loadingBar.style.width = progress + '%';
      loadingPercentage.innerText = progress + '%';
    } else {
      clearInterval(loadingInterval);
      loadingImage.style.opacity = '0';
      setTimeout(showAnimationSection, 400);
    }
  }, 150);
}

// ===== SCROLL-BASED ANIMATION FADE =====
let lastScrollPosition = 0;
let isTransitioning = false;
let scrollTimer;

window.addEventListener('scroll', function() {
  if (!animationVisible) return;
  if (isTransitioning) return;

  clearTimeout(scrollTimer);

  const currentScrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const scrollDirection = currentScrollPosition < lastScrollPosition ? 'up' : 'down';

  const transitionHeight = windowHeight * 0.6;
  const scrollPercentage = Math.min((currentScrollPosition / transitionHeight) * 100, 100);

  if (scrollDirection === 'down') {
    if (scrollPercentage > 0) {
      const newOpacity = Math.max(1 - (scrollPercentage / 100), 0);
      animationSection.style.opacity = newOpacity;

      if (scrollPercentage >= 95) {
        isTransitioning = true;
        scrollTimer = setTimeout(() => {
          if (window.scrollY >= windowHeight / 3) {
            animationSection.style.display = 'none';
          }
          isTransitioning = false;
        }, 300);
      }
    }
  } else if (scrollDirection === 'up') {
    if (currentScrollPosition < windowHeight * 0.6) {
      if (animationSection.style.display === 'none') {
        isTransitioning = true;
        animationSection.style.display = 'block';
        scrollTimer = setTimeout(() => {
          isTransitioning = false;
        }, 50);
      }
      const newOpacity = 1 - (currentScrollPosition / (windowHeight * 0.6));
      animationSection.style.opacity = Math.max(newOpacity, 0);
    }
  }

  lastScrollPosition = currentScrollPosition;
});

// ===== SMOOTH SCROLLING FOR NAV LINKS =====
document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.menu-item a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
