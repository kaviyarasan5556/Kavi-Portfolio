import { motion } from 'framer-motion';
import { Download, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navSections, profile } from '@/data/profile';
import { cn } from '@/lib/cn';
import { scrollToId } from '@/lib/scroll';
import { playTone } from '@/lib/sound';
import { paletteStore, useScrolled } from '@/lib/stores';
import { ThemeToggle } from './ThemeToggle';

/** Tracks which section currently sits in the middle band of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    // The hero ("top") is watched too, so no nav item stays lit above the first section.
    const elements = ['top', ...navSections.map((section) => section.id)]
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(entry.target.id === 'top' ? null : entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function TopBar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection();

  const go = (id) => (event) => {
    event.preventDefault();
    scrollToId(id);
  };

  const openPalette = () => {
    paletteStore.set(true);
    playTone('open');
  };

  return (
    <header
      className={cn(
        'intro-fade fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-line bg-base/85 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <div className="shell flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
        <a href="#top" onClick={go('top')} className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-line-strong bg-raised ring-0 transition-[box-shadow,border-color] duration-300 group-hover:border-accent-text group-hover:ring-2 group-hover:ring-accent/25">
            <img
              src={profile.photo.src}
              alt=""
              width={36}
              height={36}
              decoding="async"
              className="size-full object-cover object-[50%_28%]"
            />
          </span>
          <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line-strong font-mono text-[0.6875rem] font-semibold text-accent-text transition-colors duration-300 group-hover:border-accent-text sm:size-9 sm:text-xs">
            {profile.initials}
          </span>
          <span className="hidden truncate text-sm font-semibold sm:inline">{profile.name}</span>
          <span className="sr-only">, back to top</span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navSections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={go(section.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-line bg-raised"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={profile.resume.href}
            download={profile.resume.downloadName}
            aria-label="Download CV"
            className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-line-strong hover:text-accent-text md:hidden"
          >
            <Download size={16} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={openPalette}
            className="hidden h-10 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink md:inline-flex"
          >
            <Search size={15} aria-hidden="true" />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={openPalette}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <Menu size={17} aria-hidden="true" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
