import { useEffect, useRef } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '@/lib/stores';

const INTERACTIVE = '[data-cursor], a, button, [role="button"], input, textarea, select, label';

function resolveState(target) {
  const element = target instanceof Element ? target.closest(INTERACTIVE) : null;
  if (!element) return { state: 'default', label: '' };

  const custom = element.getAttribute('data-cursor');
  if (custom === 'open') return { state: 'open', label: 'Open' };
  if (element.matches('input, textarea, select')) return { state: 'text', label: '' };
  return { state: 'link', label: '' };
}

/**
 * A ring that trails the pointer and changes shape over links, cards and the
 * draggable 3D core. The native cursor stays visible, so nothing depends on it.
 * Rendered only for mouse/trackpad users who have not asked for reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;
  const rootRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    if (!enabled || !root || !label) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let visible = false;

    const loop = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        root.dataset.visible = 'true';
      }

      const next = resolveState(event.target);
      if (root.dataset.state !== next.state) {
        root.dataset.state = next.state;
        label.textContent = next.label;
      }

      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      visible = false;
      root.dataset.visible = 'false';
    };
    const onDown = () => {
      root.dataset.pressed = 'true';
    };
    const onUp = () => {
      root.dataset.pressed = 'false';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="cursor" data-state="default" aria-hidden="true">
      <span className="cursor-ring" />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
