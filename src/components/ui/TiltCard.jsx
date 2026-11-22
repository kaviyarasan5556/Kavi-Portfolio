import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Subtle 3D tilt toward the pointer, plus a soft highlight that follows it.
 * CSS transforms only (no WebGL). Mouse only; flat for reduced motion.
 */
export function TiltCard({ children, className, max = 4 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  const onMove = (event) => {
    const element = ref.current;
    if (reduced || event.pointerType !== 'mouse' || !element) return;

    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set(-(py - 0.5) * 2 * max);
    element.style.setProperty('--mx', `${px * 100}%`);
    element.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }}
      className={cn('group/tilt relative', className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <span
        aria-hidden="true"
        className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
