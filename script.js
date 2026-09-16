(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const year = document.querySelector('#year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu after clicking a navigation link
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal animations
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Close mobile navigation when clicking outside
  document.addEventListener('click', event => {
    if (
      !nav ||
      !toggle ||
      !nav.classList.contains('open')
    ) {
      return;
    }

    if (
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();