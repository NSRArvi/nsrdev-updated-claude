"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ServiceKind = "brand" | "uiux" | "development" | "marketing";

const TAU = Math.PI * 2;
const rand = (a = -1, b = 1) => a + Math.random() * (b - a);

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

/**
 * Procedural 3D particle sculpture tailored to each discipline:
 * - Brand: 3D Fibonacci Golden Spiral + Interlocking Golden Drafting Rings & Logo Calipers
 * - UI/UX: 3D Layered Interface Canvas Stack with floating wireframe modals & cursor crosshair
 * - Development: 3D Code Matrix Cylinder & Syntax brackets with glowing logic nodes
 * - Marketing: 3D Exponential Analytics Surge Spiral with target bullseye & performance rings
 */
function buildServiceGeometry(kind: ServiceKind, count: number) {
  const pos = new Float32Array(count * 3);
  const mixAttr = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0, cMix = 0;
    const r = Math.random();

    if (kind === "brand") {
      // 01 Brand Identity: Golden Ratio Spiral & Caliper Construction
      if (r < 0.45) {
        // Logarithmic golden ratio spiral
        const maxTheta = 3.8 * Math.PI;
        const t = Math.pow(Math.random(), 0.65) * maxTheta;
        const b = 0.175;
        const spiralR = 0.16 * Math.exp(b * t);
        x = Math.cos(t) * spiralR - 0.2;
        y = Math.sin(t) * spiralR - 0.15;
        z = (Math.random() - 0.5) * 0.35 * (1 + spiralR * 0.25);
        cMix = t / maxTheta;
      } else if (r < 0.78) {
        // Interlocking geometric drafting circles
        const cIdx = Math.floor(Math.random() * 3);
        const radii = [1.1, 1.85, 2.6];
        const rad = radii[cIdx];
        const a = Math.random() * TAU;
        x = Math.cos(a) * rad - 0.2;
        y = Math.sin(a) * rad - 0.15;
        z = rand(-0.06, 0.06);
        cMix = cIdx / 2;
      } else {
        // Precision caliper crosshairs
        const isHoriz = Math.random() < 0.5;
        if (isHoriz) {
          x = rand(-2.4, 2.4);
          y = -0.15 + rand(-0.02, 0.02);
        } else {
          x = -0.2 + rand(-0.02, 0.02);
          y = rand(-2.2, 2.2);
        }
        z = rand(-0.04, 0.04);
        cMix = 0.85;
      }
    } else if (kind === "uiux") {
      // 02 UI/UX Design: 3D Layered Glass Interface Planes with Hovering Cards & Cursors
      if (r < 0.58) {
        // 3 Stacked Isometric UI Planes
        const layer = Math.floor(Math.random() * 3);
        const layerZ = -0.6 + layer * 0.6; // depth separation
        const w = 3.2 - layer * 0.4;
        const h = 2.1 - layer * 0.25;
        const p = Math.random() * 2 * (w + h);
        let lx = 0, ly = 0;
        if (p < w) { lx = p - w / 2; ly = h / 2; }
        else if (p < w + h) { lx = w / 2; ly = h / 2 - (p - w); }
        else if (p < 2 * w + h) { lx = w / 2 - (p - w - h); ly = -h / 2; }
        else { lx = -w / 2; ly = -h / 2 + (p - 2 * w - h); }

        // Isometric projection tilt
        const cos = Math.cos(0.24);
        const sin = Math.sin(0.24);
        x = lx * cos - layerZ * sin;
        y = ly;
        z = lx * sin + layerZ * cos;
        cMix = layer / 2;
      } else if (r < 0.84) {
        // Floating UI components & wireframe buttons
        const compIdx = Math.floor(Math.random() * 4);
        const cx = (compIdx % 2 === 0 ? -0.8 : 0.8) + rand(-0.35, 0.35);
        const cy = (compIdx < 2 ? 0.45 : -0.45) + rand(-0.25, 0.25);
        x = cx;
        y = cy;
        z = 0.55 + rand(-0.04, 0.04);
        cMix = 0.6;
      } else {
        // Interactive cursor indicator arrow
        const t = Math.random();
        x = 0.6 + t * 0.45;
        y = -0.2 - t * 0.45;
        z = 0.85;
        cMix = 1.0;
      }
    } else if (kind === "development") {
      // 03 Development: 3D Code Helix & Syntax Matrix
      if (r < 0.55) {
        // Double helix strands with code connection rungs
        const strand = i % 2;
        const t = (i / count) * 4.2 * Math.PI;
        const helixR = 1.35;
        const helixH = 4.2;
        const angle = t + (strand === 0 ? 0 : Math.PI);
        x = Math.cos(angle) * helixR;
        y = -helixH / 2 + (t / (4.2 * Math.PI)) * helixH;
        z = Math.sin(angle) * helixR;
        cMix = strand === 0 ? 0.2 : 0.8;
      } else if (r < 0.85) {
        // Prominent </> Code Syntax Brackets
        const bracket = Math.floor(Math.random() * 3);
        const t = Math.random();
        if (bracket === 0) {
          // Left bracket <
          const isTop = Math.random() < 0.5;
          x = isTop ? (-0.9 + t * 0.45) : (-0.9 + (1 - t) * 0.45);
          y = isTop ? (0.0 + (1 - t) * 0.65) : (0.0 - t * 0.65);
        } else if (bracket === 1) {
          // Slash /
          x = -0.25 + t * 0.5;
          y = -0.7 + t * 1.4;
        } else {
          // Right bracket >
          const isTop = Math.random() < 0.5;
          x = isTop ? (0.45 + (1 - t) * 0.45) : (0.45 + t * 0.45);
          y = isTop ? (0.0 + (1 - t) * 0.65) : (0.0 - t * 0.65);
        }
        z = 0.35 + rand(-0.04, 0.04);
        cMix = 0.95;
      } else {
        // Floating microservice logic nodes
        const a = Math.random() * TAU;
        const rad = 1.65 + Math.random() * 0.6;
        x = Math.cos(a) * rad;
        y = rand(-1.6, 1.6);
        z = Math.sin(a) * rad;
        cMix = 0.5;
      }
    } else {
      // 04 SEO & Marketing: Exponential Surge Curve & Target Metric Crosshairs
      if (r < 0.45) {
        // 3D Exponential Hockey-Stick Growth Wave
        const t = Math.random();
        const curveX = -2.1 + t * 4.2;
        const curveY = -1.4 + Math.pow(t, 2.4) * 3.2;
        const curveZ = Math.sin(t * Math.PI) * 0.45;
        const a = Math.random() * TAU;
        const thick = 0.08 + t * 0.06;
        x = curveX + Math.cos(a) * thick;
        y = curveY + Math.sin(a) * thick;
        z = curveZ + rand(-thick, thick);
        cMix = t;
      } else if (r < 0.75) {
        // Concentric Target / Bullseye Conversion Rings at peak
        const ringIdx = 1 + Math.floor(Math.random() * 3);
        const a = Math.random() * TAU;
        const rad = ringIdx * 0.45;
        x = 1.6 + Math.cos(a) * rad;
        y = 1.4 + Math.sin(a) * rad;
        z = rand(-0.04, 0.04);
        cMix = 0.9;
      } else {
        // Rising organic traffic data pillar floor
        const barIdx = Math.floor(Math.random() * 5);
        const bx = -1.6 + barIdx * 0.8;
        const bHeight = 0.4 + (barIdx / 4) * 1.6;
        x = bx + (Math.random() - 0.5) * 0.28;
        y = -1.5 + Math.random() * bHeight;
        z = (Math.random() - 0.5) * 0.28;
        cMix = 0.3;
      }
    }

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    mixAttr[i] = cMix;
  }

  return { pos, mixAttr };
}

export default function ServiceParticleScene({
  kind,
  primaryVar = "volt",
  secondaryVar = "ember",
}: {
  kind: ServiceKind;
  primaryVar?: "ion" | "ember" | "volt" | "aqua";
  secondaryVar?: "ion" | "ember" | "volt" | "aqua";
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 2200 : 3800;
    const palette = readThemePalette();

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const rect = mount.getBoundingClientRect();
    const width = Math.max(rect.width, 260);
    const height = Math.max(rect.height, 260);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.6);

    const { pos, mixAttr } = buildServiceGeometry(kind, COUNT);
    const rnd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rnd[i] = Math.random();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aMix", new THREE.BufferAttribute(mixAttr, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));

    const colorA = new THREE.Color(palette[primaryVar]);
    const colorB = new THREE.Color(palette[secondaryVar]);
    const colorC = new THREE.Color(palette.paper);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: (isMobile ? 4.5 : 5.8) * dpr },
        uColA: { value: colorA },
        uColB: { value: colorB },
        uColC: { value: colorC },
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
          // Organic breathing pulse
          float pulse = 1.0 + 0.035 * sin(uTime * 2.2 + aRand * 14.0);
          p *= pulse;
          p.x += sin(uTime * 1.3 + aRand * 28.0) * 0.025;
          p.y += cos(uTime * 1.1 + aRand * 20.0) * 0.025;

          vec3 c = mix(uColA, uColB, aMix);
          if (aRand > 0.88) {
            c = mix(c, uColC, 0.45);
          }
          vColor = c;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;

          float twinkle = 0.75 + 0.25 * sin(uTime * 2.8 + aRand * 40.0);
          gl_PointSize = uSize * (0.65 + aRand * 0.75) * twinkle * (5.5 / -mv.z);
          vAlpha = 0.65 + 0.35 * twinkle;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float glow = pow(1.0 - d * 2.0, 2.2);
          gl_FragColor = vec4(vColor * (0.7 + glow * 0.8), glow * vAlpha);
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
      const cr = mount.getBoundingClientRect();
      mouseX = ((e.clientX - cr.left) / cr.width) * 2 - 1;
      mouseY = ((e.clientY - cr.top) / cr.height) * 2 - 1;
    };
    mount.addEventListener("pointermove", onMove);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(entry.contentRect.width, 260);
        const h = Math.max(entry.contentRect.height, 260);
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

      group.rotation.y = t * 0.2 + mouseX * 0.3;
      group.rotation.x = Math.sin(t * 0.35) * 0.12 - mouseY * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onMove);
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

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none h-full w-full select-none"
    />
  );
}

