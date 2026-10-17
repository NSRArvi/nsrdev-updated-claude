/**
 * Shared mutable state between GSAP scroll timelines and the Three.js scene.
 * Kept outside React so scroll updates never trigger re-renders.
 */
export const sceneState = {
  /** 0 = Idea, 1 = Brand, 2 = UI/UX, 3 = Develop, 4 = Grow/SEO, 5 = Launch */
  morph: 0,
  /** Horizontal offset of the 3D particle core (2.4 on Hero right side, 0 in center during Journey) */
  offsetX: 2.4,
  /** Normalised pointer, -1..1 */
  mouseX: 0,
  mouseY: 0,
  /** Canvas visibility 0..1 (faded out after the journey) */
  visibility: 1,
};

export const STAGE_COUNT = 6;
