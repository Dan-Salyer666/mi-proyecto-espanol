# Mi Proyecto Español — Single-Topic Reference Page Spec
### For: Claude or Gemini, building one-off Spanish grammar / vocabulary reference pages
### Last updated: May 2026

---

## 1. Purpose

Build **one self-contained HTML file** that presents a single Spanish grammar or vocabulary topic as a scannable Spanish-primary reference. These pages live in `/topics/` and are wired into the main site later. Every page feels like it belongs to the same site (same fonts, same dark navy palette, same card vocabulary) with subtle visual variation from a chosen background pattern.

**One file, inline CSS, inline JS only.** No build step. No external frameworks (no Tailwind, no Bootstrap, no React). Just HTML + inline CSS + a small amount of inline JS for speech synthesis, the image magnifier, and the optional Guía Rápida modal. **No API calls** — these pages are static reference material. Pages with `/api/claude` integrations are a separate species and not built from this spec.

---

## 2. Workflow Expectations

This spec is a starting point, not a checklist to execute in isolation. Build conversationally:

1. **Confirm the topic and section breakdown before writing.** Propose how many content cards you'd use, what each covers, and any optional components (formula block, decision guide, Guía Rápida, images, NOTA boxes). Daniel signs off or counter-proposes. Section count is flexible — use as many or as few as the topic genuinely needs.

2. **NOTA\* boxes are always a discussion.** Propose what each NOTA will cover and where it sits in the flow *before* drafting prose. NOTAs vary in length — from a single sentence to several paragraphs with sub-headings and bullets — depending on what the topic genuinely needs. Propose accordingly. Daniel may suggest specific NOTAs, or ask you to propose them, but never insert NOTAs unilaterally. Use as many or as few per page as the topic warrants. Zero NOTAs on a purely descriptive page is fine.

3. **Images are always a discussion.** If Daniel doesn't explicitly request images, ask whether the page should include any, and if yes, propose subjects and placement before generating. Don't insert images unilaterally.

4. **Audio playback is always neutral Latin American Spanish — unless explicitly asked otherwise.** Every page's TTS uses a neutral Latin American voice (`es-419 → es-MX → es-US → es-CO → other es-*` fallback). Rioplatense audio is **opt-in per page, by explicit request only** — Daniel may ask for it on a build that specifically warrants it (a dedicated voseo or lunfardo page, for example), in which case you swap in the dual-voice JS variant from Section 10. **Textual and visual Rioplatense content is encouraged on otherwise-neutral pages** — regional examples, side-by-side contrasts, dedicated Nota rioplatense callout sections. Those still play with the neutral voice unless Daniel has explicitly asked for Rioplatense audio on that specific build.

5. **Don't drift the design system.** New colors, fonts, layout patterns, or interaction models outside this spec are out-of-scope without explicit approval. If something genuinely needs an exception, raise it before shipping.

---

## 3. Directory Architecture & Pathing

```
Mi_proyecto_espanol/
├── index.html                              ← main directory page
├── topics/
│   ├── [topic-name].html                   ← single-topic pages (this spec)
│   └── subpages/
│       └── [parent-name]-[subtopic].html   ← optional subpages for complex topics
└── assets/
    └── [image-name].png                    ← all images live here
```

**Back navigation rules:**
- Pages in `/topics/`: back link points to `../index.html` (label: `← Volver al menú`)
- Pages in `/topics/subpages/`: back link points to the parent topic page at `../[parent-name].html` (label: `← Volver a [Parent Title]`)
- Image sources from `/topics/`: `../assets/[filename]`
- Image sources from `/topics/subpages/`: `../../assets/[filename]`

Subpages share this entire spec — same skeleton, same components, same JS. The only differences are the back-nav target and the asset paths.

---

## 4. Non-Negotiables

### Font loading (paste verbatim in `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- **DM Serif Display** — page title, section titles, Spanish example sentences, formula/code displays
- **Outfit** — body copy, UI labels, buttons, English NOTA prose, metadata

**Never** fall back to system fonts. If Google Fonts fails to load, the page should look broken rather than swap to Arial / Helvetica / Roboto / Inter / Segoe UI / Georgia.

### Favicon (paste verbatim in `<head>`)

Every page carries the site favicon — the pan-Latin-American flag that shows in the browser tab. Paths are **absolute**, so the identical block works at any directory depth (`/topics/`, `/interactive/`, `/topics/subpages/`, root). Never convert these to relative paths.

```html
<link rel="icon" type="image/png" sizes="32x32" href="/assets/bandera/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/bandera/icon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/bandera/apple-touch-icon.png">
```

Place immediately after `</title>`. Non-negotiable: a page without the favicon block is not done.

### CSS variables (paste verbatim at top of `<style>`)

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

Add the three accent-trio variables (`--accent-alpha`, `--accent-beta`, `--accent-gamma`) under this block, populated from one of the trios in **Section 14**.

### Back navigation (required on every page)

Top-left, above the title card. Pathing depends on page location — see **Section 3**.

```html
<a href="../index.html" class="back-nav">← Volver al menú</a>
```

```css
.back-nav {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 6px 0;
  margin-bottom: 24px;
  transition: color 0.2s;
}
.back-nav:hover { color: var(--accent); }
```

### Language convention — Spanish-primary with English NOTA\* layer

This is the defining structural choice of the page. Two layers coexist:

**Layer 1 — Spanish body content.** All page chrome, all section headings, all narrative prose, all example sentences, all button labels, all card titles, all decision-guide cells, all figure captions. Even the page title and subtitle are Spanish. Tone: B2-accessible, scholarly, reference-book — concise, no hype.

**Layer 2 — English NOTA\* sections.** Dedicated callout blocks for **anything that benefits from being explained in English on an otherwise-Spanish page** — grammar mechanics, tense interactions, structural rules, topic introductions, register footnotes, comparative tables, conceptual mental models, or any complex point where English prose teaches more clearly than Spanish would. NOTAs can be a single sentence, a paragraph, or several paragraphs with sub-headings. Always inline within the page flow, never appended as a summary block. See **Section 9** for full NOTA spec.

**The one other English exception** — the optional Guía Rápida cheat-sheet modal (Section 12) follows the NOTA pattern: English chrome + Spanish phrase content.

**Example sentence translations** (the small `.example-en` line directly beneath each Spanish example) **are English** — they translate, they don't explain. This is the "fast meaning confirmation" gloss, not a mechanics explanation. Keep them short.

### Emoji policy

Emojis are allowed **selectively and for emphasis or functional UI** — never for decoration. Specifically:

- 🔊 is the speaker button character — used on rate bar label and per-example speak buttons.
- ⚡ is the Guía Rápida trigger badge character.
- ✕ closes modals.
- ✦ ❧ ✧ ◆ ◇ ※ ❖ — these typographic ornaments are allowed for the title card ornament.
- Emphasis emojis used sparingly to underline a single point are fine.

What's **not** allowed: decorative emoji clusters (🎓 📚 ✨ 🚀), emojis as bullets, or any emoji used because it "looks fun." If you're considering an emoji and it's not on the short functional list above, ask before adding it.

### Forbidden

- System fonts of any kind
- Pure white (`#fff`) backgrounds or pure white text — body text is `var(--text-primary)` which is `#e2e8f0`, near-white but not white
- Neon or fully-saturated primary colors (no Bootstrap red, no emerald `#10b981`, no pure violet `#a855f7`) — use the muted alternatives from the accent palette
- Purple gradients or "AI assistant" color schemes
- Light mode or any theme toggle
- Hero photographs or full-bleed background images (the interactive pages like `tiempo-y-distancia.html` use one; single-topic pages do not — they get the SVG pattern overlay instead, see Section 6)
- API calls of any kind — no "Más ejemplos" buttons, no fetch, no fetch-on-button-click

---

## 5. Page Skeleton

Every page follows this top-down structure. Optional elements in *italics*.

```
← Volver al menú                                      ← back navigation
┌──────────────────────────────────────────────────┐
│ Title card                                       │ ← overline + h1 + ornament + Spanish subtitle
│                                  [⚡ Guía Rápida]│ ← optional badge top-right
└──────────────────────────────────────────────────┘
*Intro paragraph (optional)*                          ← one Spanish paragraph orienting the topic
┌──────────────────────────────────────────────────┐
│ Velocidad 🔊  [Lento] [Normal] [Rápido]          │ ← rate bar, one per page
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│ ① Spanish Title           [optional image right] │ ← content card with left-border accent
│ ENGLISH LABEL                                    │
│ *[formula]*                                      │
│ Spanish explanation prose.                       │
│ ┌────────────────────────────────────────────┐  │
│ │ 🔊  Spanish example sentence.              │  │ ← speaker button + example
│ │     English gloss.                         │  │
│ └────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────┐  │
│ │ NOTA*  English mechanic explanation.       │  │ ← NOTA inline, not appended
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│ ② Next card...                                  │
└──────────────────────────────────────────────────┘
*¿Cuál uso? decision guide (optional)*
*Más sobre este tema (optional, subpages parent only)*
```

All content lives in a centered container:

```css
.container {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
```

---

## 6. Background Pattern — Pick One Per Page

The page body gets a fixed, low-opacity SVG pattern overlay that evokes Spanish azulejo tile. **Pick ONE pattern per page, ideally rotating through the five options so pages feel visually related but not identical.** If unsure, pick randomly or ask Daniel.

### Rules

- Opacity: **0.08 to 0.12** — atmospheric, not decorative
- Color: always the accent blue `%234a90d9` inside the SVG stroke attribute
- Stroke width: 0.8 to 1.0
- Tile size: 60px to 100px
- Always curves or geometric stars — never grids of straight lines or diagonals
- Placement: `body::before`, `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 0`

### Boilerplate

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("[PATTERN URL HERE]");
  background-size: [TILE SIZE]px [TILE SIZE]px;
  opacity: 0.10;
  pointer-events: none;
  z-index: 0;
}
```

### Pattern options

**Option A — Interlocking circles** (safe default)
```
url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none' stroke='%234a90d9' stroke-width='0.8'><circle cx='0' cy='0' r='20'/><circle cx='80' cy='0' r='20'/><circle cx='0' cy='80' r='20'/><circle cx='80' cy='80' r='20'/><circle cx='40' cy='40' r='20'/></svg>")
```
Tile size: `80px 80px`

**Option B — Quatrefoil (four-petal flower)**
```
url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none' stroke='%234a90d9' stroke-width='0.9'><circle cx='30' cy='0' r='15'/><circle cx='0' cy='30' r='15'/><circle cx='60' cy='30' r='15'/><circle cx='30' cy='60' r='15'/><circle cx='30' cy='30' r='6'/></svg>")
```
Tile size: `60px 60px`

**Option C — Eight-point stars**
```
url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none' stroke='%234a90d9' stroke-width='0.8'><path d='M30,5 L35,25 L55,30 L35,35 L30,55 L25,35 L5,30 L25,25 Z'/><circle cx='30' cy='30' r='3'/></svg>")
```
Tile size: `60px 60px`

**Option D — Diamond lattice with inscribed circles**
```
url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none' stroke='%234a90d9' stroke-width='0.8'><path d='M0,30 L30,0 L60,30 L30,60 Z'/><circle cx='30' cy='30' r='10'/></svg>")
```
Tile size: `60px 60px`

**Option E — Overlapping wave arcs**
```
url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40' fill='none' stroke='%234a90d9' stroke-width='0.8'><path d='M0,20 Q20,0 40,20 Q60,40 80,20'/><path d='M0,40 Q20,20 40,40 Q60,60 80,40'/></svg>")
```
Tile size: `80px 40px`

---

## 7. Title Card

Every page has one title card. The Guía Rápida badge (Section 12), if present, lives in the top-right corner of this card.

### Structure

```html
<header class="title-card">
  <div class="overline">Referencia Gramatical</div>
  <h1>Título Principal <span class="vs">contraste opcional</span> Resto del Título</h1>
  <div class="ornament"><span class="ornament-symbol">✦</span></div>
  <div class="title-subtitle">Subtítulo en español que aclara el alcance</div>
  <!-- Optional Guía Rápida trigger: -->
  <button class="cheat-badge" onclick="openCheat()">⚡ Guía Rápida</button>
</header>
```

If the topic has no two-way "vs." contrast, drop the `<span class="vs">` and use a plain `<h1>Título</h1>`.

**Allowed overline values:** `Referencia Gramatical` · `Vocabulario` · `Guía Rápida` · `Comparativa` · `Construcción` · `Régimen Verbal`. If a topic genuinely needs a new overline, propose it.

**Allowed ornament symbols** (pick one): `✦` `❧` `✧` `◆` `◇` `※` `❖`.

### CSS

```css
.title-card {
  text-align: center;
  padding: 44px 24px 48px;
  margin-bottom: 28px;
  background: linear-gradient(180deg, rgba(74,144,217,0.05), rgba(74,144,217,0));
  border-radius: 14px;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.overline {
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 18px;
}
h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2rem, 5.5vw, 3.2rem);
  font-weight: normal;
  line-height: 1.05;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
h1 .vs {
  display: block;
  font-style: italic;
  color: var(--accent);
  font-size: 0.6em;
  margin: 4px 0;
}
.ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 20px auto 10px;
  color: var(--accent);
  opacity: 0.65;
  max-width: 280px;
}
.ornament::before, .ornament::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.ornament-symbol { font-size: 1.1rem; }
.title-subtitle {
  font-size: 0.92rem;
  color: var(--text-secondary);
  letter-spacing: 0.06em;
  font-style: italic;
}
```

### Optional intro paragraph

A short Spanish paragraph that sits *between* the title card and the rate bar, orienting the reader to the topic in target-language prose. Use when the topic needs a one-paragraph framing; skip when the content cards are self-explanatory.

```html
<p class="intro-prose">
  Aquí va una orientación breve del tema en español, en una o dos oraciones.
</p>
```

```css
.intro-prose {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: -8px 4px 22px;
  padding: 0 6px;
}
.intro-prose strong { color: var(--text-primary); font-weight: 600; }
.intro-prose em     { color: var(--accent); font-style: italic; }
```

---

## 8. Content Cards

The main body — one card per subtopic, grammar rule, or vocabulary set. Each card carries a color-accented left border. Section count flexes to the topic.

### Structure

```html
<article class="grammar-card card-alpha">
  <div class="card-header">
    <div class="card-number">①</div>
    <div class="card-title-group">
      <div class="card-title">Título en Español<span class="qualifier">aclaración opcional</span></div>
      <div class="card-title-en">ENGLISH LABEL</div>
    </div>
    <!-- Optional image (see Section 11) -->
    <div class="card-icon">
      <img src="../assets/example.png" alt="Descripción en español">
    </div>
  </div>

  <code class="formula">Fórmula o patrón opcional</code>

  <p class="explanation">
    Explicación en prosa, en español, puede incluir <em>énfasis</em> y <strong>palabras clave</strong>.
  </p>

  <div class="examples-block">
    <div class="example-row" data-region="neutral">
      <div class="speak-wrap"><button class="speak-btn" onclick="speakExample(this)" title="Escuchar">🔊</button></div>
      <div class="example-body">
        <div class="example-es">Oración de ejemplo en <span class="hl">español</span>.</div>
        <div class="example-en">Spanish example sentence. <em>— optional short annotation.</em></div>
      </div>
    </div>
    <!-- more example-row blocks -->
  </div>

  <!-- Optional inline NOTA boxes — see Section 9 -->
  <div class="nota">
    <span class="nota-label">NOTA*</span> English mechanic explanation.
  </div>
</article>
```

`card-title-en` is optional — include the small English uppercase label when it helps fast skimming, omit when the Spanish title is self-evident.

`card-number` uses `① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩` (or `❶ ❷ ❸` for emphasis). On a single-card page or where numbering would feel forced, omit it.

### CSS

```css
.grammar-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: 14px;
  padding: 28px 28px 22px;
  margin-bottom: 18px;
  transition: border-color 0.2s;
}
.grammar-card:hover {
  border-top-color: #2a4a75;
  border-right-color: #2a4a75;
  border-bottom-color: #2a4a75;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.card-number {
  font-family: 'DM Serif Display', serif;
  font-size: 2.2rem;
  line-height: 1;
  color: var(--text-muted);
  flex-shrink: 0;
}
.card-title-group { flex: 1; min-width: 240px; }
.card-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--text-primary);
}
.card-title .qualifier {
  font-family: 'Outfit', sans-serif;
  font-size: 0.62em;
  font-weight: 400;
  color: var(--text-muted);
  font-style: italic;
  margin-left: 6px;
}
.card-title-en {
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-top: 4px;
}

.formula {
  display: inline-block;
  font-family: 'Courier New', monospace;
  font-size: 0.88rem;
  color: var(--text-secondary);
  background: var(--bg-input);
  border: 1px dashed var(--border);
  border-radius: 6px;
  padding: 8px 14px;
  margin: 14px 0 16px;
}

.explanation {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
  font-size: 0.95rem;
}
.explanation em     { color: var(--text-primary); font-style: italic; }
.explanation strong { color: var(--text-primary); font-weight: 600; }

/* Example row + speaker */
.examples-block { margin: 14px 0 8px; }
.example-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(30, 51, 85, 0.4);
}
.example-row:last-child { border-bottom: none; }
.example-row .speak-wrap { flex-shrink: 0; padding-top: 2px; }
.example-row .example-body { flex: 1; min-width: 0; }
.example-es {
  font-family: 'DM Serif Display', serif;
  font-size: 1.05rem;
  color: var(--text-primary);
  line-height: 1.5;
}
.example-es .hl { color: var(--accent); font-weight: 600; font-style: italic; }
.example-en {
  font-size: 0.88rem;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 3px;
  line-height: 1.5;
}
.example-en em { color: var(--text-secondary); font-style: normal; }
```

### Regional badges (inline within an example)

When an example is regionally marked, append a small pill badge:

```html
<div class="example-es">Acá <span class="hl">tomamos</span> mate. <span class="reg-badge reg-rio">Rioplatense</span></div>
```

```css
.reg-badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 6px;
  vertical-align: middle;
  text-transform: uppercase;
}
.reg-badge.reg-rio  { background: rgba(255, 159, 28, 0.15); color: #ffb066; border: 1px solid rgba(255, 159, 28, 0.3); }
.reg-badge.reg-esp  { background: rgba(192, 132, 252, 0.15); color: #d0a8ff; border: 1px solid rgba(192, 132, 252, 0.3); }
.reg-badge.reg-mx   { background: rgba(78, 205, 196, 0.15); color: #7be3db; border: 1px solid rgba(78, 205, 196, 0.3); }
```

Add new region classes as needed using accent-palette colors.

---

## 9. NOTA\* Boxes

The dedicated **English explanation layer** on an otherwise-Spanish page. NOTA boxes are inline callout sections — from a single sentence to several paragraphs with sub-headings — used wherever an English explanation teaches more clearly than Spanish prose would. **Always English. Always inline within the page flow** (not as an appended block at the end of the page). One construct, asterisk is part of the visible label.

### When to use a NOTA

Reach for a NOTA whenever an English explanation is the right tool. Common uses:

- **Grammar mechanics** — "this construction requires the present tense even though English uses the perfect", "this verb takes *a*, not *de*", "*hace* anchors duration to the present; *hacía* shifts the whole anchor one tense back".
- **Topic introductions** — opening framing in English for a complex topic before the Spanish content cards unfold.
- **Register or regional footnotes** — "in peninsular Spanish, X often replaces Y", "this form is preferred in narrative prose".
- **Conceptual mental models** — a substitution test, a contrast pattern, a way to disambiguate two similar structures.
- **Comparison tables or symmetry blocks** — short matrices that pay off the prose above them, embedded inside a NOTA.

NOTA boxes are **not** for translating individual words (that's what `.example-en` glosses do) or for cultural anecdotes (skip those entirely).

Length is dictated by the topic, not by a target density. A NOTA can be one sentence, one paragraph, or a multi-paragraph expanded block with sub-headings and bullets — use whatever the content needs. Typical pages run zero, one, or two NOTAs per content card, but some sections warrant a single substantial NOTA and some pages warrant none at all. Always discuss placement and scope with Daniel before drafting NOTA prose.

### Structure

Standard NOTA:
```html
<div class="nota">
  <span class="nota-label">NOTA*</span>
  English mechanic explanation. Can include <em>italic emphasis</em>, <strong>bold key terms</strong>,
  and inline <code>código</code>.
</div>
```

Expanded NOTA (multi-paragraph, with optional structured bullets):
```html
<div class="nota nota-expanded">
  <span class="nota-label">NOTA*</span>
  <p>Opening paragraph stating the mechanic at a high level.</p>
  <h4>Sub-heading if needed</h4>
  <ul>
    <li>Bullet one — short.</li>
    <li>Bullet two.</li>
  </ul>
  <p>Closing paragraph or clarification.</p>
</div>
```

### CSS

```css
.nota {
  background: rgba(74, 144, 217, 0.08);
  border-left: 4px solid var(--accent);
  border-radius: 0 10px 10px 0;
  padding: 14px 18px;
  margin: 16px 0;
  font-size: 0.93rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
.nota .nota-label {
  display: inline-block;
  font-weight: 600;
  color: var(--accent);
  margin-right: 6px;
  letter-spacing: 0.02em;
}
.nota.nota-expanded { padding: 18px 22px; }
.nota.nota-expanded h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 12px 0 6px;
}
.nota.nota-expanded h4:first-of-type { margin-top: 8px; }
.nota.nota-expanded ul {
  list-style: none;
  padding: 0;
  margin: 4px 0 8px;
}
.nota.nota-expanded ul li {
  padding: 4px 0 4px 18px;
  position: relative;
}
.nota.nota-expanded ul li::before {
  content: '›';
  position: absolute;
  left: 4px;
  color: var(--accent);
  font-weight: 700;
}
.nota strong { color: var(--text-primary); font-weight: 600; }
.nota em     { color: var(--accent); font-style: italic; }
.nota code {
  font-family: ui-monospace, 'SF Mono', monospace;
  background: var(--bg-input);
  color: var(--text-primary);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.9em;
}
```

---

## 10. TTS — Rate Bar, Speaker Buttons, Neutral Voice

Every page that has Spanish example sentences gets TTS. The implementation has three pieces: a single shared rate bar at the top of the page, a speaker button on every example row, and a **neutral Latin American voice** that handles all playback by default.

**Audio is always neutral by default.** Rioplatense audio is an opt-in variant — only enabled on pages where Daniel has explicitly requested Rioplatense playback (a dedicated voseo or lunfardo page, for example). Regional `<span class="reg-badge reg-rio">Rioplatense</span>` badges on individual examples are purely visual; they do not change the audio. If Daniel asks for Rioplatense audio on a specific build, swap in the dual-voice JS variant at the end of this section.

### Scope

- **Always include speaker buttons** on every example sentence — `.example-row` in a content card.
- **For pure vocabulary list pages** (collections of individual Spanish words, not sentences), ask Daniel whether to include speaker buttons. If yes, attach a speaker button to each Spanish word entry using the same `.speak-btn` markup; the word goes in an element the script can find (use `.example-es` or a dedicated `.vocab-es`).
- Pages with **no Spanish example sentences at all** can omit the rate bar and TTS scripts entirely.

### Rate bar (one per page, near the top)

Place the rate bar immediately after the title card (or after the intro paragraph if present), before the first content card.

```html
<div class="rate-bar">
  <span class="rate-label">Velocidad 🔊</span>
  <button class="rate-btn" onclick="setRate('lento', this)">Lento</button>
  <button class="rate-btn active" onclick="setRate('normal', this)">Normal</button>
  <button class="rate-btn" onclick="setRate('rapido', this)">Rápido</button>
</div>
```

```css
.rate-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 0 18px;
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.rate-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-right: 4px;
}
.rate-btn {
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s;
}
.rate-btn:hover { border-color: #2a4a75; color: var(--text-primary); }
.rate-btn.active {
  background: rgba(74, 144, 217, 0.15);
  color: var(--accent);
  border-color: rgba(74, 144, 217, 0.3);
}
```

Subpages each get their own rate bar (each page is a separate HTML file with independent JS state — defaults to Normal on every page load).

### Speaker button (one per example row)

Markup is shown in the content card spec (Section 8). The CSS:

```css
.speak-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  flex-shrink: 0;
}
.speak-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}
.speak-btn.playing {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-glow);
}
```

### Per-example region markup

Each `.example-row` carries a `data-region` attribute as forward-compatible markup:

- `data-region="neutral"` — every example row uses this by default.
- `data-region="rioplatense"` — applied to individual examples whose Spanish text is regionally marked (voseo, regional lexis, rioplatense fixed expressions). **The default JS ignores this attribute and plays everything with the neutral voice.** The markup is retained so that, on pages where Daniel has explicitly asked for Rioplatense audio, the dual-voice JS variant can switch voices per example without page restructuring.

**Sprinkle Rioplatense examples freely** on otherwise-neutral pages where a construction has a regional variant worth showing — tag them with `data-region="rioplatense"` and a `<span class="reg-badge reg-rio">Rioplatense</span>` badge. They will play with the neutral voice by default, which is the correct behaviour. The badge is the reader-facing signal; the data attribute is dormant infrastructure unless explicitly activated.

### TTS JavaScript — default (neutral voice only)

Paste verbatim just before `</body>`. This is the default for every single-topic page. It uses the neutral Latin American voice for all playback and ignores `data-region`.

```html
<script>
// ═══════════════════════════════════════════════
//  TTS — Neutral Latin American Spanish only
//  Default for every single-topic page.
//  Voice fallback chain:
//    es-419 → es-MX → es-US → es-CO → any es-* except AR/UY/ES → any es
//  data-region="rioplatense" markup on rows is ignored
//  by this default JS — those rows still play neutral.
//  See "Opt-in: dual-voice variant" below for the swap-in
//  used only when Daniel asks for Rioplatense audio.
// ═══════════════════════════════════════════════
let neutralVoice = null;
let voicesReady = false;
let ttsRate = 1.0;

function pickVoices() {
  if (!window.speechSynthesis) return;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return;

  neutralVoice =
       voices.find(v => v.lang === 'es-419')
    || voices.find(v => v.lang === 'es-MX')
    || voices.find(v => v.lang === 'es-US')
    || voices.find(v => v.lang === 'es-CO')
    || voices.find(v => v.lang && v.lang.startsWith('es') && v.lang !== 'es-AR' && v.lang !== 'es-UY' && v.lang !== 'es-ES')
    || voices.find(v => v.lang && v.lang.startsWith('es') && v.lang !== 'es-AR' && v.lang !== 'es-UY')
    || voices.find(v => v.lang && v.lang.startsWith('es'));

  voicesReady = true;
}

if (window.speechSynthesis) {
  speechSynthesis.addEventListener('voiceschanged', pickVoices);
  pickVoices();
}

function ensureVoices() {
  return new Promise(resolve => {
    if (voicesReady) return resolve();
    let attempts = 0;
    const iv = setInterval(() => {
      pickVoices();
      attempts++;
      if (voicesReady || attempts > 20) { clearInterval(iv); resolve(); }
    }, 100);
  });
}

function setRate(label, btn) {
  ttsRate = label === 'lento' ? 0.78 : label === 'rapido' ? 1.22 : 1.0;
  document.querySelectorAll('.rate-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function cleanForTTS(text) {
  if (!text) return '';
  return text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/\u200D/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function speakExample(btn) {
  if (!window.speechSynthesis) return;
  const row = btn.closest('.example-row') || btn.closest('.vocab-row');
  if (!row) return;
  const esEl = row.querySelector('.example-es') || row.querySelector('.vocab-es');
  if (!esEl) return;

  const clone = esEl.cloneNode(true);
  clone.querySelectorAll('.reg-badge').forEach(el => el.remove());
  const text = cleanForTTS(clone.textContent);
  if (!text) return;

  if (btn.classList.contains('playing')) {
    speechSynthesis.cancel();
    btn.classList.remove('playing');
    return;
  }
  speechSynthesis.cancel();
  document.querySelectorAll('.speak-btn.playing').forEach(b => b.classList.remove('playing'));

  if (!voicesReady) await ensureVoices();

  const u = new SpeechSynthesisUtterance(text);
  if (neutralVoice) { u.voice = neutralVoice; u.lang = neutralVoice.lang; }
  else { u.lang = 'es-419'; }
  u.rate = ttsRate;
  u.pitch = 1.0;
  u.onstart = () => btn.classList.add('playing');
  u.onend   = () => btn.classList.remove('playing');
  u.onerror = () => btn.classList.remove('playing');
  speechSynthesis.speak(u);
}
</script>
```

The script supports both `.example-row` (with `.example-es`) and `.vocab-row` (with `.vocab-es`) so a vocabulary list page can reuse it without modification.

### Opt-in: dual-voice variant (Rioplatense audio enabled)

**Use this variant only when Daniel has explicitly requested Rioplatense audio on a specific build.** It reads `data-region` on each row and routes between two voice pools — neutral for `data-region="neutral"` examples, Argentinian for `data-region="rioplatense"` examples.

```html
<script>
// ═══════════════════════════════════════════════
//  TTS — DUAL VOICE POOL (opt-in)
//  Use only on pages where Daniel has explicitly
//  requested Rioplatense audio playback.
//  Neutral voice (default for unmarked rows):
//    es-419 → es-MX → es-US → es-CO → any es-* except AR/UY/ES → any es
//  Rioplatense voice (for data-region="rioplatense" rows):
//    es-AR → es-UY → es-419 → any es
// ═══════════════════════════════════════════════
let neutralVoice = null;
let rioVoice = null;
let voicesReady = false;
let ttsRate = 1.0;

function pickVoices() {
  if (!window.speechSynthesis) return;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return;

  neutralVoice =
       voices.find(v => v.lang === 'es-419')
    || voices.find(v => v.lang === 'es-MX')
    || voices.find(v => v.lang === 'es-US')
    || voices.find(v => v.lang === 'es-CO')
    || voices.find(v => v.lang && v.lang.startsWith('es') && v.lang !== 'es-AR' && v.lang !== 'es-UY' && v.lang !== 'es-ES')
    || voices.find(v => v.lang && v.lang.startsWith('es') && v.lang !== 'es-AR' && v.lang !== 'es-UY')
    || voices.find(v => v.lang && v.lang.startsWith('es'));

  rioVoice =
       voices.find(v => v.lang === 'es-AR')
    || voices.find(v => v.lang === 'es-UY')
    || voices.find(v => v.lang === 'es-419')
    || voices.find(v => v.lang && v.lang.startsWith('es'));

  voicesReady = true;
}

if (window.speechSynthesis) {
  speechSynthesis.addEventListener('voiceschanged', pickVoices);
  pickVoices();
}

function ensureVoices() {
  return new Promise(resolve => {
    if (voicesReady) return resolve();
    let attempts = 0;
    const iv = setInterval(() => {
      pickVoices();
      attempts++;
      if (voicesReady || attempts > 20) { clearInterval(iv); resolve(); }
    }, 100);
  });
}

function setRate(label, btn) {
  ttsRate = label === 'lento' ? 0.78 : label === 'rapido' ? 1.22 : 1.0;
  document.querySelectorAll('.rate-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function cleanForTTS(text) {
  if (!text) return '';
  return text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/\u200D/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function speakExample(btn) {
  if (!window.speechSynthesis) return;
  const row = btn.closest('.example-row') || btn.closest('.vocab-row');
  if (!row) return;
  const region = (row.dataset.region || 'neutral').toLowerCase();
  const esEl = row.querySelector('.example-es') || row.querySelector('.vocab-es');
  if (!esEl) return;

  const clone = esEl.cloneNode(true);
  clone.querySelectorAll('.reg-badge').forEach(el => el.remove());
  const text = cleanForTTS(clone.textContent);
  if (!text) return;

  if (btn.classList.contains('playing')) {
    speechSynthesis.cancel();
    btn.classList.remove('playing');
    return;
  }
  speechSynthesis.cancel();
  document.querySelectorAll('.speak-btn.playing').forEach(b => b.classList.remove('playing'));

  if (!voicesReady) await ensureVoices();

  const u = new SpeechSynthesisUtterance(text);
  const v = region === 'rioplatense' ? rioVoice : neutralVoice;
  if (v) { u.voice = v; u.lang = v.lang; }
  u.rate = ttsRate;
  u.pitch = 1.0;
  u.onstart = () => btn.classList.add('playing');
  u.onend   = () => btn.classList.remove('playing');
  u.onerror = () => btn.classList.remove('playing');
  speechSynthesis.speak(u);
}
</script>
```

---

## 11. Images (Optional)

Images are optional. **Ask before including any image** unless Daniel explicitly requested one. When included, an image lives at the top-right of a content card's header, scaled small inline, and can be clicked to magnify in place.

### Markup (inside `.card-header`)

```html
<div class="card-icon">
  <img src="../assets/example.png" alt="Descripción del concepto en español">
</div>
```

Alt text is **Spanish** (page is Spanish-primary).

### CSS

```css
.card-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
}
.card-icon img {
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid var(--border);
  cursor: zoom-in;
  position: relative;
  z-index: 1;
  transform-origin: right center;
  transition: transform 0.25s cubic-bezier(0.2, 0, 0.2, 1),
              box-shadow 0.25s ease,
              border-color 0.25s ease;
}
.card-icon img.magnified {
  transform: scale(2.5);
  z-index: 10;
  cursor: zoom-out;
  box-shadow: -8px 8px 24px rgba(0, 0, 0, 0.5);
  border-color: var(--accent);
}
@media (max-width: 600px) {
  /* On mobile, image stacks above the title group instead of hiding */
  .card-header { flex-direction: column-reverse; align-items: stretch; }
  .card-icon {
    justify-content: center;
    height: auto;
    max-height: 140px;
    margin-bottom: 8px;
  }
  .card-icon img {
    height: auto;
    max-height: 140px;
    width: 100%;
    object-fit: contain;
    transform-origin: center center;
  }
}
```

### Click-to-magnify JS (paste before `</body>` if any images are present)

```html
<script>
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.card-icon img');
  let activeImage = null;

  const resetZoom = () => {
    if (activeImage) {
      activeImage.classList.remove('magnified');
      activeImage = null;
    }
  };

  images.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeImage === img) {
        img.classList.remove('magnified');
        activeImage = null;
      } else {
        resetZoom();
        img.classList.add('magnified');
        activeImage = img;
      }
    });
  });

  window.addEventListener('scroll', resetZoom, { passive: true });
  document.addEventListener('click', resetZoom);
});
</script>
```

### Generating images (Gemini prompting parameters)

When asked to generate illustrations for a page:

1. **Style:** Flat vector cartoon style, clean lines.
2. **Color palette:** Strictly the site's CSS variables. No pure white background. Background tone should sit in the `--bg-card` / `--bg-input` family (deep navy). Incorporate the page's chosen accent trio.
3. **Layout:** For contrasts, use split-screen or side-by-side composition within a single frame.
4. **Subject:** The image should illustrate the mechanical or geometric concept of the grammar rule or vocabulary, not just decorate.
5. **Aspect:** Roughly square or modestly wide. Avoid very tall portrait orientations (they break the card-header layout).

### Image optimization workflow (post-generation in GIMP)

AI-generated images are oversized for web. Before linking, run them through GIMP:

1. **Scale:** `Image` → `Scale Image...` Lock aspect ratio. Set Width to `800px`. Interpolation: `Cubic` or `NoHalo`. Click Scale.
2. **Index colors:** `Image` → `Mode` → `Indexed...` Select "Generate optimum palette". Maximum colors: `256`. Click Convert.
3. **Export:** `File` → `Export As...` Set Compression Level to `9`. Export as PNG to `/assets/`.

---

## 12. Guía Rápida (Optional Cheat-Sheet Modal)

A clickable badge at the top of the page that opens a modal containing a quick-reference table of common situations and Spanish phrases. Inspired by the pattern on `prestar-pedir.html`. The cheat sheet is a fast-skim companion to the page — when a user lands on the page and just wants the practical takeaway without reading the full reference.

### Trigger badge

Placed in the title card, top-right corner.

```html
<button class="cheat-badge" onclick="openCheat()">⚡ Guía Rápida</button>
```

Position absolute within `.title-card` (which is already `position: relative`):

```css
.cheat-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 14px;
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.4);
  border-radius: 20px;
  color: #fcd34d;
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.2s;
}
.cheat-badge:hover {
  background: rgba(251, 191, 36, 0.2);
  border-color: rgba(251, 191, 36, 0.6);
}
@media (max-width: 600px) {
  .cheat-badge { position: static; display: inline-block; margin-top: 16px; }
}
```

### Modal

```html
<div class="modal-overlay" id="modal-cheat" onclick="handleCheatOverlayClick(event)">
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-title">Guía Rápida (Cheat Sheet)</div>
      <button class="close-btn" onclick="closeCheat()" aria-label="Close">✕</button>
    </div>
    <div class="modal-body">
      <p>Short English intro line explaining what the cheat sheet covers.</p>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>Situation</th><th>Best Phrase</th></tr>
          </thead>
          <tbody>
            <tr><td>Casual context X</td><td><em>Frase en español</em></td></tr>
            <tr><td>Polite ask</td><td><em>¿Podrías …?</em></td></tr>
            <!-- ... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

### Language convention inside the modal

- Modal title and intro line: **English**
- Table headers: **English** (e.g. "Situation" / "Best Phrase")
- Left column (situation descriptions): **English**
- Right column (the phrase itself): **Spanish in italic** (`<em>`)

This matches `prestar-pedir.html`. The Guía Rápida is functionally a structured NOTA mechanics layer.

### CSS

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 12, 25, 0.85);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 50;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.modal-overlay.active {
  display: flex;
  opacity: 1;
  animation: cheatFadeIn 0.3s forwards;
}
@keyframes cheatFadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 100%;
  max-width: 760px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  overflow: hidden;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}
.modal-overlay.active .modal-content { transform: translateY(0); }

.modal-header {
  padding: 22px 28px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 25, 45, 0.95);
}
.modal-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.6rem;
  color: var(--text-primary);
}
.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s;
}
.close-btn:hover { color: var(--accent); }

.modal-body {
  padding: 26px 28px;
  overflow-y: auto;
  flex-grow: 1;
}
.modal-body > p {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
}

.table-wrapper {
  overflow-x: auto;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid var(--border);
}
.table-wrapper table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
  text-align: left;
}
.table-wrapper th {
  background: rgba(0,0,0,0.4);
  color: var(--text-primary);
  padding: 12px 16px;
  font-weight: 600;
}
.table-wrapper td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
}
.table-wrapper tr:last-child td { border-bottom: none; }
.table-wrapper tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
.table-wrapper em {
  color: var(--text-primary);
  font-style: italic;
  font-family: 'DM Serif Display', serif;
  font-size: 1.02em;
}
```

### Modal JS (paste before `</body>` if Guía Rápida is included)

```html
<script>
function openCheat() {
  const m = document.getElementById('modal-cheat');
  if (!m) return;
  m.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCheat() {
  const m = document.getElementById('modal-cheat');
  if (!m) return;
  m.classList.remove('active');
  document.body.style.overflow = '';
}
function handleCheatOverlayClick(e) {
  if (e.target.id === 'modal-cheat') closeCheat();
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCheat();
});
</script>
```

---

## 13. Optional Components

These are included only when the topic genuinely warrants them. Ask Daniel before adding either if it's unclear.

### 13a. Formula block

A small monospace block inside a content card showing the construction pattern. Useful for grammar topics like *estar a + medida*, *llevar + tiempo + gerundio*, etc.

```html
<code class="formula">verbo conjugado + a + medida</code>
```

CSS is in **Section 8**. Skip on vocabulary pages or anywhere the "formula" feels forced.

### 13b. Decision guide (`¿Cuál uso?`)

A small table that maps conditions to which pattern to pick. Useful for binary or three-way contrasts (e.g. *ser vs estar*, *por vs para*, *imperfecto vs pretérito*). Skip on purely descriptive pages.

```html
<section class="decision-card">
  <h2 class="decision-title">¿Cuál uso?</h2>
  <div class="decision-subtitle">Una guía rápida para elegir</div>
  <div class="decision-rows">
    <div class="decision-row">
      <div class="decision-condition">Condición que describe cuándo aplica</div>
      <div class="decision-arrow">→</div>
      <div class="decision-result">Patrón A <small>aclaración breve</small></div>
    </div>
    <!-- more rows -->
  </div>
</section>
```

```css
.decision-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 28px;
  margin-top: 32px;
}
.decision-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.45rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.decision-subtitle {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-style: italic;
  letter-spacing: 0.06em;
  margin-bottom: 22px;
}
.decision-rows { display: grid; gap: 0; }
.decision-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 18px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.decision-row:last-child  { border-bottom: none; padding-bottom: 2px; }
.decision-row:first-child { padding-top: 2px; }
.decision-condition { color: var(--text-secondary); font-size: 0.94rem; line-height: 1.45; }
.decision-condition em { color: var(--text-primary); font-style: italic; }
.decision-arrow { color: var(--accent); font-size: 1.2rem; }
.decision-result { color: var(--text-primary); font-weight: 500; font-size: 0.94rem; }
.decision-result small {
  display: block;
  margin-top: 3px;
  color: var(--text-muted);
  font-weight: 400;
  font-size: 0.82rem;
}
```

### 13c. Subpage links (parent topic page only)

If a topic has subpages, the parent topic page lists them near the bottom in a small linked block:

```html
<section class="subpage-links">
  <h2 class="subpage-links-title">Más sobre este tema</h2>
  <ul>
    <li><a href="subpages/parent-subtopic-1.html">Subtítulo del subtema 1 <span class="arrow">›</span></a></li>
    <li><a href="subpages/parent-subtopic-2.html">Subtítulo del subtema 2 <span class="arrow">›</span></a></li>
  </ul>
</section>
```

```css
.subpage-links {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px 28px;
  margin-top: 32px;
}
.subpage-links-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.subpage-links ul { list-style: none; padding: 0; margin: 0; }
.subpage-links li { padding: 8px 0; border-bottom: 1px solid rgba(30, 51, 85, 0.4); }
.subpage-links li:last-child { border-bottom: none; }
.subpage-links a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.96rem;
  transition: color 0.2s;
}
.subpage-links a:hover { color: var(--accent); }
.subpage-links .arrow { color: var(--text-muted); font-size: 1.1rem; }
.subpage-links a:hover .arrow { color: var(--accent); }
```

---

## 14. Section Accent Color Trios

Each content card gets one accent color on its left border via a `card-[theme]` class. Pick **one trio per page**, assigning colors to cards in order. Don't mix trios mid-page.

```css
.card-alpha  { border-left-color: var(--accent-alpha); }
.card-beta   { border-left-color: var(--accent-beta); }
.card-gamma  { border-left-color: var(--accent-gamma); }
```

Optional: also tint the card numbers with the matching accent:
```css
.card-alpha .card-number { color: var(--accent-alpha); opacity: 0.75; }
.card-beta  .card-number { color: var(--accent-beta);  opacity: 0.75; }
.card-gamma .card-number { color: var(--accent-gamma); opacity: 0.75; }
```

### Trios

**Trio 1 — Violet / Amber / Teal** (good for grammar contrasts)
```css
--accent-alpha: #c084fc;
--accent-beta:  #fbbf24;
--accent-gamma: #4ecdc4;
```

**Trio 2 — Blue / Coral / Lime** (good for vocabulary groups)
```css
--accent-alpha: #4a90d9;
--accent-beta:  #FF6B6B;
--accent-gamma: #C7F464;
```

**Trio 3 — Teal / Orange / Violet** (good for tense or mood contrasts)
```css
--accent-alpha: #4ecdc4;
--accent-beta:  #FF9F1C;
--accent-gamma: #c084fc;
```

**Trio 4 — Blue / Violet / Gold** (good for formal/scholarly topics)
```css
--accent-alpha: #4a90d9;
--accent-beta:  #c084fc;
--accent-gamma: #fbbf24;
```

If the page has only 2 sections, use `alpha` and `gamma`. If it has 4+ sections, add a 4th color from `#FF6B6B` (coral), `#4ecdc4` (teal), or `#fbbf24` (amber) — whichever is NOT already in your chosen trio — as `--accent-delta`.

---

## 15. Body & Container Base

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100%; }

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg-deep);
  color: var(--text-primary);
  padding: 32px 16px 80px;
  position: relative;
  overflow-x: hidden;
  line-height: 1.5;
}

.container {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
```

---

## 16. Responsive Rules

```css
@media (max-width: 600px) {
  .title-card        { padding: 32px 18px 36px; }
  .grammar-card      { padding: 22px 20px 18px; }
  .decision-card,
  .nota,
  .subpage-links    { padding: 22px; }
  .decision-row {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 14px 0;
  }
  .decision-arrow { display: none; }
  .decision-result {
    padding-left: 14px;
    border-left: 2px solid var(--accent);
  }
  .rate-bar { padding: 8px 10px; }
  /* Image stacks above title — see Section 11 */
  /* Guía Rápida badge becomes inline — see Section 12 */
}
```

---

## 17. Subpages

For topics complex enough to need multiple pages, the parent topic page in `/topics/` links out to subpages in `/topics/subpages/`. The parent ↔ subpage relationship is one-level only — no nested subpages.

### Subpage conventions

- File location: `/topics/subpages/[parent-name]-[subtopic-name].html`
- Back navigation: points to the parent topic page (`../[parent-name].html`), label `← Volver a [Parent Title]`
- Asset paths: `../../assets/[filename]`
- Same spec: subpage uses everything in this document — its own background pattern, its own rate bar, its own optional Guía Rápida (if relevant), its own content cards.
- Parent topic page lists its subpages in a `.subpage-links` block (Section 13c) near the bottom of the page.

### Why each subpage has its own rate bar

Each page is a separate HTML file with independent JS state. A user can land on a subpage directly via URL or back navigation, so the rate bar must be present so they can control playback. Defaults to Normal on every page load.

---

## 18. DO / DON'T Summary

### DO
- Start the page with `← Volver al menú` (or `← Volver a [Parent]` on subpages)
- Title card → optional intro paragraph → rate bar (if there are example sentences) → content cards → optional decision guide → optional subpage links
- One background pattern per page from the 5 SVG options
- One accent color trio per page
- Spanish for every layer except NOTA boxes and the optional Guía Rápida modal
- DM Serif Display for Spanish example sentences at ~1.05rem
- English `.example-en` gloss directly beneath each Spanish example — short, just a translation
- NOTA\* boxes inline within content cards, at the point the mechanic matters — multiple per page allowed when warranted
- `data-region="rioplatense"` on examples whose Spanish text is regionally marked (voseo, lunfardo, regional lexis) — this is a textual flag retained for forward compatibility; the default JS does not change audio for those rows
- A clickable `⚡ Guía Rápida` badge in the title card when a topic genuinely benefits from a cheat sheet
- One image per card maximum, top-right of the card header, click to magnify in place
- Discuss section count, NOTA placement, and image inclusion with Daniel before writing them

### DON'T
- Don't use system fonts under any circumstance
- Don't introduce colors outside the approved palette and accent trio
- Don't put English in section headings, content card titles, narrative prose, button labels, or page chrome — Spanish only at those layers
- Don't add API calls of any kind (no fetch, no "Más ejemplos" buttons even disabled)
- Don't include decorative emojis (🎓 📚 ✨ etc.) — functional UI emojis (🔊 ⚡ ✕) are fine
- Don't append NOTA boxes at the end of the page as a summary block — they belong inline next to the content they explain
- Don't enable the dual-voice (Rioplatense) JS variant unless Daniel has explicitly asked for Rioplatense audio on that specific page — default to the neutral-only JS
- Don't use shadows, glows, or animations beyond what's specified
- Don't add a sidebar, tab system, accordion, footer, or theme toggle
- Don't narrow `.container` past 820px max-width
- Don't insert images or NOTA boxes without first proposing them to Daniel
- Don't repeat the rate bar within a single page — one per page, near the top

---

## 19. Self-Check Before Delivery

Before sending the file:

1. [ ] `<link>` for DM Serif Display + Outfit is in the `<head>`
2. [ ] No `font-family` anywhere references a system font (Arial, Helvetica, Segoe UI, Georgia, Times, Inter, Roboto)
3. [ ] CSS variables match the spec — no custom hex colors outside the approved palette and chosen accent trio
4. [ ] Back navigation is the first element inside `.container` and the path is correct for the page's location (topics/ → `../index.html`; topics/subpages/ → `../[parent].html`)
5. [ ] One and only one background pattern is applied via `body::before`
6. [ ] Background opacity is between 0.08 and 0.12
7. [ ] Each content card has a `card-[theme]` class matching one of the accent trio colors
8. [ ] Spanish example sentences use DM Serif Display; English glosses use Outfit italic
9. [ ] Every Spanish example sentence has a 🔊 speaker button
10. [ ] Each `.example-row` has `data-region` set — `"neutral"` for normal examples, `"rioplatense"` only when the Spanish text is regionally marked (the audio still plays neutral unless the dual-voice JS variant has been opted in)
11. [ ] Rate bar appears once near the top of the page (not duplicated per card)
12. [ ] TTS script block is present near `</body>` if there are example sentences
13. [ ] NOTA boxes (if any) are inline within content cards, English, with `<span class="nota-label">NOTA*</span>` label
14. [ ] No decorative emojis in body content
15. [ ] No API calls, no fetch, no disabled "Más ejemplos" buttons
16. [ ] Image references (if any) point to `../assets/` from `topics/` or `../../assets/` from `topics/subpages/`
17. [ ] Magnify script is present near `</body>` if any `.card-icon img` exists
18. [ ] Guía Rápida modal script + badge + modal markup are all present together, or all absent
19. [ ] Mobile breakpoint at 600px is present and the image-stack rule is included if images are used
20. [ ] Total file is one single `.html` file, self-contained, no external assets beyond the Google Fonts `<link>` and any local images in `/assets/`

---

## 20. Reference Examples

When in doubt about layout decisions, consult these deployed pages — not this spec's prose — to see how the pieces fit together:

- **Canonical single-topic builds (Spanish-primary + English NOTA + neutral-voice TTS):** `topics/desde-hace-y-construcciones-de-tiempo.html` and `topics/ya-todavia-aun.html`
  - These are the build pattern this spec describes — Spanish-primary chrome, English NOTA layer, neutral-voice TTS only, grammar cards with image-left variant rows, optional summary figures, and Rioplatense content (regional examples and dedicated Nota rioplatense callout cards) playing with the neutral voice. Use these as the layout and tone reference.

- **Guía Rápida modal pattern:** `prestar-pedir.html`
  - Note this page predates the Spanish-primary convention, so its body chrome is mostly English. The Guía Rápida modal itself, however, is exactly the pattern this spec adopts. Use it for the modal CSS structure and the table styling.

- **Dual-voice JS reference** (only relevant on builds where Daniel has explicitly requested Rioplatense audio): `interactive/tiempo-y-distancia.html`
  - Uses the dual voice pool variant. Ignore the page's other features (API-backed "Más ejemplos" buttons, register filter toggle, tabbed sections, hero photo background) — they are out of scope for single-topic pages.

If a future single-topic page becomes a stronger canonical reference, update this list to point new sessions to that file instead.

---

*End of spec. Commit a copy to the project folder. Upload to Gemini each time a new single-topic page is being built.*
