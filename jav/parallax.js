class ParallaxTransition {
    constructor() {
        // Elements
        this.animationSection = document.getElementById('animationSection');
        this.portfolioSection = document.getElementById('portfolioSection');
        
        // State
        this.isTransitioning = false;
        this.scrollProgress = 0;
        this.lastScrollTop = 0;
        
        // Initialize
        this.init();
    }

    init() {
        // Set initial styles
        this.setupStyles();
        // Add scroll listener
        this.setupScrollListener();
    }

    setupStyles() {
        // Portfolio section initial style
        this.portfolioSection.style.position = 'fixed';
        this.portfolioSection.style.top = '0';
        this.portfolioSection.style.left = '0';
        this.portfolioSection.style.width = '100%';
        this.portfolioSection.style.height = '100vh';
        this.portfolioSection.style.transform = 'translateY(100%)';
        this.portfolioSection.style.transition = 'transform 0.5s ease-out';
        this.portfolioSection.style.zIndex = '1';

        // Animation section style
        this.animationSection.style.position = 'relative';
        this.animationSection.style.zIndex = '2';
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (this.isTransitioning) return;
            this.handleScroll();
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );

        // Calculate scroll progress (0 to 1)
        this.scrollProgress = Math.min(scrollTop / (docHeight - windowHeight), 1);

        // Apply parallax effect
        this.updateParallax();

        this.lastScrollTop = scrollTop;
    }

    updateParallax() {
        // Calculate transform values based on scroll
        const portfolioTransform = Math.max(100 - (this.scrollProgress * 100), 0);
        const animationOpacity = Math.max(1 - (this.scrollProgress * 1.5), 0);

        // Apply transforms
        this.portfolioSection.style.transform = `translateY(${portfolioTransform}%)`;
        this.animationSection.style.opacity = animationOpacity;

        // Show/hide portfolio section based on scroll progress
        if (this.scrollProgress > 0) {
            this.portfolioSection.style.display = 'block';
        }

        // Complete transition when scroll reaches threshold
        if (this.scrollProgress > 0.8) {
            this.completeTransition();
        }
    }

    completeTransition() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Finish the transition
        this.portfolioSection.style.transform = 'translateY(0)';
        this.animationSection.style.opacity = '0';

        setTimeout(() => {
            this.portfolioSection.style.position = 'relative';
            this.animationSection.style.display = 'none';
            this.isTransitioning = false;
        }, 500);
    }
}

// Initialize after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading section to complete
    const loadingSection = document.getElementById('loadingSection');
    const loadingBar = document.getElementById('loadingBar');
    const loadingPercentage = document.getElementById('loadingPercentage');
    let progress = 0;

    function updateLoader() {
        if (progress < 100) {
            progress++;
            loadingBar.style.width = progress + '%';
            loadingPercentage.textContent = progress + '%';
            
            if (progress < 100) {
                setTimeout(updateLoader, 30);
            } else {
                // Start transition after loading
                startTransition();
            }
        }
    }

    function startTransition() {
        loadingSection.style.opacity = '0';
        setTimeout(() => {
            loadingSection.style.display = 'none';
            // Initialize parallax transition
            new ParallaxTransition();
        }, 1000);
    }

    // Start loading
    setTimeout(updateLoader, 100);
}); 