// ============================================
// NAVIGATION & SCROLL
// ============================================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });

            // Close mobile menu if open (optional simplified logic)
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// ============================================
// TYPING EFFECT (HERO)
// ============================================

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Store text and clear
    const textToType = "BTech Computer Engineering Student | Aspiring AI and Machine Learning Researcher";
    // Note: We use the text from the updated HTML
    // Ideally we grab it from DOM, but let's hardcode for safety or grab cleanly
    const originalText = heroTitle.textContent.replace('|', '').trim();
    // Actually, let's just clear and type the hardcoded string to be safe and clean
    heroTitle.textContent = '';

    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    heroTitle.appendChild(cursor);

    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            // Check for special pause chars? Nah, just type
            const charSpan = document.createTextNode(textToType.charAt(charIndex));
            heroTitle.insertBefore(charSpan, cursor);
            charIndex++;
            setTimeout(typeText, 50); // Speed
        }
    }

    setTimeout(typeText, 500);
}

// ============================================
// PARTICLE NETWORK (HERO ONLY)
// ============================================

const canvas = document.getElementById('particleNetwork');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const particleCount = 40;
    const connectionDistance = 100;

    function resize() {
        // Fit to parent container (.hero-image-wrapper)
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    });

    // Wait for layout
    setTimeout(init, 100);
}

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const status = document.getElementById('form-status');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        try { // Simulated success for demo, or actual fetch if ID provided
            const formData = new FormData(this);
            const action = this.getAttribute('action');

            if (action.includes('YOUR_FORM_ID')) {
                throw new Error("Please Configure ID");
            }

            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.innerHTML = '<p style="color: #4cd964; margin-top: 1rem;">Message sent successfully!</p>';
                this.reset();
            } else {
                status.innerHTML = '<p style="color: #ff3b30; margin-top: 1rem;">Oops! There was a problem.</p>';
            }
        } catch (error) {
            status.innerHTML = '<p style="color: #ff3b30; margin-top: 1rem;">Please configure Formspree ID in code.</p>';
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

// ============================================
// ENGAGEMENT ANIMATIONS
// ============================================

// Custom Cursor
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (handled by CSS transition, we just set position)
    // Actually for "lag" effect we usually use requestAnimationFrame but CSS transition is easier/smoother
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Cursor Hover Effects
document.querySelectorAll('a, button, input, textarea, .project-card, .timeline-content, .card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
});


// Scroll Reveal Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Animate once
        }
    });
}, observerOptions);

// Select elements to animate
const hiddenElements = document.querySelectorAll('.section-title, .about-content p, .timeline-item, .edu-card, .project-card, .blog-card, .skill-category, .award-card, .cert-card, .language-card, .hero-content');
hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});
