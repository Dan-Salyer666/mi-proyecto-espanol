// datos/verbos/verbos-test.js
// ===========================================================================
// PHASE 1 TEST DATASET — for shape verification only
// ---------------------------------------------------------------------------
// Purpose: prove the two-layer data model works end-to-end with real content
// before committing to enriching the 1,224-entry master list.
//
// Two-layer model:
//   - VERB_PROFILES_TEST: one record per unique verb string (echar and
//     echarse are separate). Holds the static "Significados y Usos" summary
//     and irregularity pattern.
//   - VERB_CONTEXTS_TEST: one record per master list entry. Holds per-context
//     info (English meaning, explanation, synonyms, example). This is what
//     the quiz drills.
//
// On the detail page, both layers assemble: context-specific content changes
// per question; profile content stays static across all contexts of that verb.
//
// Scope of this test file:
//   - 6 unique verbs (5 profiles + 1 pronominal profile)
//   - 11 total contexts
//   - Covers: multi-context verbs (quedar, llevar, coger), GUSTAR grammar,
//     pronominal profile (dormirse), regional variation (coger/agarrar),
//     mixed registers (everyday, vulgar)
//
// This file is NOT filter-viable — it's too small to run filter-mode quizzes.
// That's intentional. Filter-viable data (~35-45 entries) comes in the next
// pass, AFTER data shape is approved.
// ===========================================================================


const VERB_PROFILES_TEST = [

  // -------------------------------------------------------------------------
  // QUEDAR — multi-context profile. Three contexts in the test file, but the
  // summary covers the broader range of common uses per Daniel's reference
  // page on quedar & quedarse.
  // -------------------------------------------------------------------------
  {
    verb: "quedar",
    irregularity: "regular",
    summary: {
      blurb: "One of Spanish's most versatile verbs. Core sense is about remaining, being left, or ending up in a state — but it extends into clothing fit, social arrangements, location, and idiomatic outcomes. Grammar shifts depending on the meaning: sometimes intransitive, sometimes como gustar, sometimes fixed phrase.",
      uses: [
        {
          meaning: "to be left, to remain",
          example: "Solo quedan tres días para el viaje.",
          register: "everyday"
        },
        {
          meaning: "to fit, to suit (como gustar)",
          example: "Esa camisa te queda genial.",
          register: "everyday"
        },
        {
          meaning: "to agree to, to arrange (quedar en + inf)",
          example: "Quedamos en vernos a las ocho.",
          register: "everyday"
        },
        {
          meaning: "to be located (quedar en + place)",
          example: "El cine queda cerca de aquí.",
          register: "everyday"
        },
        {
          meaning: "to end up, to be left (outcome)",
          example: "Quedamos muy tristes con la noticia.",
          register: "everyday"
        },
        {
          meaning: "quedar bien / mal — to look good / bad on someone",
          example: "Ese color te queda bien.",
          register: "everyday"
        }
      ],
      pronominalNote: null
    }
  },

  // -------------------------------------------------------------------------
  // LLEVAR — multi-context profile. Three contexts drilled. Summary covers
  // the major uses including ones not in the test contexts.
  // -------------------------------------------------------------------------
  {
    verb: "llevar",
    irregularity: "regular",
    summary: {
      blurb: "Core meaning is to carry or take something/someone to a place — the opposite of traer (which is toward the speaker). Llevar extends into wearing clothing, expressing durations of time ('llevo dos horas esperando'), and leading or being ahead.",
      uses: [
        {
          meaning: "to carry, to take (to a place)",
          example: "Llevá estas cajas al auto.",
          register: "everyday"
        },
        {
          meaning: "to take someone somewhere",
          example: "Te llevo al aeropuerto.",
          register: "everyday"
        },
        {
          meaning: "to wear (clothing)",
          example: "Llevaba una remera negra.",
          register: "everyday"
        },
        {
          meaning: "to have been (doing something) for — llevar + time + gerund",
          example: "Llevo dos horas esperando.",
          register: "everyday"
        },
        {
          meaning: "to lead, to be ahead",
          example: "Les llevamos dos goles.",
          register: "everyday"
        },
        {
          meaning: "to carry on one's person",
          example: "No llevo plata.",
          register: "everyday"
        }
      ],
      pronominalNote: null
    }
  },

  // -------------------------------------------------------------------------
  // GUSTAR — single-context profile. The canonical como gustar verb.
  // Included in test set to prove GUSTAR grammar renders correctly.
  // -------------------------------------------------------------------------
  {
    verb: "gustar",
    irregularity: "regular",
    summary: {
      blurb: "The quintessential como gustar verb. The thing liked is the grammatical subject; the person who likes it is the indirect object. 'Me gusta el café' literally = coffee is pleasing to me. This inverted structure is the model for a whole family of Spanish verbs (encantar, doler, faltar, importar, etc.).",
      uses: [
        {
          meaning: "to like, to please (como gustar)",
          example: "Me gusta mucho ese libro.",
          register: "everyday"
        },
        {
          meaning: "to enjoy (with gerund) — me gusta + infinitive",
          example: "Me gusta leer por las noches.",
          register: "everyday"
        }
      ],
      pronominalNote: null
    }
  },

  // -------------------------------------------------------------------------
  // DORMIRSE — pronominal profile. Meaning shifts from base verb dormir
  // (to sleep → to fall asleep). pronominalNote captures the shift, which
  // is important for idiomatic pronominals.
  // -------------------------------------------------------------------------
  {
    verb: "dormirse",
    irregularity: "pres: o→ue; pret: o→u (3s/3p); ger: durmiendo",
    summary: {
      blurb: "Pronominal form of dormir. Focuses on the transition into sleep — the moment of falling asleep, not the state of sleeping. Also used idiomatically for limbs going numb.",
      uses: [
        {
          meaning: "to fall asleep",
          example: "Me dormí en el sillón.",
          register: "everyday"
        },
        {
          meaning: "(body part) to fall asleep, to go numb",
          example: "Se me durmió la pierna.",
          register: "everyday"
        }
      ],
      pronominalNote: "Dormir means to sleep (the state); dormirse specifically marks the transition — falling asleep. 'Dormí ocho horas' = I slept eight hours. 'Me dormí a las once' = I fell asleep at eleven. The pronominal shift here is aspectual (state → change of state), not reflexive."
    }
  },

  // -------------------------------------------------------------------------
  // COGER — region-sensitive profile. Two contexts with DIFFERENT register
  // and region tags: neutral/everyday in Spain, vulgar/lat-am elsewhere.
  // This is the strongest example of why register and region live on the
  // context layer, not the profile.
  // -------------------------------------------------------------------------
  {
    verb: "coger",
    irregularity: "pres: g→j (yo: cojo)",
    summary: {
      blurb: "A verb whose acceptability depends sharply on region. In Spain, coger is neutral and everyday — you use it to catch a bus, grab a book, take a cab. In most of Latin America (especially Mexico, Argentina, Central America), the same verb is vulgar slang for sex, and neutral uses are replaced by agarrar, tomar, or llevar.",
      uses: [
        {
          meaning: "to take, to grab, to catch (Spain — neutral)",
          example: "Cojo el autobús cada mañana.",
          register: "everyday"
        },
        {
          meaning: "to have sex (Latin America — vulgar)",
          example: "[vulgar — avoided in neutral contexts]",
          register: "vulgar"
        }
      ],
      pronominalNote: null
    }
  },

  // -------------------------------------------------------------------------
  // AGARRAR — region partner to coger. The Latin American everyday verb for
  // taking/grabbing. Included to complete the regional contrast.
  // -------------------------------------------------------------------------
  {
    verb: "agarrar",
    irregularity: "regular",
    summary: {
      blurb: "The Latin American everyday verb for taking, grabbing, or catching. Fills the role coger plays in Spain. Can be physical (grabbing an object) or figurative (catching a cold, catching a bus in some regions).",
      uses: [
        {
          meaning: "to grab, to take hold of",
          example: "Agarrá esa caja, por favor.",
          register: "everyday"
        },
        {
          meaning: "to catch (a bus, a cold, etc.)",
          example: "Agarré un resfrío.",
          register: "everyday"
        }
      ],
      pronominalNote: null
    }
  }

];


const VERB_CONTEXTS_TEST = [

  // === QUEDAR (3 contexts) ===================================================

  {
    verb: "quedar",
    phrase: "quedar",
    grammar: "INTR",
    english: "to be left, to remain",
    register: "everyday",
    region: "neutral",
    notes: "\"quedan tres\" = there are three left",
    contextExplanation: "Indicates that something remains or is left over — often used with quantity or time. The thing that remains is the grammatical subject; no agent is needed. Signals a state, not an action.",
    synonyms: ["sobrar", "restar"],
    example: {
      spanish: "Solo quedan tres días para el viaje.",
      english: "Only three days remain until the trip."
    }
  },

  {
    verb: "quedar",
    phrase: "quedar",
    grammar: "GUSTAR",
    english: "to fit, to suit, to look (good/bad) on",
    register: "everyday",
    region: "neutral",
    notes: "como gustar: 'te queda bien esa camisa' = that shirt looks good on you",
    contextExplanation: "Follows the como gustar pattern — the clothing or style is the grammatical subject, the person is the indirect object. 'Me queda bien' literally means 'it fits well to me' — the shirt is doing the fitting.",
    synonyms: ["sentarle (bien/mal)", "verse"],
    example: {
      spanish: "Esa camisa te queda genial.",
      english: "That shirt looks great on you."
    }
  },

  {
    verb: "quedar",
    phrase: "quedar en",
    grammar: "PHRASE",
    english: "to agree to, to arrange to",
    register: "everyday",
    region: "neutral",
    notes: "\"quedamos en vernos mañana\" = we agreed to meet tomorrow",
    contextExplanation: "Quedar en + infinitive (or noun) means to agree or arrange to do something. Very common for making social plans. Distinct from quedar con (to meet up with), which is more colloquial.",
    synonyms: ["acordar", "arreglar"],
    example: {
      spanish: "Quedamos en vernos a las ocho.",
      english: "We agreed to meet at eight."
    }
  },

  // === LLEVAR (3 contexts) ===================================================

  {
    verb: "llevar",
    phrase: "llevar",
    grammar: "TR",
    english: "to take, to carry",
    register: "everyday",
    region: "neutral",
    notes: "basic meaning — llevar algo a algún lugar",
    contextExplanation: "The base transitive meaning: to carry or take something (or someone) to a place. Opposite of traer, which implies motion toward the speaker. Llevar = away from speaker or toward a destination.",
    synonyms: ["cargar", "transportar"],
    example: {
      spanish: "Te llevo al aeropuerto.",
      english: "I'll take you to the airport."
    }
  },

  {
    verb: "llevar",
    phrase: "llevar",
    grammar: "TR",
    english: "to wear, to have on",
    register: "everyday",
    region: "neutral",
    notes: "\"lleva sus botas\" = she's wearing her boots",
    contextExplanation: "Llevar also means to wear clothing or accessories — a common use that English speakers often underuse in favor of vestir. Can also mean to carry on one's person ('no llevo plata' = I don't have any money on me).",
    synonyms: ["vestir", "tener puesto"],
    example: {
      spanish: "Llevaba una remera negra y jeans.",
      english: "He was wearing a black t-shirt and jeans."
    }
  },

  {
    verb: "llevar",
    phrase: "llevar + time",
    grammar: "PHRASE",
    english: "to have been (doing) for",
    register: "everyday",
    region: "neutral",
    notes: "\"llevo cuatro horas estudiando\" = I've been studying for four hours — progressive time sense",
    contextExplanation: "Llevar + time + gerund expresses how long something has been going on. Very common in spoken Spanish, and often the most natural way to render English perfect-progressive constructions ('I've been waiting for two hours' → 'Llevo dos horas esperando').",
    synonyms: ["hacer que + present"],
    example: {
      spanish: "Llevo dos horas esperando.",
      english: "I've been waiting for two hours."
    }
  },

  // === GUSTAR (1 context) ====================================================

  {
    verb: "gustar",
    phrase: "gustar",
    grammar: "GUSTAR",
    english: "to like, to please",
    register: "everyday",
    region: "neutral",
    notes: "me gusta = I like it; the quintessential como gustar verb",
    contextExplanation: "The foundational como gustar verb. The grammatical subject is the thing being liked; the person who likes it appears as an indirect object. 'Me gusta el café' = coffee is pleasing to me (not 'I like coffee' in surface structure).",
    synonyms: ["agradar", "encantar"],
    example: {
      spanish: "Me gusta mucho ese libro.",
      english: "I really like that book."
    }
  },

  // === DORMIRSE (1 context) ==================================================

  {
    verb: "dormirse",
    phrase: "dormirse",
    grammar: "PRON",
    english: "to fall asleep",
    register: "everyday",
    region: "neutral",
    notes: "me dormí; also: se me durmió la pierna",
    contextExplanation: "Pronominal — marks the moment of falling asleep, not the state of sleeping (that's dormir). Also used for body parts going numb: 'se me durmió la pierna' = my leg fell asleep.",
    synonyms: ["quedarse dormido"],
    example: {
      spanish: "Me dormí en el sillón viendo la película.",
      english: "I fell asleep on the couch watching the movie."
    }
  },

  // === COGER (2 contexts) ====================================================

  {
    verb: "coger",
    phrase: "coger",
    grammar: "TR",
    english: "to take, to grab, to catch",
    register: "everyday",
    region: "spain",
    notes: "neutral in Spain; coger el autobús = to take the bus",
    contextExplanation: "In Peninsular Spanish, coger is the everyday verb for taking, grabbing, or catching — completely neutral. You catch a bus, grab a book, pick up the phone. Latin American speakers replace this use with agarrar, tomar, or llevar depending on context, because in most of Latin America coger has a vulgar meaning.",
    synonyms: ["agarrar (lat-am)", "tomar", "asir"],
    example: {
      spanish: "Cojo el autobús cada mañana para ir al trabajo.",
      english: "I take the bus every morning to go to work."
    }
  },

  {
    verb: "coger",
    phrase: "coger",
    grammar: "TR",
    english: "to have sex (vulgar)",
    register: "vulgar",
    region: "lat-am",
    notes: "vulgar in Latin America; reason coger is avoided in non-Spain contexts",
    contextExplanation: "In most of Latin America, coger is vulgar slang for sexual intercourse. This is why the Peninsular 'coger el autobús' sounds jarring to Latin American ears and why agarrar/tomar are used instead for neutral taking/grabbing. Awareness of this register is essential for travel and media consumption.",
    synonyms: ["[vulgar — see neutral: tener relaciones]"],
    example: {
      spanish: "[contextual example omitted — vulgar register]",
      english: "[contextual example omitted — vulgar register]"
    }
  },

  // === AGARRAR (1 context) ===================================================

  {
    verb: "agarrar",
    phrase: "agarrar",
    grammar: "TR",
    english: "to grab, to take hold of",
    register: "everyday",
    region: "lat-am",
    notes: "preferred over coger in Latin America",
    contextExplanation: "The Latin American everyday verb for grabbing, taking, or catching. Fills the semantic role that coger plays in Spain. Physical by default ('agarrá la caja') but also used figuratively ('agarré un resfrío' = I caught a cold).",
    synonyms: ["tomar", "coger (spain)", "asir"],
    example: {
      spanish: "Agarrá esa caja antes de que se caiga.",
      english: "Grab that box before it falls."
    }
  }

];
