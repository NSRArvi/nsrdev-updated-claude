"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO =
  "We believe great products aren't made in silos. Strategy, brand, design, code and growth should speak the same language — so we put them in one room, around your idea.";

const STATS = [
  { value: 120, suffix: "+", label: "Products launched" },
  { value: 40, suffix: "+", label: "Brands created" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 12, suffix: "", label: "Countries served" },
];

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word manifesto reveal, scrubbed to scroll
      gsap.fromTo(
        ".mf-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".mf", start: "top 75%", end: "bottom 45%", scrub: true },
        }
      );
      // Count-up stats
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="studio"
      className="relative z-10 overflow-hidden bg-surface/40 px-4 py-20 sm:px-6 sm:py-28 lg:py-36 border-y border-line"
    >
      {/* Soft brand glow behind manifesto */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/5 blur-[160px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-volt">The studio</p>
        <p className="mf mt-6 max-w-5xl font-display text-2xl font-medium leading-[1.25] tracking-tight sm:mt-8 sm:text-4xl lg:text-5xl">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i} className="mf-word">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:mt-20 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface p-5 sm:p-8">
              <p className="font-display text-3xl font-bold sm:text-5xl lg:text-6xl">
                <span className="stat-num" data-value={s.value}>
                  0
                </span>
                <span className="text-ember">{s.suffix}</span>
              </p>
              <p className="mt-1.5 text-xs text-mist sm:mt-2 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
