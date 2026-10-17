import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "NSRDEV — From Idea to Launch | Brand, UI/UX, Development & SEO Studio",
  description:
    "NSRDEV is a full-cycle digital studio. We turn ideas into brands, web & mobile products and growth — brand identity, UI/UX design, development, SEO and marketing under one roof.",
  keywords: [
    "digital agency",
    "brand identity",
    "logo design",
    "UI/UX design",
    "web development",
    "mobile app development",
    "SEO",
    "marketing",
    "Bangladesh",
  ],
  openGraph: {
    title: "NSRDEV — From Idea to Launch",
    description:
      "Brand identity, UI/UX, development and growth — one team, from first sketch to launch day.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#07080b" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} bg-ink text-paper`}>
      <body className="grain min-h-screen bg-ink text-paper antialiased">
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
