// ===== ROOMS PAGE – FILTER & SORT =====
document.addEventListener('DOMContentLoaded', function() {
  const roomCards = document.querySelectorAll('.room-card');
  const roomTypeSelect = document.getElementById('roomType');
  const priceRangeSelect = document.getElementById('priceRange');
  const sortSelect = document.getElementById('sortBy');
  const filterBtn = document.getElementById('filterBtn');
  const resetBtn = document.getElementById('resetBtn');
  const grid = document.getElementById('roomsGrid');

  // Helper: parse price from text (e.g., "PKR 3,500 / night" -> 3500)
  function parsePrice(priceText) {
    const match = priceText.match(/(\d+,?\d+)/);
    if (match) return parseInt(match[0].replace(/,/g, ''), 10);
    return 0;
  }

  // Get current filters
  function getFilters() {
    return {
      type: roomTypeSelect.value,
      maxPrice: priceRangeSelect.value === 'all' ? Infinity : parseInt(priceRangeSelect.value, 10),
      sort: sortSelect.value,
    };
  }

  // Apply filters and sorting
  function applyFilters() {
    const filters = getFilters();
    let visibleCards = [];

    // Filter
    roomCards.forEach(card => {
      const type = card.dataset.type;
      const price = parseInt(card.dataset.price, 10);
      let show = true;

      if (filters.type !== 'all' && type !== filters.type) show = false;
      if (price > filters.maxPrice) show = false;

      card.style.display = show ? '' : 'none';
      if (show) visibleCards.push(card);
    });

    // Sort (only visible cards)
    if (filters.sort !== 'none') {
      visibleCards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price, 10);
        const priceB = parseInt(b.dataset.price, 10);
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();

        switch (filters.sort) {
          case 'price-asc': return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          case 'name': return nameA.localeCompare(nameB);
          default: return 0;
        }
      });

      // Re‑append sorted cards
      visibleCards.forEach(card => grid.appendChild(card));
    }

    // Show "no results" if none visible
    const noResult = document.querySelector('.no-results');
    if (visibleCards.length === 0) {
      if (!noResult) {
        const div = document.createElement('div');
        div.className = 'no-results';
        div.innerHTML = '<i class="fas fa-search"></i> No rooms match your filters.';
        grid.appendChild(div);
      }
    } else {
      if (noResult) noResult.remove();
    }
  }

  // Event listeners
  if (filterBtn) {
    filterBtn.addEventListener('click', applyFilters);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      roomTypeSelect.value = 'all';
      priceRangeSelect.value = 'all';
      sortSelect.value = 'price-asc';
      applyFilters();
    });
  }
  // Auto‑apply on change (optional)
  // roomTypeSelect.addEventListener('change', applyFilters);
  // priceRangeSelect.addEventListener('change', applyFilters);
  // sortSelect.addEventListener('change', applyFilters);

  // Initial render
  applyFilters();
});s
