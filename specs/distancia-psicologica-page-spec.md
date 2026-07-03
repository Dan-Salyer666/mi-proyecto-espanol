# Mi Proyecto Español — Spec: *La distancia psicológica en el verbo* (página de gramática)

**Type:** Single-topic reference page (info/grammar only)
**Location (proposed):** `topics/distancia-y-atenuacion.html` — slug flagged for confirmation in §9
**Scaffold authority:** inherits `single-topic-page-spec.md` in full (fonts, palette, favicon, back-nav, English NOTA layer, neutral-voice TTS, rate bar, emoji policy, responsive rules, self-check). This document specifies *only* what is unique to this topic: the content architecture, the example sets, the NOTA plan, the contrast device, and what is shelved / cross-linked.
**Status:** DRAFT for later. No build until decisions in §9 are locked. Filed for the queue, not for this session.
**Origin:** Daniel hit *¿Tú por casualidad no guardarás una grabación de aquellos tiempos?* in a Comprensión Lectora story and the future tense there threw him. Gemini framed the broader phenomenon as "psychological distancing." That framing is sound and is the spine of this page.

---

## 1. Thesis (the spine of the whole page)

The page runs on **one idea: the present indicative is the deictic center, and every softening, hedging, or conjecturing move is a step away from it.**

- The **present indicative** is *here, now, real, certain*. It asserts. It is the most direct thing a Spanish verb can do.
- To be polite, hesitant, speculative, or emotional, the speaker **steps back from that center** — and Spanish maps that step onto the **verb's tense and mood**, not onto a separate politeness vocabulary.
- The step happens along what is, metaphorically, **one axis of remoteness** that Spanish builds from two real ones:
  - **The time axis** — pushing the verb into the **future** (project rather than assert) or the **past** (frame the wish as belonging to a moment that isn't *now*).
  - **The reality axis** — moving from **indicative → condicional → subjuntivo**, i.e., from "this is so" toward "this is hypothetical / unreal."

Temporal and modal remoteness both stand in for **social and epistemic remoteness.** Distance in time or reality *is* distance in the conversation: it gives the listener room, removes pressure, and hedges the speaker's commitment.

| The blunt center | The step back | What the step buys |
|---|---|---|
| *Quiero una mesa.* | *Quisiera una mesa.* | deference (past + irrealis) |
| *¿Puedes traerme agua?* | *¿Podrías traerme agua?* | a request framed as hypothetical |
| *¿Tienes una grabación?* | *¿No tendrás una grabación?* | conjecture removes the demand |
| *Son las cinco.* | *Serán las cinco.* | "must be" — a guess, not a claim |
| *Viene.* | *Dudo que venga.* | the speaker refuses to assert it |

**Hard point the page must land:** these are **not five unrelated "uses" to memorize.** They are one move — *retreat from the present indicative* — pointed in different directions. The reader should leave able to *derive* each form from the central metaphor.

---

## 2. Section architecture (single long page, anchored nav)

Five content sections. The thesis first, the two conjecture forms as a matched pair, the three courtesy forms as an escalating gradient, and the subjunctive as the capstone (the reality axis in its general form). Each is a `.grammar-card` (or the contrast-row variant per §3). Section order is the teaching order. **Every section header carries its RAE label**, per Daniel's request.

### Section 1 — *El centro y los dos ejes*
The master reframe. Establishes the present indicative as the center, introduces the time axis and the reality axis, and previews the table above as the organizing promise of the page. Heaviest NOTA on the page sits here (NOTA-A).
- **Anchor contrast:** *Quiero* (center) → *Querría* / *Quisiera* (stepped back), held up as the whole page in miniature.

### Section 2 — *El futuro de conjetura (futuro de probabilidad)*
**RAE label:** *futuro de conjetura* / *futuro de probabilidad*. The form that threw Daniel, and the reason it threw him: it does **two different jobs**, and the page splits them cleanly.

- **Job A — conjetura sobre el presente** (the common one): the future expresses a *guess about a current situation*, ≈ English "must be / probably / I wonder."
  - *Serán las cinco.* (It must be five.)
  - *Tendrá unos cuarenta años.* (He's probably about forty.)
  - *¿Dónde estará?* (Where can he be? / I wonder where he is.)
  - In narrative this is everywhere, often voicing a character's inner guessing — **this is the use most likely to have ambushed the reading**, not the request-softener.
- **Job B — atenuar una pregunta o petición** (the inquiry-softener): the future projects an inquiry into "do you happen to…," removing the demand. This is the cornerstone.
  - **Cornerstone (real, from the story):** *¿Tú por casualidad no guardarás una grabación de aquellos tiempos?* — "You wouldn't by any chance have kept a recording from back then, would you?"
  - The softening is **stacked**: *no* + *por casualidad* + future of conjecture. The negation and *por casualidad* pre-concede a "no," so the listener feels no pressure; the future turns the inquiry into a guess rather than a demand.
- **Mechanic-isolating minimal pair (verb held constant):** *¿Tienes una grabación?* → *¿No tendrás una grabación?* Same verb, only the tense moves — this is the teaching pair, kept beside the cornerstone so the reader sees the bare shift before the fully-hedged literary version.
- NOTA-B sits here (the two directions).

> **Accuracy note for the builder:** the original `.md` example switched verbs (*¿Tienes…?* → *¿Guardarás…?*), which hid the mechanic. Keep one verb constant in the *teaching* pair (*tener*), and use the *guardar* sentence as the *authentic* anchor — both, not one or the other.

### Section 3 — *El condicional de conjetura (condicional de probabilidad)*
**RAE label:** *condicional de conjetura* / *condicional de probabilidad*. The **past-tense twin** of Section 2, and the piece that completes the symmetry the `.md`'s "master pattern" only gestured at.
- **Symmetry, stated plainly:** future = a guess about the **present**; conditional = a guess about the **past**.
  - *Serían las cinco cuando llegó.* (It must have been five when he arrived.)
  - *Tendría unos cuarenta años entonces.* (He must have been about forty back then.)
  - *Estaría cansado, por eso no vino.* (He was probably tired — that's why he didn't come.)
- Short section. NOTA-C is one tight paragraph pairing it against Section 2.

### Section 4 — *Las tres cortesías: quería · querría · quisiera*
The page's centerpiece. Three distinct RAE-labeled forms that all soften a request by stepping back — presented **as one escalating gradient** so the reader feels the deference increase rather than memorizing three rules.

- **4a — *imperfecto de cortesía* (de modestia).** Push a present wish into the past so it stops pressing on *now*.
  - *Quería pedirte un favor.* (I wanted to ask you a favor.)
  - *¿Qué deseaba?* — the service-counter classic ("What would you like?").
  - *Venía a preguntarte si…* (I was coming to ask you whether…)
- **4b — *condicional de cortesía*.** Frame the request as hypothetical — what the listener *would* do in an imagined scenario.
  - *¿Podría traerme agua?* (Could you bring me water?)
  - *Querría pedirle un favor.* / *Desearía hablar con el gerente.*
- **4c — *imperfecto de subjuntivo de cortesía*.** Past **and** irrealis at once — maximum deference. Lexicalized on a small set: *quisiera*, *pudiera*, *debiera*.
  - *Quisiera una mesa para dos.* (I would like a table for two.)
  - *¿Pudiera usted ayudarme?* / *Debiera usted descansar.*
- **Featured device — the deference gradient** (see §3): one request shown at four distances, baseline included:
  *Quiero una mesa* → *Quería una mesa* → *Querría una mesa* → *Quisiera una mesa*
  (direct → softened → hypothetical → deferential). The same sentence, escalating; the whole section's payoff in one row.
- NOTA-D explains the gradient (ordering, register, overlap, regional notes).

### Section 5 — *El subjuntivo: el eje de la irrealidad*
**RAE frame:** the **subjuntivo** as the grammatical pole of *irrealidad*. Included **for completeness, not exhaustively** — per Daniel, repetition with the future Subjunctive hub is welcome, and this page benefits from naming the reality axis in full. Cross-links to the Subjunctive hub for the deep treatment.
- The reframe: the courtesy forms in Sections 2–4 are **lexicalized corners of this same irrealis logic.** The subjunctive is the general engine; *quisiera* and friends are where the engine has frozen into set polite formulas.
- **Anchor contrast (reality vs. unreality):**
  - *Es seguro que **viene**.* (indicative — asserted fact) / *Dudo que **venga**.* (subjunctive — the speaker won't assert it).
  - *Sé que **está** aquí.* / *No creo que **esté** aquí.*
  - *Es verdad que **lo sabe**.* / *Espero que **lo sepa**.* (emotion/desire, not assertion).
- The point the section makes — and then hands off: the subjunctive distances from **objective reality** (doubt, emotion, desire, the unreal), exactly as the tense-shifts distance from the **immediate present**. Same retreat, the other axis.
- NOTA-E is the capstone: names the two axes together, ties all five sections back to the one metaphor, and points to the Subjunctive hub. Explicitly **does not** attempt the full subjunctive trigger inventory.

---

## 3. Core visual device — the *Directo | Distanciado* contrast row

The page is built from minimal pairs, so the repeating unit is a **two-column contrast row: Directo (present indicative) | Distanciado (the stepped-back form), with a meaning-delta line beneath.** This mirrors the source `.md`'s own Direct/Distanced layout and is the natural pedagogy.

Build it on the **existing `.decision-row` pattern** from the scaffold (two cells + center arrow on desktop, stacked with a left-accent border on mobile) — **no new CSS architecture**, just relabeled columns (Directo / Distanciado) and the delta line. Each side carries its own Spanish example (DM Serif Display) + short English `.example-en` gloss + 🔊 button, per scaffold.

**One bespoke element — the deference gradient (Section 4):** a single horizontal four-step row (*Quiero → Quería → Querría → Quisiera*) with increasing visual "distance" left to right (e.g., progressive indent, or a graded accent intensity across the trio variables). This is the one place worth a small custom layout; flagged for sign-off in §9. If it proves fiddly on mobile, fall back to a stacked four-row mini-table — but try the horizontal escalation first, since the *increasing distance* is the point.

---

## 4. NOTA plan (English layer — propose-before-drafting, per scaffold §2.2)

Five NOTAs proposed; prose not yet written, pending Daniel's nod on coverage and placement.

- **NOTA-A · Section 1 — "Two axes, one retreat."** The heaviest block. Lays out the distancing metaphor: temporal remoteness (future/past) and modal remoteness (indicative→condicional→subjuntivo) both stand in for social/epistemic distance. The cognitive-linguistics "remoteness" framing, in plain English. Several paragraphs.
- **NOTA-B · Section 2 — "The future does two jobs."** *The note that answers what threw Daniel.* Why one form covers both *guess about the present* (*Serán las cinco*) and *softened inquiry* (*¿No tendrás…?*), and how to tell which is in play from context. Unpacks the cornerstone's stacked hedge (*no* + *por casualidad* + future) explicitly. ~2 paragraphs.
- **NOTA-C · Section 3 — future ↔ conditional symmetry** (short): present-guess vs. past-guess, stated as a clean matched pair.
- **NOTA-D · Section 4 — the *quería / querría / quisiera* gradient** (medium): the deference ordering (most casual → most deferential), the substantial overlap (all three render "I'd like"), and register/regional notes — *quería* is the everyday default at counters; *quisiera* reads more formal/written; the imperfect-of-courtesy is pan-Hispanic and not regionally marked.
- **NOTA-E · Section 5 — the two-axis capstone** (medium): names the time axis and the reality axis together, frames the courtesy forms as lexicalized borrowings from the subjunctive's irrealis logic, and hands off to the Subjunctive hub for the full mood treatment. States plainly that this page is the *distance* story, not the *complete subjunctive* story.

---

## 5. Cross-linking (per Daniel — repetition is welcome)

- **Subjunctive hub (Tier 1 roadmap):** Section 5 and NOTA-E link forward to it. This page gives a self-contained *completeness* pass on the subjunctive as the reality axis; the hub owns the exhaustive trigger inventory. Daniel has explicitly said overlapping treatments are fine — they reinforce, and the angle here (subjunctive *as distance*) differs from a standard trigger-list approach, so the repetition earns its place.
- **Optional back-links** from `desde-hace-y-construcciones-de-tiempo.html` (shares the "tense as more than time" theme) — flagged as a nice-to-have, not required for v1.

---

## 6. Rioplatense policy (per scaffold)

Grammar and all core examples in **neutral Latin American Spanish**, **neutral-voice TTS only** (no dual-voice JS). All address forms use *tú* / *usted* — **no voseo** anywhere (no *querés*, no *vos*). The cornerstone sentence's *tú por casualidad* is neutral and stays as-is. If any regionally-flavored example is ever added, it gets `data-region` flagging and stays out of the spine, per prior pages — but none is currently planned.

---

## 7. Accuracy ledger (corrections folded in from the source `.md`)

For the builder — what changed from Gemini's draft and why:

1. **Section 1 of the `.md` (future) is split into two jobs** (conjecture-about-present vs. inquiry-softener). The draft conflated them; the present-conjecture use is almost certainly what disrupted Daniel's reading, and it deserves top billing.
2. **The verb is held constant in the teaching pair** (*tener*: *¿Tienes? → ¿No tendrás?*). The draft's *¿Tienes? → ¿Guardarás?* switched verbs and hid the mechanic. The *guardar* sentence survives as the authentic anchor, not as the mechanic demo.
3. **The conditional of probability is added** (Section 3) — absent from the draft, and the piece that actually completes the draft's own "same axis" claim.
4. **The three courtesy forms are unified into a gradient** rather than three parallel sections, with the *quería/querría/quisiera* escalation as the visual payoff.
5. **RAE labels are attached to every section** (*futuro de conjetura*, *condicional de conjetura*, *imperfecto de cortesía*, *condicional de cortesía*, *imperfecto de subjuntivo de cortesía*), so the page reads as a real reference rather than a coined-term explainer. "Psychological distancing" remains the umbrella hook for the NOTA layer only.
6. **The subjunctive section is reframed** from "a fifth politeness device" to "the general irrealis engine the courtesy forms borrow from" — and explicitly scoped to completeness, with the hub owning depth.

---

## 8. Shelved — explicitly NOT in this build

- **Quizzes / drills** of any kind (conjecture-vs-courtesy recognition, gradient-ordering, etc.).
- Any **API-backed** feature — this is a static single-topic page; no `/api/claude`.
- **The exhaustive subjunctive trigger inventory** — that is the Subjunctive hub's job. Section 5 names the axis and stops.
- **Optative / desiderative "ojalá," concessive "aunque," and the full conditional-sentence (si-clause) system** — adjacent irrealis territory, but out of scope here to keep the page on the *distance* thesis. Candidates for their own pages later.

---

## 9. Decisions to confirm before build

1. **Title / slug.** "Psychological distancing" is the English NOTA hook, but the Spanish page title needs a real label. There's no single RAE term for the whole phenomenon; the umbrella candidates are *atenuación* (the recognized pragmatics term for hedging) and *conjetura*. Proposed titles — pick or counter:
   - *La distancia en el verbo: conjetura y cortesía*
   - *Atenuación y conjetura: alejarse del presente*
   - *Tiempo y modo a distancia*
   Slug follows the choice (proposed default: `distancia-y-atenuacion.html`).
2. **Section count.** Ship the **five-section** structure (thesis · futuro de conjetura · condicional de conjetura · las tres cortesías · subjuntivo), or split "las tres cortesías" back into three separate sections to mirror the source `.md` 1:1? (Recommendation: keep the gradient merge — the escalation *is* the lesson.)
3. **Deference gradient device** (§3) — approve the bespoke horizontal four-step *Quiero → Quería → Querría → Quisiera* row, or keep everything on the plain `.decision-row` pattern?
4. **Subjunctive depth** — confirm "completeness, not exhaustive + cross-link to the hub" is the right scope, versus a fuller in-page treatment.
5. **Background pattern + accent trio** — pick from the scaffold options, or have the builder propose a pairing that reads distinct from Ser/Estar, Condicionales, and Desde-Hace?
6. **Anchored section nav** — five sections is borderline for in-page jump links. In, or keep a clean scroll like the shorter single-topic pages?
7. **Images** — recommendation: **none** for v1; the topic is carried by contrast pairs and the gradient. One candidate worth Daniel's call: a small schematic of the **target / two-axis** model from Section 1 (center = present indicative, arrows stepping outward along time and reality). Include as a single SVG-style figure, or ship text-only and add later?

---

## 10. Scaffold inheritance checklist (nothing re-specified here)

Taken verbatim from `single-topic-page-spec.md`: one self-contained HTML file, inline CSS/JS, no frameworks, no API; DM Serif Display + Outfit; navy palette + one accent trio; favicon block; `← Volver al menú` → `../index.html`; Spanish-primary chrome with English NOTA layer; one rate bar near top; neutral-voice TTS (no voseo, no `es-AR`/`es-UY`); 600px responsive breakpoint; emoji policy (🔊 ⚡ ✕ only); full self-check before delivery.
