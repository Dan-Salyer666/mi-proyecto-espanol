# Formación de Preguntas — Current State (pre–Phase 6)

Short handoff so a fresh chat can start **Phase 6** without reverse-engineering. Read alongside `preguntas-app-spec.md` (the governing spec — Phase 6 scope, Dimension A/B, the store schema) and `master_briefing.md` (conventions, Drive patterns, edit format).

---

## Status at a glance

- **Phases 1–5 are built and committed to GitHub `main`.** `main` is the source of truth. Clone fresh at session start and read `interactive/preguntas-dinamica.html` — that file is the entire dynamic quiz (Phases 4 + 5).
- **Live Netlify is BEHIND `main`.** Daniel is batching deploys to conserve them; the latest code (grading fix, variety fix, dashboard 5c, reset 5d, between-rounds refresh) is **not deployed and not yet live-field-tested**. A full live vet is planned **after** Phase 6.
- **Live-verified so far:** the early Phase 5 Drive bits only — file creation, folder placement, and per-round count accumulation (5a + 5b).
- **Static-validated but NOT live-vetted:** the grading-rubric rewrite, the generation-variety change, the start-screen dashboard (5c), the reset-with-confirm (5d), and the results-screen refresh. These passed `node --check`, tag-balance, and logic review only. Build Phase 6 aware they're unconfirmed on live.

---

## Phase 5 as-built (the deltas not in `preguntas-app-spec.md`)

**Drive store.** Single JSON at `Spanish Learning/formacion-preguntas-weakness.json` (same shared project folder as género / Quiz Archive / `palabras-confusas.json`). Uses `drive.file` scope and the **same OAuth client ID** as Comprensión Lectora, so it latches onto the existing folder. Find-or-create folder + file follows the Palabras Tramposas pattern (`ensureFolder()` → find-or-create file with `parents:[folderId]`; PATCH `uploadType=media` to overwrite). Drive is **optional** — the quiz runs session-only with no connection.

**Store schema:**
```json
{ "contentRev": 1, "updated": "<iso>", "totalAnswered": 0,
  "categories": { "<cat>": { "seen": 0, "missed": 0, "casi": 0 }, ... all 11 Dimension-A buckets ... } }
```
Migration via `migrateStore()` + `STORE_REV`; bump the rev and extend `migrateStore` when Phase 6 adds Dimension-B fields.

**Locked scoring decisions:**
- `casi` is **not** a miss. `missed` counts `incorrecto` only.
- `casi` **is** banked per category (the third field) specifically to pre-seed Phase 6 Dimension-B targeting.
- Grading-failure (`fallo`) items are excluded entirely — no seen/missed/casi/totalAnswered.
- `MIN_SAMPLE = 5` — categories below this are greyed (`pocos datos`) and excluded from weakness ranking.

**Dashboard / reset:** start-screen weakness panel (categories with `seen ≥ 1`, sorted weakest-first by error rate, low-data greyed, `% errores` framing, `· N casi` tail). Reset button → inline confirm → zeroes store + writes. Results screen shows the cumulative panel too, refreshed the moment a round is counted (no reset button there). One batched write per finished round; in-memory store is authoritative for the session.

## Grading rubric (current behavior)

It's a **question-FORMATION** test, not spelling/accents in general. The grader:
- **Ignores** capitalization, accents on non-interrogative words (`farmacía` vs `farmacia`), spelling typos, tú vs usted, meaning-preserving word-order/synonym differences.
- Uses **`casi` only** for (a) a missing/wrong accent on the *interrogative word itself* (`donde`→`dónde`, `que`→`qué`, …) or (b) a missing opening ¿ / closing ?.
- Uses **`incorrecto`** for wrong interrogative/structure/meaning or any voseo.
- Is told to **never invent a slip** — if it can't point to a real one, it's `correcto`.

## Generation (current behavior)

Each round the **client** shuffles the 10 generatable Dimension-A buckets (excludes `si_no`), takes 6, and dictates them + a random seed + 3 random everyday contexts to the model. The client then **overwrites each item's `dimA`** with the dictated category, so `dimA` is authoritative client-side (not the model's echo) and coverage stays even. `/api/claude` does **not** forward `temperature` (runs at API default) — variety comes from this prompt entropy. Model is `claude-sonnet-4-20250514` for both generation and grading.

---

## Phase 6 entry points (per `preguntas-app-spec.md`)

1. **Target mode** — read the store's error-rate profile, rank categories above `MIN_SAMPLE`, and feed weights into the generation prompt (which already dictates the 6 categories client-side, so this is a natural extension: bias the shuffle/selection toward weak buckets instead of uniform random).
2. **Dimension B capture** — grader returns an `errorType` (`wrong_interrogative`, `missing_prep`, `wrong_prep`, `que_cual`, `agreement`, `word_order`, `spelling_accent`, `other`); store it in a new `features`/Dimension-B section (schema extension → `STORE_REV` bump → `migrateStore`). The banked `casi` counts are the seed for this.
3. **Jeopardy variant** — answer-elicitation free-production form, AI-graded.

Follow the usual flow: **discuss → confirm locked decisions → write `preguntas-phase6-spec.md` → build incrementally (one observable change per deploy) with `node --check` + tag-balance validation on each step.**

---

## Loose ends to verify (not blockers)

- **Deploy + vet** the current `main` to live Netlify after Phase 6, and field-test 5c/5d/grading/variety/refresh on the real origin (Drive OAuth + resume paths only work on the live domain).
- **Nav wiring:** the index entry (under *Entrenamiento Independiente*) and the review-page CTA (`topics/formacion-de-preguntas.html`) pointing to `interactive/preguntas-dinamica.html` were specced — confirm they're present on those pages.
- **`master_briefing.md`** should contain the surgical-edit handoff convention added this session (FIND block + REPLACE block per edit; ask Daniel whether he applies it himself or Claude applies and hands back the file). Confirm it's there.
