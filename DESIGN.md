# DataScope: High-Performance Enterprise Data Intelligence Platform

## Overview

**Product:** DataScope Enterprise Intelligence Platform  
**URL:** https://datascope.io  
**Surface type:** Enterprise SaaS & Data Discovery Hub  
**Audience:** Data Engineers, Revenue Operations, Finance Leaders, and Business Executives  
**Brand character:** Precision-engineered, authoritative, high-density architectural experience. Designed for sub-20ms data discovery across 100,000+ business contracts with zero spreadsheets crashing.

### Design Principles

- **Zero-Lag Perceived Performance:** Perceived and actual performance is part of the design system. Tables and charts render locked at 60 FPS.
- **Sharp Architectural Geometry:** Strict 0px rectangular corners (`rounded-none`). Precision enterprise look resembling Bloomberg Terminal meets Linear.
- **Deep Obsidian Density:** Deep midnight navy background with high-contrast electric blue and sky cyan accents for optimal focus and zero eye fatigue.
- **Single Source of Truth:** Every interactive view is state-backed, bookmarkable, and audit-logged with zero stale versions.
- **Self-Serve Simplicity:** Point-and-click visual predicate builders replace raw SQL without sacrificing power.

---

## Colors

| Token | Hex Value | Role | Usage |
|---|---|---|---|
| `bg-canvas` | `#001225` | Background Dark | Root page background, deep obsidian navy canvas |
| `bg-surface` | `#051329` | Surface Layer | Container background for tables, modals, and major sections |
| `bg-surface-elevated` | `#071529` | Surface Elevated | Elevated card background, hovered rows, dropdown menus |
| `bg-card` | `#091b36` | Card Surface | Secondary interactive cards, active tabs, metric tiles |
| `border-subtle` | `#132a4a` | Inset Border | Structural grid dividers, table row borders, card borders |
| `border-accent` | `#1e6aff` | Active Border | Focus rings, selected state borders, primary card highlights |
| `brand-primary` | `#1e6aff` | Primary Action | Primary CTA buttons, timeline active markers, key indicators |
| `brand-cyan` | `#38bdf8` | Secondary Accent | Heading gradients, monospace metric values, active glow |
| `brand-emerald` | `#10b981` | Positive / Speed | Sub-20ms latency badge, active deal status, positive profit |
| `brand-amber` | `#f59e0b` | Caution / Pending | Pending review tags, secondary warnings |
| `brand-rose` | `#f43f5e` | Urgent / Alert | Urgent priority deals, comparison problem columns, errors |
| `text-primary` | `#ffffff` | Text Primary | Primary titles, table values, active button text |
| `text-secondary` | `#94a3b8` | Text Secondary | Descriptive paragraphs, table headers, supporting copy |
| `text-muted` | `#878787` | Text Muted | Metadata, timestamps, table borders, inactive icons |

---

## Typography

**Font stack:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif, "JetBrains Mono", monospace

| Level | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| `text-xs` | 11px | 400 / 600 | `+0.05em` | Captions, technical metadata, status badges (mono) |
| `text-sm` | 13px | 400 / 500 | `normal` | Table cells, form inputs, secondary descriptions |
| `text-base` | 15px | 500 / 600 | `-0.01em` | Standard body text, card titles, navigation items |
| `text-lg` | 18px | 600 | `-0.02em` | Subheadings, section titles, modal headers |
| `text-xl` | 24px | 700 | `-0.025em` | Showcase section headings, major stats |
| `text-2xl` | 36px | 700 | `-0.03em` | Feature hero titles, comparison headers |
| `text-3xl` | 56px - 72px | 800 | `-0.035em` | Primary Hero H1 headlines |

**Weight scale:** 400 (Regular) · 500 (Medium) · 600 (SemiBold) · 700 (Bold) · 800 (ExtraBold)  
**Monospace Usage:** All latency numbers (`< 20ms`), revenue figures (`$841,366.54`), timestamps, and deal IDs (`REC-055594`) use `font-mono`.

---

## Spacing

**Base unit:** 4px

`space-1: 4px` · `space-2: 8px` · `space-3: 12px` · `space-4: 16px` · `space-5: 20px` · `space-6: 24px` · `space-8: 32px` · `space-10: 40px` · `space-12: 48px` · `space-16: 64px` · `space-20: 80px` · `space-24: 96px`

**Container Width:** `w-[90%] mx-auto max-w-7xl` with 24px minimum gutter padding.

---

## Shapes & Geometry

**Border radius:** `radius: 0px` (Strictly `rounded-none`).  
No rounded pill buttons, circular badges, or curved card corners. Every element is an exact rectangular architectural block.

---

## Elevation & Lighting

- **border-glow-primary:** `0 0 0 1px #1e6aff, 0 8px 24px -4px rgba(30, 106, 255, 0.25)`
- **border-glow-cyan:** `0 0 0 1px #38bdf8, 0 8px 24px -4px rgba(56, 189, 248, 0.20)`
- **card-flat:** `inset 0 0 0 1px #132a4a`
- **ambient-glow:** Radial backdrop blur (`bg-[#1e6aff]/10 blur-[170px]`) on midnight background.

---

## Motion & Transitions

- **duration-instant:** `100ms ease-out` (button clicks, filter tab switches)
- **duration-fast:** `200ms cubic-bezier(0.16, 1, 0.3, 1)` (hover state borders, row highlights)
- **duration-smooth:** `350ms cubic-bezier(0.16, 1, 0.3, 1)` (modal/drawer slides, timeline transitions)
- **scroll-smoothing:** Butter-smooth inertial scrolling driven by Lenis.

---

## Components

### 1. Primary Action Button (CTA)
- **Anatomy:** Rectangular box, `px-6 py-3.5`, `rounded-none`, bg `#1e6aff`, text `#ffffff`, font-semibold.
- **States:**
  - Default: bg `#1e6aff` with subtle `shadow-[#1e6aff]/25`.
  - Hover: bg `#2b75ff`, border `1px solid #38bdf8`, icon nudges 2px right.
  - Active: bg `#1753cc`, scale 0.99.

### 2. Secondary Outline / Glass Button
- **Anatomy:** Rectangular box, `px-5 py-3.5`, `rounded-none`, bg `#051329`, border `1px solid #132a4a`, text `#38bdf8`.
- **States:**
  - Default: border `#132a4a`, text `#38bdf8`.
  - Hover: bg `#091b36`, border `#1e6aff`, text `#ffffff`.

### 3. Metric Tile Card
- **Anatomy:** `p-5`, `rounded-none`, bg `#051329`, border `1px solid #132a4a`.
- **Content:** Mono uppercase title, large bold metric number (e.g. `< 20ms`), subtext description.
- **Accent:** 2px top border highlight in `#1e6aff`, `#38bdf8`, or `#10b981`.

### 4. Interactive Data Table (Virtualized)
- **Anatomy:** Full-width container, header row in `#0f1320` with uppercase mono columns, alternating rows with `hover:bg-[#071529]`.
- **States:** Active record opens right-side audit drawer with smooth slide-in transition.

### 5. Filter & Query Predicate Chip
- **Anatomy:** Monospace tag, `px-2.5 py-1`, `rounded-none`, bg `#091b36`, border `1px solid #142b4d`.
- **Syntax:** `WHERE [Field] [Operator] [Value]` with syntax coloring.

---

## Do's and Don'ts

### Do
- Use strict rectangular geometry (`rounded-none`) across all UI elements.
- Use the Dark Obsidian Midnight palette (`#001225`, `#051329`, `#1e6aff`, `#38bdf8`, `#10b981`).
- Display all quantitative metrics and technical identifiers in monospace (`font-mono`).
- Ensure high contrast ($>4.5:1$) for all body text against dark backgrounds.
- Provide clear visual indicators for fast system feedback (e.g., `< 20ms Instant Response`).

### Don't
- DO NOT use generic purple (`#6c35f5`, `#7c3aed`) or amber (`#ff8204`).
- DO NOT use rounded pill shapes, rounded buttons, or circular card corners.
- DO NOT use bright white or light-mode container backgrounds.
- DO NOT hide critical data latency and capacity metrics behind vague marketing claims.
- DO NOT overload screens with unnecessary skeuomorphic gradients; keep lines crisp and architectural.

---

## Writing Tone

Authoritative, high-precision, technical, and benefit-driven. Speaks directly to enterprise decision-makers and engineers. Active voice, zero fluff.

---

## Required Sections Checklist

1. **Public Navigation Header:** Brand monogram, title, navigation links, session auth trigger.
2. **Hero Value Proposition:** Instant Data Discovery, H1 gradient, 3 CTAs, 4 impact metric cards.
3. **Motion Hero Showcase:** 4-stage pipeline timeline (100k Ingestion, Whisper Voice, Sub-20ms Query, Profit Analytics), 3 live story presets.
4. **Comparison Matrix:** Spreadsheet Chaos vs DataScope Solution (4 pain points vs 4 modern architectural fixes).
5. **Interactive Workflow Showcase:** 4 tabs (Instant Search Table, Visual Query Builder, AI Natural Language Assistant, Saved Views).
6. **Target Personas:** 3 roles (Executive Leadership, RevOps & Deal Desks, Data Analysts).
7. **The DataScope Advantage:** 6 tangible benefit cards.
8. **FAQ Accordion:** 5 business and architecture answers.
9. **Final CTA Banner:** High-impact launch banner with primary action buttons.
10. **Public Footer:** System status, architecture specs, enterprise compliance badges.
