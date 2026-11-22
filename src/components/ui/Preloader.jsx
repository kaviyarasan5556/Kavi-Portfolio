import { useCallback, useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import { useClientValue } from '@/lib/stores';

/** Must match --intro in index.css. */
const INTRO_MS = 1200;

/** Set by the boot script in index.html: once per session, and for reduced motion. */
const introSkipped = () => 'skipIntro' in document.documentElement.dataset;

const INTRO_ANIMATIONS = new Set([
  'preloader-out',
  'preloader-draw',
  'preloader-bar',
  'intro-hold-rise',
  'intro-rise',
  'intro-hold-fade',
  'intro-fade',
]);

/**
 * Fast-forwards the whole intro timeline (preloader and hero reveal) to the
 * moment the preloader lifts, by shifting every intro animation by the same amount.
 */
function skipIntro() {
  if (typeof document.getAnimations !== 'function') return;

  const animations = document
    .getAnimations()
    .filter(
      (animation) => 'animationName' in animation && INTRO_ANIMATIONS.has(animation.animationName),
    );

  const out = animations.find((animation) => animation.animationName === 'preloader-out');
  if (!out) return;

  const shift = INTRO_MS - Number(out.currentTime ?? 0);
  if (shift <= 0) return;

  for (const animation of animations) {
    animation.currentTime = Number(animation.currentTime ?? 0) + shift;
  }
}

/**
 * Branded intro: the KR monogram draws itself, then the panel lifts.
 * It runs on CSS alone (about 1.2s), shows once per browser session, is
 * skipped for reduced motion, and can be dismissed with a click or Escape.
 */
export function Preloader() {
  const [finished, setFinished] = useState(false);
  const skipped = useClientValue(introSkipped);
  const hidden = finished || skipped;

  const skip = useCallback(() => skipIntro(), []);

  useEffect(() => {
    if (hidden) return;
    const onKey = (event) => {
      if (event.key === 'Escape') skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hidden, skip]);

  if (hidden) return null;

  return (
    <div
      className="preloader"
      onClick={skip}
      onAnimationEnd={(event) => {
        if (event.animationName === 'preloader-out') setFinished(true);
      }}
    >
      <div className="flex flex-col items-center gap-7">
        <svg
          className="preloader-mark text-accent-text"
          viewBox="0 0 100 64"
          width="150"
          height="96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          <path pathLength={1} d="M10 6v52" />
          <path pathLength={1} d="M40 6 10 36m10-10 22 32" />
          <path pathLength={1} d="M58 58V6h17a14 14 0 0 1 0 28H58" />
          <path pathLength={1} d="m74 34 16 24" />
        </svg>
        <div className="h-px w-44 overflow-hidden bg-line-strong">
          <div className="preloader-bar h-px bg-accent" />
        </div>
        <p className="label">{profile.name}</p>
      </div>

      <button
        type="button"
        onClick={skip}
        className="label absolute right-5 bottom-5 rounded-full border border-line px-3.5 py-2 transition-colors hover:border-line-strong hover:text-ink sm:right-8 sm:bottom-8"
      >
        Skip intro
      </button>
    </div>
  );
}
