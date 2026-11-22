import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUp,
  Copy,
  Download,
  Hash,
  Mail,
  Package,
  Phone,
  Search,
  SunMoon,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import { openProject } from '@/lib/drawer';
import { navSections, profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { lockScroll, scrollToId, unlockScroll } from '@/lib/scroll';
import { playTone } from '@/lib/sound';
import { paletteStore, setSound, soundStore, toggleTheme, useStore, useTheme } from '@/lib/stores';
import { copyText, notify } from '@/lib/toast';

const EXIT_MS = 160;

const itemClass =
  'flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm text-ink/90 select-none data-[selected=true]:bg-raised data-[selected=true]:text-ink';

const groupClass =
  'px-2 py-1.5 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group-heading]]:uppercase';

function Item({ icon, children, hint, keywords, onSelect }) {
  return (
    <Command.Item value={children} keywords={keywords} onSelect={onSelect} className={itemClass}>
      <span className="grid size-5 shrink-0 place-items-center text-muted" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {hint && (
        <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.1em] text-muted uppercase">
          {hint}
        </span>
      )}
    </Command.Item>
  );
}

function download(href, name) {
  const link = document.createElement('a');
  link.href = href;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
}

function openExternal(href) {
  window.open(href, '_blank', 'noopener,noreferrer');
}

/**
 * Ctrl/Cmd+K command palette. It is also the navigation menu on small screens,
 * where the top bar has no room for section links.
 */
export function CommandPalette() {
  const open = useStore(paletteStore);
  const theme = useTheme();
  const sound = useStore(soundStore);
  const content = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const next = !paletteStore.get();
        paletteStore.set(next);
        if (next) playTone('open');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  /** Closes the palette, then runs the command (after the exit animation if asked). */
  const run = (command, afterClose = false) => {
    paletteStore.set(false);
    unlockScroll();
    playTone('tick');
    if (afterClose) window.setTimeout(command, EXIT_MS + 60);
    else command();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => paletteStore.set(next)}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-70 bg-black/60 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: EXIT_MS / 1000 }}
              />
            </Dialog.Overlay>

            <div className="pointer-events-none fixed inset-0 z-80 flex items-start justify-center px-3 pt-[10vh] sm:pt-[14vh]">
              <Dialog.Content
                asChild
                forceMount
                aria-describedby={undefined}
                onOpenAutoFocus={(event) => {
                  // On touch screens, do not pop the keyboard over the menu.
                  if (window.matchMedia('(pointer: coarse)').matches) {
                    event.preventDefault();
                    content.current?.focus();
                  }
                }}
              >
                <motion.div
                  ref={content}
                  className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl outline-none"
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Dialog.Title className="sr-only">Command palette</Dialog.Title>

                  <Command label="Command palette" loop>
                    <div className="flex items-center gap-3 border-b border-line px-4">
                      <Search size={16} className="shrink-0 text-muted" aria-hidden="true" />
                      <Command.Input
                        placeholder="Jump to a section or run a command"
                        className="h-14 w-full bg-transparent text-[1rem] text-ink outline-none placeholder:text-muted"
                      />

                      <kbd className="hidden shrink-0 rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.625rem] text-muted sm:block">
                        Esc
                      </kbd>
                      <Dialog.Close
                        aria-label="Close menu"
                        className="-mr-1.5 grid size-11 shrink-0 place-items-center rounded-full text-muted sm:hidden"
                      >
                        <X size={18} aria-hidden="true" />
                      </Dialog.Close>
                    </div>

                    <Command.List
                      data-lenis-prevent
                      className="max-h-[min(62vh,27rem)] overflow-y-auto overscroll-contain py-1"
                    >
                      <Command.Empty className="px-5 py-10 text-center text-sm text-muted">
                        Nothing matches that. Try “projects”, “cv” or “email”.
                      </Command.Empty>

                      <Command.Group heading="Navigate" className={groupClass}>
                        <Item
                          icon={<ArrowUp size={15} />}
                          keywords={['home', 'start', 'hero']}
                          onSelect={() => run(() => scrollToId('top'))}
                        >
                          Back to top
                        </Item>
                        {navSections.map((section) => (
                          <Item
                            key={section.id}
                            icon={<Hash size={15} />}
                            hint={section.system}
                            keywords={[section.system, section.id]}
                            onSelect={() => run(() => scrollToId(section.id))}
                          >
                            {section.label}
                          </Item>
                        ))}
                      </Command.Group>

                      <Command.Group heading="Orders" className={groupClass}>
                        {projects.map((project) => (
                          <Item
                            key={project.slug}
                            icon={<Package size={15} />}
                            hint={project.orderNo}
                            keywords={['project', 'case study', project.kind, ...project.stack]}
                            onSelect={() => run(() => openProject(project.slug), true)}
                          >
                            {`Open case study: ${project.name}`}
                          </Item>
                        ))}
                      </Command.Group>

                      <Command.Group heading="Actions" className={groupClass}>
                        <Item
                          icon={<Download size={15} />}
                          keywords={['resume', 'cv', 'pdf']}
                          onSelect={() =>
                            run(() => download(profile.resume.href, profile.resume.downloadName))
                          }
                        >
                          Download CV
                        </Item>
                        <Item
                          icon={<Copy size={15} />}
                          keywords={['contact', 'mail', 'clipboard']}
                          onSelect={() => run(() => void copyText(profile.email, 'Email'))}
                        >
                          Copy email address
                        </Item>
                        <Item
                          icon={<SunMoon size={15} />}
                          keywords={['dark', 'light', 'mode', 'appearance']}
                          onSelect={() => run(toggleTheme)}
                        >
                          {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                        </Item>
                        <Item
                          icon={sound ? <VolumeX size={15} /> : <Volume2 size={15} />}
                          keywords={['audio', 'mute', 'volume']}
                          onSelect={() =>
                            run(() => {
                              setSound(!sound);
                              playTone('confirm');
                              notify(sound ? 'Sound off' : 'Sound on');
                            })
                          }
                        >
                          {sound ? 'Turn interface sound off' : 'Turn interface sound on'}
                        </Item>
                      </Command.Group>

                      <Command.Group heading="Links" className={groupClass}>
                        <Item
                          icon={<GitHubIcon className="size-[15px]" />}
                          hint="New tab"
                          keywords={['code', 'source', 'repositories']}
                          onSelect={() => run(() => openExternal(profile.links.github.href))}
                        >
                          GitHub
                        </Item>
                        <Item
                          icon={<LinkedInIcon className="size-[15px]" />}
                          hint="New tab"
                          keywords={['profile', 'network']}
                          onSelect={() => run(() => openExternal(profile.links.linkedin.href))}
                        >
                          LinkedIn
                        </Item>
                        <Item
                          icon={<Mail size={15} />}
                          keywords={['contact', 'message', profile.email]}
                          onSelect={() =>
                            run(() => {
                              window.location.href = `mailto:${profile.email}`;
                            })
                          }
                        >
                          Send an email
                        </Item>
                        <Item
                          icon={<Phone size={15} />}
                          keywords={['phone', 'mobile', 'contact']}
                          onSelect={() =>
                            run(() => {
                              window.location.href = profile.phone.href;
                            })
                          }
                        >
                          Call
                        </Item>
                      </Command.Group>
                    </Command.List>

                    <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.625rem] tracking-[0.08em] text-muted uppercase sm:flex">
                      <span>↑↓ Move</span>
                      <span>Enter Select</span>
                      <span>Esc Close</span>
                    </div>
                  </Command>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
