"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export type WorkKind =
  | "crm"
  | "ecommerce-beauty"
  | "mobile-app"
  | "ecommerce-luxury"
  | "global-trade"
  | "agritech"
  | "medical-bridge";

const TAU = Math.PI * 2;
const rand = (a = -1, b = 1) => a + Math.random() * (b - a);

/** Reads colors dynamically from app/globals.css CSS variables */
function readThemePalette() {
  const s = getComputedStyle(document.documentElement);
  const get = (k: string, fb: string) => s.getPropertyValue(k).trim() || fb;
  return {
    ion: get("--color-ion", "#8b3dff"),
    ember: get("--color-ember", "#ec38bc"),
    volt: get("--color-volt", "#c084fc"),
    aqua: get("--color-aqua", "#38bdf8"),
    paper: get("--color-paper", "#f2f2ee"),
  };
}

/** Helper: distributes particles on a rounded-feeling rectangular frame */
function rectFrame(w: number, h: number, z: number) {
  const p = Math.random() * 2 * (w + h);
  let x = 0;
  let y = 0;
  if (p < w) {
    x = p - w / 2;
    y = h / 2;
  } else if (p < w + h) {
    x = w / 2;
    y = h / 2 - (p - w);
  } else if (p < 2 * w + h) {
    x = w / 2 - (p - w - h);
    y = -h / 2;
  } else {
    x = -w / 2;
    y = -h / 2 + (p - 2 * w - h);
  }
  return [x, y, z] as const;
}

/**
 * Generates procedural 3D point cloud positions + normalized color mix (0..1)
 * tailored to each work category.
 */
function buildWorkGeometry(kind: WorkKind, count: number) {
  const pos = new Float32Array(count * 3);
  const mixAttr = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    let x = 0,
      y = 0,
      z = 0,
      cMix = Math.random();
    const r = Math.random();

    if (kind === "crm") {
      // Website & CRM (Bumrungrad Discover):
      // 3D Browser Dashboard + Global Healthcare CRM Network Sphere + Medical Cross Pulse
      if (r < 0.36) {
        if (Math.random() < 0.72) {
          [x, y, z] = rectFrame(3.7, 2.25, -0.25);
        } else {
          x = rand(-1.75, 1.75);
          y = 0.82 + rand(-0.03, 0.03);
          z = -0.25;
        }
        cMix = 0.15;
      } else if (r < 0.62) {
        const row = Math.floor(Math.random() * 4);
        x = rand(-1.6, -0.25);
        y = 0.45 - row * 0.38 + rand(-0.08, 0.08);
        z = -0.05 + rand(-0.04, 0.04);
        cMix = 0.45;
      } else if (r < 0.86) {
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * TAU;
        const rad = Math.sqrt(1 - u * u) * 0.78;
        x = 0.85 + Math.cos(theta) * rad;
        y = -0.08 + u * 0.78;
        z = 0.25 + Math.sin(theta) * rad;
        cMix = 0.85;
      } else {
        const horiz = Math.random() < 0.5;
        x = -0.95 + (horiz ? rand(-0.28, 0.28) : rand(-0.09, 0.09));
        y = -0.05 + (horiz ? rand(-0.09, 0.09) : rand(-0.28, 0.28));
        z = 0.42 + rand(-0.04, 0.04);
        cMix = 1.0;
      }
    } else if (kind === "ecommerce-beauty") {
      // Ecommerce Website (Laminax Skincare & Beauty):
      // 3D Storefront Frame + Floating 3D Shopping Bag / Skincare Bottle + Orbital Glow Rings
      if (r < 0.32) {
        [x, y, z] = rectFrame(3.6, 2.2, -0.35);
        cMix = 0.15;
      } else if (r < 0.65) {
        if (Math.random() < 0.76) {
          const bw = 1.05,
            bh = 1.15,
            bd = 0.55;
          const face = Math.floor(Math.random() * 3);
          if (face === 0) {
            x = (Math.random() < 0.5 ? -0.5 : 0.5) * bw;
            y = rand(-bh / 2, bh / 2) - 0.15;
            z = rand(-bd / 2, bd / 2) + 0.2;
          } else if (face === 1) {
            x = rand(-bw / 2, bw / 2);
            y = (Math.random() < 0.5 ? -0.5 : 0.5) * bh - 0.15;
            z = rand(-bd / 2, bd / 2) + 0.2;
          } else {
            x = rand(-bw / 2, bw / 2);
            y = rand(-bh / 2, bh / 2) - 0.15;
            z = (Math.random() < 0.5 ? -0.5 : 0.5) * bd + 0.2;
          }
        } else {
          const a = Math.random() * Math.PI;
          x = Math.cos(a) * 0.32;
          y = 0.42 + Math.sin(a) * 0.34;
          z = 0.2 + rand(-0.04, 0.04);
        }
        cMix = 0.75;
      } else if (r < 0.85) {
        const side = Math.random() < 0.5 ? -1.18 : 1.18;
        const row = Math.random() < 0.5 ? 0.32 : -0.38;
        x = side + rand(-0.34, 0.34);
        y = row + rand(-0.22, 0.22);
        z = -0.1 + rand(-0.03, 0.03);
        cMix = 0.45;
      } else {
        const a = Math.random() * TAU;
        const rad = 1.35 + rand(-0.08, 0.08);
        x = Math.cos(a) * rad;
        y = Math.sin(a) * 0.42;
        z = Math.sin(a) * rad * 0.55 + 0.15;
        cMix = 1.0;
      }
    } else if (kind === "mobile-app") {
      // Mobile App (The Caro App — Borderless Parcel Delivery):
      // 3D Smartphone Chassis + Live GPS Route Arc + 3D Isometric Parcel Cube + Radar Ripples
      if (r < 0.44) {
        const zLayer = Math.random() < 0.75 ? 0.12 : -0.12;
        if (Math.random() < 0.82) {
          [x, y, z] = rectFrame(1.42, 2.55, zLayer);
        } else {
          x = rand(-0.25, 0.25);
          y = (Math.random() < 0.5 ? 1.12 : -1.12) + rand(-0.02, 0.02);
          z = 0.14;
        }
        cMix = 0.2;
      } else if (r < 0.68) {
        const s = 0.34;
        const edge = Math.floor(Math.random() * 12);
        const t = rand(-s, s);
        const edges: [number, number, number][] = [
          [t, -s, -s], [t, s, -s], [-s, t, -s], [s, t, -s],
          [t, -s, s],  [t, s, s],  [-s, t, s],  [s, t, s],
          [-s, -s, t], [s, -s, t], [-s, s, t],  [s, s, t],
        ];
        const [ex, ey, ez] = edges[edge];
        x = ex;
        y = ey + 0.08;
        z = ez + 0.48;
        cMix = 0.9;
      } else if (r < 0.86) {
        const t = Math.random();
        x = (t - 0.5) * 3.1;
        y = Math.sin(t * Math.PI) * 0.85 - 0.35;
        z = Math.sin(t * Math.PI) * 0.55 + 0.2;
        cMix = 0.65;
      } else {
        const city = Math.random() < 0.5 ? -1.55 : 1.55;
        const a = Math.random() * TAU;
        const rad = 0.18 + Math.random() * 0.22;
        x = city + Math.cos(a) * rad;
        y = -0.35 + Math.sin(a) * rad;
        z = 0.2;
        cMix = 1.0;
      }
    } else if (kind === "ecommerce-luxury") {
      // Ecommerce Website (Smart Kitchen & Bath — Luxury Australian Showroom):
      // Multi-panel Architectural Showroom Grid + 3D Isometric Room Cube + Chandelier/Fixture Halo
      if (r < 0.35) {
        [x, y, z] = rectFrame(3.75, 2.25, -0.3);
        cMix = 0.15;
      } else if (r < 0.68) {
        const s = 0.68;
        const edge = Math.floor(Math.random() * 12);
        const t = rand(-s, s);
        const edges: [number, number, number][] = [
          [t, -s, -s], [t, s, -s], [-s, t, -s], [s, t, -s],
          [t, -s, s],  [t, s, s],  [-s, t, s],  [s, t, s],
          [-s, -s, t], [s, -s, t], [-s, s, t],  [s, s, t],
        ];
        const [ex, ey, ez] = edges[edge];
        const cos = Math.cos(Math.PI / 4);
        const sin = Math.sin(Math.PI / 4);
        x = ex * cos - ez * sin - 0.45;
        y = ey * 0.85 - 0.05;
        z = ex * sin + ez * cos + 0.25;
        cMix = 0.75;
      } else if (r < 0.88) {
        const row = Math.floor(Math.random() * 3);
        x = rand(0.45, 1.55);
        y = 0.55 - row * 0.52 + rand(-0.16, 0.16);
        z = 0.05 + rand(-0.04, 0.04);
        cMix = 0.45;
      } else {
        const a = Math.random() * TAU;
        const rad = 0.52 + rand(-0.03, 0.03);
        x = -0.45 + Math.cos(a) * rad;
        y = 0.72 + rand(-0.02, 0.02);
        z = 0.25 + Math.sin(a) * rad;
        cMix = 1.0;
      }
    } else if (kind === "global-trade") {
      // B2B Export-Import Web Platform (Dynamic Exim):
      // Web Portal Frame + 3D Latitude/Longitude Trade Globe + Orbital Shipping Arcs & Cargo Container
      if (r < 0.3) {
        [x, y, z] = rectFrame(3.7, 2.25, -0.32);
        cMix = 0.15;
      } else if (r < 0.68) {
        // 3D Meridian/Latitude Trade Globe
        const latRing = i % 6;
        const a = Math.random() * TAU;
        const R = 0.92;
        if (latRing < 3) {
          // Latitude rings
          const phi = ((latRing - 1) * 0.55);
          const ringR = Math.cos(phi) * R;
          x = Math.cos(a) * ringR;
          y = Math.sin(phi) * R;
          z = Math.sin(a) * ringR + 0.15;
        } else {
          // Longitude meridians
          const rot = (latRing * Math.PI) / 3;
          const lx = Math.cos(a) * R;
          const ly = Math.sin(a) * R;
          x = lx * Math.cos(rot);
          y = ly;
          z = lx * Math.sin(rot) + 0.15;
        }
        cMix = 0.65;
      } else if (r < 0.88) {
        // Intercontinental shipping & supply chain orbital ring
        const a = Math.random() * TAU;
        const rad = 1.48 + rand(-0.05, 0.05);
        x = Math.cos(a) * rad;
        y = Math.sin(a) * 0.48;
        z = Math.sin(a) * rad * 0.5 + 0.2;
        cMix = 0.9;
      } else {
        // Floating 3D Cargo / Garment Accessories Container nodes on sides
        const side = Math.random() < 0.5 ? -1.35 : 1.35;
        x = side + rand(-0.22, 0.22);
        y = rand(-0.65, 0.65);
        z = 0.1 + rand(-0.1, 0.1);
        cMix = 1.0;
      }
    } else if (kind === "agritech") {
      // AgriTech & Seed Export Platform (Home Grow BD):
      // Web Frame + 3D Botanical Phyllotaxis Seed/Leaf Spiral + R&D DNA Helix Strands
      if (r < 0.3) {
        [x, y, z] = rectFrame(3.65, 2.2, -0.32);
        cMix = 0.15;
      } else if (r < 0.72) {
        // Golden-angle Botanical Seed & Leaf Rosette (Phyllotaxis)
        const idx = i % 900;
        const norm = idx / 900;
        const angle = idx * 2.399963229728653; // Golden angle
        const rad = Math.sqrt(norm) * 1.22;
        x = Math.cos(angle) * rad;
        y = Math.sin(angle) * rad * 0.75 - 0.05;
        // Dome-like organic elevation
        z = Math.cos(norm * Math.PI * 0.5) * 0.55 + 0.05;
        cMix = 0.35 + norm * 0.55;
      } else {
        // Rising Hybrid Seed R&D Helix / Sprout Stem on flanks
        const side = Math.random() < 0.5 ? -1.42 : 1.42;
        const t = Math.random();
        const a = t * TAU * 1.5;
        x = side + Math.cos(a) * 0.18;
        y = (t - 0.5) * 1.75;
        z = Math.sin(a) * 0.18 + 0.15;
        cMix = 1.0;
      }
    } else {
      // Cross-Border Healthcare & Medical Tourism (SP ChinaBangla Mediaid):
      // Web Portal + Twin Country Hubs (Bangladesh <-> China) + 3D Medical Bridge Arcs + Heartbeat Pulse
      if (r < 0.3) {
        [x, y, z] = rectFrame(3.7, 2.25, -0.32);
        cMix = 0.15;
      } else if (r < 0.62) {
        // Twin Country Healthcare Spheres (Bangladesh on left, Yunnan China on right)
        const hub = Math.random() < 0.5 ? -1.05 : 1.05;
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * TAU;
        const rad = Math.sqrt(1 - u * u) * 0.52;
        x = hub + Math.cos(theta) * rad;
        y = -0.18 + u * 0.52;
        z = 0.15 + Math.sin(theta) * rad;
        cMix = hub < 0 ? 0.45 : 0.8;
      } else if (r < 0.85) {
        // Dual Cross-Border Medical Referral Bridge Arcs connecting the two hubs
        const t = Math.random();
        const upper = Math.random() < 0.65;
        x = (t - 0.5) * 2.1;
        y = (upper ? 1 : -0.6) * Math.sin(t * Math.PI) * 0.75 + (upper ? -0.05 : -0.2);
        z = Math.sin(t * Math.PI) * 0.55 + 0.25;
        cMix = 0.95;
      } else {
        // ECG Heartbeat / Medical Cross Emblem in the center bridge
        const t = rand(-0.65, 0.65);
        x = t;
        // ECG spike waveform in the middle
        const spike =
          Math.abs(t) < 0.18
            ? Math.sin(t * 35.0) * 0.38
            : rand(-0.02, 0.02);
        y = 0.12 + spike;
        z = 0.45;
        cMix = 1.0;
      }
    }

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    mixAttr[i] = cMix;
  }

  return { pos, mixAttr };
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uSize;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  attribute float aMix;
  attribute float aRand;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Subtle organic breathing + extra energy on card hover
    float energy = 0.022 + uHover * 0.035;
    p.x += sin(uTime * 1.6 + aRand * 25.0) * energy;
    p.y += cos(uTime * 1.3 + aRand * 19.0) * energy;
    p.z += sin(uTime * 1.1 + aRand * 13.0) * energy;

    vColor = mix(uColorA, uColorB, aMix);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float pulse = 0.75 + 0.25 * sin(uTime * 2.4 + aRand * 40.0);
    gl_PointSize = uSize * (0.65 + aRand * 0.85) * pulse * (4.8 / -mv.z);
    vAlpha = (0.62 + 0.38 * pulse) * (0.85 + uHover * 0.15);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = pow(1.0 - d * 2.0, 2.0);
    gl_FragColor = vec4(vColor * (0.7 + core * 0.8), core * vAlpha);
  }
`;

export default function WorkParticleScene({
  kind,
  primaryVar,
  secondaryVar,
}: {
  kind: WorkKind;
  primaryVar: "ion" | "ember" | "volt" | "aqua";
  secondaryVar: "ion" | "ember" | "volt" | "aqua";
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 1600 : 2800;
    const palette = readThemePalette();

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const rect = mount.getBoundingClientRect();
    const width = Math.max(rect.width || 0, isMobile ? 260 : 320);
    const height = Math.max(rect.height || 0, isMobile ? 180 : 220);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.6);

    const { pos, mixAttr } = buildWorkGeometry(kind, COUNT);
    const rnd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rnd[i] = Math.random();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aMix", new THREE.BufferAttribute(mixAttr, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uSize: { value: (isMobile ? 4.2 : 5.2) * dpr },
        uColorA: { value: new THREE.Color(palette[primaryVar]) },
        uColorB: { value: new THREE.Color(palette[secondaryVar]) },
      },
    });

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    let targetRotX = 0.08;
    let targetRotY = -0.18;
    let curRotX = targetRotX;
    let curRotY = targetRotY;
    let hoverTarget = 0;
    let hoverCur = 0;
    let visible = true;
    let raf = 0;

    const parentCard = mount.closest(".work-card") as HTMLElement | null;

    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.28;
      hoverTarget = 1;
    };

    const onLeave = () => {
      targetRotX = 0.08;
      targetRotY = -0.18;
      hoverTarget = 0;
    };

    const targetEl = parentCard || mount;
    targetEl.addEventListener("pointermove", onMove);
    targetEl.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(entry.contentRect.width, 200);
        const h = Math.max(entry.contentRect.height, 150);
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

      hoverCur += (hoverTarget - hoverCur) * 0.08;
      mat.uniforms.uHover.value = hoverCur;

      const idleY = Math.sin(t * 0.55) * 0.22;
      const idleX = Math.cos(t * 0.4) * 0.08;
      curRotY += (targetRotY + idleY - curRotY) * 0.07;
      curRotX += (targetRotX + idleX - curRotX) * 0.07;

      group.rotation.set(curRotX, curRotY, 0);
      const scale = 1 + hoverCur * 0.06;
      group.scale.setScalar(scale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      targetEl.removeEventListener("pointermove", onMove);
      targetEl.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [kind, primaryVar, secondaryVar]);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
}
