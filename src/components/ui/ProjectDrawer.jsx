import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { GitHubIcon } from '@/components/ui/BrandIcons';
import { DeviceMockup } from '@/components/ui/DeviceMockup';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { isPlaceholder, projects } from '@/data/projects';
import { focusDrawerOpener } from '@/lib/drawer';
import { lockScroll, unlockScroll } from '@/lib/scroll';
import { playTone } from '@/lib/sound';
import { drawerStore, useMediaQuery, useStore } from '@/lib/stores';

const EASE = [0.16, 1, 0.3, 1];
const IS_DEV = import.meta.env.DEV;

function neighbour(slug, step) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + step + projects.length) % projects.length];
}

function Field({ label, children }) {
  return (
    <div className="border-t border-line pt-5">
      <h3 className="label">{label}</h3>
      <div className="mt-3 text-pretty text-ink/90">{children}</div>
    </div>
  );
}

function CaseStudy({ project }) {
  // Placeholder metrics are a to-do list for the site owner: visible while
  // developing, never shipped to visitors.
  const metrics = project.metrics.filter((metric) => IS_DEV || !isPlaceholder(metric));

  return (
    <div className="px-5 pt-6 pb-10 sm:px-8">
      <DeviceMockup project={project} />

      <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
        {project.kind}
      </p>
      <Dialog.Title className="mt-2 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl">
        {project.name}
      </Dialog.Title>
      <Dialog.Description className="mt-4 text-lg text-pretty text-muted">
        {project.pitch}
      </Dialog.Description>

      <div className="mt-8 grid gap-6">
        <Field label="Role">
          <p>{project.role}</p>
        </Field>
        <Field label="Challenge">
          <p>{project.challenge}</p>
        </Field>
        <Field label="Solution">
          <p>{project.solution}</p>
        </Field>

        <Field label="What it does">
          <ul className="grid gap-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-text" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </Field>

        <Field label="Tech">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Field>

        <Field label="Outcome">
          <p>{project.outcome}</p>
          {metrics.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {metrics.map((metric) =>
                isPlaceholder(metric) ? (
                  <li
                    key={metric}
                    className="rounded-md border border-dashed border-accent-text/60 px-3 py-1.5 font-mono text-[0.6875rem] text-accent-text"
                  >
                    To do (hidden in production): {metric}
                  </li>
                ) : (
                  <li
                    key={metric}
                    className="rounded-md border border-line bg-raised px-3 py-1.5 text-sm font-medium"
                  >
                    {metric}
                  </li>
                ),
              )}
            </ul>
          )}
        </Field>

        {project.links.length > 0 && (
          <Field label="Links">
            <ul className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors duration-300 hover:border-accent-text hover:text-accent-text"
                  >
                    {link.kind === 'github' ? (
                      <GitHubIcon className="size-4" />
                    ) : (
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    )}
                    {link.label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Field>
        )}
      </div>
    </div>
  );
}

/** Case-study drawer: a right-hand sheet on desktop, a bottom sheet on phones. */
export function ProjectDrawer() {
  const slug = useStore(drawerStore);
  const project = projects.find((item) => item.slug === slug) ?? null;
  const wide = useMediaQuery('(min-width: 768px)');
  const scroller = useRef(null);
  const open = project !== null;

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  // Each case study starts at the top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [slug]);

  const go = (step) => {
    if (!project) return;
    playTone('tick');
    drawerStore.set(neighbour(project.slug, step).slug);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };

  const hidden = wide ? { x: '100%', y: 0 } : { x: 0, y: '100%' };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && drawerStore.set(null)}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-70 bg-black/60 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onKeyDown={onKeyDown}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                focusDrawerOpener();
              }}
            >
              <motion.div
                className="fixed inset-x-0 bottom-0 z-80 flex max-h-[92dvh] flex-col rounded-t-2xl border border-line bg-base shadow-2xl outline-none md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(46rem,92vw)] md:rounded-none md:border-y-0 md:border-r-0"
                initial={hidden}
                animate={{ x: 0, y: 0 }}
                exit={hidden}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-8">
                  <div className="flex min-w-0 items-center gap-3">
                    <p className="font-mono text-xs tracking-[0.14em] text-accent-text">
                      {project.orderNo}
                    </p>
                    <StatusBadge status={project.status} />
                  </div>
                  <Dialog.Close
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent-text hover:text-accent-text"
                    aria-label="Close case study"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </Dialog.Close>
                </header>

                <div
                  ref={scroller}
                  data-lenis-prevent
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <CaseStudy project={project} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <footer className="grid shrink-0 grid-cols-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="group flex min-h-14 items-center gap-3 px-5 py-3 text-left transition-colors duration-300 hover:bg-surface sm:px-8"
                  >
                    <ArrowLeft
                      className="size-4 shrink-0 text-muted transition-transform duration-300 ease-out-expo group-hover:-translate-x-1 group-hover:text-accent-text"
                      aria-hidden="true"
                    />

                    <span className="min-w-0">
                      <span className="label block">Previous</span>
                      <span className="block truncate text-sm font-semibold">
                        {neighbour(project.slug, -1).name}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="group flex min-h-14 items-center justify-end gap-3 border-l border-line px-5 py-3 text-right transition-colors duration-300 hover:bg-surface sm:px-8"
                  >
                    <span className="min-w-0">
                      <span className="label block">Next</span>
                      <span className="block truncate text-sm font-semibold">
                        {neighbour(project.slug, 1).name}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </button>
                </footer>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
