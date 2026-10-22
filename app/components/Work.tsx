"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import WorkParticleScene, { type WorkKind } from "./three/WorkParticleScene";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  result: string;
  url: string;
  domain: string;
  kind: WorkKind;
  bg: string;
  primaryVar: "ion" | "ember" | "volt" | "aqua";
  secondaryVar: "ion" | "ember" | "volt" | "aqua";
  tags: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    name: "Bumrungrad Discover (DIMS)",
    category: "Website & CRM",
    summary:
      "Official Bumrungrad Hospital referral platform & patient care CRM managing appointments, medical visas, and telemedicine across 18+ countries.",
    result: "1,200+ Patients · 18+ Countries",
    url: "https://www.discoverinternationalmedicalservice.com/",
    domain: "discoverinternationalmedicalservice.com",
    kind: "crm",
    bg: "from-ion/35 via-surface to-ink",
    primaryVar: "ion",
    secondaryVar: "aqua",
    tags: ["Healthcare CRM", "Patient Portal", "Next.js"],
  },
  {
    id: "02",
    name: "Laminax Bangladesh",
    category: "Ecommerce Website",
    summary:
      "High-velocity beauty, skincare & cosmetics e-commerce storefront with live flash sales, cashback rewards, and instant nationwide checkout.",
    result: "D2C Storefront · Live Inventory",
    url: "https://www.laminax.com.bd/",
    domain: "laminax.com.bd",
    kind: "ecommerce-beauty",
    bg: "from-ember/35 via-surface to-ink",
    primaryVar: "ember",
    secondaryVar: "volt",
    tags: ["E-Commerce", "Reward Engine", "Fast Checkout"],
  },
  {
    id: "03",
    name: "The Caro App",
    category: "Mobile App",
    summary:
      "Borderless national & international parcel delivery app connecting senders with verified riders via live GPS tracking and OTP escrow handoff.",
    result: "50K+ Deliveries · 100+ Cities",
    url: "https://thecaro.app/",
    domain: "thecaro.app",
    kind: "mobile-app",
    bg: "from-aqua/35 via-surface to-ink",
    primaryVar: "aqua",
    secondaryVar: "ion",
    tags: ["iOS & Android", "Live GPS Dispatch", "Escrow OTP"],
  },
  {
    id: "04",
    name: "Smart Kitchen & Bath",
    category: "Ecommerce Website",
    summary:
      "Luxury Australian kitchen & bathroom e-commerce platform featuring architectural Shop-by-Room curation, multi-brand catalogs, and showroom booking.",
    result: "Luxury AU Store · Curated Catalog",
    url: "https://smartkitchenandbath.com.au/",
    domain: "smartkitchenandbath.com.au",
    kind: "ecommerce-luxury",
    bg: "from-volt/35 via-surface to-ink",
    primaryVar: "volt",
    secondaryVar: "ember",
    tags: ["Luxury Retail", "Shop by Room", "Australia"],
  },
  {
    id: "05",
    name: "Dynamic Exim Co. Ltd.",
    category: "B2B Trade Website",
    summary:
      "Global garment accessories & export-import sourcing platform streamlining international textile supply chains, product catalogs, and buyer inquiries.",
    result: "Global Sourcing · B2B Supply Chain",
    url: "https://dynamic-exim.com/",
    domain: "dynamic-exim.com",
    kind: "global-trade",
    bg: "from-ion/35 via-surface to-ink",
    primaryVar: "ion",
    secondaryVar: "ember",
    tags: ["Export & Import", "B2B Portal", "Supply Chain"],
  },
  {
    id: "06",
    name: "Home Grow BD",
    category: "AgriTech Website",
    summary:
      "Agricultural R&D, contract seed farming, and global seed export platform showcasing hybrid & open-pollinated vegetable seed varieties.",
    result: "Seed R&D · International Export",
    url: "https://homegrowbd.com/",
    domain: "homegrowbd.com",
    kind: "agritech",
    bg: "from-aqua/35 via-surface to-ink",
    primaryVar: "aqua",
    secondaryVar: "volt",
    tags: ["AgriTech R&D", "Seed Export", "Global Catalog"],
  },
  {
    id: "07",
    name: "SP ChinaBangla Mediaid",
    category: "Healthcare Portal",
    summary:
      "Cross-border medical tourism & patient referral platform connecting Bangladesh with Yunnan Provincial Hospital of Chinese Medicine in China.",
    result: "5,000+ Patients · 4.9★ Rated",
    url: "https://spchinabanglamediaid.com/",
    domain: "spchinabanglamediaid.com",
    kind: "medical-bridge",
    bg: "from-ember/35 via-surface to-ink",
    primaryVar: "ember",
    secondaryVar: "aqua",
    tags: ["Medical Tourism", "Hospital Referral", "Telemedicine"],
  },
];

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned horizontal scroll gallery synced with active project index
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                PROJECTS.length - 1,
                Math.max(0, Math.round(self.progress * (PROJECTS.length - 1)))
              );
              setActiveIdx(idx);
            },
          },
        });

        stRef.current = tween.scrollTrigger ?? null;
      });

      // Mobile & Tablet: Native horizontal swipe container tracking
      mm.add("(max-width: 1023px)", () => {
        stRef.current = null;
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /** Smoothly navigates to a specific work card on both desktop and mobile/tablet */
  const navigateToProject = (index: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, index));
    setActiveIdx(clamped);

    if (window.innerWidth >= 1024 && stRef.current) {
      const st = stRef.current;
      const targetProgress = clamped / (PROJECTS.length - 1);
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const container = mobileContainerRef.current;
      const targetCard = cardRefs.current[clamped];
      if (container && targetCard) {
        const offset = targetCard.offsetLeft - container.offsetLeft - 16;
        container.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
      }
    }
  };

  /** Sync active project index on mobile swipe */
  const handleMobileScroll = () => {
    const container = mobileContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    let closestIndex = 0;
    let minDiff = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const diff = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });

    setActiveIdx(closestIndex);
  };

  return (
    <section ref={root} id="work" className="relative z-10 overflow-hidden bg-ink lg:h-[100svh]">
      {/* Glow highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-ion/10 blur-[150px]"
      />

      <div
        ref={track}
        className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24 lg:mx-0 lg:h-full lg:max-w-none lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:pl-[8vw] lg:pr-[8vw]"
      >
        {/* Intro & Interactive Navigator Panel */}
        <div className="shrink-0 lg:w-[32vw]">
          <p className="text-xs uppercase tracking-[0.3em] text-volt">Selected work</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight sm:mt-4 sm:text-6xl lg:text-7xl">
            Ideas we&apos;ve <span className="text-volt-gradient">launched.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-mist sm:mt-5 sm:text-base">
            Live platforms engineered with custom architecture. Swipe horizontally or jump directly to inspect each project.
          </p>

          {/* Interactive Work Navigator HUD */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8">
            <div className="flex flex-wrap items-center gap-1.5">
              {PROJECTS.map((p, i) => {
                const isActive = activeIdx === i;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => navigateToProject(i)}
                    className={`group flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all duration-300 ${
                      isActive
                        ? "border-volt/50 bg-brand-gradient text-paper shadow-brand-glow"
                        : "border-line bg-surface/70 text-mist hover:border-paper/25 hover:text-paper"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">{p.id}</span>
                    <span className="font-medium">{p.category}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigateToProject(activeIdx - 1)}
                disabled={activeIdx === 0}
                aria-label="Previous project"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/80 text-paper transition hover:border-volt/50 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateToProject(activeIdx + 1)}
                disabled={activeIdx === PROJECTS.length - 1}
                aria-label="Next project"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/80 text-paper transition hover:border-volt/50 disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="ml-1 font-mono text-xs uppercase tracking-[0.25em] text-mist">
                0{activeIdx + 1} / 0{PROJECTS.length}
              </span>
              <span className="ml-auto text-[11px] text-mist lg:hidden">
                Swipe cards →
              </span>
            </div>
          </div>
        </div>

        {/* Project Cards: Horizontal Scroll & Snap on Mobile/Tablet, Pinned Track on Desktop */}
        <div
          ref={mobileContainerRef}
          onScroll={handleMobileScroll}
          className="flex w-full items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory touch-pan-x overscroll-x-contain scroll-smooth lg:contents lg:overflow-visible lg:p-0"
        >
          {PROJECTS.map((p, idx) => (
            <article
              key={p.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              className="work-card group relative flex w-[86vw] max-w-[420px] shrink-0 snap-center flex-col sm:w-[60vw] sm:max-w-[480px] lg:w-[44vw] lg:max-w-none xl:w-[38vw]"
            >
              {/* 3D Three.js Particle Stage */}
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gradient-to-br ${p.bg} ring-1 ring-line transition-all duration-500 group-hover:ring-volt/40`}
              >
                <WorkParticleScene
                  kind={p.kind}
                  primaryVar={p.primaryVar}
                  secondaryVar={p.secondaryVar}
                />

                {/* Top HUD Bar inside Card */}
                <div className="pointer-events-none absolute inset-x-3.5 top-3.5 z-10 flex items-center justify-between sm:inset-x-5 sm:top-5">
                  <div className="flex items-center gap-1.5 rounded-full border border-line bg-ink/80 px-2.5 py-1 text-[10px] font-medium text-paper backdrop-blur-md sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                    <span>{p.category}</span>
                  </div>

                  <span className="rounded-full border border-line bg-ink/75 px-2.5 py-1 font-mono text-[9px] text-mist backdrop-blur-md sm:text-xs">
                    {p.result}
                  </span>
                </div>

                {/* Bottom Live Action Bar inside Card */}
                <div className="absolute inset-x-3.5 bottom-3.5 z-10 flex items-center justify-between gap-2 sm:inset-x-5 sm:bottom-5">
                  <div className="hidden flex-wrap gap-1.5 sm:flex">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-ink/75 px-2 py-0.5 text-[10px] text-mist backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-[11px] font-semibold text-ink transition-all duration-300 hover:bg-brand-gradient hover:text-paper hover:shadow-brand-glow sm:px-4 sm:py-2 sm:text-xs"
                  >
                    <span>Visit Live</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Card Footer Metadata */}
              <div className="mt-3.5 flex flex-col items-baseline justify-between gap-3 sm:mt-5">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title inline-flex items-center gap-2"
                >
                  <h3 className="font-display text-lg font-semibold text-paper transition-colors group-hover/title:text-volt sm:text-2xl">
                    {p.name}
                  </h3>
                </a>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate font-mono text-[11px] text-mist transition-colors hover:text-paper sm:text-xs"
                >
                  {p.domain} ↗
                </a>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mist sm:mt-1.5 sm:text-sm">
                {p.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
