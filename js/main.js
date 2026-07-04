/* CS AUMC Landing — v0.2 cinematic scroll engine */
(() => {
  const journey = document.getElementById('journey');
  const sticky  = journey.querySelector('.journey-sticky');
  const scenes  = [...journey.querySelectorAll('.scene')];
  const jpFill  = document.getElementById('jpFill');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = scenes.length;
  journey.style.setProperty('--nscenes', N);

  let ticking = false, activeIdx = -1;

  function update() {
    ticking = false;
    const rect = journey.getBoundingClientRect();
    const total = journey.offsetHeight - innerHeight;
    const p = Math.min(0.9999, Math.max(0, -rect.top / total));

    const idx = Math.floor(p * N);          // which scene
    const t   = (p * N) - idx;              // progress within scene 0→1

    if (idx !== activeIdx) {
      scenes.forEach((s,i) => s.classList.toggle('is-active', i === idx));
      activeIdx = idx;
    }

    // camera move: slow pan + push-in per scene
    if (!reduceMotion) {
      const s = scenes[idx];
      const bg = s.querySelector('.scene-bg');
      if (bg) {
        const pan = s.dataset.pan;
        const drift = (t - 0.5);
        let tx = 0, ty = 0;
        if (pan === 'right') tx =  drift * 5;   // percent
        if (pan === 'left')  tx = -drift * 5;
        if (pan === 'up')    ty = -drift * 6;
        const scale = 1.08 + t * 0.10;          // slow push-in
        bg.style.transform = `translate(${tx}%, ${ty}%) scale(${scale.toFixed(4)})`;
      }
    }

    jpFill.style.width = (p * 100).toFixed(2) + '%';
  }

  addEventListener('scroll', () => { if(!ticking){ requestAnimationFrame(update); ticking = true; } }, { passive:true });
  addEventListener('resize', update);
  update();

  // Preload next scene image while idle
  if ('requestIdleCallback' in window) requestIdleCallback(() => {
    scenes.forEach(s => {
      const bg = s.querySelector('.scene-bg');
      if (!bg) return;
      const m = getComputedStyle(bg).getPropertyValue('--bg').match(/url\(['"]?(.+?)['"]?\)/);
      if (m) { const img = new Image(); img.src = m[1]; }
    });
  });
})();
