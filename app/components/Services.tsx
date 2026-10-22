"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Code2, Megaphone, Palette, PenTool } from "lucide-react";
import ServiceParticle, { type ServiceShapeKey } from "./particles/ServiceParticle";

interface ServiceItem {
  n: string;
  shapeKey: ServiceShapeKey;
  icon: typeof Palette;
  title: string;
  tagline: string;
  copy: string;
  deliverables: string[];
  tags: string[];
  color: string;
  accentBadge: string;
  glow: string;
  cardBg: string;
  primaryVar: "ion" | "ember" | "volt" | "aqua";
  secondaryVar: "ion" | "ember" | "volt" | "aqua";
}

const SERVICES: ServiceItem[] = [
  {
    n: "01",
    shapeKey: "brand",
    icon: Palette,
    title: "Brand Identity",
    tagline: "Strategic positioning & iconic visual systems",
    copy: "We craft unmistakable brand marks, typography hierarchies, colour token systems, and complete brand guidelines that give your product an authoritative voice in the market.",
    deliverables: [
      "Custom Logo Suite & Scalable Vectors",
      "Typography System & Custom Pairing",
      "Design Token System & Color Palette",
      "Comprehensive Brand Guidelines",
    ],
    tags: ["Logo System", "Typography", "Color Tokens", "Brand Book"],
    color: "text-volt",
    accentBadge: "border-volt/30 bg-volt/10 text-volt",
    glow: "bg-volt/20",
    cardBg: "from-[#191428] via-[#120d22] to-[#0b0813]",
    primaryVar: "volt",
    secondaryVar: "ember",
  },
  {
    n: "02",
    shapeKey: "uiux",
    icon: PenTool,
    title: "UI / UX Design",
    tagline: "Frictionless journeys & high-converting interfaces",
    copy: "From user research and interactive wireframes to multi-device Figma design systems and clickable prototypes — designed with obsessive craft before writing a single line of code.",
    deliverables: [
      "User Journey & Frictionless Flow Mapping",
      "Low-to-High Fidelity Wireframes",
      "Multi-Device Design System in Figma",
      "Interactive 60fps Clickable Prototypes",
    ],
    tags: ["Figma Systems", "Wireframing", "Mobile & Web", "Prototypes"],
    color: "text-ion",
    accentBadge: "border-ion/30 bg-ion/10 text-ion",
    glow: "bg-ion/25",
    cardBg: "from-[#1b1532] via-[#130d25] to-[#0b0813]",
    primaryVar: "ion",
    secondaryVar: "aqua",
  },
  {
    n: "03",
    shapeKey: "development",
    icon: Code2,
    title: "Development",
    tagline: "Production-grade engineering, 3D & mobile",
    copy: "We engineer pixel-perfect, lightning-fast digital products using Next.js, React Native, Flutter, Three.js WebGL, and scalable cloud microservice backends built for global scale.",
    deliverables: [
      "Next.js Full-Stack Web Applications",
      "Cross-Platform iOS & Android Apps",
      "Interactive Three.js & WebGL Visuals",
      "REST & GraphQL API Integrations",
    ],
    tags: ["Next.js 16", "Flutter", "Three.js WebGL", "Cloud Architecture"],
    color: "text-aqua",
    accentBadge: "border-aqua/30 bg-aqua/10 text-aqua",
    glow: "bg-aqua/20",
    cardBg: "from-[#111e30] via-[#0d1624] to-[#0b0813]",
    primaryVar: "aqua",
    secondaryVar: "volt",
  },
  {
    n: "04",
    shapeKey: "marketing",
    icon: Megaphone,
    title: "SEO & Marketing",
    tagline: "Search domination & exponential scale",
    copy: "Technical SEO audits, Core Web Vitals optimization, programmatic content strategies, and high-impact acquisition funnels that convert visitors into lifetime customers.",
    deliverables: [
      "Technical SEO Architecture & Audit",
      "100/100 Google Lighthouse Tuning",
      "Automated Analytics & Conversion Tracking",
      "Search Acquisition & Growth Strategy",
    ],
    tags: ["Technical SEO", "Lighthouse 100", "Analytics", "Acquisition"],
    color: "text-ember",
    accentBadge: "border-ember/30 bg-ember/10 text-ember",
    glow: "bg-ember/20",
    cardBg: "from-[#261226] via-[#1a0c1a] to-[#0b0813]",
    primaryVar: "ember",
    secondaryVar: "volt",
  },
];

interface ServiceCardProps {
  service: ServiceItem;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isDesktop: boolean;
}

function ServiceCard({
  service: s,
  i,
  progress,
  range,
  targetScale,
  isDesktop,
}: ServiceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-16 sm:top-20 lg:top-0 flex lg:h-screen items-center justify-center px-4 sm:px-6 mb-6 sm:mb-8 lg:mb-0"
    >
      <motion.article
        style={{
          scale,
          top: isDesktop
            ? `calc(1.5vh + ${i * 24}px)`
            : `${i * 14}px`,
        }}
        className={`relative w-full max-w-7xl origin-top overflow-hidden rounded-3xl border border-line/90 bg-gradient-to-br ${s.cardBg} p-4 sm:p-7 lg:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.92)] backdrop-blur-3xl transition-colors duration-300 hover:border-white/25`}
      >
        {/* Radial ambient glow in corner */}
        <div
          className={`pointer-events-none absolute -right-28 -top-28 h-72 w-72 sm:h-96 sm:w-96 rounded-full blur-3xl transition-opacity duration-700 ${s.glow} opacity-40`}
        />

        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* Left Column: Discipline Details & Deliverables */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Header: Discipline indicator & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl border border-line bg-ink/80 ${s.color} shadow-inner`}
                  >
                    <s.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] sm:text-xs font-semibold ${s.accentBadge}`}
                  >
                    Discipline {s.n}
                  </span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-mist/25 lg:text-4xl">
                  {s.n}
                </span>
              </div>

              <h3 className="mt-4 sm:mt-6 font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl lg:text-4xl">
                {s.title}
              </h3>
              <p className={`mt-1 text-xs sm:text-sm font-medium ${s.color}`}>
                {s.tagline}
              </p>
              <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-mist sm:text-sm lg:text-base">
                {s.copy}
              </p>

              {/* What We Deliver List */}
              <div className="mt-4 sm:mt-6 border-t border-line/60 pt-3.5 sm:pt-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-paper/90 sm:text-xs">
                  Key Capabilities & Deliverables
                </p>
                <ul className="mt-2 grid gap-1.5 sm:gap-2 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-xs text-paper/85"
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          s.color === "text-volt"
                            ? "bg-volt"
                            : s.color === "text-ion"
                            ? "bg-ion"
                            : s.color === "text-aqua"
                            ? "bg-aqua"
                            : "bg-ember"
                        }`}
                      />
                      <span className="truncate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Tag Pills & CTA */}
            <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-2 border-t border-line/50 pt-4 sm:pt-5">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line/70 bg-ink/60 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs text-paper/80"
                >
                  {t}
                </span>
              ))}
              <a
                href="#contact"
                className={`ml-auto flex items-center gap-1.5 text-xs font-semibold ${s.color} transition-transform duration-300 hover:translate-x-1 sm:text-sm`}
              >
                Inquire service <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Particle Sculpture (Reused from ProcessJourney) */}
          <div className="relative flex h-[200px] sm:h-[280px] lg:h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl border border-line/60 bg-ink/85">
            {/* Subtle inner grid lines */}
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

            {/* Reused 3D particle component */}
            <div className="relative h-full w-full">
              <ServiceParticle
                shape={s.shapeKey}
                primaryVar={s.primaryVar}
                secondaryVar={s.secondaryVar}
              />
            </div>

            {/* Corner indicator badge */}
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line/80 bg-ink/90 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-mist backdrop-blur-md">
              Interactive 3D Core
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="relative z-10 bg-ink">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-ion/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-ember/10 blur-[150px]"
        />
      </div>

      {/* Section Header */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-12 lg:pt-36">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-volt">What we do</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-[0.95] tracking-tight sm:mt-4 sm:text-5xl lg:text-7xl">
              Four disciplines. <span className="text-outline">One team.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs text-mist sm:text-sm lg:text-base">
            Hire us for one piece or the whole journey. Every discipline shares the same strategy, so nothing gets lost in hand-offs.
          </p>
        </div>
      </div>

      {/* Stacking Cards Container: Sticky on Desktop, Smooth Vertical Flow on Mobile/Tablet */}
      <div ref={container} className="relative pb-16 lg:pb-0">
        {SERVICES.map((service, i) => {
          const targetScale = 1 - (SERVICES.length - i) * 0.05;
          return (
            <ServiceCard
              key={service.n}
              service={service}
              i={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              isDesktop={isDesktop}
            />
          );
        })}
      </div>
    </section>
  );
}
