# Build Spec — "Cómo Pedir Comida y Bebida"
### Single-topic reference page · Mi Proyecto Español
### Status: locked, ready to build · Drafted June 2026

---

## 0. How to use this file

This is the **page-specific** spec. All boilerplate — fonts, CSS variables, card/NOTA/rate-bar/decision-guide/modal CSS, the magnify JS, the modal JS — is inherited **verbatim** from `single-topic-page-spec.md`. This file specifies only what is particular to this page: identity, token choices, the seven cards' actual content, one component extension (a three-column Guía Rápida), and the image package.

When building: read `single-topic-page-spec.md` first, then assemble this page from the content below. Validate with `node --check` on extracted JS and a tag-balance check after each edit, per project discipline.

---

## 1. Identity & pathing

| Field | Value |
|---|---|
| File | `topics/pedir-comida-y-bebida.html` |
| Location | `/topics/` |
| Back nav | `<a href="../index.html" class="back-nav">← Volver al menú</a>` |
| Image folder | `/assets/pedir/` → referenced from this page as `../assets/pedir/[filename]` |
| Index wiring | Deferred — wire into the **Gramática** (or **Vocabulario**) hub as a separate step after the build is verified live. Not part of this file's build. |

---

## 2. Token choices for this page

- **Background pattern:** Option B — Quatrefoil (`60px 60px`), opacity `0.10`. (Swap to a less-recently-used pattern if B was used on the last build.)
- **Accent trio:** **Trio 4 — Blue / Violet / Gold**, plus a `--accent-delta` of teal for the 4th rotation slot.
  ```css
  --accent-alpha: #4a90d9;  /* blue   */
  --accent-beta:  #c084fc;  /* violet */
  --accent-gamma: #fbbf24;  /* gold   */
  --accent-delta: #4ecdc4;  /* teal   */
  ```
  Add the delta rule alongside the alpha/beta/gamma rules in Section 14:
  ```css
  .card-delta { border-left-color: var(--accent-delta); }
  .card-delta .card-number { color: var(--accent-delta); opacity: 0.75; }
  ```
  **No orange** anywhere in the trio — deliberate, so the orange `reg-rio` badges always read against a non-orange border.
- **Card → theme cycle** (7 cards, 4 colors): ① alpha · ② beta · ③ gamma · ④ delta · ⑤ alpha · ⑥ beta · ⑦ gamma.
- **TTS:** Neutral-only JS (Section 10 default). **Do not** use the dual-voice variant. `data-region="rioplatense"` rows are tagged for forward-compatibility but play neutral.
- **Scripts to include before `</body>`:** neutral TTS (Section 10), magnify (Section 11 — images present), Guía Rápida modal (Section 12).

---

## 3. Title card

- **Overline:** `Vocabulario`  *(if you'd prefer a more pragmatic label than "Vocabulario", flag it — but Vocabulario is the safe approved value.)*
- **h1:** `Pedir Comida y Bebida` (plain — no `.vs` contrast)
- **Ornament symbol:** `❧`
- **Subtitle:** `Qué verbos funcionan, cuáles evitar y cómo cambia el registro según el lugar, con una sección dedicada al español rioplatense.`
- **Guía Rápida badge:** yes — `⚡ Guía Rápida`

## 3a. Intro paragraph (between title card and rate bar)

> Pedir algo en un mostrador o en una mesa parece simple, pero el verbo que elijas, el tiempo en que lo conjugues y el lugar donde estés cambian por completo el tono. Esta página reúne las fórmulas que suenan naturales, los errores que delatan al hablante de inglés y el vocabulario que más varía de un país a otro, con una sección dedicada a la Argentina.

## 3b. Rate bar

Standard neutral rate bar (Section 10), one per page, immediately after the intro paragraph.

---

## 4. The seven content cards

> Convention reminders: `.example-es` is the only thing TTS speaks, so **every `.example-es` holds correct Spanish only** — wrong forms live in the English `.example-en` gloss, never in the spoken line. Rio-marked rows get `data-region="rioplatense"` **and** `<span class="reg-badge reg-rio">Rioplatense</span>`; the Spain row gets `<span class="reg-badge reg-esp">España</span>` with `data-region="neutral"`. Glosses are short English; `*— italic notes*` use `<em>`.

---

### ① Los verbos que sí funcionan · `card-alpha`
**EN label:** `VERBS THAT WORK` · **Image:** yes (`pedir-cafe-mostrador.png`)

**Formula:** `Quiero · Quería · Querría …  /  ¿Me da…? · ¿Me trae…?  /  Para mí, …`

**Explanation:**
> Para pedir existen varias fórmulas naturales, de la más directa a la más cortés. *Querer* es la base: *quiero* es claro pero algo seco sin un *por favor*; *quería*, en imperfecto, suena más suave y educado; *querría*, en condicional, es el registro más formal. *Dar* y *traer* funcionan en forma de pregunta: *¿me da…?* en el mostrador, *¿me trae…?* en la mesa. Y la fórmula *para mí, …* es comodísima cuando se pide en grupo.

**Examples:**
1. `neutral` — **Quería un café con leche, por favor.** — *I'd like a coffee with milk, please.* `— quería is softer than quiero.`
2. `neutral` — **¿Me da una botella de agua sin gas?** — *Could you give me a bottle of still water?*
3. `neutral` — **¿Me trae la carta, por favor?** — *Could you bring me the menu, please?*
4. `neutral` — **Para mí, una milanesa con puré.** — *For me, a milanesa with mashed potatoes.*
5. `neutral` + `reg-esp` — **¿Me pone una caña, por favor?** — *Could you pour me a draft beer? `— ¿me pone(s)? is typical of Spain.`*
6. `neutral` — **Querría reservar una mesa para dos.** — *I'd like to reserve a table for two. `— querría is the most formal.`*

**NOTA:**
> **NOTA\*** Spanish often softens a request by pushing the verb one step into the **past** or the **conditional**. *Quería un café* literally says "I wanted a coffee," but native speakers hear a polite "I'd like a coffee" — the past tense distances the want and takes the edge off. *Querría* (conditional) is a notch more formal again. Both are gentler than the bare present *quiero*. One more thing about the verb itself: across most of Latin America and Spain, the verb for placing an order is *pedir*, not *ordenar*. *Ordenar comida* is normal in Mexico and US Spanish (calqued from English "to order") but sounds foreign elsewhere — say *pedir*.

---

### ② Los verbos que evitar · `card-beta`
**EN label:** `VERBS TO AVOID` · **Image:** none

**Explanation:**
> Dos construcciones delatan al instante a quien traduce del inglés, y una tercera conviene usar con cuidado. *Poder tener* (*¿puedo tener un café?*) es un calco literal de *can I have*: en español no se "tiene" lo que se pide, así que no funciona. *Gustar* a secas describe lo que te agrada, no lo que pedís: *me gusta el café* dice que el café te cae bien, no que quieras uno. *Me gustaría un café*, en cambio, no es incorrecto y se escucha, pero suena más a un deseo que a un pedido concreto — como fórmula de cabecera es mejor *quería* o *¿me da…?*.

**Examples** (correct Spanish in the spoken line; the error is named in the gloss):
1. `neutral` — **¿Me da un café, por favor?** — *Use this — not the calque ¿puedo tener un café? ("can I have").*
2. `neutral` — **Quería una medialuna.** — *A firm request. `Me gustaría una medialuna leans toward a wish, not an order.`*
3. `neutral` — **Me gusta mucho el café de acá.** — *This states that you like the coffee — it is not a way to order one.*

**NOTA:**
> **NOTA\*** English "can I have …?" has no direct Spanish equivalent — you don't *have* (*tener*) what you order, you *ask for* it (*pedir*) or ask the server to *give/bring* it (*dar/traer*). So *¿puedo tener…?* is the one to retire completely. *Gustar* is a different trap: it means "to be pleasing," so *me gusta X* reports a standing preference, not a request. The conditional *me gustaría* ("I would like / it would please me") **can** be used to order and is perfectly grammatical, but it carries a tentative, wishful tone — for a clean, native-sounding order, default to *quería*, *querría*, or *¿me da/trae…?*.

---

### ③ El registro: del *usted* al *vos* · `card-gamma`
**EN label:** `REGISTER: FROM USTED TO VOS` · **Image:** none · **NOTA:** none (descriptive)

**Explanation:**
> El mismo pedido cambia de tono según a quién y dónde. En el extremo formal — un restaurante elegante, una persona mayor, un trato de respeto — se usa *usted* y el condicional: *¿me podría traer…?*, *¿sería tan amable de…?*. En el registro neutro y cotidiano basta la pregunta con *dar* o *traer*: *¿me da…?*, *¿me trae…?*. Y en lo más informal — entre conocidos, en un bar — aparece el imperativo, siempre suavizado con *por favor* o con entonación de pregunta: *dame…*, *traeme…*.

**Examples:**
1. `neutral` — **¿Me podría traer la cuenta, por favor?** — *Could you bring me the bill, please? `— formal: usted + conditional.`*
2. `neutral` — **¿Sería tan amable de traernos más pan?** — *Would you be so kind as to bring us more bread? `— very formal.`*
3. `neutral` — **¿Me das una servilleta?** — *Can you give me a napkin? `— neutral / casual.`*
4. `rioplatense` + `reg-rio` — **Traeme otra agua, por fa.** — *Bring me another water, please. `— casual voseo imperative.`*

---

### ④ Según el lugar · `card-delta`
**EN label:** `BY SETTING` · **Image:** yes (`pedir-panaderia-vitrina.png`) · **NOTA:** none (descriptive; vocab lives in ⑥)

**Explanation:**
> La fórmula se ajusta al lugar. En un **restaurante** te sientas y pides en la mesa (*para mí…*, *¿me trae…?*) y al final pides *la cuenta*. En un **café** o **bar** el pedido es más breve, en la barra o en la mesa: *un cortado, por favor*. En una **panadería** o **confitería** se pide por unidad o por peso: *media docena de medialunas*, *un cuarto de…*. En el **supermercado**, el único mostrador donde se pide es la **fiambrería**: *¿me da doscientos gramos de jamón cocido?*. Y a nivel de **calle** — un *kiosco*, un puesto, un carrito — el intercambio es mínimo: *¿tienen…?*, *dame uno*.

**Examples:**
1. `neutral` — **Para mí, el bife de chorizo, por favor.** — *For me, the sirloin steak, please. `— restaurante.`*
2. `neutral` — **¿Me da medio kilo de pan, por favor?** — *Could you give me half a kilo of bread? `— panadería, by weight.`*
3. `neutral` — **¿Me da trescientos gramos de queso?** — *Could you give me 300 grams of cheese? `— supermarket deli counter.`*
4. `rioplatense` + `reg-rio` — **¿Tenés monedas? Dame dos alfajores.** — *Got change? Give me two alfajores. `— kiosco, street level.`*

---

### ⑤ Nota rioplatense · `card-alpha`
**EN label:** `RIOPLATENSE: HOW YOU ASK` · **Image:** none
*(Register/grammar of ordering in Argentina. The food nouns are in ⑥ — keep them apart.)*

**Explanation:**
> En la Argentina y el Uruguay el pedido se hace con *vos*, no con *tú*. Los verbos de pedido cambian su forma: *¿me traés…?* (no *¿me traes?*), *¿me das…?*, *¿me ponés…?*. Al personal se lo llama *mozo* o *moza* (no *camarero* ni *mesero*), y para llamar su atención basta un *disculpá* o *perdoná*. El trato es cordial pero más informal que en otras regiones: el *usted* se reserva para personas mayores o contextos muy formales.

**Examples** (all `rioplatense` + `reg-rio`):
1. **Mozo, ¿me traés la carta, por fa?** — *Waiter, could you bring me the menu, please? `— mozo + voseo.`*
2. **¿Me das un vaso de agua?** — *Can you give me a glass of water?*
3. **Disculpá, ¿me ponés otra de estas?** — *Excuse me, could you get me another one of these?*
4. **¿Tenés mesa para cuatro?** — *Do you have a table for four? `— tener for availability is fine.`*

**NOTA:**
> **NOTA\*** In Argentina and Uruguay, *vos* replaces *tú*, and the present-tense verb forms shift with it. For the ordering verbs: *tú traes → vos traés*, *tú das → vos das* (same), *tú pones → vos ponés*, *tú quieres → vos querés*. The pattern for *-er/-ir* verbs is a stressed final syllable: drop the *-r* of the infinitive and add an accent — *traer → traés*, *poner → ponés*. The affirmative *vos* command uses the same trick: *traé*, *poné*, *dame* (*da* + *me*). You'll be understood perfectly with *tú* forms, but matching the local *vos* makes you sound far less like a tourist.

---

### ⑥ Vocabulario: qué se pide · `card-beta`
**EN label:** `WHAT YOU ORDER (ARGENTINA)` · **Image:** yes (`pedir-facturas-bandeja.png`)

**Explanation:**
> Más allá de cómo se pide, conviene saber cómo se llaman las cosas — y acá la Argentina tiene su propio mapa. En materia de dulces, la palabra clave es **torta**: lo que en México es *pastel* y en España *tarta*, en la Argentina es una *torta* (la de cumpleaños, de varias capas de bizcochuelo). Una **tarta** es otra cosa: una base de masa con relleno, y puede ser dulce (*tarta de frutillas*, pastafrola) o salada (*tarta pascualina*, de jamón y queso). **Pastel** casi nunca es un dulce: *pastel de papa* es un plato salado, y los *pastelitos* son masas fritas rellenas de membrillo o batata. Las **facturas** son la bollería dulce que acompaña el café o el mate — *medialunas*, *vigilantes*, *bolas de fraile* — y se compran por docena. Para el café: un **cortado** (espresso con un poco de leche), una **lágrima** (mucha leche, apenas café) o un **café con leche**.

**Examples:**
1. `rioplatense` + `reg-rio` — **Quería una docena de facturas surtidas.** — *I'd like a dozen assorted pastries. `— facturas: the pastry category.`*
2. `rioplatense` + `reg-rio` — **¿Me hace una torta de cumpleaños para diez personas?** — *Could you make me a birthday cake for ten? `— torta = cake in Argentina.`*
3. `rioplatense` + `reg-rio` — **Para mí, un cortado y dos medialunas de manteca.** — *For me, a cortado and two butter croissants.*
4. `neutral` — **Una porción de tarta de manzana, por favor.** — *A slice of apple tart, please. `— tarta = tart/pie, sweet or savory.`*

**NOTA:**
> **NOTA\*** The same three words rearrange across borders, which is exactly why a learner gets corrected. In **Argentina** (and most of South America) a layered celebration cake is a *torta*; a *tarta* is a single-crust tart or pie, sweet **or** savory; a *pastel* is usually savory (*pastel de papa*). In **Mexico** that celebration cake is a *pastel* — and beware, a *torta* there is a sandwich. In **Spain** the same cake is a *tarta* or *pastel*, and *torta* means something flatter and simpler. When in doubt anywhere, describing it (*un postre con capas de bizcocho y crema*) always lands.

---

### ⑦ Cerrar la cuenta · `card-gamma`
**EN label:** `CLOSING OUT` · **Image:** none

**Explanation:**
> Cerrar bien el pedido es tan importante como abrirlo. Para indicar si comes en el local o te lo llevas, se usa *para acá* o *para llevar*. Durante la comida, los pedidos se hacen igual que al principio: *¿me trae más agua?*, *¿nos trae más pan?*. Para terminar, se pide **la cuenta**: la fórmula neutra es *¿me trae la cuenta, por favor?*; en la Argentina es comodísimo el *¿me cobrás?*. Sobre la **propina**: lo habitual ronda el 10 %, y conviene no confundir el **cubierto** de la cuenta con la propina — es un cargo aparte por el servicio de mesa, y no va al mozo.

**Examples:**
1. `neutral` — **¿Me trae la cuenta, por favor?** — *Could you bring me the bill, please? `— neutral.`*
2. `rioplatense` + `reg-rio` — **¿Me cobrás?** — *Can I pay? `— the everyday Argentine way to ask for the bill.`*
3. `neutral` — **Un café para llevar, por favor.** — *A coffee to go, please.*
4. `neutral` — **¿Me trae un poco más de agua?** — *Could you bring me a little more water?*

**NOTA:**
> **NOTA\*** Two things trip up visitors at payment time in Argentina. First, the *cubierto* (or *servicio de mesa*) printed on the bill is a per-person cover charge for bread, water and table service — it is **not** a tip and does not go to the staff, so it doesn't replace the *propina*. Second, how to leave the tip: the social norm is about 10% (up to ~15% for great service), and cash left on the table or handed to the *mozo* is still the most reliable. Since a 2024 decree, tipping by card or digital wallet is now legal and some places offer it on the terminal, but adoption is uneven — many spots still can't add it to a card, so carry some cash for tips. Counter tip jars are often labeled *Propi* or *Tips*.

---

## 5. Decision guide — `¿Cuál uso?`

Placed after Card ⑦. Title `¿Cuál uso?`, subtitle `Cómo pedir según la situación`.

| Condición (`.decision-condition`) | Resultado (`.decision-result` + `<small>`) |
|---|---|
| Lugar formal, persona mayor o trato de respeto | ***Usted* + condicional** — *¿Me podría traer…?* · *¿Sería tan amable de…?* |
| Café, bar o el día a día | **Pregunta con *dar* o *traer*** — *¿Me da…?* · *Para mí, …* |
| Para sonar natural y cortés | **Imperfecto de cortesía** — *Quería…* mejor que *quiero* |
| En la Argentina o el Uruguay | ***Vos* y *mozo*** — *¿Me traés…?* · *¿Me cobrás?* |
| Para no delatar el inglés | **Evita el calco** — nunca *¿puedo tener…?*; tampoco *me gustaría* como pedido firme |

---

## 6. Guía Rápida modal — **three columns** (extension)

The standard modal table (Section 12) is two columns. This page extends it to **three**: `Situation` (EN) · `Neutral` (ES) · `Rioplatense` (ES). The `table-wrapper` already has `overflow-x: auto`, so it scrolls cleanly on mobile. Right-hand Spanish columns use `<em>`.

- **Modal title:** `Guía Rápida (Cheat Sheet)`
- **Intro line (EN):** "A quick phrasebook for ordering — the neutral Latin American form alongside the Rioplatense (Argentina) version. Phrases are Spanish; situations are in English."

| Situation | Neutral | Rioplatense |
|---|---|---|
| Get the server's attention | *Disculpe, por favor* | *Disculpá · Mozo* |
| Ask to be seated | *¿Tienen mesa para dos?* | *¿Tenés mesa para dos?* |
| Order (polite default) | *Quería… · ¿Me da…?* | *Quería… · ¿Me traés…?* |
| Order for the group | *Para mí, …* | *Para mí, …* |
| Ask if they have something | *¿Tienen…?* | *¿Tenés…?* |
| Coffee | *Un café con leche* | *Un cortado · una lágrima* |
| Sweet baked goods | *Una porción de torta* | *Una docena de facturas* |
| Ask for more of something | *¿Me trae más agua?* | *¿Me traés más agua?* |
| For here / to go | *Para acá · para llevar* | *Para acá · para llevar* |
| Ask for the bill | *¿Me trae la cuenta?* | *¿Me cobrás?* |
| Cover charge (not a tip) | *El cubierto / servicio* | *El cubierto* |
| Tip | *La propina (~10 %)* | *La propina (~10 %, efectivo)* |
| Avoid (calque) | *✗ ¿Puedo tener…?* | *✗ ¿Puedo tener…?* |

---

## 7. Image package

**Folder:** `/assets/pedir/` (Daniel creates it). Path from this page: `../assets/pedir/[filename]`.
Three images, one each on Cards ①, ④, ⑥, top-right of the card header (`.card-icon img`).

### Shared Gemini direction (prepend to every prompt)
> Flat-vector cartoon illustration, clean confident lines, minimal detail so it reads at small size. Strict color palette: deep navy background (#0a1628 / #111d35), no pure white anywhere; accents drawn from blue #4a90d9, violet #c084fc, gold #fbbf24, teal #4ecdc4. Roughly square or modestly wide framing — never tall/portrait. Single clear subject, centered, no text or lettering in the image.

### Image 1 — Card ① · `pedir-cafe-mostrador.png`
- **Subject:** a café counter scene — a barista behind an espresso machine handing a coffee cup across the counter to a customer; a small plate with two medialunas on the counter.
- **Alt text (ES):** `Un barista entrega un café sobre el mostrador de una cafetería.`
- **Gemini prompt:** *[shared direction] + "A café counter: a friendly barista behind a small espresso machine passing a coffee cup to a customer across the counter, a little plate with two croissant-shaped pastries beside it. Cozy, simple, square composition."*

### Image 2 — Card ④ · `pedir-panaderia-vitrina.png`
- **Subject:** a bakery display case (vitrina) seen from the customer's side — glass case with shelves of bread loaves, a tray of pastries, and a small cake; a hint of a counter scale to suggest selling by weight.
- **Alt text (ES):** `La vitrina de una panadería con panes, facturas y una torta.`
- **Gemini prompt:** *[shared direction] + "A bakery glass display case viewed from the customer side, shelves holding loaves of bread, a tray of assorted pastries, and one small layered cake; a small counter scale at the side. Clean, inviting, square composition."*

### Image 3 — Card ⑥ · `pedir-facturas-bandeja.png`
- **Subject:** a tray / paper-wrapped dozen of assorted Argentine *facturas* — croissant-shaped medialunas plus a couple of other small filled pastries — three-quarter view.
- **Alt text (ES):** `Una bandeja con una docena de facturas surtidas.`
- **Gemini prompt:** *[shared direction] + "A tray holding about a dozen assorted small pastries: several croissant-shaped ones and a few round filled buns, neatly arranged, three-quarter top view. Appetizing, simple, square composition."*

### Post-generation (GIMP), then save to `/assets/pedir/`
Per master spec Section 11: Scale to **800 px** wide (lock aspect, Cubic), Mode → Indexed (optimum palette, 256 colors), Export As PNG with compression **9**. Save into `/assets/pedir/` under the filenames above.

---

## 8. Build & validation checklist

- [ ] Inherit fonts + CSS vars + all component CSS/JS verbatim from `single-topic-page-spec.md`.
- [ ] Add `--accent-delta: #4ecdc4` and the `.card-delta` rules.
- [ ] Background = Quatrefoil (Option B), opacity 0.10.
- [ ] Back-nav → `../index.html`.
- [ ] Neutral TTS JS only (Section 10) — **not** dual-voice. Magnify JS + Guía Rápida modal JS included.
- [ ] Seven cards in order, theme cycle alpha/beta/gamma/delta/alpha/beta/gamma.
- [ ] Every `.example-es` is correct Spanish only (no ✗ forms, no English in the spoken line).
- [ ] Rio-marked rows: `data-region="rioplatense"` + `reg-rio` badge. Spain row: `data-region="neutral"` + `reg-esp` badge.
- [ ] Images on ①/④/⑥ only, `../assets/pedir/…`, Spanish alt text.
- [ ] Guía Rápida = three-column table; badge in title card.
- [ ] `node --check` on extracted JS passes; tag-balance passes; div balance via `<div(\s|>)`.
- [ ] Index wiring handled separately, post-verification.

*End of spec.*
