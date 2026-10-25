"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Plus, X } from "lucide-react";
import logoImg from "../assets/logo.png";

export const LINKS = [
  { id: "journey", num: "01", label: "Journey", href: "/journey" },
  { id: "services", num: "02", label: "Services", href: "/services" },
  { id: "work", num: "03", label: "Work", href: "/work" },
  { id: "studio", num: "04", label: "Studio", href: "/studio" },
  { id: "contact", num: "05", label: "Contact", href: "/contact" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center ${className}`}>
      <span className="relative h-9 w-28 sm:h-10 sm:w-32 overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <Image src={logoImg} alt="NSRDEV" fill priority className="object-contain object-left" />
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrollActive, setScrollActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "journey", "services", "work", "studio", "contact"];
    const onScroll = () => {
      const probeY = window.innerHeight * 0.4;
      let currentSection = sections[0];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section spans across our probe point
          if (rect.top <= probeY && rect.bottom > probeY) {
            currentSection = id;
            break;
          }
        }
      }
      setScrollActive(currentSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const active =
    pathname === "/"
      ? scrollActive
      : LINKS.find((l) => pathname.startsWith(l.href))?.id ?? "";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left Floating Glass Node: Logo Only */}
          <div className="pointer-events-auto flex items-center rounded-full border border-line bg-ink/75 px-3.5 py-2 backdrop-blur-xl">
            <Logo />
          </div>

          {/* Center Floating Command Dock (Desktop & Tablet) */}
          <nav
            aria-label="Primary Navigation"
            className="pointer-events-auto hidden items-center gap-1 rounded-full border border-line bg-ink/75 p-1.5 backdrop-blur-2xl md:flex"
          >
            {LINKS.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-brand-gradient shadow-brand-glow text-paper"
                      : "text-mist hover:text-paper"
                  }`}
                >
                  <span className="mr-1 font-mono text-[10px] opacity-60">{item.num}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Floating Action Node */}
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full border border-line bg-ink/80 pl-4 pr-2.5 py-1.5 text-xs font-semibold text-paper backdrop-blur-xl transition-all duration-300 hover:border-ember/60 sm:inline-flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              <span>Let&apos;s Talk</span>
              <span className="bg-brand-gradient grid h-6 w-6 place-items-center rounded-full text-paper transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Mobile & Tablet Menu Orb */}
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 items-center gap-2 rounded-full border border-line bg-ink/85 px-4 text-xs font-semibold uppercase tracking-widest text-paper backdrop-blur-xl md:hidden"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="bg-brand-gradient grid h-6 w-6 place-items-center rounded-full text-paper">
                {open ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Futuristic Mobile / Tablet Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink/95 px-6 pt-28 pb-10 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-ion/20 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-10 left-0 h-72 w-72 rounded-full bg-ember/20 blur-[110px]" />

        <ul className="relative space-y-2">
          {LINKS.map((item) => (
            <li key={item.id} className="border-b border-line pb-2">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between py-2 font-display text-4xl font-bold tracking-tight text-paper transition-colors hover:text-volt sm:text-5xl"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-ember">{item.num}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative space-y-4">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-brand-gradient shadow-brand-glow flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-base font-semibold text-paper"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center justify-between text-xs text-mist">
            <span>hello@nsrdev.com</span>
            <span>+880 1318-214398</span>
          </div>
        </div>
      </div>
    </>
  );
}
