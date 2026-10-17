"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";
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
  <div className="space-y-2 sm:space-y-2.5">
    {["Market & competitor research", "User personas", "Feature scope & roadmap", "Timeline & budget"].map((t, i) => (
      <div key={t} className="flex items-center gap-2.5 rounded-xl bg-paper/5 px-3 py-2 sm:px-4 sm:py-2.5">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ion/20 text-[10px] text-volt">{i + 1}</span>
        <span className="truncate text-xs text-paper/80 sm:text-sm">{t}</span>
        <span className="ml-auto h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-paper/10 sm:w-16">
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
  <div className="space-y-3 sm:space-y-3.5">
    {/* Logo Suite & Typography Specimen Card */}
    <div className="flex items-center gap-3.5 rounded-xl border border-line bg-paper/5 p-3 sm:gap-4 sm:p-3.5">
      {/* Brand Logo & Geometric Grid Emblem */}
      <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-volt/40 bg-gradient-to-br from-ion/30 via-surface to-ember/20 shadow-sm sm:h-14 sm:w-14">
        <svg viewBox="0 0 40 40" className="h-7 w-7 text-paper">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-40" />
          <path d="M12 28L20 12L28 28" fill="none" stroke="var(--color-volt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 23H25" stroke="var(--color-ember)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
            Aa
          </p>
          <span className="font-mono text-[10px] text-volt">Logo & Type</span>
        </div>
        <p className="truncate text-[11px] text-mist sm:text-xs">
          Space Grotesk · Inter · Primary & Secondary Marks
        </p>
      </div>
    </div>

    {/* Color Palette Swatches with Hex Codes */}
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
      {SWATCH_TOKENS.map((s) => (
        <div key={s.label} className="group">
          <div
            className="h-8 rounded-lg ring-1 ring-line transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-volt/50 sm:h-10"
            style={{ background: s.cssVar }}
          />
          <p className="mt-1 truncate text-[9px] font-medium uppercase text-mist sm:text-[10px]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const UIVisual = () => (
  <div className="relative h-36 overflow-hidden rounded-xl bg-ink/70 ring-1 ring-line sm:h-40">
    <div className="flex items-center gap-1.5 border-b border-line px-3 py-1.5 sm:py-2">
      {["bg-ember", "bg-volt", "bg-aqua"].map((c) => <span key={c} className={`h-2 w-2 rounded-full ${c}`} />)}
    </div>
    <div className="ui-swap grid grid-cols-3 gap-2 p-2.5 sm:p-3">
      <div className="col-span-3 h-6 rounded-md ui-block sm:h-7" />
      <div className="col-span-2 h-16 rounded-md ui-block sm:h-20" />
      <div className="h-16 rounded-md ui-block sm:h-20" />
    </div>
    <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-widest text-volt sm:text-[10px]">wireframe</span>
  </div>
);

const DevVisual = () => (
  <div className="rounded-xl bg-ink/70 p-3 font-mono text-[11px] leading-5 ring-1 ring-line sm:p-4 sm:text-[12px] sm:leading-6">
    <p><span className="text-ember">const</span> <span className="text-aqua">product</span> = <span className="text-volt">build</span>({"{"}</p>
    <p className="pl-3 text-paper/80 sm:pl-4">design: <span className="text-volt">&apos;pixel-perfect&apos;</span>,</p>
    <p className="pl-3 text-paper/80 sm:pl-4">motion: <span className="text-volt">&apos;60fps&apos;</span>,</p>
    <p className="pl-3 text-paper/80 sm:pl-4">platforms: [<span className="text-volt">&apos;web&apos;</span>, <span className="text-volt">&apos;mobile&apos;</span>]</p>
    <p>{"}"});<span className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-ember" /></p>
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {["Next.js", "React Native", "Flutter", "Three.js", "GSAP", "Node"].map((t) => (
        <span key={t} className="rounded-full border border-volt/30 bg-ion/15 px-2 py-0.5 text-[9px] text-volt sm:text-[10px]">{t}</span>
      ))}
    </div>
  </div>
);

const GrowVisual = () => (
  <div className="grid grid-cols-2 gap-2 sm:gap-3">
    {[
      ["100", "Lighthouse"],
      ["+240%", "Organic traffic"],
      ["0.6s", "Load time"],
      ["Top 3", "Google ranking"],
    ].map(([v, l]) => (
      <div key={l} className="rounded-xl bg-paper/5 p-3 ring-1 ring-line sm:p-4">
        <p className="text-xl font-bold text-volt sm:text-2xl">{v}</p>
        <p className="text-[11px] text-mist sm:text-xs">{l}</p>
      </div>
    ))}
  </div>
);

const LaunchVisual = () => (
  <div className="space-y-3 sm:space-y-4">
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ion/40 via-surface to-ember/25 p-4 ring-1 ring-line sm:p-5">
      <p className="text-[11px] uppercase tracking-widest text-volt sm:text-xs">Live · v1.0</p>
      <p className="mt-1 text-lg font-semibold text-paper sm:text-xl">Your product, in the market.</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] text-paper/80 sm:text-[11px]">
        <span className="rounded-full bg-paper/10 px-2 py-0.5">Brand ✓</span>
        <span className="rounded-full bg-paper/10 px-2 py-0.5">App ✓</span>
        <span className="rounded-full bg-paper/10 px-2 py-0.5">Growth ✓</span>
      </div>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ember/25 blur-2xl" />
    </div>
    <a href="#contact" className="bg-brand-gradient group flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02] sm:px-5 sm:py-4 sm:text-base">
      Start your build <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    tag: "04 · SEO & Marketing",
    title: "We make the world notice.",
    copy: "Technical SEO, performance tuning, content and campaigns that turn visitors into customers.",
    gets: ["SEO setup & audit", "Analytics dashboards", "Growth campaigns"],
    accent: "from-volt to-ember",
    visual: <GrowVisual />,
  },
  {
    tag: "05 · Launch",
    title: "Your idea — now a real product.",
    copy: "One team, one journey. From a thought in your head to a brand and product people love.",
    gets: ["Launched product", "Ongoing support", "A partner for scale"],
    accent: "from-ion to-ember",
    visual: <LaunchVisual />,
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
    <section ref={root} id="journey" className="relative z-10">
      <div className="journey-stage relative flex h-[100svh] w-full flex-col justify-between overflow-hidden px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-8">
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-6">
          {/* Left: story text */}
          <div className="relative min-h-[145px] sm:min-h-[180px] lg:min-h-[320px]">
            {STEPS.map((s, i) => (
              <div
                key={s.tag}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                  i === active
                    ? "opacity-100 translate-y-0 blur-0"
                    : i < active
                    ? "opacity-0 -translate-y-8 blur-sm pointer-events-none"
                    : "opacity-0 translate-y-8 blur-sm pointer-events-none"
                }`}
              >
                <p className={`bg-gradient-to-r ${s.accent} bg-clip-text text-xs font-semibold uppercase tracking-[0.25em] text-transparent sm:text-sm sm:tracking-[0.3em]`}>
                  {s.tag}
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold leading-tight text-paper sm:mt-3 sm:text-4xl lg:text-5xl">
                  {s.title}
                </h2>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-paper/80 sm:mt-4 sm:text-base">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Center: reserved for the 3D morph (canvas sits behind) */}
          <div className="hidden lg:block" />

          {/* Right: what the client receives */}
          <div className="relative min-h-[290px] sm:min-h-[340px] lg:min-h-[400px]">
            {STEPS.map((s, i) => (
              <div
                key={s.tag}
                className={`glass absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-2xl p-4 sm:rounded-3xl sm:p-6 transition-all duration-700 ease-out ${
                  i === active
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-8 rotate-2 pointer-events-none"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-mist sm:text-xs sm:tracking-[0.25em]">
                  What you get
                </p>
                <ul className="mt-2 mb-3 flex flex-wrap gap-x-4 gap-y-1 sm:mt-3 sm:mb-4 sm:block sm:space-y-1.5">
                  {s.gets.map((g) => (
                    <li key={g} className="flex items-center gap-1.5 text-xs text-paper sm:gap-2 sm:text-sm">
                      <Check className="h-3.5 w-3.5 shrink-0 text-ember sm:h-4 sm:w-4" /> {g}
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
          <div className="flex justify-between text-[9px] uppercase tracking-[0.16em] text-mist sm:text-[10px] sm:tracking-[0.2em]">
            {["Idea", "Brand", "UI/UX", "Build", "Grow", "Launch"].map((l, i) => (
              <span key={l} className={`transition-colors ${i <= active ? "text-paper font-semibold" : ""}`}>
                {l}
              </span>
            ))}
          </div>
          <div className="mt-2 h-px w-full bg-paper/10">
            <div className="journey-bar h-px origin-left scale-x-0 bg-gradient-to-r from-ion via-ember to-aqua" />
          </div>
        </div>
      </div>
    </section>
  );
}
