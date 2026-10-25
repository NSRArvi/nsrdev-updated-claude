"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { sceneState } from "./three/sceneState";

gsap.registerPlugin(ScrollTrigger);

const ROTATING_PHRASES = [
  "whole app.",
  "next brand.",
  "live site.",
  "bold vision.",
  "real thing.",
];

export default function IdeaHero() {
  const root = useRef<HTMLElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Rotating text timer every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    sceneState.visibility = 1;
    sceneState.morph = 0;
    sceneState.offsetX = 2.4;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".h-word", { yPercent: 110, rotate: 4, stagger: 0.08, duration: 1.3 })
        .from(".h-sub", { y: 24, opacity: 0, duration: 1 }, "-=0.9")
        .from(".h-meta", { opacity: 0, y: 10, stagger: 0.1, duration: 0.8 }, "-=0.6");

      // Parallax scroll-out + slide 3D particle sphere from right to center
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".h-l1", { yPercent: -80, ease: "none", scrollTrigger: st });
      gsap.to(".h-l2", { yPercent: -50, ease: "none", scrollTrigger: st });
      gsap.to(".h-l3", { yPercent: -25, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".h-fade", { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
      gsap.fromTo(sceneState, { offsetX: 2.4 }, { offsetX: 0, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative z-10 flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-4 pt-24 pb-6 sm:px-6 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12"
    >
      {/* Main Hero Content: bottom-weighted on mobile so the 3D particle core shines in the upper space, centered on desktop */}
      <div className="relative mx-auto mt-auto mb-6 grid w-full max-w-7xl items-center gap-6 sm:my-auto lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div className="h-fade max-w-2xl lg:max-w-none">
          <h1 className="font-display text-[clamp(2.35rem,11vw,3.5rem)] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-bold leading-[0.98] tracking-[-0.035em]">
            {/* Line 1: Solid Fill */}
            <span className="h-l1 block overflow-hidden pb-1">
              <span className="h-word inline-block text-paper">Got an idea?</span>
            </span>

            {/* Line 2: Outline */}
            <span className="h-l2 block overflow-hidden pb-1">
              <span className="h-word inline-block text-outline">We build the</span>
            </span>

            {/* Line 3: Gradient with smooth 3-second rotating words */}
            <span className="h-l3 relative block overflow-hidden whitespace-nowrap pb-1">
              <span
                key={phraseIndex}
                className="h-word inline-block whitespace-nowrap text-volt-gradient transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-6"
              >
                {ROTATING_PHRASES[phraseIndex]}
              </span>
            </span>
          </h1>

          <p className="h-sub mt-4 sm:mt-6 max-w-lg text-sm leading-relaxed text-mist sm:text-base lg:text-lg">
            NSRDEV is a full-cycle digital studio. Brand identity, UI/UX, engineering and growth marketing — one team, from first sketch to launch day.
          </p>
        </div>

        {/* Right column reserved for the 3D particle sphere on desktop */}
        <div className="hidden min-h-[420px] lg:block" />
      </div>

      {/* Hero Bottom Meta Bar */}
      <div className="h-fade mx-auto flex w-full max-w-7xl items-center justify-between border-t border-line/40 pt-3 sm:border-none sm:pt-4 text-[10px] uppercase tracking-[0.2em] text-mist sm:text-[11px] sm:tracking-[0.25em]">
        <span className="h-meta hidden sm:block">Dhaka · Working worldwide</span>
        <a href="#journey" className="h-meta flex items-center gap-1.5 sm:gap-2 hover:text-paper">
          Scroll to explore <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
        <span className="h-meta text-volt/80 sm:text-mist">Open for new projects</span>
      </div>
    </section>
  );
}
