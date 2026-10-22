"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { brandMark, uiDevices, codeHelixTerminal, growthChart } from "../three/shapes";

export type ServiceShapeKey = "brand" | "uiux" | "development" | "marketing";

const SHAPE_BUILDERS: Record<ServiceShapeKey, (count: number) => Float32Array> = {
  brand: brandMark,
  uiux: uiDevices,
  development: codeHelixTerminal,
  marketing: growthChart,
};

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

export default function ServiceParticle({
  shape,
  primaryVar = "volt",
  secondaryVar = "ember",
}: {
  shape: ServiceShapeKey;
  primaryVar?: "ion" | "ember" | "volt" | "aqua";
  secondaryVar?: "ion" | "ember" | "volt" | "aqua";
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 3200 : 5400;
    const palette = readThemePalette();

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const rect = mount.getBoundingClientRect();
    const width = Math.max(rect.width, 280);
    const height = Math.max(rect.height, 280);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.8);

    // Reusing the exact shape builders from ProcessJourney!
    const builder = SHAPE_BUILDERS[shape] || brandMark;
    const pos = builder(COUNT);

    const rnd = new Float32Array(COUNT);
    const aMix = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      rnd[i] = Math.random();
      // Distance from center mix
      const px = pos[i * 3];
      const py = pos[i * 3 + 1];
      const pz = pos[i * 3 + 2];
      const dist = Math.sqrt(px * px + py * py + pz * pz);
      aMix[i] = Math.min(1.0, Math.max(0.0, dist / 2.8));
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aMix", new THREE.BufferAttribute(aMix, 1));
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
          // Organic breathing oscillation
          float pulse = 1.0 + 0.03 * sin(uTime * 2.0 + aRand * 12.0);
          p *= pulse;
          p.x += sin(uTime * 1.2 + aRand * 24.0) * 0.02;
          p.y += cos(uTime * 1.0 + aRand * 18.0) * 0.02;

          vec3 c = mix(uColA, uColB, aMix);
          if (aRand > 0.86) {
            c = mix(c, uColC, 0.5);
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
        const w = Math.max(entry.contentRect.width, 280);
        const h = Math.max(entry.contentRect.height, 280);
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

      group.rotation.y = t * 0.18 + mouseX * 0.35;
      group.rotation.x = Math.sin(t * 0.3) * 0.1 - mouseY * 0.2;

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
  }, [shape, primaryVar, secondaryVar]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none h-full w-full select-none"
    />
  );
}

