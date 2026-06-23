# Mi Proyecto Español — Interactive-App Boilerplate Spec
### For: Claude (or Daniel) building interactive / AI-powered / Drive-backed pages
### Last updated: June 5, 2026
### Companion to: `single-topic-page-spec.md` (static pages) and `master_briefing.md` (root fundamentals)

---

## 1. Purpose & Scope

This is the reusable scaffolding for the **interactive species** of pages — the ones that talk to Google Drive, call the Claude API, or let Daniel enter and edit data. It exists so neither of us has to dig through `comprension-lectora.html` or `quiz-genero.html` every time a new app needs Drive, a connection pill, a serverless call, or an editable dataset.

**Authoritative live references** (clone fresh, then read these for the canonical implementation):
- `comprension-lectora.html` — Drive OAuth, the connection UI, streaming API calls, the **multi-file archive** pattern (one Drive file per saved record).
- `interactive/quiz-genero.html` — the **single-file CRUD database** pattern (one Drive file holds the whole dataset; read → edit → PATCH back), with seed-bootstrap and content migration.
- `netlify/functions/claude.mts` + `verify.mts` — the serverless proxy and password check.

Everything below is pulled verbatim from those files. When the live files and this spec disagree, the live files win — and this spec should be updated.

**Out of scope:** static reference pages (`single-topic-page-spec.md`) and the Preact+htm verb explorers (`poner.html` / `que-verbos.html`).

**As new recurring features appear, add them here** rather than starting a new file — this is the single home for interactive boilerplate.

---

## 2. File Locations for the Interactive Species

```
mi-proyecto-espanol/
├── index.html
├── comprension-lectora.html              ← AI + Drive page lives at site root
├── traduccion-interactiva.html
├── interactive/
│   ├── entrenador-de-verbos2.html        ← quizzes / interactive apps
│   ├── quiz-genero.html
│   ├── tiempo-y-distancia-interactivo.html
│   └── subpages/
├── datos/
│   ├── verbos/                           ← verb data (verbos-a-d.js … verbos-r-z.js)
│   └── seeds/                            ← JSON datasets loaded at init
├── netlify/
│   └── functions/
│       ├── claude.mts                    ← /api/claude  (Anthropic proxy + password)
│       ├── generate.mts                  ← /api/generate (multi-provider, CL only)
│       └── verify.mts                    ← /api/verify  (password check)
├── netlify.toml                          ← function timeout = 30s
└── assets/                               ← images, azulejos.webp, backgrounds
```

**Pathing from `/interactive/`:** assets are `../assets/…`, back-nav is `../index.html`. (Pages at the site root, like `comprension-lectora.html`, use `assets/…` and `index.html` directly.)

**Drive data lives in Drive, not the repo.** A user-created dataset (the CRUD pattern) is bootstrapped from an embedded seed on first connect; an archive (the multi-file pattern) is written record-by-record. Embedded seed JSON lives inline in the page (e.g. `SEED_DATA` in `quiz-genero.html`); the `datos/seeds/` repo folder is for *read-only* datasets fetched at init.

---

## 3. Shared Design & Language Defaults (cross-reference)

Do not redefine these — inherit them from the root and the static spec:

- **CSS tokens, fonts, cards, buttons, back-nav** → `master_briefing.md` › Design System. Same `:root` palette, DM Serif Display + Outfit, same card/button vocabulary.
- **Favicon (every page, paste verbatim in `<head>`)** → see `master_briefing.md` › Design System › Favicon. The three `/assets/bandera/` links go immediately after `</title>`; absolute paths, identical at any depth. A page without the favicon block is not done.
- **Spanish-primary chrome; English only in NOTA/help layers** → `single-topic-page-spec.md`.
- **Language & TTS: neutral Latin American Spanish is the absolute default** → `master_briefing.md` › Language Policy. Neutral-voice fallback chain (`es-419 → es-MX → es-US → es-CO → other es-*`); **no TTS on quiz items**; one shared rate bar per page if a page has spoken examples.
- Grading colors: correct `#34d399`, warning `#fbbf24`, incorrect `#f87171`.

---

## 4. Google Drive OAuth — Concrete

### 4.1 Head includes (every Drive page)

```html
<!-- in <head>, alongside the Google Fonts link -->
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### 4.2 Constants & state

```js
const CLIENT_ID    = '10393001786-l8rfutuihm2301jf6a5rkmqumtfla8t5.apps.googleusercontent.com';
const DRIVE_SCOPE  = 'https://www.googleapis.com/auth/drive.file';
const PARENT_FOLDER = 'Spanish Learning';   // top-level folder, shared across all pages
const FOLDER_NAME   = '<Page Subfolder>';   // per-page subfolder, e.g. 'Quiz Archive', 'Genero'

let driveToken     = null;
let tokenClient    = null;
let folderId       = null;
let driveReady     = false;
let _connectResolve = null;   // for the promisified re-auth path
```

**Scope note:** `drive.file` only grants access to files this app creates. That is why datasets are bootstrapped from an embedded seed on first connect — the app cannot see files it didn't make, so there is nothing to upload manually.

### 4.3 Auth flow (paste, adjust only the post-connect line)

```js
function initDriveAuth() {
  if (typeof google === 'undefined' || !google.accounts) { setTimeout(initDriveAuth, 300); return; }
  driveReady  = true;
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID, scope: DRIVE_SCOPE, callback: handleTokenResponse,
  });
}

function connectDrive() {
  if (!driveReady) { alert('La biblioteca de Google aún se está cargando. Inténtalo de nuevo.'); return; }
  setDriveUI('busy', 'Conectando…');
  tokenClient.requestAccessToken({ prompt: '' });
}

function disconnectDrive() {
  if (driveToken) google.accounts.oauth2.revoke(driveToken, () => {});
  driveToken = null; folderId = null;            // + clear any page dataset/state here
  setDriveUI('disconnected', 'Google Drive: no conectado');
  // + hide any connected-only panels here
}

// Promisified connect — resolves true/false when auth completes (used by ensureDriveConnection)
function connectDriveAsync() {
  return new Promise(resolve => {
    if (!driveReady) { resolve(false); return; }
    _connectResolve = resolve;
    setDriveUI('busy', 'Reconectando Drive…');
    tokenClient.requestAccessToken({ prompt: '' });
  });
}

// Validate the token before any save; silently re-auth if it expired
async function ensureDriveConnection() {
  if (!driveToken) return await connectDriveAsync();
  try {
    const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
      headers: { 'Authorization': 'Bearer ' + driveToken }
    });
    if (res.ok) return true;
    if (res.status === 401) { driveToken = null; return await connectDriveAsync(); }
    return false;
  } catch (e) { console.error('Drive validation error:', e); return false; }
}

async function handleTokenResponse(resp) {
  if (resp.error) {
    setDriveUI('disconnected', 'Error al conectar Drive');
    if (_connectResolve) { const r = _connectResolve; _connectResolve = null; r(false); }
    return;
  }
  driveToken = resp.access_token;
  setDriveUI('busy', 'Verificando carpeta…');
  try {
    folderId = await ensureFolder();
    // ── PAGE-SPECIFIC: load the archive OR the dataset here ──
    // e.g.  await loadDataset();        (CRUD pattern)
    //   or  await loadActiveStories();  (archive pattern)
    setDriveUI('connected', 'Google Drive: conectado ✓');
    if (_connectResolve) { const r = _connectResolve; _connectResolve = null; r(true); }
  } catch (e) {
    console.error('Drive setup error:', e);
    setDriveUI('disconnected', 'Error al acceder a Drive');
    if (_connectResolve) { const r = _connectResolve; _connectResolve = null; r(false); }
  }
}
```

### 4.4 The `driveRequest` wrapper + folder management (paste verbatim)

Every authenticated Drive call goes through `driveRequest`. It attaches the bearer token and, on a 401, clears the token and throws so callers can trigger re-auth.

```js
async function driveRequest(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Authorization':'Bearer '+driveToken, 'Content-Type':'application/json', ...(options.headers||{}) }
  });
  if (res.status === 401) { driveToken = null; setDriveUI('disconnected','Sesión Drive expirada — reconecta'); throw new Error('Drive token expired'); }
  return res;
}

async function findFolder(name, parentId) {
  const q = parentId
    ? `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`
    : `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const res = await driveRequest(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`);
  const data = await res.json();
  return data.files?.length > 0 ? data.files[0].id : null;
}

async function createFolder(name, parentId) {
  const body = { name, mimeType:'application/vnd.google-apps.folder' };
  if (parentId) body.parents = [parentId];
  const res  = await driveRequest('https://www.googleapis.com/drive/v3/files', { method:'POST', body:JSON.stringify(body) });
  return (await res.json()).id;
}

// Find-or-create PARENT_FOLDER, then the per-page subfolder inside it. Returns the subfolder id.
async function ensureFolder() {
  let p = await findFolder(PARENT_FOLDER, null); if (!p) p = await createFolder(PARENT_FOLDER, null);
  let a = await findFolder(FOLDER_NAME, p);       if (!a) a = await createFolder(FOLDER_NAME, p);
  return a;
}
```

---

## 5. The Connection UI (pill + bar)

Two pieces: a small **header pill** (status at a glance) and a **bar** with a connect/disconnect button. `setDriveUI(state, label)` drives all of them; `state` is `'connected' | 'busy' | 'disconnected'`.

### 5.1 CSS

```css
.drive-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; background: var(--bg-input);
  border: 1px solid var(--border); border-radius: 10px;
  margin-bottom: 16px; font-size: 0.82rem; gap: 10px; flex-wrap: wrap;
}
.drive-status { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
.drive-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.drive-dot.connected    { background: #34d399; }
.drive-dot.disconnected { background: var(--text-muted); }
.drive-dot.busy         { background: #fbbf24; animation: pulse 1s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
```

### 5.2 Markup

```html
<!-- Header pill: a one-line status the user can click to connect -->
<button id="headerDriveLabel" onclick="connectDriveInline()"
  style="font-family:'Outfit',sans-serif;font-size:0.72rem;font-weight:500;color:var(--text-muted);
         background:transparent;border:1px solid var(--border);border-radius:20px;cursor:pointer;
         white-space:nowrap;padding:5px 12px;transition:all 0.2s;display:flex;align-items:center;gap:6px">
  <span class="drive-dot disconnected" id="headerDriveDot" style="width:7px;height:7px"></span>
</button>

<!-- Bar: status + connect/disconnect button -->
<div class="drive-bar" id="driveBar">
  <div class="drive-status">
    <div class="drive-dot disconnected" id="driveDot"></div>
    <span id="driveLabel">Google Drive: no conectado</span>
  </div>
  <button class="btn-secondary" id="driveBtn" onclick="connectDrive()"
          style="font-size:0.8rem;padding:6px 14px">Conectar Drive</button>
</div>
```

### 5.3 `setDriveUI` (generic core — extend per page)

```js
function setDriveUI(state, label) {
  const dot = document.getElementById('driveDot'),
        lbl = document.getElementById('driveLabel'),
        btn = document.getElementById('driveBtn');
  if (dot) dot.className   = 'drive-dot ' + state;
  if (lbl) lbl.textContent = label;
  if (btn) { btn.textContent = state === 'connected' ? 'Desconectar' : 'Conectar Drive';
             btn.onclick     = state === 'connected' ? disconnectDrive : connectDrive; }

  const hlbl = document.getElementById('headerDriveLabel');
  if (hlbl) {
    const isConn = state === 'connected', isBusy = state === 'busy';
    hlbl.innerHTML = `<span class="drive-dot ${state}" id="headerDriveDot" style="width:7px;height:7px"></span>` +
                     (isConn ? 'Drive ✓' : isBusy ? 'Drive…' : 'Drive ✗');
    hlbl.style.color       = isConn ? '#34d399' : isBusy ? '#fbbf24' : 'var(--text-muted)';
    hlbl.style.borderColor = isConn ? 'rgba(52,211,153,0.4)' : isBusy ? 'rgba(251,191,36,0.3)' : 'var(--border)';
    hlbl.style.cursor      = isConn ? 'default' : 'pointer';
    hlbl.onclick           = isConn ? () => alert('Google Drive ya está conectado.') : connectDriveInline;
  }
  // Per page, optionally: lock action buttons while state==='busy' to prevent mid-save clicks.
}

function connectDriveInline() {
  if (!driveReady) { alert('La biblioteca de Google aún se está cargando.'); return; }
  if (driveToken)  { alert('Google Drive ya está conectado.'); return; }
  connectDrive();
}
```

### 5.4 Init (bottom of script)

```js
window.addEventListener('load', () => { setTimeout(initDriveAuth, 500); });
```

---

## 6. The Two Drive Data Patterns

Pick by question: **"Is this many independent records, or one evolving dataset Daniel edits?"**

### 6A. Multi-file archive (one Drive file per record)

Use for collections of independent saved items — e.g. archived reading quizzes. Source: `comprension-lectora.html`.

- **Save** = create a new file via `uploadType=multipart` (metadata + JSON in one request), with a **single 401-retry-then-reconnect** guard.
- **List/load** = query the folder, read each file with `?alt=media`.
- **Delete** = `DELETE` the file by id.

```js
async function saveRecordToDrive(record) {
  if (!driveToken || !folderId) return false;
  setDriveUI('busy', 'Guardando en Drive…');
  const filename = `record_${record.id}_${Date.now()}.json`;
  const boundary = '-------314159265358979323846';
  const body = [
    `--${boundary}`, 'Content-Type: application/json; charset=UTF-8', '',
    JSON.stringify({ name: filename, parents: [folderId] }),
    `--${boundary}`, 'Content-Type: application/json', '',
    JSON.stringify(record), `--${boundary}--`,
  ].join('\r\n');

  const doUpload = () => fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { 'Authorization':'Bearer '+driveToken, 'Content-Type':`multipart/related; boundary="${boundary}"` },
    body,
  });

  try {
    let res = await doUpload();
    if (res.status === 401) {                       // token died mid-upload → reconnect once, retry
      driveToken = null;
      if (!await connectDriveAsync()) { setDriveUI('disconnected', 'No se pudo guardar'); return false; }
      folderId = await ensureFolder();
      res = await doUpload();
    }
    if (!res.ok) { setDriveUI('connected', 'Error al guardar'); return false; }
    setDriveUI('connected', 'Guardado ✓');
    setTimeout(() => setDriveUI('connected', 'Google Drive: conectado ✓'), 2500);
    return true;
  } catch (e) { console.error('Save error:', e); setDriveUI('connected', 'Error al guardar'); return false; }
}

async function listRecords() {
  if (!driveToken || !folderId) return [];
  const q   = `'${folderId}' in parents and mimeType='application/json' and trashed=false`;
  const res = await driveRequest(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=100`);
  const { files = [] } = await res.json();
  const out = [];
  for (const f of files) {
    const fr = await driveRequest(`https://www.googleapis.com/drive/v3/files/${f.id}?alt=media`);
    out.push({ fileId: f.id, ...(await fr.json()) });
  }
  return out;
}

async function deleteRecord(fileId) {
  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE', headers: { 'Authorization': 'Bearer ' + driveToken }
  });
}
```

### 6B. Single-file CRUD database (one Drive file is the whole dataset)

**This is the "interactive database" pattern** — the one used for *Género de Sustantivos* and *Palabras Tramposas*, and the one to reuse for data-entry/edit features on the pronunciation page and (in a more complex form) Entrenador II. Source: `interactive/quiz-genero.html`.

The whole dataset is one JSON file. On connect: find it, or bootstrap it from an embedded seed. To edit: mutate the in-memory `dataset`, then PATCH the file back with `uploadType=media` (full overwrite — last-write-wins).

**Dataset shape (embedded seed + Drive file):**
```json
{
  "schemaVersion": 2,
  "contentRev": 3,
  "updated": "2026-06-01",
  "notes": "field semantics + the removability predicate, in plain text",
  "words": [ { "...": "one record per row" } ]
}
```

**Extra constants & state:**
```js
const DATASET_NAME = '<dataset>.json';   // e.g. 'genero-dataset.json'
let datasetFileId  = null;
let dataset        = null;
// SEED_DATA = { schemaVersion, contentRev, words:[...] }  ← embedded inline in the page
```

**Find / read / create (bootstrap) / update (PATCH):**
```js
async function findDatasetFile() {
  const q = `name='${DATASET_NAME}' and '${folderId}' in parents and trashed=false`;
  const r = await driveRequest(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`);
  const d = await r.json();
  return d.files?.length > 0 ? d.files[0].id : null;
}

async function readDatasetFile(id) {
  const r = await driveRequest(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`);
  return await r.json();
}

async function createDatasetFile(obj) {            // bootstrap from seed on first connect
  const b = '-------314159265358979323846';
  const body = [
    `--${b}`, 'Content-Type: application/json; charset=UTF-8', '',
    JSON.stringify({ name: DATASET_NAME, parents: [folderId] }),
    `--${b}`, 'Content-Type: application/json', '',
    JSON.stringify(obj), `--${b}--`,
  ].join('\r\n');
  const r = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { 'Authorization':'Bearer '+driveToken, 'Content-Type':`multipart/related; boundary="${b}"` },
    body,
  });
  if (!r.ok) throw new Error('No se pudo crear el archivo de datos');
  return (await r.json()).id;
}

async function updateDatasetFile(obj) {            // the CRUD write — full overwrite of the file body
  const r = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${datasetFileId}?uploadType=media`, {
    method: 'PATCH',
    headers: { 'Authorization':'Bearer '+driveToken, 'Content-Type':'application/json' },
    body: JSON.stringify(obj)
  });
  if (!r.ok) throw new Error('No se pudo guardar en Drive');
  return true;
}
```

**Load = find-or-bootstrap, with seed-migration of curated fields:**
```js
async function loadDataset() {
  datasetFileId = await findDatasetFile();
  if (datasetFileId) { dataset = await readDatasetFile(datasetFileId); }
  else { dataset = JSON.parse(JSON.stringify(SEED_DATA)); datasetFileId = await createDatasetFile(dataset); }
  if (!dataset || !Array.isArray(dataset.words)) throw new Error('Datos inválidos');

  // If the embedded seed is newer (contentRev bumped), migrate curated fields into the user's file.
  if ((dataset.contentRev || 0) < (SEED_DATA.contentRev || 0)) {
    const changed = migrateCuratedContent();
    dataset.contentRev = SEED_DATA.contentRev;
    if (changed) { try { await updateDatasetFile(dataset); } catch (e) { console.warn('Migración no guardada:', e); } }
  }
}

// Refresh curated, non-user-owned fields (definitions, contexts) from the seed without touching
// user-owned state. Key each record by a stable composite so edits map correctly.
function migrateCuratedContent() {
  const sm = new Map();
  SEED_DATA.words.forEach(s => sm.set(s.palabra + '|' + s.articulo + '|' + s.genero, s));
  let changed = false;
  dataset.words.forEach(w => {
    const s = sm.get(w.palabra + '|' + w.articulo + '|' + w.genero);
    if (s) {
      if (w.contexto   !== s.contexto)   { w.contexto   = s.contexto;   changed = true; }
      if (w.definicion !== s.definicion) { w.definicion = s.definicion; changed = true; }
    }
  });
  return changed;
}
```

**CRUD operations** are then just in-memory edits to `dataset.words` followed by `await updateDatasetFile(dataset)`:
- **Create:** `dataset.words.push(newRecord)` → update.
- **Edit:** find by stable key, mutate fields → update.
- **Delete:** filter out by key → update (respect the removability predicate below).
- **Reload:** `await ensureDriveConnection()` → `ensureFolder()` → `loadDataset()`.

**`contentRev` discipline:** bump `SEED_DATA.contentRev` whenever you change curated content in the embedded seed. `migrateCuratedContent` refreshes only curated fields (definitions, contexts) and never clobbers user-owned fields (difficulty flags, streaks, anything Daniel sets).

---

## 7. Serverless Function & Lazy Password

### 7.1 The proxy (`netlify/functions/claude.mts`, path `/api/claude`)

Thin Anthropic proxy. Reads `ANTHROPIC_API_KEY` and optional `QUIZ_PASSWORD` from Netlify env. Supports streaming and non-streaming. (Live file is the source of truth; reproduced shape:)

```ts
import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const quizPassword = Netlify.env.get("QUIZ_PASSWORD");
  const apiKey       = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY is not configured." }, 500);

  const body = await req.json();
  if (quizPassword && body.password !== quizPassword) return json({ error: "Invalid password." }, 401);

  const stream = body.stream === true;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type":"application/json", "x-api-key":apiKey, "anthropic-version":"2023-06-01" },
    body: JSON.stringify({
      model:      body.model      || "claude-sonnet-4-20250514",
      max_tokens: body.max_tokens || 4000,
      stream,
      system:     body.system     || "",
      messages:   body.messages   || [],
    }),
  });
  if (!response.ok) { const d = await response.json(); return json({ error: d?.error?.message || "API error" }, response.status); }
  if (stream) return new Response(response.body, { status:200, headers:{ "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "X-Accel-Buffering":"no" }});
  return new Response(JSON.stringify(await response.json()), { status:200, headers:{ "Content-Type":"application/json" }});
};
export const config: Config = { path: "/api/claude" };
// helper json(obj,status) → new Response(JSON.stringify(obj),{status,headers:{ "Content-Type":"application/json" }})
```

`verify.mts` (path `/api/verify`) is the same password check without the API call — returns `{ valid: true|false }`, and `{ valid: true }` when no password is configured.

`netlify.toml`:
```toml
[build]
  publish = "."
  functions = "netlify/functions"
[functions."*"]
  timeout = 30
```
The 30s timeout matters for streaming; it has been verified safe for long generations.

### 7.2 Calling the API from the front end

```js
const res = await fetch('/api/claude', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    password: sessionPw, model: 'claude-sonnet-4-20250514',
    max_tokens: 600, stream: false,
    system: '<system prompt>',
    messages: [{ role: 'user', content: prompt }]
  })
});
const data = await res.json();
const text = data.content[0].text.trim();   // strip ```json fences before JSON.parse() if expecting JSON
```

### 7.3 Lazy-password gate (front end)

The page loads freely; the password modal appears on the **first** API action and the value is held in `sessionPw` for the session. Static/reference pages never include this.

**Modal markup:**
```html
<div id="pwModal" class="modal-overlay hidden">
  <div class="modal-box">
    <h3>Acceso API</h3>
    <p>Introduce la contraseña para activar la generación.</p>
    <input type="password" id="pwInput" class="param-input" placeholder="Contraseña">
    <div id="pwErr" class="modal-err"></div>
    <div class="modal-btns">
      <button class="btn-primary"   onclick="submitPw()">Continuar</button>
      <button class="btn-secondary" onclick="closePwModal()">Cancelar</button>
    </div>
  </div>
</div>
```

**Gate logic:**
```js
let sessionPw = null, pendingFn = null;

function requirePw(fn) {                       // wrap any API action: requirePw(doGenerate)
  if (sessionPw) { fn(); return; }
  pendingFn = fn;
  document.getElementById('pwModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('pwInput').focus(), 60);
}
function submitPw() {
  const pw = document.getElementById('pwInput').value.trim();
  if (!pw) { document.getElementById('pwErr').textContent = 'Introduce una contraseña.'; return; }
  sessionPw = pw;
  document.getElementById('pwModal').classList.add('hidden');
  document.getElementById('pwInput').value = '';
  document.getElementById('pwErr').textContent = '';
  if (pendingFn) { const f = pendingFn; pendingFn = null; f(); }
}
function closePwModal() {
  document.getElementById('pwModal').classList.add('hidden');
  document.getElementById('pwErr').textContent = '';
  pendingFn = null;
}
document.getElementById('pwInput').addEventListener('keydown', e => { if (e.key === 'Enter') submitPw(); });
```

`pendingFn` doubles as the connect-then-act bridge: e.g. `pendingFn = () => requirePw(doGenerate); connectDrive();` runs the gated action after Drive finishes connecting.

---

## 8. Quiz-State Conventions

### 8.1 Snapshot at start + batched Drive write

For any quiz that filters its item pool by a mutable property (difficulty, color tag, seen-state):

- **Snapshot at start:** when the run begins, pick and **freeze** the exact list of items for that run. Do not re-pick mid-run — otherwise an item changing state (e.g. going from "hard" to "mastered") would silently leave the pool under the user's feet.
- **Batched write:** hold all state changes (new tags, scores, streaks) in memory during the run and write to Drive **once at the end**, not after every item. Fewer writes, faster, and it pairs cleanly with the single-file CRUD `updateDatasetFile`.

### 8.2 Removability predicate (protect curated data)

In any CRUD dataset, a record is only safe to delete if it carries no curation. Concretely (género's rule, generalize per page): **removable iff it has no tag, an empty `contexto`, and is not an `ambos`/dual-article entry.** Anything with a tag, a `contexto` value, or an `ambos` article is curated and protected from pruning. State the page's exact predicate in the dataset's `notes` field.

### 8.3 No TTS on quiz items

Spoken examples belong on reference pages, not quiz prompts (see Language Policy). A quiz page may still have a Drive bar and a header pill, but no per-item speaker buttons.

---

## 9. Build Checklist

Before shipping an interactive page:

1. [ ] GSI `<script>` in `<head>`; Drive constants set (`FOLDER_NAME` unique to the page; `PARENT_FOLDER` = `'Spanish Learning'`).
2. [ ] `initDriveAuth` called on load via the `setTimeout(initDriveAuth, 500)` pattern.
3. [ ] All authenticated Drive calls go through `driveRequest` (so 401 → reconnect works).
4. [ ] Connection pill + bar present; `setDriveUI` wired for `connected / busy / disconnected`.
5. [ ] Correct data pattern chosen — multi-file archive (§6A) vs single-file CRUD (§6B).
6. [ ] CRUD pages: dataset bootstraps from an embedded seed on first connect; `contentRev` migration present; removability predicate stated in `notes`.
7. [ ] API pages: lazy-password modal + `requirePw` gate; `sessionPw` reused; static pages have no password.
8. [ ] Quiz pages: snapshot-at-start, batched write at end, no TTS on items.
9. [ ] Design tokens inherited from root; neutral-voice TTS only (if any); Spanish-primary chrome.
10. [ ] One self-contained HTML file (no build step); deploy as one observable change, test before the next phase.

---

*End of spec. Commit a copy to the project folder. When a live file diverges from this spec, update this file to match the live file.*
