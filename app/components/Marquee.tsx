"use client";

const ROW_A = ["Brand Strategy", "Logo Design", "Visual Identity", "UI/UX Design", "Web Apps", "Mobile Apps", "3D & Motion"];
const ROW_B = ["Next.js", "React Native", "Flutter", "Three.js", "GSAP", "SEO", "Performance", "Growth Marketing"];

function Row({ items, reverse, accent }: { items: string[]; reverse?: boolean; accent: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={reverse ? "marquee-reverse" : "marquee"}>
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-5 px-3 font-display text-2xl font-semibold tracking-tight sm:gap-8 sm:px-4 sm:text-5xl lg:text-6xl">
            <span className={i % 2 ? "text-outline" : "text-paper"}>{t}</span>
            <span className={`h-2.5 w-2.5 rotate-45 sm:h-3 sm:w-3 ${accent}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Kinetic capability ticker between the journey and the services. */
export default function Marquee() {
  return (
    <section aria-label="Capabilities" className="relative z-10 space-y-3 border-y border-line bg-ink py-7 sm:space-y-4 sm:py-10">
      <Row items={ROW_A} accent="bg-ember" />
      <Row items={ROW_B} reverse accent="bg-ion" />
    </section>
  );
}
