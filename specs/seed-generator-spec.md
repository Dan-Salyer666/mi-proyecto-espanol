# Comprensión Lectora — Semilla Aleatoria (Seed Generator)

### Status: **SPEC — not yet built**
### Target file: `comprension-lectora.html` + new external data file `semillas-data.js`
### Deploy: **bundled with Phase 4 (provider persistence + badge)** as a single deploy. See "Bundled deploy" at the end.

---

## 1. What this is

A third way to start a story, alongside the Tema box and Modo de Generación. The user taps a button, the app rolls a **client-side** seed that resolves to a terse Spanish constraint string, and that string is fed into the existing theme path exactly as a typed Tema would be. The resolved fields are hidden from the user (surprise); only the seed **number** is shown, saved with the story, and reviewable later.

### Why it's built this way (the lesson from last time)
The previous seed attempt had an AI expand the seed into an elaborate script — that bled tokens *and* hurt the writing (elaborate planning primes register upward; constraints cost less than instructions). This design inverts that:

> **HARD GUARDRAIL — non-negotiable.** The seed generator is 100% front-end. No model call happens during rolling or review. The AI only ever receives the short resolved string at normal generation time, in the same slot a typed Tema occupies. Rolling and reviewing cost **zero tokens**. If we are ever tempted to "let the AI flesh out the seed," that is the exact wrong turn.

---

## 2. Core mechanics (settled in discussion)

- **Seed = a number, via a seeded PRNG.** A small deterministic PRNG (mulberry32) turns an integer into the same sequence of rolls every time. Every integer is therefore a valid, coherent seed by construction — there is no such thing as a "dead" number, because each roll draws from a pre-filtered (coherent) pool.
- **Generation has no input box.** Tapping "Generar semilla" mints a random number, rolls, and shows e.g. `Semilla 4471`. Tapping again mints a new number. The user never types a seed to generate (avoids the "all numbers must work" / backward-map concern at generation time).
- **Review has an input box** (separate screen). Typing a number replays the roll against the *current* data set and displays the resolved prompt. No generation, no tokens.
- **Determinism vs. an editable data set.** The data file is versioned. Editing it changes what old numbers produce — accepted, like game seeds across a patch. The user cares about "what does this number do *now*," so review re-derives against the current data. The seed number is stored with the story; the resolved string is **optionally** stored too (cheap permanence insurance — left out of v1 unless wanted).
- **The vat drains by pre-filtering.** Each pick writes constraints; the next field's pool is reduced to only compatible options *before* the dice touch it. We never roll-then-reject. Front-loaded: genre is the big top-prune.

---

## 3. Field model — two classes

- **Setting fields (gated/dependent):** rolled first; the genre anchor prunes the rest. v1: **Género → Lugar**.
- **Spice fields (orthogonal/free):** rolled after; no gating. v1: ending, deadly-sin lens, character, situation, time, treatment.

Compatibility is expressed per option with an optional `requires` array of genre ids. No `requires` = compatible with all. When rolling a gated field, the roller filters its pool to options whose `requires` includes the chosen genre (or have none).

**Fixed roll order (load-bearing for determinism):**
`genero → lugar → final → pecado → personaje → situacion → tiempo → tratamiento`

---

## 4. Data file: `semillas-data.js` (external, versioned)

A `const` assigned to a global — JS-as-data, no fetch, consistent with the verb-data files. Loaded via a `<script src="semillas-data.js">` before the page script.

```js
const SEMILLAS = {
  version: 1,
  rollOrder: ['genero','lugar','final','pecado','personaje','situacion','tiempo','tratamiento'],
  fields: {
    genero: {                       // anchor — prunes everything below
      gated: false,
      options: [
        { id: 'scifi',   label: 'ciencia ficción', weight: 1 },
        { id: 'misterio',label: 'misterio',        weight: 1 },
        { id: 'sobrenat',label: 'sobrenatural',    weight: 1 }
      ]
    },
    lugar: {                        // gated by genero via `requires`
      gated: true,
      options: [
        { id: 'barco',    label: 'en un barco',            weight: 1 },
        { id: 'avion',    label: 'en un avión',            weight: 1 },
        { id: 'estacion', label: 'en una estación espacial', weight: 1, requires: ['scifi'] },
        { id: 'nave',     label: 'en una nave espacial',   weight: 1, requires: ['scifi'] },
        { id: 'pueblo',   label: 'en un pueblo pequeño',   weight: 1 },
        { id: 'ciudad',   label: 'en una gran ciudad',     weight: 1 }
      ]
    },
    final: { gated: false, options: [
      { id: 'sorpresa', label: 'final sorpresa', weight: 1 },
      { id: 'giro',     label: 'final con giro', weight: 1 }
    ]},
    pecado: { gated: false, options: [
      { id: 'soberbia', label: 'destacar la soberbia' }, { id: 'ira',      label: 'destacar la ira' },
      { id: 'envidia',  label: 'destacar la envidia' },  { id: 'avaricia', label: 'destacar la avaricia' },
      { id: 'lujuria',  label: 'destacar la lujuria' },  { id: 'gula',     label: 'destacar la gula' },
      { id: 'pereza',   label: 'destacar la pereza' }
    ]},
    personaje: { gated: false, options: [
      { id: 'anciano', label: 'un anciano' }, { id: 'joven',  label: 'una joven' },
      { id: 'pareja',  label: 'una pareja casada' }, { id: 'nino', label: 'un niño que crece' }
    ]},
    situacion: { gated: false, optional: true, options: [   // `optional` adds an implicit "none" slot
      { id: 'aislamiento', label: 'marcada por el aislamiento' }
    ]},
    tiempo: { gated: false, options: [
      { id: 'pasado',   label: 'ambientada en el pasado' },
      { id: 'presente', label: 'ambientada en el presente' },
      { id: 'futuro',   label: 'ambientada en el futuro' }
    ]},
    tratamiento: { gated: false, optional: true, options: [ // genre-agnostic treatments
      { id: 'twilight', label: 'con un tono al estilo Twilight Zone' },
      { id: 'shakes',   label: 'con un tono shakesperiano' },
      { id: 'parabola', label: 'narrada como una parábola' }
    ]}
  }
};
```

> **v1 deliberately small:** 3 genres, 6 places (2 gated to sci-fi), 6 spice fields. Small enough to eyeball, but it contains the one real conflict that matters — `estacion`/`nave` must vanish under `misterio`/`sobrenat`. That conflict is the test. Once the engine is proven, the big vat is pure content population (Sonnet's job) against this same schema.

> **`weight`** is optional (default 1). It exists now so preference-weighting can be tuned later without a schema change. **`optional: true`** fields roll an implicit "none" outcome part of the time, so not every story carries a treatment/situation.

---

## 5. Roller algorithm (client-side, ~30 lines)

```js
// deterministic PRNG
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

function rollSeed(seedNum, data){
  const rng = mulberry32(seedNum);
  const chosen = {};   // fieldId -> option (or null)
  for (const fieldId of data.rollOrder){
    const f = data.fields[fieldId];
    let pool = f.options;
    if (f.gated) pool = pool.filter(o => !o.requires || o.requires.includes(chosen.genero?.id));
    let effective = pool.slice();
    if (f.optional) effective = [{ id:'_none', label:null }, ...effective];   // implicit "none"
    // weighted pick consuming exactly one rng() per field (order fixed → reproducible)
    const total = effective.reduce((s,o)=>s+(o.weight||1),0);
    let r = rng()*total, pick = effective[effective.length-1];
    for (const o of effective){ r -= (o.weight||1); if (r<0){ pick=o; break; } }
    chosen[fieldId] = pick.id==='_none' ? null : pick;
  }
  return chosen;
}

// terse Spanish constraint string for the existing theme slot — constraints, not instructions
function seedToTheme(chosen){
  return Object.values(chosen).filter(Boolean).map(o=>o.label).join(', ');
}
// example: "misterio, en un pueblo pequeño, una pareja casada, destacar la envidia, final con giro, ambientada en el presente"
```

- **Seed minting:** `const seedNum = Math.floor(rng_global()*1e9)` (or any int) on each "Generar semilla" tap — display-friendly number.
- **Validation pass (run once whenever data changes):** for every genre, confirm every `gated` field has ≥1 surviving option; confirm no required field's pool can drain to empty. A tiny script walks the genres and asserts. This is the safety net that lets the data set be remade freely without dead seeds.

---

## 6. UI integration (exact anchors in `comprension-lectora.html`)

**Tema card** is at line ~793 (`<div class="card-label">Tema</div>`, `#themeInput`, `#surpriseMe`). **Modo de Generación** grid is at line ~805 (`data-module` buttons, `pickModule`).

1. **Add the seed toggle** in/near the Tema card — a button labeled **`🎲 Semilla aleatoria`** (or `Usar semilla`). State: `cfg.seedMode` (bool).
2. **Mutual exclusivity:**
   - Turning seed mode **on** → disable `#themeInput` + `#surpriseMe`, and grey out the `data-module` buttons (add a `.disabled` style; ignore their `onclick` while seedMode).
   - Picking a module or enabling `surpriseMe`/typing a Tema → turn seed mode **off** (clear `cfg.seedMode`, re-enable inputs, re-enable modules).
3. **"Generar semilla" button** (visible only in seed mode): on tap →
   ```js
   cfg.seed = Math.floor(Math.random()*1e9);
   const chosen = rollSeed(cfg.seed, SEMILLAS);
   cfg.seedTheme = seedToTheme(chosen);   // kept in memory, NOT shown (surprise)
   cfg.seedVersion = SEMILLAS.version;
   // display only the number:
   document.getElementById('seedDisplay').textContent = 'Semilla ' + cfg.seed;
   ```
   Repeat taps mint a new number. The resolved `cfg.seedTheme` is never rendered to the user here.

---

## 7. Generation + persistence integration

- **Theme branch** at line ~1874 (currently:
  `const theme = document.getElementById('surpriseMe').checked ? null : document.getElementById('themeInput').value.trim() || null;`)
  → becomes:
  ```js
  const theme = cfg.seedMode
    ? cfg.seedTheme
    : (document.getElementById('surpriseMe').checked ? null
       : document.getElementById('themeInput').value.trim() || null);
  ```
  Everything downstream (the `Tema: ${theme}` prepend at ~1544 / ~1945) is unchanged. The seed path reuses the existing pipeline verbatim.
- **Save record** (~line 2785) → add:
  ```js
  seed: currentCfg.seedMode ? currentCfg.seed : null,
  // (Phase 4 also adds: generator: currentCfg.generator || 'claude')
  ```
- **Resume** (`resumeStory`, ~line 2939): restore `cfg.seed = s.seed || null` for the header badge only. Continuation runs off the stored plan/bible as today; the seed is metadata, not re-rolled.

---

## 8. Seed badge on the story page

In `renderQuiz` (~line 2149), right after the `#qTags` row (where the Phase 4 generator badge is appended), append a seed pill when present:

```js
if (currentCfg.seed) {
  document.getElementById('qTags').insertAdjacentHTML('beforeend',
    `<span class="gen-badge gen-seed">Semilla ${currentCfg.seed}</span>`);
}
```
Add a `.gen-badge.gen-seed` CSS variant (neutral/gray pill, distinct from the terracotta Claude / indigo Gemini badges). So the story header reads, e.g.: `B2 · everyday · [Gemini] · [Semilla 4471]`.

---

## 9. Review screen

A small panel reachable from the main page ("Revisar semilla"):
- One number input + a "Revelar" button.
- On reveal: `const chosen = rollSeed(parseInt(input), SEMILLAS); show seedToTheme(chosen)` plus the per-field breakdown. **No generation. Zero tokens.**
- Note shown to the user: this reflects the **current** data set (version N); older stories made under a different version may differ. (Matches the accepted game-patch behavior.)

---

## 10. Phase plan

- **Phase A — engine + tiny vat (this spec, v1):** PRNG, roller, `semillas-data.js` (the pool in §4), validation pass, seed toggle + mutual exclusivity, "Generar semilla", theme branch, seed persistence, seed badge, review screen. Ship bundled with Phase 4.
- **Phase B — field test:** see §11. No new code; just rolling and reading.
- **Phase C — the big vat:** Sonnet populates `semillas-data.js` against the frozen schema (more genres, places, characters, situations, treatments, weights). Bump `version`. Re-run validation. Content-only; no engine changes.

---

## 11. Field-test checklist (Phase B)

1. Toggle seed mode → confirm `#themeInput`, `#surpriseMe`, and the module buttons all grey out; toggling off restores them.
2. Tap "Generar semilla" repeatedly → a new number each time, no resolved string leaked to the UI.
3. Generate ~12 stories. For each, read the story and confirm the world is coherent.
4. **The prune test:** confirm that whenever the genre is `misterio` or `sobrenatural`, the story is **never** set on a space station or spaceship.
5. Confirm the seed number shows at the top of the story page beside the generator badge, and persists through a save + reload/resume.
6. Open review, type a generated number → confirm it reproduces the same resolved string (determinism holds against current data).
7. Type an arbitrary number (e.g. 666) → confirm it produces a valid coherent string (no dead seeds).

---

## 12. Bundled deploy (single push)

Two features ship together to avoid multiple deploys:

- **Phase 4 — provider persistence + badge** (see `comprension-lectora-phase4-provider-persistence-spec.md` for exact anchors): persist `generator` in the save record, restore `cfg.generator` + button highlight on resume, terracotta/indigo provider badge in `#qTags`.
- **Semilla Aleatoria — Phase A** (this spec).

Shared touch points (do both edits in one pass): the save record (~2785) gains both `generator` and `seed`; `resumeStory` (~2939) restores both; `renderQuiz` (~2149) appends generator badge + seed badge; the `.gen-badge` CSS block defines `gen-claude`, `gen-gemini`, and `gen-seed`.

**Combined deploy checklist:**
1. Add `semillas-data.js`; include `<script src>` before the page script.
2. Apply Phase 4 edits (3 JS touch points + CSS).
3. Apply Seed edits (toggle, Generar semilla, theme branch, save/resume, badge, review).
4. Tag-balance check after HTML splices.
5. Push once. Test on Netlify (Drive + resume need the real origin). Run both field-test sets (Phase 4 §field test + Seed §11).

---

## 13. Fold-back

Once built and field-tested, the relevant parts become an **AS-BUILT ADDENDUM** to `comprension-lectora-state.md`: Phase 4 closes the "generator persistence (deferred)" item; the seed feature adds a new "Semilla Aleatoria" entry noting the external `semillas-data.js`, its version, and the roll order. Phase C (big-vat population) gets its own addendum line when done.
