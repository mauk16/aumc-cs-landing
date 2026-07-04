/* CS AUMC Landing — v0.2.1 walkthrough scroll engine
   Continuous cross-fade + push-through zoom: scrolling feels like moving forward through campus. */
(() => {
  const journey = document.getElementById('journey');
  const scenes  = [...journey.querySelectorAll('.scene')];
  const jpFill  = document.getElementById('jpFill');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = scenes.length;
  journey.style.setProperty('--nscenes', N);

  const clamp = (v,a,b) => Math.min(b, Math.max(a, v));
  let ticking = false;

  function update() {
    ticking = false;
    const rect  = journey.getBoundingClientRect();
    const total = journey.offsetHeight - innerHeight;
    const p = clamp(-rect.top / total, 0, 0.9999);
    const f = p * N;                    // continuous scene position, e.g. 2.37

    scenes.forEach((s, i) => {
      const d = f - i;                  // -∞..: this scene is "ahead"; 0..1 while traversing it
      const visible = d > -0.5 && d < 1.5;
      s.classList.toggle('is-visible', visible);
      if (!visible) { s.style.opacity = 0; return; }

      // Cross-fade: fade in over d ∈ [-0.3,0], full over [0,1], fade out over [1,1.3]
      let op = 1;
      if (d < 0)      op = 1 + d / 0.3;
      else if (d > 1) op = 1 - (d - 1) / 0.3;
      s.style.opacity = clamp(op, 0, 1).toFixed(3);
      s.style.zIndex = 1 + i;

      // Camera: push-through. While traversing, slowly move forward; on exit keep pushing so
      // the scene appears to pass by the viewer.
      if (!reduceMotion) {
        const cam = s.querySelector('.scene-cam');
        if (cam) {
          const pan = s.dataset.pan || 'none';
          const t = clamp(d, -0.3, 1.3);
          let tx = 0, ty = 0;
          if (pan === 'right') tx =  (t - 0.5) * 4.5;
          if (pan === 'left')  tx = -(t - 0.5) * 4.5;
          if (pan === 'up')    ty = -(t - 0.5) * 5.5;
          const scale = 1.06 + t * 0.16;              // keeps growing through exit = walk-through
          cam.style.transform = `translate(${tx.toFixed(3)}%, ${ty.toFixed(3)}%) scale(${scale.toFixed(4)})`;
        }
      }

      // Caption focus in the heart of the scene
      s.classList.toggle('is-focus', d > 0.06 && d < 0.94);
    });

    jpFill.style.width = (p * 100).toFixed(2) + '%';
  }

  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  addEventListener('resize', update);
  update();

  // Eagerly warm all scene images
  scenes.forEach(s => { const img = s.querySelector('.scene-img'); if (img && img.loading === 'lazy') { img.loading = 'eager'; } });
})();
