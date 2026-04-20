// ===== REVEAL (com melhor performance) =====
const reveals = document.querySelectorAll('.reveal');
const header = document.querySelector('.header');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  reveals.forEach((element) => element.classList.add('active'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  reveals.forEach((element) => revealObserver.observe(element));
}

// ===== HEADER "GLASS" AO ROLAR =====
if (header) {
  const updateHeaderOnScroll = () => {
    if (window.scrollY > 16) {
      header.classList.add('header-scrolled');
      return;
    }

    header.classList.remove('header-scrolled');
  };

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
}
