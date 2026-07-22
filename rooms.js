// ===== ROOMS DATA (with capacity for guest filtering) =====
const roomsData = [
  {
    id: 1,
    type: 'suite',
    title: 'Deluxe Suite',
    description: 'Spacious suite with city view and a private balcony.',
    amenities: ['King Bed', 'Bathtub', '55" TV', 'AC'],
    price: 35000,
    capacity: 2,
    img: 'https://picsum.photos/seed/suite1/400/300'
  },
  {
    id: 2,
    type: 'family',
    title: 'Family Room',
    description: 'Two queen beds, extra space for kids, garden view.',
    amenities: ['2 Queen Beds', 'Shower', '50" TV', 'AC'],
    price: 45000,
    capacity: 4,
    img: 'https://picsum.photos/seed/family1/400/300'
  },
  {
    id: 3,
    type: 'penthouse',
    title: 'Penthouse Suite',
    description: 'Top‑floor luxury with panoramic terrace and butler service.',
    amenities: ['King Bed', 'Hot Tub', '65" TV', 'AC'],
    price: 55499,
    capacity: 2,
    img: 'https://picsum.photos/seed/penthouse1/400/300'
  },
  {
    id: 4,
    type: 'deluxe',
    title: 'Executive Room',
    description: 'Modern design with workspace and city skyline views.',
    amenities: ['Queen Bed', 'Shower', '48" TV', 'AC'],
    price: 28000,
    capacity: 2,
    img: 'https://picsum.photos/seed/executive1/400/300'
  },
  {
    id: 5,
    type: 'suite',
    title: 'Junior Suite',
    description: 'Cozy suite with seating area and partial ocean view.',
    amenities: ['Queen Bed', 'Bathtub', '50" TV', 'AC'],
    price: 32000,
    capacity: 2,
    img: 'https://picsum.photos/seed/junior1/400/300'
  },
  {
    id: 6,
    type: 'family',
    title: 'Family Suite',
    description: 'Two bedrooms, full kitchen, and living room – ideal for families.',
    amenities: ['2 Queen Beds', 'Full Kitchen', '55" TV', 'AC'],
    price: 52000,
    capacity: 5,
    img: 'https://picsum.photos/seed/familysuite1/400/300'
  }
];

// ===== RENDER FUNCTION =====
const roomsGrid = document.getElementById('roomsGrid');

function renderRooms(rooms) {
  console.log('Rendering rooms:', rooms.length); // Debug
  if (!roomsGrid) {
    console.error('Element #roomsGrid not found!');
    return;
  }
  if (rooms.length === 0) {
    roomsGrid.innerHTML = `<div class="no-results"><i class="fas fa-exclamation-circle"></i> No rooms match your criteria.</div>`;
    return;
  }
  roomsGrid.innerHTML = rooms.map(room => {
    const iconsHtml = room.amenities.map(amenity => 
      `<span><i class="fas fa-check-circle"></i> ${amenity}</span>`
    ).join('');
    return `
      <div class="room-card" data-id="${room.id}" data-type="${room.type}" data-price="${room.price}">
        <img src="${room.img}" alt="${room.title}" class="room-card__img" loading="lazy" />
        <div class="room-card__body">
          <h3 class="room-card__title">${room.title}</h3>
          <div class="room-card__icons">${iconsHtml}</div>
          <p class="room-card__desc">${room.description}</p>
          <div class="room-card__footer">
            <span class="room-card__price">PKR ${room.price.toLocaleString()} <small>/ night</small></span>
            <a href="#booking" class="btn btn--outline book-now-btn" data-id="${room.id}">Book Now</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach "Book Now" listeners
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const roomId = this.dataset.id;
      const room = roomsData.find(r => r.id == roomId);
      if (room) {
        document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        alert(`You selected "${room.title}". Please choose your dates below.`);
      }
    });
  });
}

// ===== INITIAL RENDER =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Rooms page loaded');
  renderRooms(roomsData);
});

// ===== FILTER LOGIC =====
const filterForm = document.getElementById('filterForm');
const roomTypeSelect = document.getElementById('roomType');
const filterGuestsSelect = document.getElementById('filterGuests');
const priceRangeInput = document.getElementById('priceRange');
const priceDisplay = document.getElementById('priceDisplay');
const resetBtn = document.getElementById('resetFilters');

if (priceRangeInput) {
  priceRangeInput.addEventListener('input', () => {
    priceDisplay.textContent = `PKR ${parseInt(priceRangeInput.value).toLocaleString()}`;
  });
}

function filterRooms() {
  const type = roomTypeSelect.value;
  const maxGuests = parseInt(filterGuestsSelect.value, 10);
  const maxPrice = parseInt(priceRangeInput.value, 10);

  const filtered = roomsData.filter(room => {
    if (type !== 'all' && room.type !== type) return false;
    if (room.price > maxPrice) return false;
    if (room.capacity < maxGuests) return false;
    return true;
  });
  renderRooms(filtered);
}

if (filterForm) {
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filterRooms();
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    roomTypeSelect.value = 'all';
    filterGuestsSelect.value = '2';
    priceRangeInput.value = '120000';
    priceDisplay.textContent = 'PKR 120,000';
    renderRooms(roomsData);
  });
}

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('bookingForm');
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
    alert(`✅ Searching availability for ${guests} guest(s) from ${checkin} to ${checkout}...`);
  });
}

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
  document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('nav--open'));
  });
}

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('back-to-top--visible');
  } else {
    backToTopBtn.classList.remove('back-to-top--visible');
  }
});
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

console.log('Rooms.js loaded successfully.');
