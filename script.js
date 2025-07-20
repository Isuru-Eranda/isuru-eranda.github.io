// Smooth scrolling for navigation links - Initial setup
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleNavClick);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('#header, #intro, #about, #Services, #skills, #protfolio, #Contact');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100; // Add offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    // Special case: if we're at the top or in intro section, highlight HOME
    if (window.scrollY < 100 || current === 'intro') {
        current = 'header';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    const homeLink = document.querySelector('nav ul li a[href="#header"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Test all navigation links
    console.log('Navigation links found:', document.querySelectorAll('nav ul li a').length);
    console.log('Sections found:', document.querySelectorAll('#header, #intro, #about, #Services, #skills, #protfolio, #Contact').length);
    
    // Re-attach event listeners to ensure they work
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Remove any existing listeners
        anchor.removeEventListener('click', handleNavClick);
        // Add the new listener
        anchor.addEventListener('click', handleNavClick);
    });
});

// Navigation click handler function
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    let target = document.querySelector(targetId);
    
    // Special case: if clicking on #header, scroll to #intro instead (the actual content)
    if (targetId === '#header') {
        target = document.querySelector('#intro') || document.querySelector('#header');
    }
    
    if (target) {
        // Close mobile menu if open
        const sidemenu = document.getElementById('sidemenu');
        if (sidemenu && window.innerWidth <= 768) {
            sidemenu.style.right = '-200px';
        }
        
        // Calculate the offset for the fixed navbar
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const targetPosition = target.offsetTop - navHeight - 10;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        // Update active link immediately
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    }
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typingElement.textContent = '';
        typeWriter(typingElement, 'Software Engineer & UI/UX Designer');
    }
});

// Enhanced Tab functionality with better error handling
function opentab(tabname) {
    // Remove active class from all tab links
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");
    
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-link");
    }
    
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove("active-tab");
    }
    
    // Add active class to clicked tab link
    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active-link");
    }
    
    // Show the selected tab content
    const targetTab = document.getElementById(tabname);
    if (targetTab) {
        targetTab.classList.add("active-tab");
    }
}

// Initialize tab system on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to tab links
    const tabLinks = document.querySelectorAll('.tab-links');
    
    tabLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tabLinks.forEach(l => l.classList.remove('active-link'));
            
            // Remove active class from all tab contents
            const tabContents = document.querySelectorAll('.tab-contents');
            tabContents.forEach(content => content.classList.remove('active-tab'));
            
            // Add active class to clicked link
            this.classList.add('active-link');
            
            // Show corresponding tab content
            const tabName = this.getAttribute('data-tab');
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active-tab');
            }
        });
    });
    
    // Ensure the first tab (about-skills) is active by default
    const skillsTab = document.getElementById('about-skills');
    const firstTabLink = document.querySelector('.tab-links.active-link');
    
    if (skillsTab && firstTabLink) {
        skillsTab.classList.add('active-tab');
    }
});

// Mobile menu functionality
var sidemenu = document.getElementById("sidemenu")

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.title = 'Switch to light mode';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.title = 'Switch to dark mode';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon and title
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggle.title = 'Switch to light mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggle.title = 'Switch to dark mode';
            localStorage.setItem('theme', 'light');
        }
        
        // Add a subtle animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
});

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.work');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Skills progress animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, div[id]');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Contact form functionality
const scriptURL = 'https://script.google.com/macros/s/AKfycbx25Rcs4AAA9ZM-SYWPrR2bfJT8KFE9RQ5zjzo9sqck-_yOLmct1WOnLoQscIR6K8nTQg/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault()
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "✅ Message sent successfully!"
                msg.style.color = "#4CAF50"
                setTimeout(function () {
                    msg.innerHTML = ""
                }, 5000)
                form.reset()
            })
            .catch(error => {
                console.error('Error!', error.message)
                msg.innerHTML = "❌ Error sending message. Please try again."
                msg.style.color = "#f44336"
                setTimeout(function () {
                    msg.innerHTML = ""
                }, 5000)
            })
            .finally(() => {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
    })
}

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.getElementById('header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    .animate {
        animation: fadeIn 0.8s ease-out;
    }

    /* Loading screen styles */
    #loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    /* Scroll to top button styles */
    #scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #007bff;
        color: #fff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        z-index: 10000;
    }

    #scroll-top.show {
        display: flex;
    }

    /* Pulse animation for CTA buttons */
    .primary-btn.pulse {
        animation: pulse-animation 2s infinite;
    }

    @keyframes pulse-animation {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    /* Floating animation for portfolio items */
    @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }

    .floating {
        animation: float 3s ease-in-out infinite;
    }

    /* Bounce animation for service items */
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }

    .bounce-in {
        animation: bounce 2s ease infinite;
    }
`;
document.head.appendChild(style);

// Loading screen functionality
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
    
    // Add logo link functionality
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
            const homeLink = document.querySelector('nav ul li a[href="#header"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        });
    }
    
    // Double-check navigation is working after page loads
    setTimeout(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (!anchor.onclick && !anchor.getAttribute('data-nav-attached')) {
                anchor.addEventListener('click', handleNavClick);
                anchor.setAttribute('data-nav-attached', 'true');
            }
        });
    }, 500);
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced intersection observer for better animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes based on element attributes
            if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('visible');
            }
            if (entry.target.classList.contains('slide-in-left')) {
                entry.target.classList.add('visible');
            }
            if (entry.target.classList.contains('slide-in-right')) {
                entry.target.classList.add('visible');
            }
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 500);
            }
            
            // Add bounce animation to service items
            if (entry.target.classList.contains('service-item')) {
                entry.target.classList.add('bounce-in');
            }
            
            // Add floating animation to portfolio items
            if (entry.target.classList.contains('work')) {
                entry.target.classList.add('floating');
            }
        }
    });
}, observerOptions);

// Apply animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const aboutSection = document.querySelector('#about .about-col-1');
    if (aboutSection) aboutSection.classList.add('slide-in-left');
    
    const aboutContent = document.querySelector('#about .about-col-2');
    if (aboutContent) aboutContent.classList.add('slide-in-right');
    
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.classList.add('fade-in');
        animationObserver.observe(item);
    });
    
    const portfolioItems = document.querySelectorAll('.work');
    portfolioItems.forEach(item => {
        item.classList.add('fade-in');
        animationObserver.observe(item);
    });
    
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
        box.classList.add('fade-in');
        animationObserver.observe(box);
    });
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.classList.add('slide-in-left');
        animationObserver.observe(item);
    });
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('slide-in-right');
        animationObserver.observe(contactForm);
    }
    
    // Observe sections
    const sections = document.querySelectorAll('section, div[id]');
    sections.forEach(section => {
        animationObserver.observe(section);
    });
});

// Add smooth reveal animation on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Dynamic greeting based on time
document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = 'Good Morning, I\'m';
        } else if (hour < 18) {
            greeting = 'Good Afternoon, I\'m';
        } else {
            greeting = 'Good Evening, I\'m';
        }
        
        greetingElement.textContent = greeting;
    }
});

// Add pulse animation to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.primary-btn');
    ctaButtons.forEach(btn => {
        btn.classList.add('pulse');
    });
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'Images/photo-intro.jpg',
        'Images/about image.jpg',
        'Images/work-1.png',
        'Images/work-2.png',
        'Images/work-3.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Enhanced responsive functionality
document.addEventListener('DOMContentLoaded', () => {
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#sidemenu a[href^="#"]');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closemenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const sidemenu = document.getElementById('sidemenu');
        const openIcon = document.getElementById('openmenu-icon');
        
        if (!sidemenu.contains(e.target) && !openIcon.contains(e.target)) {
            closemenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) {
            closemenu();
        }
    });
    
    // Improve touch scroll performance
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Add touch class for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
