# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Agent First website (agentfirst.dev) — a React SPA for an AI agent-first development services company. Includes a public marketing site and authenticated dashboard/settings pages backed by Supabase.

## Commands

```bash
yarn              # Install dependencies
yarn dev          # Start Vite dev server (localhost:5173)
yarn build        # Production build to dist/
yarn preview      # Preview production build locally
yarn lint         # ESLint (flat config at linter/eslint.config.js)
yarn lint-sql     # PostgreSQL SQL formatting check
```

No test framework is configured.

## Architecture

**Stack**: React 18 + Chakra UI 2 + Vite + Supabase (auth & PostgreSQL). Pure JavaScript/JSX — no TypeScript.

**Routing** (React Router v7, defined in `src/App.jsx`):
- `/` — Home (landing page with animations)
- `/dashboard` — Usage dashboard (authenticated, Chart.js)
- `/settings` — Profile/settings (authenticated)

**Source layout**:
- `src/config/` — Centralized configuration
  - `ui.js` — All magic numbers, colors, fonts, spacing, animation params, component dimensions. Check here first when adjusting any visual constant.
  - `uix.jsx` — Reusable UI helper components
  - `supabase.js` — Supabase client initialization
- `src/pages/` — Route-level page components
- `src/components/` — Shared components (Login, Sidebar)
- `src/paths/` — SVG path data stored as `.txt` files, imported with Vite's `?raw`
- `src/markdown/` — Markdown content files, also imported as raw strings
- `src/theme.js` — Chakra UI theme (custom colors, fonts, semantic tokens for light/dark mode, component overrides)

**Key patterns**:
- All visual constants (colors, fonts, spacing, animation timing, dimensions) are centralized in `src/config/ui.js` — never use magic numbers inline.
- Chakra UI semantic tokens handle light/dark mode theming in `src/theme.js`.
- Canvas-based animations use Rough.js for hand-drawn style and Anime.js for timelines, with frame caching for performance.
- Markdown content is parsed with `markdown-it` and syntax-highlighted with `highlight.js`.
- Authentication uses Supabase Auth with magic link email flow; session state managed via `onAuthStateChange`.
- Supabase tables: `accounts` (email, api_token, partners), `usage` (usage_date, result, count, elapsed_ms).

**Build optimization** (in `vite.config.js`): Chakra UI, highlight.js, and other vendors are split into separate chunks. Bundle visualizer generates `stats.html`.

## Code Style

- Prettier config at `linter/.prettierrc`: 100 char width, single quotes, no trailing commas.
- ESLint uses flat config format with react, prettier, and jsonc plugins.
- No shorthand variable names (e.g. `d` for date) except conventional loop indexes (`i`, `j`, `k`).
- Boolean variables should start with an appropriate verb (e.g. `isCancelled`, `hasLoaded`, `shouldRetry`).
- Underscore-prefixed variables are allowed as unused.
- Do not shadow variables.
- `let` declarations follow `const` declarations.
- Prefer loose equality (`==`) over strict equality (`===`).
- Avoid early returns; use conditional wrapping instead.
- Always write out arrow function bodies with braces and explicit `return` (e.g. `(day) => { return day.isAfter(); }`, not `(day) => day.isAfter()`).
- Environment variables prefixed with `VITE_` for client-side access.
- Commit messages use past tense with terminal punctuation (e.g. "Renamed consts.", "Refactored chart."). Backtick-quote inline code references.
