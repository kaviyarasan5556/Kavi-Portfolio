import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { skillGroups, tiers } from '@/data/skills';
import { cn } from '@/lib/cn';
import { playTone } from '@/lib/sound';

const tierOrder = ['core', 'daily', 'comfortable'];
const allSkills = skillGroups.flatMap((group) => group.skills);
const countByTier = (tier) => allSkills.filter((skill) => skill.tier === tier).length;

/** Column spans for the bento grid, by group id. */
const spans = {
  product: 'md:col-span-6 lg:col-span-7',
  frontend: 'md:col-span-3 lg:col-span-5',
  backend: 'md:col-span-3 lg:col-span-4',
  databases: 'md:col-span-3 lg:col-span-4',
  ai: 'md:col-span-6 lg:col-span-6',
  payments: 'md:col-span-3 lg:col-span-6',
  tools: 'md:col-span-6 lg:col-span-6',
};

/**
 * Three-segment stock gauge: one segment per tier level. Not a percentage.
 * The segments fill once `shown` turns true (when the card scrolls into view).
 */
function Gauge({ level, dimmed, shown }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[1, 2, 3].map((segment) => (
        <span key={segment} className="h-1.5 w-5 overflow-hidden rounded-full bg-line-strong">
          {segment <= level && (
            <motion.span
              className={cn(
                'gauge-fill block h-full w-full origin-left rounded-full',
                dimmed ? 'bg-muted' : 'bg-accent',
              )}
              initial={false}
              animate={{ scaleX: shown ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.1 + segment * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </span>
      ))}
    </span>
  );
}

function GroupCard({ group, filter }) {
  const wide = group.id === 'product' || group.id === 'tools';
  const ref = useRef(null);
  const shown = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <article
      ref={ref}
      className="panel h-full p-5 transition-colors duration-300 hover:border-line-strong sm:p-6"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{group.title}</h3>
          <p className="mt-1 text-sm text-muted">{group.note}</p>
        </div>
        <span className="shrink-0 rounded border border-line-strong px-2 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-accent-text">
          {group.code}-{String(group.skills.length).padStart(2, '0')}
        </span>
      </header>

      <ul className={cn('mt-6 grid gap-x-8', wide && 'sm:grid-cols-2')}>
        {group.skills.map((skill) => {
          const tier = tiers[skill.tier];
          const dimmed = filter !== 'all' && filter !== skill.tier;

          return (
            <li
              key={skill.name}
              className={cn(
                'flex items-center justify-between gap-4 border-t border-line py-3 transition-opacity duration-300',
                dimmed && 'opacity-30',
              )}
            >
              <span className="text-[0.9375rem] text-ink">{skill.name}</span>
              <span className="flex shrink-0 items-center gap-3">
                <Gauge level={tier.level} dimmed={dimmed} shown={shown} />
                <span className="w-[5.5rem] text-right font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                  {tier.label}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function Inventory() {
  const [filter, setFilter] = useState('all');

  const options = [
    { id: 'all', label: 'All', count: allSkills.length },
    ...tierOrder.map((tier) => ({ id: tier, label: tiers[tier].label, count: countByTier(tier) })),
  ];

  return (
    <section
      id="inventory"
      aria-labelledby="inventory-title"
      className="relative border-t border-line py-10 sm:py-14 lg:py-16"
    >
      <div className="shell">
        <SectionHeader
          id="inventory-title"
          index="02"
          system="Inventory"
          title="Skills in stock."
          lede="Product domains first, then the stack behind them: POS, AI ordering, payments, APIs and the tools used to ship."
        />

        <Reveal className="mt-5 flex flex-wrap items-center gap-2">
          <span className="label mr-2">Filter</span>
          {options.map((option) => {
            const selected = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFilter(option.id);
                  playTone('tick');
                }}
                className={cn(
                  'inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300',
                  selected
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line text-muted hover:border-line-strong hover:text-ink',
                )}
              >
                {option.label}
                <span className="font-mono text-[0.6875rem] tabular-nums opacity-70">
                  {String(option.count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4 lg:grid-cols-12">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} className={spans[group.id]} delay={(index % 3) * 0.07}>
              <GroupCard group={group} filter={filter} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
