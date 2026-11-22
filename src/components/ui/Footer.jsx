import { ArrowUp } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import { navSections, profile } from '@/data/profile';
import { scrollToId } from '@/lib/scroll';

const YEAR = new Date().getFullYear();

const linkClass = 'text-muted transition-colors duration-300 hover:text-accent-text';

export function Footer() {
  const go = (id) => (event) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="defer-render relative z-10 border-t border-line [--est:320px]">
      <div className="shell py-6 lg:py-8">
        <div className="grid gap-6 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] sm:text-3xl">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-muted sm:text-[1rem]">
              {profile.role} · {profile.location.city}, {profile.location.country}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="label">Sections</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-0.5">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={go(section.id)}
                    className={`${linkClass} inline-flex min-h-9 items-center`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="label">Elsewhere</h2>
            <ul className="mt-3 grid gap-0.5">
              <li>
                <a
                  href={profile.links.github.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${linkClass} inline-flex min-h-9 items-center gap-2`}
                >
                  <GitHubIcon className="size-4" />
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${linkClass} inline-flex min-h-9 items-center gap-2`}
                >
                  <LinkedInIcon className="size-4" />
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className={`${linkClass} inline-flex min-h-9 items-center wrap-anywhere`}
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4 text-sm text-muted">
          <p>
            © {YEAR} {profile.name}
          </p>
          <a
            href="#top"
            onClick={go('top')}
            aria-label="Back to top"
            className={`${linkClass} inline-flex size-9 items-center justify-center`}
          >
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
