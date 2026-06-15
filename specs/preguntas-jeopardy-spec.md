# Formación de Preguntas — Jeopardy Variant Spec (6c, part 2)

**Status:** Locked, building. New sibling page `interactive/preguntas-jeopardy.html`. Reuses the forward quiz's entire store / grading / dashboard / Drive plumbing.
**Note:** Dimension-B *targeting* (6c part 1) is deliberately deferred until 6b has live data to judge against — not in this build.

## Locked decisions
- **Separate page**, `interactive/preguntas-jeopardy.html`. Built by copying `preguntas-dinamica.html` and swapping only the quiz-type-specific parts.
- **Shared store**: same `Spanish Learning/formacion-preguntas-weakness.json`, same `STORE_REV = 2`, same 11 Dimension-A buckets, same `errorsByType` tally. Both pages read/write one weakness profile, so practice in either improves the other's Enfoque targeting.
- **Pure Spanish prompt** — no English gloss. The marked answer is the whole stimulus.
- **Reused verbatim**: Drive plumbing, `seedStore`/`migrateStore`, dashboard + reset, password gate, `callClaude`, `pickCategories`/`pickWeighted`/`enfoqueAvailable` + the General/Enfoque toggle, scoring, `recordVerdict`/`updateStore`, and the grader's `{verdict, feedback, dimA, errorType}` contract (so 6b capture comes along for free).

## The form
Learner sees a Spanish declarative answer with ONE element marked; writes the question that elicits exactly that element.
> Voy a la playa **el sábado**.  →  ¿Cuándo vas a la playa?

## Item shape (generation)
Client dictates 6 categories via `pickCategories()` (uniform General / weakness-weighted Enfoque) and overwrites `dimA` authoritatively after generation — identical to the forward quiz, so coverage stays even and Enfoque works.

```json
{ "id": 1,
  "answer": "Mi hermana vive en [[Guadalajara]].",   // exactly one [[...]] marks the queried element
  "dimA": "lugar",
  "ref": "¿Dónde vive tu hermana?",
  "vars": ["¿En qué ciudad vive tu hermana?"] }
```

- **Bracket markers** (`[[...]]`) instead of substring matching — robust to highlight, trivial to validate.
- **Validation** (`validateItems`): exactly one well-formed `[[...]]` with non-empty content; `ref` contains `¿` and `?`; `dimA` in the valid set; `vars` is an array. Bad item → round rejected (same "didn't return 6 valid items" path as the forward quiz).

## Rendering
- Prompt screen: the answer with the marked element underlined (`before <u>target</u> after`), then "Escribe la pregunta cuya respuesta es la parte subrayada." + input. **No category chip on the prompt screen** — showing it would give away the interrogative. The `dimA` chip appears only on the verdict screen (as in the forward quiz).
- Fast-path: normalized student question matches `ref` or a `var` → `correcto`, no API call.

## Grading
Grader receives `{answer (with [[...]]), target, dimA, ref, vars, studentQuestion}`. Same tolerance rules as the forward quiz (ignore caps / non-interrogative accents / typos / tú-usted / meaning-preserving variation; the learner need not echo the rest of the sentence). Adds one Jeopardy-specific failure: a question that targets the **wrong element** → `incorrecto` (`wrong_interrogative`). Returns the same JSON shape, so storage is unchanged.

## Nav wiring (to finish the project)
- Index entry under *Entrenamiento Independiente*, alongside the forward quiz.
- Optional cross-link between the two quiz pages.

## Out of scope (end-of-project tweak pass)
Live vetting of 6a/6b/Jeopardy together; Dimension-B targeting; any difficulty tuning, hint toggle, or copy polish.
