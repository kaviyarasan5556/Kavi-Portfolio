import { ArrowRight } from 'lucide-react';
import { DeviceMockup } from '@/components/ui/DeviceMockup';
import { openProject } from '@/lib/drawer';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TiltCard } from '@/components/ui/TiltCard';
import { projects } from '@/data/projects';
import { cn } from '@/lib/cn';

const VISIBLE_STACK = 4;

function OrderCard({ project, featured }) {
  const stack = project.stack.slice(0, VISIBLE_STACK);
  const hidden = project.stack.length - stack.length;

  return (
    <TiltCard className="h-full rounded-2xl" max={featured ? 2.5 : 4}>
      <article
        data-cursor="open"
        className={cn(
          'panel group relative grid h-full gap-4 p-4 transition-colors duration-300 hover:border-line-strong sm:p-5',
          featured && 'lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-6',
        )}
      >
        <DeviceMockup
          project={project}
          className={cn(
            'transition-transform duration-700 ease-out-expo group-hover:-translate-y-1',
            featured && 'lg:col-span-7',
          )}
        />

        <div className={cn('flex flex-col', featured && 'lg:col-span-5')}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs tracking-[0.14em] text-accent-text">
              {project.orderNo}
            </p>
            <StatusBadge status={project.status} />
          </div>

          <h3
            className={cn(
              'mt-5 font-display leading-[1.05] font-semibold tracking-[-0.02em]',
              featured ? 'text-4xl lg:text-5xl' : 'text-3xl',
            )}
          >
            {project.name}
          </h3>
          <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
            {project.kind}
          </p>
          <p className="mt-4 max-w-[52ch] text-pretty text-muted">{project.pitch}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Main technologies">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
              >
                {item}
              </li>
            ))}
            {hidden > 0 && (
              <li className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
                +{hidden} more
              </li>
            )}
          </ul>

          <div className="mt-auto pt-6">
            {/* The ::after layer stretches this button over the whole card. */}
            <button
              type="button"
              onClick={() => openProject(project.slug)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-accent-text after:absolute after:inset-0 after:rounded-2xl"
            >
              Open case study
              <span className="sr-only">: {project.name}</span>
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export function Orders() {
  return (
    <section
      id="orders"
      aria-labelledby="orders-title"
      className="defer-render relative border-t border-line py-10 sm:py-14 lg:py-16 [--est:1800px]"
    >
      <div className="shell">
        <SectionHeader
          id="orders-title"
          index="04"
          system="Orders"
          title="Selected projects."
          lede="Open any order for the full case study: the problem, what I built and what it runs on."
        />

        <ul className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {projects.map((project, index) => (
            <li key={project.slug} className={cn(index === 0 && 'lg:col-span-2')}>
              <Reveal className="h-full" delay={index === 0 ? 0 : ((index - 1) % 2) * 0.08}>
                <OrderCard project={project} featured={index === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
