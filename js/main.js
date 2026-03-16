// Main JavaScript for jgrdev Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavigation();
    initScrollAnimations();
    initTiltEffect();
    initContactForm();
    initBackToTop();
    initMouseFollower();
});

// Typing Effect
function initTypingEffect() {
    const textElement = document.querySelector('.typing-text');
    const texts = ['jgrdev', 'Desarrollador', 'Creador', 'Innovador'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations with GSAP
function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        gsap.from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Skills cards
        gsap.from('.skill-card', {
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 85%',
                toggleActions: 'play none none none' // Only play once
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: "all"
        });

        // Projects cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: "all"
        });

        // Stack items
        gsap.from('.stack-item', {
            scrollTrigger: {
                trigger: '.stack',
                start: 'top 80%',
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.7)'
        });

        // Contact section
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
            },
            x: -60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
            },
            x: 60,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Section headers
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: '.section-header',
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

// 3D Tilt Effect
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i><span>Enviado</span>';
        btn.style.background = 'linear-gradient(135deg, #27ca40, #00d4ff)';
        
        // Reset form
        form.reset();
        
        // Show success message
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    });

    // Add floating label effect
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });
    });
}

// Back to Top
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Custom Mouse Follower
function initMouseFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        followerX += (cursorX - followerX) * 0.1;
        followerY += (cursorY - followerY) * 0.1;
        
        cursor.style.left = followerX + 'px';
        cursor.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add cursor styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .cursor-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background 0.3s;
            mix-blend-mode: difference;
        }
        
        .cursor-follower.hover {
            width: 50px;
            height: 50px;
            background: rgba(0, 212, 255, 0.1);
        }
    `;
    document.head.appendChild(style);

    // Add hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-card, .project-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Performance: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Smooth scroll improvement
window.addEventListener('scroll', debounce(() => {
    // Any scroll-based calculations can go here
}, 10));

// Prevent scroll jank
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const loadStyles = document.createElement('style');
    loadStyles.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadStyles);
});