/* 3D background (Three.js) + tilt, reveal, cursor glow, scroll bar. Does not touch chatbot logic in script.js */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = innerWidth < 768;

  // scroll progress + cursor glow
  const bar = document.body.appendChild(Object.assign(document.createElement("div"), { id: "scrollBar" }));
  const glow = document.body.appendChild(Object.assign(document.createElement("div"), { id: "cursorGlow" }));
  addEventListener("scroll", () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
  }, { passive: true });
  addEventListener("pointermove", e => { glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });

  // 3D tilt on cards
  document.querySelectorAll(".skill-card,.project-card,.education-card").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 16 + "deg");
      el.style.setProperty("--rx", (.5 - (e.clientY - r.top) / r.height) * 16 + "deg");
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  });

  // 3D reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".section-title,.section h2,.skill-card,.project-card,.education-card,.about-text,.contact-buttons")
    .forEach((el, i) => { el.classList.add("reveal3d"); el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });
})();
