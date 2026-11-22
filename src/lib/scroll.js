let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

/**
 * Gap kept above a section so it does not slide under the fixed top bar.
 * Must match `scroll-padding-top` on <html> in index.css: Lenis reads that
 * value itself, the fallback path below applies it by hand.
 */
const HEADER_OFFSET = 80;

/** How far (in px) a section may sit from its target before it is nudged into place. */
const TOLERANCE = 4;

/**
 * Sections below the fold are laid out lazily (see .defer-render), so the
 * page can grow while a long jump is under way. Once the scroll has arrived,
 * check where the target really is and close any gap.
 */
function settle(element) {
  const gap = element.getBoundingClientRect().top - HEADER_OFFSET;
  if (Math.abs(gap) <= TOLERANCE) return;

  if (lenis) lenis.scrollTo(element, { duration: 0.4 });
  else window.scrollTo({ top: window.scrollY + gap });
}

export function scrollToId(id) {
  if (id === 'top') {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
    return;
  }

  const element = document.getElementById(id);
  if (!element) return;

  if (lenis) {
    lenis.scrollTo(element, { onComplete: () => settle(element) });
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top });
    requestAnimationFrame(() => requestAnimationFrame(() => settle(element)));
  }
}

/** Pauses page scrolling while a dialog is open. */
export function lockScroll() {
  lenis?.stop();
}

export function unlockScroll() {
  lenis?.start();
}
