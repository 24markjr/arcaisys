/** Light/dark theme: shared between the pre-paint script and the toggle. */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "arcaisys-theme";

/**
 * Runs in <head> before first paint. Every visit opens in the light theme (owner
 * decision, 2026-10-15): the device's dark setting is ignored, and the toggle's
 * choice lasts only for the current visit (sessionStorage — kept across reloads
 * and page changes in that tab, gone on the next visit). Any choice saved by an
 * earlier version of the site in localStorage is cleared.
 */
export const themeBootstrap = `(function(){try{var s=null;try{localStorage.removeItem('${THEME_STORAGE_KEY}')}catch(e){}try{s=sessionStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}document.documentElement.dataset.theme=s==='dark'?'dark':'light'}catch(e){}})();`;
