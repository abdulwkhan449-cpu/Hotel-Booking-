// ===== CONTACT PAGE =====
// All interactive features (mobile menu, back to top, etc.)
// are handled by the shared index.js file.

console.log('📞 Contact page loaded successfully.');

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');

  if (form && feedback) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        feedback.textContent = '❌ Please fill in all fields.';
        feedback.style.color = '#c0392b';
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        feedback.textContent = '❌ Please enter a valid email address.';
        feedback.style.color = '#c0392b';
        return;
      }

      // Simulate sending
      feedback.textContent = '✅ Message sent! We\'ll get back to you soon.';
      feedback.style.color = '#27ae60';
      form.reset();
      setTimeout(() => {
        feedback.textContent = '';
      }, 6000);
    });
  }
});
