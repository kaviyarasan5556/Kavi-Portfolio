import { ArrowRight, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { stages } from '@/data/experience';
import { cn } from '@/lib/cn';
import { gsap, useGSAP } from '@/lib/gsap';
import { scrollToId } from '@/lib/scroll';

const kindLabel = {
  past: 'Completed',
  current: 'In progress',
  next: 'Open',
};

/** Must match the "pin" custom variant in src/index.css. */
const PIN_QUERY =
  '(min-width: 1100px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)';

const pad = (value) => String(value).padStart(2, '0');

function StageCard({ stage, index }) {
  const isNext = stage.kind === 'next';

  const goToLead = (event) => {
    event.preventDefault();
    scrollToId('lead');
  };

  return (
    <article
      className={cn(
        'panel relative flex w-full shrink-0 flex-col p-5 sm:p-6 pin:w-[min(72vw,64rem)] pin:p-6',
        isNext && 'border-dashed border-line-strong bg-transparent',
        stage.kind === 'current' && 'border-line-strong',
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <p className="label">
          Stage {pad(index + 1)} <span className="text-accent-text">/ {stage.stageLabel}</span>
        </p>
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase',
            stage.kind === 'current'
              ? 'border-accent bg-accent text-accent-ink'
              : 'border-line-strong text-muted',
          )}
        >
          {stage.kind === 'past' && <Check size={11} aria-hidden="true" />}
          {stage.kind === 'current' && (
            <span className="size-1.5 rounded-full bg-accent-ink" aria-hidden="true" />
          )}
          {kindLabel[stage.kind]}
        </span>
      </header>

      <h3 className="mt-6 font-display text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl pin:mt-5 pin:text-3xl">
        {stage.role}
      </h3>
      <p className="mt-2 text-lg text-ink pin:mt-1">
        {stage.company}
        {stage.location ? <span className="text-muted"> · {stage.location}</span> : null}
      </p>
      <p className="mt-1 font-mono text-xs tracking-[0.08em] text-muted uppercase">
        {stage.period}
      </p>

      <p className="mt-6 max-w-2xl text-muted pin:mt-4">{stage.summary}</p>

      {stage.points.length > 0 && (
        <ul className="mt-6 grid gap-x-8 gap-y-3 text-[0.9375rem] text-ink md:grid-cols-2 pin:mt-4 pin:gap-y-2 pin:text-sm">
          {stage.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent-text" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {stage.stack.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-8 pin:pt-5" aria-label="Technologies">
          {stage.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {isNext && (
        <div className="mt-auto pt-8">
          <a href="#lead" onClick={goToLead} className={buttonClass('primary')}>
            Open a lead
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </a>
        </div>
      )}
    </article>
  );
}

/**
 * Experience as a stage pipeline. On large screens the section pins and the
 * stages scroll past horizontally; on small screens and with reduced motion
 * it is a plain vertical list.
 */
export function Pipeline() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(PIN_QUERY, () => {
        const pin = pinRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;
        if (!pin || !track || !progress) return;

        const distance = () => Math.max(track.scrollWidth - track.clientWidth, 0);

        gsap.set(progress, { scaleX: 0 });
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(progress, { scaleX: self.progress });
              setActive(Math.round(self.progress * (stages.length - 1)));
            },
          },
        });

        return () => {
          gsap.set([track, progress], { clearProps: 'all' });
          setActive(0);
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="pipeline"
      aria-labelledby="pipeline-title"
      className="relative border-t border-line"
    >
      <div
        ref={pinRef}
        className="overflow-hidden py-10 sm:py-14 lg:py-16 pin:flex pin:min-h-svh pin:flex-col pin:justify-center pin:pt-16 pin:pb-6"
      >
        <div className="shell">
          <SectionHeader
            id="pipeline-title"
            index="03"
            system="Pipeline"
            title="Experience, stage by stage."
          />

          {/* Stage rail (large screens) */}
          <div className="mt-6 hidden pin:block" aria-hidden="true">
            <div className="relative h-px bg-line-strong">
              <span
                ref={progressRef}
                className="absolute inset-0 origin-left bg-accent"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <ol className="mt-3 grid grid-cols-3">
              {stages.map((stage, index) => (
                <li
                  key={stage.id}
                  className={cn(
                    'label transition-colors duration-300',
                    index === 1 && 'text-center',
                    index === 2 && 'text-right',
                    index <= active && 'text-accent-text',
                  )}
                >
                  {pad(index + 1)} {stage.stageLabel}
                </li>
              ))}
            </ol>
          </div>

          <div
            ref={trackRef}
            className="mt-5 flex flex-col gap-3 pin:mt-6 pin:flex-row pin:gap-6 pin:will-change-transform"
          >
            {stages.map((stage, index) => (
              <StageCard key={stage.id} stage={stage} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
