# Formación de Preguntas — Phase 6 Spec

**Status:** Draft for confirmation. Build in sub-phases, one observable change per deploy, `node --check` + tag-balance on each. Read alongside `preguntas-app-spec.md` (governing) and `preguntas-current-state.md` (as-built Phase 4+5).
**File:** `interactive/preguntas-dinamica.html` (the existing dynamic quiz — Phase 6 extends it in place).
**Governing decisions inherited:** neutral Latin American Spanish; grader accepts tú/usted, never voseo; `MIN_SAMPLE = 5`; reset zeroes the store; cumulative scoring (no decay); 11 Dimension-A buckets; `si_no` excluded from generation.

---

## 0. Assumed decisions (veto any before build)

These are my recommended defaults from this session. The build follows them unless changed.

- **A1 — Steering strength (6a): weighted sampling, not hard top-N.** Every generatable category keeps a floor weight so quiet/under-sampled buckets still appear and accrue data; weak buckets get bonus weight by error rate. Rationale: balances drilling weaknesses against still gathering data.
- **A2 — Dimension B stores frequency, not rate (6b).** A flat `errorsByType` tally on the store (grader + store change only), surfaced as "errores más comunes." We do **not** add generator-side feature tagging or per-feature `{seen,missed}` rates yet — that (and B-targeting) is deferred to 6c, built only if frequency proves too blunt.
- **A3 — `casi` stays earmarked for Dimension B, not pulled into A-targeting.** 6a weights on `missed/seen` only. (The banked `casi` counts remain available as a future B signal per the original design note.)
- **A4 — errorType captured on `incorrecto` only.** `casi` keeps its own banked signal; `correcto`/`fallo` contribute no errorType. Keeps the mapping clean.
- **A5 — Mode choice is session state**, not persisted to the store. Defaults to General each load.
- **A6 — Jeopardy variant is deferred** to its own sub-phase (6c) / possibly its own page; Phase 6's headline result ("questions adapt to weak areas") is delivered by 6a alone.

---

## 1. Sub-phase order & observable results

| Sub-phase | Scope | Observable result | Schema change |
|---|---|---|---|
| **6a** | Target mode (Dimension A): start-screen mode toggle + weighted client-side category selection. | In *Enfoque*, rounds visibly over-represent your weak categories; *General* unchanged. | none |
| **6b** | Dimension-B capture: grader returns `errorType`; store gains `errorsByType` tally; dashboard shows "errores más comunes." | After rounds, the dashboard names your most frequent mistake types. | `STORE_REV`→2, `migrateStore` extended |
| **6c** *(deferred)* | Dimension-B targeting (only if 6b frequency proves actionable; likely needs generator-side feature tagging for rates) **+** Jeopardy answer-elicitation variant. | TBD; re-spec after 6a/6b are live-vetted. | TBD |

Each sub-phase ships standalone value. 6c is not built until 6a/6b are confirmed on live.

---

## 2. Sub-phase 6a — Target mode (Dimension A)

### 2.1 UI
Start card gains a small segmented control: **General** (default) / **Enfoque**.

- **General** = current behavior exactly (uniform shuffle of the 10 generatable buckets, take 6).
- **Enfoque** = weighted selection (§2.2). Requires a connected Drive store with usable data.
- **Gating:** if Drive is not connected, or the store has fewer than `MIN_SAMPLE` total answers in *any* category, **Enfoque** is greyed with a one-line hint: *"Conéctate con Drive y completa algunas rondas para activar el enfoque."* General always available.
- The toggle re-renders live when Drive connects (the start screen already re-renders the Drive row on connect).

### 2.2 Selection algorithm (replaces the uniform pick, Enfoque only)
Same 10-bucket pool (excludes `si_no`). Weighted sample **without replacement**, 6 of 10:

```
errorRate(cat) = (seen >= MIN_SAMPLE) ? missed / seen : 0      // under-sampled → no bonus
weight(cat)    = W0 + K * errorRate                            // W0 = 1, K = 4
```

- A mastered, well-sampled category → weight 1. A 100%-error, well-sampled category → weight 5 (up to ~5× pick probability). Under-sampled categories sit at the floor (weight 1) so they keep appearing and accruing data — the "explore vs exploit" balance.
- Sample: pick one cat with probability ∝ weight, remove it, renormalize, repeat until 6 chosen. Then **shuffle the final 6** for presentation order (so a heavy category isn't always item 1).
- `W0`/`K` are named constants at the top of the script for easy tuning.

### 2.3 What the model sees
**Unchanged.** The client still dictates the 6 categories + order and overwrites each item's `dimA` authoritatively after generation. Target mode only changes *which 6 categories* the client dictates — nothing in `GEN_SYS` or the user message format changes. (We deliberately keep selection client-side rather than feeding the profile to the model, to avoid conflicting with client-side `dimA` dictation. This is the natural extension the as-built predicted.)

### 2.4 State
- `quizMode` (`'general' | 'enfoque'`), session-only, default `'general'`.
- `generateRound()` branches on `quizMode` for the category pick; everything downstream (grading, store write) is identical.

---

## 3. Sub-phase 6b — Dimension-B capture

### 3.1 Grader contract change
`GRADE_SYS` returns one extra field:

```json
{"verdict":"correcto|casi|incorrecto","feedback":"<short Spanish line>","dimA":"<echo>","errorType":"<tag|null>"}
```

- `errorType` is non-null **only when `verdict` is `incorrecto`.** One of:
  `wrong_interrogative`, `missing_prep`, `wrong_prep`, `que_cual`, `agreement`, `word_order`, `spelling_accent`, `other`.
- For `correcto`, `casi`, and `fallo` → `errorType` is `null`/absent and contributes nothing.
- Parsing is defensive: unknown/missing `errorType` on an `incorrecto` → bucket as `other`.

### 3.2 Store schema change
Add a flat top-level tally; bump rev.

```json
{ "contentRev": 2, "updated": "<iso>", "totalAnswered": 0,
  "categories": { ... unchanged, 11 buckets {seen,missed,casi} ... },
  "errorsByType": { "wrong_interrogative":0, "missing_prep":0, "wrong_prep":0,
                    "que_cual":0, "agreement":0, "word_order":0,
                    "spelling_accent":0, "other":0 } }
```

- `STORE_REV` → 2.
- `migrateStore()` extended: defensively add/fill `errorsByType` with all 8 keys (default 0) without touching `categories`. A rev-1 store (categories only) migrates cleanly: keep categories, attach a zeroed `errorsByType`.
- `updateStore()` increments `errorsByType[errorType]` per `incorrecto` item (alongside the existing `categories[cat].missed++`). `fallo`/`casi`/`correcto` untouched.
- `confirmReset()` zeroes `errorsByType` too.

### 3.3 Dashboard surface
Under the existing weakness panel, add an **"Errores más comunes"** block:

- Sorted by count desc; show the top 3–4 non-zero types only.
- Shown only when the sum of `errorsByType` ≥ a small floor (e.g. 3) — otherwise hidden, to avoid noise.
- Human labels for the 8 tags (Spanish, e.g. `missing_prep` → *"Falta la preposición"*, `que_cual` → *"qué vs. cuál"*, `wrong_interrogative` → *"Interrogativo equivocado"*, …). Final label strings finalized at build.
- Appears on both the start-screen dashboard and the results-screen dashboard (same `dashboardHtml`).

### 3.4 Observable result
After a few rounds, the dashboard names the learner's most frequent error types — the seed for any later B-targeting.

---

## 4. Deferred to 6c (re-spec later)

- **Dimension-B targeting.** If the 6b frequency tally proves actionable, decide whether to (a) nudge generation toward items that exercise the weak feature, or (b) move to per-feature `{seen,missed}` rates, which requires the generator to tag each item with its Dimension-B feature and validate no-ambiguity per feature. Not built until we've seen real 6b data.
- **Jeopardy / answer-elicitation variant.** Spanish answer with the queried element underlined → learner produces the full question → AI-graded on whether the question targets the underlined element. Decide: mode-within-this-page vs separate `interactive/preguntas-jeopardy.html`; whether it writes the same Dimension-A store. Own build, own observable result.

---

## 5. Operational note — the one real testing dependency

Target mode is only meaningful against a **populated** store, and Phase 5's store stack is **not yet live**. So 6a cannot be field-tested until Phase 5 is deployed and several rounds have been played to build a profile. Two paths:

1. **Deploy mid-stream:** push current `main` (Phases 1–5) to Netlify now, play rounds to seed a live store, then vet 6a on real data.
2. **Build 6a + 6b, single push:** accept that all of it gets vetted together in the post-Phase-6 deploy, building 6a against a known-good store logic but unconfirmed live data.

This is a deploy-conservation call, not a spec decision. Flagging it because it's the place the "deploy after Phase 6" plan meets reality.

---

## 6. Build discipline (unchanged house rules)

- Clone `main` fresh; `main` is source of truth; live is behind.
- Surgical `str_replace` with count assertions over rewrites; `node --check` on extracted JS + HTML tag-balance after each edit.
- One observable change per deploy; field-test on live before the next.
- Hand back the edited file (or FIND/REPLACE blocks per the `master_briefing.md` convention) — confirm at build which Daniel prefers for this file.

---

*End of draft. Confirm §0 (or redline) and I build 6a first.*
