"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code2, Megaphone, Palette, PenTool } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: "01",
    icon: Palette,
    title: "Brand Identity",
    copy: "Strategy, naming, logo systems, typography, colour and a brand book your team can actually use.",
    tags: ["Logo", "Typography", "Colour", "Guidelines"],
    color: "text-ember",
    glow: "bg-ember/20",
    span: "md:col-span-6 lg:col-span-7",
  },
  {
    n: "02",
    icon: PenTool,
    title: "UI / UX Design",
    copy: "Research-led flows, wireframes and pixel-perfect interfaces for web & mobile.",
    tags: ["Research", "Wireframes", "Prototypes"],
    color: "text-volt",
    glow: "bg-ion/25",
    span: "md:col-span-6 lg:col-span-5",
  },
  {
    n: "03",
    icon: Code2,
    title: "Development",
    copy: "Fast, scalable web and mobile apps with rich motion, 3D and the integrations you need.",
    tags: ["Web", "iOS / Android", "Animation", "APIs"],
    color: "text-aqua",
    glow: "bg-aqua/20",
    span: "md:col-span-6 lg:col-span-5",
  },
  {
    n: "04",
    icon: Megaphone,
    title: "SEO & Marketing",
    copy: "Technical SEO, content, analytics and campaigns that turn launch day into lasting growth.",
    tags: ["SEO", "Content", "Ads", "Analytics"],
    color: "text-ember",
    glow: "bg-ember/20",
    span: "md:col-span-6 lg:col-span-7",
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-head > *", {
        y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".svc-head", start: "top 80%" },
      });
      gsap.from(".svc-card", {
        y: 80, opacity: 0, rotateX: -12, stagger: 0.12, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".svc-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const track = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} id="services" className="relative z-10 overflow-hidden bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      {/* Subtle brand ambient glow for section rhythm */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-ion/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-ember/10 blur-[150px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="svc-head flex flex-col justify-between gap-4 sm:gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-volt">What we do</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tight sm:mt-4 sm:text-6xl lg:text-7xl">
              Four disciplines. <span className="text-outline">One team.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-mist sm:text-base">
            Hire us for one piece or the whole journey. Every discipline shares the same strategy, so nothing gets lost in hand-offs.
          </p>
        </div>

        <div className="svc-grid mt-10 grid gap-4 sm:mt-16 md:grid-cols-12" style={{ perspective: 1200 }}>
          {SERVICES.map((s) => (
            <article
              key={s.n}
              onMouseMove={track}
              className={`svc-card spotlight group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8 transition-colors hover:border-white/20 ${s.span}`}
            >
              <div className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl transition-opacity duration-500 ${s.glow} opacity-40 group-hover:opacity-100`} />
              <div className="flex items-start justify-between">
                <s.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${s.color}`} />
                <span className="font-display text-sm text-mist">{s.n}</span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-semibold sm:mt-16 sm:text-4xl">{s.title}</h3>
              <p className="mt-2.5 max-w-md text-sm text-mist sm:mt-3 sm:text-base">{s.copy}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper/80">{t}</span>
                ))}
                <ArrowUpRight className={`ml-auto h-5 w-5 sm:h-6 sm:w-6 ${s.color} transition-transform duration-300 group-hover:rotate-45`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
