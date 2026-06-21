# Mi Proyecto Español — Verbos: Going-Forward Organization
### Created: June 2026
### Status: ACTIVE — governs how new verb pages slot into Vocab → Verbos
### Companion to: `index-categorization.md`, `single-topic-page-spec.md`, `page-roadmap.md`

---

## 1. Purpose

Two shapes of verb page now exist on the site, and they grow at different rates. This doc decides where each one lives so the **Vocab → Verbos** sub-bucket stays a short, scannable list instead of turning into a wall of individual links. Hand this file to any future session alongside `index-categorization.md` and a new verb page slots in without re-litigating the structure.

The whole point: **one extra click is cheaper than a list of twenty.**

---

## 2. The two content shapes

**A. Single-verb deep dive** — one verb, many contexts and frames.
- Examples: *esperar* (wait/hope/expect); the planned explorers for *quedar, echar, llevar, meter, dar*; eventually a rebuilt *poner*.
- Source format: a `.md` like `esperar-uso.md` — numbered frames, NOTA points, example sentences, frame/contrast tables.
- **Growth: unbounded.** You keep finding verbs that earn their own page. This is the list that explodes if left flat.

**B. Thematic cluster** — a small *named set* of verbs grouped by what they **do**.
- Examples: *Tema del Movimiento*, *Los Verbos de Demostración*, *Prestar y Pedir Prestado*, and the new breaking/damaging set (*romper, dañar, estropearse, averiarse, pudrir(se)…*).
- Each is a meaty multi-verb page that takes real work to assemble.
- **Growth: bounded and slow.** There will never be twenty of these.

---

## 3. The rule

| Shape | Home | Why |
|---|---|---|
| **Single-verb deep dive** | Child of **one hub page** | Unbounded set → hub it, so the index shows one entry no matter how many verbs |
| **Thematic cluster** | **Flat link item** in Vocab → Verbos | Bounded, slow-growing → an extra click would be over-engineering |

---

## 4. The hub: "Verbos en Profundidad"

One parent page collects every single-verb deep dive.

- **File:** `topics/verbos-en-profundidad.html` (slug adjustable — shorten to `verbos-a-fondo` if the subpage names get unwieldy).
- **Index wiring:** a **single** `<a class="link-item">` in the Vocab → Verbos sub-hub, per `index-categorization.md` → *How to Add — Existing Bucket*. This one entry stands in for the entire deep-dive library.
- **What the page is:** a *light* single-topic page — title card + a short intro paragraph + a `.subpage-links` grid of verb cards (single-topic-page-spec §13c). It has **no content cards of its own** beyond the intro; its job is to be the discovery surface for the verbs.
- **Each verb = a subpage:**
  - File: `topics/subpages/verbos-en-profundidad-<verb>.html` (e.g. `…-esperar.html`).
  - Back-nav: `← Volver a Verbos en Profundidad` → `../verbos-en-profundidad.html`.
  - Asset paths: `../../assets/…`.
  - Built **verbatim to `single-topic-page-spec.md`** — Spanish-primary chrome, English NOTA layer, rate bar, neutral-only TTS, one background pattern, one accent trio.
- **Subpages are NOT individually wired into `index.html`.** The hub is the only index entry; discovery happens *on* the hub page. **This is the mechanism that keeps the sub-bucket flat.**

---

## 5. The single-verb pipeline (repeatable)

1. **Draft** the verb as a `.md` — frames, NOTA points, example sentences, contrast tables. `esperar-uso.md` is the template.
2. **Build** it to `single-topic-page-spec.md` as a subpage of the hub:
   - numbered sections → content cards
   - NOTA blocks → NOTA boxes (English explainer layer, Spanish terms italicized inside)
   - frame/contrast tables → decision guides
   - every example sentence → an `.example-es` row with a 🔊 button (correct Spanish only in the spoken line)
3. **Add** a verb card to the hub's `.subpage-links`. No `index.html` change.
4. **Validate** per project discipline: `node --check` on extracted JS, tag-balance counter, grep the named feature markers.

---

## 6. Thematic clusters stay flat — and when to revisit

- **Adding one:** a single `<a class="link-item">` in the Vocab → Verbos sub-hub + bump the `sub-hub-count`. (`index-categorization.md` → *How to Add — Existing Bucket*.) Built to `single-topic-page-spec.md` like any topic page.
- **Trigger to reconsider:** if flat thematic verb pages ever exceed **~6–7**, stand up a parallel **"Verbos por Tema"** hub and migrate them in (same parent→subpage convention as §4). Until then, flat beats an extra click.

---

## 7. Cleanup of the two legacy pages

- **`Verbos con Que-` → remove.** Not useful; predates the single-topic format. Delete the link item, decrement the sub-hub count, archive the file. Do it anytime.
- **`Familia de Poner` → rebuild, don't delete.** *poner/ponerse* is worth keeping and overlaps the planned **meter** explorer (meter/poner are a natural pair). When the hub exists, rebuild *poner* to spec as a hub child — consider merging *poner + meter* into one explorer. Pull it from the flat list at that point. Not urgent.

---

## 8. Where the roadmap's verb explorers land

The Verb Depth Explorer pages on the horizon — **quedar, echar, llevar, meter, dar** — are all single-verb deep dives, so they all become **children of the Verbos en Profundidad hub**. *esperar* is the first child and the pattern-setter.

---

## 9. Net effect on the index

Vocab → Verbos goes from "every verb is its own link" to:

- **Verbos en Profundidad** ← hub; holds N single-verb pages, costs 1 index entry
- **Tema del Movimiento**
- **Los Verbos de Demostración**
- **Prestar y Pedir Prestado**
- *(Familia de Poner — interim, until rebuilt into the hub)*
- *(new thematic clusters as added — e.g. the breaking/damaging set)*

One entry per theme, plus one entry for the entire deep-dive library — regardless of how many individual verbs accumulate inside.

> When the hub ships, update the *Quick Reference — Current State* block in `index-categorization.md` to reflect it.

---

*End of doc. Commit a copy to the project folder once approved.*
