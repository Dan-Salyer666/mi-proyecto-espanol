# Image Generation Spec — Blue Monochromatic Vector Style (v2)

### For: Gemini image generator
### Style: 2D flat vector, "ligne claire", strict monochromatic blue
### v2 changes: removed the crop/negative-space instruction that was producing unwanted bars; added an explicit full-bleed frame rule; replaced the loose text option with a required 4-state TEXT MODE.

---

## How to use

Copy the **Master Prompt Template** below. Fill the bracketed `[VARIABLES]`. **TEXT MODE is required — never leave it blank.** If a TEXT MODE is not specified, **ask before generating; do not guess.**

---

## Master Prompt Template

Generate a **16:9** image. Style: **2D flat vector illustration** using *ligne claire* (clean, uniform dark outlines) characteristic of modern explainer animations. Minimal shading; rely on solid color blocks.

**COLOR PALETTE — strict monochromatic / analogous blue.** Deep navy or midnight blue for backgrounds; slate, steel, and denim blues for midgrounds and characters. **Do not use stark, bright white.** Use only pale, icy powder blues for highlights, contrast, and any text.

**FRAME — full bleed (mandatory).** The illustration fills the **entire 16:9 canvas, edge to edge.** **No letterbox bands, no borders, no margins, no empty colored strips at the top or bottom.** Do **not** leave negative space for cropping — the image is used at full canvas with no crop. The composition is centered and horizontal; keep the key subject roughly centered and clear of the extreme edges, but artwork (background, environment) must extend to all four edges.

> The only element ever permitted to sit in a bottom bar is a CAPTION (see TEXT MODE = `CAPTION BAR` / `BOTH`). Absent that, there are **no bars of any kind.**

**LAYOUT:** `[Single full-frame scene OR Diptych split-panel side-by-side]`

**SCENE DESCRIPTION:** `[Exact action, characters, environment. For a diptych, describe Panel 1 (Left) and Panel 2 (Right) explicitly.]`

**TEXT MODE (required — one of four):**

- **`NONE`** — No text anywhere. Pure full-bleed illustration. No bars.
- **`SPEECH BUBBLE`** — Character dialogue inside speech bubble(s) integrated into the scene. Provide the exact line(s) in quotes and say who speaks. No bottom bar.
- **`CAPTION BAR`** — One descriptive sentence in a dark, high-contrast footer bar spanning the bottom. Provide the exact string in quotes. **This is the only situation where a bar may appear.** Pale icy-blue text on a deep-navy bar.
- **`BOTH`** — Speech bubble(s) *and* a caption bar together. Provide both the bubble line(s) and the caption string.

---

## Example Executions

**Example 1 — Single scene, caption bar**
- LAYOUT: Single full-frame scene.
- SCENE DESCRIPTION: A man at a desk looking frustrated at a monitor showing abstract code lines.
- TEXT MODE: `CAPTION BAR` — caption: "EL AUTOR SEÑALA UN PROBLEMA".

**Example 2 — Diptych, no text**
- LAYOUT: Diptych split-panel.
- SCENE DESCRIPTION: Panel 1 (Left): a man driving a small blue car at night past a house. Panel 2 (Right): a man walking through a lamplit park at night.
- TEXT MODE: `NONE`.

---

## This page's five images — "Las cinco A"

Same style/frame block for all five. Single full-frame scene each. **TEXT MODE = `NONE`** for all five (the page supplies the words/definitions in HTML). Each scene is built to encode the word's *direction* so the image teaches the distinction, not just "a nice person".

Filenames → `assets/rasgos/`:

### amable.png — active courtesy, toward others
SCENE: A young man thoughtfully holding a large umbrella over an elderly woman carrying groceries in the rain. The focus is the active, polite gesture of helping someone else — warmth directed at another person. TEXT MODE: `NONE`.

### agradable.png — pleasant effect on the perceiver
SCENE: A cozy, warmly-lit reading nook; a person relaxed in a comfortable armchair with a book and a warm drink, radiating a calm, easy, pleasant atmosphere that puts the viewer at ease. The *mood of the space* is the subject — pleasantness as something experienced. TEXT MODE: `NONE`.

### alegre.png — internal joy, no audience
SCENE: A person completely alone in their kitchen, wearing headphones, dancing enthusiastically while cooking, with a bright genuine smile — pure internal joy and energy with no one else present. The joy points nowhere but outward from within. TEXT MODE: `NONE`.

### amigable.png — one person opening up to you
SCENE: A single welcoming person at a lively outdoor picnic, making eye contact with the viewer, smiling warmly and gesturing with an open hand to invite the viewer to come sit. One approachable figure, openness aimed at *you*. TEXT MODE: `NONE`.

### amistoso.png — friendship between two parties
SCENE: Two opposing players in different team jerseys at a sports field, smiling and shaking hands warmly before/after a friendly match — clearly two parties on good, non-hostile terms. The friendship is the *relation between them*, not one person's trait. TEXT MODE: `NONE`.

> Note the deliberate contrast between the last two: **amigable** = one figure opening outward to the viewer; **amistoso** = two figures in friendly relation with each other. That visual difference is the whole point.

---

*End of spec. Keep a copy in the project; upload before each image batch.*
