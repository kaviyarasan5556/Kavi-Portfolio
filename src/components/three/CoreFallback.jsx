import { cn } from '@/lib/cn';
import { coreOrbitSkills } from '@/data/coreScene';

const FALLBACK_ORBIT = [
  { x: 200, y: 70, skillIndex: 0 },
  { x: 330, y: 200, skillIndex: 1 },
  { x: 200, y: 330, skillIndex: 2 },
  { x: 70, y: 200, skillIndex: 3 },
  { x: 300, y: 110, skillIndex: 4 },
  { x: 100, y: 290, skillIndex: 5 },
];

/**
 * Static blueprint of the system core: UI tiles, the API in the middle, and
 * the database stack, joined by request/response lines. It is what low-power
 * phones and reduced-motion visitors see, and it is the placeholder that the
 * WebGL scene fades in over.
 */
export function CoreFallback({ className }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn('h-full w-full', className)}
      fill="none"
      role="img"
      aria-label="Skill map: Frontend, Backend and Data hubs with orbiting stack labels"
    >
      <g stroke="var(--line-strong)" strokeWidth="1">
        <circle cx="200" cy="200" r="176" />
        <ellipse cx="200" cy="200" rx="176" ry="62" transform="rotate(-24 200 200)" />
      </g>

      {/* Links */}
      <g stroke="var(--accent-text)" strokeWidth="1.25" opacity="0.75">
        <path className="dash-flow" d="M132 142 178 180" />
        <path className="dash-flow" d="M222 220 276 262" />
      </g>
      <g stroke="var(--line-strong)" strokeWidth="1">
        <path d="M200 164V96M236 200h74M164 200H96M200 236v70" />
      </g>

      {/* Satellites + skill labels */}
      <g fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1">
        {FALLBACK_ORBIT.map((node) => (
          <rect key={node.skillIndex} x={node.x - 7} y={node.y - 7} width="14" height="14" />
        ))}
      </g>
      <g
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.6"
        textAnchor="middle"
      >
        {FALLBACK_ORBIT.map((node) => (
          <text key={`label-${node.skillIndex}`} x={node.x} y={node.y < 200 ? node.y - 14 : node.y + 24}>
            {coreOrbitSkills[node.skillIndex]}
          </text>
        ))}
      </g>

      {/* UI tiles */}
      <g fill="var(--surface)" stroke="var(--accent-text)" strokeWidth="1.25">
        <rect x="52" y="88" width="34" height="26" rx="3" />
        <rect
          x="92"
          y="88"
          width="34"
          height="26"
          rx="3"
          fill="var(--accent)"
          stroke="var(--accent)"
        />

        <rect x="132" y="88" width="34" height="26" rx="3" />
        <rect x="52" y="120" width="34" height="26" rx="3" />
        <rect x="92" y="120" width="34" height="26" rx="3" />
        <rect x="132" y="120" width="34" height="26" rx="3" />
      </g>

      {/* API core */}
      <g transform="rotate(45 200 200)">
        <rect
          x="164"
          y="164"
          width="72"
          height="72"
          fill="var(--surface)"
          stroke="var(--accent-text)"
          strokeWidth="1.5"
        />

        <rect x="186" y="186" width="28" height="28" fill="var(--accent)" />
      </g>

      {/* Database stack */}
      <g fill="var(--surface)" stroke="var(--accent-text)" strokeWidth="1.25">
        <path d="M262 300v20c0 8 19 14 42 14s42-6 42-14v-20" />
        <ellipse cx="304" cy="300" rx="42" ry="13" />
        <path d="M262 276v20c0 8 19 14 42 14s42-6 42-14v-20" />
        <ellipse cx="304" cy="276" rx="42" ry="13" />
        <path d="M262 252v20c0 8 19 14 42 14s42-6 42-14v-20" />
        <ellipse cx="304" cy="252" rx="42" ry="13" />
      </g>

      <g
        fill="var(--accent-text)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1.2"
        textAnchor="middle"
      >
        <text x="109" y="170">
          Frontend
        </text>
        <text x="200" y="268">
          Backend
        </text>
        <text x="304" y="356">
          Data
        </text>
      </g>
    </svg>
  );
}
