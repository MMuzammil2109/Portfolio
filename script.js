// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'web applications.',
    'full-stack solutions.',
    'scalable systems.',
    'enterprise software.',
    'user experiences.',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

typeWriter();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = scrollTop;
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Scroll Animations (AOS) =====
function handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);



// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            counter.dataset.animated = 'true';
            const target = parseInt(counter.dataset.count);
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                counter.textContent = current;
            }, 40);
        }
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== Particles in Hero =====
function createParticles() {
    const container = document.getElementById('particles');
    const count = 50;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? 'rgba(99,102,241,0.3)' : 'rgba(6,182,212,0.3)'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200}px, -${Math.random() * 500 + 200}px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const formData = new FormData(contactForm);

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();

        if (data.success) {
            formStatus.textContent = '\u2713 Message sent successfully!';
            formStatus.classList.add('success');
            contactForm.reset();
        } else {
            formStatus.textContent = 'Something went wrong. Please try again.';
            formStatus.classList.add('error');
        }
    } catch {
        formStatus.textContent = 'Network error. Please try again.';
        formStatus.classList.add('error');
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
});

// ===== Smooth reveal on page load =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
