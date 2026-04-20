// ===== SISTEMA ÚNICO DE ANIMAÇÃO (editorial e sutil) =====
const motionSelectors = [
  '.hero-text',
  '.hero-title',
  '.projects',
  '.project-card',
  '.project-info',
  '.project-image',
  '.section-header',
  '.detail-item',
  '.research-image',
  '.research-insights p',
  '.analysis-text',
  '.analysis-image',
  '.persona-image',
  '.user-flow-image',
  '.ui-image',
  '.all-pages-image',
  '.prototype',
  '.reflection',
  '.next-steps',
  '.sobre-media',
  '.sobre-intro',
  '.sobre-texto p',
  '.sobre-link',
  '.contato-item',
  '.contato-top',
  '.field',
  '.contato-button',
];

const animatedElements = [...document.querySelectorAll(motionSelectors.join(','))];
const header = document.querySelector('.header');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const applyMotionSetup = () => {
  animatedElements.forEach((element, index) => {
    element.classList.add('motion');
    element.style.setProperty('--motion-delay', `${Math.min(index * 0.03, 0.3)}s`);
  });
};

if (!prefersReducedMotion) {
  document.body.classList.add('has-motion');
  applyMotionSetup();

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('in-view');
        currentObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15,
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

// ===== HEADER SUTIL AO SCROLL =====
if (header) {
  const handleHeaderScroll = () => {
    header.classList.toggle('header-scrolled', window.scrollY > 10);
  };

  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
}
