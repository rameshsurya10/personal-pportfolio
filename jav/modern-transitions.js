class ModernTransitions {
    constructor() {
        this.init();
    }

    init() {
        this.loadingSection = document.getElementById('loadingSection');
        this.animationSection = document.getElementById('animationSection');
        this.portfolioSection = document.getElementById('portfolioSection');
        
        this.setupLoading();
        this.setupScrollTransitions();
    }

    setupLoading() {
        let progress = 0;
        const loadingBar = document.getElementById('loadingBar');
        const loadingPercentage = document.getElementById('loadingPercentage');

        const updateLoader = () => {
            if (progress < 100) {
                progress++;
                loadingBar.style.width = `${progress}%`;
                loadingPercentage.textContent = `${progress}%`;

                if (progress < 100) {
                    setTimeout(updateLoader, 30);
                } else {
                    this.completeLoading();
                }
            }
        };

        setTimeout(updateLoader, 100);
    }

    completeLoading() {
        this.loadingSection.classList.add('section-exit');
        setTimeout(() => {
            this.loadingSection.style.display = 'none';
            this.animationSection.style.display = 'block';
            requestAnimationFrame(() => {
                this.animationSection.classList.add('section-active');
            });
        }, 800);
    }

    setupScrollTransitions() {
        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            lastScroll = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll(lastScroll);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll(scrollPos) {
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.min(scrollPos / windowHeight, 1);

        if (scrollProgress > 0) {
            this.animationSection.style.transform = 
                `perspective(1000px) rotateX(${scrollProgress * 20}deg) translateY(${-scrollProgress * 100}%)`;
            this.animationSection.style.opacity = 1 - scrollProgress;

            this.portfolioSection.style.display = 'block';
            this.portfolioSection.style.transform = 
                `translateY(${100 - (scrollProgress * 100)}%) scale(${0.9 + (scrollProgress * 0.1)})`;
            this.portfolioSection.style.opacity = scrollProgress;
        }

        if (scrollProgress > 0.8) {
            this.completeTransition();
        }
    }

    completeTransition() {
        this.portfolioSection.classList.add('section-active');
        this.animationSection.classList.add('section-exit');
        setTimeout(() => {
            this.animationSection.style.display = 'none';
        }, 800);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ModernTransitions();
}); 