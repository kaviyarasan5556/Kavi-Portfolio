import { ArrowUpRight, Download } from 'lucide-react';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { about, profile } from '@/data/profile';

const cell =
  'panel group relative h-full overflow-hidden p-5 transition-colors duration-300 hover:border-line-strong sm:p-6';

export function Overview() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section
      id="overview"
      aria-labelledby="overview-title"
      className="relative border-t border-line py-10 sm:py-14 lg:py-16"
    >
      <div className="shell">
        <SectionHeader
          id="overview-title"
          index="01"
          system="Overview"
          title="About me."
          lede={about.lede}
        />

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4 lg:grid-cols-12">
          {/* Profile copy */}
          <Reveal className="md:col-span-6 lg:col-span-7">
            <article className={cell}>
              <p className="label">Profile</p>
              <p className="mt-4 font-display text-2xl leading-snug tracking-[-0.01em] text-ink sm:text-[1.75rem]">
                {lead}
              </p>
              <div className="mt-4 space-y-3 text-muted">
                {rest.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Currently */}
          <Reveal className="md:col-span-6 lg:col-span-5" delay={0.05}>
            <article className={cell}>
              <p className="label flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
                Currently
              </p>
              <p className="mt-5 font-display text-2xl font-semibold tracking-[-0.01em]">
                {profile.currentTitle}
              </p>
              <p className="mt-1 text-muted">
                {profile.currentCompany} · since {profile.currentSince}
              </p>
              <p className="mt-4 text-sm text-ink">
                Shipping{' '}
                <span className="font-semibold text-accent-text">{profile.currentProduct}</span>
                {': '}
                {profile.currentProductKind}.
              </p>
              <a
                href={profile.resume.href}
                download={profile.resume.downloadName}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
              >
                <Download size={15} aria-hidden="true" />
                Download CV
              </a>
            </article>
          </Reveal>

          {/* Practice */}
          <Reveal className="md:col-span-6 lg:col-span-12" delay={0.1}>
            <article className={cell}>
              <p className="label">Practice</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {about.practice.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-xl text-muted">{profile.summary}</p>
            </article>
          </Reveal>

          {/* Problems I solve */}
          {about.problems.map((problem, index) => (
            <Reveal key={problem.code} className="md:col-span-2 lg:col-span-4" delay={index * 0.07}>
              <article className={cell}>
                <div className="flex items-center justify-between">
                  <span className="rounded border border-line-strong px-2 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-accent-text">
                    {problem.code}
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text"
                  />
                </div>
                <h3 className="mt-8 font-display text-2xl leading-tight font-semibold tracking-[-0.01em]">
                  {problem.title}
                </h3>
                <p className="mt-3 text-muted">{problem.body}</p>
              </article>
            </Reveal>
          ))}

          {/* Counters */}
          {about.counters.map((counter, index) => (
            <Reveal
              key={counter.label}
              className="md:col-span-2 lg:col-span-4"
              delay={index * 0.06}
            >
              <article className={cell}>
                <p className="font-display text-5xl font-semibold tracking-[-0.03em] text-ink sm:text-6xl">
                  <Counter
                    value={counter.value}
                    decimals={counter.decimals}
                    suffix={counter.suffix}
                  />
                </p>
                <p className="mt-3 text-sm text-muted">{counter.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
