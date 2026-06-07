// semillas-data.js
// Comprensión Lectora — Semilla Aleatoria data set (v1, tiny vat)
//
// JS-as-data, loaded via <script src> before the page script (same pattern as
// the verb-data files). The roller in comprension-lectora.html reads this global.
//
// DETERMINISM: the roller consumes exactly one PRNG draw per field in `rollOrder`,
// so the same seed number always resolves to the same world AGAINST THIS VERSION.
// Editing this file changes what old numbers produce — that is accepted (like a
// game-seed patch). Bump `version` whenever the pools change.
//
// PRUNE: a gated field's pool is filtered to options whose `requires` includes the
// chosen genre (options with no `requires` are compatible with every genre). v1's
// one real conflict: estacion/nave must vanish unless the genre is scifi.
const SEMILLAS = {
  version: 1,
  rollOrder: ['genero', 'lugar', 'final', 'pecado', 'personaje', 'situacion', 'tiempo', 'tratamiento'],
  fields: {
    genero: {                          // anchor — prunes everything below
      gated: false,
      options: [
        { id: 'scifi',    label: 'ciencia ficción', weight: 1 },
        { id: 'misterio', label: 'misterio',        weight: 1 },
        { id: 'sobrenat', label: 'sobrenatural',    weight: 1 }
      ]
    },
    lugar: {                           // gated by genero via `requires`
      gated: true,
      options: [
        { id: 'barco',    label: 'en un barco',              weight: 1 },
        { id: 'avion',    label: 'en un avión',              weight: 1 },
        { id: 'estacion', label: 'en una estación espacial', weight: 1, requires: ['scifi'] },
        { id: 'nave',     label: 'en una nave espacial',     weight: 1, requires: ['scifi'] },
        { id: 'pueblo',   label: 'en un pueblo pequeño',     weight: 1 },
        { id: 'ciudad',   label: 'en una gran ciudad',       weight: 1 }
      ]
    },
    final: {
      gated: false,
      options: [
        { id: 'sorpresa', label: 'final sorpresa', weight: 1 },
        { id: 'giro',     label: 'final con giro', weight: 1 }
      ]
    },
    pecado: {
      gated: false,
      options: [
        { id: 'soberbia', label: 'destacar la soberbia' },
        { id: 'ira',      label: 'destacar la ira' },
        { id: 'envidia',  label: 'destacar la envidia' },
        { id: 'avaricia', label: 'destacar la avaricia' },
        { id: 'lujuria',  label: 'destacar la lujuria' },
        { id: 'gula',     label: 'destacar la gula' },
        { id: 'pereza',   label: 'destacar la pereza' }
      ]
    },
    personaje: {
      gated: false,
      options: [
        { id: 'anciano', label: 'un anciano' },
        { id: 'joven',   label: 'una joven' },
        { id: 'pareja',  label: 'una pareja casada' },
        { id: 'nino',    label: 'un niño que crece' }
      ]
    },
    situacion: {                       // `optional` adds an implicit "none" slot
      gated: false,
      optional: true,
      options: [
        { id: 'aislamiento', label: 'marcada por el aislamiento' }
      ]
    },
    tiempo: {
      gated: false,
      options: [
        { id: 'pasado',   label: 'ambientada en el pasado' },
        { id: 'presente', label: 'ambientada en el presente' },
        { id: 'futuro',   label: 'ambientada en el futuro' }
      ]
    },
    tratamiento: {                     // genre-agnostic treatments
      gated: false,
      optional: true,
      options: [
        { id: 'twilight', label: 'con un tono al estilo Twilight Zone' },
        { id: 'shakes',   label: 'con un tono shakesperiano' },
        { id: 'parabola', label: 'narrada como una parábola' }
      ]
    }
  }
};
