/**
 * Procedural point-cloud shapes — every "3D model" on the site is generated
 * here with math. No external assets, no paid models.
 * Each function fills a Float32Array of length count * 3.
 */

const TAU = Math.PI * 2;
const rand = (a = -1, b = 1) => a + Math.random() * (b - a);

/**
 * 0 — The Idea: A 3D Glowing Lightbulb with curved teardrop glass envelope,
 * glowing central filament coil, threaded screw base, and radiant energy embers.
 */
export function ideaSphere(count: number) {
  const out = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.58) {
      // 1. Teardrop Glass Envelope (spherical dome transitioning into neck taper)
      const u = Math.random() * 2 - 1; // -1 to 1 along vertical axis
      const theta = Math.random() * TAU;

      if (u > -0.2) {
        // Upper spherical glass dome (center y = 0.55, radius = 1.42)
        const v = (u + 0.2) / 1.2; // 0 to 1
        const rad = Math.sqrt(Math.max(0, 1 - (v - 0.5) * (v - 0.5) * 4)) * 1.42;
        const gy = 0.55 + (v - 0.5) * 1.42;
        x = Math.cos(theta) * rad;
        y = gy;
        z = Math.sin(theta) * rad;
      } else {
        // Lower neck taper contracting into the screw base
        const t = (-0.2 - u) / 0.8; // 0 (neck top) to 1 (base top)
        const neckRadius = 1.35 * (1 - t * 0.58); // tapers from ~1.35 down to ~0.58
        const gy = -0.15 - t * 0.95; // descends from -0.15 to -1.1
        x = Math.cos(theta) * neckRadius;
        y = gy;
        z = Math.sin(theta) * neckRadius;
      }

      // Add delicate surface shimmer
      x += rand(-0.02, 0.02);
      z += rand(-0.02, 0.02);
    } else if (r < 0.78) {
      // 2. Glowing Central Filament Loop & Support Leads (glowing core inside the bulb)
      const isLead = Math.random() < 0.28;
      if (isLead) {
        // Two vertical metal wire leads rising from stem
        const side = Math.random() < 0.5 ? -0.22 : 0.22;
        const h = Math.random();
        x = side + rand(-0.02, 0.02);
        y = -0.55 + h * 0.95;
        z = rand(-0.02, 0.02);
      } else {
        // Glowing heart/M-shaped double tungsten filament coil
        const t = Math.random() * Math.PI;
        const coilAngle = Math.random() * TAU * 4;
        const fx = Math.cos(t) * 0.55;
        const fy = 0.45 + Math.sin(t) * 0.42 + Math.sin(coilAngle) * 0.06;
        const fz = Math.cos(coilAngle) * 0.08;
        x = fx;
        y = fy;
        z = fz;
      }
    } else if (r < 0.92) {
      // 3. Threaded Screw Base (E27 ribs) & Electrical Contact Tip
      const isTip = Math.random() < 0.25;
      if (isTip) {
        // Rounded bottom contact foot
        const a = Math.random() * TAU;
        const rad = Math.sqrt(Math.random()) * 0.35;
        x = Math.cos(a) * rad;
        y = -1.72 - (1 - (rad / 0.35) * (rad / 0.35)) * 0.18;
        z = Math.sin(a) * rad;
      } else {
        // Helical screw threads (3 horizontal metallic ribs)
        const t = Math.random();
        const a = Math.random() * TAU;
        const ribY = -1.12 - t * 0.52;
        // Ribbed thread wave modulation
        const threadWave = Math.sin(a * 2 + t * TAU * 3) * 0.04;
        const baseRadius = 0.56 + threadWave;
        x = Math.cos(a) * baseRadius;
        y = ribY;
        z = Math.sin(a) * baseRadius;
      }
    } else {
      // 4. Radiant Idea Sparks & Heat Aura bursting outward from the filament
      const a = Math.random() * TAU;
      const u = Math.random() * 2 - 1;
      const sRad = 1.9 + rand(0.1, 1.2);
      x = Math.cos(a) * Math.sqrt(1 - u * u) * sRad;
      y = 0.5 + u * sRad * 0.85;
      z = Math.sin(a) * Math.sqrt(1 - u * u) * sRad;
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

/**
 * 1 — Brand Identity: Complete Brand Guidelines Suite
 * Exactly what founders receive:
 * 1. Brand Guideline Document / PDF Book with folded cover corner and 'PDF' tag
 * 2. Typography Specimen: Crisp 'Aa' letterform with baseline hierarchy
 * 3. Color Palette Swatches: 4 modular color chips along the base
 * 4. Construction calipers & drafting alignment guides
 */
export function brandMark(count: number) {
  const out = new Float32Array(count * 3);

  // Document dimensions (clean golden ratio book proportion)
  const docW = 3.2;
  const docH = 4.2;
  const halfW = docW / 2;
  const halfH = docH / 2;

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.35) {
      // 1. The Brand Guideline Document / PDF Book Frame (with top-right folded corner)
      const isFoldCorner = Math.random() < 0.16;
      if (isFoldCorner) {
        // Distinct folded corner in top-right (dog-ear fold)
        const foldSize = 0.65;
        const t = Math.random();
        // Diagonal fold line
        x = (halfW - foldSize) + t * foldSize;
        y = halfH - (1 - t) * foldSize;
        z = rand(-0.02, 0.02);
      } else {
        // Document perimeter frame
        const p = Math.random() * 2 * (docW + docH);
        if (p < docW) {
          x = p - halfW;
          y = halfH;
        } else if (p < docW + docH) {
          x = halfW;
          y = halfH - (p - docW);
        } else if (p < 2 * docW + docH) {
          x = halfW - (p - docW - docH);
          y = -halfH;
        } else {
          x = -halfW;
          y = -halfH + (p - 2 * docW - docH);
        }
        z = rand(-0.02, 0.02);
      }

      // 'PDF' / 'GUIDELINES' badge indicator on the top header
      if (Math.random() < 0.22) {
        const t = Math.random();
        x = -halfW + 0.35 + t * 0.95;
        y = halfH - 0.35 + rand(-0.02, 0.02);
        z = 0.06;
      }
    } else if (r < 0.68) {
      // 2. Large Typographic 'Aa' Specimen (instantly readable brand typography symbol)
      // Centered prominently in the upper half (y ≈ 0.45)
      const isCapital = Math.random() < 0.58;

      if (isCapital) {
        // Crisp Capital 'A' (x: -0.95 to -0.25, y: -0.15 to 1.35)
        const stroke = Math.floor(Math.random() * 3);
        const t = Math.random();
        if (stroke === 0) {
          // Left diagonal leg: (-0.95, -0.15) -> (-0.6, 1.35)
          x = -0.95 + t * 0.35;
          y = -0.15 + t * 1.5;
        } else if (stroke === 1) {
          // Right diagonal leg: (-0.6, 1.35) -> (-0.25, -0.15)
          x = -0.6 + t * 0.35;
          y = 1.35 - t * 1.5;
        } else {
          // Crossbar at y ≈ 0.45
          x = -0.8 + t * 0.4;
          y = 0.42 + rand(-0.03, 0.03);
        }
      } else {
        // Lowercase 'a' (x: 0.05 to 0.75, y: -0.15 to 0.75)
        const isBowl = Math.random() < 0.65;
        if (isBowl) {
          // Circular lower bowl
          const a = Math.random() * TAU;
          x = 0.38 + Math.cos(a) * 0.32;
          y = 0.22 + Math.sin(a) * 0.34;
        } else {
          // Vertical right stem + upper hood arc
          const t = Math.random();
          if (t < 0.65) {
            // Right stem: x = 0.7
            x = 0.7 + rand(-0.02, 0.02);
            y = -0.15 + (t / 0.65) * 0.9;
          } else {
            // Upper hood curving left
            const ha = (t - 0.65) / 0.35 * Math.PI;
            x = 0.42 + Math.cos(ha) * 0.28;
            y = 0.75 + Math.sin(ha) * 0.18;
          }
        }
      }
      // Give the letters 3D embossed lift off the paper
      z = 0.18 + (Math.random() - 0.5) * 0.15;
    } else if (r < 0.88) {
      // 3. Color Palette Swatches (4 aligned brand color chips across the lower quadrant)
      // Row of 4 neat rectangular swatch chips along y ≈ -1.05
      const chipIdx = Math.floor(Math.random() * 4);
      const chipW = 0.52;
      const chipH = 0.44;
      const chipSpacing = 0.65;
      const startX = -1.0 + chipIdx * chipSpacing;

      x = startX + (Math.random() - 0.5) * chipW;
      y = -1.05 + (Math.random() - 0.5) * chipH;
      z = 0.12 + rand(-0.02, 0.02);
    } else {
      // 4. Horizontal Type Scale Rules & Alignment Grid Lines
      const lineRow = Math.floor(Math.random() * 3);
      const lineY = -1.55 - lineRow * 0.18;
      const lineLen = 2.4 - lineRow * 0.4;
      x = -halfW + 0.4 + Math.random() * lineLen;
      y = lineY + rand(-0.02, 0.02);
      z = rand(-0.02, 0.02);
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

/** Points along the outline + interior "UI blocks" of a rounded device */
function device(
  out: Float32Array,
  start: number,
  end: number,
  cx: number,
  cy: number,
  w: number,
  h: number,
  z: number
) {
  for (let i = start; i < end; i++) {
    let x: number, y: number;
    const m = Math.random();
    if (m < 0.45) {
      // Frame outline
      const p = Math.random() * 2 * (w + h);
      if (p < w) { x = p - w / 2; y = h / 2; }
      else if (p < w + h) { x = w / 2; y = h / 2 - (p - w); }
      else if (p < 2 * w + h) { x = w / 2 - (p - w - h); y = -h / 2; }
      else { x = -w / 2; y = -h / 2 + (p - 2 * w - h); }
    } else if (m < 0.6) {
      // Header bar
      x = rand(-w / 2 + 0.1, w / 2 - 0.1);
      y = h / 2 - 0.18 + rand(-0.04, 0.04);
    } else {
      // Content cards grid
      const cols = w > 2 ? 3 : 1;
      const rows = 3;
      const c = Math.floor(Math.random() * cols);
      const r = Math.floor(Math.random() * rows);
      const cw = (w - 0.3) / cols;
      const ch = (h - 0.55) / rows;
      x = -w / 2 + 0.15 + c * cw + rand(0.05, cw - 0.05);
      y = h / 2 - 0.4 - r * ch - rand(0.05, ch - 0.05);
    }
    out[i * 3] = cx + x;
    out[i * 3 + 1] = cy + y;
    out[i * 3 + 2] = z + rand(-0.02, 0.02);
  }
}

/** 2 — UI/UX: a laptop screen and a phone side-by-side */
export function uiDevices(count: number) {
  const out = new Float32Array(count * 3);
  const split = Math.floor(count * 0.68);
  device(out, 0, split, -0.6, 0.1, 3.4, 2.2, 0);
  device(out, split, count, 1.85, -0.25, 1.0, 2.0, 0.6);
  return out;
}

/**
 * 3 (Option 2) — Develop: 3D Full-Stack Architecture & Cloud Database System
 * Top: Isometric Frontend UI/DOM plane
 * Center: Interconnected API routing mesh & microservice nodes
 * Bottom: Multi-tier Cylindrical Relational Database stack with syncing data streams
 */
export function codeHelix(count: number) {
  const out = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.32) {
      // 1. Top Layer: Frontend App / DOM Grid Plane (y ≈ 1.35)
      // Rotated 45 degrees into an isometric glass architectural plane
      const planeW = 2.8;
      const planeD = 2.8;
      const u = (Math.random() - 0.5) * planeW;
      const v = (Math.random() - 0.5) * planeD;

      // Isometric projection tilt
      const cos = Math.cos(Math.PI / 4);
      const sin = Math.sin(Math.PI / 4);
      x = u * cos - v * sin;
      y = 1.35 + rand(-0.03, 0.03);
      z = u * sin + v * cos;

      // Grid wireframe lines & modular component blocks
      const onEdge = Math.random() < 0.35;
      if (onEdge) {
        // Snap towards grid borders
        const col = Math.floor(Math.random() * 4) - 1.5;
        x = col * 0.72 + rand(-0.02, 0.02);
      }
    } else if (r < 0.65) {
      // 2. Middle Layer: API Microservice Mesh & Logic Nodes (y ≈ -0.2 to 0.7)
      const isNode = Math.random() < 0.45;
      if (isNode) {
        // 6 Cluster Hubs (API Endpoints, Auth, GraphQL, Gateway)
        const nodeIdx = Math.floor(Math.random() * 6);
        const a = (nodeIdx / 6) * TAU;
        const rad = 1.25;
        const nodeY = (nodeIdx % 2 === 0 ? 0.45 : 0.05);
        const spread = Math.random() * 0.16;
        const sa = Math.random() * TAU;

        x = Math.cos(a) * rad + Math.cos(sa) * spread;
        y = nodeY + rand(-0.06, 0.06);
        z = Math.sin(a) * rad + Math.sin(sa) * spread;
      } else {
        // Interconnecting API request pipelines linking Frontend to DB
        const a = Math.random() * TAU;
        const t = Math.random();
        const rad = 0.55 + Math.random() * 0.75;
        // Helical communication flow between microservices
        x = Math.cos(a + t * Math.PI) * rad;
        y = 1.15 - t * 1.55;
        z = Math.sin(a + t * Math.PI) * rad;
      }
    } else if (r < 0.90) {
      // 3. Bottom Layer: 3D Stacked Cylindrical Database Discs (SQL/NoSQL Storage: y ≈ -0.7 to -1.8)
      const tier = Math.floor(Math.random() * 3); // 3 stacked discs
      const tierCenterY = -0.75 - tier * 0.48;
      const isRim = Math.random() < 0.72;
      const a = Math.random() * TAU;
      const discR = 1.35;

      if (isRim) {
        // Cylindrical outer wall of database platter
        x = Math.cos(a) * discR;
        y = tierCenterY + rand(-0.14, 0.14);
        z = Math.sin(a) * discR;
      } else {
        // Top disc face surface
        const rad = Math.sqrt(Math.random()) * discR;
        x = Math.cos(a) * rad;
        y = tierCenterY + 0.14;
        z = Math.sin(a) * rad;
      }
    } else {
      // 4. Vertical Bus / Data Sync Fibers connecting all 3 tiers
      const busAngle = (Math.floor(Math.random() * 4) / 4) * TAU + Math.PI / 4;
      const busR = 0.95;
      const t = Math.random();
      x = Math.cos(busAngle) * busR + rand(-0.04, 0.04);
      y = -1.9 + t * 3.3; // Streams vertically through entire full-stack
      z = Math.sin(busAngle) * busR + rand(-0.04, 0.04);
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

/**
 * 3 (Option 1 Alternative) — Develop: 3D Developer IDE Terminal & Syntax Matrix
 * You can switch to this anytime by replacing `codeHelix` with `codeHelixTerminal` in the SHAPES array.
 */
export function codeHelixTerminal(count: number) {
  const out = new Float32Array(count * 3);
  const W = 4.2;
  const H = 2.8;
  const halfW = W / 2;
  const halfH = H / 2;

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.28) {
      const isPerimeter = Math.random() < 0.65;
      if (isPerimeter) {
        const p = Math.random() * 2 * (W + H);
        if (p < W) { x = p - halfW; y = halfH; }
        else if (p < W + H) { x = halfW; y = halfH - (p - W); }
        else if (p < 2 * W + H) { x = halfW - (p - W - H); y = -halfH; }
        else { x = -halfW; y = -halfH + (p - 2 * W - H); }
      } else {
        const isDot = Math.random() < 0.45;
        if (isDot) {
          const dotIdx = Math.floor(Math.random() * 3);
          const dotX = -halfW + 0.35 + dotIdx * 0.25;
          const a = Math.random() * TAU;
          const rad = Math.random() * 0.06;
          x = dotX + Math.cos(a) * rad;
          y = halfH - 0.22 + Math.sin(a) * rad;
        } else {
          x = rand(-halfW + 0.1, halfW - 0.1);
          y = halfH - 0.42 + rand(-0.02, 0.02);
        }
      }
      z = rand(-0.02, 0.02);
    } else if (r < 0.58) {
      const bracket = Math.floor(Math.random() * 3);
      const t = Math.random();
      const scale = 0.95;
      if (bracket === 0) {
        const isUpper = Math.random() < 0.5;
        x = isUpper ? (0.6 - t * 0.45 * scale) : (0.6 - (1 - t) * 0.45 * scale);
        y = isUpper ? (0.1 + (1 - t) * 0.65 * scale) : (0.1 - t * 0.65 * scale);
      } else if (bracket === 1) {
        x = 0.78 + t * 0.38 * scale;
        y = -0.65 + t * 1.35 * scale;
      } else {
        const isUpper = Math.random() < 0.5;
        x = isUpper ? (1.35 + t * 0.45 * scale) : (1.35 + (1 - t) * 0.45 * scale);
        y = isUpper ? (0.1 + (1 - t) * 0.65 * scale) : (0.1 - t * 0.65 * scale);
      }
      z = 0.32 + rand(-0.06, 0.06);
    } else if (r < 0.86) {
      const row = Math.floor(Math.random() * 6);
      const rowY = halfH - 0.75 - row * 0.34;
      const indents = [0.15, 0.38, 0.62, 0.62, 0.38, 0.15];
      const lengths = [1.2, 0.95, 1.45, 1.1, 0.85, 0.65];
      const startX = -halfW + 0.25 + indents[row];
      const len = lengths[row];
      const t = Math.random();
      x = startX + t * len;
      y = rowY + rand(-0.02, 0.02);
      z = rand(-0.02, 0.02);
    } else {
      const isCursor = Math.random() < 0.25;
      if (isCursor) {
        x = -halfW + 0.4 + rand(0, 0.22);
        y = -halfH + 0.32 + rand(-0.02, 0.02);
        z = 0.05;
      } else {
        x = rand(-halfW + 0.2, halfW - 0.2);
        y = rand(-halfH + 0.2, halfH - 0.5);
        z = (Math.random() - 0.5) * 0.5;
      }
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

/**
 * 4 — Grow (SEO, Performance & Analytics):
 * Clean 3D Volumetric Bar Chart with Ascending Growth Curve
 * 1. 6 Solid 3D Bar Columns rising in staircase progression
 * 2. Illuminated top caps and distinct column edge frames
 * 3. Sweeping 3D ascending trendline connecting the bar summits with an arrow
 * 4. Perspective 3D floor coordinate grid
 */
export function growthChart(count: number) {
  const out = new Float32Array(count * 3);
  const bars = 6;
  const barW = 0.42;
  const barD = 0.42;

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.62) {
      // 1. 6 Volumetric 3D Bar Columns (y from -1.4 upward)
      const b = Math.floor(Math.random() * bars);
      const bx = -1.85 + b * 0.74;
      const bRatio = b / (bars - 1);
      // Progressive height curve from 0.55 to 2.85
      const bH = 0.55 + Math.pow(bRatio, 1.4) * 2.3;

      const isTopCap = Math.random() < 0.35;
      if (isTopCap) {
        // Flat illuminated ceiling cap of the bar
        x = bx + (Math.random() - 0.5) * barW;
        y = -1.4 + bH + rand(-0.02, 0.02);
        z = (Math.random() - 0.5) * barD;
      } else {
        // Vertical column faces
        const face = Math.floor(Math.random() * 4);
        const t = Math.random();
        const halfW = barW / 2;
        const halfD = barD / 2;
        if (face === 0) { x = bx - halfW; z = (t - 0.5) * barD; }
        else if (face === 1) { x = bx + halfW; z = (t - 0.5) * barD; }
        else if (face === 2) { x = bx + (t - 0.5) * barW; z = -halfD; }
        else { x = bx + (t - 0.5) * barW; z = halfD; }
        y = -1.4 + Math.random() * bH;
      }
    } else if (r < 0.82) {
      // 2. 3D Growth Trendline Arching Over the Bar Peaks
      const t = Math.random(); // 0 to 1
      const curveX = -1.85 + t * (5 * 0.74);
      const curveY = -1.4 + (0.55 + Math.pow(t, 1.4) * 2.3) + 0.35; // floats slightly above caps
      const curveZ = Math.sin(t * Math.PI) * 0.25;

      const isArrow = Math.random() < 0.18 && t > 0.88;
      if (isArrow) {
        // Arrowhead peak pointing up-right
        const aT = Math.random();
        const wing = Math.random() < 0.5 ? 1 : -1;
        x = curveX - aT * 0.35;
        y = curveY - aT * 0.35 * wing;
        z = curveZ;
      } else {
        // Glowing trendline stroke
        x = curveX + rand(-0.04, 0.04);
        y = curveY + rand(-0.04, 0.04);
        z = curveZ + rand(-0.04, 0.04);
      }
    } else if (r < 0.94) {
      // 3. Perspective 3D Baseline Floor Grid
      const isXLine = Math.random() < 0.5;
      if (isXLine) {
        const lineIdx = Math.floor(Math.random() * 5);
        x = rand(-2.4, 2.4);
        y = -1.45;
        z = -1.0 + lineIdx * 0.5;
      } else {
        const lineIdx = Math.floor(Math.random() * 7);
        x = -2.1 + lineIdx * 0.7;
        y = -1.45;
        z = rand(-1.0, 1.0);
      }
    } else {
      // 4. Data metric sparkle particles
      x = rand(-2.2, 2.2);
      y = -1.2 + Math.random() * 3.0;
      z = (Math.random() - 0.5) * 1.5;
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

/**
 * 5 — Launch: 3D Rocket Liftoff with Exhaust Flame & Billowing Smoke Clouds
 * Represents:
 * 1. Aerodynamic Rocket Fuselage & Parabolic Nose Cone launched upwards (y ≈ 0.2 to 2.4)
 * 2. 3 Swept Delta Stabilizer Booster Fins at 120° angles around base
 * 3. High-velocity exhaust fire jet column bursting downward from nozzle (y ≈ -0.85 to 0.2)
 * 4. Massive billowing launchpad smoke & cloud puffs billowing outward at the bottom (y ≈ -2.2 to -0.6)
 * 5. Expanding staging pressure shockwave rings & launch spark embers
 */
export function launchRocket(count: number) {
  const out = new Float32Array(count * 3);

  // 6 Billowing Smoke Cloud Cluster Spheres on the Launchpad Floor
  const cloudCenters: [number, number, number, number][] = [
    [-0.95, -1.6, 0.45, 0.85],
    [0.95, -1.6, 0.45, 0.85],
    [0.0, -1.75, -0.85, 0.95],
    [-1.45, -1.85, -0.3, 0.8],
    [1.45, -1.85, -0.3, 0.8],
    [0.0, -1.45, 0.95, 0.75],
  ];

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.35) {
      // 1. Ascending Rocket Fuselage & Nose Cone (y from 0.2 to 2.4)
      const isNose = Math.random() < 0.45;
      if (isNose) {
        // Sharp Parabolic Nose Cone (y: 1.3 to 2.4)
        const t = Math.random(); // 0 at base, 1 at tip
        const coneY = 1.3 + t * 1.1;
        const coneR = 0.38 * (1 - Math.pow(t, 1.25));
        const a = Math.random() * TAU;
        x = Math.cos(a) * coneR;
        y = coneY;
        z = Math.sin(a) * coneR;
      } else {
        // Cylindrical Rocket Body (y: 0.2 to 1.3)
        const a = Math.random() * TAU;
        const bodyR = 0.38;
        x = Math.cos(a) * bodyR;
        y = 0.2 + Math.random() * 1.1;
        z = Math.sin(a) * bodyR;
      }
    } else if (r < 0.48) {
      // 2. 3 Swept Booster Fins at 120° around rocket base (y ≈ 0.15 to 0.65)
      const finIdx = Math.floor(Math.random() * 3);
      const finAngle = (finIdx / 3) * TAU;
      const t = Math.random(); // 0 at base root, 1 at outer fin wing tip
      const finR = 0.38 + t * 0.58;
      const finY = 0.15 + (1 - t) * 0.55; // sweeps down and outwards
      x = Math.cos(finAngle) * finR + rand(-0.03, 0.03);
      y = finY + rand(-0.03, 0.03);
      z = Math.sin(finAngle) * finR + rand(-0.03, 0.03);
    } else if (r < 0.68) {
      // 3. High-Velocity Exhaust Flame Jet / Fire Cone (y from -0.85 to 0.2)
      // Shooting straight down from the rocket nozzle
      const t = Math.random(); // 0 at nozzle, 1 at bottom tip
      const flameY = 0.2 - t * 1.05;
      // Inverted cone: narrow at nozzle, expanding slightly then tapering to fire tip
      const flameR = (0.22 + Math.sin(t * Math.PI) * 0.26) * (0.8 + Math.random() * 0.4);
      const a = Math.random() * TAU;
      x = Math.cos(a) * flameR;
      y = flameY;
      z = Math.sin(a) * flameR;
    } else if (r < 0.90) {
      // 4. Massive Billowing Launch Smoke & Cloud Plume Volume (y from -2.2 to -0.6)
      // Multi-sphere volumetrics puffing out from the bottom
      const cIdx = Math.floor(Math.random() * cloudCenters.length);
      const [cx, cy, cz, cRad] = cloudCenters[cIdx];

      // Random points distributed inside/on surface of each smoke sphere
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * TAU;
      const rad = Math.cbrt(Math.random()) * cRad; // uniform 3D sphere volume
      const sx = rad * Math.sqrt(1 - u * u) * Math.cos(theta);
      const sy = rad * u * 0.75; // slightly flattened clouds
      const sz = rad * Math.sqrt(1 - u * u) * Math.sin(theta);

      x = cx + sx;
      y = cy + sy;
      z = cz + sz;
    } else {
      // 5. Expanding Launch Shockwave Rings & Speed Debris Sparks
      const isRing = Math.random() < 0.65;
      if (isRing) {
        // Horizontal pressure shockwave ring
        const ringY = -0.55 + (Math.random() < 0.5 ? 0 : -0.7);
        const ringR = 1.6 + Math.random() * 0.9;
        const a = Math.random() * TAU;
        x = Math.cos(a) * ringR;
        y = ringY + rand(-0.04, 0.04);
        z = Math.sin(a) * ringR;
      } else {
        // Upward launch sparkles & embers bursting from ignition
        const a = Math.random() * TAU;
        const sRad = 0.6 + Math.random() * 1.8;
        x = Math.cos(a) * sRad;
        y = -1.2 + Math.random() * 2.8;
        z = Math.sin(a) * sRad * 0.8;
      }
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

// Backwards-compatibility alias
export const launchGalaxy = launchRocket;

export const SHAPES = [ideaSphere, brandMark, uiDevices, codeHelixTerminal, launchRocket, growthChart];

