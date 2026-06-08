# Comprensión Lectora — Current State

### Updated: 2026-06-07
### Status: **COMPLETE** — generation pipeline, multi-provider, provider persistence, and the full Semilla Aleatoria feature (engine + vat + review + genre filter) all shipped and field-tested. No open build work.

### Still-active specs:
- **None.** `seed-generator-spec.md` is now fully executed (engine, v2 vat, review panel, and genre filter all live) and is **safe to remove** from the project folder.
- `multi-provider-generator-spec.md` — fully executed; safe to delete.

---

## Purpose

Orient a future session to the finished state of `interactive/comprension-lectora.html` and its pipeline. General codebase orientation lives in `master_briefing.md`; this is the page-specific record.

---

## File location

The page lives at **`interactive/comprension-lectora.html`** (moved from the repo root this June). Relative includes are one level up (`../datos/seeds/semillas-data.js`, `../index.html`); the background is `../assets/los fondos/azulejos.webp`; the single inbound link is in `index.html`. Drive OAuth is origin-scoped (GIS token client), so the move needed no Google Console change. API (`/api/generate`, `/api/claude`) and Drive/GIS calls are absolute.

---

## What's shipped (live in production)

### Story-generation pipeline (Option B, two-call)
1. **Prep call** — Sonnet plans structure → `storyPlan` JSON (central question, thesis, locked ending, `ending_type`, per-episode `beat_plan`).
2. **Prose call** — Opus or Gemini writes prose from the resolved plan + bible.
3. **Bible call** — Sonnet writes between-episode continuity (stays on Sonnet regardless of generator).

### Modules
`MODULE_SPECS`: **Sorpréndeme** (open, default) and **Misterio** (structured). Sent as the prep-call system prompt only.

### Setup fields
Nivel · Registro · Regionalidad (+voseo) · Tema (+Sorpréndeme) · **Semilla aleatoria** · Modo de generación · Generador (Claude/Gemini) · Modo Individual/Fija (+episode count). All feed `buildPrompt(currentCfg)`, provider-agnostic.

### Multi-provider routing
`netlify/functions/generate.mts` — `/api/generate`, routes on `provider`. Gemini path translates the request, normalizes responses to Anthropic `content[]`, re-emits SSE as `content_block_delta`. Gemini = `gemini-2.5-pro`, thinking forced on (budget 512), `maxOutputTokens = prose + thinking + 4096`, `responseMimeType: application/json`, retry-with-backoff on 5xx/429. `claude.mts` untouched (other pages + bible call).

### Provider persistence
Save record stores `generator`; `resumeStory` restores it (legacy → `claude`) and re-syncs the button; a terracotta/indigo provenance pill renders in the header.

### Grading + the Gemini correct-index fix
Grading is deterministic local code. Gemini reliably wrote correct explanations but a wrong `correct` integer (defaulting to 0). Fix: the quiz schema requires a verbatim **`answer`** field; the client re-derives `q.correct` from it (exact, then substring fallback) before the option shuffle, falling back to the emitted index when absent. Claude unaffected; helps new generations only (old Gemini saves keep their bad indices).

### Semilla Aleatoria — the seed generator (COMPLETE)
A one-tap alternative to typing a Tema. A client-side number resolves to a hidden Spanish constraint string fed into the existing theme slot. **100% front-end — zero tokens** for rolling, review, and filtering; the model only ever sees the short resolved string at normal generation time. It exists to break the "one story type" default (genre is always named, so the model can't drift to its house style) while keeping the user surprised (the world is hidden).

- **Data:** `datos/seeds/semillas-data.js`, `const SEMILLAS`, **version 2 (full vat)** — 17 genres (including the anti-default comedia/sátira/noir/aventura/western/picaresca/thriller), ~21 places, 16 protagonist roles, plus optional época / conflicto / núcleo temático (22) / tono (11) / final. Per-field `label` (used by the review panel) and `noneWeight` (fire-rate dial) live in the data, so future pool edits never touch the page.
- **Engine:** `mulberry32` PRNG → `rollSeed` (pre-filters gated pools by genre before the dice, weighted pick consuming one draw per field in fixed `rollOrder`, `noneWeight`-controlled "none" slot for optional fields) → `seedToTheme`. Deterministic per data version; every integer is a valid seed.
- **Tuning:** spine (genero/lugar/personaje) always fires; optional fields tuned to ~5.8 constraints per roll average — enough to push off-default, loose enough to surprise.
- **Gating (validated, 40k-roll sweep, zero drains):** space settings only under sci-fi/distopía; period genres never set in the future; every genre keeps a full place pool.
- **UI:** the Semilla toggle disables Tema/Sorpréndeme/Modo while on (Generador stays active); blue **Generar semilla** mints + shows a number on enable; neutral-slate `Semilla N` pill in the header; the generating screen shows `Semilla N`, never the world.
- **Persistence:** save record stores `seed` + `seedVersion`; resume restores them as metadata and reuses the hidden world for continuation via `cfg.seedTheme` (never exposed in the Tema box).
- **Review panel:** 🔍 *Revisar una semilla* modal — number → `Revelar` replays `rollSeed` against current data, shows the world + per-field breakdown + version note. Same engine as generation, so a number reproduces what it generated.
- **Genre filter:** 🎛️ *Filtrar géneros* modal — checkbox per genre (all checked = full pool), uncheck to exclude, remembered in localStorage. Filtering happens at **mint time** (mint random numbers, keep the first whose pure full-pool roll lands an allowed genre), so the roller stays pure and determinism/review are unaffected. Empty/all-excluded falls back to the full pool (no dead pool).
- **Scale:** ~204.5M distinct resolved worlds (≈4,000 genre×place×protagonist cores, ≈1.1M with tone+theme); the seed sets the premise, not the story, so actual distinct stories are effectively unbounded.

### Modals
All modals (`.modal-box`) are capped at `calc(100vh - 40px)` with internal scroll, so buttons stay reachable on short/wide screens.

---

## Open items

- **`variationBlock` suppression decision** (carry-over): whether to suppress `variationBlock` when `hasStoryPlan` is true. Still unaddressed; revisit when reviewing prose quality.
- Nothing else open for this page. Tuning the seed vat (adding genres/themes, adjusting `noneWeight`/`weight`) is pure data editing in `semillas-data.js` — no code, just bump `version`.

---

## Future ideas

- **More modules** — Rom-com, Romántica, Drama, Sci-fi (Daniel's interest), plus Realismo mágico, Histórica, Fábula, Cotidiana, Distopía, Terror. Append to `MODULE_SPECS` + a button; the work is the spec. Pick 2–3, write deliberately, field-test on both providers.
- **Review Portal (`revision-lectora.html`)** — next in the build queue: browse/filter/rate/replay/delete archived quizzes from Drive. This page is the corpus generator; the portal is the curator. Can show provider and seed per story.

---

## Files of interest
- `interactive/comprension-lectora.html` — the page
- `datos/seeds/semillas-data.js` — seed data set (v2)
- `netlify/functions/generate.mts` — multi-provider routing
- `netlify/functions/claude.mts` — thin Anthropic proxy (other pages + bible)
- `netlify.toml` — function timeout 30s (safe for streaming Gemini)

---

*Updated by Claude with Daniel, 2026-06-07. Project marked complete.*
