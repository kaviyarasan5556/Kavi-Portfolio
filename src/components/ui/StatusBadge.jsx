import { cn } from '@/lib/cn';

const tones = {
  live: { badge: 'border-ok/50 text-ok', dot: 'bg-ok' },
  shipped: { badge: 'border-accent-text/50 text-accent-text', dot: 'bg-accent-text' },
  neutral: { badge: 'border-line-strong text-muted', dot: 'bg-muted' },
};

export function StatusBadge({ status, className }) {
  const tone = tones[status.tone];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.625rem] tracking-[0.12em] whitespace-nowrap uppercase',
        tone.badge,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', tone.dot)} aria-hidden="true" />
      {status.label}
    </span>
  );
}
