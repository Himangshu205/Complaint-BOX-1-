// DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initForm();
    initScrollEffects();
});

// Navigation smooth scrolling
function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Form handling
function initForm() {
    const form = document.getElementById('complaintForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitComplaint();
        });
    }
}

function submitComplaint() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const details = document.getElementById('detailsInput').value;

    if (!details.trim()) {
        alert('Please describe your complaint');
        return;
    }

    // Simulate API submission
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
        document.getElementById('successMessage').classList.remove('hidden');
        document.getElementById('successMessage').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        resetForm();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function resetForm() {
    document.getElementById('complaintForm').reset();
    document.getElementById('successMessage').classList.add('hidden');
}

// Scroll functions
function scrollToComplaint() {
    document.getElementById('complaint').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToAwareness() {
    document.getElementById('awareness').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Copy emergency numbers to clipboard
function copyNumber(number) {
    navigator.clipboard.writeText(number).then(() => {
        const card = event.target.closest('.glass-card');
        const originalHTML = card.innerHTML;
        
        card.style.transform = 'scale(0.95)';
        card.innerHTML = `
            <div class="text-2xl font-bold text-emerald-400 mb-2">✓ Copied!</div>
            <div class="text-white text-lg font-semibold">${number}</div>
        `;
        
        setTimeout(() => {
            card.innerHTML = originalHTML;
            card.style.transform = '';
        }, 1200);
    }).catch(() => {
        alert('Copy failed: ' + number);
    });
}

// Modal controls
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Navbar scroll effects
function initScrollEffects() {
    let ticking = false;
    
    function updateNavbar() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// Close modals on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Form input focus effects
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = '';
    });
});
