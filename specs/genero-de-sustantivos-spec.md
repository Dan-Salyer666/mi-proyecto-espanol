# Género de los Sustantivos — Build Spec

### Status: **BUILT through Phase 5** (reference page, seed, quiz scaffold, quiz engine, add-word box all deployed). See the AS-BUILT ADDENDUM at the end for changes made during the build that supersede the body where they conflict.
### Created: 2026-05-31
### Author: Claude + Daniel (discussion concluded this session)

---

## Purpose

Orient the build session for an interactive Spanish noun-gender review. Two pages:
a **static reference page** that teaches the gender-assignment system, and a
**Drive-backed quiz page** that drills it with a curated, prunable, growable
dataset. Every decision below was settled in discussion — this document is the
authority; do not re-invent directions. Where a point is explicitly flagged
*revisitable*, that's the only place open to change without a new conversation.

This spec **supersedes** the two Gemini source files (`spanish_gender_exceptions.md`,
`spanish_ambiguous_nouns_summary.md`). Their content is folded — with corrections
noted in §2 — into the seed dataset (§6). Delete those two files once the seed is
built and Daniel confirms.

---

## 1. Overview & the two pages

| Page | Location | Type | Spec it follows |
|---|---|---|---|
| Reference / review | `topics/genero-de-los-sustantivos.html` | Static, no API, no Drive | `single-topic-page-spec.md` |
| Quiz | `interactive/quiz-genero.html` | Dynamic, Google-Drive-backed | This document (the "other species") |

The reference page ends with an `Empezar quiz →` button linking to the quiz page.
The quiz page reuses Comprensión Lectora's Drive integration pattern, not the
single-topic spec.

Dataset file on Drive: `MyDrive/Spanish learning/genero/genero-dataset.json`
(path revisitable). A single JSON file, loaded into memory once per session.

---

## 2. Classification system (the linguistic content)

This drives both the reference-page teaching **and** the data tagging.

### 2.1 The mnemonics
- **LONERS** — endings **-l, -o, -n, -e, -r, -s** tend **masculine**. The **S applies
  to singular nouns only** (el mes), never plurals. **-e is the weakest letter** —
  large feminine exception set.
- **DIÓNZA** (D-IÓN-Z-A) — endings **-d, -ión, -z, -a** tend **feminine**. Note
  **-ión ≠ -ón**: *la canción* (feminine) but *el avión, el camión, el corazón*
  (masculine).
- Finer feminine endings to teach under DIÓNZA as the fine print it compresses:
  **-dad/-tad, -tud, -umbre, -ie, -sis, -itis**. (Counter-exceptions to -sis:
  *el análisis, el énfasis, el paréntesis, el oasis* are masculine.)

### 2.2 The -ma split
Greek-origin neuter `-ma` nouns entered Spanish **masculine** (*el problema, tema,
sistema, idioma, clima, programa, fantasma…*). Ordinary native `-a` nouns that
happen to end `-ma` stay **feminine** (*la cama, la rama, la pluma*). Teach as a
**learnable list with a tendency**, not a derivable rule.

### 2.3 The phonetic-mask group ("el agua")
Feminine nouns beginning with a **stressed a-/ha-** sound take **el** (and **un**)
in the **singular only**, for euphony. The word **stays feminine** everywhere else:
*las aguas*, *el agua negra*, *un águila majestuosa*. Only **stressed** initial a-
qualifies (*el agua* but *la abeja*, *la harina* — unstressed → normal *la*).
Members for the seed: agua, águila, alma, área, arma, aula, hacha, hambre, ala,
ancla, asa, hada, haba, habla, arpa, acta, ave, asma, ascua, aria, arca, hampa.

### 2.4 The "ambos" families — answer is **AMBOS** in the quiz
Three sources, all stored `articulo: ambos`:
1. **Común en cuanto al género** (article tracks the person): -ista (periodista,
   artista, dentista, turista), -ante/-ente (estudiante, cantante, representante,
   gerente), -a person nouns (atleta, colega, guía), -o/consonant person nouns
   (modelo, testigo, joven, portavoz). This is the "ista group" Daniel referenced
   — all behave identically, not filtered separately.
2. **Ambiguous things** (same meaning, either article): mar, azúcar, arte,
   internet, maratón. Carry a `contexto` usage note.
3. **Regional España-vs-LatAm splits** (the *only* permitted regional divider —
   no sub-regional tags): sartén, sauna, tilde, terminal, armazón, interrogante.
   Carry a `contexto` with the España/Latinoamérica split.

### 2.5 Epicenes — answer is the real fixed gender, **no hint**
One fixed grammatical gender regardless of referent's sex: *la víctima, la persona,
el personaje, la criatura*. Tested **raw** (Daniel learns them by being wrong).
Tagged `epiceno` so they can't be pruned (see §3).

### 2.6 Homographs — split into TWO entries, each with a sense hint
Gender changes meaning → two distinct words. Each sense is its own entry with a
short Spanish `contexto` and its own gender. Known set to seed: cura (sacerdote/
remedio), capital (dinero/ciudad), moral (árbol/ética), radio (medida·aparato/
emisora), frente (de batalla/de la cara), orden (secuencia/mandato), corte (un
corte/tribunal), pendiente (arete/cuesta), coma (médico/signo), cólera (enfermedad/
ira), policía (agente/cuerpo). Hints are terse, e.g. cura → *"el sacerdote"* vs
*"el remedio"*.

### QA corrections to the Gemini files (already reflected above)
- **sartén** appears in both Gemini files — it is a **regional ambiguous** noun
  (`articulo: ambos` + España/LatAm hint), **not** a feminine LONERS exception.
- **capital, moral, radio** were buried in the exceptions list — they are
  **homographs** (split, hinted), not simple feminines.
- The `-ma` words inside the exceptions list get **both** tags (`ma` + `excepcion`).
- **reuma, aneurisma** are gender-ambiguous `-ma` words → use the **modern standard
  (masculine)** in the quiz; **front-page note** that the historical feminine exists.
  Not tested as ambiguous.
- **calor** and the within-Spain / archaic / legal set (pringue, linde, dote,
  agravante/atenuante) → **standard form only** in the quiz; variant **noted on the
  front page**, never quizzed as ambos.
- **bebé** → two entries (see §3): `el` + "España" hint, and `ambos` + "América"
  hint. Front page presents bebé as the textbook epiceno-masculino (Spain) →
  común-en-cuanto-al-género (América) straddle.

---

## 3. Data model (the JSON dataset)

Each entry:

| Field | Values | Role |
|---|---|---|
| `palabra` | string, shown **bare** (no article) | display; dedupe key (normalized) |
| `articulo` | `el` \| `la` \| `ambos` | **the graded answer** |
| `genero` | `m` \| `f` \| `ambos` | drives the masculino/femenino **indicator** |
| `dificultad` | `facil` \| `dificil` | weight |
| `contexto` | string (usually `""`) | hint shown for outliers |
| `tags` | string[] | drill membership / protection |

**Article vs gender are independent.** For all but the phonetic-mask group they
coincide (el↔m, la↔f). The mask group is the only divergence: `articulo: el`,
`genero: f`. Ambos words: `articulo: ambos`, `genero: ambos`.

**Tag vocabulary (controlled):** `ma`, `el-agua`, `excepcion`, `regla-ok`, `epiceno`.
There is **no `ambos` tag** — the Ambos drill selects on `articulo === "ambos"`.

**Dedupe** is on the **normalized** `palabra` (lowercased, accents stripped); the
canonical accented form is stored. Homograph and bebé pairs share a normalized key
and are **seed-only**; the add-box blocks re-adding any word whose normalized form
already exists.

**Removability predicate** (X enabled only when all three hold):
```
articulo ∈ {el, la}  AND  contexto === ""  AND  tags.length === 0
```
This makes every curated/confusing word a **permanent resident** (greyed X,
demote-to-fácil only) and leaves **fluff + user-added words** removable. The
`epiceno` tag exists specifically to protect epicenes, which would otherwise look
like plain fluff. `regla-ok` protects the Option-B follower anchors (§6).

---

## 4. Reference page (Phase 1) — proposed structure

Built to `single-topic-page-spec.md`: Spanish-primary chrome, English NOTA blocks,
neutral-voice TTS, one background pattern, one accent trio. Proposed content cards
(confirm section count + NOTA placement at build, per that spec):

1. **LONERS** — masculine endings, with the singular-S caveat (NOTA on why S is
   singular-only).
2. **DIÓNZA** — feminine endings + the finer endings it compresses; the -ión vs -ón
   trap (NOTA).
3. **Las terminaciones en -ma** — Greek-masculine vs native-feminine; the learnable
   list (NOTA on origin, and the historical-feminine note for reuma/aneurisma).
4. **El agua — la máscara fonética** — the stressed-a article rule; *las aguas / el
   agua negra* stay feminine (NOTA on scope: singular definite/indefinite only).
5. **Ambos: común en cuanto al género** — the -ista/-ante/-a/-o families.
6. **Ambiguos y regionales** — mar (literario/común), azúcar, arte, internet,
   maratón; the España-vs-LatAm splits; the calor-type "standard vs colloquial"
   footnote.
7. **Epicenos y homógrafos** — fixed-gender-regardless-of-sex vs same-spelling-
   different-gender-different-meaning; bebé as the epiceno→común straddle.

`Empezar quiz →` button at the bottom, linking to the quiz page.

---

## 5. Quiz page — UX spec (Phases 3–5)

### 5.1 Selection screen
Single-select **mode** (one tap) × **count** (10 / 20 / 40), then `Empezar`.
Modes:
- **Sin filtro** — all words
- **Difíciles** — `dificultad === "dificil"`
- **Ambos** — `articulo === "ambos"`
- **Terminaciones en -ma** — `tags` includes `ma`
- **Excepciones a LONERS/DIÓNZA** — blended (see below)
- **Cambiadores fonéticos** — `tags` includes `el-agua`

Difficulty is **not** layered onto themed modes (kept to one tap, per Daniel's
"that's the extent of filtering"). *Revisitable.*

**Exception-blend mechanic:** 50% drawn from `excepcion`-tagged words, 50% from
**rule-followers** = `articulo ∈ {el,la}` AND `tags` excludes both `excepcion` and
`el-agua` (i.e. fluff + `regla-ok` anchors + grammatically-regular epicenes). Odd
counts give the extra slot to the exception half. Same-ending contrast is what makes
this drill useful — see §6 seed composition.

**Insufficient-words guard:** after mode+count is chosen, verify the pool can fill
the request (and for the blend, that **both halves** can be filled). If not, block
start with a message naming what to add, e.g. *"No hay suficientes palabras difíciles
— agrega más o elige otro modo."*

### 5.2 The answer mechanic
- Word shown **bare**. Three answer buttons: **EL / LA / AMBOS** (graded on
  `articulo`).
- Two indicator chips above the box: **masculino / femenino**. On every answer the
  chip matching the word's true `genero` lights (both chips for `ambos`), in a
  **third color** = accent blue (`--accent`), distinct from the green/red answer
  feedback. (Amber is the revisitable alternative.)
- Correct answer → entry field flashes **green**; wrong → **red**. (Add muted
  `--correct` green and `--wrong` red; avoid neon/Bootstrap shades per the design
  system's forbidden list.)
- After answering: flash + indicator → **~1.2s pause** (tunable) → auto-advance to
  next question. No manual "next" button.
- The phonetic-mask payoff: *agua* → correct button **EL**, chip that lights
  **femenino**. The "I said EL but it's feminine?" beat is the lesson.

### 5.3 Pre-answer flagging (all interaction happens before answering)
Next to the word: **fácil / difícil** toggles (show current state, tappable) and an
**X** removal toggle (greyed when the word is not removable per §3).
- Tapping an enabled X → confirm popup: *"Sí, eliminar al terminar"* / *"Cancelar."*
  Cancel returns untoggled; confirm returns with X **armed**. Tapping an already-
  armed X disarms it (no popup).

**Resolution at the moment of answering:**

| X armed? | Answer | Result |
|---|---|---|
| No | correct | keep status; apply fácil/difícil flag if set |
| No | wrong | auto-promote to **difícil** (overrides any fácil set this question) |
| Yes | **correct** | stage **removal** at end of quiz |
| Yes | wrong | **cancel removal** AND auto-promote to **difícil** |

(The "earn the deletion by answering it right; miss it and it survives *and* gets
marked hard" behavior is intentional.)

Note this **supersedes** the earlier "X consumes an unscored slot" idea: every
question is answered and scored normally; removal is a post-quiz flag, and
"eliminadas" is a separate tally.

### 5.4 End of quiz
- Stats popup: overall score (N correctas / total), the **list of missed words**
  (palabra + correct article + gender), and the **eliminadas** count. Close button.
- Then a **single batched Drive write** applies: misses→difícil, manual fácil/difícil
  changes, and removals (armed + answered correctly).
- During the write: **"Espera…"** indicator, and the selection/`Empezar` controls
  **greyed** until the write completes. Verify the Drive connection is alive before
  writing; reconnect if stale (same behavior as the reader app).

### 5.5 Add-word box (bottom of page)
- Word input → dedupe check on normalized `palabra`. Duplicate → blocked with an
  indication; not a duplicate → popup with **[EL] [LA]** (mutually exclusive) +
  **[Fácil] [Difícil]** + **[Confirmar] [Cancelar]**.
- No AMBOS, no context, no tags — adds are cleanly-gendered only (EL→`m`, LA→`f`,
  `tags: []`, `contexto: ""`). All added words are therefore removable.
- **Write timing:** the add-box writes **immediately on confirm** (single small
  write, *"Guardando…"* indicator, controls disabled until done), because it runs
  outside the quiz flow. The in-memory dataset updates so the new word is instantly
  quizzable. *Revisitable* — could stage instead, but immediate is the chosen
  default.

### 5.6 Drive integration
Reuse Comprensión Lectora's pattern wholesale: the **connect box + status indicator
at the top of the page**, the `driveRequest()` wrapper, and the OAuth token-error →
reconnect path (silent refresh when the session is still valid; Google's consent
popup only on genuine re-auth — same as the reader app, by design, not a regression).
The dataset is fetched into memory on page load after connect; both the quiz and the
add-box operate on the in-memory copy.

---

## 6. The seed dataset — composition & sizing

Principle: **Claude proposes and tags; Daniel curates and cuts.** Target ~200–250
entries so every mode runs a 40-question quiz with headroom for pruning:

- **~80–120 fluff** — ending-diverse, rule-following, cleanly-gendered common nouns,
  untagged, removable. Cover L/O/N/E/R/S and d/ión/z/a as *followers*.
- **Curated outliers ~80–100:**
  - `ma` — Greek-masculine (`ma`+`excepcion`) + a few native-feminine contrasts
    (la cama/rama/pluma → `ma` only); reuma/aneurisma → `el`, `ma`+`excepcion`.
  - `el-agua` — the §2.3 list, `articulo: el`, `genero: f`.
  - `excepcion` — LONERS/DIÓNZA breakers that aren't -ma (la mano, la flor, la sal,
    la miel, la mujer, el día, el sofá, el mapa, el avión, el lápiz, el arroz…).
  - `articulo: ambos` — común-en-género people (ista/ante/etc.), ambiguous things
    (mar, azúcar, arte, internet, maratón; with `contexto`), regional splits
    (sartén, sauna, tilde, terminal, armazón, interrogante; with `contexto`).
  - homograph pairs (`contexto`, two entries each) — §2.6 list.
  - `epiceno` — víctima, persona, personaje, criatura (raw, no hint).
  - **bebé** — two entries: `el`+"España", `ambos`+"América".
- **~30–40 `regla-ok` protected followers** (Option B, chosen this session) —
  ending-matched rule-followers that mirror the exception endings (e.g. el papel/
  árbol/hotel against la sal/miel/piel; la canción/nación against el avión). These
  are **permanent** so the exception blend keeps its same-ending contrasts no matter
  how much fluff Daniel prunes.

---

## 7. Build phases (one observable change per deploy; field-test each)

1. **Reference page** — static, no Drive. Lowest risk, ships value first. Includes
   the quiz button (pointing at the planned URL).
2. **Seed dataset** — build the JSON (§6), Daniel curates, commit to repo as
   canonical, upload to Drive as the live file. Retire the two Gemini files.
3. **Quiz scaffold — Drive plumbing only** — connect box + status, load + display
   ("X palabras, Y difíciles"). No quiz logic. Proves connect/fetch/reconnect in
   isolation.
4. **Quiz engine** — selection screen + guard, the EL/LA/AMBOS loop with gender-chip
   feedback, pre-answer flagging + X resolution table, auto-advance, end-stats popup,
   the single batched write with Espera/grey.
5. **Add-word box** — dedupe + EL/LA + Fácil/Difícil popup + immediate write.
6. **Index wiring** — under Gramática + back-nav cleanup.

---

## 8. Open / deferred / revisitable

- Gender-chip color: accent blue (default) vs amber.
- Auto-advance delay: ~1.2s, tune in the field.
- Difficulty layered onto themed modes: deliberately omitted; revisit if wanted.
- Add-box write timing: immediate (default) vs staged.
- A future dedicated **epiceno** drill mode (the tag already supports it).
- A new homograph sense via the add-box is unsupported by design (rare; edit JSON).

---

## 9. Index wiring

Reference page indexed under **Gramática** (per `index-categorization.md` — this is
forms/usage of nouns, a grammar topic). The quiz page is reached via the reference
page's button; whether it also gets its own index entry under
Cuestionarios y Práctica is a Phase-6 decision.

---

*End of spec. Commit to the project folder before Phase 1. Supersedes
`spanish_gender_exceptions.md` and `spanish_ambiguous_nouns_summary.md` once the seed
is built and Daniel confirms their deletion.*

---

## AS-BUILT ADDENDUM (post-Phase-5)

Changes made during the build. Where these conflict with the body above, **these win.**

### Files (all deployed)
- `topics/genero-de-los-sustantivos.html` — static reference. No TTS, no images (dropped per Daniel). Quiz CTA is a compact teal pill at the **top**, above the "Antes de empezar" caution band.
- `interactive/quiz-genero.html` — quiz engine + add-word box, self-contained, embeds the seed.
- `index.html` — gender page under Vocabulario → Sustantivos (2 páginas); quiz under Cuestionarios y Práctica → Entrenamiento Independiente (hub count → 7).
- Seed reference copy lives in the project folder; the two Gemini files are now superseded and can be deleted.

### Data model — additions to §3
- New field **`definicion`** (English gloss). Shown **only after answering**, in the lower zone of the word card. Homographs get sense-specific definitions.
- New top-level field **`contentRev`** (integer, currently **3**). Drives the migration below. Bump it whenever curated `contexto`/`definicion` values change.
- `schemaVersion` = 2.

### Drive scope reality (supersedes "you upload it" in §1/§6)
Scope is `drive.file`, so the app only sees files **it** created (same CLIENT_ID as Comprensión Lectora). Daniel does **not** upload the dataset by hand. The curated seed is **embedded** in `quiz-genero.html`; on first connect the app creates `Spanish Learning/Genero/genero-dataset.json` from it. The Drive copy is then source of truth.

### Schema/content migration (replaces "delete the Drive file" for content changes)
`loadDataset()` runs `migrateCuratedContent()` when the Drive file's `contentRev` < the embedded seed's. It patches **only `contexto` and `definicion`** of curated words (matched by `palabra|articulo|genero`), leaving `dificultad` and user-added words untouched, then saves once. Deleting the Drive file is only needed for breaking structural changes, not content edits.

### Hint principle (learned during build)
Pre-answer `contexto` must **never reveal the article** — no "el/la" splits, no Spain-vs-LatAm article splits. Those telegraph an AMBOS answer. The article/regional/usage detail lives in **`definicion`** (post-answer). Homograph hints (meaning cues like "sacerdote") are fine pre-answer. `arte` uses `(phonetic)` as a neutral cue. `bebé` keeps a minimal regional cue (España/América) only to disambiguate its two same-spelling entries.

### Quiz UX (supersedes §5.2–5.3 auto-advance)
- **No auto-advance.** A **Continuar →** button (centered under the answer row, disabled until answered) drives progression.
- **Audio:** the bare word (never the article) is spoken automatically on appear via SpeechSynthesis, neutral Latin-American voice, with a 🔊 replay button; short Web-Audio beeps on answer (higher = correct, lower = wrong).
- **Definition reveal:** word card splits — word + hint on top, reserved lower zone that reveals the English definition after answering.
- **Flag logic finalizes at Continue, not at answer:**
  - Correct answer → Fácil/Difícil and Eliminar stay editable during the pause. Post-answer Eliminar arms with a plain toggle (no popup, gate already met); arming it greys the difficulty buttons. Pre-answer Eliminar keeps its confirmation popup.
  - Wrong answer → forced `dificil`, all flags locked, any pre-answer removal flag dropped.
  - Removal only commits if armed when Continue is pressed (so only after a correct answer).
- Selection: single mode × count (10/20/40); random selection + order each run; insufficient-words guard (e.g. el-agua supports 10/20, not 40); Excepciones is a 50/50 blend of `excepcion`-tagged + rule-followers.
- End: stats modal (score, eliminadas, missed list) + single batched Drive write ("Espera/Guardando…", Cerrar disabled until done).

### Add-word box (Phase 5, as built)
Bottom of selection screen. Dedupe on normalized `palabra` (accent/case-insensitive). Entry popup: Artículo EL/LA (required), Definición (inglés) text field, Dificultad Fácil/Difícil (default Fácil). Writes **immediately** to Drive on Confirmar (rolls back in memory on failure). Added words are untagged el/la → removable, appear in Sin filtro / Difíciles only.

### Remaining (Phase 6)
Index wiring done. Back-nav done (quiz has two links: Menú principal · El género de los sustantivos). Optional later: site-wide back-arrow batch, an epicene drill mode (tag exists), tag-setting in the add box.
