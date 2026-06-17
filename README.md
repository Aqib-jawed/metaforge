<div align="center">

# MetaForge

**Production-grade meta tag generator with real-time previews across Google, Twitter/X, and Facebook/LinkedIn.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-metaforge--nine.vercel.app-3B82F6?style=for-the-badge&logo=vercel&logoColor=white)](https://metaforge-nine.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2014-App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel%20Free-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

<br/>

> Fill in your page details. See exactly how it looks on Google, Twitter/X, and Facebook — before you ship. Copy production-ready HTML in one click.

<br/>

![MetaForge Preview](https://metaforge-nine.vercel.app/og-default.png)

</div>

---

## What It Does

Most developers write meta tags from memory, guess at character limits, and only find out the preview is broken when someone shares their link on Slack. MetaForge solves all three problems in one place.

You fill in a form. The tool generates correct, production-ready HTML for your `<head>` — covering Primary SEO tags, Open Graph (Facebook/LinkedIn), and Twitter Cards — and shows you a pixel-accurate preview of how the link will render on each platform before you ever deploy.

Everything runs in the browser. No backend, no accounts, no rate limits.

---

## Live Features

### Real-Time Platform Previews
Switch between three preview tabs — **Google**, **Twitter/X**, and **Facebook/LinkedIn** — and see your changes reflected instantly as you type. Each preview is a faithful simulation of how the actual platform renders link cards, including title truncation behavior, image aspect ratios, and domain display.

### Smart Character Counters
- Page Title: tracks against the **60-character** SEO limit
- Meta Description: tracks against the **160-character** SEO limit
- Counter turns **amber** as you approach the limit and **red** when you exceed it
- Inline feedback message: *"Looks great! Title and description are within optimal ranges."*

### Generated Code Block — IDE-Style
The output panel renders your meta tags in a syntax-highlighted code block styled like a real editor:
- Tag names in blue
- Attribute names in purple
- Values in green
- String content in orange
- Filename label: `meta-tags.html`

One-click **Copy All** button copies the entire block to clipboard and shows a `Copied ✓` confirmation for 2 seconds before resetting.

### Input Fields
| Field | Notes |
|---|---|
| Page Title | Required. Drives all platform title tags. |
| Meta Description | Drives all platform description tags. |
| Page URL | Used for canonical link + og:url + twitter:url |
| Site Name | Used for og:site_name |
| OG Image URL | Optional. 1200×630px recommended. Tags are omitted if empty. |
| Twitter / X Handle | Optional. Prepends `@` automatically if missing. |
| Page Type | Dropdown — Website / Article / Product → sets og:type |
| Robots — Index | Toggle: INDEX / NOINDEX |
| Robots — Follow | Toggle: FOLLOW / NOFOLLOW |

### Generated Tag Groups
```html
<!-- Primary Meta Tags -->
<title>…</title>
<meta name="description" content="…" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="…" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="…" />
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:image" content="…" />
<meta property="og:site_name" content="…" />

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="…" />
<meta name="twitter:title" content="…" />
<meta name="twitter:description" content="…" />
<meta name="twitter:image" content="…" />
<meta name="twitter:site" content="@…" />
```

### Theme Toggle
Light/Dark mode toggle in the navbar. Persists across the session. Dark theme default: `#0A0A0A` background, `#111111` surface cards, `#1F1F1F` borders.

---

## System Design

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│                                                      │
│  ┌────────────────┐        ┌──────────────────────┐ │
│  │   MetaForm     │──────▶ │     page.tsx          │ │
│  │  (Input Panel) │  state │  (State Orchestrator) │ │
│  └────────────────┘        └──────────┬───────────┘ │
│                                        │             │
│                             ┌──────────▼───────────┐ │
│                             │  generateMetaTags.ts  │ │
│                             │  (Pure Logic Layer)   │ │
│                             └──────────┬───────────┘ │
│                                        │             │
│                  ┌─────────────────────▼───────────┐ │
│                  │         MetaOutput               │ │
│                  │  ┌─────────────┐ ┌────────────┐ │ │
│                  │  │ LivePreview │ │  CodeBlock │ │ │
│                  │  │  (3 tabs)   │ │ + CopyBtn  │ │ │
│                  │  └─────────────┘ └────────────┘ │ │
│                  └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
              No network calls. No server. No database.
```

### Data Flow

```
User types in MetaForm
        │
        ▼
useState / useReducer in page.tsx updates FormState object
        │
        ▼
FormState passed as props to generateMetaTags(formState)
        │
        ▼
Pure function returns a formatted string of HTML meta tags
        │
        ├──▶ MetaOutput renders syntax-highlighted code block
        │
        └──▶ LivePreview reads same FormState to simulate
             platform card rendering (no API calls)
```

### Component Breakdown

```
/app
  page.tsx              → Root state container. Owns all form state.
                          Passes props down. No business logic here.
  layout.tsx            → Font loading (Inter + JetBrains Mono),
                          root HTML shell, theme class injection.

/components
  MetaForm.tsx          → All input fields. Controlled components.
                          Emits onChange up to page.tsx.
  MetaOutput.tsx        → Two-panel output: LivePreview + CodeBlock.
                          Reads derived state, never writes it.
  LivePreview.tsx       → Tabbed preview: Google / Twitter / Facebook.
                          Simulates real platform card rendering.
  CharCounter.tsx       → Reusable character counter with color states.
                          Props: value, max → renders count + warning color.
  CodeBlock.tsx         → Syntax-highlighted output. Copy-to-clipboard logic.
                          2-second "Copied ✓" state via useEffect timeout.
  ThemeToggle.tsx       → Light/Dark toggle in navbar.

/lib
  generateMetaTags.ts   → Pure function. Input: FormValues type.
                          Output: formatted HTML string.
                          Zero side effects. Fully unit-testable.
```

### Key Design Decisions

**Pure function for tag generation** — `generateMetaTags` takes a plain object and returns a string. It has no knowledge of React, no side effects, and no dependencies. This means it can be extracted, unit tested, or reused in a CLI/API context with zero changes.

**Single state owner** — all form state lives in `page.tsx` and flows down as props. No context, no global store. For a tool of this scope, prop drilling is simpler and more debuggable than a state manager.

**No "Generate" button** — output updates on every keystroke via controlled inputs. This is intentional: the feedback loop is tighter, the tool feels faster, and there's no ambiguity about whether the output is current.

**OG image tag omission** — if the OG Image URL field is empty, the `og:image` and `twitter:image` tags are omitted entirely from output rather than generating broken or placeholder tags. Broken image tags actively hurt social previews.

**Client-only, zero backend** — there is no server, no API, no database. This is a deliberate architectural choice: no cold starts, no rate limits, no data collection, and free hosting indefinitely on Vercel's Hobby plan.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 — App Router |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS — utility-first, no component library |
| Fonts | Inter (UI) · JetBrains Mono (code output) |
| Deployment | Vercel — Hobby (free) |
| Code Hosting | GitHub (public) |
| Runtime | Browser only — zero server-side execution |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/metaforge.git
cd metaforge

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [metaforge-nine.vercel.app](metaforge-nine.vercel.app).

**Requirements:** Node.js 18+ · npm 9+

```bash
# Build for production
npm run build

# Run production build locally
npm start
```

---

## Project Structure

```
metaforge/
├── app/
│   ├── layout.tsx          # Root layout, font config, theme shell
│   ├── page.tsx            # State orchestrator, top-level composition
│   └── globals.css         # Tailwind base + custom token overrides
├── components/
│   ├── MetaForm.tsx        # Input panel — all form fields
│   ├── MetaOutput.tsx      # Output panel — preview + code
│   ├── LivePreview.tsx     # Platform card simulations (3 tabs)
│   ├── CodeBlock.tsx       # Syntax-highlighted output + copy
│   ├── CharCounter.tsx     # Reusable character counter
│   └── ThemeToggle.tsx     # Light/Dark mode switch
├── lib/
│   └── generateMetaTags.ts # Pure tag generation logic
├── public/
│   └── og-default.png      # Fallback OG image
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Surface | `#111111` |
| Border | `#1F1F1F` |
| Accent | `#3B82F6` (Electric Blue) |
| Text Primary | `#F9FAFB` |
| Text Muted | `#6B7280` |
| Warning | `#F59E0B` (Amber) |
| Error | `#EF4444` (Red) |
| Font — UI | Inter |
| Font — Code | JetBrains Mono |

---

## Deployment

This project is deployed on **Vercel's free Hobby plan** with zero configuration beyond connecting the GitHub repo.

Every push to `main` triggers an automatic deployment. No paid plans, no environment variables, no build secrets required.

[![Deploy with Vercel](metaforge-nine.vercel.app)](https://vercel.com/new/clone?repository-url=https://github.com/Aqib-jawed/metaforge)

---

## Built For

This project was built as part of the **Digital Heroes** developer trial.

[![Built for Digital Heroes](https://img.shields.io/badge/Built%20for-Digital%20Heroes-3B82F6?style=for-the-badge)](https://digitalheroesco.com)

---

## Author

**Aqib Jawed**
B.Tech Computer Science · GITAM University · 2027

[Portfolio](https://portfolio-website-edwj.vercel.app/) · [Mail](akkijawed567@gmail.com) · [GitHub](https://github.com/Aqib-jawed)

---

<div align="center">

Made with precision · Deployed for free · Zero compromises

</div>
