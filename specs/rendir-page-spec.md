# Mi Proyecto Español — Página de Vocabulario: RENDIR (spec)
### Type: single-topic vocabulary page (`/topics/rendir.html`)
### Built from: `single-topic-page-spec.md` (Spanish-primary + English NOTA + neutral TTS)
### Status: content spec for Daniel's sign-off — no HTML until approved
### Last updated: July 2026

---

## 1. Purpose & angle

*Rendir* is a high-frequency, culturally loaded verb that English speakers reliably
misfile because they pattern-match it to English *rend* (rip/tear). It doesn't come
from *rend*. It descends from Latin **reddere** ("to give back / give forth"), and its
true English cognate is **RENDER**. That single word is the spine of the whole page:
every sense is a flavor of *giving something forth*.

The page teaches the verb through that one image, then pins the derived word family
(*rendimiento, rendidor, rendido, rendición*) to the same root, and grounds the
"yield" sense in three real photographs of household packaging Daniel's teacher shot
in Buenos Aires (*rinde / rendidor / rendimiento* printed on a cat-litter bag).

This page leans **liberally Rioplatense in its written examples** (teacher's emphasis;
*rendir un examen* is a Southern Cone idiom), but **TTS stays neutral Latin American**
per Daniel's standing rule — the neutral-only JS variant, no dual voice.

---

## 2. The spine (structure)

Everything collapses into **three clusters under the RENDER image**, with one
high-frequency idiom pulled out and featured on top, and the word family as its own
closing section.

```
  ┌─ FEATURED IDIOM ─ rendir un examen  (sit ≠ pass — its own box, testing vocab)
  │
  │   R E N D E R  =  "give forth"   ← the mnemonic that unifies everything
  │
  ├─ ①  Give forth / YIELD        rinde · rendidor · rendimiento   (+ 3 real photos)
  ├─ ②  Give what's OWED          rendir cuentas / homenaje / frutos…
  ├─ ③  Give UP / give over       rendirse · no te rindas · rendir la ciudad
  │
  └─ WORD FAMILY  ─ rendimiento · rendidor · rendido · rendición
```

Teacher's original four contexts map straight on: *ser suficiente* + *ser productivo*
→ cluster ①; *rendir cuentas* → cluster ②; *rendir un examen* → featured box.

### Card order on the page

1. **Etymology / mnemonic** (short opener card + NOTA) — establishes RENDER before any sense.
2. **Featured idiom** — *rendir un examen* (sit vs. pass, testing vocabulary, *presentarse a*).
3. **Cluster ①** — Give forth / yield (+ real-photo gallery + *alcanzar* echo NOTA).
4. **Cluster ②** — Give what's owed.
5. **Cluster ③** — Give up / give over.
6. **Word family** — the four derived forms.
7. **Conjugation block** — e→i stem-changer, tuteo + voseo side by side.

Accent trio: **Trio 3 (Teal / Orange / Violet)** — cluster ① = teal (alpha),
② = orange (beta), ③ = violet (gamma). Featured idiom + word family cards take the
site `--accent` blue so they read as "framing," not as one of the three senses.
*(Open: Daniel to confirm trio; background SVG pattern still to be picked from the 5.)*

---

## 3. Two extensions to the base spec (flagging before build)

These aren't in `single-topic-page-spec.md`; they're page-specific and I want sign-off:

**(a) Real-photo gallery strip.** The base spec only covers small top-right *cartoon*
card-icons. Cluster ① needs a captioned strip of the **three real packaging photos**
(the payoff of the yield sense). Proposed as a horizontal 3-up strip inside the
cluster-① card body, below the examples — each photo cropped tight to the printed word,
with a short Spanish caption naming which form it shows. Reuses `.card-icon img`
magnify behavior (click to zoom). New class `.photo-strip` (navy card-family background,
`--border`, same magnify JS). No brand/logo as subject — crop to the text.

**(b) Conjugation block with tuteo + voseo.** Base spec has no conjugation component.
Proposed as a small two-column styled table (neutral *tú* form | Rioplatense *vos* form),
so Daniel sees the familiar next to the regional. Marked `data-region` per row for the
textual flag, **but audio still plays neutral** (default JS). New class `.conjug-table`,
styled off the existing `.table-wrapper` from the Guía Rápida pattern so no new visual
language is introduced.

Everything else is stock: title card, rate bar, grammar cards, English NOTA boxes,
neutral TTS, click-to-magnify.

---

## 4. Directory & pathing

- Page: `/topics/rendir.html`
- Images: `/assets/rendir/` (subfolder under the established `/assets/` dir, keeps
  this verb's 4 cartoons + 3 photos grouped). From `/topics/`, reference as
  `../assets/rendir/[file].png`.
- Back-nav: `../index.html`, label `← Volver al menú`.

*(This reconciles the earlier "topics/img/rendir/" idea with the spec's hardcoded
`/assets/` convention — same intent, spec-consistent path.)*

---

## 5. SPANISH CONTENT — for sign-off

All example sentences below are the review gate. Nothing gets built into HTML until
Daniel signs off on this Spanish. `.example-en` glosses are short translations, not
explanations (explanations live in the NOTA boxes).

### Card 1 — Etimología: *rendir* ≠ *rend*

Short Spanish intro prose + one NOTA (English, the mnemonic).

> **NOTA\*** — *Rendir* has nothing to do with English *rend* (rip/tear). It comes from
> Latin **reddere**, "to give back / give forth," and its real cognate is **RENDER**.
> That one word carries almost every sense: *render an account* → **rendir cuentas**;
> *render homage* → **rendir homenaje**; *render up* a fortress (surrender) → **rendirse**;
> *render fat* — where the fat **yields** its oil → the *rinde* / "goes a long way" sense.
> If you replace the false friend *rend* with **RENDER**, the "many meanings" become one
> image: *giving something forth.*

### Card 2 — FEATURED IDIOM: *rendir un examen* (presentarse ≠ aprobar)

| Spanish (`.example-es`) | English gloss (`.example-en`) |
|---|---|
| Mañana **rindo** el examen final de anatomía. | Tomorrow I sit my final anatomy exam. |
| **Rendí** tres materias en diciembre. | I took three subject-exams in December. |
| **Rindió** el examen, pero no lo **aprobó**. | He sat the exam, but didn't pass it. *(the whole point)* |
| Me **presenté a rendir** y me fue bien. | I showed up to take it and it went well. |
| Tengo que **rendir** para recibirme. | I have to sit my exams to graduate. |

> **NOTA\*** — **Sit, not pass.** *Rendir un examen* means to **present yourself and be
> tested** — you can *rendir* and still fail. *Rindió el examen pero no lo aprobó* is a
> perfectly normal (sad) sentence. English speakers misread *rendir* here as "pass,"
> probably bleeding over from "render a good performance." Keep the pair separate:
> **rendir / presentarse a** = sit, take · **aprobar** = pass · **desaprobar / reprobar**
> = fail. *Presentarse a un examen* is the plain near-synonym of *rendir un examen* — both
> are "show up and be tested."
>
> *Regional:* **rendir un examen** is Southern Cone / Andean (natural in Buenos Aires).
> México and España say **presentar** or **hacer un examen** instead — worth recognizing,
> but know it's a marked form.

### Card 3 — Cluster ①: DAR FRUTO / RENDIR (give forth · yield)

**a) Cundir / alcanzar — go a long way, be enough** *(products, resources)*

| Spanish | Gloss |
|---|---|
| Este detergente **rinde** muchísimo. | This detergent goes a long way. |
| Un kilo de arroz **rinde** para seis porciones. | A kilo of rice makes enough for six servings. |
| La pintura no **rindió** lo que esperaba. | The paint didn't stretch as far as I hoped. |

**b) Optional dative — "there isn't enough of it for me"** *(the gustar-shaped, but droppable, use)*

| Spanish | Gloss |
|---|---|
| No me **rinde** el día. | There aren't enough hours in my day. |
| A fin de mes el sueldo no nos **rinde**. | By month's end our salary doesn't stretch. |

**c) Ser productivo — perform, do well** *(people, teams, engines)*

| Spanish | Gloss |
|---|---|
| El equipo no **rindió** en el segundo tiempo. | The team didn't perform in the second half. |
| **Rindo** mejor por la mañana. | I perform better in the morning. |
| El motor **rinde** más con este combustible. | The engine performs better with this fuel. |

> **NOTA\*** — **Not a *gustar* verb — an intransitive "yield" verb that *tolerates* a
> dative.** *Este detergente rinde* is a complete sentence with **nobody in it** — *gustar*
> can never do that; it always needs an experiencer. When you *do* name the person, you
> add an optional indirect object and it *looks* gustar-shaped: *No me rinde el día*
> (*el día* = subject, *me* = IO). But the IO drops freely, so it isn't gustar.
>
> **The *alcanzar* echo** — this is exactly why *alcanzar* ("to be enough") keeps
> tripping you: it has the **identical** structure. Subject is the thing that's
> sufficient, dative optional and droppable:
> - *La plata no alcanza.* → *No me alcanza la plata.*  (suffice)
> - *El día no rinde.* → *No me rinde el día.*  (yield)
>
> Two "there's-enough-of-it" verbs, same shape, neither a true *gustar* verb. Learn one,
> you've learned the other. *(Reminder: intransitive **alcanzar** = be enough is a
> different animal from transitive **alcanzar** = to reach / attain.)*

### Card 4 — Cluster ②: RENDIR + sustantivo (give what's owed)

The fixed transitive phrases — "render / offer up what is due."

| Spanish | Gloss |
|---|---|
| El gerente tiene que **rendir cuentas** ante el directorio. | The manager has to answer to the board. |
| Le **rindieron homenaje** al escritor. | They paid homage to the writer. |
| Las tropas le **rindieron honores** al presidente. | The troops rendered honors to the president. |
| En el pueblo **rinden culto** a la Virgen. | In the town they worship the Virgin. |
| Tanto esfuerzo por fin **rindió sus frutos**. | So much effort finally bore fruit. |

> **NOTA\*** — These are frozen collocations, all one idea: *render what's owed* —
> accounts, homage, honors, worship, fruit. **rendir cuentas** and **rendir homenaje**
> are the two you'll meet constantly; the rest are recognition-level. The nominalization
> **rendición de cuentas** (= accountability, as an institutional concept) comes straight
> off *rendir cuentas* — see the word-family card.

### Card 5 — Cluster ③: RENDIRSE (give up / give over)

Pronominal *rendirse* = surrender / give in, plus the literary transitive *rendir* = force
to yield.

| Spanish | Gloss |
|---|---|
| **No te rindas.** | Don't give up. *(the iconic one)* |
| Nunca **me rindo**. | I never give up. |
| El general **se rindió** sin condiciones. | The general surrendered unconditionally. |
| Tras horas de negociación, **se rindió** a la policía. | After hours of negotiation, he gave himself up to the police. |
| Me **rindo** ante tu argumento. | I concede to your argument. *(figurative — give in)* |
| Las tropas **rindieron** la ciudad. | The troops surrendered the city. *(literary transitive)* |

> **NOTA\*** — Don't undersell this face of the verb. The motivational *no te rindas /
> nunca me rindo* is everywhere in daily speech — arguably the most *heard* form of
> *rendir*. The transitive *rindieron la ciudad* ("forced it to surrender / took it") is
> real but literary-military; recognize it, don't reach for it.

### Card 6 — Familia de palabras

| Form | Type | Sense(s) | Examples |
|---|---|---|---|
| **rendimiento** | n. | performance · yield · (finance) return | *el rendimiento escolar* · *bajo rendimiento* · *el rendimiento del motor* · *el rendimiento de la inversión* |
| **rendidor / -a** | adj. | that goes a long way, high-yield | *Este jabón es muy rendidor.* · *una receta rendidora* |
| **rendido / -a** | adj. | ① exhausted · ② surrendered | *Estoy rendido.* · *Cayó rendido en el sofá.* · *la ciudad rendida* |
| **rendición** | n. | surrender · *rendición de cuentas* = accountability | *la rendición incondicional* · *un sistema de rendición de cuentas* |

> **NOTA\*** — **rendidor** is the word printed on the packaging, and it's Latin-American
> (Spain wouldn't reach for it) — it's the adjective form of exactly the *rinde* you see
> on a bag. And **rendido** is where the *exhausted* sense actually lives — not in the
> plain verb. (We deliberately dropped "*este trabajo me rinde* = it tires me out": to a
> native ear that reads as *this work pays off for me*, the yield sense. Exhaustion is
> **estoy rendido**, or transitively *el calor lo rindió* — note that one takes a **direct**
> object, the opposite structure from the *me rinde el día* dative.) Both *rendido* senses
> — spent, and surrendered — trace back to the same "given up / given forth" root.

Speaker buttons: attach to each Spanish example in the family table (use `.vocab-es`
markup so the existing TTS script picks them up).

### Card 7 — Conjugación (e→i, como *pedir* / *servir*)

*Rendir* is an **e→i** stem-changer. Two-column table, neutral *tú* next to Rioplatense
*vos* (audio neutral either way):

| | Neutral (tú) | Rioplatense (vos) |
|---|---|---|
| Presente | rind**o**, rind**es**, rind**e**, rend**imos**, rind**en** | vos rend**ís** |
| Imperativo (–) | **no te rindas** | **no te rindás** |
| Imperativo (+) | rínd**e**te | rend**i**te |
| Pretérito | rend**í**, rind**ió**, rind**ieron** | *(igual)* |
| Gerundio | rind**iendo** | *(igual)* |

> **NOTA\*** — The stem vowel flips **e→i** in the stressed present (*rindo, rinde*),
> throughout the gerund (*rindiendo*), and in the 3rd-person preterite (*rindió,
> rindieron*) — exactly like *pedir* and *servir*. That's why the *rinde* your teacher
> kept saying looks so unlike the infinitive *rendir*. Note voseo present **rendís** does
> **not** change the stem (voseo present never diphthongizes) — the change only shows up
> where the stress lands on the stem.

---

## 6. IMAGES — names + Gemini prompts

Four cartoons (one per content card, top-right card-icon) + three real photos (gallery
strip in cluster ①). All cartoons: flat vector, clean lines, **deep-navy background in
the `--bg-card`/`--bg-input` family (no pure white)**, incorporating the page accent trio
(teal / orange / violet). Roughly square. Illustrate the *concept*, not decoration.
Post-generation: GIMP scale to 800px wide, index 256 colors, PNG compression 9, export to
`/assets/rendir/`.

**Cartoon 1 — `rendir-etimologia.png`** (Card 1)
> Flat vector cartoon, clean lines, deep navy background (#0d1a2f family). A split panel:
> on the left a crossed-out torn/ripped paper labeled "REND" in muted red; on the right,
> a hand offering/pouring something forth (coins, drops, light) labeled "RENDER" in teal.
> A thin arrow leads from left to right suggesting "replace this with that." Palette limited
> to navy background + teal (#4ecdc4), amber/orange (#FF9F1C), violet (#c084fc). Square.

**Cartoon 2 — `rendir-examen.png`** (Card 2)
> Flat vector cartoon, clean lines, deep navy background. Split scene: on one side a
> student sitting at a desk writing an exam (labeled subtly "rendir = presentarse");
> on the other side a separate stamped sheet with a large check mark (labeled "aprobar").
> A dotted divider makes clear these are two different events, not the same one. Accent:
> orange (#FF9F1C) as the primary highlight, teal and violet as secondary. Square.

**Cartoon 3 — `rendir-cuentas-homenaje.png`** (Card 4)
> Flat vector cartoon, clean lines, deep navy background. Two small vignettes side by side:
> (1) a figure presenting an open ledger/account book upward to a panel of seated figures
> ("rendir cuentas"); (2) a figure removing a hat and bowing before a statue/monument
> ("rendir homenaje"). Unified by the idea of "offering up what is owed." Accent orange
> (#FF9F1C) primary, teal + violet secondary. Roughly square or modestly wide.

**Cartoon 4 — `rendirse.png`** (Card 5)
> Flat vector cartoon, clean lines, deep navy background. Split composition: on one side a
> small white flag being raised in surrender ("rendirse"); on the other, a climber pushing
> upward on a cliff with a speech bubble "¡No te rindas!" — the two poles of the pronominal
> verb (giving up vs. refusing to). Accent violet (#c084fc) primary, teal + orange secondary.
> Square.

**Real photos — gallery strip in Card 3 (cluster ①)** — Daniel supplies; cropped tight to
the printed word, brand/logo NOT the subject:
- `rendir-foto-rinde.png` — packaging text showing **"rinde [N] usos/lavados/porciones."**
  Caption (ES): *«rinde» en el envase — el verbo, en la vida real.*
- `rendir-foto-rendidor.png` — packaging text showing **"rendidor."**
  Caption (ES): *«rendidor» — el adjetivo: que cunde, que da para mucho.*
- `rendir-foto-rendimiento.png` — packaging text showing **"rendimiento / alto rendimiento."**
  Caption (ES): *«rendimiento» — el sustantivo del mismo tronco.*

Gallery intro line (ES, above the strip): *La misma idea — «dar mucho de sí» — impresa en
un envase de verdad. La foto la sacó mi profesora en Buenos Aires.*

---

## 7. Open decisions before build

1. **Spanish content sign-off** — the tables in §5 are the review gate. Approve / edit.
2. **Trio confirm** — proposed Trio 3 (teal/orange/violet). OK, or swap?
3. **Background SVG pattern** — pick one of the 5 (I can propose 2–3 candidates).
4. **Photos** — Daniel drops the 3 cropped files into `/assets/rendir/` with the filenames
   in §6; confirm the crop-to-text approach.
5. **Cartoon count** — 4 proposed (one per sense card). More/fewer?

Once §5 and the image list are approved, I build the single self-contained
`/topics/rendir.html`, run `node --check` on the extracted JS + tag-balance, and hand back
the full file for a manual Netlify deploy.

*End of spec.*
