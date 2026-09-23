/* Arlingkin interactive header — additive layer */
(() => {
  const brand = document.querySelector('.brand');
  const header = document.querySelector('.site-header');
  if (!brand || !header) return;

  const pop = () => {
    brand.classList.remove('is-popping');
    void brand.offsetWidth;
    brand.classList.add('is-popping');
    window.setTimeout(() => brand.classList.remove('is-popping'), 700);
  };

  // The logo is still a normal link: click it to return home, with a small
  // tactile animation instead of a blocking interaction.
  brand.addEventListener('click', pop);
  brand.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') pop();
  });

  // Gentle pointer glow follows the header without moving the layout.
  const finePointer = window.matchMedia('(pointer: fine)');
  if (finePointer.matches) {
    header.addEventListener('pointermove', (event) => {
      const rect = header.getBoundingClientRect();
      header.style.setProperty('--header-glow-x', `${event.clientX - rect.left}px`);
      header.style.setProperty('--header-glow-y', `${event.clientY - rect.top}px`);
      header.classList.add('has-glow');
    });
    header.addEventListener('pointerleave', () => header.classList.remove('has-glow'));
  }

  // A small ambient pulse keeps the otherwise-static wordmark alive.
  window.setInterval(() => {
    if (document.hidden || brand.matches(':hover')) return;
    pop();
  }, 12000);
})();
