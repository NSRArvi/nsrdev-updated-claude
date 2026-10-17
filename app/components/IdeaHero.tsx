"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { sceneState } from "./three/sceneState";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { text: "Got an idea?", cls: "text-paper" },
  { text: "We build the", cls: "text-outline" },
  { text: "world around it.", cls: "text-volt-gradient" },
];

export default function IdeaHero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    sceneState.offsetX = 2.4;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".h-word", { yPercent: 110, rotate: 4, stagger: 0.08, duration: 1.3 })
        .from(".h-sub", { y: 24, opacity: 0, duration: 1 }, "-=0.9")
        .from(".h-meta", { opacity: 0, y: 10, stagger: 0.1, duration: 0.8 }, "-=0.6");

      // Layered parallax on scroll-out + smoothly slide 3D particle sphere from right (2.4) to center (0)
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
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div className="h-fade">
          <h1 className="font-display text-[12.5vw] font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[6.2rem]">
            {LINES.map((l, i) => (
              <span key={i} className={`h-l${i + 1} block overflow-hidden pb-1`}>
                <span className={`h-word inline-block ${l.cls}`}>{l.text}</span>
              </span>
            ))}
          </h1>

          <p className="h-sub mt-6 max-w-lg text-base leading-relaxed text-mist sm:mt-8 sm:text-lg">
            NSRDEV is a full-cycle digital studio. Brand identity, UI/UX, engineering and growth marketing — one team, from first sketch to launch day.
          </p>
        </div>

        {/* Right column reserved for the 3D particle sphere */}
        <div className="hidden min-h-[420px] lg:block" />
      </div>

      <div className="h-fade absolute inset-x-0 bottom-5 mx-auto flex max-w-7xl items-center justify-between px-4 text-[10px] uppercase tracking-[0.22em] text-mist sm:bottom-6 sm:px-6 sm:text-[11px] sm:tracking-[0.25em]">
        <span className="h-meta hidden sm:block">Dhaka · Working worldwide</span>
        <a href="#journey" className="h-meta mx-auto flex items-center gap-2 hover:text-paper sm:mx-0">
          Scroll to explore <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
        <span className="h-meta hidden sm:block">Open for new projects</span>
      </div>
    </section>
  );
}
