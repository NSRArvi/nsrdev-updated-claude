"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SHAPES } from "./shapes";
import { sceneState, STAGE_COUNT } from "./sceneState";

/** Reads CSS custom properties defined in app/globals.css so 3D particles stay 100% synced with the theme */
function getThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  const ion = read("--color-ion", "#8b3dff");
  const ember = read("--color-ember", "#ec38bc");
  const volt = read("--color-volt", "#c084fc");
  const aqua = read("--color-aqua", "#38bdf8");
  const mist = read("--color-mist", "#9aa1ad");

  const stagePalette: [string, string][] = [
    [ion, ember],   // 0 Idea
    [ember, volt],  // 1 Brand
    [ion, aqua],    // 2 UI/UX
    [aqua, volt],   // 3 Develop
    [ember, aqua],  // 4 Grow
    [ion, ember],   // 5 Launch
  ];

  return { stagePalette, mist };
}

const vertex = /* glsl */ `
  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uColA[${STAGE_COUNT}];
  uniform vec3 uColB[${STAGE_COUNT}];
  attribute vec3 p0; attribute vec3 p1; attribute vec3 p2;
  attribute vec3 p3; attribute vec3 p4; attribute vec3 p5;
  attribute float aRand;
  varying vec3 vColor;
  varying float vAlpha;

  vec3 shape(int i) {
    if (i == 0) return p0;
    if (i == 1) return p1;
    if (i == 2) return p2;
    if (i == 3) return p3;
    if (i == 4) return p4;
    return p5;
  }
  vec3 col(int i) {
    for (int k = 0; k < ${STAGE_COUNT}; k++) {
      if (k == i) return mix(uColA[k], uColB[k], aRand);
    }
    return uColA[0];
  }

  void main() {
    float m = clamp(uMorph, 0.0, ${(STAGE_COUNT - 1).toFixed(1)});
    int i = int(min(floor(m), ${(STAGE_COUNT - 2).toFixed(1)}));
    float f = m - float(i);
    // stagger per particle so shapes "flow" instead of snapping
    float t = smoothstep(0.0, 1.0, clamp(f * 1.6 - aRand * 0.6, 0.0, 1.0));

    vec3 a = shape(i);
    vec3 b = shape(i + 1);
    vec3 pos = mix(a, b, t);

    // swirl during transition for a more organic morph
    float swirl = sin(t * 3.14159) * (0.6 + aRand);
    pos.x += sin(aRand * 40.0 + uTime) * 0.25 * swirl;
    pos.y += cos(aRand * 30.0 + uTime) * 0.25 * swirl;
    // idle breathing
    pos += 0.025 * vec3(sin(uTime * 1.3 + aRand * 20.0), cos(uTime + aRand * 15.0), sin(uTime * 0.7 + aRand * 9.0));

    vColor = mix(col(i), col(i + 1), t);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + aRand * 50.0);
    gl_PointSize = uSize * (0.6 + aRand) * twinkle * (6.0 / -mv.z);
    vAlpha = 0.55 + 0.45 * twinkle;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.2);
    gl_FragColor = vec4(vColor * (0.6 + glow), glow * vAlpha);
  }
`;

export default function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const isMobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = isMobile ? 4000 : 9000;
    const { stagePalette, mist } = getThemeColors();

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 13 : 8);

    // Geometry: one attribute per stage shape
    const geo = new THREE.BufferGeometry();
    const shapes = SHAPES.map((fn) => fn(COUNT));
    geo.setAttribute("position", new THREE.BufferAttribute(shapes[0].slice(), 3));
    shapes.forEach((arr, i) => geo.setAttribute(`p${i}`, new THREE.BufferAttribute(arr, 3)));
    const rnd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rnd[i] = Math.random();
    geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorph: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: (isMobile ? 5 : 6) * renderer.getPixelRatio() },
        uColA: { value: stagePalette.map((p) => new THREE.Color(p[0])) },
        uColB: { value: stagePalette.map((p) => new THREE.Color(p[1])) },
      },
    });

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // Faint starfield for depth/parallax
    const starGeo = new THREE.BufferGeometry();
    const starCount = isMobile ? 400 : 1200;
    const stars = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) stars[i] = (Math.random() - 0.5) * 40;
    starGeo.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    const starField = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 0.04, color: new THREE.Color(mist), transparent: true, opacity: 0.5, depthWrite: false })
    );
    scene.add(starField);

    const onMove = (e: PointerEvent) => {
      sceneState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let morph = 0, rx = 0, ry = 0, gx = isMobile ? 0 : sceneState.offsetX, raf = 0, running = true;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      const t = clock.getElapsedTime();
      // ease towards scroll-driven target for buttery motion
      morph += (sceneState.morph - morph) * 0.08;
      mat.uniforms.uMorph.value = morph;
      mat.uniforms.uTime.value = reduced ? 0 : t;

      // Smoothly position particle core on right side in Hero, center in Journey
      const isSmallScreen = window.innerWidth < 1024;
      const targetX = isSmallScreen ? 0 : sceneState.offsetX;
      gx += (targetX - gx) * 0.08;
      group.position.x = gx;

      // On mobile/tablet: lift 3D core in Hero (above text) and center it in the open window between Top Story & Bottom Card in Journey
      const heroBlend = Math.max(0, 1 - morph * 1.8);
      const targetY = isSmallScreen ? 0.32 + heroBlend * 0.65 : 0;
      group.position.y += (targetY - group.position.y) * 0.08;

      const targetScale = isSmallScreen ? 0.72 + heroBlend * 0.1 : 1;
      const curScale = group.scale.x + (targetScale - group.scale.x) * 0.08;
      group.scale.setScalar(curScale);

      // Icon stages (Brain Lightbulb 0, Brand 1, UI 2) face forward towards camera with responsive pointer tilt; volumetric ones spin.
      const stage = Math.round(morph);
      const spin = stage <= 2 ? Math.sin(t * 0.4) * 0.08 : t * 0.12;
      const tilt = stage === 5 ? 0.55 : stage === 4 ? 0.25 : 0;
      ry += (sceneState.mouseX * 0.35 + (reduced ? 0 : spin) - ry) * 0.05;
      rx += (sceneState.mouseY * 0.2 + tilt - rx) * 0.05;
      group.rotation.set(rx, ry, 0);

      starField.rotation.y = t * 0.01;
      starField.position.x = -sceneState.mouseX * 0.4;
      starField.position.y = sceneState.mouseY * 0.4;

      mount.style.opacity = String(sceneState.visibility);
      renderer.render(scene, camera);
    };
    loop();

    // Pause rendering when the tab is hidden or canvas faded out
    const onVis = () => (running = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose(); mat.dispose(); starGeo.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500" />;
}
