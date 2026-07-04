/* CS AUMC Landing — v0.1 scroll engine */
(() => {
  const journey = document.getElementById('journey');
  const walker  = document.getElementById('walker');
  const jpFill  = document.getElementById('jpFill');
  const bgs     = journey.querySelectorAll('.scene-bg');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let progress = 0, lastProgress = 0, idleTimer = null, ticking = false;

  function update() {
    ticking = false;
    const rect = journey.getBoundingClientRect();
    const total = journey.offsetHeight - innerHeight;
    progress = Math.min(1, Math.max(0, -rect.top / total));

    // walker: travels from off-left to ~78% viewport width
    const vw = innerWidth;
    const x = -0.12 * vw + progress * (0.92 * vw);
    walker.style.transform = `translateX(${x}px)`;

    // walk animation only while actually scrolling
    if (!reduceMotion && Math.abs(progress - lastProgress) > 0.0004 && progress > 0 && progress < 1) {
      walker.classList.add('is-walking');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => walker.classList.remove('is-walking'), 140);
    }
    lastProgress = progress;

    // gentle parallax on scene background
    bgs.forEach(bg => { bg.style.transform = `translateY(${(progress - 0.5) * -30}px) scale(1.04)`; });

    // progress rail
    jpFill.style.width = (progress * 100).toFixed(2) + '%';
  }

  function onScroll() {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();
})();
