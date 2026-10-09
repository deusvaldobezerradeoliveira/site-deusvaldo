(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  // Lightbox acessível: clique, setas do teclado e Escape.
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('figure img');
    const caption = lightbox.querySelector('figcaption');
    const items = Array.from(document.querySelectorAll('[data-lightbox]'));
    let currentIndex = 0;
    let lastFocus = null;

    const show = (index) => {
      if (!items.length) return;
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      image.src = item.dataset.lightbox;
      image.alt = item.querySelector('img')?.alt || item.dataset.title || 'Imagem ampliada';
      caption.textContent = item.dataset.title || '';
    };
    const open = (index) => {
      lastFocus = document.activeElement;
      show(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    };
    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      image.src = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    };
    items.forEach((item, index) => item.addEventListener('click', () => open(index)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(currentIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(currentIndex + 1));
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') show(currentIndex - 1);
      if (event.key === 'ArrowRight') show(currentIndex + 1);
    });
  }
})();