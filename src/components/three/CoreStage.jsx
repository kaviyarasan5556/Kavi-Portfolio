import { useInView } from 'framer-motion';
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useLowPower, usePrefersReducedMotion } from '@/lib/stores';
import { CoreFallback } from './CoreFallback';

// three.js is large, so the scene is a separate chunk fetched only when it will be shown.
const SystemCoreCanvas = lazy(() => import('./SystemCoreCanvas'));

/** If WebGL is unavailable, the chunk fails to load or the scene throws, keep the static diagram. */
class CanvasBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Decides what to show for the hero centrepiece:
 *  - reduced motion, or a low-power phone: the static SVG diagram only
 *  - everyone else: the diagram first, then the WebGL scene fades in over it
 *
 * The WebGL bundle is requested a moment after load so it never competes with
 * the first paint, and rendering pauses while the hero is off screen.
 */
export function CoreStage({ className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '160px' });
  const lowPower = useLowPower();
  const reduced = usePrefersReducedMotion();
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), 700);
    return () => window.clearTimeout(id);
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const live = armed && !lowPower && !reduced;

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
    >
      <div
        className={cn(
          'absolute inset-0 p-[8%] transition-opacity duration-700',
          live && ready ? 'opacity-0' : 'opacity-100',
        )}
        aria-hidden={live && ready}
      >
        <CoreFallback />
      </div>

      {live && (
        <div
          className={cn(
            'core-mask absolute inset-0 cursor-grab transition-opacity duration-1000 active:cursor-grabbing',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        >
          <CanvasBoundary>
            <Suspense fallback={null}>
              <SystemCoreCanvas active={inView} onReady={onReady} />
            </Suspense>
          </CanvasBoundary>
        </div>
      )}
    </div>
  );
}
