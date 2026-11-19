"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import MotionHeroShowcase from "@/components/home/MotionHeroShowcase";
import FluidWaveCanvas from "@/components/home/FluidWaveCanvas";
import QuantumScannerHero from "@/components/home/QuantumScannerHero";
import {
  Layers,
  Database,
  Search,
  Zap,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BarChart3,
  BookmarkCheck,
  CheckCircle2,
  Lock,
  Activity,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  FileSpreadsheet,
  Users,
  Briefcase,
  Share2,
  Download,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  Check,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Server,
  Network,
  Maximize2,
  Filter,
} from "lucide-react";

export default function LandingPage() {
  // Kinetic Problem Text cycling (Genesis 00:29 - 00:36)
  const kineticProblems = [
    "Scattered data chaos.",
    "Delayed legacy reports.",
    "Wasted overhead cost.",
  ];
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblemIdx((prev) => (prev + 1) % kineticProblems.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [kineticProblems.length]);

  // Interactive CAD Process Ruler State (Genesis 00:44 - 00:48)
  const [activeProcessWeek, setActiveProcessWeek] = useState(1);

  // Interactive FAQ Toggle state (Genesis 01:05 - 01:13)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Intro Section Video State (Genesis 00:10 - 00:26)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const introVideoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (introVideoRef.current) {
      const playPromise = introVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch((err) => {
            console.warn("Video playback:", err);
            setIsVideoPlaying(true);
          });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-[#1e6aff]/20 selection:text-[#1e6aff] relative overflow-hidden font-sans">
      {/* Public Navigation Header */}
      <PublicHeader />

      {/* Main Content with Alternating Light & Dark Sections (Genesis Signature Architecture) */}
      <main className="flex-1 flex flex-col relative z-10 w-full">
        {/* =========================================================================
            SECTION 1: HERO SECTION (PURE WHITE THEME)
            Quantum Laser Scanner & Particle Dissolve Engine (Distill × Three.js)
            ========================================================================= */}
        <QuantumScannerHero />

        {/* =========================================================================
            SECTION 2: [01 - INTRO] (PURE WHITE THEME - Genesis 00:10 - 00:26)
            ========================================================================= */}
        <section className="w-full bg-[#ffffff] text-[#001225] py-20 border-b border-zinc-200 relative overflow-hidden">
          {/* Subtle Architectural Blueprint Grid Lines - 4 Column Architectural Grid with enhanced visible stroke */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="w-[94%] 2xl:w-[92%] max-w-[1600px] mx-auto h-full grid grid-cols-4 border-x-[1.5px] border-dashed border-zinc-400">
              <div className="border-r-[1.5px] border-dashed border-zinc-400 h-full" />
              <div className="border-r-[1.5px] border-dashed border-zinc-400 h-full" />
              <div className="border-r-[1.5px] border-dashed border-zinc-400 h-full" />
              <div className="h-full" />
            </div>
          </div>

          <div className="w-[94%] 2xl:w-[92%] max-w-[1600px] mx-auto relative z-10 space-y-16">
            {/* 4-Column Grid Layout matching homepage.mp4 Genesis 00:10 - 00:26 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 items-start">
              {/* Column 1: [01 - INTRO] Header + Full-width Column 1 Tech Video */}
              <div className="space-y-6 pr-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold tracking-widest text-zinc-600 uppercase shrink-0">
                    [01 - INTRO]
                  </span>
                  <div
                    className="h-3 flex-1 opacity-25"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #71717a, #71717a 1px, transparent 1px, transparent 6px)",
                    }}
                  />
                </div>

                {/* Video Container (spanning full Column 1 width up to 25% dashed line) */}
                <div className="pt-4 sm:pt-8">
                  <div className="w-full h-[245px] sm:h-[250px] relative bg-black overflow-hidden shadow-lg border border-zinc-800/40 group">
                    <video
                      ref={introVideoRef}
                      poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                      className="w-full h-full object-cover"
                      controls={isVideoPlaying}
                      playsInline
                      preload="auto"
                      loop
                      muted={!isVideoPlaying}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onClick={handlePlayVideo}
                    >
                      <source src="https://cdn.coverr.co/videos/coverr-coding-on-a-laptop-2116/1080p.mp4" type="video/mp4" />
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-circuit-board-42956-large.mp4" type="video/mp4" />
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-computer-circuit-board-12255-large.mp4" type="video/mp4" />
                    </video>

                    {/* Pre-play overlay with CAD brackets & central play badge */}
                    {!isVideoPlaying && (
                      <div
                        onClick={handlePlayVideo}
                        className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors z-10"
                      >
                        {/* 4 CAD Corner Bracket Tick Marks */}
                        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-white pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-white pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-white pointer-events-none" />
                        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-white pointer-events-none" />

                        {/* Centered White Play Badge */}
                        <div className="w-14 h-9 bg-white/95 group-hover:bg-white rounded flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2: Hatched Stripe Extension & Open Whitespace Buffer */}
              <div className="hidden lg:block space-y-6 px-3">
                <div
                  className="h-3 w-full opacity-25"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #71717a, #71717a 1px, transparent 1px, transparent 6px)",
                  }}
                />
              </div>

              {/* Columns 3 & 4 (Right Half): Headline spanning both columns, perfectly aligned between 50% line and 100% line */}
              <div className="lg:col-span-2 flex flex-col space-y-3 sm:space-y-4 pt-1">
                {/* Clean, fully justified typography matching Genesis 00:10 - 00:26 with natural inter-word spacing */}
                <h2 className="w-full text-justify [text-justify:inter-word] [text-align-last:left] [text-indent:60px] sm:[text-indent:90px] lg:[text-indent:115px] xl:[text-indent:130px] font-bold text-[#001225] text-xl sm:text-2xl lg:text-[25px] xl:text-[28px] 2xl:text-[31px] tracking-tight leading-[1.3] font-sans">
                  We engineer unified data architectures that transform scattered contracts into predictive enterprise assets. By fusing sub-20ms inverted indexing with real-time audit intelligence, we build the discovery engines that eliminate spreadsheet crashes and accelerate decision velocity across 100,000+ live contracts.
                </h2>

                {/* Sub-row aligned under Columns 3 and 4: Col 3 (Full-width Let's Talk Button) and Col 4 (Subtext raised to upper red line) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 items-start pt-1 sm:pt-2">
                  {/* Column 3 Position: [ Let's Talk ] Button spanning full Column 3 from 50% line to 75% line */}
                  <div className="w-full pt-16 sm:pt-22 lg:pt-26 pr-0">
                    <Link
                      href="/explorer"
                      className="relative group w-full h-[52px] inline-flex items-center justify-center bg-[#001225] hover:bg-[#1e6aff] text-white text-sm font-sans font-semibold tracking-wide transition-colors shadow-sm"
                    >
                      {/* CAD Corner Brackets */}
                      <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-white/80 group-hover:border-white transition-colors" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-white/80 group-hover:border-white transition-colors" />
                      <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-white/80 group-hover:border-white transition-colors" />
                      <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-white/80 group-hover:border-white transition-colors" />
                      Let&apos;s Talk
                    </Link>
                  </div>

                  {/* Column 4 Position: Subtext raised up to the upper red line directly below the headline */}
                  <div className="w-full -mt-3 sm:-mt-5 lg:-mt-6">
                    <p className="w-full text-justify [text-justify:inter-word] [text-align-last:left] [text-indent:40px] sm:[text-indent:55px] lg:[text-indent:65px] font-medium text-[#001225] text-sm sm:text-base lg:text-[17px] xl:text-[18px] tracking-tight leading-[1.35] font-sans">
                      No legacy reporting. No frozen spreadsheets. Just clean, audit-ready contract discovery built to scale your edge without SQL.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepped / Cascading Staircase (Genesis 00:26 Light Cards) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end pt-4">
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-2 h-40 flex flex-col justify-end text-left">
                <div className="text-3xl sm:text-5xl font-black font-mono text-zinc-900 tracking-tight flex items-baseline gap-1.5">
                  <span className="text-zinc-400 font-light text-2xl sm:text-4xl">|</span>
                  <span>$50M+</span>
                </div>
                <div className="text-xs text-zinc-600 font-sans">
                  Client revenue impact delivered.
                </div>
              </div>

              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-2 h-48 flex flex-col justify-end border-t-2 border-t-[#1e6aff] text-left">
                <div className="text-3xl sm:text-5xl font-black font-mono text-[#1e6aff] tracking-tight flex items-baseline gap-1.5">
                  <span className="text-zinc-400 font-light text-2xl sm:text-4xl">|</span>
                  <span>87%</span>
                </div>
                <div className="text-xs text-zinc-600 font-sans">
                  Faster strategic decision speed.
                </div>
              </div>

              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-2 h-56 flex flex-col justify-end border-t-2 border-t-[#38bdf8] text-left">
                <div className="text-3xl sm:text-5xl font-black font-mono text-zinc-900 tracking-tight flex items-baseline gap-1.5">
                  <span className="text-zinc-400 font-light text-2xl sm:text-4xl">|</span>
                  <span>20+</span>
                </div>
                <div className="text-xs text-zinc-600 font-sans">
                  Sources unified into one system.
                </div>
              </div>

              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-2 h-64 flex flex-col justify-end border-t-2 border-t-emerald-500 text-left">
                <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-600 tracking-tight flex items-baseline gap-1.5">
                  <span className="text-zinc-400 font-light text-2xl sm:text-4xl">|</span>
                  <span>100%</span>
                </div>
                <div className="text-xs text-zinc-600 font-sans">
                  Automated predictive accuracy.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: [02 - PROBLEM] (DEEP DARK OBSIDIAN THEME - Genesis 00:29 - 00:36)
            ========================================================================= */}
        <section className="w-full bg-[#000a17] text-white py-24 border-b border-[#132a4a] relative overflow-hidden">
          {/* Dark Blueprint Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-[#132a4a]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-[#132a4a] h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-12">
            {/* Kinetic Morphing Headline Box */}
            <div className="p-12 rounded-none bg-[#051329] border border-[#132a4a] text-center space-y-4 relative overflow-hidden shadow-2xl">
              <span className="font-mono text-xs text-rose-400 tracking-widest uppercase block font-bold">
                [02 - PROBLEM] // THE BOTTLENECK YOU FACE TODAY
              </span>

              <div className="h-20 flex items-center justify-center">
                <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans transition-all duration-300">
                  {kineticProblems[currentProblemIdx]}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans">
                Traditional spreadsheets were never designed to handle 50,000+ complex revenue rows. Here is why enterprise teams replace them with DataScope.
              </p>
            </div>

            {/* Side-by-Side Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* The Old Way */}
              <div className="p-8 rounded-none bg-[#11090c] border border-rose-500/30 space-y-6 relative shadow-lg text-left">
                <span className="absolute top-2 left-2 text-[9px] font-mono text-rose-400 font-bold">LEGACY SPREADSHEETS</span>
                <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold font-mono">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Traditional Problem (Excel &amp; Clunky CSVs)</span>
                </div>
                <ul className="space-y-4 text-xs text-zinc-300 font-sans leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Browser &amp; App Crashes:</strong> Excel or Google Sheets freezes and crashes whenever your dataset reaches 50,000+ customer records or invoices.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Engineering Bottlenecks:</strong> Business users have to wait days for data engineers to write SQL queries just to answer a simple quarterly question.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Outdated Versions:</strong> Team members circulate conflicting CSV files over email and Slack, resulting in decision-making based on stale data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Zero Compliance or Audit Log:</strong> Anyone can accidentally overwrite a multi-million-dollar figure with no record of who changed what or when.</span>
                  </li>
                </ul>
              </div>

              {/* The DataScope Solution */}
              <div className="p-8 rounded-none bg-[#051329] border border-emerald-500/30 space-y-6 relative shadow-lg text-left">
                <span className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400 font-bold">DATASCOPE BLUEPRINT</span>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The DataScope Solution (Modern Data Intelligence)</span>
                </div>
                <ul className="space-y-4 text-xs text-zinc-300 font-sans leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Zero-Lag Virtualized Tables:</strong> Smoothly scroll through 100,000+ records at a locked 60 FPS without your browser using more than a few megabytes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Self-Serve Point-and-Click:</strong> Non-technical business users can filter, slice, and cross-reference data in seconds without writing a line of SQL.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>One Shared Source of Truth:</strong> Save custom views, share bookmarked URLs, and ensure everyone looks at identical live database records.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>100% Immutable Audit History:</strong> Every status update, approval, and modification is permanently logged with user ID, timestamp, and previous state.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: [03 - ETHOS] (PURE WHITE THEME - Genesis 00:36 - 00:44)
            ========================================================================= */}
        <section className="w-full bg-[#ffffff] text-[#001225] py-24 border-b border-zinc-200 relative overflow-hidden">
          {/* Light Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-zinc-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-zinc-200 h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10">
            {/* Left-Aligned Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-mono text-xs text-zinc-500 font-bold tracking-widest uppercase">
                [03 - ETHOS] // ARCHITECTURAL CAPABILITIES
              </span>
              <span className="font-mono text-xs text-[#1e6aff] font-bold">
                6 CORE SYSTEMS
              </span>
            </div>

            <div className="text-left space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight font-sans">
                Building systems for enterprise scale.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl font-sans">
                Precision modules designed to eliminate fragmented operational silos and unlock instant decision velocity.
              </p>
            </div>

            {/* 6 Capability Cards (White/Light surface with subtle borders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "CAP-01",
                  title: "Predictive modeling for modern enterprise",
                  desc: "We deploy custom AI architectures that forecast market trends, margin swings, and cohort health.",
                  icon: Zap,
                },
                {
                  id: "CAP-02",
                  title: "Breaking down complex operational silos",
                  desc: "We connect scattered data sources into a single, high-performance source of truth without duplication.",
                  icon: Database,
                },
                {
                  id: "CAP-03",
                  title: "Uncovering hidden enterprise revenue",
                  desc: "We track the entire contract lifecycle to reveal where profit leaks and identify high-margin accounts.",
                  icon: TrendingUp,
                },
                {
                  id: "CAP-04",
                  title: "Replacing manual logs with automation",
                  desc: "We build systems that process millions of points instantly with complete immutable audit stamps.",
                  icon: Clock,
                },
                {
                  id: "CAP-05",
                  title: "Evaluating your current data systems",
                  desc: "We analyze database infrastructure to eliminate heavy overhead costs and slow query locks.",
                  icon: Server,
                },
                {
                  id: "CAP-06",
                  title: "Optimizing processing speed at scale",
                  desc: "Inverted GIN trigram indexes and virtualized DOM tables guarantee sub-20ms rendering at 60 FPS.",
                  icon: Cpu,
                },
              ].map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.id}
                    className="p-7 rounded-none bg-zinc-50 border border-zinc-200 hover:border-[#1e6aff] hover:bg-white hover:shadow-lg transition-all space-y-4 relative group text-left"
                  >
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-zinc-400 font-bold">{cap.id}</span>
                    <span className="absolute top-2 right-2 text-[9px] font-mono text-[#1e6aff]">⌜ ⌝</span>

                    <div className="w-10 h-10 rounded-none bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[#1e6aff] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 font-sans">
                      {cap.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      {cap.desc}
                    </p>

                    <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-[#1e6aff]">
                      <Link href="/features" className="hover:text-zinc-900 transition-colors flex items-center gap-1 font-bold">
                        <span>Let&apos;s Talk</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Embedded Live Motion Hero Showcase */}
            <div className="pt-10">
              <MotionHeroShowcase />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: [04 - PROCESS] (LIGHT GRAY THEME - Genesis 00:44 - 00:48)
            ========================================================================= */}
        <section className="w-full bg-[#f8fafc] text-[#001225] py-24 border-b border-zinc-200 relative overflow-hidden">
          {/* Light Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-zinc-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-zinc-200 h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10">
            {/* Left-Aligned Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-mono text-xs text-zinc-500 font-bold tracking-widest uppercase">
                [04 - PROCESS] // FROM DEPLOYMENT TO DATA INTELLIGENCE
              </span>
              <span className="font-mono text-xs text-[#1e6aff] font-bold">
                4-WEEK ROADMAP
              </span>
            </div>

            <div className="text-left space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight font-sans">
                From deployment to data intelligence.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-xl font-sans">
                Our structured implementation framework moves your enterprise from scattered spreadsheets to sub-second answers in 4 weeks.
              </p>
            </div>

            {/* The CAD Precision Ruler (Clean White Container with Dark Ticks) */}
            <div className="p-7 rounded-none bg-white border border-zinc-200 shadow-sm space-y-6 text-left">
              <div className="relative py-4 border-b border-zinc-200">
                {/* Ruler Tick Marks */}
                <div className="flex justify-between items-end h-8 px-2">
                  {Array.from({ length: 41 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[1px] transition-colors ${
                        i % 10 === 0
                          ? "h-8 bg-[#1e6aff]"
                          : i % 5 === 0
                          ? "h-5 bg-zinc-400"
                          : "h-3 bg-zinc-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Week Buttons */}
                <div className="grid grid-cols-4 text-xs font-mono pt-3">
                  {[1, 2, 3, 4].map((w) => (
                    <button
                      key={w}
                      onClick={() => setActiveProcessWeek(w)}
                      className={`text-left font-bold transition-colors ${
                        activeProcessWeek === w
                          ? "text-[#1e6aff]"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      Week 0{w}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Stage Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
                <div className={`p-5 rounded-none border transition-all ${activeProcessWeek === 1 ? "bg-white border-[#1e6aff] shadow-md" : "bg-zinc-50 border-zinc-200"}`}>
                  <div className="text-xs font-mono text-[#1e6aff] mb-1 font-bold">STAGE 01</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans">Audit &amp; Align</h4>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    We analyze your existing data pipelines to map leaks, identify unindexed queries, and quantify immediate high-ROI automation wins.
                  </p>
                </div>

                <div className={`p-5 rounded-none border transition-all ${activeProcessWeek === 2 ? "bg-white border-[#1e6aff] shadow-md" : "bg-zinc-50 border-zinc-200"}`}>
                  <div className="text-xs font-mono text-[#1e6aff] mb-1 font-bold">STAGE 02</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans">Core Framework</h4>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    We connect your scattered data platforms into a single, high-performance PostgreSQL 16 &amp; GIN trigram source of enterprise truth.
                  </p>
                </div>

                <div className={`p-5 rounded-none border transition-all ${activeProcessWeek === 3 ? "bg-white border-[#1e6aff] shadow-md" : "bg-zinc-50 border-zinc-200"}`}>
                  <div className="text-xs font-mono text-[#1e6aff] mb-1 font-bold">STAGE 03</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans">Deploy AI Models</h4>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    We integrate custom Whisper voice and natural language semantic intelligence to automate decision speeds and forecast market trends.
                  </p>
                </div>

                <div className={`p-5 rounded-none border transition-all ${activeProcessWeek === 4 ? "bg-white border-[#1e6aff] shadow-md" : "bg-zinc-50 border-zinc-200"}`}>
                  <div className="text-xs font-mono text-[#1e6aff] mb-1 font-bold">STAGE 04</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans">Scale &amp; Optimize</h4>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    We deliver lightning-fast analytics tracking that maintains locked sub-20ms performance across 100,000+ contracts.
                  </p>
                </div>
              </div>

              {/* Bottom Consultation Banner */}
              <div className="p-5 rounded-none bg-zinc-100 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#1e6aff]" />
                    <span>Ready to modernize? Stop guessing.</span>
                  </span>
                  <p className="text-xs text-zinc-600 font-sans">
                    We build high-performance data architectures that accelerate your decision speed and cut through operational noise.
                  </p>
                </div>

                <Link
                  href="/explorer"
                  className="px-6 py-3 rounded-none bg-[#001225] hover:bg-[#1e6aff] text-white text-xs font-bold shrink-0 transition-colors shadow-md"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: [05 - FRAMEWORKS & INTEGRATIONS] (DARK THEME - Genesis 00:49 - 00:53)
            ========================================================================= */}
        <section className="w-full bg-[#000a17] text-white py-24 border-b border-[#132a4a] relative overflow-hidden">
          {/* Dark Blueprint Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-[#132a4a]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-[#132a4a] h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10">
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-[#132a4a] pb-4">
              <span className="font-mono text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
                [05 - FRAMEWORKS &amp; INTEGRATIONS] // ECOSYSTEM
              </span>
              <span className="font-mono text-xs text-zinc-500 font-bold">
                12 CORE STACKS
              </span>
            </div>

            <div className="p-8 sm:p-12 rounded-none bg-[#051329] border border-[#132a4a] space-y-10 shadow-2xl">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-3xl sm:text-4xl font-black text-white font-sans uppercase tracking-tight">
                  Unifying your data ecosystem.
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Native integrations connecting your existing infrastructure into sub-second data pipelines.
                </p>
              </div>

              {/* 12 Interactive Framework Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
                {[
                  { name: "POSTGRESQL 16", role: "Primary Relational Core", tag: "DB" },
                  { name: "PG_TRGM GIN", role: "Sub-18ms Text Search", tag: "INDEX" },
                  { name: "NEXT.JS 15", role: "Client App Router", tag: "UI" },
                  { name: "REDUX TOOLKIT", role: "Deterministic State", tag: "STORE" },
                  { name: "REDIS CACHE", role: "Sub-Millisecond Keys", tag: "CACHE" },
                  { name: "DUCKDB ENGINE", role: "Fast Vector Ingestion", tag: "OLAP" },
                  { name: "OPENAI WHISPER", role: "Voice Query Decoding", tag: "AI" },
                  { name: "APACHE ARROW", role: "Columnar Serialization", tag: "PERF" },
                  { name: "TYPESCRIPT 5", role: "Strict Compile Safety", tag: "LANG" },
                  { name: "TAILWIND CSS V4", role: "Architectural Theme", tag: "CSS" },
                  { name: "DOCKER PROD", role: "Isolated Microservices", tag: "OPS" },
                  { name: "SOC-2 CERTIFIED", role: "Enterprise Governance", tag: "SEC" },
                ].map((fw) => (
                  <div
                    key={fw.name}
                    className="p-4 rounded-none bg-[#071529] border border-[#132a4a] hover:border-[#38bdf8] hover:bg-[#091b36] transition-all cursor-pointer group space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#38bdf8] px-1.5 py-0.5 rounded-none bg-[#1e6aff]/10 border border-[#1e6aff]/20 font-bold">
                        {fw.tag}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-600 group-hover:text-emerald-400 transition-colors">
                        ACTIVE
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {fw.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-sans">
                      {fw.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: [06 - FEATURED REVIEWS] (PURE WHITE THEME - Genesis 00:54 - 00:59)
            ========================================================================= */}
        <section className="w-full bg-[#ffffff] text-[#001225] py-24 border-b border-zinc-200 relative overflow-hidden">
          {/* Light Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-zinc-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-zinc-200 h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10">
            {/* Left-Aligned Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-mono text-xs text-zinc-500 font-bold tracking-widest uppercase">
                [06 - FEATURED REVIEWS] // ENTERPRISE PROOF
              </span>
              <span className="font-mono text-xs text-[#1e6aff] font-bold">
                TESTIMONIALS
              </span>
            </div>

            <div className="text-left space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight font-sans">
                What enterprise leaders say about us.
              </h2>
            </div>

            {/* Large Editorial Quote Card (White Surface with Crisp Border) */}
            <div className="p-8 sm:p-12 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-6 relative text-left">
              <span className="text-5xl text-[#1e6aff] font-serif leading-none select-none block">“</span>
              <blockquote className="text-lg sm:text-2xl text-zinc-900 font-medium leading-relaxed font-sans">
                DataScope completely transformed our data infrastructure. Their AI models and sub-20ms queries connected easily with our legacy systems and gave our leadership team instant clarity within days. We eliminated tracking delays and finally unlocked high-speed performance monitoring at a massive scale when our previous vendor failed us completely.
              </blockquote>
              <div className="flex items-center justify-between border-t border-zinc-200 pt-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-900 font-bold">Marcus Sterling</span> — VP of Revenue Operations, FinEdge Global
                </div>
                <span className="text-emerald-600 font-bold">VERIFIED ENTERPRISE CLIENT</span>
              </div>
            </div>

            {/* 4 Outcome Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-1">
                <div className="text-2xl sm:text-4xl font-black font-mono text-zinc-900">40% Less</div>
                <div className="text-xs text-zinc-600 font-sans">Churn &amp; Missing Renewals</div>
              </div>
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-1">
                <div className="text-2xl sm:text-4xl font-black font-mono text-[#1e6aff]">100,000+</div>
                <div className="text-xs text-zinc-600 font-sans">Contracts Handled at 60 FPS</div>
              </div>
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-1">
                <div className="text-2xl sm:text-4xl font-black font-mono text-emerald-600">$200K</div>
                <div className="text-xs text-zinc-600 font-sans">Engineering Overhead Saved</div>
              </div>
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-1">
                <div className="text-2xl sm:text-4xl font-black font-mono text-zinc-900">87%</div>
                <div className="text-xs text-zinc-600 font-sans">Faster Decision Speed</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: [07 - ENGAGEMENT MODELS] (DARK THEME - Genesis 01:00 - 01:04)
            ========================================================================= */}
        <section className="w-full bg-[#000a17] text-white py-24 border-b border-[#132a4a] relative overflow-hidden">
          {/* Dark Blueprint Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-[#132a4a]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-[#132a4a] h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10">
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-[#132a4a] pb-4">
              <span className="font-mono text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
                [07 - ENGAGEMENT MODELS] // PRICING
              </span>
              <span className="font-mono text-xs text-zinc-500 font-bold">
                TRANSPARENT PLANS
              </span>
            </div>

            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
                Transparent plans tailored for growth.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                Deploy in your cloud or use our fully-managed dedicated enterprise cluster.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              {/* Plan 1 */}
              <div className="p-8 rounded-none bg-[#051329] border border-[#132a4a] space-y-6 flex flex-col justify-between shadow-lg">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    TIER 01
                  </span>
                  <h3 className="text-xl font-bold text-white">Core Audit</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Perfect for growing businesses needing unified baseline metrics and fewer disconnected data silos across teams.
                  </p>
                  <div className="pt-2">
                    <span className="text-3xl font-black font-mono text-white">$1,600</span>
                    <span className="text-xs text-zinc-400 font-mono"> / starting</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Data infrastructure audit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Core system unification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>2 connected data sources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Basic tracking framework</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Monthly strategy review</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/register"
                  className="w-full flex items-center justify-center py-3 rounded-none btn-render-secondary text-xs font-semibold text-white"
                >
                  Activate Plan
                </Link>
              </div>

              {/* Plan 2: Featured */}
              <div className="p-8 rounded-none bg-[#071529] border-2 border-[#1e6aff] space-y-6 flex flex-col justify-between shadow-2xl shadow-[#1e6aff]/25 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-none bg-[#1e6aff] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                  MOST POPULAR
                </span>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider block font-bold">
                    TIER 02 // RECOMMENDED
                  </span>
                  <h3 className="text-xl font-bold text-white">Intelligence Partner</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Our flagship model deploying advanced predictive AI models to completely automate your data decision speeds.
                  </p>
                  <div className="pt-2">
                    <span className="text-3xl font-black font-mono text-[#38bdf8]">$4,500</span>
                    <span className="text-xs text-zinc-400 font-mono"> / month</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Everything in Core Audit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Predictive AI integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>10+ connected pipelines</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Real-time anomaly alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Weekly performance growth</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/explorer"
                  className="w-full flex items-center justify-center py-3 rounded-none btn-render-primary text-white text-xs font-semibold"
                >
                  Activate Plan
                </Link>
              </div>

              {/* Plan 3 */}
              <div className="p-8 rounded-none bg-[#051329] border border-[#132a4a] space-y-6 flex flex-col justify-between shadow-lg">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    TIER 03
                  </span>
                  <h3 className="text-xl font-bold text-white">Custom Engine</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Built for large-scale global networks requiring dedicated infrastructure, custom LLMs, and compliance.
                  </p>
                  <div className="pt-2">
                    <span className="text-3xl font-black font-mono text-white">$12,000</span>
                    <span className="text-xs text-zinc-400 font-mono"> / starting</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Custom AI model training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Unlimited data pipelines</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Predictive churn modeling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dedicated systems expert</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>24/7 priority SLA support</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/register"
                  className="w-full flex items-center justify-center py-3 rounded-none btn-render-secondary text-xs font-semibold text-white"
                >
                  Activate Plan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: [08 - FAQ] (LIGHT GRAY THEME - Genesis 01:05 - 01:13)
            ========================================================================= */}
        <section className="w-full bg-[#f8fafc] text-[#001225] py-24 border-b border-zinc-200 relative overflow-hidden">
          {/* Light Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-zinc-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-zinc-200 h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10 text-left">
            {/* Left-Aligned Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-mono text-xs text-zinc-500 font-bold tracking-widest uppercase">
                [08 - FAQ] // CLARIFICATIONS
              </span>
              <span className="font-mono text-xs text-[#1e6aff] font-bold">
                7 ANSWERS
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight font-sans">
                Clear answers to common queries.
              </h2>
            </div>

            <div className="space-y-3 max-w-4xl">
              {[
                {
                  id: "01",
                  q: "How long does implementation take?",
                  a: "A standard implementation takes 2 to 4 weeks. We connect directly with your existing PostgreSQL, Snowflake, or SQL databases and configure inverted GIN indexes without disrupting current operations.",
                },
                {
                  id: "02",
                  q: "Do you replace our current tools?",
                  a: "DataScope replaces slow Excel exports and clunky spreadsheets for discovery, while sitting harmoniously alongside your existing core ERPs, CRMs, and data warehouses.",
                },
                {
                  id: "03",
                  q: "How secure is our revenue data with your AI?",
                  a: "Completely private and enterprise-gated. We are SOC-2 Type II certified. Your data is never used to train public LLM models, and all semantic queries execute against private self-hosted or dedicated endpoints.",
                },
                {
                  id: "04",
                  q: "What industries do you specialize in?",
                  a: "We power high-volume contract and revenue discovery for Healthcare, Fintech, Telecommunications, Cloud Infrastructure, and Global Supply Chains.",
                },
                {
                  id: "05",
                  q: "Is there a long-term commitment?",
                  a: "No. Our Core Audit and Intelligence Partner tiers are offered on flexible month-to-month terms with straightforward cancellation policies.",
                },
                {
                  id: "06",
                  q: "What data sources can you connect?",
                  a: "PostgreSQL, MySQL, Snowflake, BigQuery, DuckDB, Salesforce, and high-volume streaming CSV/Parquet data feeds.",
                },
                {
                  id: "07",
                  q: "How do we track the direct ROI?",
                  a: "Through our built-in telemetry dashboard which tracks hours of engineering query time saved, reduction in data silos, and immediate recovery of leaked contract margins.",
                },
              ].map((faq, idx) => (
                <div
                  key={faq.id}
                  className="rounded-none bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#1e6aff] font-bold">
                        {faq.id}
                      </span>
                      <span className="font-sans">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${
                        openFaq === idx ? "rotate-180 text-[#1e6aff]" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-xs text-zinc-600 leading-relaxed font-sans border-t border-zinc-200 bg-zinc-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: [09 - CONTACT] (PURE WHITE THEME - Genesis 01:14 - 01:16)
            ========================================================================= */}
        <section className="w-full bg-[#ffffff] text-[#001225] py-24 border-b border-zinc-200 relative overflow-hidden">
          {/* Light Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-zinc-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-zinc-200 h-full" />
              ))}
            </div>
          </div>

          <div className="w-[90%] mx-auto max-w-7xl relative z-10 space-y-10 text-left">
            {/* Left-Aligned Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-mono text-xs text-zinc-500 font-bold tracking-widest uppercase">
                [09 - CONTACT] // GET STARTED
              </span>
              <span className="font-mono text-xs text-[#1e6aff] font-bold">
                DIRECT CONSULTATION
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Form Container (Clean Light Card) */}
              <div className="lg:col-span-7 p-8 rounded-none bg-zinc-50 border border-zinc-200 shadow-sm space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 font-sans">
                    Ready to automate your pipelines?
                  </h3>
                  <p className="text-xs text-zinc-600 font-sans">
                    Submit your details to receive an architectural data audit and private demo sandbox.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-mono space-y-2">
                    <div className="font-bold">REQUEST SUBMITTED SUCCESSFULLY</div>
                    <p className="text-zinc-700 font-sans">
                      Our lead architect will contact you within 2 business hours with your private sandbox credentials.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4 text-xs font-mono"
                  >
                    <div className="space-y-1.5">
                      <label className="text-zinc-700 font-bold">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full p-3.5 rounded-none bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:border-[#1e6aff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-zinc-700 font-bold">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@enterprise.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full p-3.5 rounded-none bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:border-[#1e6aff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-zinc-700 font-bold">TELL US ABOUT YOUR DATA INFRASTRUCTURE</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Current bottlenecks, 50k+ Excel sheet crashes, tools used, or automation goals..."
                        value={contactForm.notes}
                        onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                        className="w-full p-3.5 rounded-none bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:border-[#1e6aff]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-none bg-[#001225] hover:bg-[#1e6aff] text-white font-bold tracking-wide transition-all shadow-md text-xs"
                    >
                      Submit Request
                    </button>

                    <div className="text-[11px] text-zinc-500 font-sans text-center pt-2">
                      Your info is 100% safe with us. Read our Terms &amp; Privacy Policy.
                    </div>
                  </form>
                )}
              </div>

              {/* Testimonial Box */}
              <div className="lg:col-span-5 p-8 rounded-none bg-zinc-100 border border-zinc-200 shadow-sm space-y-6">
                <span className="text-[10px] font-mono text-[#1e6aff] uppercase tracking-wider block font-bold">
                  ENDORSEMENT
                </span>
                <p className="text-sm text-zinc-800 italic font-sans leading-relaxed">
                  &quot;DataScope delivered real-time analytics tracking and unified our scattered systems into a high-performance engine in weeks.&quot;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-zinc-200">
                  <div className="w-10 h-10 rounded-none bg-[#001225] text-white font-bold flex items-center justify-center font-mono text-xs">
                    DV
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 font-sans">David Vance</div>
                    <div className="text-[11px] text-zinc-500 font-mono">CTO, CloudScale Inc.</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 space-y-2">
                  <span className="text-xs font-mono text-[#1e6aff] block font-bold">
                    DIRECT ACTION
                  </span>
                  <Link
                    href="/explorer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-none bg-white hover:bg-zinc-50 border border-zinc-300 text-xs font-semibold text-zinc-800 transition-colors shadow-sm"
                  >
                    <Database className="w-3.5 h-3.5 text-[#1e6aff]" />
                    <span>Explore Live Demo Sandbox</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Public Footer (Full-Width Deep Dark Obsidian Theme) */}
      <PublicFooter />
    </div>
  );
}
