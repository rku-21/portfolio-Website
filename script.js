

document.addEventListener('DOMContentLoaded', function () {
  // Helper function to animate a number from 0 to target
  function animateCount(id, target, duration = 2000) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const increment = target / (duration / 16);
    function update() {
      start += increment;
      if (start < target) {
        if (id === 'stat3') {
          el.textContent = (Math.floor(start * 10) / 10).toFixed(1);
        } else {
          el.textContent = Math.floor(start) + '+';
        }
        requestAnimationFrame(update);
      } else {
        if (id === 'stat3') {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target + '+';
        }
      }
    }
    update();
  }

  // To prevent multiple animations at once
  let animating = false;

  // Intersection Observer to trigger animation when in view and reset when out
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animating) {
          animating = true;
          animateCount('stat1', 150);
          animateCount('stat2', 80);
          animateCount('stat3', 9.0);
        }
      } else {
        // Reset numbers to 0 when out of view
  document.getElementById('stat1').textContent = '0+';
  document.getElementById('stat2').textContent = '0+';
  document.getElementById('stat3').textContent = '0';
        animating = false;
      }
    });
  }, { threshold: 0.01 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
