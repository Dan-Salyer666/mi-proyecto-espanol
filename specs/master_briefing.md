# Mi Proyecto Español — Master Briefing
### Last updated: June 12, 2026
### This file stays in the project permanently. Update only when site-wide fundamentals change.

This is the **root orientation document**. It holds the durable fundamentals — who the learner is, the content philosophy, the design tokens, the workflow, and how Claude and Daniel collaborate. Page-specific state and build patterns live in their own spec files (see *Companion Specs* below) so this file does not go stale every time a page ships.

---

## Session Startup Checklist

1. Read this master briefing first.
2. Read the companion specs relevant to today's work (see below).
3. Read any active task-specific briefings in the project folder.
4. Clone the GitHub repo fresh to see current file state — never reuse a prior session's copy:
   `https://github.com/Dan-Salyer666/mi-proyecto-espanol.git`
5. Ask Daniel what he wants to work on today.

**⚠ At the end of every session:** Remind Daniel to delete any task-specific briefing files for work that has been completed. Stale specs cause new sessions to suggest already-finished work or apply outdated rules.

### Companion Specs (authoritative for their domain)

- **`single-topic-page-spec.md`** — *small* static Spanish-primary reference pages in `/topics/` (roughly one or two screens, a single concept). Fonts, palette, NOTA layer, TTS bar, background, accent trios. Its layout template is a default for **small** pages, **not** a mandate for large or interactive ones — see *Spec Scope & Design Flexibility* below.
- **`interactive-app-boilerplate-spec.md`** — the interactive / AI species: Google Drive OAuth, the connection UI, the serverless function, the lazy-password gate, the two Drive data patterns (multi-file archive and single-file CRUD database), and quiz-state conventions. **This is the reference for everything this briefing used to describe in scattered prose.**
- **`comprension-lectora-state.md`** — the current state and architecture of `comprension-lectora.html` specifically. Authoritative for that page; supersedes anything this briefing previously said about it.

### Spec Scope & Design Flexibility — important

The companion specs are **starting points for their species, not cages.** A past session got locked into the single-topic template for a large interactive build; this section exists so it doesn't happen again.

- **`single-topic-page-spec.md` governs *small* reference pages** — one or two screens, a single concept. That is what it was written for. Do **not** apply its layout template wholesale to large, multi-part, or interactive pages.
- For **larger / multi-part / interactive pages, Claude designs the structure that best fits the topic.** Formación de Preguntas is the precedent: it deliberately dropped the rigid color-coded block series for an accordion + sticky TOC + a dedicated subpage for the heaviest section. That judgment is **expected**, not a deviation to apologize for.
- **Always inherited (site-wide, non-negotiable):** the design *language* — the root CSS tokens, DM Serif Display + Outfit, the English **NOTA\*** layer on Spanish-primary pages, neutral-voice TTS, grading colors, back-nav, and a chosen background. These apply at every size.
- **Always flexible (bends to the content):** page *layout* — section structure, navigation pattern (long scroll vs. accordion vs. parent + subpages vs. tabs), number of pages, order and grouping of material, and whether a template's block series is used at all.
- **Rule of thumb:** inherit the *tokens and language*; design the *layout* to serve the topic. If a spec's template would confine a build in a way that doesn't serve the page, **say so and propose the better structure — don't follow the template silently.**
- At the start of a non-trivial page, briefly establish which species it is (small static / interactive / large-novel) and therefore how much of any template applies, and propose the structure for Daniel's sign-off before building.

---

## The Learner

- **Daniel**, adult English speaker, approximately **B2** level in Spanish.
- **Surgeon** by profession — do NOT filter content based on assumptions about his vocabulary needs.
- **Target dialect: neutral Latin American Spanish** as the project standard. Rioplatense/Argentine Spanish gets dedicated sections and pages but does not bleed into general content. (See *Language Policy* below — this is now an absolute default.)
- Self-directed learner who reads above his level — news articles, literature, formal texts — and wants to recognize vocabulary from all registers, not just B2-level words.
- Located in the Tacoma/Puget Sound, WA area.
- Tests across: 4K monitor, Alienware ultrawide, iPads, large-screen Samsung Galaxy phone.

---

## Content Philosophy — READ THIS CAREFULLY

### The Golden Rule: Claude Never Removes Content

Daniel decides what goes in; Claude decides how to tag it. This applies everywhere:

- **Verbs**: Every verb Daniel has encountered and listed stays in the project regardless of register, frequency, or level. Claude tags with accurate register and region info so Daniel knows what's common vs. rare — but never removes a verb because it seems too advanced, too literary, or too specialized.
- **Vocabulary**: Same principle. If Daniel added it, it stays.
- **The why**: Daniel's goal is **recognition breadth**, not just production at B2. He reads above his level and wants to build familiarity with words he may never say but needs to understand. An honest register tag ("literary — everyday speakers would say X instead") serves him better than silent deletion.

### Register Honesty Over Curation

When a verb or word is uncommon, don't remove it — tag it honestly and note what native speakers actually use.

### No Medical/Clinical Scenarios in Learning Content

Daniel is a surgeon but this is a personal language learning project. No doctor-patient dialogues, clinical case studies, or medical terminology as learning content. This is a content preference for the site, not a reflection of his vocabulary level.

---

## Language Policy — Neutral Is the Absolute Default

**Neutral Latin American Spanish is the permanent, site-wide default for all written content and all TTS audio.** "Neutral" explicitly excludes:

- Spain pronunciation (*ceceo* / *distinción*)
- *Voseo* and Rioplatense verb morphology

**Rioplatense is opt-in only:**
- Textual and visual Rioplatense content (regional examples, side-by-side contrasts, dedicated *Nota rioplatense* callouts) may appear on otherwise-neutral pages, but it **plays with the neutral TTS voice** unless Daniel has explicitly requested Rioplatense audio on that specific build.
- Dedicated Rioplatense pages (e.g. `espanol-rioplatense.html`) are exempt — they use Rioplatense throughout by design.

**TTS voice selection (neutral default):** prefer `es-419`, then `es-MX`, `es-US`, `es-CO`, then any other `es-*`. Do **not** prefer `es-AR`/`es-UY`/`es-ES` on neutral pages. Match the utterance `lang` to the loaded voice's `lang` to avoid English-phoneme rendering. (This supersedes the old "prefer es-AR" rule, which is retired.)

**Front-page dialect toggle — being retired.** The `index.html` Español neutro / Rioplatense switch (`localStorage` key `spanish_dialect`) is not a feature we are moving forward with. It was read only by `condicionales-tipo1/2/3.html`, `condicionales-practica.html`, and `enlace-practica.html` — each with a `|| 'neutral'` fallback — and is **not** read by `comprension-lectora.html` (which has its own per-story *Regionalidad* field). Removing the toggle therefore defaults all consumers to neutral and does not affect Comprensión Lectora. Optional later cleanup: strip the now-dead Rioplatense branches from those five pages.

---

## Current Site Inventory

**Main site:** mi-proyecto-espanol.netlify.app
**Repo:** https://github.com/Dan-Salyer666/mi-proyecto-espanol.git (clone fresh each session; the clone is the authoritative file list)
**Deploy:** Netlify CLI — `netlify deploy --prod` from `I:\Mi proyecto espanol\`. Deploys cost ~15 Netlify credits each — batch changes, deploy once per session when possible.

Hub structure (index.html) at a high level — for the exact current page list, read the cloned repo, not this summary:

- **Interactivo con IA:** `traduccion-interactiva.html`, `comprension-lectora.html`, `espanol-rioplatense.html`, `enlace-practica.html`, and the verb trainers / quizzes under `/interactive/` (`entrenador-de-verbos2.html` is the primary verb trainer; `quiz-genero.html`, `tiempo-y-distancia-interactivo.html`, `preguntas.html`).
- **Gramática y Vocabulario:** verb explorers (`poner.html`, `que-verbos.html`), the conditional-sentence set, and the `/topics/` reference pages (género, palabras tramposas, formación de palabras, desde-hace, ya/todavía/aún, formación de preguntas, etc.).
- **Materiales de Referencia:** `materiales.html`.

### Secondary / Legacy Sites (still live, may consolidate later)
- `mis-materiales-espanol.netlify.app` — static reference pages (deploy: drag-and-drop in Netlify UI)
- `rioplatense-quizzes.netlify.app`, `quiz-group-one.netlify.app` — older static quizzes

---

## Design System — Non-Negotiable (root tokens)

These are the canonical root tokens. The companion specs reference them; do not drift from them.

### CSS Variables
```css
:root {
  --bg-deep:        #0a1628;
  --bg-card:        #111d35;
  --bg-card-hover:  #162544;
  --bg-input:       #0d1a2f;
  --border:         #1e3355;
  --border-focus:   #3b6cb5;
  --text-primary:   #e2e8f0;
  --text-secondary: #8a9bb8;
  --text-muted:     #5a6f8e;
  --accent:         #4a90d9;
  --accent-glow:    rgba(74, 144, 217, 0.15);
}
```

### Grading / State Colors
- Correct: `#34d399`  ·  Partial/warning: `#fbbf24`  ·  Incorrect: `#f87171`

### SE Color-Coding (reading passages, currently disabled but preserved)
Reflexivo `#FF6B6B` · Recíproco `#FF9F1C` · Pronominal `#4ECDC4` · Accidental `#FFE66D` · Reemplazo IOP→SE `#C7F464` · Pasiva/Impersonal `#C084FC`

### Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
- **DM Serif Display** — titles, headings, passage text, large display.
- **Outfit** — all UI, labels, buttons, body copy, definitions.
- Never use system fonts (Arial, Helvetica, Roboto, Inter, Georgia).

### Cards / Buttons / Nav
- Cards: `var(--bg-card)`, `1px solid var(--border)`, radius `14px` (main) / `10px` (smaller); hover border `#2a4a75`.
- Buttons: primary `linear-gradient(135deg, #3b6cb5, #4a90d9)` white text radius `10px`; ghost transparent `var(--border)` border; all Outfit `font-weight:500`. (Pages may use a single locked accent instead of the blue when the build calls for it — e.g. teal on Formación de Preguntas — as long as the tokens and contrast hold.)
- Back navigation required on every page, top-left, `color: var(--text-muted)` → hover `var(--accent)`.

### Backgrounds (fondos) — a palette, not a default

Page backgrounds live in **`assets/los fondos/`** (note the space; keep `url()` quoted, and match the filename **byte-for-byte** — spaces and spelling — or it 404s). The site has a *set* of them: **mix them up; no single image everywhere.** (Legacy: the diagonal-grid `body::before` pattern and `assets/azulejos.webp` at ~10% are still used on older pages.)

**Selection workflow (every new page):** Claude lists the current folder on a fresh clone (`ls "assets/los fondos/"`), proposes **1–3 candidates** suited to the page's mood, and **asks Daniel to confirm or suggest an alternative before building** — never silently defaulting to one image. Claude can only read filenames, not the images, so it proposes by subject/place and Daniel confirms the actual look.

**Applying:** photo pages use a `.bg-photo` cover layer (`center/cover no-repeat`, `filter:brightness(~0.42)`) plus a navy overlay gradient for legibility — drop brightness toward `0.35` if a busy image fights the text. Tile files (`azulejos.webp`, `Spain tile pattern.webp`) are repeating patterns, not cover photos. Path depth: `/topics/` & `/interactive/` → `../assets/los fondos/…`; `/topics/subpages/` → `../../assets/los fondos/…`; site root → `assets/los fondos/…`.

**The set (filenames — confirm look with Daniel):** `girona` · `cordova mesquita` · `alhambra_garden` · `alhambra piscina` · `alhambra-bg` · `portal alhambra` · `granada-alhambra` · `cadaquez` · `cadaquez iglesia` · `la sagrada familia` · `toledo-pic` · `tio-pepe-sign` · `Guernica` · `azulejos` · `Spain tile pattern`. *(Run `ls` for the live list — the folder grows.)*

**Current assignments:** review pages (`formacion-de-preguntas` + formulas subpage) → `girona`; `interactive/preguntas.html` → `cordova mesquita` *(verify the s/z spelling on disk)*; `desde-hace…` → `alhambra_garden`. *(Add a row when a page's background is set.)*

---

## Technical Rules

- Single self-contained HTML files — inline CSS and JS, no build steps.
- Exception: Preact+htm pages (verb explorers) import from unpkg: `https://unpkg.com/htm/preact/standalone.module.js`.
- Google Fonts via CDN (DM Serif Display + Outfit).
- Background images in `assets/` (see *Backgrounds* above), processed to match the blue palette.
- **AI / Drive / password specifics → see `interactive-app-boilerplate-spec.md`.** In brief: the serverless proxy is `netlify/functions/claude.mts` (path `/api/claude`); API responses come back as `data.content[0].text` (strip ```` ```json ```` fences before `JSON.parse()`); pages that call the API use the lazy-password pattern (page loads freely, password modal on first call, held in `sessionPw`); static/reference pages never have a password; auto-recharge is OFF on the Anthropic account.

### TTS (Web Speech API)
- Neutral-voice fallback chain (see Language Policy). Tested over HTTPS (deployed), not `file://`.
- **No TTS on quiz items**; one shared rate bar per page where there are spoken examples.
- `archivos_de_audio/` directory planned for custom audio files — speaker buttons check for a matching audio file first, then fall back to `speechSynthesis`.

---

## Workflow Preferences

- **Discuss before coding** — Daniel collects issues/requests first, then batches work deliberately. Architecture, section counts, NOTA placement, image decisions, background choice, and dialect choices are proposed and confirmed before code is written.
- **Surgical edits over full rewrites** — targeted `str_replace` blocks applied in VS Code, not full-file regeneration.
- **Explicit edit instructions** — when Claude asks Daniel to edit a file himself, it names: the **exact file** (full path), the **exact location inside it** (the anchor, e.g. "inside the `ITEMS_RAW` array, after item 10"), the **exact action** (paste / replace / change), and the **before → after** string for small changes. Never vague ("drop it in"). Note: *"into a file" ≠ "into the directory"* — spell out which.
- **Who edits what** — large, structural, or multi-section edits and new files: **Claude builds and hands back the finished file(s)** in `outputs/`; Daniel deploys. Small surgical edits: Claude may **ask Daniel to apply them** (with a precise before→after) to save tokens. When unsure which bucket an edit falls in, Claude asks rather than assuming.
- **Merging generated data** — when handing Daniel bulk output to insert (e.g. Sonnet's quiz items), Claude states the target file, the target array/section, the exact insertion point, the format expectation, and what must stay untouched.
- **One observable change per deploy; one phase tested before the next begins.**
- **GitHub as reading room** — clone fresh at session start. Daniel applies edits locally, deploys via Netlify CLI, then pushes to GitHub. Distinguish **repo state** from **live deployment** — committed ≠ shipped.
- **Validate before handing back** — tag-balance check, `node --check` on JS, and confirm asset/link paths resolve from each file's real location.
- **Iterative builds** — large files built in sections across passes to avoid hitting usage limits mid-generation.
- **Real device testing** — Daniel tests on actual devices and reports specific bugs before fixes are applied.
- **Token-cost awareness** — lean, targeted prompts; elaborate planning structures inside generation prompts drive register and cost upward.

### AI Workflow
- **Claude (Opus)**: architecture, QA, complex features, interactive tools, all JavaScript, specs, final assembly and validation.
- **Claude (Sonnet)**: mechanical data tasks (bulk translations, audits, item-bank generation) in batches with pause checkpoints, per a Claude-written brief.
- **Gemini**: image generation/processing and simpler static-page drafting (hand it a CSS shell with locked variables; review output for wrong colors, fake API simulations, missing sections, over-emphasis of Rioplatense, and stray `[cite X]` overlay markers on images).

### Model for New Pages
- Verb explorer pages → the **poner.html / que-verbos.html** pattern (Preact+htm, radial tree → family view → word modal).
- Small static grammar/reference pages → **single-topic-page-spec.md** (its layout template fits *small* topics).
- Interactive / AI / Drive-backed pages → **interactive-app-boilerplate-spec.md**.
- **Large / multi-part / novel pages → design to fit the topic**, inheriting the site-wide design language but **not** bound to any single template (see *Spec Scope & Design Flexibility*). Precedent: Formación de Preguntas — accordion + sticky TOC + a formulas subpage.

---

## Build Queue (Current Priorities)

High level only; specific task details live in their own briefing files.

1. **Formación de Preguntas app** — Phase 1 (review page + formulas subpage) and Phase 2 (static drag-the-badge cloze, `interactive/preguntas.html`) shipped. Remaining phases governed by `preguntas-app-spec.md`: Phase 3 MC trap drills, Phase 4 dynamic generate+grade loop, Phase 5 Drive weakness store, Phase 6 target mode + Dimension B + Jeopardy variant.
2. **Género de Sustantivos quiz engine (Phase 4)** — the EL/LA/AMBOS loop, gender-chip feedback, X-removal mechanic, end stats, batched Drive write. Governed by `genero-de-sustantivos-spec.md`.
3. **Review portal** (`revision-lectora.html`) — browse, filter, rate, replay, delete archived Comprensión Lectora quizzes from Drive.
4. **Verb Depth Explorer pages** — quedar, echar, llevar, meter, dar (poner.html pattern).
5. **Tier 1 static grammar reference pages** (single-topic spec framework).
6. **Tres Zonas de SE** — grammar reference page.
7. **Back-arrows cleanup** batch across older pages, plus a grammar styling pass.

---

## What NOT to Do

- Never use system fonts — always load DM Serif Display + Outfit.
- Never use light backgrounds or white themes.
- Never use purple gradients or generic AI color schemes.
- Never add a password screen to static content pages.
- Never include medical/clinical/doctor-patient learning content.
- **Never remove verbs or vocabulary Daniel has listed** — tag honestly, never delete.
- Never prefer `es-AR`/`es-ES` TTS voices on neutral pages, and never sprinkle voseo or Argentine slang into general content.
- Never generate multiple files when one will do.
- **Never force the single-topic-page template onto a large, multi-part, or interactive page** — inherit the design *language*, design the *layout* to fit (see *Spec Scope & Design Flexibility*).
- Never give Daniel a vague edit instruction — name the file, the spot, the action, the before→after.
- Never silently default to one background — propose and confirm (see *Backgrounds*).

---

*This is the stable master briefing. Task-specific specs live in separate files and get deleted when completed. The collaboration protocol and the fondos/background convention used to live in standalone files; they are now folded in here.*
