# DataScope Design System Specification: Render × Mistral Fusion

## Overview

**Product:** DataScope Enterprise Intelligence Platform  
**System Architecture:** Render Cloud Developer Ergonomics × Mistral Frontier AI Editorial System  
**Surface Type:** Enterprise Data Explorer & Analytics Web Application  
**Audience:** Data Engineers, Analytics Leaders, Solutions Architects, and Technical Decision-Makers  
**Brand Character:** Precise, high-density, authoritative developer experience. Blends Render's polished cloud infrastructure aesthetic with Mistral's vibrant amber AI energy and high-contrast editorial hierarchy.

---

### Core Design Principles

1. **Consistency Over Novelty**  
   Reuse existing components, tokens, and elevation patterns before inventing new one-offs. Every widget conforms to standard card and pill paradigms.
2. **Token-Driven Decisions**  
   Every color, shadow, spacing step, and border radius references an explicit CSS variable token in `globals.css` rather than hardcoded magic values.
3. **Accessible by Default**  
   WCAG 2.2 AA compliance is a strict baseline. All text against dark backgrounds maintains a contrast ratio $\ge 4.5:1$, and interactive states feature perceptible focus rings and hover elevation cues.
4. **Standardized Corner Radius (`rounded-lg` / 8px)**  
   All buttons, cards, drawers, and modal containers strictly enforce `0.5rem` (`rounded-lg`) corner geometry.
5. **Clean Typography (Standard Bold `font-weight: 700`)**  
   Headings use structured weights ($400, 500, 600, 700$). Heavily distorted or ultra-heavy weights (`font-black`, `font-extrabold`) are explicitly prohibited in favor of sharp, legible modern type.

---

## Color System

DataScope synthesizes **Render's deep cloud palette** (Iris `#6C35F5`, Hills Warm `#968DFA`, Obsidian Dark `#080A10`) with **Mistral's signature high-energy palette** (Mistral Amber `#FF8204`, Charcoal `#1A1A1E`, Cool Gray `#A1A1AA`, and Paper `#FAFAF4`).

### Core Design Tokens

| Token Name | Hex Value | Semantic Role | Usage & Surface |
| :--- | :--- | :--- | :--- |
| `--background` | `#080A10` | Canvas Surface | Root page background, deep obsidian tone |
| `--card` | `#0C0F18` | Container Surface | Primary card background for tables, charts & widgets |
| `--card-border` | `#1A2030` | Inset Border | Subdued structural dividers and panel borders |
| `--color-iris-700` | `#581CCB` | Render Deep Brand | Primary CTA gradient anchor & active accents |
| `--color-hills-mid` | `#6C35F5` | Render Primary Iris | Primary interactive buttons, logo gradients & focus rings |
| `--color-hills-warm`| `#968DFA` | Render Soft Lilac | Secondary text emphasis, icon glows, active borders |
| `--color-hills-warm-2`| `#B193E0`| Render Light Lilac | Pill badges, selected navigation items, subtitles |
| `--color-product-success`| `#0B7D55` | Render Success Green | Positive metrics, fast query latency ($<20\text{ms}$), active status |
| `--color-mistral-amber` | `#FF8204` | Mistral Core Amber | AI search assistant, query builder tags, highlight badges |
| `--color-mistral-amber-light` | `#FFA033` | Mistral Bright Amber| GIN trigram indexing pills, interactive hover states |
| `--color-mistral-dark` | `#1A1A1E` | Mistral Charcoal | Dark elevated layers, code containers, terminal boxes |
| `--color-mistral-gray` | `#A1A1AA` | Mistral Neutral | Secondary labels, descriptions, and metadata text |
| `--color-mistral-paper`| `#FAFAF4` | Mistral High White | Primary heading color, maximum readability text |

---

## Typography System

DataScope uses **Outfit** across all pages, calibrated to the **shadcn/ui** typographic hierarchy.

### Font Family
- **Sans-Serif & Mono:** `'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Form controls (`input`, `button`, `select`, `textarea`) automatically inherit Outfit.

### Typographic Hierarchy (shadcn/ui Compatible)

| Element / Class | Desktop Size / Line-Height | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **H1** (`.typography-h1`) | `2.75rem` (44px) / `1.15` | Bold (700) | `-0.025em` | Hero headings, landing page titles |
| **H2** (`.typography-h2`) | `1.875rem` (30px) / `2.25rem` | SemiBold (600) | `-0.025em` | Page header titles (`/explorer`, `/search`), section titles |
| **H3** (`.typography-h3`) | `1.5rem` (24px) / `2.0rem` | SemiBold (600) | `-0.025em` | Card titles, modal headers, drawer titles |
| **H4** (`.typography-h4`) | `1.125rem` (18px) / `1.5rem` | SemiBold (600) | `-0.02em` | Widget headers, column groupings |
| **Lead** (`.typography-lead`) | `1.25rem` (20px) / `1.75rem` | Regular (400) | `normal` | Subtitle introductions beneath page titles |
| **Body (P)** (`.typography-p`) | `0.875rem` (14px) / `1.625` | Regular (400) | `normal` | Default body copy, descriptions, table cells |
| **Large** (`.typography-large`) | `1.125rem` (18px) / `1.75rem` | SemiBold (600) | `-0.015em` | Callout stats, drawer metric highlights |
| **Small** (`.typography-small`)| `0.875rem` (14px) / `1.25rem` | Medium (500) | `normal` | Table captions, secondary metadata |
| **Muted** (`.typography-muted`)| `0.875rem` (14px) / `1.25rem` | Regular (400) | `normal` | Secondary helper text (`text-zinc-400` / `#A1A1AA`) |
| **Code** (`.typography-code`) | `0.875rem` (14px) | SemiBold (600) | `normal` | Inline SQL, trigram indexes (`pg_trgm`), query times |

---

## Spatial System & Border Radius

### Spacing Grid
- **Base Grid:** Multiples of `4px` (`0.25rem`) and `8px` (`0.5rem`).
- **Standard Card Padding:** `p-4` (16px) for compact data widgets, `p-6` (24px) for architectural cards and modals.
- **Section Rhythm:** `gap-4` (16px) for data grids, `gap-6` (24px) for dashboard cards, `py-16` / `py-20` for marketing sections.

### Border Radius
- **Strict Requirement:** `rounded-lg` (`0.5rem` / `8px`) for all buttons, cards, badges, modals, drawers, and form inputs.
- Tailored in Tailwind v4 `@theme`:
  ```css
  --radius-xl: 0.5rem;
  --radius-2xl: 0.5rem;
  --radius-3xl: 0.5rem;
  ```
- Any component requesting `rounded-xl`, `rounded-2xl`, or `rounded-3xl` maps cleanly to standard `rounded-lg` (8px).

---

## Elevation & Shadow Tokens

DataScope adopts Render's signature **Inset Border Glow** technique paired with Mistral's **Amber Energy Glow**.

```css
/* Render Inset Shadows */
--shadow-render-sm: 0 0 0 1px rgba(150, 141, 250, 0.22) inset;
--shadow-render-md: 0 0 0 1px rgba(150, 141, 250, 0.26) inset, 0 10px 24px -12px rgba(0, 0, 0, 0.7);
--shadow-render-lg: 0 0 0 1px rgba(150, 141, 250, 0.35) inset, 0 16px 32px -12px rgba(108, 53, 245, 0.35);

/* Mistral Amber Inset Shadows */
--shadow-mistral-sm: 0 0 0 1px rgba(255, 130, 4, 0.3) inset;
--shadow-mistral-md: 0 0 0 1px rgba(255, 130, 4, 0.35) inset, 0 10px 24px -10px rgba(255, 130, 4, 0.25);
```

---

## Motion & Transition Tokens

All transitions use Render's high-responsiveness bezier timing curves:
- `--ease-render: cubic-bezier(0.16, 1, 0.3, 1)`
- `--duration-fast: 150ms` (for button hovers and click states)
- `--duration-base: 300ms` (for card lifts, drawer slides, and modal popups)

---

## Component Specification

### 1. Render Elevation Card (`.render-card`)
- **Base:** `#0C0F18`, border `1px solid #1A2030`, shadow `var(--shadow-render-sm)`, radius `rounded-lg`.
- **Hover:** Border shifts to `rgba(150, 141, 250, 0.45)`, shadow escalates to `var(--shadow-render-md)`, translates `-2px` vertically.

### 2. Mistral Elevation Card (`.mistral-card`)
- **Base:** `#0C0F18`, border `1px solid #1A2030`, shadow `var(--shadow-mistral-sm)`, radius `rounded-lg`.
- **Hover:** Border shifts to `rgba(255, 130, 4, 0.5)`, shadow escalates to `var(--shadow-mistral-md)`, translates `-2px` vertically.

### 3. Primary CTA Button (`.btn-render-primary`)
- **Gradient:** `linear-gradient(135deg, #6C35F5 0%, #581CCB 100%)`.
- **Border:** `1px solid rgba(150, 141, 250, 0.35)`.
- **Shadow:** `0 0 0 1px rgba(150, 141, 250, 0.2) inset, 0 8px 18px -4px rgba(108, 53, 245, 0.4)`.
- **Radius:** `rounded-lg`.

### 4. Mistral Energy Button (`.btn-mistral-amber`)
- **Gradient:** `linear-gradient(135deg, #FF8204 0%, #E66F00 100%)`.
- **Border:** `1px solid rgba(255, 130, 4, 0.45)`.
- **Shadow:** `0 0 0 1px rgba(255, 255, 255, 0.22) inset, 0 8px 18px -4px rgba(255, 130, 4, 0.45)`.
- **Radius:** `rounded-lg`.

### 5. Status Badges (`.render-pill`, `.mistral-pill`)
- **Render Pill:** Lilac text `#B193E0`, background `rgba(108, 53, 245, 0.12)`, border `rgba(150, 141, 250, 0.3)`.
- **Mistral Pill:** Amber text `#FFA033`, background `rgba(255, 130, 4, 0.12)`, border `rgba(255, 130, 4, 0.32)`.

---

## Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| **Do** use `rounded-lg` (8px) for every card, button, and input field. | **Don't** use `rounded-2xl`, `rounded-3xl`, or `rounded-none`. |
| **Do** use `font-bold` (700) or `font-semibold` (600) for headers. | **Don't** use `font-black` (900) or `font-extrabold` (800). |
| **Do** use `.render-card` or `.mistral-card` classes for dashboard panels. | **Don't** invent new background colors or random border colors. |
| **Do** highlight AI search and NLP features with Mistral Amber (`#FF8204`). | **Don't** mix unrelated neon greens or purples into the core navigation. |
| **Do** use the custom transparent DataScope "D" monogram logo (`DataScopeLogo`). | **Don't** use raw unstyled SVG icons or emoji as brand representations. |

---

## Authoring Workflow & Definition of Done

1. **Token Verification:** Every new style rule must map to an existing token in `frontend/src/app/globals.css`.
2. **Typography Check:** All page titles must follow the shadcn scale: `text-2xl sm:text-3xl font-bold tracking-tight text-white` with a `text-sm text-zinc-400` subtitle.
3. **Build Check:** Before delivering any task, run `npm --prefix frontend run build` to verify 100% clean Next.js 15 compilation with zero TypeScript or route conflicts.
