(() => {
  const overlay = document.getElementById("page-transition");
  if (!overlay) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration = 260;

  const deactivateOverlay = () => {
    overlay.classList.remove("is-active");
  };

  const activateOverlay = () => {
    overlay.classList.add("is-active");
  };

  if (prefersReducedMotion) {
    deactivateOverlay();
  } else {
    window.requestAnimationFrame(() => {
      deactivateOverlay();
    });
  }

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      deactivateOverlay();
    }
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) {
      return;
    }

    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) {
      return;
    }

    if (link.hasAttribute("download")) {
      return;
    }

    const target = link.getAttribute("target");
    if (target && target.toLowerCase() === "_blank") {
      return;
    }

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) {
      return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return;
    }

    if (url.pathname === window.location.pathname && url.hash) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    event.preventDefault();
    activateOverlay();

    window.setTimeout(() => {
      window.location.href = url.href;
    }, transitionDuration);
  });
})();
