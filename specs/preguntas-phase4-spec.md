# Build spec — Preguntas Phase 4: dynamic quiz (general mode, session-scoped)

**Parent:** `preguntas-app-spec.md` §9 Phase 4. **Status:** locked, ready to build.
**File:** `interactive/preguntas-dinamica.html` (new sibling of `preguntas.html` / `preguntas-trampas.html`).
**Scope:** generate 6 English prompts → learner types the Spanish question → AI grades each → score + Dimension-A breakdown. Session-scoped, **no Drive, no persistence**. Proves the generate+grade loop and grader tolerance.

---

## 1. Locked decisions (this phase)

1. **Model:** Sonnet (`claude-sonnet-4-20250514`) for **both** generation and grading. Promote grading to Opus only if field tolerance is poor (separate change).
2. **N per run:** 6.
3. **Grader verdict:** three-way — `correcto` / `casi` / `incorrecto` (rules §4).
4. **Background:** `../assets/los fondos/alhambra piscina.webp`.
5. **Score:** count of `correcto`; `casi` and `incorrecto` shown in the breakdown but don't add to the headline score. Results line: `X / 6 correctas` + a `· N casi` tail when any.

---

## 2. Shell & placement

Reuse the navy + teal idiom of `preguntas-trampas.html` verbatim (same `:root`, `.bg-photo/.bg-overlay`, `.topbar`, `.page-header`, `.progress`, `.quiz-card`, `.feedback`, `.controls`, `.results`, `.cat-breakdown`). New page chrome:

- Overline `Práctica · Dinámica`; h1 `Formula la pregunta`; subtitle: the app gives an instruction in English, you write the Spanish question, and it grades you.
- Topbar: `← Menú` → `../index.html`; `Repasar la teoría →` → `../topics/formacion-de-preguntas.html`.
- Background `alhambra piscina.webp`.

**Navigation wiring (deploy-time, Daniel applies):** a third index entry under *Entrenamiento Independiente* and a third CTA button on the review page, both → `interactive/preguntas-dinamica.html`. Snippets supplied at build hand-off.

---

## 3. Screen flow

`password` (if unverified this session) → `start` → `generating…` → per-item `prompt → answer → grading… → verdict` ×6 → `results`.

- **Password gate:** reuse Comprensión Lectora's pattern — a `<input id="pwInput">`, POST `/api/verify` once, store in module var `sessionPw`, include in every later call. If `/api/verify` returns `{valid:true}` with no password configured, skip straight through.
- **Start:** one button `Generar ronda →`.
- **Generating:** disable UI, show a `Generando preguntas…` state. One generation call (§4.1).
- **Per item:** show the English instruction + a small `dimA` chip; a `<textarea id="ans">` (1–2 lines) for the Spanish; `Comprobar` (disabled while empty). On submit: local fast-path check (§4.3), else a grading call (§4.2) with a `Calificando…` spinner. Then render the verdict feedback + (on `casi`/`incorrecto`) the model answer. `Siguiente →` / `Ver resultados →`.
- **Results:** `X / 6 correctas` (+ casi tail), Dimension-A breakdown (`correcto/total` per bucket touched this run), `Otra ronda →` (new generation) + `Repasar la teoría →` ghost link. Nothing persisted.

---

## 4. The two calls

Both: `POST /api/claude`, body `{ system, messages:[{role:"user",content}], model:"claude-sonnet-4-20250514", max_tokens, password: sessionPw }`, non-streaming; read `data.content[0].text`; strip fences (`/^```json\s*/i`, `/^```\s*/i`, `/```\s*$/`) and `JSON.parse` inside try/catch.

### 4.1 Generation (one call, max_tokens ≈ 1500)

**System prompt (intent):** "You write practice items for a B2 learner of **neutral Latin American Spanish**. Produce exactly 6 items as a JSON array, nothing else. Each item gives an English instruction telling the learner which question to ask; the learner will write the Spanish question. Spread the 6 across distinct Dimension-A functional buckets. Neutral Latin American Spanish only — **never voseo** (`tú`/`usted` only), no Spain forms. No medical content."

**Item contract:**
```json
{ "id":1, "en":"Ask a stranger where the train station is.",
  "dimA":"lugar",
  "ref":"¿Dónde está la estación de tren?",
  "vars":["¿Dónde queda la estación de tren?"] }
```
| Field | Rule |
|---|---|
| `en` | English instruction; must elicit exactly **one** natural Spanish question |
| `dimA` | one of the 11 buckets (identidad, lugar, tiempo, frecuencia, cantidad, manera, razon, eleccion, descripcion, formulas; **exclude `si_no`**) |
| `ref` | the model Spanish question — correctly accented, with `¿ … ?` |
| `vars` | 0–3 other **fully acceptable** Spanish phrasings (synonyms, word-order variants); never voseo |

Validate on return: array length 6, each has `en`/`dimA`/`ref`; coerce missing `vars` to `[]`. If invalid → error + `Reintentar`.

### 4.2 Grading (one call per non-fast-pathed answer, max_tokens ≈ 300)

**User content:** JSON `{ en, ref, vars, dimA, studentAnswer }`.
**System prompt (intent):** "Grade a learner's Spanish question against the English instruction. You are given a model answer (`ref`) and acceptable variations (`vars`) — treat any answer equivalent to those as correct. Return **only** JSON: `{\"verdict\":\"correcto|casi|incorrecto\",\"feedback\":\"<one short Spanish line>\",\"dimA\":\"<echo dimA>\"}`."

**Verdict rules (in the system prompt):**
- `correcto` — a natural, correct question matching the instruction's intent. **`tú` and `usted` both fine.** Equivalent to `ref`/`vars`.
- `casi` — right question and right interrogative, but a **form slip only**: missing opening `¿`, a dropped/added accent, a minor typo, trivial agreement wobble that doesn't change meaning. Feedback names the slip.
- `incorrecto` — wrong interrogative, wrong structure, wrong meaning, **or any voseo** (`tenés`, `sos`, `vos`, voseo imperatives). Feedback says why in one line.
- `feedback` is one short Spanish line. No English. No multi-sentence essays.

### 4.3 Local fast-path (reconciliation, cost saver)

Before any grading call, normalize the student answer and compare to `ref` + each `var`:
- normalize = trim, collapse internal whitespace, strip leading `¿`/trailing `?`, lowercase. **Do not strip accents** (accent loss must still surface as `casi`).
- exact normalized match to `ref`/a `var` → `correcto` locally, **no API call**.
- otherwise → grading call (§4.2).

This is the Comprensión Lectora lesson (carry a verbatim reference + reconcile client-side) applied to keep grading steady and cheap.

---

## 5. State (in-memory only)

`items[]` (the 6), `idx`, `results[]` (`{answer, verdict, feedback, modelShown}`), `score` (count of `correcto`), `casiCount`, `dimaStats{bucket:{correcto,total}}`, `sessionPw`. No `localStorage`, no Drive. `Otra ronda` re-runs generation from scratch.

---

## 6. Robustness

- Safe-parse both responses; on malformed JSON → `Reintentar` (regenerate, or re-grade the current item).
- Grading-call failure/malformed → fallback verdict `casi`-neutral: show the **model answer** and a line "No pude calificar con seguridad; compara con la respuesta modelo." Item is **not** counted in score (`total` unaffected), learner continues.
- Generation failure → error card + `Reintentar`, no half-run.
- Wrong password → message under the field, re-prompt; never store an unverified `sessionPw`.
- All API text rendered as text (no `innerHTML` of model output without escaping) — escape `<`/`>`/`&` in `en`, `ref`, `feedback`, and the learner's own answer before injecting.

---

## 7. Out of scope (later phases)

Phase 5: Drive-backed `{seen,missed}` weakness store + dashboard + reset. Phase 6: target mode, Dimension-B capture, Jeopardy free-production. **Phase 4 writes nothing and reads nothing persistent.**

---

## 8. Runtime cost (per run)

≤ 7 Sonnet calls: 1 generation (~1.5k out) + up to 6 small gradings (~300 out each); fewer when the fast-path catches exact matches. Order-of-magnitude a few cents per run — note for field-testing volume.

---

## 9. Build order (single observable slice = the page)

1. Shell + password gate + start screen.
2. Generation call + item validation; render the prompt/textarea (grade stubbed).
3. Grading call + fast-path + verdict rendering.
4. Results + Dimension-A breakdown.
5. Local validation: `node --check` on extracted JS, HTML tag balance, escaping check. **Live generate/grade testing is Daniel's** (password-gated, runs on Netlify).
