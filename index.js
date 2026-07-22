// ============================================================
//  MOBILE NAV – POPUP MODAL (no close button)
// ============================================================
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
const backdrop = document.getElementById('navBackdrop');

function toggleMenu(force) {
  const isOpen = typeof force === 'boolean' ? force : !nav.classList.contains('nav--open');

  nav.classList.toggle('nav--open', isOpen);
  if (hamburger) hamburger.classList.toggle('is-active', isOpen);
  if (backdrop) backdrop.classList.toggle('is-visible', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

if (hamburger && nav) {
  hamburger.addEventListener('click', () => toggleMenu());
  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMenu(false));
  }
  document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      toggleMenu(false);
    }
  });
}

// ============================================================
//  SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================================
//  BOOKING FORM & PRICES
// ============================================================
const bookingForm = document.getElementById('bookingForm');
const guestsSelect = document.getElementById('guests');

function updateRoomPrices(guestCount) {
  const cards = document.querySelectorAll('.room-card');
  if (!cards.length) return;
  cards.forEach((card, index) => {
    const base = parseInt(card.dataset.basePrice, 10);
    const extra = Math.max(0, guestCount - 2) * 2000;
    const total = base + extra;
    const priceSpan = document.getElementById(`price-${index}`);
    if (priceSpan) {
      priceSpan.innerHTML = `PKR ${total.toLocaleString()} <small>/ night</small>`;
    }
  });
}

if (guestsSelect) {
  if (document.querySelectorAll('.room-card').length) {
    updateRoomPrices(parseInt(guestsSelect.value, 10));
  }
  guestsSelect.addEventListener('change', (e) => {
    updateRoomPrices(parseInt(e.target.value, 10));
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;

    if (!checkin || !checkout) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(checkin) >= new Date(checkout)) {
      alert('Check-out must be after check-in.');
      return;
    }
    alert(`✅ Searching availability for ${guests} guest(s) from ${checkin} to ${checkout}...\n(Rooms will be priced in PKR.)`);
  });
}

// ============================================================
//  GALLERY LIGHTBOX
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox && lightboxImg && lightboxClose) {
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.img;
      lightbox.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ============================================================
//  REVIEWS CAROUSEL
// ============================================================
const reviews = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');

if (reviews.length && prevBtn && nextBtn) {
  let currentReview = 0;

  function showReview(index) {
    reviews.forEach((card, i) => {
      card.classList.toggle('review-card--active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
  });
  nextBtn.addEventListener('click', () => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  });

  let autoRotate = setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  }, 5000);

  const carousel = document.getElementById('reviewsCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
      }, 5000);
    });
  }
}

// ============================================================
//  NEWSLETTER
// ============================================================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterFeedback = document.getElementById('newsletterFeedback');

if (newsletterForm && newsletterFeedback) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email || !email.includes('@') || !email.includes('.')) {
      newsletterFeedback.textContent = '❌ Please enter a valid email address.';
      newsletterFeedback.style.color = '#c0392b';
      return;
    }
    newsletterFeedback.textContent = '✅ Subscribed successfully! Check your inbox.';
    newsletterFeedback.style.color = '#27ae60';
    newsletterForm.reset();
    setTimeout(() => { newsletterFeedback.textContent = ''; }, 5000);
  });
}

// ============================================================
//  BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('back-to-top--visible');
    } else {
      backToTopBtn.classList.remove('back-to-top--visible');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
//  SCROLL ANIMATIONS
// ============================================================
const sections = document.querySelectorAll('.section');
if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section--visible');
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(section => observer.observe(section));
}
