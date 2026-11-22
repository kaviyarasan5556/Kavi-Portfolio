import { cn } from '@/lib/cn';

const base =
  'group/btn relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[transform,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.97]';

const variants = {
  primary: 'bg-accent text-accent-ink hover:-translate-y-0.5',
  ghost:
    'border border-line-strong text-ink hover:-translate-y-0.5 hover:border-accent-text hover:text-accent-text',
};

/** Class names for a pill button. Works on <a> and <button> alike. */
export function buttonClass(variant = 'primary', className) {
  return cn(base, variants[variant], className);
}
