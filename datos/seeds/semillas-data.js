// semillas-data.js
// Comprensión Lectora — Semilla Aleatoria data set (v4 — deepened vat)
//
// JS-as-data, loaded via <script src> before the page script (same pattern as the
// verb-data files). The roller in comprension-lectora.html reads this global.
//
// DESIGN (see seed-generator-spec.md):
//   - genero/lugar/personaje/eje ALWAYS fire (the spine of every story).
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
// what old numbers produce — accepted, like a game-seed patch. `version` is bumped to 4.
//
// v4 CHANGE (deepened vat): pools widened across every field (no new genres) for
// variety. CRITICAL: widening an OPTIONAL field also raises how often it fires, so each
// optional `noneWeight` was rescaled up in proportion to its new pool — fire-rates (and
// therefore the ~5.8-constraints-per-roll density) are held ~constant. Pool WIDTH grew;
// constraint DENSITY did not. See the validation sweep notes for the held fire-rates.
//
// `weight` (default 1) and `noneWeight` (default 1, optional fields only) let fire-rates
// and preferences be tuned with no code change.
const SEMILLAS = {
  version: 4,
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
        { id: 'hospital',   label: 'en un hospital' },
        { id: 'escuela',    label: 'en una escuela' },
        { id: 'iglesia',    label: 'en una iglesia de pueblo' },
        { id: 'hotel',      label: 'en un hotel medio vacío' },
        { id: 'fabrica',    label: 'en una fábrica' },
        { id: 'puerto',     label: 'en un puerto' },
        { id: 'biblioteca', label: 'en una biblioteca' },
        { id: 'granja',     label: 'en una granja' },
        { id: 'cementerio', label: 'en un cementerio' },
        { id: 'plaza',      label: 'en la plaza de un pueblo' },
        { id: 'afueras',    label: 'en un barrio de las afueras' },
        { id: 'oficina',    label: 'en un edificio de oficinas' },
        { id: 'mercadillo', label: 'en un mercado de pulgas' },
        { id: 'rio',        label: 'a la orilla de un río' },
        // genre-gated specials
        { id: 'estacion',   label: 'en una estación espacial',          requires: ['scifi', 'distopia'] },
        { id: 'nave',       label: 'en una nave espacial',              requires: ['scifi', 'distopia'] },
        { id: 'colonia',    label: 'en una colonia de otro planeta',    requires: ['scifi', 'distopia'] },
        { id: 'frontera',   label: 'en un pueblo fronterizo del oeste', requires: ['western'] },
        { id: 'castillo',   label: 'en un castillo',                    requires: ['historica', 'terror', 'fabula'] },
        { id: 'monasterio', label: 'en un monasterio',                  requires: ['historica', 'terror'] },
        { id: 'hacienda',   label: 'en una hacienda',                   requires: ['historica', 'magico', 'western'] },
        { id: 'mina',       label: 'en una mina',                       requires: ['historica', 'western', 'drama', 'aventura'] },
        { id: 'cuartel',    label: 'en un cuartel',                     requires: ['historica', 'drama', 'distopia'] },
        { id: 'sanatorio',  label: 'en un viejo sanatorio',             requires: ['terror', 'historica', 'drama', 'misterio'] },
        { id: 'estacion_tren', label: 'en una estación de tren abandonada', requires: ['terror', 'misterio', 'noir', 'thriller'] },
        { id: 'laboratorio', label: 'en un laboratorio',                requires: ['scifi', 'distopia', 'thriller', 'terror'] },
        { id: 'selva',      label: 'en plena selva',                    requires: ['aventura', 'magico', 'historica'] }
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
        { id: 'desconocidos', label: 'un grupo de desconocidos' },
        { id: 'detective',    label: 'un detective cansado' },
        { id: 'periodista',   label: 'una periodista terca' },
        { id: 'sacerdote',    label: 'un sacerdote con dudas' },
        { id: 'soldado',      label: 'un soldado que vuelve a casa' },
        { id: 'cientifica',   label: 'una científica obsesionada' },
        { id: 'ladron',       label: 'un ladrón retirado' },
        { id: 'nina_curiosa', label: 'una niña curiosa' },
        { id: 'campesino',    label: 'un campesino endeudado' },
        { id: 'actriz',       label: 'una actriz olvidada' },
        { id: 'relojero',     label: 'un relojero meticuloso' },
        { id: 'enfermera',    label: 'una enfermera del turno de noche' },
        { id: 'cartero',      label: 'un cartero veterano' },
        { id: 'bibliotecaria',label: 'una bibliotecaria reservada' },
        { id: 'pescador',     label: 'un pescador solitario' },
        { id: 'cocinera',     label: 'una cocinera de fonda' },
        { id: 'profesor',     label: 'un profesor distraído' },
        { id: 'abogada',      label: 'una abogada novata' },
        { id: 'musico',       label: 'un músico callejero' },
        { id: 'madre',        label: 'una madre soltera' },
        { id: 'vigilante',    label: 'un vigilante nocturno' },
        { id: 'adolescente',  label: 'una adolescente rebelde' },
        { id: 'viudo',        label: 'un viudo reciente' },
        { id: 'costurera',    label: 'una costurera del pueblo' },
        { id: 'contador',     label: 'un contador honrado' },
        { id: 'mecanico',     label: 'un mecánico taciturno' },
        { id: 'vendedora',    label: 'una vendedora ambulante' },
        { id: 'juez',         label: 'un juez jubilado' },
        { id: 'boxeador',     label: 'un boxeador en decadencia' }
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
    // `tiempo`), so genre is used here as an era proxy. The 15 genre-agnostic
    // options (no `requires`) guarantee no genre ever drains empty. v4 widened the
    // agnostic floor (7→15) and fleshed out the lean genres (noir/comedia/sátira/
    // romance/picaresca, which previously ran almost pure-floor).
    eje: {
      label: 'Eje narrativo',
      gated: true,
      options: [
        // OBJETO
        { id: 'grabacion', label: 'en torno a una grabación que nadie recuerda haber hecho', requires: ['misterio', 'noir', 'terror', 'scifi', 'distopia', 'thriller', 'drama'] },
        { id: 'mapa',      label: 'en torno a un mapa que no coincide con el territorio',     requires: ['aventura', 'historica', 'misterio', 'western', 'magico', 'fabula'] },
        { id: 'reloj',     label: 'en torno a un reloj detenido a una hora imposible',        requires: ['misterio', 'terror', 'magico', 'drama', 'cotidiana', 'historica', 'thriller'] },
        { id: 'carta_tarde', label: 'en torno a una carta que llega demasiado tarde' },
        { id: 'llave',     label: 'en torno a una llave sin cerradura conocida' },
        { id: 'foto',      label: 'en torno a una fotografía que no debería existir' },
        // FIGURA
        { id: 'tuerto',    label: 'en torno a un desconocido tuerto que reaparece' },
        { id: 'doble',     label: 'en torno a un doble idéntico del protagonista' },
        { id: 'nino_sabe', label: 'en torno a un niño que sabe cosas que no debería',         requires: ['terror', 'misterio', 'magico', 'drama', 'fabula'] },
        { id: 'testigo',   label: 'en torno a un testigo que cambia su versión',              requires: ['noir', 'misterio', 'thriller', 'drama'] },
        // HALLAZGO
        { id: 'analisis',  label: 'en torno a un análisis clínico con resultados imposibles', requires: ['scifi', 'distopia', 'terror', 'misterio', 'thriller', 'drama'] },
        { id: 'cuerpo',    label: 'en torno a un cuerpo que no debería estar ahí' },
        { id: 'documento', label: 'en torno a un documento que prueba algo imposible' },
        { id: 'sobre_dinero', label: 'en torno a un sobre con dinero que nadie reclama',      requires: ['noir', 'drama', 'thriller', 'picaresca'] },
        { id: 'enterrado', label: 'en torno al rumor de algo enterrado',                      requires: ['aventura', 'western', 'historica', 'magico', 'fabula'] },
        // CONDICIÓN
        { id: 'insomnio',  label: 'en torno a una aldea entera que ha dejado de dormir',      requires: ['magico', 'terror', 'distopia', 'fabula', 'scifi'] },
        { id: 'olvido',    label: 'en torno a un objeto cotidiano que desaparece de la memoria de todos', requires: ['magico', 'scifi', 'distopia', 'terror', 'misterio'] },
        { id: 'deuda_cobrar', label: 'en torno a una deuda que alguien viene a cobrar' },
        { id: 'deuda_juego', label: 'en torno a una deuda de juego impagable',                requires: ['noir', 'drama', 'picaresca', 'western'] },
        { id: 'secreto',   label: 'en torno a un secreto que alguien amenaza con revelar' },
        // SUCESO
        { id: 'plazo',     label: 'en torno a un plazo que vence al amanecer' },
        { id: 'regreso',   label: 'en torno al regreso de alguien dado por muerto' },
        { id: 'luz',       label: 'en torno a una luz que aparece cada noche en el mismo lugar', requires: ['terror', 'magico', 'scifi', 'misterio', 'distopia', 'fabula'] },
        { id: 'promesa',   label: 'en torno a una promesa hecha hace mucho tiempo' },
        { id: 'herencia',  label: 'en torno a una herencia en disputa' },
        { id: 'decision',  label: 'en torno a una decisión que no se puede deshacer' },
        { id: 'reencuentro', label: 'en torno a un reencuentro que ninguno de los dos buscó', requires: ['romance', 'drama', 'cotidiana', 'comedia'] },
        // COMEDIA / SÁTIRA flavor
        { id: 'invitacion', label: 'en torno a una invitación enviada a la persona equivocada', requires: ['comedia', 'satira', 'romance', 'cotidiana'] },
        { id: 'maleta',    label: 'en torno a una maleta intercambiada por error',           requires: ['comedia', 'satira', 'aventura', 'thriller', 'picaresca'] },
        { id: 'mentira',   label: 'en torno a una mentira pequeña que crece sin control',     requires: ['comedia', 'satira', 'drama', 'romance', 'picaresca', 'cotidiana'] },
        { id: 'formulario', label: 'en torno a un formulario que nadie sabe completar',       requires: ['satira', 'comedia', 'distopia', 'cotidiana'] },
        { id: 'premio',    label: 'en torno a un premio absurdo que todos quieren',           requires: ['satira', 'comedia', 'drama'] },
        { id: 'cargo',     label: 'en torno a un cargo vacante que de pronto todos codician', requires: ['satira', 'comedia', 'drama', 'historica'] },
        // ROMANCE flavor
        { id: 'disputa_ruptura', label: 'en torno a un objeto que dos personas se disputan tras una ruptura', requires: ['romance', 'drama', 'comedia', 'cotidiana'] },
        { id: 'cancion',   label: 'en torno a una canción que ambos creían olvidada',         requires: ['romance', 'drama', 'magico', 'cotidiana'] },
        // PICARESCA flavor
        { id: 'moneda',    label: 'en torno a una moneda falsa que circula por el pueblo',    requires: ['picaresca', 'satira', 'comedia', 'historica', 'western'] },
        { id: 'identidad', label: 'en torno a una identidad prestada que empieza a creerse',  requires: ['picaresca', 'drama', 'satira', 'comedia', 'noir'] },
        { id: 'encargo',   label: 'en torno a un encargo turbio que sale mal',               requires: ['picaresca', 'noir', 'comedia', 'thriller', 'aventura'] },
        // WESTERN / AVENTURA / COTIDIANA flavor
        { id: 'caballo',   label: 'en torno a un caballo que vuelve sin su jinete',          requires: ['western', 'aventura', 'drama'] },
        { id: 'carta_banco', label: 'en torno a una carta del banco que nadie quiere abrir', requires: ['cotidiana', 'drama', 'satira', 'comedia'] },
        // NINGUNO (explicit — never a silent none)
        { id: 'sin_eje',   label: 'sin un objeto o figura central, sostenida por los personajes y la situación' }
      ]
    },

    // ── OPTIONAL FLAVOR (carry noneWeight) ──────────────────────────────────
    // v4: each noneWeight rescaled with its pool so fire-rate ≈ unchanged.
    tiempo: {
      label: 'Época',
      gated: true,
      optional: true,
      noneWeight: 6,   // v3 was 3 (pool 2→~4 agnostic+gated; rescaled to hold ~40% fire)
      options: [
        { id: 'pasado',      label: 'ambientada en el pasado' },        // agnostic
        { id: 'presente',    label: 'ambientada en el presente' },      // agnostic
        { id: 'medio_siglo', label: 'ambientada a mediados del siglo pasado' }, // agnostic
        { id: 'colonial',    label: 'ambientada en la época colonial', requires: ['historica', 'magico', 'aventura', 'western', 'drama'] },
        { id: 'posguerra',   label: 'ambientada en la posguerra',      requires: ['drama', 'historica', 'noir', 'romance', 'cotidiana'] },
        { id: 'antiguedad',  label: 'ambientada en tiempos antiguos',  requires: ['historica', 'fabula', 'aventura', 'magico'] },
        { id: 'atemporal',   label: 'en un tiempo indefinido',         requires: ['fabula', 'magico', 'terror', 'cotidiana'] },
        { id: 'fut_cercano', label: 'ambientada en un futuro cercano', requires: ['scifi', 'distopia'] },
        { id: 'fut_lejano',  label: 'ambientada en un futuro lejano',  requires: ['scifi', 'distopia'] },
        { id: 'fut_ruinas',  label: 'ambientada en un futuro en ruinas', requires: ['distopia', 'scifi'] }
      ]
    },

    motor: {
      label: 'Conflicto',
      gated: false,
      optional: true,
      noneWeight: 22,  // v3 was 6 (pool 6→22; rescaled to hold ~50% fire)
      options: [
        { id: 'naturaleza',  label: 'en conflicto con la naturaleza' },
        { id: 'si_mismo',    label: 'en conflicto consigo mismo' },
        { id: 'sociedad',    label: 'en conflicto con la sociedad' },
        { id: 'desconocido', label: 'frente a lo desconocido' },
        { id: 'otro',        label: 'en conflicto con otra persona' },
        { id: 'destino',     label: 'a merced del destino' },
        { id: 'pasado',      label: 'en conflicto con su propio pasado' },
        { id: 'familia',     label: 'en conflicto con su familia' },
        { id: 'tiempo',      label: 'contra el paso del tiempo' },
        { id: 'mentira',     label: 'atrapado en una mentira que sostiene' },
        { id: 'autoridad',   label: 'contra una autoridad injusta' },
        { id: 'deber_deseo', label: 'entre el deber y el deseo' },
        { id: 'perdida',     label: 'frente a una pérdida reciente' },
        { id: 'tentacion',   label: 'frente a una tentación' },
        { id: 'rival',       label: 'contra un rival inesperado' },
        { id: 'promesa',     label: 'atado a una promesa' },
        { id: 'apariencias', label: 'contra las apariencias' },
        { id: 'secreto_fam', label: 'frente a un secreto familiar' },
        { id: 'comunidad',   label: 'a contracorriente de su comunidad' },
        { id: 'lealtad',     label: 'entre la lealtad y la conveniencia' },
        { id: 'error',       label: 'contra un error del pasado que vuelve' },
        { id: 'verdad',      label: 'frente a una verdad que no quiere ver' }
      ]
    },

    nucleo: {
      label: 'Núcleo temático',
      gated: false,
      optional: true,
      noneWeight: 25,  // v3 was 16 (pool 22→34; rescaled to hold ~58% fire)
      options: [
        { id: 'duelo',         label: 'sobre el duelo' },
        { id: 'ambicion',      label: 'sobre la ambición' },
        { id: 'traicion',      label: 'sobre la traición' },
        { id: 'redencion',     label: 'sobre la redención' },
        { id: 'obsesion',      label: 'sobre la obsesión' },
        { id: 'pertenencia',   label: 'sobre la pertenencia' },
        { id: 'libertad',      label: 'sobre la libertad' },
        { id: 'culpa',         label: 'sobre la culpa' },
        { id: 'venganza',      label: 'sobre la venganza' },
        { id: 'identidad',     label: 'sobre la identidad' },
        { id: 'sacrificio',    label: 'sobre el sacrificio' },
        { id: 'memoria',       label: 'sobre la memoria' },
        { id: 'soledad',       label: 'sobre la soledad' },
        { id: 'esperanza',     label: 'sobre la esperanza' },
        { id: 'engano',        label: 'sobre el engaño' },
        { id: 'lealtad',       label: 'sobre la lealtad' },
        { id: 'perdon',        label: 'sobre el perdón' },
        { id: 'deseo',         label: 'sobre el deseo' },
        { id: 'miedo',         label: 'sobre el miedo' },
        { id: 'codicia',       label: 'sobre la codicia' },
        { id: 'envidia',       label: 'sobre la envidia' },
        { id: 'orgullo',       label: 'sobre el orgullo' },
        { id: 'arrepentimiento', label: 'sobre el arrepentimiento' },
        { id: 'justicia',      label: 'sobre la justicia' },
        { id: 'poder',         label: 'sobre el poder' },
        { id: 'fe',            label: 'sobre la fe' },
        { id: 'verdad',        label: 'sobre la verdad' },
        { id: 'inocencia',     label: 'sobre la inocencia' },
        { id: 'exilio',        label: 'sobre el exilio' },
        { id: 'reputacion',    label: 'sobre la reputación' },
        { id: 'azar',          label: 'sobre el azar' },
        { id: 'madurez',       label: 'sobre la madurez' },
        { id: 'deber',         label: 'sobre el deber' },
        { id: 'compasion',     label: 'sobre la compasión' }
      ]
    },

    tono: {
      label: 'Tono',
      gated: false,
      optional: true,
      noneWeight: 13,  // v3 was 8 (pool 11→18; rescaled to hold ~58% fire)
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
        { id: 'inquietante', label: 'con un tono inquietante' },
        { id: 'realista',    label: 'con un tono realista y sobrio' },
        { id: 'contemplativo', label: 'con un tono contemplativo' },
        { id: 'febril',      label: 'con un tono febril y urgente' },
        { id: 'cronica',     label: 'narrada como una crónica' },
        { id: 'tierno',      label: 'con un tono tierno' },
        { id: 'fabula_oscura', label: 'con un aire de fábula oscura' },
        { id: 'vertiginoso', label: 'con un ritmo vertiginoso' }
      ]
    },

    final: {
      label: 'Final',
      gated: false,
      optional: true,
      noneWeight: 6,   // v3 was 3 (pool 7→13; rescaled to hold ~70% fire)
      options: [
        { id: 'sorpresa',     label: 'con un final sorpresa' },
        { id: 'giro',         label: 'con un giro inesperado' },
        { id: 'abierto',      label: 'con un final abierto' },
        { id: 'circular',     label: 'con un final circular' },
        { id: 'agridulce',    label: 'con un final agridulce' },
        { id: 'ambiguo',      label: 'con un final ambiguo' },
        { id: 'esperanzador', label: 'con un final esperanzador' },
        { id: 'tragico',      label: 'con un final trágico' },
        { id: 'feliz',        label: 'con un final feliz' },
        { id: 'revelador',    label: 'con un final revelador' },
        { id: 'amargo',       label: 'con un final amargo' },
        { id: 'reabre',       label: 'con un final que lo reabre todo' },
        { id: 'justiciero',   label: 'con un final de justicia poética' }
      ]
    }
  }
};
