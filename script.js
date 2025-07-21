// Complete JavaScript for Isuru Eranda Portfolio
// ================================================================
// Author: Isuru Eranda
// Version: 2.0
// Description: Interactive portfolio functionality with mobile menu,
//              theme toggle, navigation, and enhanced image loading
// ================================================================

// ============== GLOBAL VARIABLES ==============
let mobileMenuOpen = false;

// ============== MOBILE MENU FUNCTIONS ==============
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu && mobileOverlay && mobileToggle) {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuOpen = true;
        
        // Force visibility with inline styles as backup
        mobileMenu.style.right = '0';
        mobileMenu.style.visibility = 'visible';
        mobileOverlay.style.opacity = '1';
        mobileOverlay.style.visibility = 'visible';
        
        console.log('Mobile menu opened');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu && mobileOverlay && mobileToggle) {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
        
        // Reset inline styles
        setTimeout(() => {
            mobileMenu.style.right = '';
            mobileMenu.style.visibility = '';
            mobileOverlay.style.opacity = '';
            mobileOverlay.style.visibility = '';
        }, 400); // Wait for transition to complete
        
        console.log('Mobile menu closed');
    }
}

// ============== NAVIGATION FUNCTIONS ==============
// Navigation Click Handler
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    let target = document.querySelector(targetId);
    
    if (targetId === '#header') {
        target = document.querySelector('#intro') || document.querySelector('#header');
    }
    
    if (target) {
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
        
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const targetPosition = target.offsetTop - navHeight - 10;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        // Update active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    }
}

// ============== UI COMPONENTS ==============
// Tab System for About Section
function opentab(tabname) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Portfolio Filter
function filterPortfolio(category) {
    const items = document.querySelectorAll('.work');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
    
    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.dataset.percentage;
                progressBar.style.width = percentage + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Contact Form
const scriptURL = 'https://script.google.com/macros/s/AKfycbzBOi-dDtOPLcaK-t0h5X-jdCJyj1M5PKFdOmhR0cJ7SgWZ29NhQdC_fE8q3zTFJzPd/exec';

function submitForm() {
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            msg.style.color = "#28a745";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error sending message. Please try again.";
            msg.style.color = "#dc3545";
            console.error('Error!', error.message);
        });
}

// Enhanced Image Loading for Skills
function initializeSkillImages() {
    const skillImages = document.querySelectorAll('.skill-icon img');
    
    skillImages.forEach(img => {
        // Add loading event
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            console.log(`✅ Loaded: ${this.alt}`);
        });
        
        // Add error handling with multiple fallback options
        img.addEventListener('error', function() {
            console.log(`❌ Failed to load: ${this.alt}, trying fallback...`);
            
            // First try the onerror fallback (CDN)
            if (this.src.includes('Images/skills/')) {
                const cdnUrl = this.getAttribute('onerror').match(/this\.src='([^']+)'/);
                if (cdnUrl && cdnUrl[1]) {
                    this.src = cdnUrl[1];
                    console.log(`🔄 Trying CDN for ${this.alt}: ${cdnUrl[1]}`);
                    return;
                }
            }
            
            // If CDN also fails, create a styled fallback
            const fallbackIcon = document.createElement('div');
            fallbackIcon.style.cssText = `
                width: 40px;
                height: 40px;
                background: var(--gradient-primary);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
            `;
            
            // Get first 2-3 characters of skill name for fallback
            const skillName = this.alt;
            let fallbackText = '';
            if (skillName.includes('.')) {
                fallbackText = skillName.split('.')[0].substring(0, 2);
            } else if (skillName.includes(' ')) {
                const words = skillName.split(' ');
                fallbackText = words.map(word => word.charAt(0)).join('').substring(0, 3);
            } else {
                fallbackText = skillName.substring(0, 3);
            }
            
            fallbackIcon.textContent = fallbackText;
            fallbackIcon.title = `${skillName} (Image not available)`;
            
            // Replace the broken image
            this.parentNode.replaceChild(fallbackIcon, this);
            console.log(`🔧 Created fallback for ${skillName}: ${fallbackText}`);
        });
        
        // Set initial state for smooth loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.3s ease';
        
        // Force image loading
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
    
    // Add a global image error handler as backup
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.skill-icon')) {
            console.log('Global error handler triggered for skill image:', e.target.alt);
        }
    }, true);
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing portfolio...');
    
    // Initialize theme
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.querySelector('i').className = 'fa-solid fa-sun';
        }
    }
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
        console.log('Mobile toggle button found');
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile toggle clicked, current state:', mobileMenuOpen);
            if (mobileMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    } else {
        console.warn('Mobile toggle button not found');
    }
    
    // Mobile Close Button
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    if (mobileCloseBtn) {
        console.log('Mobile close button found');
        mobileCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    } else {
        console.warn('Mobile close button not found');
    }
    
    // Mobile Overlay
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileOverlay) {
        console.log('Mobile overlay found');
        mobileOverlay.addEventListener('click', closeMobileMenu);
    } else {
        console.warn('Mobile overlay not found');
    }
    
    // Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Tab System
    document.querySelectorAll('.tab-links').forEach(tab => {
        tab.addEventListener('click', function() {
            opentab(this.dataset.tab);
        });
    });
    
    // Portfolio Filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterPortfolio(this.dataset.filter);
        });
    });
    
    // Contact Form
    const contactForm = document.forms['submit-to-google-sheet'];
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm();
        });
    }
    
    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }
    
    // Escape key for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Initialize skills animation
    animateSkills();
    
    // Initialize skill images
    initializeSkillImages();
    
    // Debug skill images after a delay
    setTimeout(() => {
        debugSkillImages();
    }, 2000);
    
    // Set initial active link
    const homeLinks = document.querySelectorAll('.nav-link[href="#header"]');
    homeLinks.forEach(link => {
        link.classList.add('active');
    });
    
    console.log('Portfolio initialized successfully');
});

// Hide loading screen when page loads
window.addEventListener('load', function() {
    hideLoadingScreen();
    console.log('Page loaded completely');
});

// Typing Animation for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            'Experienced Front-End Developer',
            'UI/UX Designer',
            'Creative Problem Solver',
            'Full-Stack Developer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        typeText();
    }
});

// Debug function to check skill image loading
function debugSkillImages() {
    console.log('🔍 SKILL IMAGES DEBUG REPORT');
    console.log('================================');
    
    const skillImages = document.querySelectorAll('.skill-icon img');
    const fallbackElements = document.querySelectorAll('.skill-icon div[title*="Image not available"]');
    
    console.log(`📊 Total skill images: ${skillImages.length}`);
    console.log(`🔧 Fallback elements: ${fallbackElements.length}`);
    
    skillImages.forEach((img, index) => {
        const status = img.complete && img.naturalWidth > 0 ? '✅' : '❌';
        console.log(`${status} ${img.alt}: ${img.src}`);
        
        if (!img.complete || img.naturalWidth === 0) {
            console.log(`   └─ Failed to load, naturalWidth: ${img.naturalWidth}, complete: ${img.complete}`);
        }
    });
    
    fallbackElements.forEach((element, index) => {
        console.log(`🔧 Fallback ${index + 1}: ${element.title}`);
    });
    
    console.log('================================');
}
