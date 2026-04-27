// verbos-a-d.js — Phase 1 stub (A-D letter range)
// 15 contexts across 13 unique profiles (acabar has 3 contexts → 1 shared profile)
//
// Filter coverage contributions:
//   Spain region: 3 (apañar, apetecer, coger)
//   Lat-am region: 2 (agarrar, dar vuelta)
//   GUSTAR pattern: 4 (agradar, apetecer, bastar, doler)
//   Pronominal (PRON+REFL+RECIP): 2 (abrazarse, aburrirse)
//   Standard register: 4 (acoger, acordar, agradar, bastar)
//   Multi-context verb: acabar (3 contexts: acabar / acabar con / acabar de)

const VERB_PROFILES_AD = [
  {
    verb: "acabar",
    irregularity: "regular",
    summary: {
      blurb: "A common verb meaning to finish or to end. Forms several idiomatic constructions where the preposition shifts the meaning entirely (acabar con, acabar de, acabar por).",
      uses: [
        { meaning: "to finish, to end (transitive)", example: "Acabé el libro anoche.", register: "everyday" },
        { meaning: "to end, to come to a close (intransitive)", example: "La clase acaba a las cinco.", register: "everyday" },
        { meaning: "to put an end to, to finish off (with con)", example: "Hay que acabar con la corrupción.", register: "everyday" },
        { meaning: "to have just done (with de + infinitive)", example: "Acabo de llegar.", register: "everyday" },
        { meaning: "to end up doing (with por + infinitive)", example: "Acabó por aceptar la oferta.", register: "everyday" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "abrazarse",
    irregularity: "pret: z→c (yo)",
    summary: {
      blurb: "The reciprocal form of abrazar. Two or more people hugging each other, as opposed to one person hugging another.",
      uses: [
        { meaning: "to hug each other, to embrace each other", example: "Se abrazaron al verse.", register: "everyday" }
      ],
      pronominalNote: "Reciprocal of abrazar — the action goes mutually between participants. 'Se abrazaron' means they hugged each other, not that they hugged themselves."
    }
  },
  {
    verb: "aburrirse",
    irregularity: "regular",
    summary: {
      blurb: "The pronominal form of aburrir, with a meaning shift: aburrir means 'to bore someone' (causative), while aburrirse means 'to be bored' (the experience of boredom).",
      uses: [
        { meaning: "to be bored, to get bored", example: "Me aburro en clase.", register: "everyday" },
        { meaning: "to grow tired of (with de)", example: "Se aburrió de esperar y se fue.", register: "everyday" }
      ],
      pronominalNote: "Not a literal 'to bore oneself' — the pronominal flips the perspective from causing boredom to experiencing it. Compare: 'la película me aburre' (the movie bores me) vs 'me aburro con la película' (I get bored with the movie)."
    }
  },
  {
    verb: "acoger",
    irregularity: "pres: g→j (yo)",
    summary: {
      blurb: "To take in, to welcome, to receive — used for receiving people (guests, refugees, ideas) into a space, group, or situation. More formal than 'recibir' in many contexts.",
      uses: [
        { meaning: "to take in, to welcome (a person)", example: "La familia acogió al niño huérfano.", register: "standard" },
        { meaning: "to receive (an idea, a proposal)", example: "El público acogió la propuesta con entusiasmo.", register: "standard" },
        { meaning: "to host (an event)", example: "La ciudad acogerá los Juegos Olímpicos.", register: "standard" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "acordar",
    irregularity: "pres: o→ue",
    summary: {
      blurb: "To agree on something, to decide jointly. The pronominal form acordarse de means 'to remember' — a meaning shift worth knowing.",
      uses: [
        { meaning: "to agree on, to decide together", example: "Acordamos vernos el viernes.", register: "standard" },
        { meaning: "to award, to grant (formal)", example: "El tribunal le acordó el premio.", register: "formal" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "agarrar",
    irregularity: "pret: g→gu (yo)",
    summary: {
      blurb: "To grab, to take hold of. Preferred over 'coger' throughout Latin America (where 'coger' has acquired a vulgar second meaning). Spain still uses 'coger' for this same neutral sense.",
      uses: [
        { meaning: "to grab, to take hold of", example: "Agarrá la pelota.", register: "everyday" },
        { meaning: "to catch (a bus, a flight)", example: "Agarro el colectivo en la esquina.", register: "everyday" },
        { meaning: "to catch (an illness)", example: "Agarró un resfriado.", register: "everyday" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "agradar",
    irregularity: "regular",
    summary: {
      blurb: "A 'gustar'-pattern verb meaning to please. Slightly more formal than gustar — used when you want to express liking with a touch more refinement.",
      uses: [
        { meaning: "to please, to be pleasing", example: "Me agrada tu manera de hablar.", register: "standard" },
        { meaning: "to please, to delight (slightly formal)", example: "Nos agradó conocerlos.", register: "standard" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "apañar",
    irregularity: "regular",
    summary: {
      blurb: "Spain-dominant verb meaning to fix, mend, or sort out. Often colloquial. The pronominal apañarse means to manage or get by.",
      uses: [
        { meaning: "to fix, to mend, to sort out", example: "Apaña el grifo cuando puedas.", register: "colloquial" },
        { meaning: "to arrange, to put together (informally)", example: "Le apañé un sitio donde dormir.", register: "colloquial" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "apetecer",
    irregularity: "pres: yo -zco",
    summary: {
      blurb: "A 'gustar'-pattern verb expressing desire or appetite for something. Strongly Spain-dominant — Latin Americans typically say 'tener ganas de' or 'antojarse' instead.",
      uses: [
        { meaning: "to feel like, to fancy (Spain)", example: "Me apetece un café.", register: "everyday" },
        { meaning: "to be appealing (Spain)", example: "No me apetece nada salir esta noche.", register: "everyday" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "bastar",
    irregularity: "regular",
    summary: {
      blurb: "A 'gustar'-pattern verb meaning to be enough or to suffice. Common in fixed expressions like 'basta con + infinitivo' (it's enough to...) and 'me basta' (it's enough for me).",
      uses: [
        { meaning: "to be enough, to suffice", example: "Me basta con saber que estás bien.", register: "standard" },
        { meaning: "to suffice (impersonal, with con)", example: "Basta con apretar este botón.", register: "standard" },
        { meaning: "stop! (imperative, ¡basta!)", example: "¡Basta de gritar!", register: "everyday" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "coger",
    irregularity: "pres: g→j (yo)",
    summary: {
      blurb: "Spain's everyday verb for 'to take, grab, catch.' In most of Latin America (especially the Southern Cone and Mexico) this verb has acquired a vulgar sexual meaning, so 'agarrar' or 'tomar' replace it for the neutral senses.",
      uses: [
        { meaning: "to take, to grab (Spain)", example: "Coge el libro de la mesa.", register: "everyday" },
        { meaning: "to catch (a bus, a flight) (Spain)", example: "Cojo el autobús a las ocho.", register: "everyday" },
        { meaning: "to catch (an illness) (Spain)", example: "Cogió un resfriado.", register: "everyday" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "dar vuelta",
    irregularity: "irregular (dar)",
    summary: {
      blurb: "A Latin American phrasal expression meaning to turn over or flip. In Spain the preferred construction is 'dar la vuelta a algo' (with the article).",
      uses: [
        { meaning: "to turn over, to flip (lat-am)", example: "Dale vuelta a la tortilla.", register: "everyday" },
        { meaning: "to turn around (lat-am)", example: "Dio vuelta y me miró.", register: "everyday" }
      ],
      pronominalNote: null
    }
  },
  {
    verb: "doler",
    irregularity: "pres: o→ue",
    summary: {
      blurb: "A 'gustar'-pattern verb for physical or emotional pain. The thing that hurts is the grammatical subject; the person experiencing the pain takes the indirect object pronoun.",
      uses: [
        { meaning: "to hurt, to ache (physical)", example: "Me duele la cabeza.", register: "everyday" },
        { meaning: "to hurt, to grieve (emotional)", example: "Le dolió mucho la noticia.", register: "everyday" }
      ],
      pronominalNote: null
    }
  }
];

const VERB_CONTEXTS_AD = [
  {
    verb: "acabar",
    phrase: "acabar",
    grammar: "TR/INTR",
    english: "to finish, to end",
    register: "everyday",
    region: "neutral",
    notes: "",
    contextExplanation: "The base sense of acabar — to finish or end something. Works both transitively (with a direct object: acabar el trabajo) and intransitively (la película acabó).",
    synonyms: ["terminar", "concluir", "finalizar"],
    example: {
      spanish: "Acabé la tarea antes de la cena.",
      english: "I finished my homework before dinner."
    }
  },
  {
    verb: "acabar",
    phrase: "acabar con",
    grammar: "PHRASE",
    english: "to put an end to, to finish off",
    register: "everyday",
    region: "neutral",
    notes: "",
    contextExplanation: "With the preposition 'con', acabar shifts to mean putting a definitive end to something — often a problem, a conflict, or a bad habit. Carries a sense of decisive resolution.",
    synonyms: ["eliminar", "terminar con"],
    example: {
      spanish: "Hay que acabar con la corrupción.",
      english: "We have to put an end to corruption."
    }
  },
  {
    verb: "acabar",
    phrase: "acabar de",
    grammar: "PHRASE",
    english: "to have just done something",
    register: "everyday",
    region: "neutral",
    notes: "acabar de + infinitive; periphrastic construction",
    contextExplanation: "Used with 'de' + infinitive, this construction expresses that something has just happened. Equivalent to English 'to have just done X.' Always paired with an infinitive.",
    synonyms: ["recién + infinitivo (lat-am)"],
    example: {
      spanish: "Acabo de llegar a casa.",
      english: "I just got home."
    }
  },
  {
    verb: "abrazarse",
    phrase: "abrazarse",
    grammar: "RECIP",
    english: "to hug each other, to embrace each other",
    register: "everyday",
    region: "neutral",
    notes: "",
    contextExplanation: "The reciprocal form of abrazar — implies mutual hugging between two or more people. The 'se' here marks the action as going both ways, not directed at oneself.",
    synonyms: ["darse un abrazo"],
    example: {
      spanish: "Los hermanos se abrazaron al reencontrarse.",
      english: "The siblings hugged each other when they were reunited."
    }
  },
  {
    verb: "aburrirse",
    phrase: "aburrirse",
    grammar: "PRON",
    english: "to be bored, to get bored",
    register: "everyday",
    region: "neutral",
    notes: "not 'to bore oneself' — meaning shifts",
    contextExplanation: "The pronominal form flips the perspective from causing boredom (aburrir = to bore someone) to experiencing it (aburrirse = to feel bored). Don't translate literally as 'to bore oneself.'",
    synonyms: ["estar aburrido"],
    example: {
      spanish: "Me aburro mucho en las reuniones largas.",
      english: "I get really bored in long meetings."
    }
  },
  {
    verb: "acoger",
    phrase: "acoger",
    grammar: "TR",
    english: "to take in, to welcome, to receive",
    register: "standard",
    region: "neutral",
    notes: "",
    contextExplanation: "Used for receiving people, ideas, or events into a space or group. More formal than 'recibir' and carries a connotation of warmth or generosity in the welcome.",
    synonyms: ["recibir", "dar refugio a"],
    example: {
      spanish: "La familia acogió al estudiante extranjero durante un año.",
      english: "The family took in the foreign student for a year."
    }
  },
  {
    verb: "acordar",
    phrase: "acordar",
    grammar: "TR",
    english: "to agree on, to decide together",
    register: "standard",
    region: "neutral",
    notes: "acordar algo = to agree on something",
    contextExplanation: "Used when two or more parties reach a decision together. The thing agreed upon is the direct object. Note that acordarse (pronominal) means 'to remember' — a different verb in practice.",
    synonyms: ["pactar", "convenir"],
    example: {
      spanish: "Acordamos repartir los gastos a partes iguales.",
      english: "We agreed to split the expenses equally."
    }
  },
  {
    verb: "agarrar",
    phrase: "agarrar",
    grammar: "TR",
    english: "to grab, to take hold of",
    register: "everyday",
    region: "lat-am",
    notes: "preferred over coger in Latin America",
    contextExplanation: "The standard Latin American verb for grabbing or taking hold of something. Replaces 'coger' for this neutral sense throughout most of the region, since 'coger' has a vulgar meaning in Latin America.",
    synonyms: ["tomar", "asir"],
    example: {
      spanish: "Agarrá la pelota antes de que se caiga.",
      english: "Grab the ball before it falls."
    }
  },
  {
    verb: "agradar",
    phrase: "agradar",
    grammar: "GUSTAR",
    english: "to please, to be pleasing",
    register: "standard",
    region: "neutral",
    notes: "me agrada = it pleases me; como gustar construction",
    contextExplanation: "A gustar-pattern verb. The thing that pleases is the grammatical subject; the person who is pleased takes the indirect object pronoun. Slightly more formal in tone than gustar.",
    synonyms: ["gustar", "complacer"],
    example: {
      spanish: "Me agrada mucho su forma de explicar las cosas.",
      english: "I really like the way she explains things."
    }
  },
  {
    verb: "apañar",
    phrase: "apañar",
    grammar: "TR",
    english: "to fix, to mend, to sort out",
    register: "colloquial",
    region: "spain",
    notes: "",
    contextExplanation: "A colloquial Spain verb for fixing or sorting something out, often informally or with limited resources. Carries a 'making it work' flavor rather than a proper repair.",
    synonyms: ["arreglar", "reparar"],
    example: {
      spanish: "Apañé la silla con un poco de pegamento.",
      english: "I fixed the chair with a bit of glue."
    }
  },
  {
    verb: "apetecer",
    phrase: "apetecer",
    grammar: "GUSTAR",
    english: "to feel like, to fancy",
    register: "everyday",
    region: "spain",
    notes: "me apetece un café; como gustar construction; Spain-dominant",
    contextExplanation: "A gustar-pattern verb expressing desire or appetite for something. Common in everyday Spain. Latin Americans typically say 'tener ganas de' or 'antojarse' for the same idea.",
    synonyms: ["tener ganas de", "antojarse (lat-am)"],
    example: {
      spanish: "¿Te apetece un café?",
      english: "Do you fancy a coffee?"
    }
  },
  {
    verb: "bastar",
    phrase: "bastar",
    grammar: "GUSTAR",
    english: "to be enough, to suffice",
    register: "standard",
    region: "neutral",
    notes: "me basta con eso = that's enough for me; como gustar construction",
    contextExplanation: "A gustar-pattern verb meaning sufficiency. Often paired with 'con' to introduce what suffices. The expression '¡basta!' as an interjection means 'enough!' or 'stop!'",
    synonyms: ["alcanzar", "ser suficiente"],
    example: {
      spanish: "Me basta con saber que estás bien.",
      english: "It's enough for me to know you're okay."
    }
  },
  {
    verb: "coger",
    phrase: "coger",
    grammar: "TR",
    english: "to take, to grab, to catch",
    register: "everyday",
    region: "spain",
    notes: "neutral in Spain; coger el autobús = to take the bus",
    contextExplanation: "Spain's everyday verb for taking, grabbing, or catching. CAUTION: in most of Latin America (especially Mexico, Argentina, Uruguay) this verb has a vulgar sexual meaning and should be replaced with 'agarrar' or 'tomar.'",
    synonyms: ["agarrar (lat-am)", "tomar"],
    example: {
      spanish: "Coge las llaves antes de salir.",
      english: "Grab the keys before you leave."
    }
  },
  {
    verb: "dar vuelta",
    phrase: "dar vuelta",
    grammar: "PHRASE",
    english: "to turn over, to flip",
    register: "everyday",
    region: "lat-am",
    notes: "in Spain: dar la vuelta a algo",
    contextExplanation: "A Latin American phrasal construction for turning something over or flipping it. Spain prefers 'dar la vuelta a algo' (with the article). Common in cooking and everyday physical actions.",
    synonyms: ["voltear", "girar"],
    example: {
      spanish: "Dale vuelta a la tortilla para que se dore por el otro lado.",
      english: "Flip the omelette so it browns on the other side."
    }
  },
  {
    verb: "doler",
    phrase: "doler",
    grammar: "GUSTAR",
    english: "to hurt, to ache",
    register: "everyday",
    region: "neutral",
    notes: "me duele la cabeza; como gustar construction",
    contextExplanation: "A gustar-pattern verb used for both physical pain and emotional hurt. The thing that hurts is the grammatical subject; the person feeling the pain takes the indirect object pronoun.",
    synonyms: ["lastimar (transitive sense)"],
    example: {
      spanish: "Me duele la espalda después de manejar todo el día.",
      english: "My back hurts after driving all day."
    }
  }
];
