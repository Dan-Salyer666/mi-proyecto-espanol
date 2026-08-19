# Clase del 18 de agosto de 2026 — Build Spec

### Status: **DRAFT — awaiting content sign-off**
### Target: `topics/clase-de-espanol/clase-2026-08-18.html`
### Companions: `index-categorization.md` (Notas de Clase rules) · `single-topic-page-spec.md` (scaffold) · `page-roadmap.md` (promotions)
### Delete this file once the sheet ships and the roadmap deltas are applied.

---

## 0. What this class was

Six threads, but really two. Most of the class was **prepositions attached to verbs** — first
in emotion predicates, then spreading into *preocuparse*, then into *dar por*. The second half
was **why the person is so often an indirect object**, which arrived as communication verbs and
ended as *gustar*.

She also uploaded five documents. Only one of them (the *por/para* grid) was touched in class;
the rest are a prepositions library handed over in bulk. That asymmetry is why this sheet needs
provenance chips — see §2.

The sheet is a **summary**. Four of the six cards link out to pages that don't exist yet. That
is correct and expected; do not let any card grow into the full treatment.

---

## 1. Page shell

| Field | Value |
|---|---|
| File | `topics/clase-de-espanol/clase-2026-08-18.html` |
| Overline | `Notas de Clase` |
| H1 | `Clase del 18 de agosto de 2026` |
| Subtitle | `Las emociones y sus preposiciones · preocuparse por y de · dar por + participio · el «dar» escondido · la órbita de gustar` |
| Footer | `Clase del 18 de agosto de 2026 · Mi Proyecto Español` |
| Background | Pick one **not** used by `clase-2026-08-12.html`. Same `brightness(0.55)` + `rgba(10,22,40,0.62)` overlay. |
| TTS | Neutral Latin American, site default. Rioplatense examples get a `rio` tag but still play neutral. |

Standard furniture, same as the 12 August sheet: back arrow → `../../index.html`, title card,
`contents` block, `rate-bar`, cards, **Materiales de la clase**, **Preguntas para la profe**,
footer.

Contents list:

```
① Las emociones y sus preposiciones
② Preocuparse por · preocuparse de
③ Dar por + participio
④ El «dar» escondido
⑤ La órbita de gustar
⑥ Verbalización vs. nominalización
📂 Materiales de la clase
✎ Preguntas para la profe
```

Accent rotation across cards: `card-alpha` · `card-beta` · `card-gamma` · `card-delta` ·
`card-epsilon` · `card-zeta`.

---

## 2. New component — provenance chips

Sits in `card-header`, after `card-title-group`. Marks where each card's content came from.
On cold read months later this is what tells you whether something is teacher-attested or
scaffolding added afterward.

| Chip | Meaning |
|---|---|
| `EN CLASE` | She taught it. Attested. |
| `MATERIAL` | She sent it; not worked in class. |
| `AMPLIACIÓN` | Added after class — mine or Gemini's, not hers. |

A card may carry two (e.g. `EN CLASE` + `AMPLIACIÓN`).

```html
<div class="prov-chips">
  <span class="prov prov-clase">EN CLASE</span>
  <span class="prov prov-ampl">AMPLIACIÓN</span>
</div>
```

```css
.prov-chips { display:flex; gap:6px; flex-shrink:0; align-items:center; flex-wrap:wrap; }
.prov {
  font-family:'Outfit',sans-serif; font-size:.6rem; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase;
  padding:3px 9px; border-radius:20px; white-space:nowrap;
}
.prov-clase    { background:rgba(74,222,128,.10); color:#4ade80; border:1px solid rgba(74,222,128,.28); }
.prov-material { background:rgba(250,204,21,.10); color:#facc15; border:1px solid rgba(250,204,21,.28); }
.prov-ampl     { background:rgba(148,163,184,.10); color:#94a3b8; border:1px solid rgba(148,163,184,.28); }
```

**Legend is mandatory** — a short `nota` immediately below the `contents` block, per the
cold-read rule. Three lines, English, one per chip.

---

## 3. Card content drafts — sign off before any HTML

### ① Las emociones y sus preposiciones
**Chips:** `EN CLASE` `AMPLIACIÓN` · **Accent:** alpha

Epigraph, her words, verbatim:

> *Las emociones, en la vida y en la gramática, tienen una causa.*

**Explicación (ES):**

> Toda emoción responde a un *¿por qué?*, y esa causa se expresa siempre con **por**. Esa
> ranura está disponible para cualquier predicado emotivo: no depende del verbo que elijas.
>
> Pero muchos verbos de emoción exigen **además** su propia preposición — *de*, *con*, *por* —
> que el diccionario registra y que no se deduce del significado. Son dos ranuras distintas
> que pueden convivir en la misma oración.

**Ejemplos:**

| ES | EN |
|---|---|
| Me alegro **por** la buena noticia. | I'm happy about the good news. |
| Me pongo triste **por** la mala noticia. | The bad news makes me sad. |
| Me pongo feliz **por** vos. `rio` | I'm happy for you. |
| **Me enojé con mi hermano por lo que dijo.** | I got angry at my brother over what he said. |

That fourth sentence is the card's spine — give it a `sub-head` of its own
(`Las dos ranuras en una sola oración`) and annotate inline: ***con*** = régimen del verbo ·
***por*** = causa. Both prepositions, one clause, no conflict.

**NOTA (EN) — telling the two slots apart.**

> Turn the sentence into a question. If the preposition comes back stuck to the question word,
> it belongs to the verb: *¿**De** qué te arrepentís?* · *¿**Con** quién te enojaste?* If the
> question is simply *¿por qué?*, you're in the cause slot, and *por* is always available there.
> This test is on page 1 of *Los verbos y sus preposiciones* — she handed over the tool that
> resolves the ambiguity her own rule creates.

**Tabla — el régimen, verbo por verbo.** Four columns, plain, no filtering:

| Solo *de* | Solo *por* | Solo *con* (+ persona) | *de* ~ *por* |
|---|---|---|---|
| arrepentirse · avergonzarse · cansarse · hartarse · quejarse · enamorarse · burlarse · jactarse · apiadarse · compadecerse | preocuparse · angustiarse · inquietarse · desvivirse · protestar · brindar | enojarse · enfadarse · entusiasmarse · ilusionarse · conformarse · incomodarse | alegrarse · asustarse · sorprenderse |

Fourth column needs one line under it: with these three, *de* presents the thing itself as the
object of the emotion, *por* presents it as the reason. In most sentences they are near
interchangeable — *Me alegro de tu ascenso* / *Me alegro por tu ascenso*.

Footnote on *sufrir*: **sufrir por** = to suffer over something; **sufrir de** = to have a
medical condition (*sufre de asma*). Different sense, not a variant.

**NOTA (EN) — the *que*-clause rule. This is the one to memorize.**

> With a *que*-clause the verb keeps its régimen preposition, and *por* is barred:
> *Me alegro **de** que hayas venido.* Never *por que*. This is the exact spot where an
> unqualified "emotions take *por*" instinct produces a real error.
> Dropping the *de* here is **queísmo** — see `tener.html` §5b.

**Cross-links:** `tener.html` §5b (queísmo/dequeísmo) · pending → *Verbos de régimen
preposicional*.

---

### ② Preocuparse **por** · preocuparse **de**
**Chips:** `EN CLASE` · **Accent:** beta

**Explicación (ES):**

> Dos verbos que comparten la escritura.
> **preocuparse por** — sentir inquietud, tener a alguien o algo en la cabeza.
> **preocuparse de** — ocuparse de que algo se haga. Es un sinónimo de **encargarse de**.

**Ejemplos:**

| ES | EN |
|---|---|
| Me preocupo **por** mi hermana; hace días que no contesta. | I'm worried about my sister. |
| Esta noche recibo invitados. Tengo que preocuparme **de** tener todo listo. | …I have to see to it that everything's ready. |
| Los políticos no se preocupan **por** el cambio climático. | *(from her handout — the *por* line)* |

**NOTA (EN) — her advice, kept as advice.**

> As a learner, reach for *por* almost every time. The *de* sense is real but narrow — it is
> *encargarse de* wearing another coat, and it shows up mostly with a following infinitive.
> Worth recording how this came up: Daniel raised *de* because the dictionary lists it and he
> already knew the use; she pushed back that it isn't common in everyday speech, then produced
> the *invitados* sentence as the context where it does work. Her point was about frequency,
> not correctness.

Comparison line to render inline: *Tengo que preocuparme de tener todo listo* ≈ *Tengo que
encargarme de tener todo listo*.

---

### ③ *Dar por* + participio
**Chips:** `EN CLASE` `AMPLIACIÓN` · **Accent:** gamma

**Explicación (ES):**

> *Dar por*, así suelto, no significa nada. Va seguido de un participio, y entonces significa
> que se **considera realizada** la acción de ese participio — sin verificarla.

`formula`: `dar por + participio (concuerda con el objeto)`

**Ejemplos:**

| ES | EN |
|---|---|
| **Doy por terminada** la reunión. | I declare the meeting over. |
| **Damos por visitada** la ciudad. | We'll call the city seen. |
| Lo **daban por muerto**, pero apareció tres días después. | They'd given him up for dead. |
| **Doy por sentado** que vas a venir. | I'm taking it as given that you're coming. |

**Sub-head: la forma reflexiva.**

| ES | EN |
|---|---|
| Me **doy por vencido**. | I give up. |
| No te **des por aludido**. | Don't take it personally / don't assume I meant you. |
| Ya me **doy por cenado**. | I'll count myself as having had dinner. |

**Participios habituales** (her list, as a chip row): terminado · concluido · cerrado · hecho ·
sentado · sabido · válido · bueno · vencido · muerto · imposible · visto.

**NOTA (EN) — you already own half of this.**

> *Dar por* and *tener a alguien por* are the same construction with different verbs:
> *Lo doy por muerto* / *Lo tengo por buen médico*. `tener-estructural.html` §7 covers the
> *tener* half, and §2 covers why the participle agrees. Read them together.

**`? por confirmar`** — ***darle*** *por* + infinitivo, "to take to doing something," a sudden
urge: *Le dio por cantar a las tres de la mañana.* Gemini rates it common; she did not pick up
the thread, which suggests it may be less frequent in Buenos Aires than the reference material
implies. Question 4 below.

**Modismo — `REG: vulgar`.** Render inside a bordered warning-tone box, not as a plain example
row:

> Me da por las **pelotas / bolas** que siempre me digas lo mismo. `rio` `vulgar`
> Me da por los **cojones**. `España` `vulgar`

Second one is peninsular. Flag on the card that the expected Rioplatense default is
*me rompe / me hincha las pelotas* — Question 3 below. **Register tag, don't remove.**

---

### ④ El «dar» escondido
**Chips:** `EN CLASE` `AMPLIACIÓN` · **Accent:** delta

This is the strongest idea in the class and the one that reframes an existing page.

**Explicación (ES):**

> Muchos verbos de comunicación llevan su objeto directo **adentro**: *informar* es *dar una
> información*, *explicar* es *dar una explicación*, *responder* es *dar una respuesta*. Como
> la ranura del objeto directo ya está ocupada, la persona queda como **objeto indirecto**: *le*.
>
> Y los hablantes nativos muchas veces sacan el verbo a la superficie: en vez de *le expliqué*,
> **le di una explicación**.

**La prueba:** si podés reformularlo como *dar un/una \_\_\_ a alguien*, la persona es objeto
indirecto.

**Ejemplos** — her list, one column showing the hidden noun:

| Verbo | El objeto directo escondido | Ejemplo |
|---|---|---|
| contarle | un cuento / algo | Le conté lo que pasó. |
| comentarle | un comentario | Le comenté tu idea. |
| informarle | una información | Le informaron del resultado. |
| expresarle | una expresión | Le expresé mi agradecimiento. |
| explicarle | una explicación | Le expliqué el problema. |
| responderle | una respuesta | Le respondí enseguida. |

**Sub-head: la excepción que ella marcó — *invitar*.**

Use the `contrast` component, bad/good:

- ✗ *Le invité a cenar.*
- ✓ **Lo** invité a cenar. / **La** invité a cenar.

> Explicación (ES): *invitar* no encierra ningún sustantivo. Se invita **a alguien**: la persona
> es el objeto directo, y por eso se usa *lo / la*.

Same trap, add as a short list: llamar · visitar · saludar · abrazar · besar — all take a direct
object even though English makes the person feel like a recipient.

**Cross-link — the whole point of the card:**
`topics/iop usage` (existing page, expansion pending). Text: *La página completa está en el
sitio; falta incorporarle este marco del «dar».*

> **Build note, not page content:** the existing IOP page has a **literal space in its
> filename**, so every link to it renders as `%20`. Add a rename to the back-arrow cleanup batch
> — `topics/iop-usage.html` or similar. Do it before the expansion, not after.

---

### ⑤ La órbita de *gustar*
**Chips:** `EN CLASE` `MATERIAL` · **Accent:** epsilon

Keep this card **small**. She listed five verbs and moved on; the handout is untouched.

**Explicación (ES):**

> Otro camino hacia el mismo objeto indirecto. En los verbos de ④ la persona es indirecta
> porque el objeto directo ya vive dentro del verbo. En los verbos tipo *gustar* la persona es
> indirecta porque **el sujeto es la cosa que provoca la emoción**. Dos rutas distintas, el
> mismo resultado: la persona nunca es objeto directo.

Her five, one line each — *Le gusta la música* · *Le encanta viajar* · *Le duele la cabeza* ·
*Le interesa el arte* · *No le importa.*

**NOTA (EN) — what's in the handout and not yet worked.**

> *Verbo Gustar y similares* runs well past these five: apetecer, aburrir, fastidiar, fascinar,
> molestar, preocupar, entristecer, plus three construction families — *dar + miedo / pena /
> rabia / asco / risa / vergüenza*, *parecer + bien / mal / raro*, and *caer bien / mal*. None
> of it was discussed. It is on the roadmap, and the psych-verb intensity ladder
> (*me gusta → me encanta*) belongs to the queued **Gradación e Intensidad** page rather than
> being duplicated here.

Pending link → *Verbos tipo gustar*.

---

### ⑥ Verbalización vs. nominalización
**Chips:** `EN CLASE` · **Accent:** zeta

Short card, no example table.

**Explicación (ES):**

> El español apoya el peso de la oración en el **verbo**; el inglés lo apoya en el **sustantivo**.
> Su explicación: el español tiene una morfología verbal muy rica — tiempos, modos, aspectos —
> y por eso el verbo puede cargar con información que el inglés tiene que repartir en
> sustantivos y perífrasis.

**NOTA (EN) — a theme, not a one-off.**

> This surfaced when Daniel connected the emotion discussion back to the previous week's class.
> It is the same instinct as *La economía del lenguaje* on the 12 August sheet approached from
> the other side — there, one Spanish word replacing an English phrase; here, the verb carrying
> what English puts in a noun. Second appearance in two weeks. If it comes up a third time it
> has earned a page.

Pending link → *Verbalización y nominalización* (roadmap, low priority until it recurs).

---

## 4. Materiales de la clase

New block, sits between card ⑥ and Preguntas. Files are **already built** — deduped,
recompressed, slug-renamed — and drop straight into `recursos/clase-2026-08-18/`.

`recursos/` is a **repo-root sibling** of `index.html`, `topics/` and `assets/`. From a class
sheet the relative path is therefore `../../recursos/clase-2026-08-18/<file>.pdf`.

| Archivo | Título en la página | Qué contiene | Tipo | Destino |
|---|---|---|---|---|
| `verbos-con-y-sin-preposicion.pdf` | Verbos con y sin preposición | ~80 verbos agrupados por *a · con · de · en · por*, más los cuatro que no llevan preposición (*buscar, escuchar, esperar, mirar*). 1 p. | LISTA | Régimen preposicional |
| `regimen-preposicional.pdf` | Los verbos de régimen preposicional | Explica qué es un verbo preposicional y trae la prueba de la pregunta. Incluye los verbos transitivos sin preposición obligatoria y los de **varias** preposiciones (*advertir de/sobre*, *dudar de/en/entre/sobre*). 5 p. | EXPLICACIÓN | Régimen preposicional |
| `lista-verbos-con-preposiciones.pdf` | Lista de verbos con preposiciones | Tabla verbo · preposición · ejemplo. ~150 entradas. 3 p. | TABLA | Régimen preposicional · Entrenador |
| `verbos-tipo-gustar.pdf` | Verbo *gustar* y similares | Cómo se forma la construcción, por qué el sujeto es la cosa, lista ampliada y las familias *dar + emoción*, *parecer + adj.*, *caer bien/mal*. 3 p. | EXPLICACIÓN | Verbos tipo gustar |
| `por-y-para-anotado.pdf` | *Por* y *para* — cuadro anotado | La grilla completa con sus anotaciones de clase, más 10 ejercicios. 2 p. | TABLA + EJERCICIO | Por y para |

Total 1.5 MB (from 3.8 MB). Two source files were dropped: a byte-identical duplicate of the
first PDF, and the unannotated `.doc` original of the *por/para* grid — the PDF carries her
markup, which is the class content.

**Markup:**

```html
<section class="materiales" id="materiales">
  <h2>Materiales de la clase</h2>
  <div class="sub">Lo que subió la profe — archivados en el sitio, no en Drive</div>

  <a class="material-item" href="../../recursos/clase-2026-08-18/lista-verbos-con-preposiciones.pdf">
    <div class="material-left">
      <span class="material-tipo tipo-tabla">TABLA</span>
      <div>
        <div class="material-title">Lista de verbos con preposiciones</div>
        <div class="material-desc">Tabla verbo · preposición · ejemplo. ~150 entradas. 3 p.</div>
        <div class="material-destino">→ Alimenta: Verbos de régimen preposicional · Entrenador</div>
      </div>
    </div>
    <span class="material-dl">PDF ↓</span>
  </a>
  <!-- ×5 -->
</section>
```

Style it off `.link-item` from `index.html` — same row shape, same hover. `tipo-tabla` /
`tipo-expl` / `tipo-ejercicio` reuse the `.prov` pill treatment with the accent trio's colors.

The `material-destino` line is what keeps this from being a junk drawer: every file states which
page will absorb it, so the block doubles as a work queue.

---

## 5. Preguntas para la profe

Six, ordered by how much they'd change what's on the page:

1. **La ranura *de* / *por* con emociones.** Su regla fue *las emociones tienen causa → por*,
   pero en su propio material aparece *alegrarse **de** que te vaya bien* y *asustarse **de**
   todo*. ¿La diferencia es que *por* introduce la causa y *de* el contenido de la emoción, o
   es simplemente cuestión de verbo por verbo? ¿*Me alegro de tu ascenso* y *Me alegro por tu
   ascenso* dicen lo mismo?
2. **Preocuparse de.** ¿Es exactamente un sinónimo de *encargarse de*, o hay un matiz? ¿Suena
   natural *me preocupo de que no falte nada* en Buenos Aires, o ahí ya se prefiere *me encargo*?
3. **Me da por las pelotas.** ¿Se dice así en Buenos Aires, o lo más común es *me rompe* /
   *me hincha las pelotas*? ¿*Me da por los cojones* es solamente de España?
4. **Darle por + infinitivo.** *Le dio por cantar a las tres de la mañana* — ¿se usa realmente,
   o es más de otros países?
5. **Invitarle.** ¿Se escucha alguna vez *le invité* en Buenos Aires, o siempre *lo/la invité*?
6. **Dar por / tener por.** *Lo doy por muerto* y *Lo tengo por buen médico* — ¿son la misma
   construcción con dos verbos, o funcionan distinto?

Q1 is the one that can rewrite card ①. Slip that one in first.

---

## 6. Roadmap deltas — apply to `page-roadmap.md` when the sheet ships

| Page | Bucket | Status | Source |
|---|---|---|---|
| **Por y para** | Gram → Preposiciones | NEW, high priority — her grid is already a complete page outline | `por-y-para-anotado.pdf` |
| **Verbos de régimen preposicional** | Gram → Preposiciones | NEW, large. Build as a **filterable master table** in the shape of `tener.html` §⑫. ~180 pairs across three handouts. The *varias preposiciones* set (*advertir de/sobre*, *dudar de/en/entre/sobre*, *pensar en/de/sobre*) is the hard part and deserves its own section. Also Entrenador feedstock. | all three prep PDFs |
| **Verbos tipo gustar** | Gram → Verbos | NEW. Coordinate with **Gradación e Intensidad** — the *me gusta → me encanta* ladder lives there, not here. | `verbos-tipo-gustar.pdf` |
| ***Dar por* + participio** | — | **Fold into the future `dar.html`** Verb Depth page. Don't build standalone. Cross-links to `tener-estructural.html` §2 and §7. | class |
| **IOP page expansion** | Gram → Pronombres | EXPAND existing. Add the "hidden *dar*" frame over the three existing groups + the *invitar* counterexample. **Rename the file first** — it currently has a space in it. | class |
| **Verbalización y nominalización** | Gram → Miscelánea? | WATCH. Second appearance. Build on the third. | class |

Also: add the `topics/iop usage` rename to the back-arrow cleanup batch.

---

## 7. Build order

1. Daniel signs off on §3 content (Spanish drafts) and §5 questions.
2. Drop `recursos/clase-2026-08-18/` into the repo (files supplied).
3. Build the sheet. Validate: tag balance, `node --check` on extracted JS, chip-count check
   (6 cards → provenance chips present on all six), all five `recursos/` hrefs resolve, no
   `%20` introduced.
4. Wire `index.html`: one `link-item` at the **top** of the Notas de Clase 2026 section
   (newest first), hub count `1 clase` → `2 clases`.
5. Apply §6 roadmap deltas. Delete this spec.

One observable change per deploy: sheet + `recursos/` together as one, index wiring as the next.
