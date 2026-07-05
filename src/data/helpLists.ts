export interface HelpCategory {
  categoryName: string;
  words: string[];
}

export interface StepConfig {
  id: number;
  label: string;
  shortName: string;
  question: string;
  description: string;
  helpDescription: string;
  placeholder: string;
  type: 'dark' | 'luminous' | 'transition';
  direction?: 'down' | 'up';
  fromId?: number;
  toId?: number;
  categories: HelpCategory[];
}

export const INTRODUCTION_TEXT = {
  title: "La Práctica de la Regla de Oro",
  inspiration: "Esta práctica se inspira en la Regla de Oro del Nuevo Humanismo, recogida en \"La Regla de Oro de la No Violencia\" de Roberto Kohanoff e Isabel Lazzaroni.",
  siloQuote: "Principio central de Silo: \"Cuando tratas a los demás como quieres que te traten, te liberas.\"",
  fullExplanation: "Todas las personas experimentamos momentos de tensión, enojo, frustración o confusión. A veces reaccionamos de forma puramente mecánica o compulsiva desde un bajo nivel de conciencia. Esta práctica es una herramienta de autoconocimiento y transformación personal diseñada para ayudarte a detener la reacción automática, comprender tus estados internos y elegir el buen trato de manera consciente. No es una norma rígida ni una obligación moral, sino un camino hacia una vida con menos sufrimiento, más unidad interna y verdadera libertad.",
  benefitsTitle: "La práctica de la Regla de Oro nos ayuda a:",
  benefits: [
    "Detener la reacción compulsiva y elegir cómo queremos actuar (respuesta diferida).",
    "Comprender por qué ciertas actitudes o comportamientos de otros nos afectan tanto.",
    "Liberarnos de tensiones internas, contradicciones y estados de ánimo (climas) negativos.",
    "Mejorar nuestras relaciones, porque dejamos de pedir que el otro cambie y empezamos a cambiar nosotros.",
    "Construir un estilo de vida más coherente, más amable y más libre.",
    "No se trata de ser perfectos ni de \"portarse bien\". Se trata de aprender a vivir con más conciencia y menos violencia interna, paso a paso."
  ],
  purposeTitle: "Esta práctica sirve para:",
  purposes: [
    "Comprendernos mejor y reconocer qué nos duele y por qué.",
    "Detectar patrones repetidos que vienen de nuestra historia personal.",
    "Romper la cadena de violencia interna y externa.",
    "Actuar desde nuestras mejores virtudes, no desde el impulso del momento.",
    "Elevar nuestro nivel de conciencia, lo que mejora nuestra vida y la de quienes nos rodean.",
    "Con el tiempo, esta práctica se convierte en una herramienta para vivir con más unidad interna: pensar, sentir y actuar en la misma dirección.",
    "Esta aplicación te acompañará paso a paso para que puedas practicarla de manera sencilla, profunda y accesible. No importa tu edad, tu cultura, tu historia o tu situación actual: Todos podemos aprender a vivir con menos violencia y más libertad interna."
  ]
};

export const STEPS: StepConfig[] = [
  {
    id: 1,
    label: "Punto 1: El maltrato que rechazo",
    shortName: "Maltrato que rechazo",
    question: "¿Cuál es el maltrato que rechazo?",
    description: "Identifica aquella actitud, acción o comportamiento ajeno que te resulta violento, doloroso o inaceptable. Es la situación externa que perturba tu bienestar.",
    helpDescription: "Selecciona el tipo de maltrato que más te resuene, o escribe tu propia palabra:",
    placeholder: "Ej: Excluyentes, Indiferencia, Descalificación...",
    type: "dark",
    categories: [
      {
        categoryName: "Exclusión e Indiferencia",
        words: ["Excluyentes", "Indiferencia", "Ignorado", "Rechazo", "Aislamiento", "Desprecio", "Olvido", "Marginalidad", "Invisibilidad"]
      },
      {
        categoryName: "Agresión y Descalificación",
        words: ["Agresión", "Insultos", "Gritos", "Humillación", "Burlas", "Descalificación", "Crítica", "Juicio", "Menosprecio", "Desdén"]
      },
      {
        categoryName: "Control y Dominación",
        words: ["Sometimiento", "Manipulación", "Exigencia", "Injusticia", "Control", "Abuso de poder", "Imposición", "Autoritarismo", "Mentira", "Traición"]
      }
    ]
  },
  {
    id: 2,
    label: "Punto 2: Mi reacción y estado",
    shortName: "Mi reacción / estado",
    question: "¿Cómo me siento y qué hago frente a ese maltrato?",
    description: "Reconoce tu respuesta mecánica ante el Punto 1. Refleja tu estado perturbado, la respuesta de defensa, enojo o sufrimiento que surge automáticamente.",
    helpDescription: "Selecciona cómo reaccionas o te sientes habitualmente ante esa perturbación:",
    placeholder: "Ej: Sufro y me alejo aislándome, Grito con furia, Me culpo...",
    type: "dark",
    categories: [
      {
        categoryName: "Retraimiento y Sufrimiento",
        words: ["Sufro y me alejo aislándome", "Me aíslo", "Me deprimo", "Me silencio con rencor", "Siento culpa", "Me resigno", "Me siento impotente"]
      },
      {
        categoryName: "Enojo y Contraataque",
        words: ["Grito con furia", "Ataco de vuelta", "Busco venganza", "Me irrito", "Reclamo con violencia", "Discuto sin escuchar", "Pago con la misma moneda"]
      },
      {
        categoryName: "Ansiedad y Parálisis",
        words: ["Siento miedo y huyo", "Me paralizo", "Me angustio", "Me tenso corporalmente", "Siento desamparo", "Busco aprobación sumisa"]
      }
    ]
  },
  {
    id: 3,
    label: "Punto 3: El trato que pido y doy",
    shortName: "El trato que pido / doy",
    question: "¿Qué trato le pido a quien me maltrató para darlo yo mismo?",
    description: "La Virtud opuesta al Punto 1. Es el buen trato que te gustaría recibir y que te comprometes a dar primero, elevando tu nivel de conciencia.",
    helpDescription: "Selecciona el buen trato inspirador que se opone al maltrato del Punto 1:",
    placeholder: "Ej: Consideración e inclusión, Aprecio genuino, Escucha activa...",
    type: "luminous",
    categories: [
      {
        categoryName: "Inclusión y Acogida",
        words: ["Consideración e inclusión", "Aceptación", "Acogida sincera", "Escucha atenta", "Reconocimiento", "Integración", "Cercanía"]
      },
      {
        categoryName: "Afecto y Valoración",
        words: ["Aprecio genuino", "Respeto profundo", "Amabilidad", "Tolerancia", "Cuidado mutuo", "Compasión", "Empatía", "Valoración"]
      },
      {
        categoryName: "Libertad y Paz",
        words: ["Libertad", "Confianza absoluta", "Apoyo incondicional", "Justicia", "Comprensión", "Sinceridad", "Paz interior"]
      }
    ]
  },
  {
    id: 4,
    label: "Punto 4: El buen trato alternativo",
    shortName: "Buen trato alternativo",
    question: "¿Cómo lo hago? (Buen trato opuesto a mi reacción del Punto 2)",
    description: "La Virtud opuesta al Punto 2. Es la acción consciente y constructiva que realizas en lugar de tu reacción reactiva habitual.",
    helpDescription: "Selecciona la acción virtuosa que neutraliza la reacción negativa del Punto 2:",
    placeholder: "Ej: Me acerco y aprecio a los demás, Dialogo con calma, Pongo límites sanos...",
    type: "luminous",
    categories: [
      {
        categoryName: "Acercamiento y Valoración",
        words: ["Me acerco y aprecio a los demás", "Dialogo con honestidad", "Expreso mi afecto", "Acompaño con paciencia", "Valoro las virtudes del otro"]
      },
      {
        categoryName: "Calma y Serenidad",
        words: ["Respiro con calma", "Escucho con apertura", "Actúo sin prisa", "Busco comprender antes de juzgar", "Perdono sinceramente", "Reconcilio"]
      },
      {
        categoryName: "Firmeza y Autocuidado",
        words: ["Pongo límites sanos con amor", "Me expreso con firmeza y calma", "Me valoro a mí mismo", "Confío en mi fuerza interna", "Me abro sin miedo"]
      }
    ]
  },
  {
    id: 5,
    label: "Punto 5: Mi camino de caída (De 3 a 2)",
    shortName: "Camino de caída 3 ➔ 2",
    question: "¿Cómo caigo del trato virtuoso (3) a la reacción mecánica (2)?",
    description: "Identifica qué actitud, creencia, temor, expectativa o vulnerabilidad sabotea tus buenas intenciones de trato y te hace caer de nuevo en el sufrimiento o enojo.",
    helpDescription: "Selecciona el factor interno que te hace descender a la reactividad del Punto 2:",
    placeholder: "Ej: Inseguridad, Expectativas frustradas, Orgullo...",
    type: "transition",
    direction: "down",
    fromId: 3,
    toId: 2,
    categories: [
      {
        categoryName: "Inseguridad y Duda",
        words: ["Inseguridad", "Desconfianza", "Dudas sobre mí mismo", "Celos", "Vulnerabilidad herida", "Temor al rechazo"]
      },
      {
        categoryName: "Expectativas y Orgullo",
        words: ["Expectativas excesivas", "Orgullo herido", "Soberbia", "Vanidad", "Egoísmo", "Exigencia perfeccionista"]
      },
      {
        categoryName: "Debilidad y Miedo",
        words: ["Miedo al fracaso", "Miedo al dolor", "Cobardía social", "Comodidad pasiva", "Pereza interna", "Apatía"]
      }
    ]
  },
  {
    id: 6,
    label: "Punto 6: Mi camino de subida (De 2 a 3)",
    shortName: "Camino de subida 2 ➔ 3",
    question: "¿Cómo subo del estado perturbado (2) al trato virtuoso (3)?",
    description: "Reconoce la acción intencionada que te permite elevar tu nivel de conciencia, romper el bucle del sufrimiento o enojo y reconectarte con la virtud.",
    helpDescription: "Selecciona el puente que te ayuda a volver al estado luminoso del Punto 3:",
    placeholder: "Ej: Expreso lo que siento y pienso, Tomo conciencia, Respiro...",
    type: "transition",
    direction: "up",
    fromId: 2,
    toId: 3,
    categories: [
      {
        categoryName: "Comunicación Honesta",
        words: ["Expreso lo que siento y pienso", "Pido ayuda con humildad", "Digo lo que me pasa con honestidad", "Dialogo con franqueza", "Hablo desde el corazón"]
      },
      {
        categoryName: "Conciencia y Reflexión",
        words: ["Reflexiono en silencio", "Me doy cuenta de la mecanicidad", "Respiro profundo y observo", "Acepto mi parte", "Medito en calma"]
      },
      {
        categoryName: "Acción Valiente",
        words: ["Tomo la iniciativa para reparar", "Me arriesgo a cambiar", "Actúo con valentía", "Me hago responsable de mí", "Decido no dañar"]
      }
    ]
  },
  {
    id: 7,
    label: "Punto 7: Mi camino de caída (De 4 a 1)",
    shortName: "Camino de caída 4 ➔ 1",
    question: "¿Cómo caigo del buen trato alternativo (4) al maltrato reactivo (1)?",
    description: "Identifica qué te desgasta o frustra cuando intentas mantener un buen trato, haciéndote perder la paciencia y caer de nuevo en una actitud violenta o de rechazo.",
    helpDescription: "Selecciona qué apaga tu motivación y te hace caer de nuevo en conductas nocivas:",
    placeholder: "Ej: Hartazgo, Cansancio extremo, Frustración...",
    type: "transition",
    direction: "down",
    fromId: 4,
    toId: 1,
    categories: [
      {
        categoryName: "Cansancio y Saturación",
        words: ["Hartazgo", "Cansancio acumulado", "Saturación mental", "Agobio de la rutina", "Estrés", "Desgaste energético"]
      },
      {
        categoryName: "Frustración y Decepción",
        words: ["Decepción del otro", "Frustración al no ver cambios", "Pesimismo", "Desinterés", "Despecho", "Siento que no vale la pena"]
      },
      {
        categoryName: "Impaciencia e Irritabilidad",
        words: ["Impaciencia", "Ira contenida", "Tolerancia cero", "Fastidio acumulado", "Irritación constante", "Ganas de castigar"]
      }
    ]
  },
  {
    id: 8,
    label: "Punto 8: Mi camino de subida (De 1 a 4)",
    shortName: "Camino de subida 1 ➔ 4",
    question: "¿Cómo subo de la actitud de rechazo/maltrato (1) al buen trato alternativo (4)?",
    description: "Descubre la intención o acción profunda que te permite superar el rechazo, reconciliarte y comprometerte con la acción constructiva del Punto 4.",
    helpDescription: "Selecciona el puente profundo que te reconecta con el trato benevolente del Punto 4:",
    placeholder: "Ej: Conecto con lo Humano en mí y en otros, Perdono, Siento empatía...",
    type: "transition",
    direction: "up",
    fromId: 1,
    toId: 4,
    categories: [
      {
        categoryName: "Conexión Humana",
        words: ["Conecto con lo Humano en mí y en otros", "Miro al otro como a un igual", "Siento empatía con su dolor", "Busco lo que nos une y no lo que nos separa"]
      },
      {
        categoryName: "Reconciliación y Compasión",
        words: ["Perdono y suelto el rencor", "Me reconcilio íntimamente", "Siento compasión por su ignorancia", "Acepto que todos nos equivocamos"]
      },
      {
        categoryName: "Amor en Acción",
        words: ["Actúo con benevolencia", "Deseo el bienestar ajeno de corazón", "Busco la unidad y la paz", "Me comprometo con la no violencia"]
      }
    ]
  }
];

export interface AforismoOutput {
  id: string;
  title: string;
  formula: string;
  text: string;
}

// Format utility to safely clean words or apply placeholders
const clean = (val: string, placeholder = "___") => {
  return val && val.trim() !== "" ? val.trim() : placeholder;
};

export function generateAforismos(answers: Record<number, string>): AforismoOutput[] {
  const p1 = clean(answers[1], "[Maltrato 1]");
  const p2 = clean(answers[2], "[Respuesta 2]");
  const p3 = clean(answers[3], "[Virtud 3]");
  const p4 = clean(answers[4], "[Acción 4]");
  const p5 = clean(answers[5], "[Caída 5]");
  const p6 = clean(answers[6], "[Subida 6]");
  const p7 = clean(answers[7], "[Caída 7]");
  const p8 = clean(answers[8], "[Subida 8]");

  // Aforismo 6+8: EXPRESO LO QUE SIENTO Y PIENSO, CONECTANDO CON LO HUMANO.
  const aforismoPrincipalText = `${p6.toUpperCase()}, ${p8.toUpperCase().startsWith("POR ") ? p8.toUpperCase() : `POR ${p8.toUpperCase()}`}.`;

  // Opcional I: Para evitar 2 ante 1, doy el trato de 3, haciendo 4.
  const opcionalIText = capitalizeFirst(`para evitar ${p2.toLowerCase()} ante ${p1.toLowerCase()}, doy el trato de ${p3.toLowerCase()}, haciendo ${p4.toLowerCase()}.`);

  // Opcional II: Por 5 caigo a 2, pero por 6 subo a 3.
  const opcionalIIText = capitalizeFirst(`por ${p5.toLowerCase()} caigo a ${p2.toLowerCase()}, pero por ${p6.toLowerCase()} subo a ${p3.toLowerCase()}.`);

  // Opcional III: Por 7 caigo a 1 pero por 8 subo a 4.
  const opcionalIIIText = capitalizeFirst(`por ${p7.toLowerCase()} caigo a ${p1.toLowerCase()}, pero por ${p8.toLowerCase()} subo a ${p4.toLowerCase()}.`);

  function capitalizeFirst(str: string): string {
    const trimmed = str.trim();
    if (!trimmed) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  return [
    {
      id: "6+8",
      title: "Aforismo de Subida (Integración de Caminos)",
      formula: "Punto 6 (Subida) + Punto 8 (Subida)",
      text: aforismoPrincipalText
    },
    {
      id: "opcional-1",
      title: "Aforismo de Superación de Crisis (Opcional I)",
      formula: "Para evitar [Punto 2] ante [Punto 1], doy el trato de [Punto 3], haciendo [Punto 4]",
      text: opcionalIText
    },
    {
      id: "opcional-2",
      title: "Resolución del Conflicto Emocional (Opcional II)",
      formula: "Por [Punto 5] caigo a [Punto 2], pero por [Punto 6] subo a [Punto 3]",
      text: opcionalIIText
    },
    {
      id: "opcional-3",
      title: "Trascendencia del Rechazo Activo (Opcional III)",
      formula: "Por [Punto 7] caigo a [Punto 1], pero por [Punto 8] subo a [Punto 4]",
      text: opcionalIIIText
    }
  ];
}
