import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/stores';

/** Cycles through the stack. Shows the full list for reduced motion. */
export function RotatingLine({ items }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % items.length), 2000);
    return () => window.clearInterval(id);
  }, [reduced, items.length]);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <p className="sr-only">{items.join(', ')}</p>

      <span
        className="inline-flex items-center gap-2 rounded-full border border-accent-text/35 bg-accent/15 px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-accent-text uppercase"
        aria-hidden="true"
      >
        <span className="size-1.5 animate-pulse rounded-full bg-accent-text" />
        Stack
      </span>

      {reduced ? (
        <p
          aria-hidden="true"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
        >
          {items.join(' · ')}
        </p>
      ) : (
        <span
          aria-hidden="true"
          className="relative inline-flex h-[1.45em] min-w-[8.5rem] overflow-hidden font-display text-xl font-semibold tracking-[-0.02em] text-accent-text sm:min-w-[10rem] sm:text-2xl"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={items[index]}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 block whitespace-nowrap"
            >
              {items[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </div>
  );
}
