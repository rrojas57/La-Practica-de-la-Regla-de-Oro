import { HelpCategory, StepConfig, AforismoOutput } from "./helpLists";

export interface TranslationDict {
  logoTitle: string;
  logoSubtitle: string;
  tabIntro: string;
  tabPractice: string;
  tabHistory: string;
  tabSupport: string;
  themeToggleDark: string;
  themeToggleLight: string;
  toastThemeChanged: string;
  toastFormReset: string;
  toastPracticeSaved: string;
  toastPracticeLoaded: string;
  toastPracticeDeleted: string;
  toastExampleLoaded: string;
  toastPracticeReady: string;
  toastFormCheck: string;
  toastDownloadSuccess: string;
  
  // Intro section
  introTagline: string;
  introTitle: string;
  introSubtitle: string;
  introPrivacyTitle: string;
  introPrivacyText: string;
  introPrincipleTitle: string;
  introSiloQuote: string;
  introInspiration: string;
  introSiloAuthor: string;
  introBenefitsTitle: string;
  introBenefits: string[];
  introPurposeTitle: string;
  introPurposes: string[];
  introExplanation: string;
  introPurposesExtra: string;
  introBtnStart: string;
  introBtnExample: string;

  // Practice Section
  practiceTitleLabel: string;
  practiceTitlePlaceholder: string;
  practiceProgressLabel: string;
  practiceCompletedCount: string;
  practicePrivacyTitle: string;
  practicePrivacyText: string;
  practiceQuestionLabel: string;
  practiceTypeLuminous: string;
  practiceTypeDark: string;
  practiceTypeTransition: string;
  practiceInputWordLabel: string;
  practiceBtnPrev: string;
  practiceBtnNext: string;
  practiceBtnLastPrompt: string;
  practiceHelpPrompt: string;
  practiceBtnHelp: string;
  practiceBtnHideHelp: string;
  practiceHelpSuffix: string;
  practiceHelpOptional: string;
  
  // Simultaneous Preview
  previewTitle: string;
  previewMainTitle: string;
  previewGoldenTitle: string;
  previewGoldenTemplate: string;
  previewHint: string;

  // Workspace Actions
  actionTitle: string;
  actionSubtitle: string;
  actionBtnReset: string;
  actionBtnSave: string;
  actionResetConfirm: string;

  // Results Section
  resultsCompletedTitle: string;
  resultsCompletedSubtitle: string;
  resultsBtnSaveHistory: string;
  resultsSynthesisTitle: string;
  resultsSynthesisSubtitle: string;

  // Aphorismos Display
  aforismosTitle: string;
  aforismosSubtitle: string;
  aforismosBtnDownload: string;
  aforismosCopiedTitle: string;
  aforismosCopiedMessage: string;

  // History Section
  historyTitle: string;
  historySubtitle: string;
  historyEmptyTitle: string;
  historyEmptyText: string;
  historyBtnStartNew: string;
  historyCardDate: string;
  historyBtnLoad: string;
  historyBtnDelete: string;
  historyDeleteConfirm: string;

  // Support Section
  supportTitle: string;
  supportSubtitle: string;
  supportTabExamples: string;
  supportTabGlossary: string;
  supportTabResources: string;
  supportTabMailbox: string;
  
  // Support Examples
  supportExamplesTitle: string;
  supportExamplesSubtitle: string;
  supportExamplesBtnLoad: string;
  supportExamplesAforismoLabel: string;
  supportExamplesCommentaryLabel: string;

  // Support Glossary
  supportGlossarySearchPlaceholder: string;
  supportGlossaryEmpty: string;

  // Support Resources
  supportResourcesTitle: string;
  supportResourcesSubtitle: string;
  supportResourcesAuthor: string;
  supportResourcesPublisher: string;
  supportResourcesYear: string;
  supportResourcesTypeBook: string;
  supportResourcesTypeConference: string;
  supportResourcesTypeSpeech: string;
  supportResourcesTypeManual: string;
  supportResourcesTypeVideo: string;
  supportResourcesTypePdf: string;

  // Support Mailbox
  supportMailboxTitle: string;
  supportMailboxSubtitle: string;
  supportMailboxPrivateCheckTitle: string;
  supportMailboxPrivateCheckText: string;
  supportMailboxLabelCategory: string;
  supportMailboxCategoryOpinion: string;
  supportMailboxCategoryError: string;
  supportMailboxCategoryQuestion: string;
  supportMailboxCategoryOther: string;
  supportMailboxLabelMessage: string;
  supportMailboxPlaceholderMessage: string;
  supportMailboxBtnSend: string;
  supportMailboxBtnSending: string;
  supportMailboxSuccessTitle: string;
  supportMailboxSuccessText: string;
  supportMailboxBtnSendAnother: string;

  // Download Output File Format
  downloadHeader: string;
  downloadPracticeTitle: string;
  downloadDate: string;
  downloadResponsesHeader: string;
  downloadAforismosHeader: string;
  downloadNotesHeader: string;
  downloadNotesEmpty: string;
  downloadFooterQuote: string;
}

export const translations: Record<"es" | "en", TranslationDict> = {
  es: {
    logoTitle: "La Regla de Oro",
    logoSubtitle: "Práctica Interactiva",
    tabIntro: "Introducción",
    tabPractice: "Práctica",
    tabHistory: "Historial",
    tabSupport: "Biblioteca y Enlaces",
    themeToggleDark: "Cambiar a Tema Oscuro",
    themeToggleLight: "Cambiar a Tema Claro",
    toastThemeChanged: "Tema cambiado a: ",
    toastFormReset: "Formulario reiniciado con éxito.",
    toastPracticeSaved: "¡Práctica guardada con éxito en tu historial!",
    toastPracticeLoaded: "Cargada práctica: ",
    toastPracticeDeleted: "Práctica eliminada de tu historial.",
    toastExampleLoaded: "Se ha cargado un ejemplo resuelto completo. Revisa el mapa y las ideas fuerza.",
    toastPracticeReady: "Ejemplo cargado con éxito en tu espacio de trabajo. ¡Compáralo con el mapa!",
    toastFormCheck: "Por favor, responde al menos las primeras preguntas antes de guardar.",
    toastDownloadSuccess: "Archivo de texto descargado correctamente.",
    
    // Intro section
    introTagline: "Transformación Personal y No Violencia",
    introTitle: "La Práctica de la Regla de Oro",
    introSubtitle: "Un camino práctico para superar la reacción mecánica, comprender tus estados internos y elegir el buen trato de manera consciente.",
    introPrivacyTitle: "🔒 Espacio 100% Seguro y Privado",
    introPrivacyText: "Este ejercicio es una herramienta de autoconocimiento y estrictamente personal. Para tu total tranquilidad, las respuestas que introduzcas a lo largo de estos puntos no se almacenan en ningún servidor externo ni quedan registradas en ninguna base de datos accesible por terceros. Todo lo que escribas se procesa de forma temporal y local en tu pantalla para tu propio trabajo interior. Practica con absoluta libertad.",
    introPrincipleTitle: "Principio Central",
    introSiloQuote: "Cuando tratas a los demás como quieres que te traten, te liberas.",
    introInspiration: "Esta práctica se inspira en la Regla de Oro del Nuevo Humanismo, recogida en \"La Regla de Oro de la No Violencia\" de Roberto Kohanoff e Isabel Lazzaroni.",
    introSiloAuthor: "— Silo, Humanismo Universalista",
    introBenefitsTitle: "La práctica de la Regla de Oro nos ayuda a:",
    introBenefits: [
      "Detener la reacción compulsiva y elegir cómo queremos actuar (respuesta diferida).",
      "Comprender por qué ciertas actitudes o comportamientos de otros nos afectan tanto.",
      "Liberarnos de tensiones internas, contradicciones y estados de ánimo (climas) negativos.",
      "Mejorar nuestras relaciones, porque dejamos de pedir que el otro cambie y empezamos a cambiar nosotros.",
      "Construir un estilo de vida más coherente, más amable y más libre.",
      "No se trata de ser perfectos ni de \"portarse bien\". Se trata de aprender a vivir con más conciencia y menos violencia interna, paso a paso."
    ],
    introPurposeTitle: "Esta práctica sirve para:",
    introPurposes: [
      "Comprendernos mejor y reconocer qué nos duele y por qué.",
      "Detectar patrones repetidos que vienen de nuestra historia personal.",
      "Romper la cadena de violencia interna y externa.",
      "Actuar desde nuestras mejores virtudes, no desde el impulso del momento.",
      "Elevar nuestro nivel de conciencia, lo que mejora nuestra vida y la de quienes nos rodean.",
      "Con el tiempo, esta práctica se convierte en una herramienta para vivir con más unidad interna: pensar, sentir y actuar en la misma dirección.",
      "Esta aplicación te acompañará paso a paso para que puedas practicarla de manera sencilla, profunda y accesible. No importa tu edad, tu cultura, tu historia o tu situación actual: Todos podemos aprender a vivir con menos violencia y más libertad interna."
    ],
    introExplanation: "Todas las personas experimentamos momentos de tensión, enojo, frustración o confusión. A veces reaccionamos de forma puramente mecánica o compulsiva desde un bajo nivel de conciencia. Esta práctica es una herramienta de autoconocimiento y transformación personal diseñada para ayudarte a detener la reacción automática, comprender tus estados internos y elegir el buen trato de manera consciente. No es una norma rígida ni una obligación moral, sino un camino hacia una vida con menos sufrimiento, más unidad interna y verdadera libertad.",
    introPurposesExtra: "Esta aplicación te acompañará paso a paso para que puedas practicarla de manera sencilla, profunda y accesible. No importa tu edad, tu cultura, tu historia o tu situación actual: Todos podemos aprender a vivir con menos violencia y más libertad interna.",
    introBtnStart: "Iniciar Nueva Práctica",
    introBtnExample: "Ver un Ejemplo Resuelto",

    // Practice Section
    practiceTitleLabel: "Práctica en curso",
    practiceTitlePlaceholder: "Asigna un título a tu reflexión (Ej: Superación de conflicto laboral)",
    practiceProgressLabel: "Progreso global:",
    practiceCompletedCount: " completados",
    practicePrivacyTitle: "Garantía de Confidencialidad y Privacidad Absoluta",
    practicePrivacyText: "Tu práctica de reflexión es absolutamente privada. Todo lo que escribes se almacena localmente y de manera cifrada en la base de datos de tu propio navegador (localStorage). Ningún dato personal, reflexión o respuesta se envía a servidores externos ni a bases de datos en la nube. Tu intimidad emocional está completamente resguardada.",
    practiceQuestionLabel: "Pregunta ",
    practiceTypeLuminous: "Espacio Luminoso",
    practiceTypeDark: "Espacio Climático",
    practiceTypeTransition: "Transición",
    practiceInputWordLabel: "Tu palabra o frase corta:",
    practiceBtnPrev: "Anterior",
    practiceBtnNext: "Siguiente",
    practiceBtnLastPrompt: "¡Última pregunta!",
    practiceHelpPrompt: "Si no encuentras la palabra adecuada, puedes buscar la respuesta adecuada en este botón de ayuda.",
    practiceBtnHelp: "Ver ayuda",
    practiceBtnHideHelp: "Ocultar sugerencias de ayuda",
    practiceHelpSuffix: " Haz clic en cualquiera de estas sugerencias para seleccionarla:",
    practiceHelpOptional: "También puedes escribir cualquier otra palabra que represente mejor tu sentir.",
    
    // Simultaneous Preview
    previewTitle: "Idea Fuerza en Construcción",
    previewMainTitle: "Aforismo Principal (Camino de Subidas 6 + 8):",
    previewGoldenTitle: "Fórmula de Superación (Opcional I):",
    previewGoldenTemplate: "Para evitar {p2} ante {p1}, doy el trato de {p3}, haciendo {p4}.",
    previewHint: "✨ Mira cómo tus reflexiones se integran dinámicamente en tiempo real en estas sentencias lógicas.",

    // Workspace Actions
    actionTitle: "¿Quieres conservar tu sesión?",
    actionSubtitle: "Guarda tus respuestas en tu historial privado para revisarlas más tarde.",
    actionBtnReset: "Reiniciar",
    actionBtnSave: "Guardar Práctica",
    actionResetConfirm: "¿Estás seguro de que deseas reiniciar las respuestas actuales? Se perderá el borrador actual.",

    // Results Section
    resultsCompletedTitle: "¡Completaste todos los 8 puntos de la práctica!",
    resultsCompletedSubtitle: "Tu mente ha transitado de la reactividad a la autoconciencia. Abajo puedes contemplar tus aforismos listos.",
    resultsBtnSaveHistory: "Guardar en Historial",
    resultsSynthesisTitle: "Tu síntesis está en camino",
    resultsSynthesisSubtitle: "Responde las {totalSteps} preguntas del cuestionario para generar el conjunto de aforismos interactivos y de superación personal. Actualmente llevas {answeredCount} de {totalSteps}.",

    // Aforismos Display
    aforismosTitle: "Tus Ideas Fuerza y Aforismos Generados",
    aforismosSubtitle: "Fórmulas y sentencias lógicas construidas de forma simultánea a partir de tu reflexión.",
    aforismosBtnDownload: "Descargar Todas",
    aforismosCopiedTitle: "Copiar aforismo",
    aforismosCopiedMessage: "Aforismo copiado al portapapeles",

    // History Section
    historyTitle: "Tu Historial de Prácticas Guardadas",
    historySubtitle: "Aquí residen tus trabajos anteriores de autoconocimiento. Se guardan localmente en tu propio dispositivo.",
    historyEmptyTitle: "Historial de Prácticas Vacío",
    historyEmptyText: "Todavía no tienes reflexiones guardadas en tu navegador. Completa el cuestionario en la pestaña de Práctica y presiona 'Guardar Práctica' para empezar a construir tu bitácora personal.",
    historyBtnStartNew: "Comenzar Primera Práctica",
    historyCardDate: "Fecha de registro: ",
    historyBtnLoad: "Cargar en Workspace",
    historyBtnDelete: "Eliminar",
    historyDeleteConfirm: "¿Seguro que deseas eliminar esta práctica del historial? No se puede deshacer.",

    // Support Section
    supportTitle: "Biblioteca y Material de Apoyo",
    supportSubtitle: "Profundiza en la Regla de Oro con las referencias bibliográficas originales y el glosario de términos del Nuevo Humanismo.",
    supportTabExamples: "Ejemplos y Testimonios",
    supportTabGlossary: "Glosario de Términos",
    supportTabResources: "Biblioteca de Enlaces",
    supportTabMailbox: "Buzón y Contacto",
    
    // Support Examples
    supportExamplesTitle: "Casos de Estudio y Prácticas de Inspiración",
    supportExamplesSubtitle: "Revisa estos ejercicios reales y anónimos resueltos para guiarte en tu propia reflexión interior.",
    supportExamplesBtnLoad: "Cargar este Ejemplo en el Espacio de Trabajo",
    supportExamplesAforismoLabel: "Aforismo clave resultante:",
    supportExamplesCommentaryLabel: "Comentario del ejercicio:",

    // Support Glossary
    supportGlossarySearchPlaceholder: "Buscar término o definición...",
    supportGlossaryEmpty: "No se encontraron términos para la búsqueda.",

    // Support Resources
    supportResourcesTitle: "Libros y Conferencias de Consulta",
    supportResourcesSubtitle: "Accede de forma directa a la literatura fundacional del pensamiento humanista y la metodología de la no violencia.",
    supportResourcesAuthor: "Autor: ",
    supportResourcesPublisher: "Editorial: ",
    supportResourcesYear: "Año: ",
    supportResourcesTypeBook: "Libro",
    supportResourcesTypeConference: "Conferencia",
    supportResourcesTypeSpeech: "Arenga",
    supportResourcesTypeManual: "Manual",
    supportResourcesTypeVideo: "Canal de YouTube",
    supportResourcesTypePdf: "Libro en PDF",

    // Support Mailbox
    supportMailboxTitle: "Buzón y Sugerencias",
    supportMailboxSubtitle: "Envía tus opiniones, dudas o reportes directamente al equipo de desarrollo de forma totalmente anónima.",
    supportMailboxPrivateCheckTitle: "Garantía de Anonimato Completo",
    supportMailboxPrivateCheckText: "Tu privacidad está blindada. Este buzón no recopila tu correo, tu IP, tu geolocalización, ni ningún dato que pueda identificarte. El mensaje se transmite de forma encriptada directamente al servidor de recopilación para revisión exclusivamente técnica y de contenidos. Si deseas una respuesta personalizada, por favor incluye opcionalmente un medio de contacto al final de tu mensaje.",
    supportMailboxLabelCategory: "Categoría del mensaje:",
    supportMailboxCategoryOpinion: "Opinión o Sugerencia",
    supportMailboxCategoryError: "Reportar un Fallo técnico",
    supportMailboxCategoryQuestion: "Duda conceptual o metodológica",
    supportMailboxCategoryOther: "Otro asunto",
    supportMailboxLabelMessage: "Contenido de tu mensaje:",
    supportMailboxPlaceholderMessage: "Escribe aquí tus ideas, sugerencias o comentarios con total libertad...",
    supportMailboxBtnSend: "Enviar Mensaje Anónimo",
    supportMailboxBtnSending: "Enviando de forma segura...",
    supportMailboxSuccessTitle: "¡Mensaje Enviado con Éxito!",
    supportMailboxSuccessText: "Muchas gracias por tu contribución. Tu mensaje ha sido incorporado a nuestra hoja de cálculo de gestión y será analizado con profundo respeto por el equipo técnico. Tu aporte nos ayuda a mejorar la experiencia de todos.",
    supportMailboxBtnSendAnother: "Enviar Otro Mensaje",

    // Download Output File Format
    downloadHeader: "LA PRÁCTICA DE LA REGLA DE ORO",
    downloadPracticeTitle: "Título de la práctica: ",
    downloadDate: "Fecha de descarga: ",
    downloadResponsesHeader: "RESPUESTAS AL CUESTIONARIO:",
    downloadAforismosHeader: "IDEAS FUERZA Y AFORISMOS GENERADOS:",
    downloadNotesHeader: "NOTAS PERSONALES / DIARIO DE TRABAJO:",
    downloadNotesEmpty: "Sin notas adicionales.",
    downloadFooterQuote: "Cuando tratas a los demás como quieres que te traten, te liberas. — Silo"
  },
  en: {
    logoTitle: "The Golden Rule",
    logoSubtitle: "Interactive Practice",
    tabIntro: "Introduction",
    tabPractice: "Practice",
    tabHistory: "History",
    tabSupport: "Library & Links",
    themeToggleDark: "Switch to Dark Theme",
    themeToggleLight: "Switch to Light Theme",
    toastThemeChanged: "Theme changed to: ",
    toastFormReset: "Form reset successfully.",
    toastPracticeSaved: "Practice saved successfully to your history!",
    toastPracticeLoaded: "Practice loaded: ",
    toastPracticeDeleted: "Practice deleted from history.",
    toastExampleLoaded: "Full solved example loaded. Check the map and key ideas.",
    toastPracticeReady: "Example successfully loaded in your workspace. Compare it on the map!",
    toastFormCheck: "Please answer at least the first questions before saving.",
    toastDownloadSuccess: "Text file downloaded successfully.",
    
    // Intro section
    introTagline: "Personal Transformation and Nonviolence",
    introTitle: "The Practice of the Golden Rule",
    introSubtitle: "A practical path to overcome mechanical reactions, understand your internal states, and consciously choose kind treatment.",
    introPrivacyTitle: "🔒 100% Secure and Private Space",
    introPrivacyText: "This exercise is a self-knowledge tool and is strictly personal. For your complete peace of mind, the answers you enter throughout these points are not stored on any external server nor recorded in any database accessible by third parties. Everything you write is processed temporarily and locally on your screen for your own inner work. Practice with absolute freedom.",
    introPrincipleTitle: "Central Principle",
    introSiloQuote: "When you treat others as you want to be treated, you liberate yourself.",
    introInspiration: "This practice is inspired by the Golden Rule of New Humanism, as presented in \"The Golden Rule of Nonviolence\" by Roberto Kohanoff and Isabel Lazzaroni.",
    introSiloAuthor: "— Silo, Universalist Humanism",
    introBenefitsTitle: "Practicing the Golden Rule helps us to:",
    introBenefits: [
      "Stop compulsive reactions and choose how we want to act (deferred response).",
      "Understand why certain attitudes or behaviors of others affect us so much.",
      "Free ourselves from internal tensions, contradictions, and negative moods (climates).",
      "Improve our relationships, because we stop asking the other to change and start changing ourselves.",
      "Build a more coherent, kinder, and freer lifestyle.",
      "It is not about being perfect or \"behaving well.\" It is about learning to live with more awareness and less internal violence, step by step."
    ],
    introPurposeTitle: "This practice is useful to:",
    introPurposes: [
      "Understand ourselves better and recognize what hurts us and why.",
      "Detect repeated patterns that stem from our personal history.",
      "Break the chain of internal and external violence.",
      "Act from our best virtues, not from the impulse of the moment.",
      "Raise our level of consciousness, which improves our lives and the lives of those around us.",
      "Over time, this practice becomes a tool to live with more internal unity: thinking, feeling, and acting in the same direction.",
      "This application will guide you step by step so you can practice it in a simple, deep, and accessible way. No matter your age, culture, history, or current situation: We can all learn to live with less violence and more internal freedom."
    ],
    introExplanation: "We all experience moments of tension, anger, frustration, or confusion. Sometimes we react in a purely mechanical or compulsive way from a low level of consciousness. This practice is a self-knowledge and personal transformation tool designed to help you stop the automatic reaction, understand your internal states, and consciously choose kind treatment. It is not a rigid norm or a moral obligation, but a path toward a life with less suffering, more internal unity, and true freedom.",
    introPurposesExtra: "This application will guide you step by step so you can practice it in a simple, deep, and accessible way. No matter your age, culture, history, or current situation: We can all learn to live with less violence and more internal freedom.",
    introBtnStart: "Start New Practice",
    introBtnExample: "View a Solved Example",

    // Practice Section
    practiceTitleLabel: "Practice in progress",
    practiceTitlePlaceholder: "Give a title to your reflection (e.g., Overcoming a work conflict)",
    practiceProgressLabel: "Global progress:",
    practiceCompletedCount: " completed",
    practicePrivacyTitle: "Guarantee of Complete Confidentiality and Privacy",
    practicePrivacyText: "Your reflection practice is absolutely private. Everything you write is stored locally and securely in your browser's database (localStorage). No personal data, reflection, or response is sent to external servers or cloud databases. Your emotional intimacy is fully protected.",
    practiceQuestionLabel: "Question ",
    practiceTypeLuminous: "Luminous Space",
    practiceTypeDark: "Perturbed Space",
    practiceTypeTransition: "Transition",
    practiceInputWordLabel: "Your word or short phrase:",
    practiceBtnPrev: "Previous",
    practiceBtnNext: "Next",
    practiceBtnLastPrompt: "Last question!",
    practiceHelpPrompt: "If you can't find the right word, you can look for help in this panel.",
    practiceBtnHelp: "Show help",
    practiceBtnHideHelp: "Hide help suggestions",
    practiceHelpSuffix: " Click on any of these suggestions to select it:",
    practiceHelpOptional: "You can also write any other word that better represents your feelings.",
    
    // Simultaneous Preview
    previewTitle: "Key Idea in Construction",
    previewMainTitle: "Main Aphorism (Rising Paths 6 + 8):",
    previewGoldenTitle: "Formula of Overcoming (Optional I):",
    previewGoldenTemplate: "To avoid {p2} before {p1}, I offer the treatment of {p3}, by doing {p4}.",
    previewHint: "✨ Watch how your reflections are dynamically integrated in real time into these logical sentences.",

    // Workspace Actions
    actionTitle: "Do you want to save your session?",
    actionSubtitle: "Save your answers to your private history to review them later.",
    actionBtnReset: "Reset",
    actionBtnSave: "Save Practice",
    actionResetConfirm: "Are you sure you want to reset the current answers? Your active draft will be lost.",

    // Results Section
    resultsCompletedTitle: "You have completed all 8 points of the practice!",
    resultsCompletedSubtitle: "Your mind has moved from reactivity to self-awareness. Below you can contemplate your final aphorisms.",
    resultsBtnSaveHistory: "Save in History",
    resultsSynthesisTitle: "Your synthesis is on the way",
    resultsSynthesisSubtitle: "Answer the {totalSteps} questions of the questionnaire to generate the set of interactive and self-improvement aphorisms. Currently you have {answeredCount} of {totalSteps}.",

    // Aforismos Display
    aforismosTitle: "Your Key Ideas and Generated Aphorisms",
    aforismosSubtitle: "Formulas and logical statements built simultaneously from your reflection.",
    aforismosBtnDownload: "Download All",
    aforismosCopiedTitle: "Copy aphorism",
    aforismosCopiedMessage: "Aphorism copied to clipboard",

    // History Section
    historyTitle: "Your History of Saved Practices",
    historySubtitle: "Here reside your previous self-knowledge works. They are saved locally on your own device.",
    historyEmptyTitle: "Saved Practices History is Empty",
    historyEmptyText: "You don't have any saved reflections in your browser yet. Complete the questionnaire in the Practice tab and click 'Save Practice' to start building your personal journal.",
    historyBtnStartNew: "Start First Practice",
    historyCardDate: "Date recorded: ",
    historyBtnLoad: "Load into Workspace",
    historyBtnDelete: "Delete",
    historyDeleteConfirm: "Are you sure you want to delete this practice from your history? This action cannot be undone.",

    // Support Section
    supportTitle: "Library and Support Material",
    supportSubtitle: "Deepen your understanding of the Golden Rule with original literature references and the New Humanism glossary.",
    supportTabExamples: "Examples & Testimonials",
    supportTabGlossary: "Glossary of Terms",
    supportTabResources: "Links Library",
    supportTabMailbox: "Mailbox & Contact",
    
    // Support Examples
    supportExamplesTitle: "Case Studies and Inspiring Practices",
    supportExamplesSubtitle: "Review these real and anonymous resolved exercises to guide you in your own inner reflection.",
    supportExamplesBtnLoad: "Load this Example into Workspace",
    supportExamplesAforismoLabel: "Resulting key aphorism:",
    supportExamplesCommentaryLabel: "Exercise commentary:",

    // Support Glossary
    supportGlossarySearchPlaceholder: "Search term or definition...",
    supportGlossaryEmpty: "No terms found matching your search.",

    // Support Resources
    supportResourcesTitle: "Books and Lectures for Consultation",
    supportResourcesSubtitle: "Directly access the foundational literature of humanist thought and the active nonviolence methodology.",
    supportResourcesAuthor: "Author: ",
    supportResourcesPublisher: "Publisher: ",
    supportResourcesYear: "Year: ",
    supportResourcesTypeBook: "Book",
    supportResourcesTypeConference: "Conference",
    supportResourcesTypeSpeech: "Silo's Address",
    supportResourcesTypeManual: "Manual",
    supportResourcesTypeVideo: "YouTube Channel",
    supportResourcesTypePdf: "PDF Book",

    // Support Mailbox
    supportMailboxTitle: "Mailbox and Feedback",
    supportMailboxSubtitle: "Send your opinions, doubts, or technical reports directly to the development team completely anonymously.",
    supportMailboxPrivateCheckTitle: "Guarantee of Complete Anonymity",
    supportMailboxPrivateCheckText: "Your privacy is shielded. This mailbox does not collect your email, IP, geolocation, or any data that could identify you. Messages are encrypted directly to the spreadsheet for technical and content review. If you'd like a response, please optionally include a contact method at the end of your message.",
    supportMailboxLabelCategory: "Message category:",
    supportMailboxCategoryOpinion: "Opinion or Suggestion",
    supportMailboxCategoryError: "Report a technical bug",
    supportMailboxCategoryQuestion: "Conceptual/methodological doubt",
    supportMailboxCategoryOther: "Other matter",
    supportMailboxLabelMessage: "Your message content:",
    supportMailboxPlaceholderMessage: "Write your ideas, suggestions, or comments here with total freedom...",
    supportMailboxBtnSend: "Send Anonymous Message",
    supportMailboxBtnSending: "Sending securely...",
    supportMailboxSuccessTitle: "Message Sent Successfully!",
    supportMailboxSuccessText: "Thank you very much for your contribution. Your message has been safely integrated into our management spreadsheet and will be analyzed with deep respect by the technical team. Your input helps us improve the experience for everyone.",
    supportMailboxBtnSendAnother: "Send Another Message",

    // Download Output File Format
    downloadHeader: "THE PRACTICE OF THE GOLDEN RULE",
    downloadPracticeTitle: "Reflection Title: ",
    downloadDate: "Download date: ",
    downloadResponsesHeader: "QUESTIONNAIRE ANSWERS:",
    downloadAforismosHeader: "KEY IDEAS AND GENERATED APHORISMS:",
    downloadNotesHeader: "PERSONAL NOTES / WORK DIARY:",
    downloadNotesEmpty: "No additional notes.",
    downloadFooterQuote: "When you treat others as you want to be treated, you liberate yourself. — Silo"
  }
};

export const GLOSSARY_TERMS_EN = [
  {
    term: "Aphorism",
    definition: "It is a short phrase or sentence that functions as a statement of the actions we want to put into practice to overcome the contradiction or suffering worked on during the exercise. We rely on this aphorism, reading it or repeating it whenever necessary, to remind ourselves how it is possible to escape low states of consciousness. Silo says: 'Thoughts repeated with faith produce and attract the maximum force in actions.' He adds: 'The more an action or thought is repeated, the more it is written in memory, the stronger habits become, and the more one is predisposed to future actions in that direction.'",
    tag: "Action" as const
  },
  {
    term: "Coenesthesis",
    definition: "One of the internal senses, also known as interoception (perception of the internal state of the body). It provides data regarding pressure, temperature, moisture, acidity, alkalinity, tension, relaxation, etc., and any other sensation coming from inside the body. It also registers the work of the centers (for instance, emotions, intellectual operations, etc.).",
    tag: "States" as const
  },
  {
    term: "Response Centers",
    definition: "A conceptual synthesis referring to a mechanism of the psyche that responds to the world of sensation. The response is the manifestation toward the external and/or internal environment of the center's activity. We can differentiate response centers by their activity or the function they perform. The centers are: intellectual, motor, emotive, sexual, and vegetative.",
    tag: "Methodology" as const
  },
  {
    term: "Climate (Mood)",
    definition: "We call this the emotional background in which any object takes on the characteristics of that background or mood when falling into that field. Climates can be situational, or become fixed in the psyche and disrupt the entire structure, preventing movement to other appropriate climates. Fixed climates circulate through different levels, subtracting operational freedom from consciousness.",
    tag: "States" as const
  },
  {
    term: "Compulsion",
    definition: "An intense or vehement impulse or desire to do something. In psychology, it is an uncontrollable urge to say or do something without obvious motive or reason.",
    tag: "States" as const
  },
  {
    term: "Consciousness (Levels of)",
    definition: "The different ways in which the consciousness-senses-memory-centers circuit works. According to 'Self-Liberation', we distinguish: 1) Level of deep sleep: minimal work of external senses. 2) Level of semi-sleep: increased work of external senses, but with interference from daydreams and internal sensations. 3) Level of waking: when the external senses provide the greatest flow of information, inhibiting the internal senses and making it possible to orient oneself to the world to compensate for stimuli.",
    tag: "States" as const
  },
  {
    term: "Daydreams",
    definition: "In the waking state, numerous images, ideas, and thoughts appear, separate from the main idea or thought being developed. These formalizations of stimuli, coming from other levels, the external environment, or bodily stimuli, manifest as images that pressure the waking level; we call them daydreams. They are unstable and changing and represent the greatest obstacles to the work of attention.",
    tag: "States" as const
  },
  {
    term: "Inner Guide",
    definition: "An allegory created by consciousness, embodying specific attributes: goodness, wisdom, and strength. It is highly personal. It can be one's god; it may have a religious or sacred context, or not; it can be a saintly figure, someone known in life, an inspiring historical figure, presence, force, or image. It is highly personal, and it is not for anyone to judge another's Guide.",
    tag: "Action" as const
  },
  {
    term: "Universalist Humanism",
    definition: "Also called New Humanism. It is characterized by highlighting the humanist attitude. This attitude is not a philosophy but a perspective, a sensitivity, and a way of living one's relationship with other human beings.",
    tag: "Methodology" as const
  },
  {
    term: "Kinesthesis",
    definition: "Another of the internal senses, also called proprioception (the brain's ability to know the exact position of all parts of our body at any given moment). It provides data regarding movement, body posture, and physical balance or imbalance.",
    tag: "States" as const
  },
  {
    term: "Mechanicalness",
    definition: "A repetitive, cold, unconscious, and routine attitude that turns human beings into automata, lacking reflection and empathy.",
    tag: "States" as const
  },
  {
    term: "Daydream Nucleus",
    definition: "There are daydreams of greater fixity or repetition, which, even when varying, denote the same mental climate. The main characteristic of this climate is its permanence. This fixed nucleus manifests as an image, and that image has the property of orienting the body and activities in a direction that is not noticed by consciousness.",
    tag: "States" as const
  },
  {
    term: "Biographical Knot",
    definition: "An internal conflict that appeared in childhood. Silo describes it as a 'knot of pain'. It is usually associated with a permanent and generalized climate (daydream nucleus), and without internal work, it can remain unresolved for a long time.",
    tag: "States" as const
  },
  {
    term: "Operative",
    definition: "Refers to operations that can modify, convert, or redirect behavior.",
    tag: "Action" as const
  },
  {
    term: "Formative Landscape",
    definition: "Refers to the events experienced by a human being from birth and in relation to an environment. The influence of the formative landscape is not simply given by a biographically formed intellectual perspective from which the present is observed, but is a continuous adjustment of situation based on experience. It acts as a background for interpretation and action, as a sensitivity, and as a set of beliefs and values with which an individual or generation lives.",
    tag: "Methodology" as const
  },
  {
    term: "External Landscape",
    definition: "Configuration of reality that corresponds to the perception of external senses weighted by the contents of consciousness itself. Since consciousness is an active structure and not a simple reflection of 'external' reality, the latter appears as a structured 'landscape', by no means as a sum of perceptions or as a structure isolated from external senses.",
    tag: "Methodology" as const
  },
  {
    term: "Human Landscape",
    definition: "Configuration of human reality based on the perception of the-other, society, and objects produced with intentional meaning. The human landscape is not simple object perception, but a revealing of meanings and intentions in which the human being recognizes themselves.",
    tag: "Methodology" as const
  },
  {
    term: "Internal Landscape",
    definition: "Configuration of reality corresponding to the perception of internal senses weighted by memory data and by the intentional stance of consciousness, which varies according to states of sleep, waking, emotion, etc. It is experienced in the stance of consciousness 'turned inward', having as reference the internal register of the tactile-coenesthetic limit.",
    tag: "Methodology" as const
  },
  {
    term: "Perception",
    definition: "The register of data plus the activity of the sense in motion. It is a structure: data plus the activity of the sense that abstracts and structures.",
    tag: "Methodology" as const
  },
  {
    term: "Projection",
    definition: "In psychology, a defense mechanism that consists of placing outside, whether in a person or an object, those internal attributes, desires, feelings, or aspects of ourselves that we are unable to accept.",
    tag: "States" as const
  },
  {
    term: "Register",
    definition: "The experience of sensation produced by stimuli detected by external or internal senses, including memories and images.",
    tag: "Methodology" as const
  },
  {
    term: "Representation",
    definition: "Any memory phenomenon that touches the field of presence of consciousness. Different from the memory data that can act subliminally in co-presence, and of course, from perception.",
    tag: "Methodology" as const
  },
  {
    term: "Reversibility",
    definition: "The faculty of consciousness to direct itself, through attention, to its sources of information. For example, when we speak of reversibility of thought, we refer to the ability to return to a starting point or an initial situation.",
    tag: "Methodology" as const
  }
];

export const STEPS_EN: StepConfig[] = [
  {
    id: 1,
    label: "Point 1: The mistreatment I reject",
    shortName: "Mistreatment I reject",
    question: "What is the mistreatment I reject?",
    description: "Identify that attitude, action, or behavior of others that you find violent, painful, or unacceptable. It is the external situation that disturbs your well-being.",
    helpDescription: "Select the type of mistreatment that resonates most with you, or write your own word:",
    placeholder: "e.g., Excluding, Indifference, Dismissal...",
    type: "dark",
    categories: [
      {
        categoryName: "Exclusion and Indifference",
        words: ["Excluding", "Indifference", "Ignored", "Rejection", "Isolation", "Contempt", "Neglect", "Marginality", "Invisibility"]
      },
      {
        categoryName: "Aggression and Disparagement",
        words: ["Aggression", "Insults", "Screaming", "Humiliation", "Teasing", "Dismissal", "Criticism", "Judgment", "Belittlement", "Disdain"]
      },
      {
        categoryName: "Control and Domination",
        words: ["Subjugation", "Manipulation", "Demanding", "Injustice", "Control", "Abuse of power", "Imposition", "Authoritarianism", "Lying", "Betrayal"]
      }
    ]
  },
  {
    id: 2,
    label: "Point 2: My reaction and state",
    shortName: "My reaction / state",
    question: "How do I feel and what do I do in response to that mistreatment?",
    description: "Recognize your mechanical response to Point 1. It reflects your disturbed state, the defensive, angry, or suffering response that arises automatically.",
    helpDescription: "Select how you usually react or feel in response to that disturbance:",
    placeholder: "e.g., I suffer and distance myself, I scream with rage, I blame myself...",
    type: "dark",
    categories: [
      {
        categoryName: "Withdrawal and Suffering",
        words: ["I suffer and withdraw", "I isolate myself", "I get depressed", "I shut down with rancor", "I feel guilty", "I resign myself", "I feel helpless"]
      },
      {
        categoryName: "Anger and Counterattack",
        words: ["I scream with rage", "I attack back", "I seek revenge", "I get irritated", "I complain violently", "I argue without listening", "I pay back in kind"]
      },
      {
        categoryName: "Anxiety and Paralysis",
        words: ["I feel fear and flee", "I freeze", "I get anxious", "I tense up physically", "I feel abandoned", "I seek submissive approval"]
      }
    ]
  },
  {
    id: 3,
    label: "Point 3: The treatment I ask for and give",
    shortName: "Treatment I ask / give",
    question: "What treatment do I ask from those who mistreated me so that I can give it myself?",
    description: "The opposite virtue to Point 1. It is the kind treatment that you would like to receive and that you commit to giving first, raising your level of consciousness.",
    helpDescription: "Select the inspiring kind treatment that opposes the mistreatment in Point 1:",
    placeholder: "e.g., Consideration & inclusion, Genuine appreciation, Active listening...",
    type: "luminous",
    categories: [
      {
        categoryName: "Inclusion and Welcoming",
        words: ["Consideration and inclusion", "Acceptance", "Sincere welcoming", "Attentive listening", "Recognition", "Integration", "Closeness"]
      },
      {
        categoryName: "Affection and Valuation",
        words: ["Genuine appreciation", "Deep respect", "Kindness", "Tolerance", "Mutual care", "Compassion", "Empathy", "Valuation"]
      },
      {
        categoryName: "Freedom and Peace",
        words: ["Freedom", "Absolute trust", "Unconditional support", "Justice", "Understanding", "Sincerity", "Inner peace"]
      }
    ]
  },
  {
    id: 4,
    label: "Point 4: The alternative kind treatment",
    shortName: "Alternative kind treatment",
    question: "How do I do it? (Kind treatment opposed to my reaction in Point 2)",
    description: "The opposite virtue to Point 2. It is the conscious and constructive action that you carry out instead of your usual reactive response.",
    helpDescription: "Select the virtuous action that neutralizes the negative reaction of Point 2:",
    placeholder: "e.g., I approach & appreciate others, I dialogue calmly, I set healthy boundaries...",
    type: "luminous",
    categories: [
      {
        categoryName: "Approach and Valuation",
        words: ["I approach and appreciate others", "I dialogue honestly", "I express my affection", "I accompany with patience", "I value others' virtues"]
      },
      {
        categoryName: "Calm and Serenity",
        words: ["I breathe calmly", "I listen with openness", "I act without haste", "I seek to understand before judging", "I forgive sincerely", "I reconcile"]
      },
      {
        categoryName: "Firmness and Self-Care",
        words: ["I set healthy boundaries with love", "I express myself firmly and calmly", "I value myself", "I trust my inner strength", "I open up without fear"]
      }
    ]
  },
  {
    id: 5,
    label: "Point 5: My falling path (From 3 to 2)",
    shortName: "Falling path 3 ➔ 2",
    question: "How do I fall from the virtuous treatment (3) to the mechanical reaction (2)?",
    description: "Identify what attitude, belief, fear, expectation, or vulnerability sabotages your kind intentions and makes you slide back into suffering or anger.",
    helpDescription: "Select the internal factor that makes you descend to the reactivity of Point 2:",
    placeholder: "e.g., Insecurity, Frustrated expectations, Pride...",
    type: "transition",
    direction: "down",
    fromId: 3,
    toId: 2,
    categories: [
      {
        categoryName: "Insecurity and Doubt",
        words: ["Insecurity", "Distrust", "Self-doubts", "Jealousy", "Wounded vulnerability", "Fear of rejection"]
      },
      {
        categoryName: "Expectations and Pride",
        words: ["Excessive expectations", "Wounded pride", "Soberbia/Arrogance", "Vanity", "Selfishness", "Perfectionist demands"]
      },
      {
        categoryName: "Weakness and Fear",
        words: ["Fear of failure", "Fear of pain", "Social cowardice", "Passive comfort", "Internal laziness", "Apathy"]
      }
    ]
  },
  {
    id: 6,
    label: "Point 6: My rising path (From 2 to 3)",
    shortName: "Rising path 2 ➔ 3",
    question: "How do I rise from the disturbed state (2) to the virtuous treatment (3)?",
    description: "Recognize the intentional action that allows you to raise your level of consciousness, break the loop of suffering or anger, and reconnect with virtue.",
    helpDescription: "Select the bridge that helps you return to the luminous state of Point 3:",
    placeholder: "e.g., I express what I feel and think, I become aware, I breathe...",
    type: "transition",
    direction: "up",
    fromId: 2,
    toId: 3,
    categories: [
      {
        categoryName: "Honest Communication",
        words: ["I express what I feel and think", "I ask for help with humility", "I tell what happens honestly", "I dialogue with frankness", "I speak from the heart"]
      },
      {
        categoryName: "Awareness and Reflection",
        words: ["I reflect in silence", "I realize the mechanicalness", "I breathe deeply and observe", "I accept my part", "I meditate in calm"]
      },
      {
        categoryName: "Courageous Action",
        words: ["I take the initiative to repair", "I risk myself to change", "I act with courage", "I take responsibility for myself", "I decide not to harm"]
      }
    ]
  },
  {
    id: 7,
    label: "Point 7: My falling path (From 4 to 1)",
    shortName: "Falling path 4 ➔ 1",
    question: "How do I fall from alternative kind treatment (4) to reactive mistreatment (1)?",
    description: "Identify what wears you down or frustrates you when trying to maintain kind treatment, making you lose patience and fall back into a violent or rejecting attitude.",
    helpDescription: "Select what dampens your motivation and makes you slip back into harmful behavior:",
    placeholder: "e.g., Burnout, Extreme fatigue, Frustration...",
    type: "transition",
    direction: "down",
    fromId: 4,
    toId: 1,
    categories: [
      {
        categoryName: "Fatigue and Saturation",
        words: ["Burnout", "Accumulated fatigue", "Mental saturation", "Overwhelm of routine", "Stress", "Energy depletion"]
      },
      {
        categoryName: "Frustration and Disappointment",
        words: ["Disappointment in the other", "Frustration of seeing no change", "Pessimism", "Disinterest", "Spite", "Feeling it is not worth it"]
      },
      {
        categoryName: "Impatience and Irritability",
        words: ["Impatience", "Contained rage", "Zero tolerance", "Accumulated annoyance", "Constant irritation", "Desire to punish"]
      }
    ]
  },
  {
    id: 8,
    label: "Point 8: My rising path (From 1 to 4)",
    shortName: "Rising path 1 ➔ 4",
    question: "How do I rise from the rejecting attitude/mistreatment (1) to alternative kind treatment (4)?",
    description: "Discover the deep intention or action that allows you to overcome rejection, reconcile, and commit to the constructive action of Point 4.",
    helpDescription: "Select the deep bridge that reconnects you with the benevolent treatment of Point 4:",
    placeholder: "e.g., I connect with the Human in me and others, I forgive, I feel empathy...",
    type: "transition",
    direction: "up",
    fromId: 1,
    toId: 4,
    categories: [
      {
        categoryName: "Human Connection",
        words: ["I connect with the Human in me and others", "I look at the other as an equal", "I feel empathy with their pain", "I seek what unites us, not what separates us"]
      },
      {
        categoryName: "Reconciliation and Compassion",
        words: ["I forgive and let go of rancor", "I reconcile intimately", "I feel compassion for their ignorance", "I accept that we all make mistakes"]
      },
      {
        categoryName: "Love in Action",
        words: ["I act with benevolence", "I wish others' well-being from the heart", "I seek unity and peace", "I commit to nonviolence"]
      }
    ]
  }
];

export const RESOURCES_LIST_EN = [
  {
    type: "Book",
    title: "La Regla de Oro de la No Violencia",
    author: "Roberto Kohanoff and Isabel Lazzaroni",
    publisher: "Ediciones León Alado",
    year: "2023",
    description: "Over the course of more than 30 years, the authors have investigated, studied, experimented, and deepened the Golden Rule: \"If you treat others as you want to be treated, you liberate yourself\", to escape the climate of complaint they saw in themselves and others. From these studies arose an exercise that helps us offer others the treatment we want for ourselves. This is what is embodied in this book, where there are explanations, examples, and guidelines for any interested person.",
    url: "http://edicionesleonalado.net"
  },
  {
    type: "Book",
    title: "The Inner Look",
    author: "Silo",
    publisher: "Editorial ATE, Barcelona",
    year: "1979",
    description: "The foundational work of Silo's thought, inviting deep introspection and an encounter with the meaning of human existence."
  },
  {
    type: "Book",
    title: "Silo's Message",
    author: "Silo",
    publisher: "Editorial EDAF, Madrid",
    year: "2008",
    description: "Synthesizes the spiritual dimension of his thought, proposing a path of faith, reconciliation, and inner realization."
  },
  {
    type: "Book",
    title: "Dictionary of New Humanism",
    author: "Silo",
    publisher: "Ediciones León Alado, Madrid",
    year: "2014",
    description: "Indispensable reference tool to understand the social, philosophical, and anthropological terminology of New Humanism."
  },
  {
    type: "Conference",
    title: "Comments on the Golden Rule",
    author: "Silo",
    year: "December 17, 1995",
    description: "Lecture delivered in Mendoza, Argentina, detailing the scope of reciprocity and the laws of valid action in daily life."
  },
  {
    type: "Arenga",
    title: "The Healing of Suffering",
    author: "Silo",
    year: "May 4, 1969",
    description: "Address delivered by Silo in Punta de Vacas, Mendoza, Argentina, which laid the foundations for overcoming violence and pain."
  },
  {
    type: "Book",
    title: "Self-Liberation",
    author: "L.A. Ammann",
    publisher: "Editorial ATE, Barcelona",
    year: "1980",
    description: "A structured compendium of self-knowledge, relaxation, and psychophysical techniques essential for the practitioner."
  },
  {
    type: "Book",
    title: "Psychology Notes",
    author: "Silo",
    publisher: "Ediciones León Alado, Madrid",
    year: "2014",
    description: "In-depth study of the human psyche, representations, and levels of consciousness, giving a scientific framework to reflective work."
  },
  {
    type: "Book",
    title: "Learn to resist the violence within and around you",
    author: "H. Roig, D. Tormen, and M. Barberena",
    publisher: "Edited by Deborah Tormen, Buenos Aires",
    year: "2006",
    description: "An excellent manual with practical dynamics and rigorous exercises directly applying the Golden Rule."
  },
  {
    type: "Conference",
    title: "The Conditions of Dialogue",
    author: "Silo",
    year: "October 6, 1993",
    description: "Lecture delivered at the Moscow Academy of Sciences, Russia, exploring the keys to truly nonviolent communication."
  },
  {
    type: "Conference",
    title: "Mission of the '80s",
    author: "Silo",
    year: "September 27, 1981",
    description: "Lecture delivered in Madrid, Spain, analyzing the collective challenges of active nonviolence against militarism."
  },
  {
    type: "Book",
    title: "Letters to my friends",
    author: "Silo",
    publisher: "Ediciones León Alado, Madrid",
    year: "2013",
    description: "Fundamental epistolary reflections on the simultaneous personal and social transformation required to change the world."
  },
  {
    type: "Book",
    title: "The Day of the Winged Lion",
    author: "Silo",
    publisher: "Ediciones León Alado, Madrid",
    year: "2013",
    description: "Allegorical literary stories that inspiringly portray elevated states of consciousness and existential meaning."
  },
  {
    type: "Manual",
    title: "Manual of formative topics and practices for messengers",
    author: "Various Authors",
    publisher: "Ediciones León Alado, Madrid",
    description: "Practical manual gathering the main study, meditation, and humanist action dynamics for the Message practitioners."
  },
  {
    type: "YouTube Channel",
    title: "León Alado YouTube Channel",
    description: "Videos of practices with the Golden Rule, lectures by Silo, and valuable complementary educational audiovisual material.",
    url: "https://www.youtube.com/@leonalado7780/videos"
  },
  {
    type: "PDF Book",
    title: "Learn to resist violence (Digital)",
    description: "Link to view and read online the complete book edited by Deborah Tormen.",
    url: "https://psicologiadelnuevohumanismo.org"
  }
];

export const EXAMPLES_LIST_EN = [
  {
    id: "ex1",
    title: "Anonymous Exercise Example 1",
    subtitle: "Anonymous Woman — Mistreatment and 'Harmers'",
    description: "In this example of an anonymous woman, the mistreatment she rejects is from 'those who do harm just because', whom she calls the harmers (point 1). In front of them, she feels fear, doesn't want to bother, and prefers to go unnoticed. She identifies as fearful (point 2).",
    answers: {
      1: "The harmers (harm just because)",
      2: "Fearful (fear, going unnoticed)",
      3: "To be cared for (emplacing myself as caretaker)",
      4: "Calming them down",
      5: "Self-devaluation (thinking I am not needed)",
      6: "Surrender and availability",
      7: "Mental noise (neither thinking nor realizing)",
      8: "Meditation, attention"
    },
    aforismo: "I take care (of myself and others) by calming down, available and attentive.",
    commentary: "This exercise illustrates the conversion of images: to avoid reacting with fear in front of the harmers (who are a projection of her own harmer), she needs to emplace herself as good and caring, seeking to calm them down."
  },
  {
    id: "ex2",
    title: "Anonymous Exercise Example 2, on Expectations",
    subtitle: "Expectations, prudence, and direction",
    description: "Before a given situation, sometimes I act in an foolish way (point 1) and other times I freeze out of cowardice (point 2) and I never know when I'm going to emplace myself in one 'role' or the opposite.",
    answers: {
      1: "Acting in a foolish way",
      2: "Freezing out of cowardice",
      3: "That the foolish one be prudent",
      4: "Behaving with courage",
      5: "Fear",
      6: "Serenity",
      7: "Gross desires",
      8: "Elevating the desire"
    },
    aforismo: "I act with direction instead of expectations, gaining serenity and elevating desire.",
    commentary: "It shows us that behavioral expectations disappear when we are in our center of gravity. We stop waiting for the other to change —or for ourselves to behave in a certain way— and we change ourselves, directing our actions and becoming protagonists."
  }
];

// Helper to format aphorisms in Spanish/English dynamically
export function generateAforismosTranslated(answers: Record<number, string>, lang: 'es' | 'en'): AforismoOutput[] {
  const clean = (val: string, placeholder = "___") => {
    return val && val.trim() !== "" ? val.trim() : placeholder;
  };

  const p1 = clean(answers[1], lang === 'es' ? "[Maltrato 1]" : "[Mistreatment 1]");
  const p2 = clean(answers[2], lang === 'es' ? "[Respuesta 2]" : "[Response 2]");
  const p3 = clean(answers[3], lang === 'es' ? "[Virtud 3]" : "[Virtue 3]");
  const p4 = clean(answers[4], lang === 'es' ? "[Acción 4]" : "[Action 4]");
  const p5 = clean(answers[5], lang === 'es' ? "[Caída 5]" : "[Fall 5]");
  const p6 = clean(answers[6], lang === 'es' ? "[Subida 6]" : "[Rise 6]");
  const p7 = clean(answers[7], lang === 'es' ? "[Caída 7]" : "[Fall 7]");
  const p8 = clean(answers[8], lang === 'es' ? "[Subida 8]" : "[Rise 8]");

  function capitalizeFirst(str: string): string {
    const trimmed = str.trim();
    if (!trimmed) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  if (lang === 'es') {
    const aforismoPrincipalText = `${p6.toUpperCase()}, ${p8.toUpperCase().startsWith("POR ") ? p8.toUpperCase() : `POR ${p8.toUpperCase()}`}.`;
    const opcionalIText = capitalizeFirst(`para evitar ${p2.toLowerCase()} ante ${p1.toLowerCase()}, doy el trato de ${p3.toLowerCase()}, haciendo ${p4.toLowerCase()}.`);
    const opcionalIIText = capitalizeFirst(`por ${p5.toLowerCase()} caigo a ${p2.toLowerCase()}, pero por ${p6.toLowerCase()} subo a ${p3.toLowerCase()}.`);
    const opcionalIIIText = capitalizeFirst(`por ${p7.toLowerCase()} caigo a ${p1.toLowerCase()}, pero por ${p8.toLowerCase()} subo a ${p4.toLowerCase()}.`);

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
  } else {
    // English version
    const aforismoPrincipalText = `${p6.toUpperCase()}, ${p8.toUpperCase().startsWith("BY ") ? p8.toUpperCase() : `BY ${p8.toUpperCase()}`}.`;
    const opcionalIText = capitalizeFirst(`to avoid ${p2.toLowerCase()} in the face of ${p1.toLowerCase()}, I offer the treatment of ${p3.toLowerCase()}, by doing ${p4.toLowerCase()}.`);
    const opcionalIIText = capitalizeFirst(`through ${p5.toLowerCase()} I fall to ${p2.toLowerCase()}, but through ${p6.toLowerCase()} I rise to ${p3.toLowerCase()}.`);
    const opcionalIIIText = capitalizeFirst(`through ${p7.toLowerCase()} I fall to ${p1.toLowerCase()}, but through ${p8.toLowerCase()} I rise to ${p4.toLowerCase()}.`);

    return [
      {
        id: "6+8",
        title: "Rising Aphorism (Paths Integration)",
        formula: "Point 6 (Rise) + Point 8 (Rise)",
        text: aforismoPrincipalText
      },
      {
        id: "opcional-1",
        title: "Overcoming Crisis Aphorism (Optional I)",
        formula: "To avoid [Point 2] before [Point 1], I offer the treatment of [Point 3], by doing [Point 4]",
        text: opcionalIText
      },
      {
        id: "opcional-2",
        title: "Emotional Conflict Resolution (Optional II)",
        formula: "Through [Point 5] I fall to [Point 2], but through [Point 6] I rise to [Point 3]",
        text: opcionalIIText
      },
      {
        id: "opcional-3",
        title: "Active Rejection Transcendence (Optional III)",
        formula: "Through [Point 7] I fall to [Point 1], but through [Point 8] I rise to [Point 4]",
        text: opcionalIIIText
      }
    ];
  }
}
