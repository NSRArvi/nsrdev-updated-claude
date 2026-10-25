import { Code2, Megaphone, Palette, PenTool } from "lucide-react";
import type { ServiceShapeKey } from "../components/particles/ServiceParticle";

export interface ServiceItem {
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

export const SERVICES: ServiceItem[] = [
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

