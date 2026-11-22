import { playTone } from './sound';
import { drawerStore } from './stores';

/** The element that opened the drawer, so focus can go back to it on close. */
let opener = null;

/** Opens the case-study drawer for a project. */
export function openProject(slug) {
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  playTone('open');
  drawerStore.set(slug);
}

/** Puts focus back on whatever opened the drawer, if it is still on the page. */
export function focusDrawerOpener() {
  if (opener?.isConnected) opener.focus({ preventScroll: true });
}
