// ===== LOADING SECTION SCRIPT =====
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Show loading image and animate it
const loadingImage = document.getElementById('loadingImage');
loadingImage.style.opacity = '1'; // Fade in the image

// Loading bar and percentage
const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');
let progress = 0;

// ===== SECTION TRANSITIONS =====
const loadingSection = document.getElementById('loadingSection');
const animationSection = document.getElementById('animationSection');
const portfolioSection = document.getElementById('portfolioSection');

let animationVisible = false;

// Transition from loading to animation section
function showAnimationSection() {
  loadingSection.style.opacity = '0';
  setTimeout(() => {
    loadingSection.style.display = 'none';
    animationSection.style.opacity = '1';
    animationVisible = true;
    
    // Enable scrolling after animation is visible
    document.body.style.overflow = 'auto';
    
    // Add a slight scroll instruction animation
    let scrollPrompt = document.createElement('div');
    scrollPrompt.innerHTML = '⬇️ Scroll Down';
    scrollPrompt.style.position = 'fixed';
    scrollPrompt.style.bottom = '30px';
    scrollPrompt.style.left = '50%';
    scrollPrompt.style.transform = 'translateX(-50%)';
    scrollPrompt.style.fontSize = '16px';
    scrollPrompt.style.fontFamily = 'Arial, sans-serif';
    scrollPrompt.style.color = 'white';
    scrollPrompt.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    scrollPrompt.style.padding = '10px 20px';
    scrollPrompt.style.borderRadius = '20px';
    scrollPrompt.style.backgroundColor = 'rgba(0,0,0,0.5)';
    scrollPrompt.style.animation = 'bounce 1s infinite';
    document.body.appendChild(scrollPrompt);
    
    // Remove after 8 seconds
    setTimeout(() => {
      scrollPrompt.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(scrollPrompt)) {
          document.body.removeChild(scrollPrompt);
        }
      }, 1000);
    }, 8000);
  }, 1000);
}

// Simulate loading time with progress
const loadingInterval = setInterval(() => {
  if (progress < 100) {
    progress += 5; // Increase progress
    loadingBar.style.width = progress + '%'; // Update loading bar width
    loadingPercentage.innerText = progress + '%'; // Update percentage text
  } else {
    clearInterval(loadingInterval); // Stop the interval when complete
    // Animate fade out of loading image
    loadingImage.style.opacity = '0'; // Fade out loading image
    
    // Transition to animation section
    setTimeout(showAnimationSection, 1000);
  }
}, 200); // Update every 200ms

// Track scroll direction and handle transitions
let lastScrollPosition = 0;
let isTransitioning = false;
let scrollTimer;

window.addEventListener('scroll', function() {
  if (!animationVisible) return;
  if (isTransitioning) return; // Skip handling during active transitions
  
  // Clear any existing timeout
  clearTimeout(scrollTimer);
  
  const currentScrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const scrollDirection = currentScrollPosition < lastScrollPosition ? 'up' : 'down';
  
  // Calculate how far the user has scrolled as a percentage - adjusted for smoother transition
  const transitionHeight = windowHeight * 0.6; // Use 60% of viewport height for transition
  const scrollPercentage = Math.min((currentScrollPosition / transitionHeight) * 100, 100);
  
  // Handle scrolling behavior based on direction
  if (scrollDirection === 'down') {
    // Scrolling down - fade out animation
    if (scrollPercentage > 0) {
      // Fade out animation section based on scroll
      const newOpacity = Math.max(1 - (scrollPercentage / 100), 0);
      animationSection.style.opacity = newOpacity;
      
      // When animation is mostly faded out, hide it
      if (scrollPercentage >= 95) {
        isTransitioning = true; // Lock transitions
        
        // Add a small delay to ensure smooth transition
        scrollTimer = setTimeout(() => {
          if (window.scrollY >= windowHeight / 3) { // Make sure we're still scrolled down
            animationSection.style.display = 'none';
          }
          isTransitioning = false; // Unlock after transition completes
        }, 300);
      }
    }
  } else if (scrollDirection === 'up') {
    // Scrolling up - potentially show animation again
    if (currentScrollPosition < windowHeight * 0.6) { // Use same threshold as for fade-out
      // We're in the upper part of the screen, show animation with appropriate opacity
      if (animationSection.style.display === 'none') {
        isTransitioning = true; // Lock transitions
        animationSection.style.display = 'block';
        
        // Small delay to ensure smooth display transition
        scrollTimer = setTimeout(() => {
          isTransitioning = false; // Unlock after transition completes
        }, 50);
      }
      
      // Calculate opacity: 1 at top, 0 at transition height
      const newOpacity = 1 - (currentScrollPosition / (windowHeight * 0.6));
      animationSection.style.opacity = Math.max(newOpacity, 0);
    }
  }
  
  lastScrollPosition = currentScrollPosition;
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Prevent scrolling until animation section is visible
document.body.style.overflow = 'hidden';

// Initialize smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.menu-item a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Scroll to the element
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Show loading section
  loadingSection.style.display = 'flex';
  loadingImage.style.display = 'block';

  let loadingComplete = false;

  // Function to update loading bar
  function updateLoadingBar() {
    if (progress < 100 && !loadingComplete) {
      progress += 1;
      loadingBar.style.width = `${progress}%`;
      loadingPercentage.textContent = `${progress}%`;

      if (progress === 100) {
        loadingComplete = true;
        setTimeout(completeLoading, 500);
      } else {
        // Calculate delay based on progress
        let delay = progress < 90 ? 30 : 50; // Slow down near the end
        setTimeout(updateLoadingBar, delay);
      }
    }
  }

  // Function to handle completion
  function completeLoading() {
    // Fade out loading section
    loadingSection.style.opacity = '0';
    loadingSection.style.transition = 'opacity 1s ease-in-out';

    // Show animation section after fade out
    setTimeout(() => {
      loadingSection.style.display = 'none';
      animationSection.style.display = 'flex';
      animationSection.style.opacity = '0';
      
      // Fade in animation section
      setTimeout(() => {
        animationSection.style.opacity = '1';
        animationSection.style.transition = 'opacity 1s ease-in-out';
      }, 100);
    }, 1000);
  }

  // Add error handling for the loading image
  const img = loadingImage.querySelector('img');
  img.onload = function() {
    console.log('Loading image loaded successfully');
    // Start loading animation after image loads
    setTimeout(updateLoadingBar, 100);
  };

  img.onerror = function() {
    console.error('Error loading image:', img.src);
    // Start loading animation even if image fails to load
    setTimeout(updateLoadingBar, 100);
  };

  // Get all necessary elements
  const loadingSection = document.getElementById('loadingSection');
  const animationSection = document.getElementById('animationSection');
  const portfolioSection = document.getElementById('portfolioSection');
  const loadingBar = document.getElementById('loadingBar');
  const loadingPercentage = document.getElementById('loadingPercentage');

  let progress = 0;
  let isLoading = true;

  // Loading animation
  function updateLoader() {
    if (progress < 100) {
      progress++;
      loadingBar.style.width = progress + '%';
      loadingPercentage.textContent = progress + '%';
      
      if (progress < 100) {
        setTimeout(updateLoader, 30);
      } else {
        showAnimationSection();
      }
    }
  }

  // Show animation section after loading
  function showAnimationSection() {
    loadingSection.style.opacity = '0';
    loadingSection.style.transition = 'opacity 1s';
    
    setTimeout(() => {
      loadingSection.style.display = 'none';
      animationSection.style.display = 'block';
      
      setTimeout(() => {
        animationSection.style.opacity = '1';
        setupScrollTransition();
      }, 100);
    }, 1000);
  }

  function setupScrollTransition() {
    let isTransitioning = false;

    window.addEventListener('scroll', function() {
      if (isTransitioning) return;

      const scrollPosition = window.pageYOffset;
      if (scrollPosition > window.innerHeight / 3) {
        isTransitioning = true;
        showPortfolioSection();
      }
    });
  }

  function showPortfolioSection() {
    animationSection.style.opacity = '0';
    
    setTimeout(() => {
      animationSection.style.display = 'none';
      portfolioSection.style.display = 'block';
      
      setTimeout(() => {
        portfolioSection.style.opacity = '1';
        portfolioSection.style.transition = 'opacity 1s';
      }, 100);
    }, 500);
  }

  // Start the loader
  setTimeout(updateLoader, 100);

  // Initial styles for sections
  portfolioSection.style.display = 'none';
  portfolioSection.style.position = 'fixed';
  portfolioSection.style.top = '0';
  portfolioSection.style.left = '0';
  portfolioSection.style.width = '100%';
  portfolioSection.style.height = '100%';
  portfolioSection.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
});