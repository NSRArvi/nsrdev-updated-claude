"use client";
import dynamic from "next/dynamic";
import ProcessJourney from "../components/ProcessJourney";
import Marquee from "../components/Marquee";
import Contact from "../components/Contact";

const ParticleCanvas = dynamic(() => import("../components/three/ParticleCanvas"), {
  ssr: false,
});

export default function JourneyView() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-ink text-paper">
      <ParticleCanvas />
      <ProcessJourney />
      <Marquee />
      <Contact />
    </main>
  );
}

