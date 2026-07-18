const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-group > button').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.closest('.nav-group');
    const open = group.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
document.querySelectorAll('.artwork-button').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.dataset.caption || '';
    lightboxCaption.textContent = button.dataset.caption || '';
    lightbox.showModal();
  });
});
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const slides = [...document.querySelectorAll('.hero-slide')];
let slideIndex = 0;
function showSlide(next) {
  if (!slides.length) return;
  slides[slideIndex].classList.remove('is-active');
  slideIndex = (next + slides.length) % slides.length;
  slides[slideIndex].classList.add('is-active');
}
document.querySelector('.hero-prev')?.addEventListener('click', () => showSlide(slideIndex - 1));
document.querySelector('.hero-next')?.addEventListener('click', () => showSlide(slideIndex + 1));

document.querySelector('[data-preview-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-note').textContent = 'Form delivery will be connected before launch.';
});

document.querySelectorAll('.portfolio-page').forEach((section) => {
  const grid = section.querySelector('.art-grid');
  const previous = section.querySelector('.gallery-control-prev');
  const next = section.querySelector('.gallery-control-next');
  if (!grid || (!previous && !next)) return;

  if (grid.hasAttribute('data-slideshow')) {
    const items = [...grid.querySelectorAll('.gallery-item')];
    let current = Math.max(0, items.findIndex((item) => item.classList.contains('is-active')));
    const show = (index) => {
      items[current]?.classList.remove('is-active');
      current = (index + items.length) % items.length;
      items[current]?.classList.add('is-active');
    };
    previous?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));
  } else {
    previous?.addEventListener('click', () => grid.scrollBy({ left: -grid.clientWidth * .75, behavior: 'smooth' }));
    next?.addEventListener('click', () => grid.scrollBy({ left: grid.clientWidth * .75, behavior: 'smooth' }));
  }
});
