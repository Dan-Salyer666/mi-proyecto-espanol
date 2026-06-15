# Formación de Preguntas — Phase 5 Spec

**Drive-backed weakness store (Dimension A).** Evolves `interactive/preguntas-dinamica.html`. Purely additive — Phase 4's password gate and generate/grade loop are untouched. Governed by `preguntas-app-spec.md` §6.3, §7; this file is the build-level crystallization.

**Status:** Awaiting Daniel's sign-off, then build. Sonnet unchanged (generation + grading). Target mode, Dimension B, and the Jeopardy variant remain Phase 6.

---

## 1. Scope — what changes

The dynamic quiz stops being session-only and starts remembering. Every graded answer feeds a running aggregate per Dimension-A category, stored in a single JSON file on Google Drive. A dashboard on the start screen shows the accumulated profile; a reset button zeroes it. Drive is **optional**: with no connection the page behaves exactly as it does today.

Reuses the género / Comprensión Lectora persistence pattern verbatim: `drive.file` OAuth scope, the `driveRequest()` 401-retry wrapper, `contentRev` migration, find-or-create-by-filename bootstrap, and one batched write at round end.

---

## 2. Locked decisions (confirmed this session)

1. **`casi` is not a miss.** `missed` counts `incorrecto` only. A `casi` (right question, form slip) is a Dimension-B/form issue, not a Dimension-A weakness, so it counts as `seen` but not `missed`. We **do** bank a per-category `casi` tally now (a third field) to pre-seed Phase 6's Dimension-B targeting at no extra cost.
2. **Drive is optional.** Password gate + generate/grade loop are untouched. A separate "Conectar con Drive" action enables persistence and the dashboard. Without it: today's session-only behavior, no store, no dashboard.
3. **Dashboard on the start screen.** One row per category with data — seen count + error rate; categories under the 5-sample threshold greyed and marked *pocos datos*; a reset button with a confirm step. A single quiet line on the results screen (*Progreso guardado*) when a write succeeds.

**Grading-failure items** (`verdict: 'fallo'`) are excluded from the store entirely — same as they're excluded from the round score. They can't be classified.

---

## 3. Data model

One Drive file, `formacion-preguntas-weakness.json`:

```json
{
  "contentRev": 1,
  "updated": "2026-06-13T00:00:00Z",
  "totalAnswered": 0,
  "categories": {
    "identidad":   { "seen": 0, "missed": 0, "casi": 0 },
    "lugar":       { "seen": 0, "missed": 0, "casi": 0 },
    "tiempo":      { "seen": 0, "missed": 0, "casi": 0 },
    "frecuencia":  { "seen": 0, "missed": 0, "casi": 0 },
    "cantidad":    { "seen": 0, "missed": 0, "casi": 0 },
    "manera":      { "seen": 0, "missed": 0, "casi": 0 },
    "razon":       { "seen": 0, "missed": 0, "casi": 0 },
    "eleccion":    { "seen": 0, "missed": 0, "casi": 0 },
    "descripcion": { "seen": 0, "missed": 0, "casi": 0 },
    "si_no":       { "seen": 0, "missed": 0, "casi": 0 },
    "formulas":    { "seen": 0, "missed": 0, "casi": 0 }
  }
}
```

- All **11** Dimension-A buckets seeded for schema stability (generation never emits `si_no`, so it stays at zero and is hidden — see §6). A future phase that enables it needs no migration.
- **Error rate** for a category = `missed / seen`. This number *is* the category's score, exactly as framed in the app spec.
- **Min-sample threshold = 5.** Categories with `seen < 5` are excluded from weakness *ranking* (Phase 6 targeting) and greyed in the dashboard now. Defined here so Phase 6 reuses it unchanged.

---

## 4. Store update logic (round end, batched single write)

After the final item of a round, before/at the results screen, walk `results[]` and `items[]` together:

- `verdict === 'fallo'` → **skip** (no seen, no missed, no casi, no totalAnswered).
- otherwise let `cat = items[i].dimA`; ensure `store.categories[cat]` exists (defensive init to `{seen:0,missed:0,casi:0}`), then:
  - `seen++` always;
  - `incorrecto` → `missed++`;
  - `casi` → `casi++`;
  - `correcto` → neither.
- `totalAnswered++` for each non-`fallo` item.
- set `store.updated = new Date().toISOString()`.

Then **one** `driveRequest()` PUT/update of the whole file. The in-memory store is authoritative for the session once loaded; each round-end write persists the full current object (so a prior failed write is recovered on the next successful one).

When **not** connected, none of this runs — the round completes session-only.

---

## 5. Drive integration

- **Connect:** reuse Comprensión Lectora's OAuth token acquisition and the `driveRequest(method, path, body)` wrapper **verbatim** (including its 401 → silent token refresh → single retry). Pull the exact code from `comprension-lectora.html` at build.
- **Bootstrap (find-or-create):** with `drive.file` scope the app sees only files it created, so on connect: `files.list` with `q="name='formacion-preguntas-weakness.json' and trashed=false"`; if found, download and parse; if absent, create it with the §3 seed skeleton. Identical to the género bootstrap.
- **Migration:** on load, if `contentRev < 1` or any of the 11 categories / the `casi` field is missing, fill the gaps and bump `contentRev` to current, then write back. v1 has nothing earlier to migrate from, but the wrapper is in place for later revs.
- **Independence from the API gate:** Drive connect and the `/api/claude` password are orthogonal. A user may connect Drive at any time on the start screen; generating still triggers the existing password probe/gate. Neither blocks the other.

---

## 6. Dashboard (start screen) + reset

Rendered on the start screen **only when connected**, above the "Generar ronda →" button.

- **Heading:** *Tu progreso*.
- **Rows:** one per category with `seen ≥ 1`. Each row: category name (Spanish, from `DIMA_NAMES`), `seen` count, and `Math.round(missed/seen*100)% errores`. When `casi > 0`, append a quiet `· N casi`. Sort weakest-first (error rate desc) among categories at or above threshold; greyed *pocos datos* rows (`1 ≤ seen < 5`) sort last. Categories with `seen === 0` are **hidden**.
- **Empty state:** if no category has `seen ≥ 1` → *Aún no hay datos. Completa una ronda para empezar.*
- **Reset:** *Reiniciar progreso* button → inline confirm step (*¿Seguro? Esto borra todas tus estadísticas.* with Confirmar / Cancelar) → zero every category to `{seen:0,missed:0,casi:0}`, `totalAnswered:0`, `updated` now, write to Drive, re-render the (now empty) dashboard.

When **not** connected, the start screen shows today's card plus a quiet *Conecta con Drive para guardar tu progreso* action; no dashboard.

---

## 7. Results-screen confirmation

On the results screen, after the round-end write resolves:

- write succeeded → quiet line *Progreso guardado.*
- write failed (connected but Drive error) → *No se pudo guardar el progreso.*
- not connected → no line (the start-screen connect nudge already covers it).

Everything else on the results screen (score, casi tail, Dimension-A breakdown, *Otra ronda* / *Repasar la teoría*) is unchanged.

---

## 8. Robustness

- **Load failure on connect** → report once, fall back to not-connected for the session; the quiz still runs.
- **Write failure at round end** → §7 message; in-memory store retains the round's updates so the next successful write includes them.
- **Malformed store file** → run migration (§5); if unparseable, treat as absent and re-create the seed (do not silently lose a readable-but-old file — only overwrite on a clean parse failure).
- All Phase 4 robustness (safe-parse of generation/grading, fallback verdict, password 401 handling, output escaping) is unchanged.

---

## 9. Untouched Phase 4 invariants

The generate→type→grade loop, the local fast-path, the three-way verdict, the character pad, the password gate, max_tokens (1500 gen / 300 grade), the Sonnet model string, and all output escaping stay exactly as shipped. Phase 5 adds Drive load/write, the dashboard, and the reset — nothing in the existing loop is rewritten.

---

## 10. Build order (one observable change per deploy)

| Step | Adds | Observable result |
|---|---|---|
| 5a | Drive connect + `driveRequest()` + find-or-create bootstrap + migration | Connecting creates `formacion-preguntas-weakness.json` in Drive. |
| 5b | Round-end update + batched write | The file's counts grow after each completed round. |
| 5c | Start-screen dashboard render | Accumulated per-category stats display when connected. |
| 5d | Reset button + confirm | Reset zeroes the store and the dashboard. |
| 5e | Results-screen *Progreso guardado* line | Save status shows after a round. |

Each step ships and is field-tested before the next. Drive writes are one batched call per round; no added `/api/claude` cost.

---

## 11. Deferred to Phase 6

Target mode (reads the store to weight generation toward weak categories), Dimension-B capture and targeting (the `casi` tallies banked here feed it), and the full answer-elicitation "Jeopardy" variant. Phase 5 only *writes and displays* Dimension A; nothing reads the store to steer generation yet.

---

*End of Phase 5 spec. On sign-off, build per §10; commit a copy to the project /specs folder.*
