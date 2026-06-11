# Formación de Preguntas — App Spec

**Status:** Committed spec. Build in phases, one observable change per deploy, each phase tested before the next.
**Reference page (static):** `topics/formacion-de-preguntas.html` (+ optional subpage, §3)
**Quiz app (interactive):** `interactive/preguntas.html` (working name)
**Storage:** Static quizzes = embedded fixed sets, no Drive. Dynamic quiz weakness store = Google Drive (`drive.file`, lazy, `contentRev` migration) + device `localStorage` for Sin Ver pools.
**API:** `/api/claude` for generation; AI-grading of typed answers via the same function. Sonnet builds the static sets offline; Sonnet does generation/grading at runtime unless we promote a phase to Opus.
**Dialect:** Neutral Latin American Spanish throughout (no Spain *distinción*, no voseo). Grading accepts both *tú* and *usted* unless the prompt sets a register cue.

---

## 1. Purpose

Fix a specific, named gap: at B2 reading level, **interaction stalls — and asking questions stalls worst**, because learners spend their first years answering questions, almost never forming them. This app trains question *production* directly.

Two halves, paired like *quiz-genero* ↔ *genero-de-los-sustantivos*:

1. **Review front end** — a hybrid reference (form backbone + functional phrasebook + fixed high-frequency frames), built to the single-topic-page conventions.
2. **Quizzes** — a **static** half (fixed sets, no auth, no API) and a **dynamic** half (API-generated, AI-graded, with an adaptive weakness store).

The dynamic half is where the real training lives: it generates English questions, you produce the Spanish, it grades and remembers *what kind* of question you miss, and a target mode steers future questions toward those holes.

---

## 2. The taxonomy (the backbone of everything)

This is the hardest design choice and it drives the review structure, the static sets, and the scoring. Every question item carries **two tags**:

### 2.1 Dimension A — Functional topic (primary, learner-facing, scored from day one)

The "what am I trying to find out" axis. These are the **scoring buckets** for the weakness store.

| Tag | Covers | Typical forms |
|---|---|---|
| `identidad` | people, who, whose | *¿quién? ¿de quién? ¿con quién?* |
| `lugar` | location & direction | *¿dónde? ¿adónde? ¿de dónde?* |
| `tiempo` | point in time | *¿cuándo? ¿qué hora? ¿a qué hora? ¿desde cuándo?* |
| `frecuencia` | frequency & duration | *¿cada cuánto? ¿con qué frecuencia? ¿cuánto tiempo?* |
| `cantidad` | quantity, age, price | *¿cuánto/a/os/as? ¿cuántos años? ¿cuánto cuesta?* |
| `manera` | manner & means | *¿cómo? ¿en qué? ¿cómo se dice?* |
| `razon` | reason & purpose | *¿por qué? ¿para qué?* |
| `eleccion` | selection from a set | *¿cuál(es)? ¿qué + sustantivo?* |
| `descripcion` | definition & description | *¿qué es? ¿cómo es? ¿de qué color?* |
| `si_no` | yes/no & confirmation | intonation only, *¿verdad? ¿no? ¿cierto?* |
| `formulas` | fixed social frames | *¿qué tal? ¿en qué puedo ayudarle? ¿qué te parece?* |

### 2.2 Dimension B — Grammatical feature / trap (secondary, added in a later phase)

The "what skill or error is in play" axis. This is what makes targeting *useful* rather than blunt — it cuts across Dimension A. *¿De dónde eres?* is `lugar` **and** `prep_antepuesta`; targeting only by topic would miss that the real weakness is preposition fronting, not "location."

| Tag | Point |
|---|---|
| `prep_antepuesta` | preposition fronts the question word; **no stranding** (*¿De dónde eres?* not *¿Dónde eres de?*) |
| `que_vs_cual` | *qué* (open / + noun / definition) vs *cuál* (selection / + *ser*) |
| `concordancia_cuanto` | *cuánto* is the only interrogative that agrees in gender + number |
| `tener_edad` | age uses *tener*, not "to be" (*¿Cuántos años tienes?*) |
| `ser_vs_estar` | *¿cómo es?* (description) vs *¿cómo está?* (state) |
| `entonacion_si_no` | yes/no by intonation; **no do-support** |
| `tilde_forma` | every interrogative carries the written accent (held even in indirect questions) |
| `colocacion_verbo_prep` | the question form is bound to a verb+preposition (*pensar en* → *¿en qué?*, *soñar con* → *¿con qué?*, *depender de* → *¿de qué?*, *ayudar* → *¿en qué puedo ayudarle?*) |

**Staging:** Dimension A is scored from the first dynamic phase. Dimension B is captured by the grader and surfaced in targeting **later** (§ phases). Don't block v1 on the full two-axis model.

---

## 3. Review front end (the "textbook")

Built to `single-topic-page-spec.md`: Spanish-primary chrome, English **NOTA\*** layer for mechanics, neutral-voice TTS on every example, dark-navy palette, one accent trio, one background pattern. Lives in `/topics/`, links to the quiz app and back to the menu.

Hybrid content, three layers (confirmed: Daniel wants both form and function present):

- **Form backbone** — one section per interrogative (*qué, cuál, quién, cómo, cuándo, dónde, cuánto, por qué/para qué*), each with its grammar: what it asks, agreement (the *cuánto* point gets its own NOTA), the *qué/cuál* split (NOTA), *por qué / porque / porqué / por que* (NOTA), and the **accent-as-question-marker** rule across direct and indirect questions (NOTA).
- **Functional phrasebook** — organized by Dimension-A topic; the "reach for the right question in the moment" layer.
- **High-frequency frames** — the chunks learned whole, especially where the literal grammar diverges from English: *¿Cuántos años tienes?* (tener), *¿Qué hora es?* / *¿A qué hora…?*, *¿Cómo se dice…?*, *¿De dónde eres?*, *¿Cuánto cuesta?*, plus the verb+preposition-bound frames (*¿En qué puedo ayudarle?*, *¿En qué piensas?*, *¿A qué distancia está…?*). A NOTA explains the bound-preposition idea (Dimension B `colocacion_verbo_prep`) here.

**A cross-language NOTA up front** lays out the four big contrasts with English: no do-support, intonation + the opening *¿*, obligatory preposition fronting, verb-before-subject order.

If the three layers run long, split per the single-topic subpage convention (parent = form backbone + frames; subpage = functional phrasebook). Decide at build.

---

## 4. Static quiz 1 — Drag-the-badge cloze (Daniel's preferred mechanic)

Same family as Los Paisajes / género: a fixed embedded set, no Drive, no API at runtime.

- **Item:** a Spanish question with the interrogative removed, English gloss beneath it; drag the correct interrogative **badge** into the blank.
  - *¿\_\_\_\_\_ llega el tren a Madrid?* → **A qué hora** — *"When does the train arrive in Madrid?"*
- **Size:** ~50 items, **built offline by Sonnet**, every item tagged with its Dimension-A (and where clean, Dimension-B) label.
- **Hard constraint — no ambiguous blanks.** The surrounding sentence must force exactly one correct interrogative. Validate offline: each blank has a unique answer given its context (this is the same disambiguation discipline as underlining the queried element). Reject any item that admits two readings.
- This *is* the cloze form of the answer-elicitation idea — you reconstruct the asker's words from the frame.

---

## 5. Static quiz 2 — Trap drills (multiple choice, with a real job)

Plain MC is weak for free production, so it does **not** try to be general question practice. It does the one thing MC is genuinely good at: the **traps** (Dimension B). That answers the "not sure MC works" question — give it a narrow, high-value job.

Three drill types, fixed embedded sets:

- **qué vs cuál** — pick the right one: *¿\_\_\_ es tu nombre?* → *Cuál*.
- **preposition selection** — *¿\_\_\_ quién hablas?* → *Con* / *A* / *De* / *Para*.
- **spot-and-fix-the-error** — show an English-contaminated question, choose the correction: *¿Dónde eres de?* → *¿De dónde eres?*; *¿Qué es tu nombre?* → *¿Cuál es tu nombre?*; *¿Cuánto años tienes?* → *¿Cuántos años tienes?*

---

## 6. Dynamic quiz — API generator + AI grader (the core)

The real testing loop. No fixed set — questions are generated fresh.

### 6.1 Loop

1. App requests **N English questions** (default 10) from `/api/claude`, each tagged with its intended Dimension-A category (and Dimension-B feature where applicable).
2. The English prompts render; you type the Spanish question into a box under each.
3. **Corregir** at the end sends all answers back to `/api/claude` for grading.
4. Score + per-item feedback render; the weakness store updates (§7).

### 6.2 Grader contract (structured JSON, double duty)

The grader both scores **and** tags — its output is what feeds the weakness store. It must accept valid variation (word order, optional subject, *tú/usted* unless a register cue is set) and not false-fail on legitimate alternatives.

```json
{
  "n": 1,
  "english": "What time does the train arrive in Madrid?",
  "yourAnswer": "¿A qué hora llega el tren a Madrid?",
  "correct": true,
  "category": "tiempo",
  "feature": "prep_antepuesta",
  "errorType": null,
  "accepted": "¿A qué hora llega el tren a Madrid?",
  "feedback": "Correct. Note the fronted preposition in a qué hora."
}
```

`errorType` (when wrong) is one of: `wrong_interrogative`, `missing_prep`, `wrong_prep`, `que_cual`, `agreement`, `word_order`, `spelling_accent`, `other` — these map onto Dimension B.

### 6.3 Two modes (both write the store; only one reads it)

- **General mode** — questions are **not** chosen by past performance, but every graded answer updates the store. *"Questions used to determine my performance, not determined by it."*
- **Target mode** — reads the weakness profile and **steers generation** toward weak categories. The generator prompt receives the error-rate profile (e.g. `lugar: 0.70, tiempo: 0.55`) and weights its question mix accordingly.

---

## 7. Weakness store & composite scoring (the adaptive heart)

### 7.1 Model — aggregates, not a quiz log

Per Daniel's design: don't save individual scores; save running aggregates that *form* the dynamic score. For each category, store `{ seen, missed }`. **Error rate = missed / seen.** A reset zeroes it.

```json
{
  "contentRev": 1,
  "updated": "2026-06-09T00:00:00Z",
  "totalAnswered": 0,
  "categories": {
    "lugar":   { "seen": 0, "missed": 0 },
    "tiempo":  { "seen": 0, "missed": 0 }
  },
  "features": {            // populated in a later phase (Dimension B)
    "prep_antepuesta": { "seen": 0, "missed": 0 }
  }
}
```

- Worked example: 10 quizzes × 10 questions = 100 answers; if `lugar` shows `{ seen: 20, missed: 14 }`, location error rate = 70%. That number *is* the location score, exactly as Daniel framed it.
- **Min-sample threshold:** ignore categories with `seen < 5` when ranking weaknesses, so noise doesn't drive targeting.
- **Reset button** zeroes the store (with a confirm step).

### 7.2 Targeting

Target mode ranks categories above the threshold by error rate and feeds the top weak ones (or the full profile) into the generator prompt as weights. As you improve, the profile shifts and the targeting follows.

### 7.3 Persistence

Drive-backed JSON with `contentRev` migration, embedded-seed bootstrap on first connect, `driveRequest()` 401-retry wrapper, batched single write at run end — identical pattern to the género quiz and Comprensión Lectora.

---

## 8. Dialect rule

Neutral Latin American Spanish everywhere. TTS neutral fallback (`es-419 → es-MX → es-US → es-CO → other es-*`, excluding `es-AR`/`es-UY`/`es-ES`). The grader **accepts both *tú* and *usted*** by default and only requires a specific register when the English prompt sets one ("ask your boss…" → *usted*). No voseo accepted or generated.

---

## 9. Phases

| Phase | Scope | Observable result |
|---|---|---|
| **0** | This spec. | Committed. |
| **1** | Review front end (`topics/formacion-de-preguntas.html`), per single-topic-page-spec: cross-language NOTA, form backbone, functional phrasebook, frames. No quiz. | A complete reference page ships and is usable on its own. |
| **2** | Static drag-the-badge cloze (~50 Sonnet-built, uniqueness-validated items). Local, no auth. | A full cloze quiz works start to finish. |
| **3** | Static trap drills (MC): qué/cuál, prepositions, spot-the-error. Local, no auth. | Three trap drills work. |
| **4** | Dynamic quiz, **general mode only**, session-scoped (no Drive yet): generate N English → type Spanish → AI-grade → score + feedback. Proves the generate+grade loop and grader tolerance. | A generated quiz grades correctly end to end. |
| **5** | Drive-backed weakness store (Dimension A): general mode writes `{seen,missed}` per category; weakness dashboard; reset button. | The store accumulates and displays across sessions. |
| **6** | **Target mode** (reads the store to steer generation) + Dimension-B capture/targeting + full answer-elicitation ("Jeopardy") dynamic variant. | Questions adapt to weak areas. |

---

## 10. Open decisions (need Daniel's call before the relevant phase)

1. **Answer-elicitation ("Jeopardy") placement.** Cloze form already lives in Phase 2; the full free-production form (give an answer with the queried element **underlined** → produce the whole question, AI-graded) is slotted in Phase 6. Pull it earlier if it's the priority.
2. **Review front end shape.** Single parent page vs parent + one subpage (form/frames | functional phrasebook), decided by length at build (§3).
3. **Generation/grading model tier.** Sonnet for both, or promote grading to Opus for tolerance/accuracy on free-typed Spanish? (Cost vs. grading quality.)

---

## 11. Locked decisions (settled this session)

1. **Hybrid review** — form backbone **and** functional phrasebook **and** fixed frames all present.
2. **Two-dimension tagging** — Dimension A (functional topic, scored first) + Dimension B (grammatical trap, added later).
3. **Static = two quizzes** — drag-the-badge cloze (general practice) + MC **trap** drills (qué/cuál, prepositions, spot-the-error).
4. **Dynamic = generate English → type Spanish → AI-grade**, with the grader returning **structured JSON that both scores and tags** (double duty feeding the store).
5. **Two dynamic modes** — general (writes only) and target (reads to steer); both update the same store.
6. **Weakness store = running aggregates** `{seen,missed}` per category, not a quiz log; error rate is the score; **reset** zeroes it; min-sample threshold gates targeting.
7. **Drive persistence** reuses the género / Comprensión Lectora pattern (`drive.file`, `contentRev`, seed bootstrap, batched write).
8. **No ambiguity** in the static cloze — each blank forces a unique interrogative, validated offline.
9. **Neutral Latin American Spanish**; grader accepts *tú/usted*, honors register cues, never voseo.
10. **Staged build** — six phases, each shipping standalone value before the next.
11. **Recency handled by reset, not decay** — scoring stays cumulative `missed/seen`; the reset button (§7.1) is the deliberate mechanism for clearing stale failures once you've improved. No EMA / windowing.
12. **Category grain = the 11 Dimension-A buckets** in §2.1, not collapsed.

---

*End of spec. Commit a copy to the project folder alongside the other app specs.*
