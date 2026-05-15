// ═══════════════════════════════════════════════════════════════════════════
// interactive/subpages/tiempo-distancia-fichas-bank-1.js
//
// Pre-authored question bank for the "Práctica con fichas" quiz on the
// Expresar Tiempo y Distancia (interactivo) page.
//
// REGISTER: cotidiano only. This quiz ignores the page-level register
// switch — all questions live in everyday/casual Spanish.
//
// HOW IT LOADS:
//   The page includes this file with a plain <script src="..."> tag.
//   The block below appends one bank object onto window.FICHAS_BANKS.
//   Future banks (bank-2, bank-3, ...) follow the same pattern and append
//   themselves onto the same array. The page merges them automatically.
//
// HOW TO EXPAND TO 50:
//   See tiempo-distancia-fichas-schema.md (companion document, hand to
//   Sonnet) for the full schema, style rules, and coverage requirements.
//   The three questions below are model examples — keep their pattern.
// ═══════════════════════════════════════════════════════════════════════════

window.FICHAS_BANKS = window.FICHAS_BANKS || [];
window.FICHAS_BANKS.push({
  id: 'bank-1',
  description: 'Initial 50-question bank — daily/cotidiano Spanish',
  questions: [

    // ── EXISTING (b1q01–b1q03) ────────────────────────────────────────────

    {
      id: 'b1q01',
      sentence: 'Vivo en este pueblo ___ seis años.',
      answer: 'desde hace',
      explanation: '<em>Desde hace + presente</em> introduces a quantified duration of an action still in progress. <em>Desde</em> alone would need a fixed reference point (a date, a year); <em>hace</em> without <em>desde</em> reads as "X ago" — a completed past point, not an ongoing duration.',
      gloss: "I've been living in this town for six years."
    },

    {
      id: 'b1q02',
      sentence: 'Llevo tres horas ___ y todavía no termino el informe.',
      answer: 'trabajando',
      explanation: '<em>Llevar + tiempo + gerundio</em> uses the gerund (the -ndo form). The subject of <em>llevar</em> is the person, and the gerund describes what they\'re doing. An infinitive here would flip the construction into its impersonal flavor ("it takes three hours to work"), which doesn\'t fit the personal subject.',
      gloss: "I've been working for three hours and I still haven't finished the report."
    },

    {
      id: 'b1q03',
      sentence: 'La farmacia ___ tres cuadras de mi casa.',
      answer: 'está a',
      explanation: '<em>Estar a + medida</em> is the central distance construction — it accepts physical distance, time-as-distance, and hybrid units. <em>Está en</em> would mean "is located in" (no distance reading). <em>Queda a</em> works as a near-synonym in everyday speech, but <em>está a</em> is the default form for stating distance.',
      gloss: "The pharmacy is three blocks from my house."
    },

    // ── DESDE + PRESENTE (b1q04–b1q05) ───────────────────────────────────

    {
      id: 'b1q04',
      sentence: 'Trabajo en este hospital ___ enero y todavía me estoy acostumbrando.',
      answer: 'desde',
      explanation: '<em>Desde + fixed calendar point</em> anchors the start of an ongoing action to a named moment. No duration is measured — you simply name when it began. <em>Desde hace</em> would require a numeric duration after it (e.g., <em>desde hace tres meses</em>), not a month name like <em>enero</em>.',
      gloss: "I've been working at this hospital since January and I'm still getting used to it."
    },

    {
      id: 'b1q05',
      sentence: 'Mi hermana vive en esa ciudad ___ terminó la universidad.',
      answer: 'desde que',
      explanation: '<em>Desde que + clause</em> anchors an ongoing present action to an event rather than a date or a numeric duration. The two-word connector <em>desde que</em> is required — <em>desde</em> alone cannot introduce a finite verb clause. This contrasts with <em>desde</em> before a bare noun (<em>desde enero</em>), where only the single preposition is needed.',
      gloss: "My sister has been living in that city since she finished university."
    },

    // ── DESDE HACE + PRESENTE (b1q06–b1q08) ──────────────────────────────

    {
      id: 'b1q06',
      sentence: 'No duermo bien ___ varias semanas.',
      answer: 'desde hace',
      explanation: '<em>Desde hace + duration + presente</em> expresses how long an ongoing state has been in effect. The present tense signals the state is still active now. <em>Hace</em> alone (without <em>desde</em>) would push the reading toward "several weeks ago" — a point in the past when something happened, not a duration still unfolding.',
      gloss: "I haven't been sleeping well for several weeks."
    },

    {
      id: 'b1q07',
      sentence: 'El local de la esquina está cerrado ___ más de un año.',
      answer: 'desde hace',
      explanation: '<em>Desde hace + duration</em> paired with a present-tense verb signals that a state began in the past and is still in effect now. <em>Está cerrado</em> confirms the closure is ongoing. Swapping to <em>hace más de un año</em> without <em>desde</em> would imply the closure happened a year ago — a past event, not a current state.',
      gloss: "The corner shop has been closed for more than a year."
    },

    {
      id: 'b1q08',
      sentence: 'Mi vecina vive acá ___ tres años y no nos dijo ni hola.',
      answer: 'desde hace',
      explanation: '<em>Desde hace + duration + presente</em> marks a situation that started in the past and continues now — the neighbor is still there. <em>Hace tres años</em> without <em>desde</em> would mean "three years ago," locating the arrival as a completed past event without saying anything about the current situation. The present tense of <em>vivir</em> confirms the action is still happening.',
      gloss: "My neighbor has been living here for three years and hasn't said a word to us."
    },

    // ── HACE + TIEMPO + QUE + PRESENTE (b1q09–b1q11) ─────────────────────

    {
      id: 'b1q09',
      sentence: '___ varios meses que esperamos los resultados.',
      answer: 'Hace',
      explanation: '<em>Hace + duration + que + presente</em> moves the duration phrase to the front of the clause; the subject and verb follow after <em>que</em>. The equivalent sentence with the verb first would be <em>Esperamos los resultados desde hace varios meses</em>. Both mean the same thing; the <em>hace</em>-initial form puts the time frame in focus.',
      gloss: "We've been waiting for the results for several months."
    },

    {
      id: 'b1q10',
      sentence: 'Hace un año ___ mi cuñado vende ropa en el mercado.',
      answer: 'que',
      explanation: '<em>Que</em> is the required linker between the duration phrase and the clause in <em>hace + tiempo + que + presente</em>. Without it, <em>hace un año mi cuñado vende</em> is not standard usage. This <em>que</em> is not a subordinating conjunction in the usual sense — it is the structural joint that holds the whole construction together.',
      gloss: "My brother-in-law has been selling clothes at the market for a year."
    },

    {
      id: 'b1q11',
      sentence: 'Hace dos semanas ___ el departamento de abajo tiene goteras.',
      answer: 'que',
      explanation: '<em>Que</em> connects the duration phrase to the present-tense clause in the <em>hace + tiempo + que</em> pattern. The verb stays in the present even though the problem started in the past — the speaker frames the leak as an ongoing state, not a completed event. Dropping <em>que</em> leaves the sentence without a grammatical connector.',
      gloss: "The apartment below has been leaking for two weeks."
    },

    // ── HACE + TIEMPO + QUE NO + PRESENTE (b1q12–b1q14) ─────────────────

    {
      id: 'b1q12',
      sentence: '___ semanas que no veo a mis primos.',
      answer: 'Hace',
      explanation: '<em>Hace + duration + que no + presente</em> expresses how long an absence has been going on. The verb stays in the present because the not-seeing is still the current state. Replacing <em>Hace</em> with <em>Hacía</em> would shift the statement into a past-narrative frame, as if the absence were being noted at some earlier moment in a story, not right now.',
      gloss: "I haven't seen my cousins for weeks."
    },

    {
      id: 'b1q13',
      sentence: 'Hace un mes ___ veo a mi vecino del cuarto piso.',
      answer: 'que no',
      explanation: '<em>Que no</em> is the two-word unit that makes this an absence construction: <em>que</em> links the duration phrase to the clause, and <em>no</em> negates the verb. The two cannot be separated. Replacing <em>que no</em> with just <em>que</em> produces "hace un mes que veo a mi vecino" — the opposite meaning: I\'ve been seeing him for a month.',
      gloss: "I haven't seen my neighbor from the fourth floor for a month."
    },

    {
      id: 'b1q14',
      sentence: 'Hace mucho tiempo ___ llueve bien en esta región.',
      answer: 'que no',
      explanation: '<em>Que no + presente</em> in the <em>hace + tiempo</em> construction signals a prolonged absence of the action — here, the absence of meaningful rain. Replacing <em>que no</em> with just <em>que</em> would flip the meaning: "it has been raining well for a long time." The present tense is used because the not-raining is the current, ongoing state.',
      gloss: "It hasn't rained properly in this region for a long time."
    },

    // ── HACÍA + TIEMPO + QUE + IMPERFECTO (b1q15–b1q16) ─────────────────

    {
      id: 'b1q15',
      sentence: '___ años que mi abuelo no se movía tan rápido; ese día lo vi correr.',
      answer: 'Hacía',
      explanation: '<em>Hacía + duration + que + imperfecto</em> anchors the duration to a past moment rather than the present. The imperfect <em>se movía</em> frames the limitation as an ongoing background state, contrasted with the specific completed event that follows (<em>ese día lo vi correr</em>). Using <em>Hace</em> would break the past-narrative frame — the speaker is looking back, not speaking from the present.',
      gloss: "It had been years since my grandfather had moved so fast; that day I saw him run."
    },

    {
      id: 'b1q16',
      sentence: 'Hacía meses que no ___ a esa parte de la ciudad cuando me la crucé en el subte.',
      answer: 'iba',
      explanation: '<em>Hacía + tiempo + que no + imperfecto</em> is the past-narrative version of the absence construction. The imperfect <em>iba</em> is required because it describes a prolonged background state in the past — not a completed event. The preterite <em>fui</em> would imply that one specific completed trip was absent, not an extended period of not going at all.',
      gloss: "It had been months since I'd been to that part of the city when I ran into her on the subway."
    },

    // ── DESDE + IMPERFECTO (b1q17) ────────────────────────────────────────

    {
      id: 'b1q17',
      sentence: 'Mi abuela conocía esa receta ___ chica.',
      answer: 'desde',
      explanation: '<em>Desde + reference point + imperfecto</em> anchors the start of a past ongoing state to a fixed reference — here, a stage of life rather than a date. <em>Desde chica</em> is idiomatic for "since she was little." <em>Desde hace</em> would need a numeric duration after it; <em>hacía que</em> would require a full clause. Neither fits a bare noun like <em>chica</em>.',
      gloss: "My grandmother had known that recipe since she was a little girl."
    },

    // ── HACE + DURATION (= "X ago", b1q18–b1q20) ─────────────────────────

    {
      id: 'b1q18',
      sentence: 'Compré este celular ___ dos años y ya está obsoleto.',
      answer: 'hace',
      explanation: '<em>Hace + duration</em> placed after a preterite verb means "X ago" — the action is completed and located in the past. This contrasts with the ongoing-duration use, where <em>desde hace + presente</em> expresses a state still in effect. Here the buying is done; it is a single completed event two years back.',
      gloss: "I bought this phone two years ago and it's already outdated."
    },

    {
      id: 'b1q19',
      sentence: '___ un rato llegó un paquete para vos.',
      answer: 'Hace',
      explanation: '<em>Hace + duration + preterite</em> places a completed event in the past. The package arrived at a specific past moment, so the preterite <em>llegó</em> is correct. <em>Desde hace</em> would need an ongoing present-tense verb; <em>Hacía</em> would shift everything into a past-narrative frame that this simple statement doesn\'t require.',
      gloss: "A package for you arrived a little while ago."
    },

    {
      id: 'b1q20',
      sentence: 'Nos mudamos a este barrio ___ casi tres años.',
      answer: 'hace',
      explanation: '<em>Hace + duration + preterite</em> marks a single completed past action. The move happened once, it is over, and it took place nearly three years ago. If the sentence described an ongoing situation — still living there — the frame would be <em>vivimos acá desde hace casi tres años</em> with a present-tense verb. The preterite <em>nos mudamos</em> signals a one-time event.',
      gloss: "We moved to this neighborhood almost three years ago."
    },

    // ── LLEVAR + TIEMPO + GERUNDIO (b1q21–b1q23) ─────────────────────────

    {
      id: 'b1q21',
      sentence: 'Llevamos horas ___ al médico y no nos atienden.',
      answer: 'esperando',
      explanation: '<em>Llevar + duration + gerundio</em> uses the -ndo form to describe what the subject has been doing without pause. The gerund <em>esperando</em> is obligatory — replacing it with the infinitive <em>esperar</em> would shift the construction toward an impersonal reading ("it takes hours to wait"), which doesn\'t match the personal subject <em>nosotros</em>.',
      gloss: "We've been waiting for the doctor for hours and they still haven't seen us."
    },

    {
      id: 'b1q22',
      sentence: 'Mi hijo lleva semanas ___ para el examen y está muy estresado.',
      answer: 'estudiando',
      explanation: '<em>Llevar + duration + gerundio</em> describes an ongoing activity from the subject\'s perspective. The gerund <em>estudiando</em> is the grammatically required form. An infinitive would only work in the negative version: <em>lleva semanas sin estudiar</em>, which inverts the meaning to an absence of studying.',
      gloss: "My son has been studying for the exam for weeks and he's very stressed."
    },

    {
      id: 'b1q23',
      sentence: '¿Cuánto tiempo llevás ___ en ese departamento?',
      answer: 'viviendo',
      explanation: '<em>Llevar + duration + gerundio</em> — here in a question with voseo — asks how long an ongoing activity has been happening. The gerund <em>viviendo</em> is required; the infinitive <em>vivir</em> does not fit because <em>llevar</em> in this construction only takes the -ndo form as its complement, not the infinitive.',
      gloss: "How long have you been living in that apartment?"
    },

    // ── LLEVAR + TIEMPO + SIN + INFINITIVO (b1q24–b1q25) ─────────────────

    {
      id: 'b1q24',
      sentence: 'Llevo una semana ___ ir al gimnasio.',
      answer: 'sin',
      explanation: '<em>Llevar + duration + sin + infinitivo</em> is the negative-duration construction: the subject has gone without doing something for a stretch of time. <em>Sin</em> is the required preposition before the infinitive. Using the gerund <em>yendo</em> instead would invert the meaning entirely — <em>llevo una semana yendo al gimnasio</em> means I\'ve been going for a week, not avoiding it.',
      gloss: "I haven't been to the gym in a week."
    },

    {
      id: 'b1q25',
      sentence: 'Mi hermano lleva meses ___ hablar con nuestros padres.',
      answer: 'sin',
      explanation: '<em>Llevar + duration + sin + infinitivo</em> frames the subject\'s non-action as an ongoing state. The infinitive after <em>sin</em> names the avoided activity. Swapping <em>sin</em> for the gerund <em>hablando</em> would invert the meaning completely: <em>lleva meses hablando</em> means he has been talking for months.',
      gloss: "My brother hasn't spoken to our parents for months."
    },

    // ── ME/TE/LE LLEVÓ + TIEMPO + INFINITIVO (b1q26–b1q27) ───────────────

    {
      id: 'b1q26',
      sentence: '___ media hora encontrar una farmacia abierta de noche.',
      answer: 'Me llevó',
      explanation: '<em>Me llevó + duration + infinitivo</em> reports how long a completed task took from the speaker\'s perspective. The indirect object pronoun <em>me</em> is the experiencer — it specifies whose time was consumed. Without it, <em>Llevó media hora encontrar</em> is grammatical but impersonal; <em>me</em> personalizes the experience.',
      gloss: "It took me half an hour to find a pharmacy open at night."
    },

    {
      id: 'b1q27',
      sentence: 'Le ___ dos días entender cómo funcionaba el sistema.',
      answer: 'llevó',
      explanation: '<em>Le llevó + duration + infinitivo</em> reports a completed time cost with a third-person experiencer. The preterite <em>llevó</em> is required because this is a single completed event. Using the present <em>lleva</em> would describe an ongoing situation; the imperfect <em>llevaba</em> would embed it in a past narrative without a sense of completion.',
      gloss: "It took them two days to understand how the system worked."
    },

    // ── TARDAR / DEMORAR (EN) + INFINITIVO (b1q28–b1q29) ─────────────────

    {
      id: 'b1q28',
      sentence: 'El técnico tardó tres horas ___ arreglar la lavadora.',
      answer: 'en',
      explanation: '<em>Tardar + duration + en + infinitivo</em> uses <em>en</em> as the required preposition before the infinitive. It cannot be replaced or dropped: <em>tardó tres horas arreglar</em> is not standard, and <em>para arreglar</em> would shift the meaning from time actually spent to purpose.',
      gloss: "The technician took three hours to fix the washing machine."
    },

    {
      id: 'b1q29',
      sentence: 'El trámite demoró semanas ___ resolverse.',
      answer: 'en',
      explanation: '<em>Demorar + duration + en + infinitivo</em> — like its near-synonym <em>tardar</em> — requires <em>en</em> before the infinitive. Without it, the construction is incomplete. <em>Para resolverse</em> would shift the reading from "it took weeks to resolve" to "in order to resolve itself" — purpose rather than time actually spent.',
      gloss: "The paperwork took weeks to be resolved."
    },

    // ── FALTAR + TIEMPO (PARA) (b1q30–b1q31) ─────────────────────────────

    {
      id: 'b1q30',
      sentence: '___ dos horas para que empiece el partido.',
      answer: 'Faltan',
      explanation: '<em>Faltar + para</em> — the verb agrees with the quantity, which is the grammatical subject. Since <em>dos horas</em> is plural, the verb is <em>faltan</em>, not <em>falta</em>. This mirrors how <em>quedar</em> and <em>haber</em> behave in similar contexts. <em>Falta dos horas</em> is heard in very casual speech but is an agreement error.',
      gloss: "There are two hours to go before the game starts."
    },

    {
      id: 'b1q31',
      sentence: '¿Cuánto tiempo ___ para el turno del médico?',
      answer: 'falta',
      explanation: '<em>Falta + para</em> — when no specific plural quantity is yet named as the subject, the verb defaults to third-person singular. This open question asks "how much is missing?", so no number yet appears to trigger plural agreement. As soon as a plural answer is given (<em>faltan dos horas</em>), the verb shifts accordingly.',
      gloss: "How much time is left before the doctor's appointment?"
    },

    // ── ESTAR A + MEDIDA (b1q32–b1q34) ───────────────────────────────────

    {
      id: 'b1q32',
      sentence: 'El hospital ___ unos veinte minutos en auto desde acá.',
      answer: 'está a',
      explanation: '<em>Estar a + measure</em> extends naturally to time-as-distance: the unit here is travel time rather than physical length, but the construction is identical. <em>Está en</em> would mean "is located in" and cannot take a time-distance reading. <em>Queda a</em> is a near-synonym in everyday speech, but <em>está a</em> is the unmarked default.',
      gloss: "The hospital is about twenty minutes away by car from here."
    },

    {
      id: 'b1q33',
      sentence: 'La escuela de mi hija ___ solo cuatro cuadras del trabajo.',
      answer: 'está a',
      explanation: '<em>Estar a + distance unit</em> states how far a place is from a reference point. The preposition <em>a</em> is part of the fixed phrase and cannot be dropped or swapped for another. <em>Está en</em> would locate the school inside a place, not express a distance from the reference point.',
      gloss: "My daughter's school is only four blocks from work."
    },

    {
      id: 'b1q34',
      sentence: 'La terminal de ómnibus ___ dos kilómetros del centro.',
      answer: 'está a',
      explanation: '<em>Estar a + medida</em> uses the preposition <em>a</em> to introduce a distance measure from a stated reference point. No other preposition fills this slot: <em>está de</em>, <em>está en</em>, and <em>está para</em> all carry unrelated meanings. <em>Queda a</em> is an acceptable near-synonym in casual conversation.',
      gloss: "The bus terminal is two kilometers from the city center."
    },

    // ── QUEDAR A + MEDIDA (b1q35–b1q36) ──────────────────────────────────

    {
      id: 'b1q35',
      sentence: 'La verdulería ___ dos cuadras de mi casa; voy siempre a pie.',
      answer: 'queda a',
      explanation: '<em>Quedar a + distance</em> expresses how far a place is, with a slight implication of easy access in everyday speech. It is a near-synonym of <em>estar a</em> in this use. The preposition <em>a</em> is required before the measurement; <em>queda en dos cuadras</em> is not grammatical in a distance reading.',
      gloss: "The vegetable market is two blocks from my house; I always walk there."
    },

    {
      id: 'b1q36',
      sentence: 'La cancha ___ diez minutos caminando desde la estación.',
      answer: 'queda a',
      explanation: '<em>Quedar a + measure</em> — here with a time-as-distance unit — states how far a journey is. The preposition <em>a</em> cannot be dropped. Contrasted with <em>quedar en</em>, which would say the field is located *inside* something, not *at a distance of* something.',
      gloss: "The sports field is a ten-minute walk from the station."
    },

    // ── CERCA DE / LEJOS DE (b1q37–b1q38) ────────────────────────────────

    {
      id: 'b1q37',
      sentence: 'El trabajo está ___ mi casa, así que voy y vuelvo caminando.',
      answer: 'cerca de',
      explanation: '<em>Cerca de + reference point</em> expresses relative closeness without a specific measurement. It contrasts with <em>lejos de</em> (far from) and with <em>estar a + distance</em> (which gives a precise figure). <em>Cerca de</em> cannot be reduced to just <em>cerca</em> when a reference noun follows — the preposition <em>de</em> is required to link to the noun.',
      gloss: "Work is close to my house, so I walk there and back."
    },

    {
      id: 'b1q38',
      sentence: 'La clínica queda ___ de mi barrio, así que tardo bastante en llegar.',
      answer: 'lejos',
      explanation: '<em>Lejos de + reference point</em> expresses relative distance in the opposite direction from <em>cerca de</em>. The preposition <em>de</em> is required before the reference noun and is already in the sentence; the blank holds only the adverb <em>lejos</em>. The clause "así que tardo bastante en llegar" provides semantic disambiguation: proximity would predict a short trip, not a long one.',
      gloss: "The clinic is far from my neighborhood, so it takes me a while to get there."
    },

    // ── A + MEDIDA + DE (b1q39–b1q40) ────────────────────────────────────

    {
      id: 'b1q39',
      sentence: 'Hay un semáforo ___ doscientos metros de la entrada.',
      answer: 'a',
      explanation: '<em>A + distance + de + reference point</em> locates something at a measured interval from a landmark. The preposition <em>a</em> opens the phrase; dropping it produces <em>hay un semáforo doscientos metros de la entrada</em>, which is not a standard distance expression. The <em>de</em> later in the phrase is equally required — it connects the measurement to its reference point.',
      gloss: "There's a traffic light two hundred meters from the entrance."
    },

    {
      id: 'b1q40',
      sentence: 'La casa de mis padres está a solo tres cuadras ___ la plaza principal.',
      answer: 'de',
      explanation: 'In <em>a + distance + de + reference</em>, the preposition <em>de</em> links the measurement to the reference point that follows. The <em>a</em> that opens the distance phrase is already in the sentence; the blank holds <em>de</em>. When the reference noun has a masculine definite article, <em>de</em> contracts to <em>del</em>; here <em>la plaza</em> is feminine, so no contraction occurs.',
      gloss: "My parents' house is just three blocks from the main square."
    },

    // ── FALTAR + DISTANCIA (PARA) (b1q41–b1q42) ──────────────────────────

    {
      id: 'b1q41',
      sentence: '___ unos cinco kilómetros para llegar al pueblo.',
      answer: 'Faltan',
      explanation: '<em>Faltan + distance + para</em> states the remaining distance before reaching a destination. The verb agrees with the quantity — <em>cinco kilómetros</em> is plural, so <em>faltan</em>, not <em>falta</em>. Treating the verb as invariably singular (<em>falta cinco kilómetros</em>) is common in very casual speech but is an agreement error.',
      gloss: "There are about five kilometers to go before we reach the town."
    },

    {
      id: 'b1q42',
      sentence: '¿Cuánto ___ para llegar a la ruta?',
      answer: 'falta',
      explanation: '<em>Falta + para</em> — with no explicit subject yet named, the verb defaults to third-person singular. Once a plural distance is supplied in the answer (<em>faltan diez kilómetros</em>), the verb shifts to plural. The same agreement logic applies to spatial distance as to time: the quantity is the grammatical subject, and the verb follows it.',
      gloss: "How much further to the highway?"
    },

    // ── ACERCARSE / ALEJARSE A (b1q43–b1q44) ─────────────────────────────

    {
      id: 'b1q43',
      sentence: 'No ___ demasiado al borde del andén, que el tren ya viene.',
      answer: 'te acerques',
      explanation: '<em>Acercarse a + place</em> means to move toward something. In a negative command with voseo, the reflexive verb takes the present subjunctive form <em>te acerques</em> — using the indicative <em>te acercás</em> would produce a statement, not a command. Dropping the reflexive <em>te</em> leaves an incomplete verb form.',
      gloss: "Don't get too close to the edge of the platform — the train is already coming."
    },

    {
      id: 'b1q44',
      sentence: 'A medida que nos ___ a la ciudad, el tráfico se ponía más pesado.',
      answer: 'acercábamos',
      explanation: '<em>Acercarse a + destination</em> expresses progressive movement toward a place. The imperfect <em>acercábamos</em> is required by the parallel structure of <em>a medida que</em>, which sets two gradual, simultaneous past processes against each other — both verbs must be in the imperfect. The preterite <em>acercamos</em> would describe a single completed moment of arrival, which breaks the parallel.',
      gloss: "As we got closer to the city, the traffic got heavier."
    },

    // ── POR + ZONA (b1q45–b1q46) ──────────────────────────────────────────

    {
      id: 'b1q45',
      sentence: 'Hay varios hospitales ___ la zona norte.',
      answer: 'por',
      explanation: '<em>Por + zone</em> expresses vague spatial location spread across a broader area, without pinpointing an address. <em>En la zona norte</em> would be slightly more precise — "in the north zone" as a defined place. <em>Por</em> consistently carries the "somewhere in that area" reading, which fits naturally when describing multiple facilities across a district.',
      gloss: "There are several hospitals in the northern part of the city."
    },

    {
      id: 'b1q46',
      sentence: '¿Sabés si hay alguna ferretería ___ el centro?',
      answer: 'por',
      explanation: '<em>Por + zone</em> in a question like this frames the search loosely: "anywhere around or in the center." <em>En el centro</em> would ask about a specific location, whereas <em>por el centro</em> asks whether one exists somewhere in that general area. The difference is precision: <em>en</em> pins a point; <em>por</em> sweeps an area.',
      gloss: "Do you know if there's a hardware store somewhere around the center?"
    },

    // ── HASTA + PUNTO (b1q47–b1q48) ──────────────────────────────────────

    {
      id: 'b1q47',
      sentence: 'El colectivo no llega ___ tu barrio; tenés que caminar unas cuadras.',
      answer: 'hasta',
      explanation: '<em>Hasta + endpoint</em> marks the farthest point reached by a route — here, the bus route\'s limit. <em>A tu barrio</em> would simply mean "to your neighborhood" without the sense of maximum extent. <em>Por tu barrio</em> would mean "around your neighborhood." Only <em>hasta</em> captures the idea of reaching as far as a given point, or in this case, falling short of it.',
      gloss: "The bus doesn't go all the way to your neighborhood; you have to walk a few blocks."
    },

    {
      id: 'b1q48',
      sentence: 'Caminamos desde el hotel ___ la costanera y tardamos media hora.',
      answer: 'hasta',
      explanation: '<em>Hasta + destination</em> marks the endpoint of a completed journey. It pairs naturally with <em>desde</em> to frame the full path: <em>desde X hasta Y</em>. Replacing <em>hasta</em> with <em>a</em> produces an acceptable alternative, but <em>hasta</em> more strongly emphasizes reaching and arriving at the endpoint of the walk.',
      gloss: "We walked from the hotel to the waterfront and it took us half an hour."
    },

    // ── QUEDAR (LOCATION, SIN A) (b1q49–b1q50) ───────────────────────────

    {
      id: 'b1q49',
      sentence: '¿Dónde ___ la oficina de correos más cercana?',
      answer: 'queda',
      explanation: '<em>Quedar</em> without <em>a</em> functions as a location verb — the equivalent of <em>estar</em> for asking where a place is. It is followed by <em>en</em> or a place reference, not by a distance measure. Confusing it with <em>quedar a</em> (which requires a measurement) is a common slip: <em>queda a</em> here would demand a number after it.',
      gloss: "Where is the nearest post office?"
    },

    {
      id: 'b1q50',
      sentence: 'No sé bien dónde ___ esa calle; nunca fui a ese barrio.',
      answer: 'queda',
      explanation: '<em>Quedar</em> without <em>a</em> is used to ask or state where a place is located — an everyday Latin American alternative to <em>estar</em> for places. Here it means "where that street is situated" — a location, not a distance. <em>Está</em> would also work, but <em>queda</em> is more characteristic of Rioplatense and broader Latin American everyday speech for streets and places.',
      gloss: "I don't really know where that street is; I've never been to that neighborhood."
    }

  ]
});
