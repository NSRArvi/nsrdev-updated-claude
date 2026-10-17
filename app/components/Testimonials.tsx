"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Quote, Star } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  project: string;
}

const COL_LEFT: TestimonialItem[] = [
  {
    quote:
      "NSRDEV built our official Bumrungrad referral portal and CRM from the ground up. Coordinating patients across 18+ countries is now effortless.",
    name: "Dr. M. Chowdhury",
    role: "Director · Discover International Medical",
    project: "Website & CRM",
  },
  {
    quote:
      "They took a napkin sketch and turned it into a brand and product our users genuinely love. Fast, detail-obsessed, and zero hand-holding needed.",
    name: "Arif Rahman",
    role: "Founder · Pulse Health",
    project: "Brand & App",
  },
  {
    quote:
      "Our store speed and checkout conversion jumped immediately after launching the new Next.js storefront. Best engineering team we have worked with.",
    name: "Nadia Islam",
    role: "Head of Digital · Laminax BD",
    project: "Ecommerce Website",
  },
];

const COL_MIDDLE: TestimonialItem[] = [
  {
    quote:
      "The Caro App needed real-time GPS dispatch, rider bidding, and OTP escrow that felt instant. NSRDEV delivered a rock-solid iOS and Android experience.",
    name: "Tariq Al-Mansoor",
    role: "Product Lead · The Caro App",
    project: "Mobile App",
  },
  {
    quote:
      "One team for brand, UI/UX, code, and SEO. Having everything under one roof saved us months of back-and-forth and gave us a cohesive launch.",
    name: "Sarah Lin",
    role: "CEO · Verde Market",
    project: "Full Journey",
  },
  {
    quote:
      "From architectural Shop-by-Room filtering to showroom booking, they captured the exact luxury feel our Australian clientele expects.",
    name: "Liam Mitchell",
    role: "Managing Partner · Smart Kitchen & Bath AU",
    project: "Luxury Ecommerce",
  },
];

const COL_RIGHT: TestimonialItem[] = [
  {
    quote:
      "The 3D motion and polish in our web platform made investors stop and pay attention. We closed our seed round six weeks after launch.",
    name: "David Okafor",
    role: "Co-founder · Orbit Finance",
    project: "Web Platform",
  },
  {
    quote:
      "Their communication is unmatched. Weekly shipping sprints, clean scalable code, and a design system our internal team still builds on every day.",
    name: "Elena Rostova",
    role: "CTO · Nomad Stays",
    project: "Product & Design",
  },
  {
    quote:
      "Not just developers—true product partners. They challenged our assumptions early and delivered a platform that outperformed every KPI.",
    name: "farhan Kabir",
    role: "VP Growth · Apex Ventures",
    project: "Strategy & Growth",
  },
];

/** Reads theme colors dynamically from app/globals.css */
function readThemeColors() {
  const s = getComputedStyle(document.documentElement);
  const get = (k: string, fb: string) => s.getPropertyValue(k).trim() || fb;
  return {
    ion: get("--color-ion", "#8b3dff"),
    ember: get("--color-ember", "#ec38bc"),
    volt: get("--color-volt", "#c084fc"),
    aqua: get("--color-aqua", "#38bdf8"),
  };
}

/**
 * Fixed center Three.js particle sculpture representing client trust & resonance:
 * A glowing 3D Heart/Trust Core surrounded by orbital Speech/Quote rings and a 5-point Star halo.
 */
function TestimonialParticleCore() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 2200 : 4200;
    const palette = readThemeColors();

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const rect = mount.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 420);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    const pos = new Float32Array(COUNT * 3);
    const mixAttr = new Float32Array(COUNT);
    const rnd = new Float32Array(COUNT);
    const TAU = Math.PI * 2;

    for (let i = 0; i < COUNT; i++) {
      rnd[i] = Math.random();
      const r = Math.random();
      let x = 0,
        y = 0,
        z = 0,
        cMix = 0;

      if (r < 0.45) {
        // 1. Center 3D Heart / Trust Resonance Core
        const t = Math.random() * TAU;
        const u = Math.cbrt(Math.random()) * 0.085;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);
        x = hx * u;
        y = hy * u + 0.1;
        z = (Math.random() - 0.5) * 0.9 * (1 - Math.abs(hx) / 18);
        cMix = 0.85;
      } else if (r < 0.78) {
        // 2. Interlocking Speech / Quote Wave Rings orbiting the core
        const ring = i % 2;
        const a = Math.random() * TAU;
        const radius = (ring === 0 ? 2.15 : 2.55) + (Math.random() - 0.5) * 0.12;
        const tilt = ring === 0 ? 0.42 : -0.42;
        const rx = Math.cos(a) * radius;
        const rz = Math.sin(a) * radius;
        x = rx;
        y = rz * Math.sin(tilt) + Math.sin(a * 3) * 0.12;
        z = rz * Math.cos(tilt);
        cMix = ring === 0 ? 0.25 : 0.55;
      } else {
        // 3. 5-Star Constellation Nodes & Ambient Halo around the columns
        const starIdx = i % 5;
        const starAngle = (starIdx / 5) * TAU - Math.PI / 2;
        const spread = Math.pow(Math.random(), 1.5) * 0.32;
        const a = Math.random() * TAU;
        x = Math.cos(starAngle) * 1.65 + Math.cos(a) * spread;
        y = Math.sin(starAngle) * 1.65 + Math.sin(a) * spread;
        z = (Math.random() - 0.5) * 0.6;
        cMix = 1.0;
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      mixAttr[i] = cMix;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aMix", new THREE.BufferAttribute(mixAttr, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: (isMobile ? 4.8 : 6.0) * dpr },
        uColA: { value: new THREE.Color(palette.ion) },
        uColB: { value: new THREE.Color(palette.ember) },
        uColC: { value: new THREE.Color(palette.aqua) },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uSize;
        uniform vec3 uColA;
        uniform vec3 uColB;
        uniform vec3 uColC;
        attribute float aMix;
        attribute float aRand;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 p = position;
          // Gentle harmonic pulse
          float pulse = 1.0 + 0.04 * sin(uTime * 2.0 + aRand * 12.0);
          p *= pulse;
          p.x += sin(uTime * 1.2 + aRand * 24.0) * 0.03;
          p.y += cos(uTime * 1.1 + aRand * 18.0) * 0.03;

          vec3 c1 = mix(uColA, uColB, smoothstep(0.0, 0.7, aMix));
          vColor = mix(c1, uColC, smoothstep(0.7, 1.0, aMix));

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;

          float twinkle = 0.72 + 0.28 * sin(uTime * 2.5 + aRand * 45.0);
          gl_PointSize = uSize * (0.65 + aRand * 0.85) * twinkle * (5.5 / -mv.z);
          vAlpha = 0.65 + 0.35 * twinkle;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float glow = pow(1.0 - d * 2.0, 2.1);
          gl_FragColor = vec4(vColor * (0.65 + glow * 0.85), glow * vAlpha);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    let mouseX = 0;
    let mouseY = 0;
    let visible = true;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(entry.contentRect.width, 280);
        const h = Math.max(entry.contentRect.height, 320);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    ro.observe(mount);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;

      group.rotation.y = t * 0.22 + mouseX * 0.35;
      group.rotation.x = Math.sin(t * 0.4) * 0.12 + mouseY * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-90"
    />
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="group relative flex flex-col justify-between rounded-3xl border border-line bg-surface/75 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-volt/40 hover:bg-raised/85 sm:p-7">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-ember">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <span className="rounded-full border border-line bg-ink/60 px-2.5 py-0.5 font-mono text-[10px] text-volt">
            {item.project}
          </span>
        </div>

        <blockquote className="mt-4 text-sm leading-relaxed text-paper/90 sm:text-base">
          “{item.quote}”
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <span className="bg-brand-gradient grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold uppercase text-paper shadow-brand-glow">
            {item.name[0]}
          </span>
          <div>
            <span className="block text-sm font-semibold text-paper">{item.name}</span>
            <span className="block text-xs text-mist">{item.role}</span>
          </div>
        </div>
        <Quote className="h-5 w-5 shrink-0 text-volt/40 transition-colors group-hover:text-ember" />
      </figcaption>
    </figure>
  );
}

function MarqueeColumn({
  items,
  direction,
  className = "",
}: {
  items: TestimonialItem[];
  direction: "up" | "down";
  className?: string;
}) {
  // Duplicate array twice so -50% vertical translation loops seamlessly
  const loopItems = [...items, ...items];

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div className={`${direction === "up" ? "marquee-up" : "marquee-down"} gap-5 pb-5`}>
        {loopItems.map((item, idx) => (
          <TestimonialCard key={`${item.name}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-volt">Client Voices</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.02] tracking-tight sm:mt-4 sm:text-5xl lg:text-6xl">
            Trusted by founders <span className="text-volt-gradient">worldwide.</span>
          </h2>
          <p className="mt-3 text-sm text-mist sm:mt-4 sm:text-base">
            Real feedback from the leaders we&apos;ve partnered with across healthcare, e-commerce, and mobile apps.
          </p>
        </div>

        {/* Stage with Fixed Center Three.js Particles + 3 Vertical Marquee Columns */}
        <div className="relative mt-12 h-[540px] sm:mt-16 sm:h-[640px] lg:h-[700px]">
          {/* Fixed Center Three.js Particle Core */}
          <TestimonialParticleCore />

          {/* Top & Bottom Smooth Fade Masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-ink via-ink/70 to-transparent sm:h-32"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-ink via-ink/70 to-transparent sm:h-32"
          />

          {/* 3-Column Vertical Marquee Grid:
              Left: Bottom to Top (up)
              Middle: Top to Bottom (down)
              Right: Bottom to Top (up) */}
          <div className="relative z-10 grid h-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Left Column: Bottom -> Top */}
            <MarqueeColumn items={COL_LEFT} direction="up" />

            {/* Middle Column: Top -> Bottom */}
            <MarqueeColumn items={COL_MIDDLE} direction="down" className="hidden md:block" />

            {/* Right Column: Bottom -> Top */}
            <MarqueeColumn items={COL_RIGHT} direction="up" className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

