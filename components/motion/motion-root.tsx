"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { duration, ease } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

/** True after the first page has played its entrance; later navigations skip the header intro. */
let hasEntered = false;

/**
 * The site's single motion controller, rendered once inside every page (via
 * <PageTransition>), never in the layout: its effects must run only after the
 * page's own HTML has hydrated, or GSAP's DOM changes would cause hydration
 * mismatches on streamed pages.
 *
 * Server Components opt in with data attributes (see lib/motion.ts), so pages
 * stay server-rendered and no element is animated by two systems. Everything is
 * reverted when the page unmounts or is hidden. With prefers-reduced-motion,
 * nothing moves and content is shown immediately.
 *
 * Before hydration, an inline script (see app/layout.tsx) adds `motion-pending`
 * to <html> so revealable content doesn't flash in its final state first.
 */
export function MotionRoot() {
  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 768px)",
        },
        (context) => {
          const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;

          const firstLoad = !hasEntered;
          hasEntered = true;
          const intro = gsap.timeline({ defaults: { ease: ease.out } });

          // 1. The header and each page's opening content animate in CSS ([data-intro]).

          // 2. Headlines: masked line reveals. Above the fold they join the intro
          //    timeline; below it they wait for the scroll position.
          gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((el) => {
            const inView = el.getBoundingClientRect().top < window.innerHeight;
            let played = false;
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              // Keep the real text in place for assistive tech; "auto" would put
              // aria-label on elements like <p>, where it is not allowed.
              aria: "none",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { opacity: 1 });
                // autoSplit re-splits on resize and font load; only the first split animates.
                if (played) return;
                played = true;
                const tween = gsap.from(self.lines, {
                  yPercent: 110,
                  duration: duration.slow,
                  stagger: 0.09,
                  ease: ease.out,
                  paused: inView,
                  scrollTrigger: inView ? undefined : { trigger: el, start: "top 88%", once: true },
                });
                if (inView) intro.add(tween.play(), firstLoad ? 0.15 : 0);
                return tween;
              },
            });
          });

          // 3. Blocks: fade + rise, batched so neighbours stagger naturally.
          const blocks = gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .flatMap((el) =>
              el.dataset.reveal === "stagger" ? (Array.from(el.children) as HTMLElement[]) : [el],
            );
          // Opacity, never visibility: hidden elements can't receive keyboard focus, and a
          // focused element scrolls into view, which triggers its reveal.
          gsap.set(blocks, { opacity: 0, y: 24 });
          ScrollTrigger.batch(blocks, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: duration.slow,
                ease: ease.out,
                stagger: 0.08,
                delay: firstLoad ? 0.35 : 0.1,
              }),
          });
          // Keyboard focus must never land on a still-transparent element (WCAG 2.4.7):
          // reveal a block immediately when focus enters it.
          const blockSet = new Set<Element>(blocks);
          const revealOnFocus = (event: FocusEvent) => {
            for (let el = event.target as Element | null; el; el = el.parentElement) {
              if (blockSet.has(el)) {
                gsap.to(el, { opacity: 1, y: 0, duration: 0.15, overwrite: true });
                return;
              }
            }
          };
          document.addEventListener("focusin", revealOnFocus);

          // 4. Signature graphic: construction lines draw, ribbon sweeps, chevron settles.
          gsap.utils.toArray<SVGSVGElement>("[data-ascent]").forEach((svg) => {
            const q = gsap.utils.selector(svg);
            gsap.set(svg, { opacity: 1 });
            const tl = gsap.timeline({ defaults: { ease: ease.inOut }, delay: firstLoad ? 0.25 : 0 });
            tl.from(q("[data-draw]"), { drawSVG: 0, duration: 1.2, stagger: 0.12 }, 0)
              .from(q("[data-fade]"), { autoAlpha: 0, duration: duration.slow }, 0.4)
              .fromTo(
                q("[data-ribbon]"),
                { clipPath: "inset(0% 100% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
                0.35,
              )
              .from(
                q("[data-chevron]"),
                {
                  autoAlpha: 0,
                  scale: 0.4,
                  rotate: -25,
                  transformOrigin: "50% 50%",
                  duration: 0.6,
                  ease: "back.out(2)",
                },
                1.35,
              );

            // Gentle drift as the hero scrolls away (wide screens only).
            if (wide) {
              gsap.to(svg, {
                yPercent: -8,
                ease: "none",
                scrollTrigger: { trigger: svg, start: "top top+=80", end: "bottom top", scrub: true },
              });
            }
          });

          // 5. Ribbon sweeps in when the closing panel arrives.
          gsap.utils.toArray<Element>("[data-sweep]").forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: "inset(0% 100% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.6,
                ease: ease.inOut,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              },
            );
          });

          // 6. Parallax on product imagery (wide screens only).
          if (wide) {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
              const speed = Number(el.dataset.parallax) || 0.1;
              gsap.fromTo(
                el,
                { yPercent: speed * 50 },
                {
                  yPercent: -speed * 50,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
            });
          }

          return () => document.removeEventListener("focusin", revealOnFocus);
        },
      );

      root.classList.remove("motion-pending");
      // Layout can shift once web fonts arrive; recompute trigger positions.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { dependencies: [] },
  );

  return null;
}
