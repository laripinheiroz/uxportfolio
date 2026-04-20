// ===== REVEAL (com melhor performance) =====
const reveals = document.querySelectorAll('.reveal');
const header = document.querySelector('.header');
const heroTitle = document.querySelector('.hero-title');
const projectCards = document.querySelectorAll('.project-card');
const projectsSection = document.querySelector('#projetos');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  reveals.forEach((element) => element.classList.add('active'));
} else {
  if (projectsSection) {
    const projectReveals = projectsSection.querySelectorAll('.reveal');
    projectReveals.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 0.08, 0.4)}s`;
    });
  }

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

// ===== PARALLAX SUAVE NO HERO =====
if (heroTitle && !prefersReducedMotion) {
  let rafId = null;
  let currentX = 0;
  let currentY = 0;

  const updateParallax = (clientX, clientY) => {
    const x = (clientX / window.innerWidth - 0.5) * 16;
    const y = (clientY / window.innerHeight - 0.5) * 16;

    currentX += (x - currentX) * 0.14;
    currentY += (y - currentY) * 0.14;

    heroTitle.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    rafId = null;
  };

  window.addEventListener('mousemove', (event) => {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(() => updateParallax(event.clientX, event.clientY));
  });

  window.addEventListener('mouseleave', () => {
    heroTitle.style.transform = 'translate3d(0, 0, 0)';
  });
}

// ===== MOVIMENTO 3D NOS CARDS =====
if (!prefersReducedMotion) {
  projectCards.forEach((card) => {
    let frame = null;

    card.addEventListener('mousemove', (event) => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 4;
        const rotateX = (0.5 - y) * 4;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        frame = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
