export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  result: string;
  url: string;
  domain: string;
  image: string;
  bg: string;
  tags: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    name: "Bumrungrad Discover (DIMS)",
    category: "Website & CRM",
    summary:
      "Official Bumrungrad Hospital referral platform & patient care CRM managing appointments, medical visas, and telemedicine across 18+ countries.",
    result: "1,200+ Patients · 18+ Countries",
    url: "https://www.discoverinternationalmedicalservice.com/",
    domain: "discoverinternationalmedicalservice.com",
    image: "/works/Bumrungrad.png",
    bg: "from-ion/35 via-surface to-ink",
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
    image: "/works/Laminax.png",
    bg: "from-ember/35 via-surface to-ink",
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
    image: "/works/Caro.png",
    bg: "from-aqua/35 via-surface to-ink",
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
    image: "/works/Smart Kitchen & Bath.png",
    bg: "from-volt/35 via-surface to-ink",
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
    image: "/works/Dynamic Exim.png",
    bg: "from-ion/35 via-surface to-ink",
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
    image: "/works/Home Grow.png",
    bg: "from-aqua/35 via-surface to-ink",
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
    image: "/works/SP China Bangla Mediaid.png",
    bg: "from-ember/35 via-surface to-ink",
    tags: ["Medical Tourism", "Hospital Referral", "Telemedicine"],
  },
];
