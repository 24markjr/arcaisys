/** Light/dark theme: shared between the pre-paint script and the toggle. */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "arcaisys-theme";

/**
 * Runs in <head> before first paint: applies the stored choice, otherwise the
 * system setting, so the page never flashes the wrong theme. Without JavaScript
 * the site stays light (the designed default).
 */
export const themeBootstrap = `(function(){try{var s=null;try{s=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}var t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}})();`;
