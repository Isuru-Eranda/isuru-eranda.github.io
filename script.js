// Remove all existing navigation JavaScript and replace with this clean version

// Navigation Variables
let mobileMenuOpen = false;

// Clean Navigation Functions
function openMobileMenu() {
    console.log('Opening mobile menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu && mobileOverlay && mobileToggle) {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuOpen = true;
        console.log('Mobile menu opened successfully');
    } else {
        console.error('Mobile menu elements not found:', {
            menu: !!mobileMenu,
            overlay: !!mobileOverlay,
            toggle: !!mobileToggle
        });
    }
}

function closeMobileMenu() {
    console.log('Closing mobile menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu && mobileOverlay && mobileToggle) {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
        console.log('Mobile menu closed successfully');
    }
}

// Navigation Click Handler
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    let target = document.querySelector(targetId);
    
    // Special case: if clicking on #header, scroll to #intro instead
    if (targetId === '#header') {
        target = document.querySelector('#intro') || document.querySelector('#header');
    }
    
    if (target) {
        // Close mobile menu if open
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Calculate offset for fixed navbar
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const targetPosition = target.offsetTop - navHeight - 10;
        
        // Smooth scroll
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        // Update active states
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    }
}

// Initialize Navigation System
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing navigation system...');
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
        console.log('Mobile toggle found, attaching event');
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
        console.error('Mobile toggle button not found!');
    }
    
    // Mobile Close Button
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Mobile Overlay
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Desktop Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Mobile Navigation Links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Set initial active link
    const homeLinks = document.querySelectorAll('.nav-link[href="#header"], .mobile-nav-link[href="#header"]');
    homeLinks.forEach(link => {
        link.classList.add('active');
    });
    
    console.log('Navigation system initialized successfully');
});

// Debug Mobile Menu Elements
window.addEventListener('load', function() {
    console.log('=== MOBILE MENU DEBUG ===');
    console.log('Mobile toggle element:', document.getElementById('mobile-menu-toggle'));
    console.log('Mobile menu element:', document.getElementById('mobile-menu'));
    console.log('Mobile overlay element:', document.getElementById('mobile-menu-overlay'));
    console.log('Mobile close button:', document.getElementById('mobile-close-btn'));
    console.log('Mobile nav links:', document.querySelectorAll('.mobile-nav-link').length);
    console.log('Window width:', window.innerWidth);
    console.log('=== END DEBUG ===');
    
    // Force mobile menu toggle visibility on mobile screens
    if (window.innerWidth <= 768) {
        const toggle = document.getElementById('mobile-menu-toggle');
        if (toggle) {
            toggle.style.display = 'flex';
            toggle.style.visibility = 'visible';
            console.log('Forced mobile toggle visibility');
        }
    }
});
