# Comprensión Lectora — Phase 4: Provider Persistence + Indicator

### Status: **SPEC — not yet built**
### Target file: `comprension-lectora.html` (single file, no function changes)
### Batching note: This is a **small** edit. It is intended to ship **bundled** with the next round of changes (new Modo de Generación module + the seeding idea, still being scoped) in **one deploy**, so the file is touched and pushed once rather than across multiple deploys.

---

## Why this exists

Two linked gaps, both rooted in one missing persisted field (`generator`):

1. **No generator persistence.** The generator the user picks (`cfg.generator`) drives the prep and prose calls, but it is never written to the Drive save record and never restored on resume. A story started on Gemini, saved, then resumed in a fresh session (e.g. a different device) silently reverts to the Claude default — a provider/voice break mid-story. This is the cause of the "moved devices and it slowed down / looked like a Claude generation" symptom: the resumed episode *was* Claude.

2. **No provenance indicator.** A finished story gives no on-page signal of which model wrote it. The user wants to look at any story and immediately know the author.

Fixing (1) makes (2) honest: once `currentCfg.generator` is reliably correct on resume, a badge that reads it is automatically correct, including for the future Review Portal (which reads the saved record).

---

## Design decisions (locked)

- **Single provider per story, start to finish.** The original `storyPlan` (locked ending + beat_plan) is reused on resume — the prep call does **not** re-fire — so restoring the original generator means same model + same plan + same ending throughout. No re-planning, no risk of a second provider rewriting the ending.
- **Legacy default = Claude.** Any saved record lacking the `generator` field was made when Claude was the only path; `|| 'claude'` resolves it correctly. (One-time edge: a Gemini story started *before* this ships lacks the field, so resuming it post-fix defaults to Claude. Affects in-flight stories only.)
- **Badge is a pure indicator.** Static pill, no interactivity. Distinct color per model so it reads at a glance.
- **Badge color = warm vs. cool.** Claude = warm terracotta (brand-aligned). Gemini = cool indigo/violet (brand-aligned, and deliberately distinct from the page's existing `--accent` blue so it doesn't read as a generic tag).
- **Badge placement.** Appended to the existing `#qTags` row, which renders directly above the passage text. Own class (`.gen-badge`), visually distinct from the level/register `.tag` pills.

---

## Fix 1 — Generator persistence (3 touch points)

### 1a. Write it to the save record
In `saveQuizToDrive` (the `record` object, ~line 2785). Anchor on the existing module line and add the generator field beside it:

```js
    module: currentCfg.module || 'sorprendeme',
    generator: currentCfg.generator || 'claude',   // ← ADD
```

### 1b. Restore the value on resume
In `resumeStory` (~line 2931, beside the existing module restore). Add:

```js
  cfg.module = s.module || 'sorprendeme';
  cfg.generator = s.generator || 'claude';   // ← ADD
```

### 1c. Restore the button highlight on resume
In `resumeStory`, immediately after the existing module-button sync block, add a parallel block for the generator buttons:

```js
  // (existing) module highlight sync
  document.querySelectorAll('[data-module]').forEach(b =>
    b.classList.toggle('selected', b.dataset.module === cfg.module)
  );
  // ← ADD: generator highlight sync
  document.querySelectorAll('[data-generator]').forEach(b =>
    b.classList.toggle('selected', b.dataset.generator === cfg.generator)
  );
```

> Mid-story locking already works for free: the Claude/Gemini buttons carry the `.btn-module` class, which `lockParams()` already disables.

**No serverless function changes.** The prose call already reads `provider: currentCfg.generator || 'claude'`. Restoring the field is sufficient.

---

## Fix 2 — Provider badge (2 touch points)

### 2a. CSS — add the badge rule
Add near the existing `.tag` rule (~line 561). Pill shape mirrors `.tag`; colors are the only distinction. Both readable on the `--bg-deep #0a1628` navy palette.

```css
    .gen-badge {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid transparent;
    }
    .gen-badge.gen-claude {
      background: rgba(217, 119, 87, 0.15);
      border-color: rgba(217, 119, 87, 0.50);
      color: #e8a589;                /* warm terracotta */
    }
    .gen-badge.gen-gemini {
      background: rgba(124, 132, 255, 0.15);
      border-color: rgba(124, 132, 255, 0.50);
      color: #aab2ff;                /* cool indigo/violet */
    }
```

### 2b. Render the badge in `renderQuiz`
In `renderQuiz` (~line 2149), right after the `#qTags` innerHTML line, append the badge so it sits in the tag row above the passage:

```js
  document.getElementById('qTags').innerHTML = tags.map(t => `<span class="tag">${t}</span>`).join('');
  // ← ADD: provider provenance badge
  const genLabel = currentCfg.generator === 'gemini' ? 'Gemini' : 'Claude';
  document.getElementById('qTags').insertAdjacentHTML('beforeend',
    `<span class="gen-badge gen-${currentCfg.generator === 'gemini' ? 'gemini' : 'claude'}">${genLabel}</span>`);
```

> Reads `currentCfg.generator`, which Fix 1 guarantees is correct on both fresh generation and resume.

---

## Build / deploy notes

- **Edit size:** ~6 added lines of JS + 1 CSS block. Surgical `str_replace` on each anchor. No rewrites, no function edits.
- **Tag-balance check** after splices is trivial here (no structural HTML added beyond one inline `<span>` template).
- **Authoritative test env is Netlify**, not local — Drive save/load and the resume path require the real origin.
- **Field test:**
  1. Start a Gemini story (Fija, 3+ parts), generate part 1, confirm the **Gemini** (indigo) badge shows above the passage.
  2. Save, reload the page (or a second device), resume from Drive.
  3. Confirm the Generador button restores to **Gemini** (highlighted + locked) and part 2 generates on Gemini (fast token bar, indigo badge persists).
  4. Repeat with a Claude story → **Claude** (terracotta) badge.
  5. Resume a pre-fix saved story → defaults to Claude badge, no crash (legacy path).

---

## When this gets folded back

Once built and field-tested, the relevant parts of this spec become an **AS-BUILT ADDENDUM** to `comprension-lectora-state.md`, replacing the "Phase 4 — generator persistence (deferred)" open item there. The new-module and seeding work (separate scope) get their own addendum lines in the same state doc.
