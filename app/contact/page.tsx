import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project | NSRDEV",
  description:
    "Have an idea for a brand, web platform, or mobile app? Tell NSRDEV what you're building and book a free discovery call within 24 hours.",
  openGraph: {
    title: "Contact Us — Start Your Project | NSRDEV",
    description:
      "Your idea. Our move. Reach out to NSRDEV to start your brand, design, development, or growth project.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-ink pt-16 text-paper">
      <Contact />
    </main>
  );
}

