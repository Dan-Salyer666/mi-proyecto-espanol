# Mi Proyecto Español — Page Roadmap (from the ideas/materials dump)

**What this is:** a forward-looking map of pages to build, pages to expand, and a few non-page items — distilled from the notes in the ideas zip. It is *not* an index of the notes. Each entry names the **source file(s)** that prompted it; upload that file when we sit down to build the entry so the original thinking travels with it.

**How to read each entry:**
- **Status** — `NEW` (build a page) · `EXPAND` (add to an existing page) · `FOLD` (feed into an already-queued page) · `REBUILD` (a Gemini HTML to redo to spec) · `FEATURE` (app idea, own spec) · `INFRA`.
- **Form** — `static` (single-topic-page-spec) or `interactive` candidate (complexity earns a quiz/tool).
- **Source note(s)** — exact filename(s) from the zip.

**Build hubs with expansion in mind.** For the big topics, the first build is a parent/overview page; subpages get added over time without restructuring (your parent + subpage convention). Don't try to ship a tentpole topic whole.

**One intake rule for everything below:** these notes are riddled with Rioplatense/voseo (*campera, sos, ponés, llegués, quedate acá*) — one file even instructs voseo outright. Neutralize to Latin American neutral on intake, every time, per the site-wide policy.

---

## 1. TENTPOLE — El Subjuntivo  ·  Status: NEW (hub, phased)  ·  Form: static → interactive

The marquee build, and far too big for one page. Plan it as a hub from day one so it can grow.

**Architecture (build in this order):**
1. **Overview / mental model** — mood vs. tense; the core *assertion vs. non-assertion* logic (declared information → indicative; backgrounded / unrealized / non-asserted → subjunctive). This frame is the spine the whole topic hangs on.
2. **Subpage — Disparadores temporales** — *cuando, hasta que, en cuanto, tan pronto como, después de que, mientras*; the future-anticipation (subjunctive) vs. habitual/past (indicative) contrast. *Source: `spanish_subjunctive_time_triggers.md`*
3. **Subpage — Disparadores categóricos** — conjunctions that are always subjunctive (*antes de que, sin que*, plus *para que, a menos que, con tal de que*…). *Source: `subjunctive_triggers_analysis.md`*
4. **Subpage — Disparadores contextuales (valor informativo)** — *el hecho de que*, narrative *después de que*, the *no creer que* vs. *¿no crees que…?* loophole. The "is this being asserted or backgrounded?" judgment. *Source: `subjunctive_triggers_analysis.md`*

**Future slots (no source notes yet — leave the hub room for these):**
5. Verb-driven triggers (WEIRDO): querer/esperar que, emotion, impersonal *es importante que*, requests, doubt/denial.
6. The subjunctive **tenses** (presente, imperfecto -ra/-se, perfecto, pluscuamperfecto) + sequence of tenses.
7. **Si**-clauses / conditionals (*si tuviera…*).
8. **Interactive:** trigger-sorting or mood-choice quiz — strong fit once subpages 2–4 exist.

---

## 2. Conectores (causa, consecuencia, tiempo)  ·  Status: NEW (hub)  ·  Form: static, interactive-friendly

The *ya que / así que* conversation. A general connectors page plus a connectors-of-consequence focus.

- **Parent — Conectores de causa y consecuencia:** *ya que, puesto que, dado que, como, porque* (cause) vs. *así que, entonces, por lo tanto, por eso* (consequence) vs. concession *aunque*. Use the "domino / load-bearing pillar / diverter" mental model as the hook, the English-mapping table as the reference layer. The metaphors are Gemini's invention — vet for accuracy before they ship.
- **Possible subpage / second page — Causa vs. tiempo:** *desde que, a medida que* (time) split out from the cause group, since English "as/since" blurs them.
- **Check overlap** with existing time-construction pages (*desde-hace…*) before drafting, to avoid re-covering ground.
- *Source notes: `ya que and asi qui mental models.md`, `spanish_as_since_connectors.md`*

---

## 3. Adjetivos  ·  Status: NEW (hub)  ·  Form: static; placement = interactive candidate

A whole family currently scattered across five files (with one outright duplicate pair).

- **Subpage — Cambio de significado por posición** (before/after the noun: *gran/grande, pobre, nuevo, único, viejo*…). **Merge the duplicate pair** into one union table + examples. Excellent **interactive** candidate (before/after meaning quiz). *Source: `spanish_adjective_placement.md` + `spanish_adjectives_meaning_shifts.md` (merge these two)*
- **Subpage — Secuencia de adjetivos** (clasificadores vs. calificativos; when to use *y*; the "core unit" idea). *Source: `spanish_adjective_rules.md`*
- **Subpage — Cualquier / cualquiera** (apócope; the *cualesquiera* formal plural; the *una cualquiera* warning). *Source: `Spanish_Grammar_Cualquier_Notes.md`*
- **Subpage — Participios como adjetivos** (verbal vs. adjectival; the animacy split: *abierto* door vs. *abierto* person). Bridges adjectives and the *tener* note (§8). *Source: `Participios_Desdoblamiento_Semantico.md`*
- **Vocab companion — 60 adjetivos para describir a una persona** (a descriptor list page). *Source: `vocab 2.html` (REBUILD — loads no design-system fonts at all)*

---

## 4. Pronombres y mecánica de objetos  ·  Status: NEW / EXPAND (hub)  ·  Form: static

- **Parent — Pronombres redundantes y posición** (fronting/topicalization → required DOP echo; the *mandatory* IOP duplication). *Source: `spanish_pronoun_mechanics.md`*
- **Subpage — Partes del cuerpo y ropa** (article-vs-possessive; reflexive vs. IOP for who owns the body part). **Merge the duplicate pair.** You mentioned this may overlap existing coverage — check whether this is a NEW page or an EXPAND of something you already have; the notes spell out aspects (the prepositional "wall," body-part-as-subject) that may not be on the site yet. *Source: `Spanish_Body_Parts_Summary.md` + `Spanish_Grammar_Body_Parts_Clothing.md` (merge these two)*

---

## 5. El "Se"  ·  Status: FOLD into the queued **Tres Zonas de SE** page  ·  Form: static

Don't make a new page — this note is ready-made source material for the SE page already in your queue: accidental *se*, *pasiva refleja*, impersonal *se* + personal *a*. *Source: `spanish_se_constructs.md`*

---

## 6. Grados y cantidades  ·  Status: NEW (small hub or 3 standalones)  ·  Form: static

A natural trio about degree/quantity; *tan…como para* even links two of them.
- **Poco** — adverb (*poco claro*) vs. adjective (*poca paciencia*) vs. *un poco de*. *Source: `poco_mechanics.md`*
- **Como para** — *demasiado / suficiente / tan … como para* + the colloquial "looks like / in the mood for." *Source: `como_para_cheat_sheet.md`*
- **Tan / tanto** — comparatives of degree. *Source: `Spanish_Tan_Tanto_Guide.pdf`*

---

## 7. Standalone single-topic pages

- **De vs. a partir de** — static origin vs. forward trajectory; the "starting from" test. `NEW`. *Source: `de_vs_a_partir_de.md`*
- **Tener: idiomático vs. estructural** — *tener hambre* (fixed noun) vs. *tener + objeto + participio* (agreeing participle: *tengo los platos lavados*). `NEW`. Cross-link to Participios (§3). *Source: `tener_structural_vs_idiomatic.md`*
- **La elisión de "que"** — when *que* can drop. `REBUILD` to spec. *Source: `elision-de-que-v2.html`*
- **Hasta** — límite vs. inclusión ("even"). `REBUILD`; comes with example sentences ready. *Source: `hasta.html`, `pictures for HASTA page.txt`*
- **Trampas: venir vs. salir** — English-interference trap; fits the **Palabras Tramposas** family. `REBUILD`; comes with an image asset list. *Source: `trampa de salir y venir.html`, `images for salir y venir page.txt`*

---

## 8. Páginas dinámicas (input on the fly)  ·  Status: FEATURE (own mini-spec)  ·  Form: interactive

Not a topic page — an app pattern: enter/delete vocab live (a "vocab of the week," look-alike pairs like *dar/decir*, *dejar/decir*, *dime/di*). Same Drive-CRUD family as Palabras Tramposas / quiz-género; the look-alikes overlap that page's confusables concept. Spec it separately when ready. *Source: `dynamic pages idea.txt`*

---

## 9. Site icon / favicon  ·  Status: INFRA

Replace the current icon (and the Spain-flag assets, which clash with the neutral-LatAm identity). Icon options that read as "Spanish language" without picking a country, and that use the site's own fonts/palette:
- **An *ñ* monogram** — DM Serif Display *ñ* on deep navy with an accent-color tilde. The single most recognizable, country-neutral letter of Spanish. Top pick.
- **A *¿* glyph** — the inverted question mark: unmistakably Spanish, neutral, and thematically tied to the new Formación de Preguntas app.
- **An azulejo tile** — a single motif from the existing `azulejos.webp` background, tying the icon to the site's established look.
Mechanics (sizes, `<link>` tags, cache quirk) are covered in *Source: `favicon_guide.md`* + the existing PNG set (to be regenerated at 32 / 180 / 192 from the chosen mark). I can mock up the *ñ* or *¿* as an SVG/PNG whenever you want to see them.

---

## 10. Parking lot — Comprensión Lectora follow-ups (separate track, not a page)

Captured here so they're not lost; they belong with the CL work, not the topic pipeline.
- **Disputed quiz item** — a question keyed to answer D (Javier seizing all the gold) that the passage doesn't support; you picked A. A content-quality / grader-strictness issue to revisit. *Source: `Subjunctive triggers for futuer review.txt`*
- **Episode mis-sequencing bug** — JSON error on "generar siguiente," then *reintentar* regenerates an already-done episode and desyncs the count. Last time the «»-quotes fix made the JSON error stop occurring, so the desync never resurfaced; decide whether to harden the sequence logic or leave it. *Source: same file*

---

## Cross-cutting note

Every page built from these notes needs a **neutral-LatAm pass on intake** — strip voseo and Rioplatense lexis from examples unless a page is explicitly a dedicated regional one. This is a Gemini artifact, not a content choice.

---

*Roadmap only — nothing here is built or specced for build yet. Greenlight clusters one at a time; upload the named source file(s) when we start each.*
