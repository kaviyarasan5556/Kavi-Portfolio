import { Reveal } from './Reveal';

/** Section heading: a mono "system" eyebrow, a plain-language title, and an optional lede. */
export function SectionHeader({ id, index, system, title, lede }) {
  return (
    <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
      <div>
        <p className="label flex items-center gap-3">
          <span className="text-accent-text">{index}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          {system}
        </p>
        <h2
          id={id}
          className="mt-2 font-display text-[1.875rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
      </div>
      {lede ? <p className="max-w-md text-sm text-muted sm:text-[1rem] md:pb-1">{lede}</p> : null}
    </Reveal>
  );
}
