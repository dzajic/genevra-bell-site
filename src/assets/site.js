const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
  const previous = carousel.querySelector('.gallery-control-prev');
  const next = carousel.querySelector('.gallery-control-next');
  const status = carousel.querySelector('[data-carousel-status]');
  let index = 0;
  let scrollTimer;

  const update = (nextIndex, behavior = 'smooth') => {
    if (!slides.length) return;
    index = (nextIndex + slides.length) % slides.length;
    track.scrollTo({ left: slides[index].offsetLeft, behavior });
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
      slide.setAttribute('aria-hidden', String(slideIndex !== index));
    });
    if (status) status.textContent = `Artwork ${index + 1} of ${slides.length}`;
  };

  previous?.addEventListener('click', () => update(index - 1));
  next?.addEventListener('click', () => update(index + 1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      update(index - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      update(index + 1);
    }
  });
  track.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      index = slides.reduce((best, slide, slideIndex) =>
        Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft)
          ? slideIndex
          : best, 0);
      if (status) status.textContent = `Artwork ${index + 1} of ${slides.length}`;
    }, 100);
  }, { passive: true });

  update(0, 'auto');
});
