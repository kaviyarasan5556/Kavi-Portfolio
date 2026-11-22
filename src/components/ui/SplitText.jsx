import { cn } from '@/lib/cn';

/**
 * Splits a headline into words that rise into place one after another.
 * The words stay real text (no aria tricks needed), and the animation is the
 * CSS intro timeline, so it also runs before JavaScript loads.
 */
export function SplitText({ parts, stagger = 70 }) {
  const words = parts.flatMap((part) =>
    part.text.split(' ').map((word) => ({ word, accent: Boolean(part.accent) })),
  );

  return (
    <>
      {words.map(({ word, accent }, index) => (
        <span key={`${word}-${index}`}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
            <span
              className={cn('intro-rise', accent && 'text-accent-text')}
              style={{ '--d': `${index * stagger}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}
