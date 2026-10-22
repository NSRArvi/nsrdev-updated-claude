"use client";
import { useEffect, useRef } from "react";
import { Logo } from "./Navbar";

const COLS = [
  { h: "Studio", l: [["Journey", "#journey"], ["Services", "#services"], ["Work", "#work"], ["Studio", "#studio"]] },
  { h: "Services", l: [["Brand Identity", "#services"], ["UI/UX Design", "#services"], ["Development", "#services"], ["SEO & Marketing", "#services"]] },
  { h: "Connect", l: [["LinkedIn", "#"], ["Dribbble", "#"], ["Behance", "#"], ["GitHub", "#"]] },
];

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number;
};

function ParticleWordmark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const buildParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(280, Math.floor(rect.width));
      const height = Math.max(100, Math.floor(width * 0.23));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.height = `${height}px`;

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) return;

      // Calibrate font size dynamically so "NSRDEV" spans the full max-w-7xl width edge-to-edge
      octx.font = "900 100px sans-serif";
      const measured = octx.measureText("NSRDEV").width;
      const targetWidth = width * 0.99;
      const fontSize = Math.floor((100 * targetWidth) / measured);

      octx.font = `900 ${fontSize}px sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#ffffff";
      octx.fillText("NSRDEV", width / 2, height * 0.52);

      const img = octx.getImageData(0, 0, width, height).data;
      const step = width < 640 ? 3 : 4;
      const next: Particle[] = [];

      // Helper to parse hex to RGB and interpolate smoothly across the wordmark width
      const hexToRgb = (hex: string, fallback: [number, number, number]): [number, number, number] => {
        const clean = hex.replace("#", "").trim();
        if (clean.length !== 6) return fallback;
        const num = parseInt(clean, 16);
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
      };
      const lerpRgb = (a: [number, number, number], b: [number, number, number], t: number) => {
        const r = Math.round(a[0] + (b[0] - a[0]) * t);
        const g = Math.round(a[1] + (b[1] - a[1]) * t);
        const bl = Math.round(a[2] + (b[2] - a[2]) * t);
        return `rgb(${r}, ${g}, ${bl})`;
      };

      const styles = getComputedStyle(document.documentElement);
      const ionRgb = hexToRgb(styles.getPropertyValue("--color-ion"), [139, 61, 255]);    // #8b3dff
      const voltRgb = hexToRgb(styles.getPropertyValue("--color-volt"), [192, 132, 252]); // #c084fc
      const emberRgb = hexToRgb(styles.getPropertyValue("--color-ember"), [236, 56, 188]); // #ec38bc

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = img[(y * width + x) * 4 + 3];
          if (alpha > 128) {
            // Smooth horizontal gradient: Electric Purple (left) -> Soft Violet (center) -> Neon Magenta (right)
            const t = Math.min(1, Math.max(0, x / width));
            const color =
              t < 0.5
                ? lerpRgb(ionRgb, voltRgb, t * 2)
                : lerpRgb(voltRgb, emberRgb, (t - 0.5) * 2);

            next.push({
              ox: x * dpr,
              oy: y * dpr,
              x: (x + (Math.random() - 0.5) * 30) * dpr,
              y: (y + (Math.random() - 0.5) * 30) * dpr,
              vx: 0,
              vy: 0,
              size: (Math.random() * 1.0 + (width < 640 ? 0.9 : 1.15)) * dpr,
              color,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
      particles = next;
    };

    buildParticles();

    let time = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const mx = mouse.x * dpr;
      const my = mouse.y * dpr;
      const radius = 90 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < radius * radius && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = (radius - dist) / radius;
          p.vx += (dx / dist) * force * 2.6 * dpr;
          p.vy += (dy / dist) * force * 2.6 * dpr;
        }

        const floatX = Math.sin(time + p.phase) * 0.6 * dpr;
        const floatY = Math.cos(time + p.phase) * 0.6 * dpr;

        p.vx += (p.ox + floatX - p.x) * 0.09;
        p.vy += (p.oy + floatY - p.y) * 0.09;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    render();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => buildParticles();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="mx-auto mt-6 w-full max-w-7xl">
      <canvas
        ref={canvasRef}
        aria-label="NSRDEV"
        className="block w-full cursor-crosshair select-none"
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-ink px-4 pt-16 pb-6 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mist">From idea to brand, product and growth — a full-cycle digital studio.</p>
            <a href="mailto:hello@nsrdev.com" className="mt-5 inline-block text-sm text-volt hover:underline sm:mt-6">hello@nsrdev.com</a>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="text-xs uppercase tracking-[0.25em] text-mist">{c.h}</p>
              <ul className="mt-3.5 space-y-2.5 sm:mt-4">
                {c.l.map(([t, h]) => (
                  <li key={t}><a href={h} className="text-sm text-paper/80 transition-colors hover:text-volt">{t}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-line py-5 text-xs text-mist sm:mt-16 sm:flex-row sm:py-6">
          <span>© {new Date().getFullYear()} NSRDEV. All rights reserved.</span>
          <span>Designed & built in-house.</span>
        </div>
      </div>

      {/* Giant interactive particle NSRDEV wordmark */}
      <ParticleWordmark />
    </footer>
  );
}
