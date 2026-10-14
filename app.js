/**
 * Andy White Construction LLC — gallery step buttons
 * CCB #219851 • Lebanon, Oregon
 */

document.querySelectorAll('.job-gallery').forEach((gallery) => {
  const track = gallery.querySelector('.gallery-track');
  const prev = gallery.querySelector('.gallery-btn[data-dir="-1"]');
  const next = gallery.querySelector('.gallery-btn[data-dir="1"]');
  if (!track || !prev || !next) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const step = (dir) => {
    const origin = track.getBoundingClientRect().left;
    const starts = [...track.querySelectorAll('.gallery-item')]
      .map((item) => Math.round(track.scrollLeft + item.getBoundingClientRect().left - origin));
    const max = track.scrollWidth - track.clientWidth;
    const target = dir > 0
      ? starts.find((x) => x > track.scrollLeft + 2)
      : starts.reverse().find((x) => x < track.scrollLeft - 2);
    if (target === undefined) return;
    track.scrollTo({ left: Math.min(Math.max(target, 0), max), behavior: reduceMotion ? 'auto' : 'smooth' });
    if (reduceMotion) update();
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max - 1;
  };

  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  track.querySelectorAll('img').forEach((img) => img.addEventListener('load', update));
  update();
});
