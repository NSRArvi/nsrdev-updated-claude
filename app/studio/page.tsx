import type { Metadata } from "next";
import Studio from "../components/Studio";
import Testimonials from "../components/Testimonials";
import Marquee from "../components/Marquee";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "The Studio — Full-Cycle Digital Product Agency | NSRDEV",
  description:
    "Meet NSRDEV: a multidisciplinary digital studio uniting strategy, brand, design, engineering, and growth around your idea. 120+ products launched across 12 countries.",
  openGraph: {
    title: "The Studio — Full-Cycle Digital Product Agency | NSRDEV",
    description:
      "Strategy, brand, UI/UX, code, and growth in one room. Learn how NSRDEV partners with founders worldwide.",
    type: "website",
  },
};

export default function StudioPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-ink pt-16 text-paper">
      <Studio />
      <Marquee />
      <Testimonials />
      <Contact />
    </main>
  );
}

