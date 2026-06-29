# Mi Proyecto Español — Spec: *Ser y Estar* (página de gramática)

**Type:** Single-topic reference page (info/grammar only)
**Location:** `topics/ser-y-estar.html`
**Scaffold authority:** inherits `single-topic-page-spec.md` in full (fonts, palette, favicon, back-nav, NOTA layer, neutral-voice TTS, rate bar, emoji policy, responsive rules, self-check). This document specifies *only* what is unique to this topic: the content architecture, the example sets, the NOTA plan, the contrast device, and what is shelved.
**Status:** DRAFT for Daniel's sign-off. No build until decisions in §8 are locked.

---

## 1. Thesis (the spine of the whole page)

The page runs on **one engine, not four domains: clasificar vs. situar.**

- **SER classifies.** It says what category a thing belongs to — what it *is*. Nationality, profession, material, and **character traits** are all classification.
- **ESTAR situates.** It places a thing in a **condition or a position** — what state it is *in*, read against a norm or an expectation.

Everything the textbooks present as separate "uses" is this one contrast pointed at a different noun. The page's job is to make the reader *derive* the four textbook boxes from the single engine, so they stop memorizing domains:

| Textbook "domain" | Same engine, restated |
|---|---|
| Description | a **trait** (classify → ser) vs. a **condition** (state → estar) |
| Location | an event **occurs** (ser ≈ *suceder/tener lugar*) vs. an object **sits in a position** (estar ≈ *ubicarse*) |
| Passive voice | the **action/process + agent** (ser + participio) vs. the **resulting state** (estar + participio) |
| Impersonal opinion | judging **the kind of situation** (*es bueno que*) vs. assessing **how it stands** (*está bien que*) |

**Hard rule the page must kill on contact:** the "permanent vs. temporary" heuristic. It is the exact thing that misled the *fui terca* reading. Temporariness is carried by the **tense**, not by the verb. That correction is stated in §2-Section 1 and reinforced in Section 2.

---

## 2. Section architecture (single long page, anchored nav)

Six content sections, engine first, culture as the capstone. Each is a `.grammar-card` (or contrast-card variant per §3). Section order is the teaching order.

### Section 1 — *El motor: clasificar vs. situar*
The master reframe. Establishes classify-vs-situate, kills permanent/temporary, and previews the "four coats, one engine" table above as the organizing promise of the page.
- **Anchor pair:** *Es nervioso* (an anxious **type**) / *Está nervioso* (nervous **right now**).
- Heaviest NOTA on the page sits here (NOTA-A, see §4).

### Section 2 — *Personas y cosas: rasgo vs. estado*
The engine applied to people and things. This is where the learner meets trait adjectives and would otherwise form the wrong pattern, so the negative-trait correction lives here.
- **Minimal pairs:**
  - *Es gordo* / *Está gordo* — the "he's a heavy guy" classification vs. the "he's gotten heavy / looks heavier than I expected" state-against-a-norm reading.
  - *Es callada* / *Está callada* — reserved by character vs. unusually quiet today.
  - *Es nervioso* / *Está nervioso* — reprised from §1 as the clean template.
- ***Fui terca*** gets its own micro-treatment: ser + **pretérito** = "on that one bounded occasion I behaved stubbornly," not "I was permanently stubborn." The one-time reading comes from the preterite; you do **not** switch to estar to get it. (Teacher's original *Ayer fui terca porque no quise usar el inodoro* is Rioplatense-flavored; page uses a neutral example and marks the teacher's as a `data-region="rioplatense"` aside, not a focus.)
- **NOTA-B (Daniel's observation):** *¿Por qué parece que los rasgos negativos prefieren SER?* — see §4. This is the explicit note he asked for.

### Section 3 — *Posición vs. ocurrencia: dónde "está" y dónde "es"*
The location split, reframed as object-vs-event so it stops being an exception to memorize.
- **Minimal pairs:**
  - *Mi casa está en la esquina* (object → position) / *La fiesta es en mi casa* (event → occurrence). Same house, two verbs, because one is a thing and one is a happening.
  - *El profesor está en el aula 3* (person → position) / *El examen es en el aula 3* (event → occurrence).
- NOTA-C (short): events "happen" → ser ≈ *suceder / tener lugar / celebrarse*; objects and people "sit" → estar ≈ *ubicarse / encontrarse*. The one time ser marks "where" is when it isn't really location — it's an event.

### Section 4 — *Pasiva y estado resultante: «fue construido» vs. «está construido»*
The participle split, and the home of the *se cansó / está cansado* question. Built on one pipeline:

**acción → suceso → estado resultante**
*cansarse* (verb) → *se cansó* (the bounded event, pretérito) → *está cansado* (the state that remains).

- **Minimal pair:** *El edificio fue construido en 1950 (por un arquitecto famoso)* — passive, process + agent, **ser** — vs. *El edificio está construido desde 1950* — resulting state, **estar**.
- **Pipeline trio (straight from the teacher's PDF):** *se cansó → está cansado*; *se vistió → está vestido*; *se murió → está muerto*.
- **NOTA-D (the over-extension fix):** the rule is **not** "participle → estar." It's "**resultant state** → estar." `ser + participio` is the *other* participle job — the **passive** (an event with an agent). And participle-shaped **traits classify people**, so they stay ser: *ser educado, ser considerado, ser callado*. This directly repairs the "I extrapolated participle→estar to everything" misread.

### Section 5 — *Pares que cambian de sentido*
Where both verbs are grammatical and the engine itself outputs **two different words.** Pure contrast table (§3 device), no prose needed beyond a one-line header.
- **Core set (proposed):** *ser/estar listo* (clever / ready) · *aburrido* (boring / bored) · *rico* (rich / tasty) · *orgulloso* (arrogant / proud of) · *malo* (evil / sick) · *vivo* (sharp / alive).
- **Optional extended set** (only if you want it richer): *bueno* (good person / tasty-attractive — register flag) · *verde* (inexperienced / unripe) · *despierto* (sharp / awake).
- This section is the natural seam to the *orgulloso* item your teacher flagged (ser = arrogant; estar orgulloso de un logro = the positive "proud of").

### Section 6 — *La capa cultural: cuando la regla permite pero el uso manda*
The capstone and the bridge to the shelved vocab section. The grammar engine *permits* both verbs for these, but real usage is locked and the meaning is culturally charged. This is where reading fails the learner.
- ***ambicioso*** — the headline case. Engine permits *estar ambicioso*; nobody says it. For a **person** it defaults to **ser** and means **grasping/greedy**, not "aspirational" (it softens for **things**: *un proyecto ambicioso* is neutral-positive). A false friend of *connotation*, not of grammar.
- **Connotation false friends on the same list:** *educado* = well-mannered (not "educated"); *sensible* = sensitive (not "sensible").
- **The *tener* work-around:** good judgment is a stable property, not a mood, so *estar sensato* is avoided and natives route to ***tener sentido común***. (Same instinct behind *tener valor/coraje*, *tener miedo* on the teacher's sheet.)
- **Register, not grammar:** *viejo* vs. *mayor* — *el hombre viejo* lands blunt-to-rude; *una persona mayor* is the respectful form; *mis viejos* swings affectionate for one's parents. Pure cultural usage, no ser/estar involved.
- NOTA-E (capstone): names the **two-axis split** explicitly — ser/estar is a rule-governed engine (Sections 1–5); connotation/register is a separate cultural layer where the real traps live — and points forward to the vocab section as "where we'll drill the locked words."

---

## 3. Core visual device — contrast pairs

The page is almost entirely minimal pairs, so the repeating unit is a **two-column contrast row: SER side | ESTAR side, with the meaning-delta called out.** Build this on the **existing `.decision-row` pattern** from the scaffold (two cells + center arrow on desktop, stacked with a left-accent border on mobile) — **no new CSS architecture**, just relabeled columns (SER / ESTAR) and a meaning-delta line beneath each pair. Each side carries its own Spanish example sentence (DM Serif Display) + short English `.example-en` gloss + 🔊 button, per scaffold.

If on build this proves too cramped for the longer examples (Section 4's passive pair especially), fall back to stacked `.grammar-card` example rows — but try the two-column contrast first, since the side-by-side *is* the pedagogy.

**This is the one place the spec leans on an existing pattern in a new way; flagged for sign-off in §8.**

---

## 4. NOTA plan (English layer — propose-before-drafting, per scaffold §2.2)

Five NOTAs proposed; prose not yet written, pending your nod on coverage and placement.

- **NOTA-A · Section 1 — "Drop permanent vs. temporary."** The heaviest block. Introduces classify-vs-situate and explains why the permanent/temporary shortcut breaks (with *fui terca* as the worked example). Several paragraphs.
- **NOTA-B · Section 2 — "¿Por qué parece que los rasgos negativos prefieren SER?"** *Daniel's requested note.* The pattern he spotted is real but the cause is one level down: **evaluative character labels are classifications, and classifications take ser regardless of polarity** — *cruel, egoísta, tacaño* but equally *generoso, leal, honesto*. What he noticed is a side-effect: the adjectives that genuinely admit estar are the **mood-ish** ones (*alegre, tranquilo, nervioso, orgulloso-de-algo*), and that set happens to skew neutral/positive — so *estar cruel hoy* sounds odd where *estás muy tranquilo hoy* doesn't. The negativity didn't pull ser; classification did, and the estar-capable set just isn't where the nasty traits live. ~2 paragraphs.
- **NOTA-C · Section 3 — events vs. objects** (short): the suceder/ubicarse reframe.
- **NOTA-D · Section 4 — the participle fix** (medium): "resultant state → estar," not "participle → estar"; ser+participio = passive; trait-participles classify → ser.
- **NOTA-E · Section 6 — the two-axis capstone** (medium): grammar engine vs. cultural layer, and the hand-off to the future vocab work.

---

## 5. Rioplatense policy (per scaffold)

Grammar and all core examples in **neutral Latin American Spanish**, **neutral-voice TTS only** (no dual-voice JS). The teacher's sheet is distinctly Rioplatense (*terca/inodoro*, *cagón*, *ciclotímico*, *jodido*); any example drawn from it that carries regional flavor gets `data-region="rioplatense"` as a textual flag and a light "así lo diría tu profe rioplatense" framing — **present but never the focus**, exactly as on prior pages. No lunfardo in the grammar spine.

---

## 6. Shelved — explicitly NOT in this build

These are deferred to a later vocab/práctica phase and are out of scope for this spec:
- **The 50-most-common-personality-adjectives list** (the teacher's table / `50_adjetivos` PDF) — becomes the backbone of a separate **vocab section**, not this grammar page.
- **Quizzes** of any kind (ser/estar drills, connotation traps, contrast-pair recall).
- Any **API-backed** feature (this is a static single-topic page; no `/api/claude`).

This build is the **info/grammar reference only.** Section 6 *names* the cultural layer and points at the vocab work to come, but does not host the word list or any drills.

---

## 7. Scaffold inheritance checklist (nothing re-specified here)

Taken verbatim from `single-topic-page-spec.md`: one self-contained HTML file, inline CSS/JS, no frameworks, no API; DM Serif Display + Outfit; navy palette + one accent trio; favicon block; `← Volver al menú` → `../index.html`; Spanish-primary chrome with English NOTA layer; one rate bar near top; neutral-voice TTS; 600px responsive breakpoint; emoji policy (🔊 ⚡ ✕ only); full §19 self-check before delivery.

---

## 8. Decisions to confirm before build

1. **Section 5 pair set** — ship the **core six** (*listo, aburrido, rico, orgulloso, malo, vivo*), or pull in the extended set (*bueno, verde, despierto*)?
2. **Contrast device** — approve building the SER|ESTAR contrast row on the existing `.decision-row` pattern (§3)? It's the one place I'm reusing a scaffold pattern in a new role.
3. **Background pattern + accent trio** — pick from the scaffold's options, or want me to propose a pairing that reads distinct from Condicionales/Rasgos?
4. **Images** — propose **none** for v1 (the topic is carried by contrast pairs, and the teacher's PDF cartoons add little). The one candidate worth your call: a small schematic of the **acción → suceso → estado** pipeline in Section 4. Include it, or ship text-only and add later?
5. **Anchored section nav** — six sections is enough to warrant in-page jump links at the top. In, or keep it a clean scroll like the shorter single-topic pages?
