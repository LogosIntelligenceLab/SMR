function fallbackCopy(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  return copied;
}

async function copyBibTeX() {
  const citation = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const label = button.querySelector(".copy-text");
  let copied = false;
  try {
    await navigator.clipboard.writeText(citation.textContent);
    copied = true;
  } catch {
    copied = fallbackCopy(citation.textContent);
  }
  label.textContent = copied ? "Copied!" : "Copy failed";
  window.setTimeout(() => {
    label.textContent = "Copy";
  }, 2000);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a, .toc a");
  const sections = [...document.querySelectorAll("main section[id]")];
  const progress = document.querySelector(".scroll-progress");
  const topButton = document.querySelector(".scroll-to-top");
  function closeMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", String(menu.classList.toggle("open")));
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });
  const hero = document.getElementById("top");
  document.body.classList.add("navigation-ready");
  function updateScroll() {
    const reading = hero.getBoundingClientRect().bottom <= 0;
    document.body.classList.toggle("reading-content", reading);
    if (!reading) closeMenu();
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${distance > 0 ? Math.min(100, (window.scrollY / distance) * 100) : 0}%`;
    topButton.classList.toggle("visible", window.scrollY > 480);
    let current = "";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 160) current = section.id;
    });
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);
  updateScroll();
});

// Only the featured video plays automatically; galleries load on user playback.
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("hero-video");
  const playback = document.getElementById("hero-playback");
  const error = document.getElementById("hero-video-error");
  const selectors = document.querySelectorAll("[data-clip]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let wantsPlayback = !reducedMotion.matches && !navigator.connection?.saveData;
  let visible = true;
  function updateLabel() {
    playback.textContent = video.paused ? "Play video" : "Pause video";
    playback.setAttribute(
      "aria-label",
      video.paused ? "Play featured video" : "Pause featured video",
    );
  }
  function playWhenVisible() {
    if (wantsPlayback && visible && !document.hidden)
      video.play().catch(updateLabel);
    else video.pause();
  }
  video.addEventListener("play", updateLabel);
  video.addEventListener("pause", updateLabel);
  video.addEventListener("loadedmetadata", playWhenVisible);
  video.addEventListener("error", () => {
    error.hidden = false;
    wantsPlayback = false;
    updateLabel();
  });
  playback.addEventListener("click", () => {
    wantsPlayback = video.paused;
    playWhenVisible();
  });
  selectors.forEach((button) =>
    button.addEventListener("click", () => {
      selectors.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      error.hidden = true;
      video.pause();
      video.poster = `static/videos/${button.dataset.clip}.jpg`;
      video.src = `static/videos/${button.dataset.clip}.mp4`;
      document.getElementById("hero-clip-label").textContent =
        button.dataset.label;
      video.load();
    }),
  );
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      playWhenVisible();
    },
    { threshold: 0.1 },
  ).observe(document.getElementById("top"));
  document.addEventListener("visibilitychange", playWhenVisible);
  reducedMotion.addEventListener("change", () => {
    wantsPlayback = !reducedMotion.matches && !navigator.connection?.saveData;
    playWhenVisible();
  });
  updateLabel();
  playWhenVisible();
});
