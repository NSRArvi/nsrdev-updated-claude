import type { Metadata } from "next";
import JourneyView from "./JourneyView";

export const metadata: Metadata = {
  title: "Our Process Journey — From Idea to Launch | NSRDEV",
  description:
    "Explore NSRDEV's 6-stage product creation journey: Discovery, Brand Identity, UI/UX Design, Full-Stack Development, Product Launch, and SEO & Growth Marketing.",
  openGraph: {
    title: "Our Process Journey — From Idea to Launch | NSRDEV",
    description:
      "Step-by-step from raw spark to market-ready brand, web & mobile product, and scalable growth.",
    type: "website",
  },
};

export default function JourneyPage() {
  return <JourneyView />;
}

