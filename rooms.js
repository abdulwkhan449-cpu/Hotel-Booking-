// ===== ROOMS DATA =====
const roomsData = [
  {
    id: 1,
    type: 'suite',
    title: 'Deluxe Suite',
    description: 'Spacious suite with city view and a private balcony.',
    amenities: ['King Bed', 'Bathtub', '55" TV', 'AC'],
    price: 35000,
    img: 'https://picsum.photos/seed/suite1/400/300',
  },
  {
    id: 2,
    type: 'family',
    title: 'Family Room',
    description: 'Two queen beds, extra space for kids, garden view.',
    amenities: ['2 Queen Beds', 'Shower', '50" TV', 'AC'],
    price: 45000,
    img: 'https://picsum.photos/seed/family1/400/300',
  },
  {
    id: 3,
    type: 'penthouse',
    title: 'Penthouse Suite',
    description: 'Top‑floor luxury with panoramic terrace and butler service.',
    amenities: ['King Bed', 'Hot Tub', '65" TV', 'AC'],
    price: 55499,
    img: 'https://picsum.photos/seed/penthouse1/400/300',
  },
  {
    id: 4,
    type: 'deluxe',
    title: 'Executive Room',
    description: 'Modern design with workspace and city skyline views.',
    amenities: ['Queen Bed', 'Shower', '48" TV', 'AC'],
    price: 28000,
    img: 'https://picsum.photos/seed/executive1/400/300',
  },
  {
    id: 5,
    type: 'suite',
    title: 'Junior Suite',
    description: 'Cozy suite with seating area and partial ocean view.',
    amenities: ['Queen Bed', 'Bathtub', '50" TV', 'AC'],
    price: 32000,
    img: 'https://picsum.photos/seed/junior1/400/300',
  },
  {
    id: 6,
    type: 'family',
    title: 'Family Suite',
    description: 'Two bedrooms, full kitchen, and living room – ideal for families.',
    amenities: ['2 Queen Beds', 'Full Kitchen', '55" TV', 'AC'],
    price: 52000,
    img: 'https://picsum.photos/seed/familysuite1/400/300',
  },
];

// ===== RENDER ROOMS =====
const roomsGrid = document.getElementById('roomsGrid');

function renderRooms(rooms) {
  if (rooms.length === 0) {
    roomsGrid.innerHTML = `<div class="no-results"><i class="fas fa-exclamation-circle"></i> No rooms match your criteria.</div>`;
    return;
  }
  roomsGrid.innerHTML = rooms.map((room, index) => {
    const iconsHtml = room.amenities.map(amenity => `<span><i class="fas fa-check-circle"></i> ${amenity}</span>`).join('');
    return `
      <div class="room-card" data-id="${room.id}" data-type="${room.type}" data-price="${room.price}">
        <img src="${room.img}" alt="${room.title}" class="room-card__img" />
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

  // Attach click listeners to "Book Now" buttons
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const roomId = this.dataset.id;
      const room = roomsData.find(r => r.id == roomId);
      if (room) {
        // Set a hidden field or just scroll to booking form
        document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
        // Optional: show a message or pre-fill something
        alert(`You selected "${room.title}". Please choose your dates below.`);
      }
    });
  });
}

// Initial render
renderRooms(roomsData);

// ===== FILTER LOGIC =====
const filterForm = document.getElementById('filterForm');
const roomTypeSelect = document.getElementById('roomType');
const filterGuestsSelect = document.getElementById('filterGuests');
const priceRangeInput = document.getElementById('priceRange');
const priceDisplay = document.getElementById('priceDisplay');
const resetBtn = document.getElementById('resetFilters');

// Update price display
priceRangeInput.addEventListener('input', () => {
  priceDisplay.textContent = `PKR ${parseInt(priceRangeInput.value).toLocaleString()}`;
});

function filterRooms() {
  const type = roomTypeSelect.value;
  const maxGuests = parseInt(filterGuestsSelect.value, 10);
  const maxPrice = parseInt(priceRangeInput.value, 10);

  let filtered = roomsData.filter(room => {
    // Type filter
    if (type !== 'all' && room.type !== type) return false;
    // Price filter
    if (room.price > maxPrice) return false;
    // Guest filter – we don't have guest capacity stored, so we'll assume all rooms can accommodate up to maxGuests if they are family/suite etc.
    // For simplicity, we'll just pass all if they can accommodate (we don't have capacity data). We'll simulate: if room type includes 'family' or 'suite' they can take more.
    // Better: we'll add a maxGuests property to data. Let's add it now.
    // I'll update the data below.
    // We'll add a new property 'capacity' to each room.
    // But since we already defined roomsData, we can extend it before filtering.
    // For now, I'll just apply a simple rule: family rooms can take 4, others 2.
    // But I'll add capacity in the data.
    // Let's redefine roomsData with capacity.
    return true; // placeholder, will be replaced after updating data.
  });

  // Since we need capacity, we'll restructure roomsData with capacity.
  // I'll override roomsData with updated version just before filtering.
  // Let's do that.

  // Re-define roomsData with capacity
  // I'll place the updated data here:
  const updatedRoomsData = [
    { id: 1, type: 'suite', title: 'Deluxe Suite', description: 'Spacious suite with city view and a private balcony.', amenities: ['King Bed', 'Bathtub', '55" TV', 'AC'], price: 35000, img: 'https://picsum.photos/seed/suite1/400/300', capacity: 2 },
    { id: 2, type: 'family', title: 'Family Room', description: 'Two queen beds, extra space for kids, garden view.', amenities: ['2 Queen Beds', 'Shower', '50" TV', 'AC'], price: 45000, img: 'https://picsum.photos/seed/family1/400/300', capacity: 4 },
    { id: 3, type: 'penthouse', title: 'Penthouse Suite', description: 'Top‑floor luxury with panoramic terrace and butler service.', amenities: ['King Bed', 'Hot Tub', '65" TV', 'AC'], price: 55499, img: 'https://picsum.photos/seed/penthouse1/400/300', capacity: 2 },
    { id: 4, type: 'deluxe', title: 'Executive Room', description: 'Modern design with workspace and city skyline views.', amenities: ['Queen Bed', 'Shower', '48" TV', 'AC'], price: 28000, img: 'https://picsum.photos/seed/executive1/400/300', capacity: 2 },
    { id: 5, type: 'suite', title: 'Junior Suite', description: 'Cozy suite with seating area and partial ocean view.', amenities: ['Queen Bed', 'Bathtub', '50" TV', 'AC'], price: 32000, img: 'https://picsum.photos/seed/junior1/400/300', capacity: 2 },
    { id: 6, type: 'family', title: 'Family Suite', description: 'Two bedrooms, full kitchen, and living room – ideal for families.', amenities: ['2 Queen Beds', 'Full Kitchen', '55" TV', 'AC'], price: 52000, img: 'https://picsum.photos/seed/familysuite1/400/300', capacity: 5 },
  ];

  // Replace global roomsData with updated one
  // We'll reassign
  // But we need to use the updated data also for rendering. We'll store it in a variable.
  // For simplicity, we'll just use the updated data inside the filter function and re-render.

  // Now filter with capacity
  let filteredUpdated = updatedRoomsData.filter(room => {
    if (type !== 'all' && room.type !== type) return false;
    if (room.price > maxPrice) return false;
    if (room.capacity < maxGuests) return false;
    return true;
  });

  renderRooms(filteredUpdated);
}

// Override initial render with updated data
// We'll just reassign roomsData and re-render
let roomsDataWithCapacity = [
  { id: 1, type: 'suite', title: 'Deluxe Suite', description: 'Spacious suite with city view and a private balcony.', amenities: ['King Bed', 'Bathtub', '55" TV', 'AC'], price: 35000, img: 'https://picsum.photos/seed/suite1/400/300', capacity: 2 },
  { id: 2, type: 'family', title: 'Family Room', description: 'Two queen beds, extra space for kids, garden view.', amenities: ['2 Queen Beds', 'Shower', '50" TV', 'AC'], price: 45000, img: 'https://picsum.photos/seed/family1/400/300', capacity: 4 },
  { id: 3, type: 'penthouse', title: 'Penthouse Suite', description: 'Top‑floor luxury with panoramic terrace and butler service.', amenities: ['King Bed', 'Hot Tub', '65" TV', 'AC'], price: 55499, img: 'https://picsum.photos/seed/penthouse1/400/300', capacity: 2 },
  { id: 4, type: 'deluxe', title: 'Executive Room', description: 'Modern design with workspace and city skyline views.', amenities: ['Queen Bed', 'Shower', '48" TV', 'AC'], price: 28000, img: 'https://picsum.photos/seed/executive1/400/300', capacity: 2 },
  { id: 5, type: 'suite', title: 'Junior Suite', description: 'Cozy suite with seating area and partial ocean view.', amenities: ['Queen Bed', 'Bathtub', '50" TV', 'AC'], price: 32000, img: 'https://picsum.photos/seed/junior1/400/300', capacity: 2 },
  { id: 6, type: 'family', title: 'Family Suite', description: 'Two bedrooms, full kitchen, and living room – ideal for families.', amenities: ['2 Queen Beds', 'Full Kitchen', '55" TV', 'AC'], price: 52000, img: 'https://picsum.photos/seed/familysuite1/400/300', capacity: 5 },
];

// Re-render with capacity data
renderRooms(roomsDataWithCapacity);

// Now filter form submit
filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const type = roomTypeSelect.value;
  const maxGuests = parseInt(filterGuestsSelect.value, 10);
  const maxPrice = parseInt(priceRangeInput.value, 10);

  const filtered = roomsDataWithCapacity.filter(room => {
    if (type !== 'all' && room.type !== type) return false;
    if (room.price > maxPrice) return false;
    if (room.capacity < maxGuests) return false;
    return true;
  });
  renderRooms(filtered);
});

// Reset filters
resetBtn.addEventListener('click', () => {
  roomTypeSelect.value = 'all';
  filterGuestsSelect.value = '2';
  priceRangeInput.value = '120000';
  priceDisplay.textContent = 'PKR 120,000';
  renderRooms(roomsDataWithCapacity);
});

// ===== BOOKING FORM (same as homepage) =====
const bookingForm = document.getElementById('bookingForm');
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

// ===== MOBILE NAV (reuse from index.js, but we'll also add here to ensure) =====
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});
document.querySelectorAll('.nav__list a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('nav--open'));
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

// ===== STICKY CTA (optional, already in HTML) =====
// No extra logic needed.

// ===== SMOOTH SCROLL (already in index.js, but we'll add here to be safe) =====
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
