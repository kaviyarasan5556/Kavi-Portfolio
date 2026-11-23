import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/data/process";

export function Method() {
  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="relative border-t border-line py-10 sm:py-14 lg:py-16"
    >
      <div className="shell">
        <SectionHeader
          id="method-title"
          index="02"
          system="Process"
          title="How I work."
          lede="A simple loop I use on every feature — clear enough to share, light enough to stay honest about client work."
        />

        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {processSteps.map((step, index) => (
            <li key={step.code}>
              <Reveal className="h-full" delay={index * 0.06}>
                <article className="panel group relative flex h-full flex-col overflow-hidden p-5 transition-colors duration-300 hover:border-line-strong sm:p-6">
                  <span
                    className="pointer-events-none absolute -right-1 -top-3 font-display text-6xl font-semibold tracking-[-0.04em] text-ink/5 transition-colors duration-300 group-hover:text-accent-text/15"
                    aria-hidden="true"
                  >
                    {step.code}
                  </span>
                  <p className="label text-accent-text">{step.code}</p>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-pretty text-muted sm:text-[0.9375rem]">{step.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
