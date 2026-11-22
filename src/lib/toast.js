import { createStore } from './stores';

/** The message currently shown by <Toaster />, or null. */
export const toastStore = createStore(null);

let timer;

/** Shows a short confirmation at the bottom of the screen. */
export function notify(message, duration = 2400) {
  window.clearTimeout(timer);
  toastStore.set(message);
  timer = window.setTimeout(() => toastStore.set(null), duration);
}

/** Copies text and confirms it, or says so honestly when the browser refuses. */
export async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    notify(`${label} copied`);
    return true;
  } catch {
    notify(`Could not copy. ${label}: ${text}`, 6000);
    return false;
  }
}
