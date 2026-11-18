"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  Volume2,
  Database,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  Mic,
  DollarSign,
} from "lucide-react";

interface MotionPreset {
  id: string;
  name: string;
  prompt: string;
  category: string;
  country: string;
  minRevenue: string;
  profit: string;
  margin: string;
  dealTitle: string;
  company: string;
  accent: string;
  priority: string;
}

const MOTION_PRESETS: MotionPreset[] = [
  {
    id: "enterprise-de",
    name: "Tier-1 Enterprise Germany",
    prompt: "Show active enterprise contracts in Germany with revenue over $500,000",
    category: "Enterprise",
    country: "Germany",
    minRevenue: "$841,366.54",
    profit: "+$229,549.95",
    margin: "27.3%",
    dealTitle: "Enterprise Data Warehouse Consolidation",
    company: "Nova Solutions GmbH",
    accent: "#1e6aff",
    priority: "Urgent",
  },
  {
    id: "fintech-algo",
    name: "Fintech High-Frequency",
    prompt: "Filter active fintech deals with top revenue in Brazil",
    category: "Fintech",
    country: "Brazil",
    minRevenue: "$222,098.33",
    profit: "+$83,112.00",
    margin: "37.4%",
    dealTitle: "High-Frequency Algorithmic Execution Platform",
    company: "Jupiter Industries",
    accent: "#38bdf8",
    priority: "High",
  },
  {
    id: "healthcare-ca",
    name: "Urgent Healthcare Pipeline",
    prompt: "Find urgent healthcare compliance deals in Canada",
    category: "Healthcare",
    country: "Canada",
    minRevenue: "$364,054.88",
    profit: "+$90,131.40",
    margin: "24.8%",
    dealTitle: "Healthcare Regulatory EHR Integration Pipeline",
    company: "Orion Technologies",
    accent: "#10b981",
    priority: "Urgent",
  },
];

const TIMELINE_STAGES = [
  {
    id: 1,
    title: "100k Ingestion Universe",
    range: [0, 3.0],
    desc: "100,000 contracts streaming in locked 60 FPS viewport",
    icon: Database,
  },
  {
    id: 2,
    title: "Whisper Voice Prompt",
    range: [3.0, 6.0],
    desc: "Natural language & voice input decoded via OpenAI Whisper-1",
    icon: Mic,
  },
  {
    id: 3,
    title: "Sub-20ms Reactive Query",
    range: [6.0, 9.0],
    desc: "PostgreSQL B-Tree & GIN indexes filter dataset in 14.5ms",
    icon: Zap,
  },
  {
    id: 4,
    title: "Executive Profit Analytics",
    range: [9.0, 12.0],
    desc: "Live margin calculation & audit-ready decision intelligence",
    icon: TrendingUp,
  },
];

const TOTAL_DURATION = 12.0;

export default function MotionHeroShowcase() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<MotionPreset>(
    MOTION_PRESETS[0]
  );
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Playback Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimestampRef.current == null) {
        lastTimestampRef.current = timestamp;
      }
      const deltaSeconds =
        ((timestamp - lastTimestampRef.current) / 1000) * playbackSpeed;
      lastTimestampRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + deltaSeconds;
        if (next >= TOTAL_DURATION) {
          return 0; // Loop back
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  // Current active stage
  const currentStage =
    TIMELINE_STAGES.find(
      (s) => currentTime >= s.range[0] && currentTime < s.range[1]
    ) || TIMELINE_STAGES[0];

  // Stage progress ratio (0 to 1)
  const stageDuration = currentStage.range[1] - currentStage.range[0];
  const stageProgress = Math.min(
    1,
    Math.max(0, (currentTime - currentStage.range[0]) / stageDuration)
  );

  return (
    <div className="w-full bg-[#0a0d14] border border-[#1b2234] rounded-none shadow-2xl overflow-hidden text-white font-sans">
      {/* Top Bar: Kicker, Title & Presets */}
      <div className="p-4 sm:p-5 bg-[#0e121d] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="genesis-badge">
              Live Motion Choreography
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono">
              Architecture Spec: motion.md
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
            How DataScope Transforms 100k Contracts in Sub-20ms
          </h3>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono hidden md:inline">
            Story Preset:
          </span>
          <div className="flex flex-wrap gap-1 bg-[#091b36] p-1 border border-[#142b4d] rounded-none">
            {MOTION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPreset(preset)}
                className={`px-2.5 py-1 text-xs font-mono transition-all rounded-none cursor-pointer ${
                  selectedPreset.id === preset.id
                    ? "bg-[#1e6aff] text-white font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Motion Stage / Canvas */}
      <div className="relative h-[340px] sm:h-[400px] bg-[#001225] p-4 sm:p-8 flex items-center justify-center overflow-hidden select-none">
        {/* Background Visual Grid Lines */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#142b4d 1px, transparent 1px), linear-gradient(to right, #142b4d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Dynamic Glow Spotlight shifting with stages */}
        <div
          className="absolute w-[350px] h-[350px] rounded-none blur-[140px] pointer-events-none transition-all duration-700"
          style={{
            backgroundColor:
              currentStage.id === 1
                ? "rgba(30, 106, 255, 0.25)"
                : currentStage.id === 2
                ? "rgba(56, 189, 248, 0.25)"
                : currentStage.id === 3
                ? "rgba(16, 185, 129, 0.25)"
                : "rgba(56, 189, 248, 0.25)",
            top: currentStage.id % 2 === 0 ? "10%" : "30%",
            left: currentStage.id < 3 ? "20%" : "60%",
          }}
        />

        {/* =========================================================================
            STAGE 1: 100k Ingestion Universe (Visual Density)
            ========================================================================= */}
        {currentStage.id === 1 && (
          <div className="w-full max-w-2xl space-y-3 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#132a4a] pb-2">
              <span className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#38bdf8]" />
                <strong className="text-white">STAGE 01:</strong> 100,000 Records
                Streaming
              </span>
              <span className="text-emerald-400 font-bold animate-pulse">
                60 FPS Virtualized
              </span>
            </div>

            {/* Matrix Data Rows Preview */}
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { code: "REC-055594", title: "Global EHR Integration", rev: "$364,054", status: "Active" },
                { code: "REC-031706", title: "High-Frequency Algorithmic Execution", rev: "$222,098", status: "Active" },
                { code: "REC-099182", title: "Enterprise Data Warehouse Consolidation", rev: "$841,366", status: "Active" },
                { code: "REC-031027", title: "Predictive AI Demand Forecasting", rev: "$1,536,104", status: "Pending" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-none bg-[#051329] border border-[#132a4a] flex items-center justify-between text-zinc-300 transform transition-all"
                  style={{
                    opacity: 0.6 + i * 0.12,
                    transform: `translateY(${((1 - stageProgress) * (i * 4)).toFixed(0)}px)`,
                  }}
                >
                  <span className="text-[#38bdf8] font-semibold">{row.code}</span>
                  <span className="truncate max-w-[200px] text-white">{row.title}</span>
                  <span className="text-emerald-400 font-semibold">{row.rev}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-none bg-zinc-800 text-zinc-300">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
              <span>B-Tree GIN Indexes: Synchronized</span>
              <span className="text-[#38bdf8]">Memory: 4.8MB footprint</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 2: Whisper Voice Prompting & Input Field
            ========================================================================= */}
        {currentStage.id === 2 && (
          <div className="w-full max-w-xl p-6 rounded-none bg-[#051329]/95 border border-[#1e6aff]/50 shadow-2xl space-y-4 z-10 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8] font-bold">
                <Mic className="w-4 h-4 text-[#38bdf8] animate-pulse" />
                <span>STAGE 02: OPENAI WHISPER-1 VOICE DECODE</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#1e6aff]/20 text-[#38bdf8] border border-[#1e6aff]/40">
                Listening...
              </span>
            </div>

            {/* Simulated Voice Waveform */}
            <div className="flex items-center justify-center gap-1.5 h-8">
              {[20, 50, 85, 100, 70, 95, 60, 80, 45, 90, 65, 30].map((h, idx) => (
                <div
                  key={idx}
                  className="w-1 rounded-none bg-gradient-to-t from-[#1e6aff] to-[#38bdf8] animate-pulse"
                  style={{
                    height: `${Math.max(20, h * stageProgress)}%`,
                    animationDelay: `${idx * 0.08}s`,
                  }}
                />
              ))}
            </div>

            {/* Prompt Typewriter Box */}
            <div className="p-3.5 rounded-none bg-[#001225] border border-[#132a4a] space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">
                Natural Language Instruction:
              </span>
              <p className="text-sm font-mono text-white font-medium">
                &ldquo;
                {selectedPreset.prompt.slice(
                  0,
                  Math.floor(selectedPreset.prompt.length * Math.min(1, stageProgress * 1.3))
                )}
                <span className="inline-block w-1.5 h-3.5 bg-[#38bdf8] ml-0.5 animate-pulse" />
                &rdquo;
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Model: whisper-1 ASR (Zero Latency)</span>
              <span className="text-emerald-400">Target: {selectedPreset.category}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 3: Sub-20ms Reactive Query Execution
            ========================================================================= */}
        {currentStage.id === 3 && (
          <div className="w-full max-w-xl p-6 rounded-none bg-[#0e141f] border border-emerald-500/40 shadow-2xl space-y-4 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Zap className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>STAGE 03: DATABASE TRANSFORMATION</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold bg-emerald-500/15 px-2.5 py-0.5 rounded-none border border-emerald-500/30">
                Latency: 14.2ms
              </span>
            </div>

            {/* Compiling Query Visual Bar */}
            <div className="p-3 rounded-none bg-[#001225] border border-[#132a4a] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                <span>Query Compiler Output:</span>
                <span className="text-emerald-400 font-semibold">100% Validated</span>
              </div>
              <div className="text-[#38bdf8] font-mono text-[11px] leading-relaxed">
                SELECT * FROM contracts WHERE category = &apos;{selectedPreset.category}&apos; AND country = &apos;{selectedPreset.country}&apos; AND revenue &gt;= 500000;
              </div>
            </div>

            {/* Instant Filter Chips Applied */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400">
                Applied Filters:
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-[#1e6aff]/20 text-[#38bdf8] border border-[#1e6aff]/40">
                Status: Active
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-sky-500/20 text-sky-300 border border-sky-500/40">
                Country: {selectedPreset.country}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Revenue: {selectedPreset.minRevenue}
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 4: Executive Profit Analytics & Clarity
            ========================================================================= */}
        {currentStage.id === 4 && (
          <div className="w-full max-w-xl p-6 rounded-none bg-[#051329] border border-[#1e6aff]/50 shadow-2xl space-y-4 z-10 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#38bdf8] font-bold">
                <TrendingUp className="w-4 h-4 text-[#38bdf8]" />
                <span>STAGE 04: EXECUTIVE INTELLIGENCE</span>
              </div>
              <span className="text-rose-400 font-mono font-bold bg-rose-500/15 px-2 py-0.5 rounded-none border border-rose-500/30">
                Priority: {selectedPreset.priority}
              </span>
            </div>

            {/* High-Value Result Card */}
            <div className="p-4 rounded-none bg-[#001225] border border-[#132a4a] space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[#38bdf8] uppercase">
                  {selectedPreset.company} • {selectedPreset.country}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {selectedPreset.dealTitle}
                </h4>
              </div>

              {/* KPI Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#182136]">
                <div>
                  <div className="text-[10px] text-zinc-400 font-mono uppercase">
                    Annual Revenue
                  </div>
                  <div className="text-sm font-bold font-mono text-white">
                    {selectedPreset.minRevenue}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 font-mono uppercase">
                    Net Profit
                  </div>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    {selectedPreset.profit}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 font-mono uppercase">
                    Profit Margin
                  </div>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    {selectedPreset.margin}
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Interactive CTA */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-zinc-400 font-mono">
                Sub-20ms verified against PostgreSQL Neon
              </span>
              <Link
                href="/explorer"
                className="flex items-center gap-2 px-4 py-2 rounded-none btn-render-primary text-white text-xs font-semibold shadow-md transition-colors"
              >
                <span>Open in Live Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Playback Controls & Timeline Scrubber */}
      <div className="p-4 bg-[#051329] border-t border-[#132a4a] space-y-3">
        {/* Timeline Beat Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TIMELINE_STAGES.map((stage) => {
            const Icon = stage.icon;
            const isCurrent = currentStage.id === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setCurrentTime(stage.range[0]);
                  setIsPlaying(false);
                }}
                className={`p-2.5 rounded-none text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#1e6aff]/20 border-[#1e6aff] text-white shadow-sm"
                    : "bg-[#001225] border-[#132a4a] text-zinc-400 hover:text-zinc-200 hover:bg-[#091b36]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>0{stage.id}</span>
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {stage.range[0]}s–{stage.range[1]}s
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-zinc-200 truncate mt-1">
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Media Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#132a4a] text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#091b36] hover:bg-[#0f2a52] border border-[#142b4d] text-white font-semibold transition-colors cursor-pointer"
              title={isPlaying ? "Pause motion demo" : "Play motion demo"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-none bg-[#091b36] hover:bg-[#0f2a52] border border-[#142b4d] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Reset choreography to beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Time readout */}
            <span className="text-zinc-400 text-xs font-mono ml-2">
              {currentTime.toFixed(2)}s / {TOTAL_DURATION.toFixed(2)}s
            </span>
          </div>

          {/* Scrubber Range */}
          <div className="flex-1 max-w-md mx-2">
            <input
              type="range"
              min={0}
              max={TOTAL_DURATION}
              step={0.05}
              value={currentTime}
              onChange={(e) => {
                setCurrentTime(parseFloat(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-1.5 bg-[#132a4a] rounded-none appearance-none cursor-pointer accent-[#1e6aff]"
            />
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 text-[11px]">Speed:</span>
            {[0.5, 1, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded-none text-[10px] font-mono cursor-pointer ${
                  playbackSpeed === spd
                    ? "bg-[#1e6aff] text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
