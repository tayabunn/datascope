"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { KESSLER_CARDS, renderKesslerCardBody } from "@/components/home/KesslerCards";
import { Zap, Database, Users, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const PALETTE = [
  "#0284c7",
  "#0ea5e9",
  "#1e6aff",
  "#38bdf8",
  "#60a5fa",
  "#93c5fd",
  "#e0f2fe",
] as const;

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function hash(a: number, b: number, c: number): number {
  let h =
    (Math.imul(a, 374761393) +
      Math.imul(b, 668265263) +
      Math.imul(c, 2147483647)) |
    0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export default function QuantumScannerHero() {
  const [isDragging, setIsDragging] = useState(false);

  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gapProbeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const belt = beltRef.current;
    const canvas = canvasRef.current;
    const gapProbe = gapProbeRef.current;
    if (!belt || !canvas || !gapProbe) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    let cw = 662;
    let ch = 421;
    let gap = 68;
    let span = cw + gap;
    let period = span * KESSLER_CARDS.length;
    let Lx = belt.getBoundingClientRect().width / 2 || window.innerWidth / 2;
    let beltW = window.innerWidth;
    let beltH = ch + 140;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let off = 0;
    let vel = 0;
    let hover = 0;
    let hoverTarget = 0;
    let dragging = false;
    let lastX = 0;
    let lastPointerT = 0;
    let activeCardIdx = -1;
    let shownNum = 0;
    const sparks: Spark[] = [];

    const measure = (isInit = false) => {
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        const rect = firstCard.getBoundingClientRect();
        if (rect.width > 0) cw = rect.width;
        if (rect.height > 0) ch = rect.height;
      }
      const gapRect = gapProbe.getBoundingClientRect();
      if (gapRect.width > 0) gap = gapRect.width;

      span = cw + gap;
      period = span * KESSLER_CARDS.length;

      const beltRect = belt.getBoundingClientRect();
      Lx = (beltRect.width || window.innerWidth) / 2;
      beltW = beltRect.width || window.innerWidth;
      beltH = beltRect.height || ch + 140;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(beltW * dpr);
      canvas.height = Math.round(beltH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (isInit) {
        off = Lx - 0.62 * cw;
        vel = reducedMotion ? 0 : -0.075 * window.innerWidth;
      }
    };

    measure(true);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (reducedMotion) {
        sparks.length = 0;
        vel = 0;
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => measure(false);
    window.addEventListener("resize", handleResize);

    const onPointerEnter = () => {
      hoverTarget = 1;
    };
    const onPointerLeave = () => {
      hoverTarget = 0;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      setIsDragging(true);
      lastX = e.clientX;
      lastPointerT = performance.now();
      belt.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dtMs = Math.max(8, now - lastPointerT);
      off += dx;
      const instantVel = (dx / dtMs) * 1000;
      vel = instantVel * 0.8 + vel * 0.2;
      lastX = e.clientX;
      lastPointerT = now;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      setIsDragging(false);
      if (belt.hasPointerCapture(e.pointerId)) {
        belt.releasePointerCapture(e.pointerId);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        vel += -e.deltaX * 6;
      }
    };

    belt.addEventListener("pointerenter", onPointerEnter);
    belt.addEventListener("pointerleave", onPointerLeave);
    belt.addEventListener("pointerdown", onPointerDown);
    belt.addEventListener("pointermove", onPointerMove);
    belt.addEventListener("pointerup", onPointerUp);
    belt.addEventListener("pointercancel", onPointerUp);
    belt.addEventListener("wheel", onWheel, { passive: false });

    let rafId = 0;
    let prevTime = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prevTime) / 1000));
      prevTime = now;
      const t = now / 1000;

      // Ease hover
      if (hover < hoverTarget) {
        hover = Math.min(hoverTarget, hover + dt * 4);
      } else if (hover > hoverTarget) {
        hover = Math.max(hoverTarget, hover - dt * 4);
      }

      const autoSpeed = reducedMotion ? 0 : -0.075 * window.innerWidth;
      const targetSpeed = autoSpeed * (1 - 0.65 * hover);

      if (!dragging) {
        vel += (targetSpeed - vel) * (1 - Math.exp(-2.2 * dt));
        off += vel * dt;
      }

      ctx.clearRect(0, 0, beltW, beltH);

      let crossingIdx = -1;
      let crossingCut = 0;
      let hasActiveCut = false;

      const R = 0.3 * cw;
      const rows = Math.ceil(ch / 3);
      const tStep = reducedMotion ? 0 : Math.floor(t * 9) + 97;

      for (let i = 0; i < KESSLER_CARDS.length; i++) {
        const x = mod(off + i * span + span, period) - span;
        const cut = clamp(Lx - x, 0, cw);

        const cardEl = cardRefs.current[i];
        const codeEl = codeRefs.current[i];

        if (cardEl) {
          cardEl.style.transform = `translate3d(${x}px, 0, 0)`;
          if (cut > 0) {
            cardEl.style.clipPath = `inset(0 0 0 ${cut}px round 0 16px 16px 0)`;
            const mask = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`;
            cardEl.style.maskImage = mask;
            cardEl.style.webkitMaskImage = mask;
          } else {
            cardEl.style.clipPath = "inset(0 0 0 0 round 16px)";
            cardEl.style.maskImage = "";
            cardEl.style.webkitMaskImage = "";
          }
        }

        if (codeEl) {
          codeEl.style.transform = `translate3d(${x}px, 0, 0)`;
          if (cut > 0) {
            codeEl.style.visibility = "visible";
            codeEl.style.clipPath = `inset(0 ${cw - cut}px 0 0)`;
          } else {
            codeEl.style.visibility = "hidden";
            codeEl.style.clipPath = "";
          }
        }

        if (cut > 0 && cut < cw) {
          crossingIdx = i;
          crossingCut = cut;
        }

        // Draw dissolve FX where cut > 0 and card right edge is past Lx
        if (cut > 0 && x + cw > Lx) {
          hasActiveCut = true;

          // 1. DataScope Blue Haze
          const hazeW = Math.min(150, x + cw - Lx);
          if (hazeW > 0) {
            const grad = ctx.createLinearGradient(Lx, 0, Lx + 150, 0);
            grad.addColorStop(0, "rgba(30, 106, 255, 0.4)");
            grad.addColorStop(1, "rgba(30, 106, 255, 0)");
            ctx.fillStyle = grad;
            ctx.fillRect(Lx, 70, hazeW, ch);
          }

          // 2. Dithered particles fixed to the card surface
          const gxStart = Math.max(0, Math.floor((Lx - x) / 3));
          const gxEnd = Math.min(
            Math.floor(cw / 3),
            Math.ceil((Lx + R - x) / 3)
          );

          for (let gx = gxStart; gx <= gxEnd; gx++) {
            const sx = x + gx * 3;
            const d = sx - Lx;
            if (d < 0 || d > R) continue;

            const p = Math.pow(1 - d / R, 1.7);

            for (let row = -5; row <= rows + 5; row++) {
              let prob: number;
              if (row >= 0 && row < rows) {
                prob = p * 0.92;
              } else {
                const distOut = row < 0 ? -row : row - rows + 1;
                prob = p * 0.16 * Math.max(0, 1 - distOut / 5);
              }

              if (hash(gx, row, i) >= prob) continue;
              if (!reducedMotion && hash(gx, row, tStep) < 0.22) continue;

              const h2 = hash(row, gx, i + 31);
              const colorIdx =
                d < 10 ? 4 + Math.floor(h2 * 3) : Math.floor(h2 * h2 * 7);
              const size = 1.1 + h2 * 1.7;
              const jx = reducedMotion ? 0 : (hash(gx, row, i + 7) - 0.5) * 1.6;
              const jy = reducedMotion
                ? 0
                : (hash(row, gx, i + 13) - 0.5) * 1.6;

              ctx.fillStyle = PALETTE[colorIdx];
              ctx.fillRect(sx + jx, 70 + row * 3 + jy, size, size);
            }
          }
        }
      }

      // 3. Free floating sparks with physics
      if (!reducedMotion) {
        if (hasActiveCut) {
          for (let s = 0; s < 3; s++) {
            if (Math.random() < 0.7) {
              sparks.push({
                x: Lx + Math.random() * 30,
                y: 70 - 10 + Math.random() * (ch + 20),
                vx: -30 + Math.random() * 70 + vel * 0.6,
                vy: (Math.random() - 0.5) * 50,
                size: 0.8 + Math.random() * 1.8,
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
                life: 0.3 + Math.random() * 0.8,
              });
            }
          }
        }

        for (let s = sparks.length - 1; s >= 0; s--) {
          const sp = sparks[s];
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          sp.life -= dt;
          if (sp.life <= 0) {
            sparks.splice(s, 1);
            continue;
          }
          ctx.globalAlpha = Math.min(1, sp.life * 2.2);
          ctx.fillStyle = sp.color;
          ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
        }
        ctx.globalAlpha = 1;
      }

      // 4. Live Counter Badge
      if (crossingIdx !== -1 && numRef.current && pctRef.current) {
        const card = KESSLER_CARDS[crossingIdx];
        const saved = card.original - card.distilled;
        const progress = crossingCut / cw;
        const target = Math.round(saved * progress);

        if (activeCardIdx !== crossingIdx) {
          activeCardIdx = crossingIdx;
          shownNum = target;
          pctRef.current.textContent = `${Math.round(
            (saved / card.original) * 100
          )}% faster`;
        } else {
          shownNum += (target - shownNum) * Math.min(1, dt * 14);
        }

        numRef.current.textContent =
          "\u2212" + Math.round(shownNum).toLocaleString("en-US") + " ms";
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
      belt.removeEventListener("pointerenter", onPointerEnter);
      belt.removeEventListener("pointerleave", onPointerLeave);
      belt.removeEventListener("pointerdown", onPointerDown);
      belt.removeEventListener("pointermove", onPointerMove);
      belt.removeEventListener("pointerup", onPointerUp);
      belt.removeEventListener("pointercancel", onPointerUp);
      belt.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section className="relative w-full bg-white text-[#001225] pt-8 pb-16 overflow-hidden select-none">
      {/* Hidden probe to measure CSS --gap in px across breakpoints */}
      <div
        ref={gapProbeRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "var(--gap)",
          height: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      />

      {/* Two-Column Hero Copy */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs font-semibold tracking-wider uppercase text-slate-500 mb-3">
            DATA INTELLIGENCE
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans tracking-tight text-[#001225] leading-[1.05] font-normal">
            Instant Data Discovery.
            <br />
            <em
              className="font-newsreader italic font-normal text-[#1e6aff] tracking-[-0.025em]"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              Zero Spreadsheets Crashing.
            </em>
          </h1>
        </div>
        <div className="lg:col-span-5 flex flex-col items-start lg:pt-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Search, filter, and analyze 100,000+ business contracts in milliseconds.
            Eliminate spreadsheet crashes and query bottlenecks with one centralized,
            audit-ready platform.
          </p>
          <div className="mt-5">
            <Link
              href="/contracts"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#001225] hover:bg-[#1e6aff] text-white text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              Explore Datascope
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Conveyor Belt Stage */}
      <div
        ref={beltRef}
        className={`distill-belt${isDragging ? " is-dragging" : ""}`}
        aria-label="Interactive page-to-code conveyor belt"
      >
        {/* Floating Latency Reduction Badge */}
        <div className="badge" aria-live="polite">
          <span className="badge-label">Latency reduction</span>
          <div className="badge-pill">
            <span className="badge-num" ref={numRef}>
              &minus;48,200 ms
            </span>
            <span className="badge-pct" ref={pctRef}>
              94% faster
            </span>
          </div>
        </div>

        {/* Laser Scanner Line */}
        <div className="scan" aria-hidden="true">
          <b />
          <i />
        </div>

        {/* Left Side: Dissolved HTML / AST Code */}
        <div className="codes" aria-hidden="true">
          {KESSLER_CARDS.map((card, i) => (
            <div
              key={`${card.id}-code`}
              className="code"
              ref={(el) => {
                codeRefs.current[i] = el;
              }}
            >
              <pre className="code-html">{card.html}</pre>
              <pre className="code-meta">{card.meta}</pre>
            </div>
          ))}
        </div>

        {/* Right Side: High-End Showcase Cards */}
        <div className="cards">
          {KESSLER_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`card card--${card.id}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {renderKesslerCardBody(card)}
            </div>
          ))}
        </div>

        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="fx" aria-hidden="true" />
      </div>

      {/* Enterprise Metrics Ribbon Below Belt */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-mono font-medium mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>SEARCH LATENCY</span>
            </div>
            <div className="text-2xl font-bold tracking-tight text-[#001225] font-sans">
              &lt; 20ms
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Instant Sub-Second Lookups
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-mono font-medium mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>DATA CAPACITY</span>
            </div>
            <div className="text-2xl font-bold tracking-tight text-[#001225] font-sans">
              100,000+
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Records Handled Smoothly
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center gap-2 text-sky-600 text-xs font-mono font-medium mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>SELF-SERVE ACCESS</span>
            </div>
            <div className="text-2xl font-bold tracking-tight text-[#001225] font-sans">
              0 Code
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              No SQL or Engineers Needed
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-mono font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AUDIT TRAIL</span>
            </div>
            <div className="text-2xl font-bold tracking-tight text-[#001225] font-sans">
              100%
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Tracked &amp; Immutable Logs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
