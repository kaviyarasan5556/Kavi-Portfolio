import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { education } from '@/data/experience';

export function Records() {
  return (
    <section
      id="records"
      aria-labelledby="records-title"
      className="defer-render relative border-t border-line py-10 sm:py-14 lg:py-16 [--est:420px]"
    >
      <div className="shell">
        <SectionHeader id="records-title" index="05" system="Records" title="Education." />

        <ol className="mt-5 border-b border-line">
          {education.map((record, index) => (
            <li key={record.id}>
              <Reveal delay={index * 0.06}>
                <div className="group grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-line py-4 transition-colors duration-300 hover:border-line-strong md:grid-cols-12 md:items-baseline sm:py-5">
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase md:col-span-2">
                    {record.period}
                  </p>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-2xl leading-tight font-semibold tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent-text">
                      {record.title}
                    </h3>
                    <p className="mt-1 text-muted">{record.institution}</p>
                  </div>
                  <p className="font-display text-2xl font-semibold tracking-[-0.01em] md:col-span-3 md:text-right">
                    {record.result}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
