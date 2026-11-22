import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { setLenis } from '@/lib/scroll';
import { soundStore } from '@/lib/stores';

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and the
 * scroll position never drift apart. Skipped entirely for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Restore the visitor's sound preference once on load.
    try {
      soundStore.set(localStorage.getItem('sound') === 'on');
    } catch {
      // Storage unavailable: keep the default (off).
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
