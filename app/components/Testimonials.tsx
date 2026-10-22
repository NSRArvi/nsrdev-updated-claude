"use client";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  project: string;
  image: string;
  country: string;
}

const COL_LEFT: TestimonialItem[] = [
  {
    quote:
      "NSRDEV built our official Bumrungrad referral portal and CRM from the ground up. Coordinating patients across 18+ countries is now effortless.",
    name: "Dr. M. Chowdhury",
    role: "Director · Discover International Medical",
    project: "Website & CRM",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "They took a napkin sketch and turned it into a brand and product our users genuinely love. Fast, detail-obsessed, and zero hand-holding needed.",
    name: "Aarav Sharma",
    role: "Founder · Pulse Health Labs",
    project: "Brand & App",
    country: "India",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Our store speed and checkout conversion jumped immediately after launching the new Next.js storefront. Best engineering team we have worked with.",
    name: "Nadia Islam",
    role: "Head of Digital · Laminax BD",
    project: "Ecommerce Website",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
];

const COL_MIDDLE: TestimonialItem[] = [
  {
    quote:
      "The Caro App needed real-time GPS dispatch, rider bidding, and OTP escrow that felt instant. NSRDEV delivered a rock-solid iOS and Android experience.",
    name: "Marcus Vance",
    role: "Product Lead · The Caro App",
    project: "Mobile App",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "From architectural Shop-by-Room filtering to showroom booking, they captured the exact luxury feel our Australian clientele expects.",
    name: "Liam Mitchell",
    role: "Managing Partner · Smart Kitchen & Bath AU",
    project: "Luxury Ecommerce",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "One team for brand, UI/UX, code, and SEO. Having everything under one roof saved us months of back-and-forth and gave us a cohesive launch.",
    name: "Chloe Tremblay",
    role: "CEO · Verde Market Group",
    project: "Full Journey",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
];

const COL_RIGHT: TestimonialItem[] = [
  {
    quote:
      "The 3D motion and polish in our web platform made investors stop and pay attention. We closed our seed round six weeks after launch.",
    name: "Rohan Singhania",
    role: "Co-founder · Orbit FinTech",
    project: "Web Platform",
    country: "India",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Their communication is unmatched. Weekly shipping sprints, clean scalable code, and a design system our internal team still builds on every day.",
    name: "Hannah Watson",
    role: "CTO · Nomad Stays AU",
    project: "Product & Design",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Not just developers—true product partners. They challenged our assumptions early and delivered a platform that outperformed every KPI.",
    name: "Farhan Kabir",
    role: "VP Growth · Apex Ventures",
    project: "Strategy & Growth",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
];

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="group relative flex flex-col justify-between rounded-3xl border border-line bg-surface/75 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-volt/40 hover:bg-raised/85 sm:p-7">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-ember">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <span className="rounded-full border border-line bg-ink/60 px-2.5 py-0.5 font-mono text-[10px] text-volt">
            {item.project}
          </span>
        </div>

        <blockquote className="mt-4 text-sm leading-relaxed text-paper/90 sm:text-base">
          “{item.quote}”
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-line">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="40px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="block text-sm font-semibold text-paper">{item.name}</span>
              <span className="text-[10px] text-mist">({item.country})</span>
            </div>
            <span className="block text-xs text-mist">{item.role}</span>
          </div>
        </div>
        <Quote className="h-5 w-5 shrink-0 text-volt/40 transition-colors group-hover:text-ember" />
      </figcaption>
    </figure>
  );
}

function MarqueeColumn({
  items,
  direction,
  className = "",
}: {
  items: TestimonialItem[];
  direction: "up" | "down";
  className?: string;
}) {
  // Duplicate array twice so -50% vertical translation loops seamlessly
  const loopItems = [...items, ...items];

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div className={`${direction === "up" ? "marquee-up" : "marquee-down"} gap-5 pb-5`}>
        {loopItems.map((item, idx) => (
          <TestimonialCard key={`${item.name}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-volt">Client Voices</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.02] tracking-tight sm:mt-4 sm:text-5xl lg:text-6xl">
            Trusted by founders <span className="text-volt-gradient">worldwide.</span>
          </h2>
          <p className="mt-3 text-sm text-mist sm:mt-4 sm:text-base">
            Real feedback from the leaders we&apos;ve partnered with across healthcare, e-commerce, and mobile apps.
          </p>
        </div>

        {/* 3-Column Vertical Marquee Stage */}
        <div className="relative mt-12 h-[540px] sm:mt-16 sm:h-[640px] lg:h-[700px]">
          {/* Top & Bottom Smooth Fade Masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-ink via-ink/70 to-transparent sm:h-32"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-ink via-ink/70 to-transparent sm:h-32"
          />

          {/* 3-Column Vertical Marquee Grid:
              Left: Bottom to Top (up)
              Middle: Top to Bottom (down)
              Right: Bottom to Top (up) */}
          <div className="relative z-10 grid h-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Left Column: Bottom -> Top */}
            <MarqueeColumn items={COL_LEFT} direction="up" />

            {/* Middle Column: Top -> Bottom */}
            <MarqueeColumn items={COL_MIDDLE} direction="down" className="hidden md:block" />

            {/* Right Column: Bottom -> Top */}
            <MarqueeColumn items={COL_RIGHT} direction="up" className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

