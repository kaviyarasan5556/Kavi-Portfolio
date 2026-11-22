import { motion } from 'framer-motion';

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * With reduced motion, MotionConfig drops the movement and keeps a plain fade.
 */
export function Reveal({ children, className, delay = 0, y = 28 }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
