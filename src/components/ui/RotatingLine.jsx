import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/stores';

const pad = (value) => String(value).padStart(2, '0');

/** Cycles through what Kaviyarasan builds. Shows the full list at once for reduced motion. */
export function RotatingLine({ items }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % items.length), 2200);
    return () => window.clearInterval(id);
  }, [reduced, items.length]);

  return (
    <div className="flex items-center gap-4">
      <p className="sr-only">{items.join(', ')}</p>
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      {reduced ? (
        <p aria-hidden="true" className="font-display text-xl text-ink sm:text-2xl">
          {items.join(' · ')}
        </p>
      ) : (
        <div aria-hidden="true" className="flex items-baseline gap-4">
          <span className="relative inline-flex h-[1.5em] overflow-hidden font-display text-xl text-ink sm:text-2xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={items[index]}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="block whitespace-nowrap"
              >
                {items[index]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="label tabular-nums">
            {pad(index + 1)} / {pad(items.length)}
          </span>
        </div>
      )}
    </div>
  );
}
