# Spec — Strict structured output for the Gemini generation path

**Status:** filed for a later, standalone deploy. Not urgent — `parse-first` (already shipped) is the day-to-day safety net. This is the permanent fix that retires the malformed-JSON class of error on the Gemini side for good.

**Owner path:** `netlify/functions/generate.mts` (`handleGemini`) + `interactive/comprension-lectora.html` (`buildPrompt` / the story+quiz fetch body).

---

## 1. Problem being solved

The story+quiz generation occasionally returns JSON that fails `JSON.parse` (e.g. the "Expected ',' or '}' at position N" failure). Root causes are the usual JSON-in-free-text hazards: an unescaped straight quote, or a literal line break inside a string value.

- `parse-first` (shipped) stops the app's own cleaner from corrupting *valid* JSON, and keeps the cleaner as a fallback for genuinely broken output. Good mitigation, but it's still reactive — it can't fix output the model actually broke.
- **Strict structured output makes malformed JSON structurally impossible on Gemini.** The model is constrained to emit exactly the declared schema; the SDK guarantees parseable, schema-conforming JSON. The whole "clean then repair then maybe throw" path becomes dead code for Gemini.

**Claude is out of scope.** Anthropic has no equivalent hard-schema mode for plain completions. The Claude path keeps relying on `parse-first` + prompt discipline (see the companion "no straight quotes" prompt constraint, if adopted).

---

## 2. Design

Keep the schema logic in the **front end**, because that's where the ep1-vs-continuation branch (`needsEndingPlan`) already lives. `generate.mts` just forwards whatever schema the page sends.

**Front end** (`comprension-lectora.html`): build the response schema next to `jsonSchema`, using the same `needsEndingPlan` condition, and send it on the story+quiz fetch body as `response_schema`.

**Serverless** (`generate.mts` → `handleGemini`): if `body.response_schema` is present, add it to `generationConfig`. Leave `responseMimeType: "application/json"` in place (still required alongside a schema).

```js
// generationConfig additions in handleGemini:
generationConfig: {
  maxOutputTokens,
  ...(typeof body.temperature === "number" ? { temperature: body.temperature } : {}),
  thinkingConfig: { thinkingLevel },
  responseMimeType: "application/json",
  ...(body.response_schema ? { responseSchema: body.response_schema } : {}),
}
```

Use `responseSchema` (OpenAPI-3.0 subset) — well-supported, and it honors `propertyOrdering`, which we want so `passage` is emitted before `questions` (keeps the streaming UX: prose first, quiz after). `responseJsonSchema` (fuller JSON Schema) is the alternative if we later need `$ref`/richer constraints; not needed for this shape.

---

## 3. The schema

Two variants, matching the existing `jsonSchema` branches. `propertyOrdering` forces field emission order.

**Continuation variant (no `planned_ending`):**
```json
{
  "type": "object",
  "propertyOrdering": ["title", "passage", "questions"],
  "required": ["title", "passage", "questions"],
  "properties": {
    "title":   { "type": "string" },
    "passage": { "type": "string" },
    "questions": {
      "type": "array",
      "minItems": 6, "maxItems": 6,
      "items": {
        "type": "object",
        "propertyOrdering": ["question", "options", "correct", "answer", "explanation"],
        "required": ["question", "options", "correct", "answer", "explanation"],
        "properties": {
          "question":    { "type": "string" },
          "options":     { "type": "array", "minItems": 4, "maxItems": 4, "items": { "type": "string" } },
          "correct":     { "type": "integer", "minimum": 0, "maximum": 3 },
          "answer":      { "type": "string" },
          "explanation": { "type": "string" }
        }
      }
    }
  }
}
```

**Episode-1 / solo variant:** identical, plus `planned_ending` inserted after `passage` in both `propertyOrdering` and `required`:
```json
"planned_ending": {
  "type": "object",
  "propertyOrdering": ["thematic_core", "final_beat", "thread_resolution"],
  "required": ["thematic_core", "final_beat", "thread_resolution"],
  "properties": {
    "thematic_core":     { "type": "string" },
    "final_beat":        { "type": "string" },
    "thread_resolution": { "type": "string" }
  }
}
```

Build these as JS objects in `buildPrompt` (mirroring the `needsEndingPlan ? … : …` ternary) and attach to the returned config so the fetch body can include `response_schema`.

---

## 4. Caveats / what the schema can NOT do

- **Cross-field equality isn't enforceable.** The schema can't require `answer` to equal `options[correct]`. Keep the existing prompt instruction ("answer = exact copy of the correct option") **and** the client-side answer↔index reconciliation before shuffle. The schema guarantees *shape*, not *semantic* correctness.
- **Keep the natural-language `jsonSchema` block in the prompt too.** Belt and suspenders — it also carries the "no letters/numbers in option text", "answer must match", and length/register rules that the JSON schema can't express.
- **Thinking is compatible.** `thinkingConfig` + `responseSchema` coexist fine on 3.1 Pro. No change to the thinking-level work.
- **Streaming still works.** Fields stream in `propertyOrdering` order; the existing `text_delta` accumulator is unchanged.
- **`minItems/maxItems` enforcement** can occasionally make the model retry internally / cost a few more tokens. Acceptable.

---

## 5. Interaction with parse-first

Leave `parse-first` in place as the universal net. With the schema on, Gemini's raw output is reliably valid, so `parse-first`'s fast path hits every time for Gemini and the cleaner never runs for it. Claude keeps using `parse-first` + cleaner as today.

---

## 6. Test plan (live Netlify, both required)

1. Generate an **episode 1** on Gemini → confirm `planned_ending` present, 6 questions, 4 options each, `correct` ∈ 0–3, valid JSON on first parse (cleaner never invoked — add a temporary `console.debug` in the fallback branch to confirm it's not hit).
2. Generate a **continuation** (ep 2+) on Gemini → confirm NO `planned_ending`, everything else as above.
3. Confirm the **answer/correct reconciliation** still fixes any index/answer mismatch before shuffle.
4. Regression: generate on **Claude** → unchanged behavior (no schema sent, parse-first path as before).
5. Run ~5 stories to spot any `minItems` retry latency.

---

## 7. Rollout

Own deploy, separate from prompt-constraint or model-string changes, so any regression is cleanly attributable. One observable change.
