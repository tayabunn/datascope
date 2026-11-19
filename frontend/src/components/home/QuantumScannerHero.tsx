"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Zap,
  FileSpreadsheet,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Database,
  ArrowUpRight,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
} from "lucide-react";
import FluidWaveCanvas from "./FluidWaveCanvas";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface ContractDeal {
  id: string;
  title: string;
  company: string;
  country: string;
  category: string;
  status: string;
  revenue: string;
  profit: string;
  margin: string;
  priority: string;
  sqlSnippet: string[];
}

const CONTRACT_CARDS: ContractDeal[] = [
  {
    id: "REC-055594",
    title: "Healthcare Regulatory EHR Integration Pipeline",
    company: "Orion Technologies",
    country: "Canada",
    category: "Healthcare",
    status: "Active",
    revenue: "$364,054.88",
    profit: "+$90,131.40",
    margin: "24.8%",
    priority: "Urgent",
    sqlSnippet: [
      "SELECT * FROM contracts",
      "WHERE pg_trgm.similarity(title, 'EHR') > 0.35",
      "  AND status = 'ACTIVE' AND country = 'Canada'",
      "-- Inverted GIN Index Scan: 14.2ms [0.00ms lock]",
      "-- Rows matched: 1,420 (Zero memory spill)",
    ],
  },
  {
    id: "REC-031706",
    title: "High-Frequency Algorithmic Execution Platform",
    company: "Jupiter Industries",
    country: "Brazil",
    category: "Fintech",
    status: "Active",
    revenue: "$222,098.33",
    profit: "+$83,112.00",
    margin: "37.4%",
    priority: "High",
    sqlSnippet: [
      "SELECT deal_id, rev_cents, profit_margin",
      "FROM partitions_q4 WHERE category = 'Fintech'",
      "  ORDER BY net_profit DESC LIMIT 50;",
      "-- B-Tree Composite Index checkout: 0.8ms",
      "-- 60 FPS Virtualized DOM Pipeline: 12.1ms",
    ],
  },
  {
    id: "REC-028237",
    title: "Telecom 5G Core Network Analytics Framework",
    company: "Summit Analytics",
    country: "Netherlands",
    category: "Telecommunications",
    status: "Active",
    revenue: "$938,246.02",
    profit: "+$258,521.55",
    margin: "27.5%",
    priority: "Urgent",
    sqlSnippet: [
      "EXPLAIN ANALYZE SELECT sum(rev)",
      "FROM contracts WHERE region = 'Netherlands'",
      "  AND trigram(title) % 'Core Network';",
      "-- Trigram GIN ops hit rate: 99.8%",
      "-- PGBouncer pool latency: 0.4ms",
    ],
  },
  {
    id: "REC-099182",
    title: "Enterprise Data Warehouse Consolidation",
    company: "Nova Solutions GmbH",
    country: "Germany",
    category: "Cloud Infrastructure",
    status: "Active",
    revenue: "$841,366.54",
    profit: "+$229,549.95",
    margin: "27.3%",
    priority: "Urgent",
    sqlSnippet: [
      "SELECT c.*, a.audit_hash, a.timestamp",
      "FROM contracts c JOIN audit_ledger a ON c.id=a.cid",
      "WHERE c.country = 'Germany' AND c.rev > 500000;",
      "-- Immutable Audit Verification: 100% Validated",
      "-- Total Execution Time: 16.4ms P99",
    ],
  },
];

// Spark color palette tailored to Genesis Cyan/Blue/Emerald
const SPARK_PALETTE = [
  "#38bdf8",
  "#1e6aff",
  "#60a5fa",
  "#10b981",
  "#93c5fd",
  "#ffffff",
  "#0284c7",
];

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
  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeDealIdx, setActiveDealIdx] = useState(0);
  const [latencySaved, setLatencySaved] = useState("-94.8%");

  useEffect(() => {
    const belt = beltRef.current;
    const canvas = canvasRef.current;
    if (!belt || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    let cw = 540;
    let ch = 310;
    let gap = 48;
    let span = cw + gap;
    let period = span * CONTRACT_CARDS.length;
    let Lx = window.innerWidth / 2;
    let beltW = window.innerWidth;
    let beltH = ch + 100;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let off = 0;
    let vel = 0;
    let hover = 0;
    let hoverTarget = 0;
    let dragging = false;
    let startX = 0;
    let lastX = 0;

    const sparks: Spark[] = [];

    const measure = (isInit = false) => {
      if (!belt || !canvas) return;
      const beltRect = belt.getBoundingClientRect();
      beltW = beltRect.width || window.innerWidth;
      beltH = beltRect.height || ch + 100;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Responsive card width
      if (beltW < 640) {
        cw = Math.min(beltW * 0.88, 380);
        ch = 290;
        gap = 24;
      } else if (beltW < 1024) {
        cw = 460;
        ch = 300;
        gap = 36;
      } else {
        cw = 540;
        ch = 310;
        gap = 48;
      }

      span = cw + gap;
      period = span * CONTRACT_CARDS.length;
      Lx = beltW / 2;

      canvas.width = Math.round(beltW * dpr);
      canvas.height = Math.round(beltH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (isInit) {
        off = Lx - 0.5 * cw;
        vel = reducedMotion ? 0 : -0.065 * beltW;
      }
    };

    measure(true);
    window.addEventListener("resize", () => measure(false));

    // Pointer events for dragging & hover
    const onPointerEnter = () => {
      hoverTarget = 1;
    };
    const onPointerLeave = () => {
      hoverTarget = 0;
      dragging = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      vel = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      off += dx;
      vel = dx * 40;
    };
    const onPointerUp = () => {
      dragging = false;
    };

    belt.addEventListener("pointerenter", onPointerEnter);
    belt.addEventListener("pointerleave", onPointerLeave);
    belt.addEventListener("pointerdown", onPointerDown);
    belt.addEventListener("pointermove", onPointerMove);
    belt.addEventListener("pointerup", onPointerUp);
    belt.addEventListener("pointercancel", onPointerUp);

    let rafId = 0;
    let prevTime = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prevTime) / 1000));
      prevTime = now;
      const t = now / 1000;

      // Ease hover slowdown
      if (hover < hoverTarget) {
        hover = Math.min(hoverTarget, hover + dt * 4);
      } else if (hover > hoverTarget) {
        hover = Math.max(hoverTarget, hover - dt * 4);
      }

      const autoSpeed = reducedMotion ? 0 : -0.065 * beltW;
      const targetSpeed = autoSpeed * (1 - 0.7 * hover);

      if (!dragging) {
        vel += (targetSpeed - vel) * (1 - Math.exp(-2.2 * dt));
        off += vel * dt;
      }

      ctx.clearRect(0, 0, beltW, beltH);

      const R = 0.28 * cw;
      const rows = Math.ceil(ch / 3);
      const tStep = reducedMotion ? 0 : Math.floor(t * 10) + 97;

      for (let i = 0; i < CONTRACT_CARDS.length; i++) {
        const x = mod(off + i * span + span, period) - span;
        const cut = clamp(Lx - x, 0, cw);

        const cardEl = cardRefs.current[i];
        const codeEl = codeRefs.current[i];

        if (cardEl) {
          cardEl.style.width = `${cw}px`;
          cardEl.style.height = `${ch}px`;
          cardEl.style.transform = `translate3d(${x}px, 0, 0)`;

          if (cut > 0) {
            cardEl.style.clipPath = `inset(0 0 0 ${cut}px)`;
            const mask = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 22}px)`;
            cardEl.style.maskImage = mask;
            cardEl.style.webkitMaskImage = mask;
          } else {
            cardEl.style.clipPath = "";
            cardEl.style.maskImage = "";
            cardEl.style.webkitMaskImage = "";
          }
        }

        if (codeEl) {
          codeEl.style.width = `${cw}px`;
          codeEl.style.height = `${ch}px`;
          codeEl.style.transform = `translate3d(${x}px, 0, 0)`;

          if (cut > 0) {
            codeEl.style.visibility = "visible";
            codeEl.style.clipPath = `inset(0 ${cw - cut}px 0 0)`;
          } else {
            codeEl.style.visibility = "hidden";
            codeEl.style.clipPath = "";
          }
        }

        // Draw particle dissolve effect around laser scanner line
        if (cut > 0 && x + cw > Lx) {
          // 1. Quantum Cyan Laser Haze
          const hazeW = Math.min(120, x + cw - Lx);
          if (hazeW > 0) {
            const grad = ctx.createLinearGradient(Lx, 0, Lx + 120, 0);
            grad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
            grad.addColorStop(0.3, "rgba(30, 106, 255, 0.25)");
            grad.addColorStop(1, "rgba(30, 106, 255, 0)");
            ctx.fillStyle = grad;
            ctx.fillRect(Lx, 50, hazeW, ch);
          }

          // 2. Dithered Sparks on the cut line
          const gxStart = Math.max(0, Math.floor((Lx - x) / 3));
          const gxEnd = Math.min(Math.floor(cw / 3), Math.ceil((Lx + R - x) / 3));

          for (let gx = gxStart; gx <= gxEnd; gx++) {
            const sx = x + gx * 3;
            const d = sx - Lx;
            if (d < 0 || d > R) continue;

            const p = Math.pow(1 - d / R, 1.8);

            for (let row = -3; row <= rows + 3; row++) {
              let prob: number;
              if (row >= 0 && row < rows) {
                prob = p * 0.94;
              } else {
                const distOut = row < 0 ? -row : row - rows + 1;
                prob = p * 0.18 * Math.max(0, 1 - distOut / 4);
              }

              if (hash(gx, row, i) >= prob) continue;
              if (!reducedMotion && hash(gx, row, tStep) < 0.2) continue;

              const h2 = hash(row, gx, i + 31);
              const colorIdx = d < 12 ? 4 + Math.floor(h2 * 3) : Math.floor(h2 * h2 * 7);
              const size = 1.2 + h2 * 1.8;
              const jx = reducedMotion ? 0 : (hash(gx, row, i + 7) - 0.5) * 1.8;
              const jy = reducedMotion ? 0 : (hash(row, gx, i + 13) - 0.5) * 1.8;

              ctx.fillStyle = SPARK_PALETTE[colorIdx] || "#38bdf8";
              ctx.fillRect(sx + jx, 50 + row * 3 + jy, size, size);
            }
          }

          // 3. Dynamic drifting sparks
          if (!reducedMotion && Math.random() < 0.35) {
            sparks.push({
              x: Lx + (Math.random() - 0.5) * 6,
              y: 50 + Math.random() * ch,
              vx: 15 + Math.random() * 45,
              vy: (Math.random() - 0.5) * 35,
              size: 1 + Math.random() * 2,
              color: SPARK_PALETTE[Math.floor(Math.random() * SPARK_PALETTE.length)],
              life: 1.0,
            });
          }
        }
      }

      // Render & update floating sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.life -= dt * 1.8;

        if (sp.life <= 0) {
          sparks.splice(s, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.life;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
        ctx.globalAlpha = 1.0;
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", () => measure(false));
      belt.removeEventListener("pointerenter", onPointerEnter);
      belt.removeEventListener("pointerleave", onPointerLeave);
      belt.removeEventListener("pointerdown", onPointerDown);
      belt.removeEventListener("pointermove", onPointerMove);
      belt.removeEventListener("pointerup", onPointerUp);
      belt.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section className="w-full relative bg-[#001225] text-white pt-6 pb-20 border-b border-[#132a4a] overflow-hidden">
      <div className="w-[90%] mx-auto max-w-7xl relative space-y-10">
        {/* Background Fluid Wave Refraction Canvas */}
        <FluidWaveCanvas intensity="dark" className="opacity-60" />

      {/* =========================================================================
          1. TOP TRUST ROW (Genesis / Intelligence Designed To Evolve Style)
          ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#132a4a] pb-4">
        {/* Overlapping Enterprise Avatar Rings */}
        <div className="inline-flex items-center gap-3">
          <div className="flex -space-x-2.5">
            <div className="w-8 h-8 rounded-none bg-[#091b36] border border-[#1e6aff] flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md">
              <Database className="w-3.5 h-3.5 text-[#38bdf8]" />
            </div>
            <div className="w-8 h-8 rounded-none bg-[#091b36] border border-[#38bdf8] flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="w-8 h-8 rounded-none bg-[#091b36] border border-emerald-500 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md">
              <Lock className="w-3.5 h-3.5 text-[#38bdf8]" />
            </div>
          </div>

          <div className="genesis-badge text-xs py-1 px-3">
            <span className="w-2 h-2 rounded-none bg-[#38bdf8] animate-ping" />
            <span>The Enterprise Hub for High-Volume Revenue, Contracts &amp; Deal Intelligence</span>
          </div>
        </div>

        {/* Real-time Status Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">14.2MS P95</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#38bdf8]">GIN TRIGRAM ACTIVE</span>
        </div>
      </div>

      {/* =========================================================================
          2. HERO HEADLINE & VALUE PROPOSITION
          ========================================================================= */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-sans">
          Instant Data Discovery. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38bdf8] to-[#1e6aff]">
            Zero Spreadsheets Crashing.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          Give your revenue, finance, and operations teams the power to search, filter, and analyze <strong>100,000+ business contracts</strong> in milliseconds. Eliminate slow exports, engineering query bottlenecks, and outdated files with one centralized, audit-ready data platform.
        </p>

        {/* 3 CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/explorer"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-none btn-render-primary text-sm font-semibold group shadow-lg shadow-[#1e6aff]/30 text-white"
          >
            <Database className="w-4 h-4 text-[#38bdf8]" />
            <span>Explore Live Demo (100k Contracts)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-sm font-semibold text-zinc-200 hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#38bdf8]" />
            <span>Try Visual Query Builder</span>
          </Link>

          <Link
            href="/features"
            className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-sm font-semibold text-zinc-200 hover:text-white"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Security &amp; Governance</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          3. THE CENTERPIECE: QUANTUM DUAL-STATE LASER SCANNER & DISSOLVE ENGINE
          (Derived from Distill Canvas Dissolve + Ribbed Glass Refraction)
          ========================================================================= */}
      <div className="relative w-full rounded-none bg-[#000a17] border border-[#132a4a] overflow-hidden p-4 sm:p-8 space-y-4">
        {/* Scanner HUD Header */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-[#132a4a] pb-3 text-zinc-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-white font-bold uppercase tracking-wider">
              [LIVE COMPILATION // HUMAN DEAL VIEW ⇄ MACHINE AST TOKEN VIEW]
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-zinc-500">DRAG OR HOVER TO SCRUB DEALS</span>
            <span className="px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
              100K CONTRACTS READY
            </span>
          </div>
        </div>

        {/* Carousel & Scanner Container */}
        <div
          ref={beltRef}
          className="relative w-full h-[410px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: "none" }}
        >
          {/* Laser Scanner Beam at x = 50% */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#38bdf8] via-white to-[#1e6aff] shadow-[0_0_20px_#38bdf8,0_0_40px_#1e6aff] z-30 pointer-events-none">
            {/* Top Laser HUD Marker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-none bg-[#001225] border border-[#38bdf8] text-[#38bdf8] text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap shadow-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping" />
              <span>LATENCY: -94.8% (&lt; 14.2MS)</span>
            </div>

            {/* Bottom Laser Emitter */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-none bg-[#38bdf8] blur-xs" />
          </div>

          {/* Canvas for Dissolve Haze & Sparks */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-20 w-full h-full"
          />

          {/* Cards Track */}
          <div className="absolute top-[50px] left-0 w-full h-[310px] pointer-events-none">
            {CONTRACT_CARDS.map((card, idx) => (
              <React.Fragment key={card.id}>
                {/* 1. Pre-Scan Human Deal View (Right of Laser) */}
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="absolute top-0 left-0 rounded-none bg-[#051329] border border-[#132a4a] p-6 shadow-2xl flex flex-col justify-between pointer-events-auto"
                >
                  <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
                    <span className="text-xs font-mono font-bold text-[#38bdf8]">
                      {card.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                      {card.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 py-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">
                      {card.category} • {card.country}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug font-sans">
                      {card.title}
                    </h3>
                    <div className="text-xs text-zinc-400 font-sans">{card.company}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-[#132a4a] pt-3 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase">Revenue</div>
                      <div className="text-white font-bold">{card.revenue}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase">Profit</div>
                      <div className="text-emerald-400 font-bold">{card.profit}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase">Margin</div>
                      <div className="text-[#38bdf8] font-bold">{card.margin}</div>
                    </div>
                  </div>
                </div>

                {/* 2. Post-Scan Machine AST Token View (Left of Laser) */}
                <div
                  ref={(el) => {
                    codeRefs.current[idx] = el;
                  }}
                  className="absolute top-0 left-0 rounded-none bg-[#000d1c] border border-[#1e6aff]/50 p-6 shadow-2xl flex flex-col justify-between font-mono text-xs pointer-events-none"
                >
                  <div className="flex items-center justify-between border-b border-[#142b4d] pb-2 text-[11px]">
                    <span className="text-[#38bdf8] font-bold flex items-center gap-1.5">
                      <Terminal className="w-3 h-3" />
                      GIN_INDEX_COMPILED
                    </span>
                    <span className="text-emerald-400">SPEED: 14.2MS</span>
                  </div>

                  <div className="space-y-1.5 text-zinc-300 py-3 text-[11px] leading-relaxed">
                    {card.sqlSnippet.map((line, lIdx) => (
                      <div
                        key={lIdx}
                        className={
                          line.startsWith("--")
                            ? "text-emerald-400 font-bold"
                            : line.startsWith("SELECT") || line.startsWith("EXPLAIN")
                            ? "text-[#38bdf8]"
                            : "text-zinc-300"
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#142b4d] pt-2 flex items-center justify-between text-[10px] text-zinc-400">
                    <span>MEMORY: 1.4MB</span>
                    <span className="text-white">STATUS: 60 FPS LOCKED</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-[#132a4a] gap-2">
          <span>
            💡 <strong>Interactive Demo:</strong> Contracts automatically decompose into sub-20ms GIN trigram index AST nodes as they cross the quantum laser line.
          </span>
          <Link href="/explorer" className="text-[#38bdf8] hover:text-white transition-colors font-semibold flex items-center gap-1">
            <span>Query All 100,000 Rows</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          4. STATS FOOTER (4 Impact Metrics from Element 2 & Current Hero)
          ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] text-center space-y-1 relative group hover:border-[#10b981] transition-colors">
          <span className="absolute top-1.5 left-2 text-[9px] font-mono text-zinc-500">MTR-01</span>
          <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Search Latency</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400">
            &lt; 20ms
          </div>
          <div className="text-[11px] text-[#878787] font-mono">
            Instant Sub-Second Lookups
          </div>
        </div>

        <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] text-center space-y-1 relative group hover:border-[#38bdf8] transition-colors">
          <span className="absolute top-1.5 left-2 text-[9px] font-mono text-zinc-500">MTR-02</span>
          <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Data Capacity</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white">
            100,000+
          </div>
          <div className="text-[11px] text-[#878787] font-mono">
            Records Handled Smoothly
          </div>
        </div>

        <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] text-center space-y-1 relative group hover:border-[#1e6aff] transition-colors">
          <span className="absolute top-1.5 left-2 text-[9px] font-mono text-zinc-500">MTR-03</span>
          <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Self-Serve Access</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-[#38bdf8]">
            0 Code
          </div>
          <div className="text-[11px] text-[#878787] font-mono">
            No SQL or Engineers Needed
          </div>
        </div>

        <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] text-center space-y-1 relative group hover:border-[#38bdf8] transition-colors">
          <span className="absolute top-1.5 left-2 text-[9px] font-mono text-zinc-500">MTR-04</span>
          <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Audit Trail</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white">
            100%
          </div>
          <div className="text-[11px] text-[#878787] font-mono">
            Tracked &amp; Immutable Logs
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
