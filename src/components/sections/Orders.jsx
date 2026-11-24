import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DeviceMockup } from '@/components/ui/DeviceMockup';
import { GitHubIcon } from '@/components/ui/BrandIcons';
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
  const live = project.links.find((link) => link.kind === 'live');
  const github = project.links.find((link) => link.kind === 'github');

  return (
    <TiltCard className="h-full rounded-2xl" max={featured ? 2.5 : 4}>
      <article
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

          <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
            <button
              type="button"
              onClick={() => openProject(project.slug)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-accent-text after:absolute after:inset-0 after:z-0 after:rounded-2xl"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                View details
                <span className="sr-only">: {project.name}</span>
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </button>

            {live ? (
              <a
                href={live.href}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
              >
                Live
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}

            {github ? (
              <a
                href={github.href}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent-text"
              >
                <GitHubIcon className="size-3.5" />
                Code
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
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
          title="Selected work."
          lede="A closer look at what I have shipped — the problem, the build, and the stack behind it."
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
