import { Moon, Sun } from 'lucide-react';
import { playTone } from '@/lib/sound';
import { toggleTheme, useTheme } from '@/lib/stores';

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        playTone('tick');
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="group grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
    >
      <span className="transition-transform duration-500 ease-out-expo group-hover:rotate-45">
        {theme === 'dark' ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
