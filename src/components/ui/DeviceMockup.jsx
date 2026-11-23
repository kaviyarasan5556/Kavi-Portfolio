import { cn } from '@/lib/cn';

const bar = 'rounded-full bg-line-strong';
const block = 'rounded-md border border-line bg-raised';

function Dashboard() {
  const bars = [38, 62, 46, 80, 54, 92, 68];
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-[16%] flex-col gap-2">
        <span className="h-2 w-3/4 rounded-full bg-accent" />
        {[1, 2, 3, 4].map((item) => (
          <span key={item} className={cn(bar, 'h-1.5')} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className={cn(block, 'p-2')}>
              <span className={cn(bar, 'block h-1 w-1/2')} />
              <span className="mt-2 block h-2.5 w-2/3 rounded-full bg-ink/70" />
            </div>
          ))}
        </div>
        <div className={cn(block, 'flex flex-1 items-end gap-[4%] p-3')}>
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn('flex-1 rounded-t-sm', index === 5 ? 'bg-accent' : 'bg-line-strong')}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {[1, 2].map((item) => (
            <span key={item} className={cn(bar, 'h-1.5')} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Board() {
  const columns = [3, 2, 3];
  return (
    <div className="grid h-full grid-cols-3 gap-3">
      {columns.map((cards, column) => (
        <div key={column} className="flex flex-col gap-2">
          <span className={cn(bar, 'h-1.5 w-1/2')} />
          {Array.from({ length: cards }, (_, card) => (
            <div
              key={card}
              className={cn(block, 'p-2', column === 1 && card === 0 && 'border-accent-text')}
            >
              <span className="block h-1.5 w-3/4 rounded-full bg-ink/60" />
              <span className={cn(bar, 'mt-1.5 block h-1 w-1/2')} />
              <span
                className={cn(
                  'mt-2 block size-2.5 rounded-full',
                  column === 1 && card === 0 ? 'bg-accent' : 'bg-line-strong',
                )}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Directory() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={cn(block, 'h-5 flex-1 rounded-full')} />
        <span className="h-5 w-12 rounded-full bg-accent" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className={cn(block, 'flex flex-col items-center justify-center gap-1.5 p-2')}
          >
            <span
              className={cn('size-5 rounded-full', item === 2 ? 'bg-accent' : 'bg-line-strong')}
            />

            <span className="h-1.5 w-2/3 rounded-full bg-ink/60" />
            <span className={cn(bar, 'h-1 w-1/2')} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MapView() {
  const pins = [
    { left: '22%', top: '34%' },
    { left: '48%', top: '58%' },
    { left: '66%', top: '26%' },
    { left: '80%', top: '66%' },
  ];
  return (
    <div className="flex h-full gap-3">
      <div
        className={cn(block, 'relative flex-1 overflow-hidden')}
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <span className="absolute top-[45%] left-0 h-1.5 w-full -rotate-6 bg-line-strong" />
        <span className="absolute top-0 left-[58%] h-full w-1.5 rotate-12 bg-line-strong" />
        {pins.map((pin, index) => (
          <span
            key={index}
            className={cn(
              'absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface',
              index === 1 ? 'size-4 bg-accent' : 'bg-ink/70',
            )}
            style={pin}
          />
        ))}
      </div>
      <div className="flex w-[28%] flex-col gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className={cn(block, 'p-2', item === 1 && 'border-accent-text')}>
            <span className="block h-1.5 w-3/4 rounded-full bg-ink/60" />
            <span className={cn(bar, 'mt-1.5 block h-1 w-1/2')} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[70%] flex-col gap-2">
      <span className={cn(block, 'h-6 w-3/5 rounded-2xl rounded-bl-sm')} />
      <span className="h-6 w-2/5 self-end rounded-2xl rounded-br-sm bg-accent" />
      <span className={cn(block, 'h-10 w-4/5 rounded-2xl rounded-bl-sm')} />
      <span className="h-6 w-1/3 self-end rounded-2xl rounded-br-sm bg-accent" />
      <div className="mt-auto flex items-center gap-2">
        <span className={cn(block, 'h-6 flex-1 rounded-full')} />
        <span className="size-6 rounded-full bg-accent" />
      </div>
    </div>
  );
}

const variants = {
  dashboard: Dashboard,
  board: Board,
  directory: Directory,
  map: MapView,
  chat: Chat,
};

/**
 * Browser-window frame for a project. Shows the real screenshot when
 * `project.cover` is set, otherwise an abstract wireframe of that kind of app.
 */
export function DeviceMockup({ project, className }) {
  const Wireframe = variants[project.mockup];

  return (
    <div
      className={cn('overflow-hidden rounded-xl border border-line bg-surface', className)}
      role="img"
      aria-label={
        project.cover
          ? `Screenshot of ${project.name}`
          : `Placeholder wireframe for ${project.name}`
      }
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-3 truncate rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.08em] text-muted">
          {project.slug}
        </span>
      </div>
      <div className="relative aspect-16/10 bg-raised">
        {project.cover ? (
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 p-[5%]" aria-hidden="true">
            <Wireframe />
          </div>
        )}
      </div>
    </div>
  );
}
