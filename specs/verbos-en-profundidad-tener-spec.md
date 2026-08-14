# Mi Proyecto Español — Spec: *tener* (Verbos en Profundidad)

**Type:** Single-verb deep dive — **first child** of the Verbos en Profundidad hub.
**Location:** `topics/verbos-en-profundidad/tener.html`
**Sibling extension:** `topics/verbos-en-profundidad/tener-estructural.html`
**Hub:** `topics/verbos-en-profundidad/verbos-en-profundidad.html` — **ships with this build**
**Scaffold authority:** inherits `single-topic-page-spec.md` in full (fonts, navy palette, favicon block, NOTA\* layer, neutral-only TTS, rate bar, accent trio, background, emoji policy, 600px breakpoint, self-check). This document specifies only what is unique to *tener*.
**Status:** BUILD-READY pending §12. Spanish content draft is a separate deliverable and must be signed off before any HTML.

---

## 1. Thesis

A flat list of *tener* phrases fails because **tener + sustantivo is a construction, not vocabulary.** The noun you pick determines everything downstream: whether there's an article, which quantifier agrees, which preposition follows, whether the imperative is available, whether the preterite/imperfect split carries meaning, and whether a *que*-clause takes subjunctive.

**The page's job: make the frame predictable from the noun's semantic type.** The list is the payload; the grammar is the page.

Title: **Tener: un sistema, no una lista**
Subtitle: *Frases, marcos y patrones de uso*
Overline: `Verbos en Profundidad`

Naming convention this sets for the hub — verb large, thesis line beneath:

> **TENER** — *un sistema, no una lista*
> **PODER** — *una sola potencia, varios blancos*

---

## 2. Folder restructure (this build introduces it)

New directory. **Scope is additive only** — no existing page moves, no existing link is rewritten.

```
topics/verbos-en-profundidad/
    verbos-en-profundidad.html     ← hub
    tener.html
    tener-estructural.html         ← flat sibling, not nested
    (quedar.html, echar.html, poder.html … as built)
```

**Naming rules for all future children:** hyphens, never underscores. Children are named by verb alone — the folder already carries the family name. A verb needing a second page gets a flat sibling `<verb>-<subtopic>.html`, never a subfolder.

### Path table

| From | To | Path |
|---|---|---|
| verb page | assets | `../../assets/…` |
| verb page | hub | `verbos-en-profundidad.html` |
| verb page | main menu | `../../index.html` |
| hub | main menu | `../../index.html` |
| `index.html` | hub | `topics/verbos-en-profundidad/verbos-en-profundidad.html` |
| favicon (all) | — | absolute `/assets/bandera/…`, unchanged |

### Doc amendments required (part of this deliverable)

- `verbos-organizacion-spec.md` §4/§5 — paths updated to the folder model; §17's "one level only" amended to permit **flat sibling extensions** inside a hub folder.
- `index-categorization.md` — Quick Reference block updated; one new `link-item` in Vocab → Verbos, sub-hub count incremented.
- `page-roadmap.md` §7 — the standalone **"Tener: idiomático vs. estructural"** item is **absorbed** into this build as the sibling page. Strike it from the roadmap.

---

## 3. Architecture

Preguntas pattern: sticky TOC + accordion, hybrid open-state.

**Parte I — El sistema** — open by default. It's the argument; collapsing it invites skipping it.
**Parte II — Las familias** — collapsed. Six lookup cards.
**Parte III — Referencia** — open.

### Parte I

**① El motor: *tener* + sustantivo escueto**
Bare noun, no article. *mucha* not *muy* — the quantifier agrees with the noun, which is why English speakers reach for the wrong word. The `el hambre / mucha hambre` gender trap. The intensity ladder: *nada de → algo de → mucha → un hambre de lobo*. Cross-link to gradación e intensidad. Houses **NOTA-A**. Also carries *tener X años* as the archetype no-article case, and the irregular conjugation block (*tengo/tienes*, pretérito fuerte *tuve*, futuro *tendr-*, imperativo *ten*).

**② Las preposiciones**
The frame map, grouped by preposition rather than alphabetically, so the pattern is visible:

| Prep | Phrases |
|---|---|
| `de` | ganas de · vergüenza de · la culpa de · la intención de · la costumbre de · la sensación de · la esperanza de · envidia de · nostalgia de · dolor de (cabeza) |
| `a` | derecho a · miedo a · tendencia a · acceso a · alergia a · manía a · cariño a · pánico a |
| `con` | cuidado con · paciencia con · problemas con · relación con · algo que ver con |
| `en` | confianza en · fe en · interés en · dificultad en |
| `por` | interés por · curiosidad por · prisa por · debilidad por · ilusión por |
| `para` | facilidad para · tiempo para · dificultad para · mano para |

Carries **NOTA-D** (*miedo a* vs *miedo de*, and the dative-doubling family *tenerle miedo/cariño/manía/bronca **a** alguien* that English speakers systematically drop).

**③ El imperativo y el deseo**
The controllability rule — the section that answers the original question.

| Noun type | Imperative | Examples |
|---|---|---|
| Volitional stance / attention | ✓ | ten cuidado · ten paciencia · ten fe · ten valor · ten en cuenta · ten piedad · ten agallas |
| Involuntary sensation | ✕ | \*ten hambre · \*ten sed · \*ten sueño · \*ten frío · \*ten fiebre |
| Truth-condition | ✕ | \*ten razón · \*ten sentido · \*ten la culpa |
| Outcome outside control | ✕ affirmative → surfaces as wish | \*ten éxito → *que tengas éxito* · *que tengas suerte* |

Plus the asymmetry that proves it: **negative imperatives license emotions the affirmative blocks.** *No tengas miedo / vergüenza / prisa* all fine; *ten miedo* only survives as a warning (*tenle miedo a ese perro*). You can be told to stop feeling; not to start.

Boundary case to flag honestly, not smooth over: *¡Ten suerte!* is attested but marginal — *¡Suerte!* and *que tengas suerte* are the standard forms.

Houses **NOTA-B** (heaviest on the page) and **NOTA-C**. Carries the one figure (§7).

**④ Pretérito vs. imperfecto**
- Onset vs. background: *tuve miedo* (got scared, a moment) / *tenía miedo* (was afraid, a backdrop)
- ***tuve que* vs *tenía que*** — *tuve que irme* implies I went; *tenía que irme* leaves it open. Direct parallel to *pude/podía*; cross-link to the poder page when built.
- Preterite *tener* = obtain/receive: *tuve una idea* · *tuvimos noticias* · *tuvo un accidente* · *tuvo un hijo*

Houses **NOTA-E**. Redundancy with the future pretérito/imperfecto page is intentional and approved.

**⑤ Complementos con *que***
- Subjunctive: *tener miedo / ganas / vergüenza / la esperanza / la ilusión **de que*** + subj
- Indicative: *tener la certeza / la seguridad **de que*** + ind
- The flip: *tengo claro que* + ind ↔ *no tengo claro que* + subj

Houses **NOTA-G**. Redundancy with the future subjunctive hub is intentional and approved.

### Parte II — Las familias

Every entry chipped (§4). Six cards.

**⑥ Estados físicos** — hambre · sed · sueño · frío · calor · dolor de · fiebre · resaca · náuseas · escalofríos · mareos · tos · catarro/gripe · alergia a · X años. Inline NOTA: the ***tener/hacer/estar* heat system** — *tengo calor* (person) / *hace calor* (weather) / *está caliente* (object), with the *estar caliente* flag stated in one dry sentence.

**⑦ Estados emocionales** — miedo · vergüenza · celos · envidia · lástima · pena · ilusión · confianza · esperanza · curiosidad · cariño · manía · rabia/bronca · pánico · nostalgia · remordimientos · dudas · interés · ganas. Houses **NOTA-F** (*tener X* vs *dar X* — *tengo vergüenza* = a state; *me da vergüenza* = triggered by something).

**⑧ Carácter y disposición** — paciencia · valor · agallas · coraje · sentido común · tacto · don de gentes · mano izquierda · ojo (para) · cara dura · morro `ES` · labia · buen/mal genio · sangre fría · iniciativa. The imperative-friendly zone; the chips will show it.

**⑨ Juicio, valor y resultado** — razón · sentido · lógica · fundamento · la culpa de · derecho a · mérito · gracia · pinta de · cara de · aspecto de · buena/mala cara · éxito · suerte · mala pata · remedio · arreglo · importancia. The imperative-blocked zone; the chips will show that too.

**⑩ Los modales** — tener que · **tener por qué** · tener ganas de · tener la intención de · tener pensado · tener previsto · tener por costumbre · tener a bien `formal` · *haber de* (contrast only). Anchored by the user's pair:

> *No tienes que ir a la reunión.* — you're not obligated.
> *No tienes por qué ir a la reunión.* — there's no reason for you to go.

Use-pattern note that earns the section: ***tener por qué* is effectively restricted to negative and interrogative contexts** and carries an indignant edge (*no tengo por qué aguantar esto*). Inline NOTA: the orthography trap — *por qué* stays two words, with the tilde.

**⑪ Frases fijas y modismos** — tener que ver con (with its *nada / algo / mucho / poco* slot) · tener en cuenta · tener presente · tener lugar · tener a mano · tener en mente · tener claro · tener al día · tener bajo control · tener en común. Modismos sub-block: no tener pelos en la lengua · tener la sartén por el mango · tener los pies en la tierra · no tenerlas todas consigo · tener la cabeza en otra parte · tener enchufe `ES` · tener mala leche `ES` · tener pasta `ES` · tener onda `RIO` · tener fiaca `RIO`.

### Parte III

**⑫ Tabla maestra** — §5.
**⑬ Más sobre este tema** — `.subpage-links` block → `tener-estructural.html`.

**Total inventory: ~85 phrases.** Per the golden rule, colloquial and regional items are tagged, never cut.

---

## 4. The frame chip system

A strip of pills directly under each phrase in every family entry. **Chips appear on every entry, including where a whole family shares the same values** — approved decision. Consistency beats economy; absence must never carry meaning.

| Chip | Values | Frequency | Color |
|---|---|---|---|
| Preposición | `de` `a` `con` `en` `por` `para` `—` | always | `--accent-alpha` tint |
| Imperativo | `imp ✓` `imp ✕` `imp ✕ / no ✓` `→ que tengas` | always | green ✓ / red ✕ |
| Cuantificador | `mucho` `mucha` `muchos` `muchas` | always | neutral gray |
| Aspecto | `pret ≠ imp` | ~8 phrases | `--accent-beta` tint |
| Región / registro | existing `.reg-badge` classes | as needed | per scaffold |

The imperative chip is the **only** traffic-light coding on the page — justified because it's genuinely binary and it's the failure mode that prompted the build. Two conditional chips keep marked rows visually distinct.

Entry markup shape:

```
tener miedo — to be afraid
[a / de] [imp ✕ / no ✓] [mucho] [pret ≠ imp]
🔊 Le tengo miedo a las alturas.
   I'm afraid of heights.
```

Each entry carries **1–2 example rows** with a 🔊 button. Every chip value must be derivable from an example on the page or from a Parte I rule — no orphan tags.

---

## 5. Tabla maestra

The same chip data rotated into columns. This is the "one place to go" and it lives **in-page**, not behind a click.

Columns: `frase` · `gloss` · `prep` · `imp` · `cuant` · `nota` (aspecto + región collapsed).
Filters (vanilla JS, no API): `todas` · `por preposición` · `imperativo ✓` · `por familia`.
Sort: family order by default; alphabetical toggle.
Under 600px: collapses to stacked cards, one phrase each, chips wrapping. Filters persist.

Data source: a single inline JS array, so the table and the family chips can't drift. Family sections render from static HTML; the table renders from the array; **the array is the source of truth and the build must verify the two agree.**

---

## 6. NOTA plan

Seven substantial, two inline. All English, Spanish terms italicized inside.

| ID | Section | Scope |
|---|---|---|
| **A** | ① | Bare noun, *mucha* vs *muy*, the *el hambre / mucha hambre* gender trap |
| **B** | ③ | The controllability rule — heaviest NOTA on the page |
| **C** | ③ | Negative/affirmative imperative asymmetry; *que tengas* as the escape hatch |
| **D** | ② | *miedo a* vs *miedo de*; dative doubling |
| **E** | ④ | *tuve que* vs *tenía que*; preterite *tener* = obtain |
| **F** | ⑦ | *tener X* vs *dar X* |
| **G** | ⑤ | Subjunctive complements; the *tengo claro / no tengo claro* flip |
| inline | ⑩ | *por qué* orthography trap |
| inline | ⑥ | *estar caliente* — one sentence, plain |

The participle-agreement NOTA belongs to the sibling page, not here.

---

## 7. Images

**One figure only.** A controllability spectrum for ③ — involuntary sensation at one end, volitional stance at the other, with the imperative cutoff marked. It carries the section's whole argument.

Everything else is text. The user-supplied PNG is watermarked to `paginadelespanol.com` — **reference for scope, not an asset**; nothing from it ships.

---

## 8. Sibling page — `tener-estructural.html`

Absorbs the roadmap's standalone item. Back-nav: `← Volver a Tener` → `tener.html`.

- ***tener* + objeto + participio** — the resultative, with **participle agreement**: *tengo escritas tres cartas*, *tengo los platos lavados*. Contrast with invariable *haber*: *he escrito tres cartas*.
- **Frozen forms** — *tengo entendido que* (invariable, no agreement)
- **The reproach reading** — *te lo tengo dicho* (repeated telling)
- ***tener a alguien por*** + adj/noun = to consider: *lo tengo por un buen médico*
- Cross-link to the planned Participios page.

Built to `single-topic-page-spec.md`. Same accent trio and background as the parent so they read as a pair.

---

## 9. Hub page — `verbos-en-profundidad.html`

Light page per `verbos-organizacion-spec.md` §4: title card, one short intro paragraph, `.subpage-links` grid. **No content cards of its own.**

Card format — verb large, thesis line beneath. **One card only: tener.** No placeholders for unbuilt verbs; a hub full of dead links is worse than a short hub.

Back-nav: `← Volver al menú` → `../../index.html`.

---

## 10. Tokens

| Field | Value |
|---|---|
| Accent trio | **Trio 1 — Violet / Amber / Teal** (`#c084fc` / `#fbbf24` / `#4ecdc4`) + `--accent-delta: #FF6B6B`. Grammar-contrast trio; 13 sections need the fourth. |
| Background | Per master briefing: `ls "assets/los fondos/"` on a fresh clone, propose 1–3, **Daniel confirms before build**. |
| TTS | **Neutral only.** No dual-voice JS. Rioplatense items (*fiaca*, *bronca*, *onda*) are textual/badged and still play neutral. |
| Rate bar | One, near top. Defaults to Normal on every page load — parent, sibling and hub each get their own. |
| Modals | **Guía Rápida** — scoped to the four frame rules on one screen (article · quantifier · imperative test · aspect test). **Not** a phrase dump; the table does that. No `⚠ Parecidos`. |
| Emoji | 🔊 ⚡ ✕ only |

---

## 11. Out of scope

- **Quizzes / drills** of any kind. Reference page only.
- Any **API-backed** feature — static page, no `/api/claude`.
- **Full subjunctive trigger inventory** — ⑤ names the *tener*-specific ones and stops; the hub owns depth.
- **Full pretérito/imperfecto system** — ④ covers *tener* only.
- **Site-wide folder reorganization** — explicitly declined. Additive only.
- ***tener* as plain possession** — assumed known; ① mentions it in one line and moves on.

---

## 12. Open decisions

1. **Background image** — pending `ls` + Daniel's pick.
2. **Guía Rápida** — confirm the four-rules scope, or widen it.
3. **Alphabetical sort toggle** on the tabla maestra — worth the JS, or family order only?
4. **Modismos sub-block** in ⑪ — inline, or split to its own card ⑪b if it runs long in the content draft?
5. **Hub intro paragraph** — one line, or a short framing of what "en profundidad" means versus the thematic cluster pages?

---

## 13. Deliverable sequence

1. **This spec** ✔
2. **Spanish content draft `.md`** — every phrase, every chip value, every example sentence and gloss. **Sign-off gate. No HTML before this is approved.**
3. **Build** — `tener.html`
4. **Build** — `tener-estructural.html` + hub + index wiring + doc amendments

Steps 3 and 4 are separate deploys per the one-observable-change discipline.

---

## 14. Validation (every build step)

Python tag-balance checker (strip script/style/comments, stack-track, skip void elements) · CSS brace count · `node --check` on extracted JS · grep for: favicon block, back-nav path, rate bar, chip count vs. table row count, `es-419` fallback chain, absence of `es-AR`/`es-UY`/voseo forms in spoken lines.

---

*End of spec. Delete from the project folder once the page ships — one file per concern.*
