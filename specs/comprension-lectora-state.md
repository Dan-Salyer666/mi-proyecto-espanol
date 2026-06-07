# Comprensión Lectora — Current State

### Updated: 2026-06-07
### Status: **STABLE** — Phase 4 (provider persistence) + Semilla Aleatoria (Phase A) shipped and field-tested

### Replaces:
- The 2026-05-29 version of this file. Everything it described is still true and is carried forward below; this revision adds the work done in the June 6–7 session and retires the items that have since shipped.

### Still-active specs:
- **`seed-generator-spec.md` remains active.** The seed engine, schema, and UI are built and frozen as-built (see "Semilla Aleatoria" below), but the spec stays the reference until **Phase C** — populating the full data vat — is done. Do not delete it yet.
- `multi-provider-generator-spec.md` — fully executed; safe to delete.

---

## Purpose of this document

Orient a future session — Claude or Daniel — to the current state of `comprension-lectora.html` and the surrounding generation pipeline. What's shipped, why each piece is where it is, what's still open, and where Daniel wants to take it next. Page-specific state and decisions; general codebase orientation lives in `master_briefing.md`.

---

## File location (CHANGED this session)

The page now lives at **`interactive/comprension-lectora.html`** (moved from the repo root, where it predated the directory structure). Consequences, all handled:

- Relative includes are now one level up: `../datos/seeds/semillas-data.js`, `../index.html`.
- The background image is `../assets/los fondos/azulejos.webp` (see below).
- The single inbound link, in `index.html`, points to `interactive/comprension-lectora.html`.
- **Drive OAuth is unaffected** — it uses the GIS *token client* (popup), which is scoped to the origin, not a page path. No Google Cloud Console change was needed.
- API (`/api/generate`, `/api/claude`) and Drive/GIS calls are absolute, so the move didn't touch them.

### Background image

Now `../assets/los fondos/azulejos.webp` (lowercase, case-sensitive on Netlify). `assets/los fondos/` is the new permanent home for background art; older pages still point at copies elsewhere and will be migrated over time. The old root reference was `assets/Azulejos.webp` (capital A) — dropped.

---

## What's shipped (live in production)

### Story-generation pipeline (Option B, two-call)

1. **Prep call** — Sonnet does structural planning. Emits a `storyPlan` JSON: central question, thematic thesis, locked ending (what protagonist completes / how world responds / final image), `ending_type`, per-episode `beat_plan`.
2. **Prose call** — Opus (or Gemini) writes the prose using the resolved plan, the bible (episode 2+), and the buildPrompt context.
3. **Bible call** — Sonnet writes a between-episode continuity document after each episode, read by the next episode's prose call.

Elaborate inline planning during prose generation contaminates output register; separating planning from prose was the fix. The prose call sees resolved constraints, not planning meta-language.

### Modules

`MODULE_SPECS` holds two: **Sorpréndeme** (universal lean spec, open latitude, default) and **Misterio** (mystery/noir with structural ending types and thematic anchoring). The module spec is the system prompt to the **prep** call only; the prose call never sees it.

### Setup screen fields

- **Nivel** — A1 / A2 / B1 / B2 / C1
- **Registro** — cotidiano / literario / periodístico
- **Regionalidad** — neutral / latinoamericano (+ optional voseo) / rioplatense / spain
- **Tema** — free-text, with "Sorpréndeme — tema libre" checkbox
- **Semilla aleatoria** — seed mode (NEW this session; see below)
- **Modo de generación** — Sorpréndeme / Misterio
- **Generador** — Claude / Gemini
- **Modo (Individual / Fija)** — toggles episode count; Episode count input (Fija only)

All fields feed `buildPrompt(currentCfg)`, which is provider-agnostic.

### Multi-provider routing

- **`netlify/functions/generate.mts`** — single `/api/generate` endpoint, routes on a `provider` field. Claude path equals `claude.mts`. Gemini path translates the request (system → systemInstruction, messages → contents, assistant → model), normalizes non-streaming responses into Anthropic `content[]`, and re-emits Gemini SSE as Anthropic `content_block_delta` so the front-end stream reader is unchanged.
- **Gemini specifics:** `gemini-2.5-pro`; thinking forced on (min 128, default budget 512); `maxOutputTokens = prose + thinking + 4096 pad` to avoid silent truncation; `responseMimeType: "application/json"` for guaranteed-parseable JSON; retry-with-backoff on 429/5xx, fail-fast on 400/401/403.
- **`claude.mts` untouched** — still serves every other page and the bible continuity call. The bible stays on Sonnet regardless of generator (mechanical bookkeeping, not voice).

### Provider persistence — Phase 4 (SHIPPED this session)

Formerly an open item; now done and verified.

- Save record stores `generator`.
- `resumeStory` restores `cfg.generator` (legacy saves default to `'claude'`) and re-syncs the selected Generador button.
- A provenance pill renders in `#qTags`: terracotta **Claude** / indigo **Gemini** (`.gen-badge.gen-claude` / `.gen-gemini`).
- Resuming a Gemini story now continues on Gemini — no mid-story voice break.

### Grading + the Gemini correct-index fix (UPDATED this session)

Grading is **deterministic local code**: the front-end compares the user's clicked index against the question's `correct`. No second AI pass.

The earlier mitigation was a prompt rule asking the model to verify `correct` matched `explanation`. Claude obeyed it; **Gemini did not reliably** — it wrote correct explanations but emitted a wrong `correct` integer that tended to default to 0, so right answers graded wrong. The structural fix shipped this session:

- The quiz JSON schema now requires an **`answer`** field: a verbatim copy of the correct option's text. Both schema strings (with/without `planned_ending`) and the self-verify rule were updated to make `answer` the source of truth.
- On the client, right after parse and **before** the option shuffle, `q.correct` is re-derived from `answer` via exact match (then a substring fallback for minor punctuation drift). If `answer` is absent — old saves, or a provider that omits it — the emitted index is used unchanged (no regression).

This stops trusting Gemini's integer and instead derives the index from the answer text it already produces correctly. Claude is unaffected (its index already agreed). Note: this only helps **newly generated** quizzes; pre-fix Gemini saves still carry the bad indices.

### Semilla Aleatoria — seed generator, Phase A (NEW this session)

A third way to start a story, alongside Tema and Modo. Tapping the toggle mints a **client-side** seed number that resolves to a terse Spanish constraint string, fed into the existing theme slot exactly like a typed Tema. The resolved world is hidden (surprise); only the number is shown, saved, and reviewable.

> **HARD GUARDRAIL (from the spec, honored):** the seed generator is 100% front-end. No model call during rolling or review — zero tokens. The AI only ever receives the short resolved string at normal generation time.

- **Data file:** `datos/seeds/semillas-data.js` — a versioned `const SEMILLAS` (JS-as-data, same pattern as the verb files), loaded before the page script. **Currently version 1 (tiny vat):** 3 genres, 6 places (`estacion`/`nave` gated to sci-fi via `requires`), and spice fields (final, deadly-sin lens, character, situation, time, treatment). Deliberately small — it holds the one real prune conflict that proves the engine.
- **Engine:** `mulberry32` PRNG → `rollSeed` (pre-filters each gated pool by chosen genre *before* the dice, weighted pick consuming exactly one draw per field in a fixed roll order, optional "none" slot for `optional` fields) → `seedToTheme`. Deterministic against a given data version; every integer is a valid seed (no dead numbers).
- **UI:** the **Semilla aleatoria** toggle disables Tema / Sorpréndeme / the Modo buttons while on (the Generador buttons stay active — seed picks the *world*, the generator picks *who writes it*). A blue **Generar semilla** button rolls a fresh number; a seed is minted and shown the moment the toggle is enabled.
- **Generation:** the theme branch uses `cfg.seedTheme` in seed mode and is otherwise byte-identical to before (zero regression when seed mode is off). The generating screen shows `Semilla N`, never the resolved world.
- **Persistence:** save record stores `seed` + `seedVersion`. Resume restores them as metadata; for a Fija seed story the hidden world is reused for continuation via `cfg.seedTheme` rather than being exposed in the Tema box.
- **Badge:** neutral-slate `Semilla N` pill (`.gen-badge.gen-seed`) in the story header when a seed is present.
- **Review (Step 2):** a 🔍 *Revisar una semilla* link opens a modal — number input + **Revelar** — that replays `rollSeed` against the *current* data and shows the resolved world, a per-field breakdown, and a current-version note. Same engine as generation, so a number always reproduces what it generated. Zero tokens.
- **Validated offline before wiring:** 5,000-seed sweep — zero prune violations (no space station/spaceship under misterio/sobrenatural), zero dead seeds, determinism holds.

---

## Architecture at a glance

```
Front-end (interactive/comprension-lectora.html)
    │
    ├─ Semilla aleatoria (client-side) → rollSeed(seed, SEMILLAS) → terse theme string ─┐
    │                                                                                    │
    ├─ buildPrompt(currentCfg) ← Tema OR seed string OR free  ←──────────────────────────┘
    │
    ├─ Prep call ─── /api/generate ─── provider:claude|gemini ──→ Sonnet|Gemini → storyPlan
    ├─ Prose call ── /api/generate ─── provider:claude|gemini ──→ Opus|Gemini → episode + questions
    │       └─ client re-derives q.correct from `answer`, then shuffles options
    └─ Bible call ── /api/claude ───── (no provider field) ─────→ Sonnet → continuity doc
```

`buildPrompt` is provider-agnostic; the same string goes to whichever provider is selected. The seed path reuses the theme slot verbatim.

---

## What this session (June 6–7, 2026) shipped

In order:

1. **Phase 4 — provider persistence + badge.** Shipped alone first, field-tested (a saved Gemini story resumes on Gemini with the indigo badge).
2. **Gemini correct-index fix.** Diagnosed real mis-graded saves; shipped the `answer`-field + client reconciliation. Verified Gemini now grades correctly.
3. **Semilla Aleatoria — Phase A engine + UI.** Data file, PRNG/roller, toggle + mutual exclusivity, Generar semilla, theme branch, save/resume, seed badge. Field-tested.
4. **Restructure deploy.** Moved the page to `interactive/`, re-based relative paths, relinked the background to `../assets/los fondos/azulejos.webp`, fixed a seed leak (the generating screen showed the resolved world — now shows `Semilla N`).
5. **Seed UI polish + review.** Generar semilla recolored to the blue selected-option style; seed minted/shown on toggle-on; the **Revisar semilla** review modal (Step 2). Modal made viewport-scrollable (`.modal-box` `max-height`/`overflow-y`) so its buttons stay reachable on short/wide screens.

Discipline followed throughout: one observable change per deploy, surgical `str_replace`/Python edits, validate (anchor counts, `node --check`, tag balance) before shipping, field-test each step before the next.

---

## Open items

### Phase C — populate the seed vat (NEXT, scheduled for the next session)

The engine and schema are frozen. Phase C is pure content: Sonnet populates `datos/seeds/semillas-data.js` against the existing schema (more genres, places, characters, situations, treatments, weights), bumps `version`, and re-runs the validation sweep. **Discuss what goes into the vat first** — genre list, place gating, spice-field ranges, weighting — before generating it. No engine changes.

### Seed review modal — accessibility (FIXED this session)

Reported: on a wide/short viewport the review modal's buttons fell below the fold and the fixed overlay wouldn't scroll. Fixed by capping `.modal-box` at `calc(100vh - 40px)` with `overflow-y: auto`, so the modal scrolls internally and the buttons stay reachable. Worth a quick re-confirm on the wide monitor next session.

### `variationBlock` suppression decision (carry-over)

Whether to suppress `variationBlock` when `hasStoryPlan` is true, since the plan's `central_question`/`ending_type` already do anti-prototype work. Still unaddressed; revisit when reviewing prose quality.

---

## Future ideas

### More "Modo de generación" modules

Mechanically small (append to `MODULE_SPECS` + add a button); the real work is a good module spec (Misterio is the bar). Daniel's interest: Rom-com, Romántica, Drama, Sci-fi. Worth considering: Realismo mágico (plays to Gemini's pull), Histórica, Fábula/cuento folclórico (great for B1), Cotidiana/slice-of-life, Distopía, Terror/sobrenatural. Pick 2–3, write specs deliberately, field-test across both providers, then decide which earn permanent slots.

### Review Portal (`revision-lectora.html`)

Next in the build queue: a page that browses, filters, rates, replays, and deletes archived quizzes from Drive. This page is the corpus *generator*; the portal is the *curator*. It can now show provider **and** seed per saved story.

---

## Files of interest

- `interactive/comprension-lectora.html` — the page (moved here this session)
- `datos/seeds/semillas-data.js` — seed data set (NEW; version 1, tiny vat)
- `netlify/functions/generate.mts` — multi-provider routing function
- `netlify/functions/claude.mts` — unchanged thin Anthropic proxy; serves other pages + bible call
- `netlify.toml` — function timeout 30s (verified safe for streaming Gemini)

Module specs live inline as the `MODULE_SPECS` constant.

---

## When this document gets superseded

Replace this file when Phase C (the seed vat) ships AND/OR one or more new modules ship AND/OR the Review Portal goes live. Until then, this is the orientation document for Comprensión Lectora.

---

*Updated by Claude with Daniel, 2026-06-07.*
