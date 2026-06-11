# Background image migration → `assets/los fondos/`

Repoint every page's **CSS background** to `assets/los fondos/`, then delete the old copies.

**Already confirmed:**
- All 8 background files already exist in `assets/los fondos/` — every page below is safe to repoint right now (nothing still needs copying there).
- None of these 8 files are used as `<img>` content anywhere — they're CSS backgrounds only — so the old copies are safe to delete once every reference is moved.
- Leave the other `assets/` files alone (the `desde-*` and `tiempo-distancia-*` images are content diagrams, not backgrounds).

---

## Root-level pages — new path: `assets/los fondos/<file>`

- [ ] `index.html` (line 40) — `Spain tile pattern.webp` → `assets/los fondos/Spain tile pattern.webp`
- [ ] `enlace-practica.html` (line 14) — `Spain tile pattern.webp` → `assets/los fondos/Spain tile pattern.webp`
- [ ] `prestar-pedir.html` (line 39) — `alhambra-bg.webp` → `assets/los fondos/alhambra-bg.webp`
- [ ] `prestar-pedir.html` (line 159) — `Spain tile pattern.webp` → `assets/los fondos/Spain tile pattern.webp`
- [ ] `tema-del-movimiento.html` (line 36) — `granada-alhambra.webp` → `assets/los fondos/granada-alhambra.webp`
- [ ] `condicionales-practica.html` (line 35) — `assets/alhambra_garden.webp` → `assets/los fondos/alhambra_garden.webp`
- [ ] `condicionales-tipo1.html` (line 40) — `assets/alhambra_garden.webp` → `assets/los fondos/alhambra_garden.webp`
- [ ] `condicionales-tipo2.html` (line 40) — `assets/alhambra_garden.webp` → `assets/los fondos/alhambra_garden.webp`
- [ ] `condicionales-tipo3.html` (line 40) — `assets/alhambra_garden.webp` → `assets/los fondos/alhambra_garden.webp`
- [ ] `oraciones-condicionales.html` (line 42) — `assets/alhambra_garden.webp` → `assets/los fondos/alhambra_garden.webp`
- [ ] `entrenadores.html` (line 42) — `assets/azulejos.webp` → `assets/los fondos/azulejos.webp`
- [ ] `espanol-rioplatense.html` (line 42) — `assets/toledo-pic.webp` → `assets/los fondos/toledo-pic.webp`

## Subdirectory pages (`interactive/`, `topics/`) — new path: `../assets/los fondos/<file>`

- [ ] `interactive/entrenador-de-verbos.html` (line 20) — `../assets/tio-pepe-sign.webp` → `../assets/los fondos/tio-pepe-sign.webp`
- [ ] `interactive/entrenador-de-verbos2.html` (line 29) — `../assets/Guernica.webp` → `../assets/los fondos/Guernica.webp`
- [ ] `interactive/tiempo-y-distancia-interactivo.html` (line 48) — `../assets/alhambra_garden.webp` → `../assets/los fondos/alhambra_garden.webp`
- [ ] `topics/desde-hace-y-construcciones-de-tiempo.html` (line 51) — `../assets/alhambra_garden.webp` → `../assets/los fondos/alhambra_garden.webp`
- [ ] `topics/palabras-tramposas.html` (line 51) — `../assets/azulejos.webp` → `../assets/los fondos/azulejos.webp`
- [ ] `topics/tiempo_y_distancia.html` (line 35) — `../assets/azulejos.webp` → `../assets/los fondos/azulejos.webp`
- [ ] `topics/ya-todavia-aun.html` (line 55) — `../assets/alhambra_garden.webp` → `../assets/los fondos/alhambra_garden.webp`

*(20 references across 17 files. Line numbers are from the current repo; if a page has shifted, search for the `url(` background instead.)*

---

## Already migrated — no action
- `interactive/comprension-lectora.html` → `../assets/los fondos/azulejos.webp`
- `topics/paisajes.html` → `../assets/los fondos/Spain tile pattern.webp`

## No background file — no action
The remaining `topics/` pages and `interactive/quiz-genero.html` use inline SVG-pattern backgrounds (embedded `data:` URIs), not image files. Nothing to migrate.

---

## After everything above is repointed — safe to delete

**Root directory (where `index.html` lives):**
- [ ] `Spain tile pattern.webp`
- [ ] `alhambra-bg.webp`
- [ ] `granada-alhambra.webp`
- [ ] `tio-pepe-sign.webp`

**`assets/` (background files only — KEEP everything else in `assets/`):**
- [ ] `assets/Spain tile pattern.webp`
- [ ] `assets/alhambra-bg.webp`
- [ ] `assets/granada-alhambra.webp`
- [ ] `assets/tio-pepe-sign.webp`
- [ ] `assets/alhambra_garden.webp`
- [ ] `assets/azulejos.webp`
- [ ] `assets/toledo-pic.webp`
- [ ] `assets/Guernica.webp`

**Do NOT delete** the other `assets/` files — `desde-c*-*.webp` and `tiempo-distancia-*.webp` are content diagrams still used as `<img>` on the grammar pages.

*Tip: do one page, confirm the background still renders on the live site, then move on — and only delete the old copies once every reference above is checked off.*
