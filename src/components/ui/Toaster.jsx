import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/lib/stores';
import { toastStore } from '@/lib/toast';

/** Bottom-centre confirmation message, announced politely to screen readers. */
export function Toaster() {
  const message = useStore(toastStore);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-90 flex justify-center px-4"
    >
      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            className="rounded-full border border-line-strong bg-raised px-4 py-2.5 text-sm font-medium text-ink shadow-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
