// semillas-data.js
// Comprensión Lectora — Semilla Aleatoria data set (v2 — full vat)
//
// JS-as-data, loaded via <script src> before the page script (same pattern as the
// verb-data files). The roller in comprension-lectora.html reads this global.
//
// DESIGN (see seed-generator-spec.md):
//   - genero/lugar/personaje ALWAYS fire (the spine of every story).
//   - tiempo/motor/nucleo/tono/final are OPTIONAL: each carries a `noneWeight` so it
//     resolves to "nothing" part of the time. This keeps a typical roll around 5–6
//     hidden constraints — enough to push the model off its default story, few enough
//     to leave it real creative room (and to keep YOU surprised).
//   - Genre is the main anti-sameness lever and is always named, so the model can't
//     drift to its house default (warm magical-realism / earnest-literary).
//
// GATING / PRUNE: a gated field's pool is filtered to options whose `requires` includes
// the chosen genre (options with no `requires` work with every genre). We pre-filter,
// never roll-then-reject. Only true impossibilities are gated (space under a western,
// a far-future historical piece); tonal tension across fields is intentional fuel.
//
// DETERMINISM: the roller consumes exactly one PRNG draw per field in `rollOrder`, so a
// number always resolves to the same world AGAINST THIS VERSION. Editing pools changes
// what old numbers produce — accepted, like a game-seed patch. `version` is bumped to 2.
//
// `weight` (default 1) and `noneWeight` (default 1, optional fields only) let fire-rates
// and preferences be tuned with no code change.
const SEMILLAS = {
  version: 3,
  rollOrder: ['genero', 'lugar', 'tiempo', 'personaje', 'eje', 'motor', 'nucleo', 'tono', 'final'],
  fields: {

    // ── SPINE (always fire) ────────────────────────────────────────────────
    genero: {
      label: 'Género',
      gated: false,
      options: [
        { id: 'misterio',  label: 'misterio' },
        { id: 'noir',      label: 'novela negra' },
        { id: 'terror',    label: 'terror' },
        { id: 'scifi',     label: 'ciencia ficción' },
        { id: 'distopia',  label: 'distopía' },
        { id: 'magico',    label: 'realismo mágico' },
        { id: 'historica', label: 'ficción histórica' },
        { id: 'drama',     label: 'drama realista' },
        { id: 'cotidiana', label: 'vida cotidiana' },
        { id: 'comedia',   label: 'comedia' },
        { id: 'satira',    label: 'sátira' },
        { id: 'romance',   label: 'romance' },
        { id: 'aventura',  label: 'aventura' },
        { id: 'western',   label: 'western' },
        { id: 'fabula',    label: 'fábula' },
        { id: 'picaresca', label: 'picaresca' },
        { id: 'thriller',  label: 'thriller de suspenso' }
      ]
    },

    lugar: {
      label: 'Lugar',
      gated: true,
      options: [
        // genre-agnostic base (works for any genre/era) — guarantees no genre drains empty
        { id: 'pueblo',     label: 'en un pueblo pequeño' },
        { id: 'ciudad',     label: 'en una gran ciudad' },
        { id: 'casa',       label: 'en una casa aislada' },
        { id: 'barco',      label: 'a bordo de un barco' },
        { id: 'tren',       label: 'en un tren' },
        { id: 'mercado',    label: 'en un mercado' },
        { id: 'bosque',     label: 'en un bosque' },
        { id: 'costa',      label: 'en un pueblo costero' },
        { id: 'montana',    label: 'en una montaña remota' },
        { id: 'desierto',   label: 'en un desierto' },
        { id: 'isla',       label: 'en una isla' },
        { id: 'edificio',   label: 'en un viejo edificio de apartamentos' },
        { id: 'camino',     label: 'en un largo camino' },
        { id: 'taberna',    label: 'en una taberna' },
        // genre-gated specials
        { id: 'estacion',   label: 'en una estación espacial',          requires: ['scifi', 'distopia'] },
        { id: 'nave',       label: 'en una nave espacial',              requires: ['scifi', 'distopia'] },
        { id: 'colonia',    label: 'en una colonia de otro planeta',    requires: ['scifi', 'distopia'] },
        { id: 'frontera',   label: 'en un pueblo fronterizo del oeste', requires: ['western'] },
        { id: 'castillo',   label: 'en un castillo',                    requires: ['historica', 'terror', 'fabula'] },
        { id: 'monasterio', label: 'en un monasterio',                  requires: ['historica', 'terror'] },
        { id: 'hacienda',   label: 'en una hacienda',                   requires: ['historica', 'magico', 'western'] }
      ]
    },

    personaje: {
      label: 'Protagonista',
      gated: false,
      options: [
        { id: 'anciano',      label: 'un anciano solitario' },
        { id: 'joven',        label: 'una joven ambiciosa' },
        { id: 'pareja',       label: 'una pareja casada' },
        { id: 'nino',         label: 'un niño que crece' },
        { id: 'forastero',    label: 'un forastero recién llegado' },
        { id: 'funcionario',  label: 'un funcionario gris' },
        { id: 'maestra',      label: 'una maestra jubilada' },
        { id: 'hermanos',     label: 'dos hermanos' },
        { id: 'tendero',      label: 'un tendero del barrio' },
        { id: 'viajero',      label: 'un viajero perdido' },
        { id: 'viuda',        label: 'una viuda' },
        { id: 'artista',      label: 'un artista fracasado' },
        { id: 'medico',       label: 'un médico de pueblo' },
        { id: 'empleada',     label: 'una empleada doméstica' },
        { id: 'impostor',     label: 'un impostor' },
        { id: 'desconocidos', label: 'un grupo de desconocidos' }
      ]
    },

    // ── EJE NARRATIVO (always fires; gated by genre) ────────────────────────
    // The concrete thing the plot orbits — an object, figure, discovery,
    // condition, or event. Added v3 to break the model's house "central object"
    // default (the recurring caja de madera / llave / sobre). Unlike the optional
    // fields below it has NO silent _none and is NOT `optional`: a silent none
    // would hand the slot back to the model and it would drift to a box again.
    // Instead `sin_eje` is an explicit, weighted option that instructs a
    // device-free story. Gated on genre ONLY (the engine can't gate on the rolled
    // `tiempo`), so genre is used here as an era proxy — devices were chosen so
    // that proxy holds (e.g. "una luz" not "un OVNI"). The 7 genre-agnostic
    // options (no `requires`) guarantee no genre ever drains empty. `sin_eje`
    // weight is the dial for how often stories run device-free (~8–14% per genre
    // at weight 1); raise it for more character/situation-driven stories.
    eje: {
      label: 'Eje narrativo',
      gated: true,
      options: [
        // OBJETO
        { id: 'grabacion', label: 'en torno a una grabación que nadie recuerda haber hecho', requires: ['misterio', 'noir', 'terror', 'scifi', 'distopia', 'thriller', 'drama'] },
        { id: 'mapa',      label: 'en torno a un mapa que no coincide con el territorio',     requires: ['aventura', 'historica', 'misterio', 'western', 'magico', 'fabula'] },
        { id: 'reloj',     label: 'en torno a un reloj detenido a una hora imposible',        requires: ['misterio', 'terror', 'magico', 'drama', 'cotidiana', 'historica', 'thriller'] },
        // FIGURA
        { id: 'tuerto',    label: 'en torno a un desconocido tuerto que reaparece' },
        { id: 'doble',     label: 'en torno a un doble idéntico del protagonista' },
        { id: 'nino_sabe', label: 'en torno a un niño que sabe cosas que no debería',         requires: ['terror', 'misterio', 'magico', 'drama', 'fabula'] },
        // HALLAZGO
        { id: 'analisis',  label: 'en torno a un análisis clínico con resultados imposibles', requires: ['scifi', 'distopia', 'terror', 'misterio', 'thriller', 'drama'] },
        { id: 'cuerpo',    label: 'en torno a un cuerpo que no debería estar ahí' },
        { id: 'documento', label: 'en torno a un documento que prueba algo imposible' },
        // CONDICIÓN
        { id: 'insomnio',  label: 'en torno a una aldea entera que ha dejado de dormir',      requires: ['magico', 'terror', 'distopia', 'fabula', 'scifi'] },
        { id: 'olvido',    label: 'en torno a un objeto cotidiano que desaparece de la memoria de todos', requires: ['magico', 'scifi', 'distopia', 'terror', 'misterio'] },
        // SUCESO
        { id: 'plazo',     label: 'en torno a un plazo que vence al amanecer' },
        { id: 'regreso',   label: 'en torno al regreso de alguien dado por muerto' },
        { id: 'luz',       label: 'en torno a una luz que aparece cada noche en el mismo lugar', requires: ['terror', 'magico', 'scifi', 'misterio', 'distopia', 'fabula'] },
        // NINGUNO (explicit — never a silent none)
        { id: 'sin_eje',   label: 'sin un objeto o figura central, sostenida por los personajes y la situación' }
      ]
    },

    // ── OPTIONAL FLAVOR (carry noneWeight) ──────────────────────────────────
    tiempo: {
      label: 'Época',
      gated: true,
      optional: true,
      noneWeight: 3,
      options: [
        { id: 'pasado',      label: 'ambientada en el pasado' },        // agnostic
        { id: 'presente',    label: 'ambientada en el presente' },      // agnostic
        { id: 'fut_cercano', label: 'ambientada en un futuro cercano', requires: ['scifi', 'distopia'] },
        { id: 'fut_lejano',  label: 'ambientada en un futuro lejano',  requires: ['scifi', 'distopia'] }
      ]
    },

    motor: {
      label: 'Conflicto',
      gated: false,
      optional: true,
      noneWeight: 6,
      options: [
        { id: 'naturaleza',  label: 'en conflicto con la naturaleza' },
        { id: 'si_mismo',    label: 'en conflicto consigo mismo' },
        { id: 'sociedad',    label: 'en conflicto con la sociedad' },
        { id: 'desconocido', label: 'frente a lo desconocido' },
        { id: 'otro',        label: 'en conflicto con otra persona' },
        { id: 'destino',     label: 'a merced del destino' }
      ]
    },

    nucleo: {
      label: 'Núcleo temático',
      gated: false,
      optional: true,
      noneWeight: 16,
      options: [
        { id: 'duelo',       label: 'sobre el duelo' },
        { id: 'ambicion',    label: 'sobre la ambición' },
        { id: 'traicion',    label: 'sobre la traición' },
        { id: 'redencion',   label: 'sobre la redención' },
        { id: 'obsesion',    label: 'sobre la obsesión' },
        { id: 'pertenencia', label: 'sobre la pertenencia' },
        { id: 'libertad',    label: 'sobre la libertad' },
        { id: 'culpa',       label: 'sobre la culpa' },
        { id: 'venganza',    label: 'sobre la venganza' },
        { id: 'identidad',   label: 'sobre la identidad' },
        { id: 'sacrificio',  label: 'sobre el sacrificio' },
        { id: 'memoria',     label: 'sobre la memoria' },
        { id: 'soledad',     label: 'sobre la soledad' },
        { id: 'esperanza',   label: 'sobre la esperanza' },
        { id: 'engano',      label: 'sobre el engaño' },
        { id: 'lealtad',     label: 'sobre la lealtad' },
        { id: 'perdon',      label: 'sobre el perdón' },
        { id: 'deseo',       label: 'sobre el deseo' },
        { id: 'miedo',       label: 'sobre el miedo' },
        { id: 'codicia',     label: 'sobre la codicia' },
        { id: 'envidia',     label: 'sobre la envidia' },
        { id: 'orgullo',     label: 'sobre el orgullo' }
      ]
    },

    tono: {
      label: 'Tono',
      gated: false,
      optional: true,
      noneWeight: 8,
      options: [
        { id: 'twilight',    label: 'con un tono al estilo Twilight Zone' },
        { id: 'humor_negro', label: 'con un tono de humor negro' },
        { id: 'lirico',      label: 'con un tono lírico y poético' },
        { id: 'seco',        label: 'con un tono seco y distante' },
        { id: 'parabola',    label: 'narrada como una parábola' },
        { id: 'melancolico', label: 'con un tono melancólico' },
        { id: 'ironico',     label: 'con un tono irónico' },
        { id: 'suspenso',    label: 'con un suspenso creciente' },
        { id: 'coral',       label: 'narrada por varias voces' },
        { id: 'nostalgico',  label: 'con un tono nostálgico' },
        { id: 'inquietante', label: 'con un tono inquietante' }
      ]
    },

    final: {
      label: 'Final',
      gated: false,
      optional: true,
      noneWeight: 3,
      options: [
        { id: 'sorpresa',     label: 'con un final sorpresa' },
        { id: 'giro',         label: 'con un giro inesperado' },
        { id: 'abierto',      label: 'con un final abierto' },
        { id: 'circular',     label: 'con un final circular' },
        { id: 'agridulce',    label: 'con un final agridulce' },
        { id: 'ambiguo',      label: 'con un final ambiguo' },
        { id: 'esperanzador', label: 'con un final esperanzador' }
      ]
    }
  }
};
