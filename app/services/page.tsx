import type { Metadata } from "next";
import Services from "../components/Services";
import Marquee from "../components/Marquee";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Services — Brand Identity, UI/UX, Development & SEO | NSRDEV",
  description:
    "Four disciplines under one roof: Brand Identity & Logo Systems, UI/UX Design in Figma, Full-Stack Web & Mobile Development (Next.js, Flutter, Three.js), and Technical SEO & Growth Marketing.",
  openGraph: {
    title: "Services — Brand Identity, UI/UX, Development & SEO | NSRDEV",
    description:
      "Hire NSRDEV for one discipline or the entire product journey. Brand identity, UI/UX, engineering, and SEO.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-ink pt-12 text-paper">
      <Services />
      <Marquee />
      <Contact />
    </main>
  );
}

