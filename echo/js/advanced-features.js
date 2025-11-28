/* ========================================
   ADVANCED FEATURES JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('data-tooltip', 'Back to Top');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        // Update progress bar
        updateScrollProgress();
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== SCROLL PROGRESS BAR =====
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
    
    // ===== PAGE LOADER =====
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(loader);
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 500);
    });
    
    // ===== ANIMATE ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe service cards, project cards, etc.
    const animateElements = document.querySelectorAll('.service-card, .project-card, .team-member, .feature-card, .milestone-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // ===== PARTICLE BACKGROUND =====
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.prepend(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 25000);
    }
    
    // Create particles periodically
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 1000);
    }
    setInterval(createParticle, 2000);
    
    // ===== ENHANCED DROPDOWN ACCESSIBILITY =====
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== LAZY LOADING IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== ADD TOOLTIPS TO SOCIAL LINKS =====
    const socialLinks = document.querySelectorAll('.social-links a');
    const tooltips = {
        'facebook': 'Follow us on Facebook',
        'twitter': 'Follow us on Twitter',
        'linkedin': 'Connect on LinkedIn',
        'instagram': 'Follow us on Instagram'
    };
    
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            const classes = icon.className;
            Object.keys(tooltips).forEach(key => {
                if (classes.includes(key)) {
                    link.setAttribute('data-tooltip', tooltips[key]);
                }
            });
        }
    });
    
    // ===== NUMBER COUNTER ANIMATION =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count || entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ===== ENHANCED MOBILE MENU =====
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // ===== FORM VALIDATION ENHANCEMENT =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.style.borderColor = '#4CAF50';
                } else if (this.value) {
                    this.style.borderColor = '#ff4444';
                }
            });
        });
    });
    
    // ===== COPY TO CLIPBOARD FUNCTIONALITY =====
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#4CAF50' : '#ff4444'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showNotification('Search feature coming soon!', 'info');
        }
        
        // ESC to close mobile menu
        if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-times');
            }
        }
    });
    
    // ===== PAGE VISIBILITY CHANGE =====
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '👋 Come back! - Eco Engineering';
        } else {
            document.title = 'Eco Engineering | Telecommunications Solutions';
        }
    });
    
    // ===== PERFORMANCE MONITORING =====
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
    
    console.log('✅ Advanced features initialized successfully!');
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
