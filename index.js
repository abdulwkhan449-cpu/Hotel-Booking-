// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});

document.querySelectorAll('.nav__list a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('nav--open'));
});

// ===== SMOOTH SCROLL =====
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

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('bookingForm');
const guestsSelect = document.getElementById('guests');

function updateRoomPrices(guestCount) {
  const cards = document.querySelectorAll('.room-card');
  cards.forEach((card, index) => {
    const base = parseInt(card.dataset.basePrice, 10);
    const extra = Math.max(0, guestCount - 2) * 20;
    const total = base + extra;
    const priceSpan = document.getElementById(`price-${index}`);
    if (priceSpan) {
      priceSpan.innerHTML = `$${total} <small>/ night</small>`;
    }
  });
}

updateRoomPrices(2);

guestsSelect.addEventListener('change', (e) => {
  const val = parseInt(e.target.value, 10);
  updateRoomPrices(val);
});

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
  alert(`✅ Searching availability for ${guests} guest(s) from ${checkin} to ${checkout}...\n(Backend integration would handle this.)`);
});

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

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

// ===== REVIEWS CAROUSEL =====
const reviews = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
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
carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
carousel.addEventListener('mouseleave', () => {
  autoRotate = setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  }, 5000);
});

// ===== NEWSLETTER =====
const newsletterForm = document.getElementById('newsletterForm');
const newsletterFeedback = document.getElementById('newsletterFeedback');

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

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('backToTop');
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

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section--visible');
    }
  });
}, {
  threshold: 0.15,
});

sections.forEach(section => {
  observer.observe(section);
});
