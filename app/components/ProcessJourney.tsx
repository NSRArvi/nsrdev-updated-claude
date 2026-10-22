"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { sceneState } from "./three/sceneState";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  tag: string;
  title: string;
  copy: string;
  gets: string[];
  accent: string;
  visual: React.ReactNode;
};

/* ---------- Deliverable visuals (100% driven by globals.css variables) ---------- */

const DiscoveryVisual = () => (
  <div className="space-y-1.5 sm:space-y-2">
    {["Market & competitor research", "User personas", "Feature scope & roadmap", "Timeline & budget"].map((t, i) => (
      <div key={t} className="flex items-center gap-2 rounded-lg bg-paper/5 px-2.5 py-1.5 sm:px-3 sm:py-2">
        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ion/20 text-[9px] text-volt">{i + 1}</span>
        <span className="truncate text-[11px] text-paper/80 sm:text-xs">{t}</span>
        <span className="ml-auto h-1 w-10 shrink-0 overflow-hidden rounded-full bg-paper/10 sm:w-14">
          <span className="bg-brand-gradient block h-full rounded-full" style={{ width: `${100 - i * 18}%` }} />
        </span>
      </div>
    ))}
  </div>
);

const SWATCH_TOKENS = [
  { cssVar: "var(--color-ink)", label: "Ink" },
  { cssVar: "var(--color-ion)", label: "Primary" },
  { cssVar: "var(--color-ember)", label: "Secondary" },
  { cssVar: "var(--color-aqua)", label: "Accent" },
  { cssVar: "var(--color-paper)", label: "Paper" },
];

const BrandVisual = () => (
  <div className="space-y-2.5 sm:space-y-3">
    {/* Logo Suite & Typography Specimen Card */}
    <div className="flex items-center gap-3 rounded-xl border border-line bg-paper/5 p-2.5 sm:p-3">
      {/* Brand Logo & Geometric Grid Emblem */}
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-volt/40 bg-gradient-to-br from-ion/30 via-surface to-ember/20 sm:h-12 sm:w-12">
        <svg viewBox="0 0 40 40" className="h-5 w-5 sm:h-6 sm:w-6 text-paper">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-40" />
          <path d="M12 28L20 12L28 28" fill="none" stroke="var(--color-volt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 23H25" stroke="var(--color-ember)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-xl font-bold tracking-tight text-paper sm:text-2xl">
            Aa
          </p>
          <span className="font-mono text-[9px] text-volt sm:text-[10px]">Logo & Type</span>
        </div>
        <p className="truncate text-[10px] text-mist sm:text-xs">
          Space Grotesk · Inter · Brand Marks
        </p>
      </div>
    </div>

    {/* Color Palette Swatches with Hex Codes */}
    <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
      {SWATCH_TOKENS.map((s) => (
        <div key={s.label} className="group">
          <div
            className="h-6 sm:h-8 rounded-md ring-1 ring-line transition-all duration-300 group-hover:-translate-y-0.5 group-hover:ring-volt/50"
            style={{ background: s.cssVar }}
          />
          <p className="mt-1 truncate text-[8px] font-medium uppercase text-mist sm:text-[9px]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const UIVisual = () => (
  <div className="relative h-28 sm:h-36 overflow-hidden rounded-xl bg-ink/70 ring-1 ring-line">
    <div className="flex items-center gap-1.5 border-b border-line px-3 py-1.5">
      {["bg-ember", "bg-volt", "bg-aqua"].map((c) => <span key={c} className={`h-1.5 w-1.5 rounded-full ${c}`} />)}
    </div>
    <div className="ui-swap grid grid-cols-3 gap-1.5 p-2 sm:p-2.5">
      <div className="col-span-3 h-5 rounded-md ui-block sm:h-6" />
      <div className="col-span-2 h-12 rounded-md ui-block sm:h-16" />
      <div className="h-12 rounded-md ui-block sm:h-16" />
    </div>
    <span className="absolute bottom-1.5 right-2.5 text-[8px] sm:text-[9px] uppercase tracking-widest text-volt">wireframe → hi-fi</span>
  </div>
);

const DevVisual = () => (
  <div className="rounded-xl bg-ink/70 p-2.5 sm:p-3.5 font-mono text-[10px] leading-4 ring-1 ring-line sm:text-[11px] sm:leading-5">
    <p><span className="text-ember">const</span> <span className="text-aqua">product</span> = <span className="text-volt">build</span>({"{"}</p>
    <p className="pl-2.5 text-paper/80 sm:pl-3">design: <span className="text-volt">&apos;pixel-perfect&apos;</span>,</p>
    <p className="pl-2.5 text-paper/80 sm:pl-3">platforms: [<span className="text-volt">&apos;web&apos;</span>, <span className="text-volt">&apos;mobile&apos;</span>]</p>
    <p>{"}"});<span className="caret ml-0.5 inline-block h-3 w-1 translate-y-0.5 bg-ember" /></p>
    <div className="mt-2 flex flex-wrap gap-1">
      {["Next.js", "React Native", "Flutter", "Three.js"].map((t) => (
        <span key={t} className="rounded-full border border-volt/30 bg-ion/15 px-2 py-0.5 text-[8px] sm:text-[9px] text-volt">{t}</span>
      ))}
    </div>
  </div>
);

const GrowVisual = () => (
  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
    {[
      ["100", "Lighthouse"],
      ["+240%", "Organic traffic"],
      ["0.6s", "Load time"],
      ["Top 3", "Google ranking"],
    ].map(([v, l]) => (
      <div key={l} className="rounded-xl bg-paper/5 p-2 sm:p-3 ring-1 ring-line">
        <p className="text-base sm:text-xl font-bold text-volt">{v}</p>
        <p className="text-[10px] text-mist">{l}</p>
      </div>
    ))}
  </div>
);

const LaunchVisual = () => (
  <div className="space-y-2 sm:space-y-3">
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ion/40 via-surface to-ember/25 p-3 sm:p-4 ring-1 ring-line">
      <p className="text-[10px] uppercase tracking-widest text-volt sm:text-xs">Live · v1.0</p>
      <p className="mt-0.5 text-sm sm:text-base font-semibold text-paper">Your product, in the market.</p>
      <div className="mt-2 flex flex-wrap gap-1 text-[9px] sm:text-[10px] text-paper/80">
        <span className="rounded-full bg-paper/10 px-2 py-0.5">Brand ✓</span>
        <span className="rounded-full bg-paper/10 px-2 py-0.5">App ✓</span>
        <span className="rounded-full bg-paper/10 px-2 py-0.5">Scale ✓</span>
      </div>
    </div>
    <a href="#contact" className="bg-brand-gradient group flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-paper transition-transform hover:scale-[1.02] sm:px-4 sm:py-2.5 sm:text-sm">
      Start your build <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
);

const STEPS: Step[] = [
  {
    tag: "00 · Discovery",
    title: "It starts with your idea.",
    copy: "We listen, research your market and shape the raw spark into a clear, buildable plan.",
    gets: ["Project roadmap", "Scope & estimate", "Strategy workshop"],
    accent: "from-volt to-ember",
    visual: <DiscoveryVisual />,
  },
  {
    tag: "01 · Brand Identity",
    title: "We give it a face and a voice.",
    copy: "Logo, typography, colour systems and a complete brand guideline your whole business can use.",
    gets: ["Logo suite", "Typography & colours", "Brand guideline PDF"],
    accent: "from-ember to-volt",
    visual: <BrandVisual />,
  },
  {
    tag: "02 · UI / UX Design",
    title: "We design how it feels.",
    copy: "User flows, wireframes and pixel-perfect interfaces for web and mobile — tested before a line of code.",
    gets: ["User flows & wireframes", "Hi-fi UI in Figma", "Clickable prototype"],
    accent: "from-ion to-aqua",
    visual: <UIVisual />,
  },
  {
    tag: "03 · Development",
    title: "We engineer it to life.",
    copy: "Scalable code, smooth animations and rich interactions — built to your exact requirements.",
    gets: ["Web / mobile app", "Animations & 3D", "Admin & integrations"],
    accent: "from-aqua to-volt",
    visual: <DevVisual />,
  },
  {
    tag: "04 · Launch",
    title: "Your idea — now a real product.",
    copy: "One team, one journey. From a thought in your head to a brand and live product in the market.",
    gets: ["Launched product", "App store / Web release", "Zero-downtime deployment"],
    accent: "from-ion to-ember",
    visual: <LaunchVisual />,
  },
  {
    tag: "05 · SEO & Marketing",
    title: "We make the world notice.",
    copy: "Technical SEO, performance tuning, content and campaigns that turn visitors into customers.",
    gets: ["SEO setup & audit", "Analytics dashboards", "Growth campaigns"],
    accent: "from-volt to-ember",
    visual: <GrowVisual />,
  },
];

export default function ProcessJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const last = STEPS.length - 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${window.innerHeight * last * 1.1}`,
        pin: ".journey-stage",
        scrub: true,
        onUpdate: (self) => {
          const m = self.progress * last;
          sceneState.morph = m;
          sceneState.offsetX = 0;
          const idx = Math.round(m);
          setActive((prev) => (prev === idx ? prev : idx));
          gsap.set(".journey-bar", { scaleX: self.progress });
        },
        onLeave: () => (sceneState.visibility = 0.12),
        onEnterBack: () => {
          sceneState.visibility = 1;
          sceneState.offsetX = 0;
        },
        onLeaveBack: () => {
          sceneState.morph = 0;
          sceneState.offsetX = 2.4;
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="journey" className="relative z-10 w-full">
      <div className="journey-stage relative flex h-[100svh] w-full flex-col justify-between overflow-hidden px-4 pt-20 pb-4 sm:px-6 sm:pt-24 sm:pb-6">
        {/* Main Grid: Top Story + Center 3D Window + Bottom Deliverable Card on mobile/tablet; 3 columns on desktop */}
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between py-1 lg:my-auto lg:grid lg:flex-none lg:grid-cols-[1fr_1.05fr_1fr] lg:items-center lg:gap-6 lg:py-0">
          {/* Top (Mobile) / Left (Desktop): Story text */}
          <div className="relative min-h-[105px] sm:min-h-[125px] lg:min-h-[320px]">
            {STEPS.map((s, i) => (
              <div
                key={s.tag}
                className={`absolute inset-0 flex flex-col justify-start lg:justify-center transition-all duration-700 ease-out ${
                  i === active
                    ? "opacity-100 translate-y-0 blur-0"
                    : i < active
                    ? "opacity-0 -translate-y-6 blur-sm pointer-events-none"
                    : "opacity-0 translate-y-6 blur-sm pointer-events-none"
                }`}
              >
                <div className="flex items-center justify-between lg:block">
                  <p className={`bg-gradient-to-r ${s.accent} bg-clip-text text-[11px] font-semibold uppercase tracking-[0.2em] text-transparent sm:text-xs sm:tracking-[0.25em]`}>
                    {s.tag}
                  </p>
                  <span className="rounded-full border border-line bg-ink/70 px-2 py-0.5 font-mono text-[9px] text-volt backdrop-blur-md lg:hidden">
                    0{i + 1} / 0{STEPS.length}
                  </span>
                </div>
                <h2 className="font-display mt-1 text-2xl font-bold leading-[1.08] tracking-tight text-paper sm:mt-2 sm:text-3xl lg:text-5xl">
                  {s.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 max-w-md text-xs leading-relaxed text-paper/80 sm:mt-2.5 sm:line-clamp-none sm:text-sm lg:text-base">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Center: Open viewport window so the 3D particle morph is clearly visible between text & card on mobile, and center column on desktop */}
          <div className="pointer-events-none my-auto min-h-[110px] flex-1 sm:min-h-[150px] lg:block lg:min-h-[360px]" />

          {/* Bottom (Mobile) / Right (Desktop): What the client receives */}
          <div className="relative min-h-[215px] sm:min-h-[245px] lg:min-h-[380px]">
            {STEPS.map((s, i) => (
              <div
                key={s.tag}
                className={`glass absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 rounded-2xl p-3.5 sm:p-5 lg:p-6 transition-all duration-700 ease-out ${
                  i === active
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-6 rotate-1 pointer-events-none"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-mist sm:text-[10px]">
                    What you get
                  </p>
                  <span className="font-mono text-[9px] text-volt">
                    Deliverables
                  </span>
                </div>
                <ul className="mb-2.5 flex flex-wrap gap-x-3 gap-y-1 sm:mb-3 sm:grid sm:grid-cols-3 lg:block lg:space-y-1">
                  {s.gets.map((g) => (
                    <li key={g} className="flex items-center gap-1.5 text-[11px] text-paper sm:text-xs lg:text-sm">
                      <Check className="h-3 w-3 shrink-0 text-ember sm:h-3.5 sm:w-3.5" />
                      <span className="truncate">{g}</span>
                    </li>
                  ))}
                </ul>
                {s.visual}
              </div>
            ))}
          </div>
        </div>

        {/* Progress HUD */}
        <div className="mx-auto w-full max-w-7xl pt-2">
          <div className="flex justify-between text-[9px] uppercase tracking-[0.14em] text-mist sm:text-[10px] sm:tracking-[0.2em]">
            {["Idea", "Brand", "UI/UX", "Build", "Launch", "Grow"].map((l, i) => (
              <span key={l} className={`transition-colors ${i <= active ? "text-paper font-semibold" : ""}`}>
                {l}
              </span>
            ))}
          </div>
          <div className="mt-1.5 h-px w-full bg-paper/10">
            <div className="journey-bar h-px origin-left scale-x-0 bg-gradient-to-r from-ion via-ember to-aqua" />
          </div>
        </div>
      </div>
    </section>
  );
}
