"use client";
import dynamic from "next/dynamic";
import IdeaHero from "./components/IdeaHero";
import ProcessJourney from "./components/ProcessJourney";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Work from "./components/Work";
import Studio from "./components/Studio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

// WebGL is client-only; keep it out of SSR so first paint & SEO stay fast.
const ParticleCanvas = dynamic(() => import("./components/three/ParticleCanvas"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-ink text-paper">
      <ParticleCanvas />
      <IdeaHero />
      <ProcessJourney />
      <Marquee />
      <Services />
      <Work />
      <Studio />
      <Testimonials />
      <Contact />
    </main>
  );
}
