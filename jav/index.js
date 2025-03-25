/* =====================================================
   Resume section tabs and tab contents
===================================================== */

const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

var resumeTabNav = function(resumeTabClick){
   resumeTabContents.forEach((resumeTabContents) =>{
      resumeTabContents.style.display = "none";
      resumeTabContents.classList.remove("active");
   });

   resumePortfolioTabBtns.forEach((resumePortfolioTabBtns) =>{
      resumePortfolioTabBtns.classList.remove("active");
   });

   resumeTabContents[resumeTabClick].style.display = "flex";

   setTimeout(() =>{
   resumeTabContents[resumeTabClick].classList.add("active");
   },100);
   
   resumePortfolioTabBtns[resumeTabClick].classList.add("active");
}

resumePortfolioTabBtns.forEach((resumePortfolioTabBtns, i) =>{
   resumePortfolioTabBtns.addEventListener("click", () => {
      resumeTabNav(i);
   })
})

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */

function myFunction() {
   document.getElementById("ra-contact-form").reset();
 }

/*=====================================================
   Shrink the height of the header on scroll
===================================================== */

window.addEventListener("scroll", () => {
   const raheader = document.querySelector(".ra-header");

   raheader.classList.toggle("shrink", window.scrollY > 0)
})

/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.

window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.pageYOffset;

   navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeigt;
      let sectionTop = navMenuSection.offsetTop -50;
      let id = navMenuSection.getAttribute("id");

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         document.querySelector(".bottom-nav .menu li a [href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a [href*=" + id + "]").classList.remove("current");
      }
   });
});

// Javascript to show bottom navigation menu on home(page load).

window.addEventListener("DOMContentLoaded", () =>{
   const bottomNav = document.querySelector(".bottom-nav");

   bottomNav.classList.toggle("active", window.scrollY < 10);
});

document.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");
   const menuHideBtn = document.querySelector(".menu-hide-btn");
   const menuShowBtn = document.querySelector(".menu-show-btn");
   const menuLinks = document.querySelectorAll(".menu li a");
   const sections = document.querySelectorAll("section[id]");

   let navTimeout;
   function updateCurrentNav() {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute("id");
    
        // Check if the section is visible in viewport (top within 50-300px)
        if (rect.top >= 0 && rect.top <= 300) {
          menuLinks.forEach(link => {
            link.classList.remove("current");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("current");
            }
          });
        }
      });
    }
    
   window.addEventListener("scroll", () => {
     updateCurrentNav();

     bottomNav.classList.remove("active");
     menuShowBtn.classList.add("active");

     if (window.scrollY > 10) {
       menuHideBtn.classList.add("active");
     } else {
       menuHideBtn.classList.remove("active");
     }

     clearTimeout(navTimeout);
     navTimeout = setTimeout(() => {
       bottomNav.classList.add("active");
       menuShowBtn.classList.remove("active");
     }, 2500);
   });

   menuHideBtn.addEventListener("click", () => {
     bottomNav.classList.remove("active");
     menuShowBtn.classList.add("active");
   });

   menuShowBtn.addEventListener("click", () => {
     bottomNav.classList.add("active");
     menuShowBtn.classList.remove("active");
   });
 });

/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */
const toTopBtn = document.querySelector(".to-top-btn");
const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  // Show or hide the button
  toTopBtn.classList.toggle("active", scrollTop > 50);

  // Animate the scroll indicator bar
  scrollIndicatorBar.style.height = `${scrollPercent}%`;
});

/* =====================================================
   Customized cursor on mousemove
===================================================== */
  const cursor = document.querySelector(".cursor");
  const dot = cursor.querySelector(".cursor-dot");
  const circle = cursor.querySelector(".cursor-circle");

  // 🔒 Disable on mobile
  if ('ontouchstart' in window || window.innerWidth < 768) {
    cursor.style.display = "none";
  } else {
    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move the dot instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    // Animate trailing circle
    function animate() {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      circle.style.left = `${circleX}px`;
      circle.style.top = `${circleY}px`;
      requestAnimationFrame(animate);
    }
    animate();

    // Click Pulse
    document.addEventListener("click", () => {
      dot.classList.add("pulse");
      setTimeout(() => dot.classList.remove("pulse"), 400);
    });

    // Hover Effects
    const hoverTargets = document.querySelectorAll(
      "a, button, .ra-main-btn, .project-card, .menu-show-btn, .menu-hide-btn"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        dot.classList.add("large");
        circle.style.display = "none";
      });
      el.addEventListener("mouseleave", () => {
        dot.classList.remove("large");
        circle.style.display = "block";
      });
    });
  }


/* =====================================================
   Website dark/light theme
===================================================== */

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () =>{
  // Change theme and save current theme on click the theme button.

  themeBtn.classList.toggle("active-sun-icon");
  document.body.classList.toggle("light-theme");

  const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
  const getCursorTheme = () => document.classList.contains("light-theme") ? "light" : "dark";

  localStorage.setItem("ra-saved-icon",getCurrentIcon());
  localStorage.setItem("ra-saved-theme",getCurrentTheme());
});

  // Get saved theme icon and theme on document loaded.

const savedIcon = localStorage.getItem("ra-saved-icon");
constsavedTheme = localStorage.getItem("ra-saved-theme");
document.addEventListener("DOMContentLoaded", () => {
  themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("actie-sun-icon");
  document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});

/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.

// Target elements and specify options to create reveal animations.
      