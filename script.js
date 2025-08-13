document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Subtle snow
  const snow = {
    enabled: true,
    container: document.getElementById("snow-container"),
    spawn() {
      if (!this.enabled || !this.container) return;
      const el = document.createElement("div");
      el.className = "snowflake";
      el.textContent = "❄";
      const size = (Math.random() * 0.6 + 0.4).toFixed(2);
      const left = Math.random() * 100; // vw
      const duration = (Math.random() * 8 + 10).toFixed(2) + "s";
      const swirl = (Math.random() * 30 - 15).toFixed(0) + "px";
      el.style.left = left + "vw";
      el.style.fontSize = size + "rem";
      el.style.setProperty("--dur", duration);
      el.style.setProperty("--swirl", swirl);
      this.container.appendChild(el);
      setTimeout(() => el.remove(), 14000);
    },
    loopHandle: null,
    start() {
      if (this.loopHandle) return;
      this.loopHandle = setInterval(() => this.spawn(), 300);
    },
    stop() {
      this.enabled = false;
      clearInterval(this.loopHandle);
      this.loopHandle = null;
    },
  };
  snow.start();

  const btn = document.getElementById("toggleSnow");
  if (btn) {
    btn.addEventListener("click", () => {
      if (snow.loopHandle) {
        snow.stop();
        btn.innerHTML = '<i class="bi bi-snow2 me-2"></i>Start Snow';
      } else {
        snow.enabled = true;
        snow.start();
        btn.innerHTML = '<i class="bi bi-snow2 me-2"></i>Stop Snow';
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 64,
        behavior: "smooth",
      });
    });
  });

  // Countdown (section)
  const wrap = document.querySelector(".countdown-wrap");
  if (wrap) {
    const targetISO = wrap.getAttribute("data-target");
    const target = targetISO ? new Date(targetISO) : null;
    const els = {
      d: document.getElementById("cd-days"),
      h: document.getElementById("cd-hours"),
      m: document.getElementById("cd-mins"),
      s: document.getElementById("cd-secs"),
    };
    const pad = (n) => String(n).padStart(2, "0");
    function tick() {
      if (!target) return;
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const sec = Math.floor(diff / 1000);
      const d = Math.floor(sec / 86400);
      const h = Math.floor((sec % 86400) / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      els.d.textContent = pad(d);
      els.h.textContent = pad(h);
      els.m.textContent = pad(m);
      els.s.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }
});
