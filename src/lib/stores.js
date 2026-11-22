import { useCallback, useSyncExternalStore } from 'react';

/* ------------------------------------------------------------------ */
/* Tiny external store, so UI state can be shared without a provider    */
/* ------------------------------------------------------------------ */

export function createStore(initial) {
  let value = initial;
  const listeners = new Set();

  return {
    get: () => value,
    set: (next) => {
      if (Object.is(next, value)) return;
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export function useStore(store) {
  return useSyncExternalStore(store.subscribe, store.get);
}

/* ------------------------------------------------------------------ */
/* App state                                                            */
/* ------------------------------------------------------------------ */

/** Command palette open/closed. */
export const paletteStore = createStore(false);

/** Slug of the project whose case-study drawer is open, or null. */
export const drawerStore = createStore(null);

/** UI sound on/off. Off by default; persisted in localStorage. */
export const soundStore = createStore(false);

export function setSound(on) {
  soundStore.set(on);
  try {
    localStorage.setItem('sound', on ? 'on' : 'off');
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
}

/* ------------------------------------------------------------------ */
/* Theme: the source of truth is the data-theme attribute on <html>     */
/* ------------------------------------------------------------------ */

const themeListeners = new Set();

function readTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function subscribeTheme(listener) {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // See setSound.
  }
  themeListeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(readTheme() === 'dark' ? 'light' : 'dark');
}

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, readTheme);
}

/* ------------------------------------------------------------------ */
/* Environment hooks                                                    */
/* ------------------------------------------------------------------ */

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (listener) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** True on devices with a mouse or trackpad. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

const noopSubscribe = () => () => {};

/** Reads a value from the browser that never changes during the visit. */
export function useClientValue(read) {
  return useSyncExternalStore(noopSubscribe, read);
}

function detectLowPower() {
  const nav = navigator;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;

  if (nav.connection?.saveData) return true;
  if (memory <= 2) return true;
  return coarse && (cores <= 4 || memory <= 4);
}

/** True for phones/tablets with few cores or little memory, or when Data Saver is on. */
export const useLowPower = () => useClientValue(detectLowPower);

/** True once the page has been scrolled past the threshold (in px). */
export function useScrolled(threshold = 24) {
  const subscribe = useCallback((listener) => {
    window.addEventListener('scroll', listener, { passive: true });
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return useSyncExternalStore(subscribe, () => window.scrollY > threshold);
}

/* ------------------------------------------------------------------ */
/* Clock for the status widget                                          */
/* ------------------------------------------------------------------ */

function subscribeClock(listener) {
  const id = window.setInterval(listener, 10_000);
  return () => window.clearInterval(id);
}

/** Current time in the given IANA time zone as "HH:MM". */
export function useZonedTime(timeZone) {
  const read = useCallback(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date()),
    [timeZone],
  );

  return useSyncExternalStore(subscribeClock, read);
}

