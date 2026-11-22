import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/** Counts up to `value` the first time it scrolls into view. Static for reduced motion. */
export function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const final = value.toFixed(decimals);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !inView) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (current) => {
        element.textContent = current.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [inView, reduced, value, decimals]);

  return (
    <span className="tabular-nums">
      <span className="sr-only">
        {final}
        {suffix}
      </span>
      <span aria-hidden="true">
        <span ref={ref}>{final}</span>
        {suffix}
      </span>
    </span>
  );
}
