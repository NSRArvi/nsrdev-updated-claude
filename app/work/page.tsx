import type { Metadata } from "next";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies — Launched Products | NSRDEV",
  description:
    "Explore live digital products engineered by NSRDEV: healthcare CRMs, high-velocity e-commerce storefronts, cross-border mobile delivery apps, and global B2B platforms.",
  openGraph: {
    title: "Selected Work & Case Studies — Launched Products | NSRDEV",
    description:
      "See the brands, web platforms, and mobile apps NSRDEV has designed, engineered, and launched worldwide.",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-ink pt-12 text-paper">
      <Work />
      <Testimonials />
      <Contact />
    </main>
  );
}

