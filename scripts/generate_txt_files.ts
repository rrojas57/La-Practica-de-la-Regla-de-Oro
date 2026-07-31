import { translations } from '../src/data/translations';
import fs from 'fs';
import path from 'path';

const langConfigs = [
  { code: 'fr', name: 'Francés', filename: 'textos_frances.txt' },
  { code: 'de', name: 'Alemán', filename: 'textos_aleman.txt' },
  { code: 'pt', name: 'Portugués', filename: 'textos_portugues.txt' }
];

const relaxationPhases = [
  {
    phase: 'Preparación',
    title: { fr: 'Préparation', de: 'Vorbereitung', pt: 'Preparação' },
    subtitle: { fr: 'Installez-vous dans une posture confortable', de: 'Machen Sie es sich bequem', pt: 'Acomode-se numa postura confortável' },
    text: {
      fr: 'Trouvez une position confortable, fermez doucement les yeux si vous le souhaitez et préparez-vous à libérer le bruit et la tension de la journée. Respirez lentement et profondément.',
      de: 'Finden Sie eine bequeme Position, schließen Sie sanft die Augen, wenn Sie möchten, und bereiten Sie sich darauf vor, den Lärm und die Spannungen des Tages loszulassen. Atmen Sie langsam und tief.',
      pt: 'Encontre uma posição confortável, feche suavemente os olhos se desejar e prepare-se para libertar o ruído e as tensões do dia. Respire lenta e profundamente.'
    }
  },
  {
    phase: '1. Relajación Externa',
    title: { fr: '1. Relaxation Externe', de: '1. Äußere Entspannung', pt: '1. Relaxamento Externo' },
    subtitle: { fr: 'Calmer le corps physique', de: 'Den physischen Körper beruhigen', pt: 'Aquietar o corpo físico' },
    text: {
      fr: 'Nous commençons par détendre les muscles du corps. Relâchez votre front, vos joues, vos mâchoires, votre langue et votre gorge. Laissez vos yeux devenir lourds. Sentez votre cou souple, vos épaules et vos bras tomber lourdement. Relâchez votre poitrine, votre abdomen, vos jambes et vos pieds. Sentez tout votre corps complètement relâché et en paix.',
      de: 'Wir beginnen mit der Entspannung der Körpermuskeln. Entspannen Sie Stirn, Wangen, Kiefer, Zunge und Rachen. Lassen Sie Ihre Augen schwer werden. Fühlen Sie den Nacken locker, Schultern und Arme schwer herabsinken. Entspannen Sie Brust, Bauch, Beine und Füße. Fühlen Sie Ihren ganzen Körper vollkommen locker und in Frieden.',
      pt: 'Começamos por relaxar os músculos do corpo. Relaxe a testa, as bochechas, as mandíbulas, a língua e a garganta. Deixe os olhos caírem pesados. Sinta o pescoço solto, os ombros e os braços a cair pesados. Relaxe o peito, o abdómen, as pernas e os pés. Sinta todo o seu corpo completamente solto e em paz.'
    }
  },
  {
    phase: '2. Relajación Interna',
    title: { fr: '2. Relaxation Interne', de: '2. Innere Entspannung', pt: '2. Relaxamento Interno' },
    subtitle: { fr: 'Calmer la poitrine et les organes', de: 'Brust und Organe beruhigen', pt: 'Aquietar o peito e os órgãos' },
    text: {
      fr: 'Maintenant, nous relâchons les tensions internes. Sentez l\'intérieur de votre poitrine, détendez vos poumons et calmez votre cœur. Sentez votre estomac et vos intestins, libérant tout nœud, tension ou crispation. Prenez conscience de votre intérieur doux, chaleureux et lumineux, comme un refuge de paix.',
      de: 'Jetzt entspannen wir die inneren Spannungen. Fühlen Sie Ihre Brust von innen, entspannen Sie Ihre Lungen und beruhigen Sie Ihr Herz. Fühlen Sie Ihren Magen und Darm und lösen Sie jeden Knoten, jede Spannung oder Verkrampfung. Nehmen Sie Ihr Inneres weich, warm und leuchtend wahr, wie einen Zufluchtsort des Friedens.',
      pt: 'Agora relaxamos as tensões internas. Sinta o peito por dentro, relaxe os pulmões e acalme o coração. Sinta o estômago e os intestinos, soltando qualquer nó, tensão ou contração. Registe o seu interior suave, caloroso e luminoso, como um refúgio de paz.'
    }
  },
  {
    phase: '3. Relajación Mental',
    title: { fr: '3. Relaxation Mentale', de: '3. Mentale Entspannung', pt: '3. Relaxamento Mental' },
    subtitle: { fr: 'Silence et paix mentale', de: 'Stille und geistiger Frieden', pt: 'Silêncio e paz mental' },
    text: {
      fr: 'Enfin, détendez votre esprit. Laissez passer les soucis et les pensées comme des nuages dans le vent. Ne vous arrêtez sur aucun d\'eux. Si une image apparaît, laissez-la partir doucement. Sentez votre esprit silencieux, vide et tranquille, comme un lac cristallin dans un calme absolu.',
      de: 'Schließlich entspannen Sie Ihren Geist. Lassen Sie Sorgen und Gedanken wie Wolken im Wind vorüberziehen. Verweilen Sie bei keinem von ihnen. Wenn ein Bild erscheint, lassen Sie es sanft gehen. Fühlen Sie Ihren Geist still, leer und friedlich, wie einen kristallklaren See in absoluter Windstille.',
      pt: 'Finalmente, relaxe a mente. Deixe passar as preocupações e pensamentos como nuvens ao vento. Não se detenha em nenhum deles. Si aparecer uma imagem, deixe-a ir suavemente. Sinta a mente silenciosa, vazia e tranquila, como um lago cristalino em absoluta calma.'
    }
  },
  {
    phase: 'Estado de Paz Listo',
    title: { fr: 'État de Paix Prêt', de: 'Friedlicher Zustand bereit', pt: 'Estado de Paz Pronto' },
    subtitle: { fr: 'Unité interne pour la pratique', de: 'Innere Einheit für die Praxis', pt: 'Unidade interna para a prática' },
    text: {
      fr: 'Vous avez atteint un état de calme, de silence et de cohérence. Vous êtes dans les meilleures dispositions pour commencer votre réflexion sur la Règle d\'Or. Quand vous le souhaitez, continuez vers l\'exercice.',
      de: 'Sie haben einen Zustand der Ruhe, Stille und Kohärenz erreicht. Sie sind bestens vorbereitet, um Ihre Reflexion über die Goldene Regel zu beginnen. Wenn Sie möchten, fahren Sie mit der Übung fort.',
      pt: 'Alcançou um estado de calma, silêncio e coerência. Está na melhor disposição para iniciar a sua reflexão sobre a Regra de Ouro. Quando desejar, continue para o exercício.'
    }
  }
];

const stepLabels = {
  1: { fr: '1. Type de maltraitance', de: '1. Art der Fehlbehandlung', pt: '1. Tipo de maltrato' },
  2: { fr: '2. Souffrance / Réaction', de: '2. Leiden / Reaktion', pt: '2. Sofrimento / Reação' },
  3: { fr: '3. Vertu guide', de: '3. Leitende Tugend', pt: '3. Virtude guia' },
  4: { fr: '4. Action solidaire', de: '4. Solidarische Aktion', pt: '4. Ação solidária' },
  5: { fr: '5. Sentiment de chute', de: '5. Gefühl des Absturzes', pt: '5. Sentimento de queda' },
  6: { fr: '6. Action de montée 1', de: '6. Aufsteigende Aktion 1', pt: '6. Ação de subida 1' },
  7: { fr: '7. Sentiment de chute', de: '7. Gefühl des Absturzes', pt: '7. Sentimento de queda' },
  8: { fr: '8. Action de montée 2', de: '8. Aufsteigende Aktion 2', pt: '8. Ação de subida 2' }
};

const relaxationPrompt = {
  fr: {
    text: "🧘 Souhaitez-vous calmer votre esprit avant de commencer ? Faites la relaxation guidée",
    btn: "Écouter →"
  },
  de: {
    text: "🧘 Möchten Sie Ihren Geist beruhigen, bevor Sie beginnen? Machen Sie die geführte Entspannung",
    btn: "Anhören →"
  },
  pt: {
    text: "🧘 Gostarias de acalmar a tua mente antes de começar? Faz a relaxamento guiada",
    btn: "Ouvir →"
  }
};

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

langConfigs.forEach(({ code, name, filename }) => {
  const dict = (translations as any)[code];
  let txt = `=====================================================================\n`;
  txt += `TRANSCRIPCIÓN COMPLETA DE TEXTOS DE LA APLICACIÓN - LA REGLA DE ORO\n`;
  txt += `IDIOMA: ${name.toUpperCase()} (${code.toUpperCase()})\n`;
  txt += `=====================================================================\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `1. NAVEGACIÓN Y MENÚ PRINCIPAL (HEADER & NAVIGATION)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[logoTitle] Título Principal: ${dict.logoTitle}\n`;
  txt += `[logoSubtitle] Subtítulo: ${dict.logoSubtitle}\n`;
  txt += `[tabIntro] Pestaña Introducción: ${dict.tabIntro}\n`;
  txt += `[tabPractice] Pestaña Práctica: ${dict.tabPractice}\n`;
  txt += `[tabHistory] Pestaña Historial: ${dict.tabHistory}\n`;
  txt += `[tabSupport] Pestaña Biblioteca y Enlaces: ${dict.tabSupport}\n`;
  txt += `[themeToggleDark] Botón Modo Oscuro: ${dict.themeToggleDark}\n`;
  txt += `[themeToggleLight] Botón Modo Claro: ${dict.themeToggleLight}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `2. NOTIFICACIONES / MENSAJES FLOTANTES (TOAST NOTIFICATIONS)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[toastThemeChanged] Tema cambiado: ${dict.toastThemeChanged}\n`;
  txt += `[toastFormReset] Formulario reiniciado: ${dict.toastFormReset}\n`;
  txt += `[toastPracticeSaved] Práctica guardada: ${dict.toastPracticeSaved}\n`;
  txt += `[toastPracticeLoaded] Práctica cargada: ${dict.toastPracticeLoaded}\n`;
  txt += `[toastPracticeDeleted] Práctica eliminada: ${dict.toastPracticeDeleted}\n`;
  txt += `[toastExampleLoaded] Ejemplo cargado: ${dict.toastExampleLoaded}\n`;
  txt += `[toastPracticeReady] Práctica lista: ${dict.toastPracticeReady}\n`;
  txt += `[toastFormCheck] Verificación de formulario: ${dict.toastFormCheck}\n`;
  txt += `[toastDownloadSuccess] Descarga exitosa: ${dict.toastDownloadSuccess}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `3. SECCIÓN DE INTRODUCCIÓN (INTRO SECTION)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[introTagline] Etiqueta: ${dict.introTagline}\n`;
  txt += `[introTitle] Título: ${dict.introTitle}\n`;
  txt += `[introSubtitle] Subtítulo: ${dict.introSubtitle}\n`;
  txt += `[introPrivacyTitle] Título Privacidad: ${dict.introPrivacyTitle}\n`;
  txt += `[introPrivacyText] Texto Privacidad: ${dict.introPrivacyText}\n`;
  txt += `[introPrincipleTitle] Título Principio de la Regla de Oro: ${dict.introPrincipleTitle}\n`;
  txt += `[introSiloQuote] Cita de Silo: ${dict.introSiloQuote}\n`;
  txt += `[introInspiration] Inspiración: ${dict.introInspiration}\n`;
  txt += `[introSiloAuthor] Autor: ${dict.introSiloAuthor}\n`;
  txt += `[introBenefitsTitle] Título Beneficios: ${dict.introBenefitsTitle}\n`;
  txt += `[introBenefits] Beneficios:\n` + dict.introBenefits.map((b: string) => `  - ${b}`).join('\n') + `\n`;
  txt += `[introPurposeTitle] Título Propósito: ${dict.introPurposeTitle}\n`;
  txt += `[introPurposes] Propósitos:\n` + dict.introPurposes.map((p: string) => `  - ${p}`).join('\n') + `\n`;
  txt += `[introExplanation] Explicación: ${dict.introExplanation}\n`;
  txt += `[introPurposesExtra] Texto extra propósito: ${dict.introPurposesExtra}\n`;
  txt += `[introBtnStart] Botón Comenzar: ${dict.introBtnStart}\n`;
  txt += `[introBtnExample] Botón Cargar Ejemplo: ${dict.introBtnExample}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `4. SECCIÓN DE PRÁCTICA Y CUESTIONARIO (PRACTICE SECTION)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[practiceTitleLabel] Etiqueta de Título de Práctica: ${dict.practiceTitleLabel}\n`;
  txt += `[practiceTitlePlaceholder] Placeholder de Título: ${dict.practiceTitlePlaceholder}\n`;
  txt += `[practiceProgressLabel] Etiqueta de Progreso: ${dict.practiceProgressLabel}\n`;
  txt += `[practiceCompletedCount] Contador de Completados: ${dict.practiceCompletedCount}\n`;
  txt += `[practicePrivacyTitle] Título Privacidad Práctica: ${dict.practicePrivacyTitle}\n`;
  txt += `[practicePrivacyText] Texto Privacidad Práctica: ${dict.practicePrivacyText}\n`;
  txt += `[practiceQuestionLabel] Etiqueta Pregunta: ${dict.practiceQuestionLabel}\n`;
  txt += `[practiceTypeLuminous] Tipo Espacio Luminoso: ${dict.practiceTypeLuminous}\n`;
  txt += `[practiceTypeDark] Tipo Espacio Perturbado: ${dict.practiceTypeDark}\n`;
  txt += `[practiceTypeTransition] Tipo Espacio Transición: ${dict.practiceTypeTransition}\n`;
  txt += `[practiceInputWordLabel] Etiqueta Entrada Palabra: ${dict.practiceInputWordLabel}\n`;
  txt += `[practiceBtnPrev] Botón Anterior: ${dict.practiceBtnPrev}\n`;
  txt += `[practiceBtnNext] Botón Siguiente: ${dict.practiceBtnNext}\n`;
  txt += `[practiceBtnLastPrompt] Botón Último Paso: ${dict.practiceBtnLastPrompt}\n`;
  txt += `[practiceHelpPrompt] Prompt de Ayuda: ${dict.practiceHelpPrompt}\n`;
  txt += `[practiceBtnHelp] Botón Mostrar Ayuda: ${dict.practiceBtnHelp}\n`;
  txt += `[practiceBtnHideHelp] Botón Ocultar Ayuda: ${dict.practiceBtnHideHelp}\n`;
  txt += `[practiceHelpSuffix] Sufijo de Ayuda: ${dict.practiceHelpSuffix}\n`;
  txt += `[practiceHelpOptional] Ayuda Opcional: ${dict.practiceHelpOptional}\n`;
  txt += `[practiceNotesLabel] Etiqueta Diario / Notas: ${dict.practiceNotesLabel}\n`;
  txt += `[practiceNotesPlaceholder] Placeholder Notas: ${dict.practiceNotesPlaceholder}\n`;
  txt += `[relaxationBannerText] Banner Invitación Relajación: ${(relaxationPrompt as any)[code].text}\n`;
  txt += `[relaxationBannerBtn] Botón Banner Relajación: ${(relaxationPrompt as any)[code].btn}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `5. VISTA PREVIA SIMULTÁNEA / IDEA FUERZA (SIMULTANEOUS PREVIEW)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[previewTitle] Título Vista Previa: ${dict.previewTitle}\n`;
  txt += `[previewMainTitle] Título Aforismo Principal: ${dict.previewMainTitle}\n`;
  txt += `[previewGoldenTitle] Título Fórmula de Superación: ${dict.previewGoldenTitle}\n`;
  txt += `[previewGoldenTemplate] Plantilla Fórmula: ${dict.previewGoldenTemplate}\n`;
  txt += `[previewHint] Pista / Indicación: ${dict.previewHint}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `6. BARRAS DE ACCIONES (WORKSPACE ACTIONS)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[actionTitle] Título Acciones: ${dict.actionTitle}\n`;
  txt += `[actionSubtitle] Subtítulo Acciones: ${dict.actionSubtitle}\n`;
  txt += `[actionBtnReset] Botón Reiniciar: ${dict.actionBtnReset}\n`;
  txt += `[actionBtnSave] Botón Guardar: ${dict.actionBtnSave}\n`;
  txt += `[actionResetConfirm] Confirmación de Reinicio: ${dict.actionResetConfirm}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `7. RESULTADOS Y AFORISMOS GENERADOS (RESULTS & APHORISMS)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[resultsCompletedTitle] Título Práctica Completada: ${dict.resultsCompletedTitle}\n`;
  txt += `[resultsCompletedSubtitle] Subtítulo Práctica Completada: ${dict.resultsCompletedSubtitle}\n`;
  txt += `[resultsBtnSaveHistory] Botón Guardar en Historial: ${dict.resultsBtnSaveHistory}\n`;
  txt += `[resultsSynthesisTitle] Título Síntesis: ${dict.resultsSynthesisTitle}\n`;
  txt += `[resultsSynthesisSubtitle] Subtítulo Síntesis: ${dict.resultsSynthesisSubtitle}\n`;
  txt += `[aforismosTitle] Título Aforismos: ${dict.aforismosTitle}\n`;
  txt += `[aforismosSubtitle] Subtítulo Aforismos: ${dict.aforismosSubtitle}\n`;
  txt += `[aforismosBtnDownload] Botón Descargar: ${dict.aforismosBtnDownload}\n`;
  txt += `[aforismosCopiedTitle] Título Copiado: ${dict.aforismosCopiedTitle}\n`;
  txt += `[aforismosCopiedMessage] Mensaje Copiado: ${dict.aforismosCopiedMessage}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `8. SECCIÓN HISTORIAL (HISTORY SECTION)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[historyTitle] Título Historial: ${dict.historyTitle}\n`;
  txt += `[historySubtitle] Subtítulo Historial: ${dict.historySubtitle}\n`;
  txt += `[historyEmptyTitle] Título Historial Vacío: ${dict.historyEmptyTitle}\n`;
  txt += `[historyEmptyText] Texto Historial Vacío: ${dict.historyEmptyText}\n`;
  txt += `[historyBtnStartNew] Botón Nueva Práctica: ${dict.historyBtnStartNew}\n`;
  txt += `[historyCardDate] Etiqueta Fecha: ${dict.historyCardDate}\n`;
  txt += `[historyBtnLoad] Botón Cargar Práctica: ${dict.historyBtnLoad}\n`;
  txt += `[historyBtnDelete] Botón Eliminar Práctica: ${dict.historyBtnDelete}\n`;
  txt += `[historyDeleteConfirm] Confirmación Eliminar: ${dict.historyDeleteConfirm}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `9. BIBLIOTECA, RECURSOS Y EJEMPLOS (SUPPORT & RESOURCES SECTION)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[supportTitle] Título Soporte: ${dict.supportTitle}\n`;
  txt += `[supportSubtitle] Subtítulo Soporte: ${dict.supportSubtitle}\n`;
  txt += `[supportTabExamples] Pestaña Ejemplos: ${dict.supportTabExamples}\n`;
  txt += `[supportTabGlossary] Pestaña Glosario: ${dict.supportTabGlossary}\n`;
  txt += `[supportTabResources] Pestaña Recursos: ${dict.supportTabResources}\n`;
  txt += `[supportTabMailbox] Pestaña Buzón: ${dict.supportTabMailbox}\n`;
  txt += `[supportExamplesTitle] Título Ejemplos: ${dict.supportExamplesTitle}\n`;
  txt += `[supportExamplesSubtitle] Subtítulo Ejemplos: ${dict.supportExamplesSubtitle}\n`;
  txt += `[supportExamplesBtnLoad] Botón Cargar Ejemplo: ${dict.supportExamplesBtnLoad}\n`;
  txt += `[supportExamplesAforismoLabel] Etiqueta Aforismo Ejemplo: ${dict.supportExamplesAforismoLabel}\n`;
  txt += `[supportExamplesCommentaryLabel] Etiqueta Comentario Ejemplo: ${dict.supportExamplesCommentaryLabel}\n`;
  txt += `[supportGlossarySearchPlaceholder] Buscar en Glosario: ${dict.supportGlossarySearchPlaceholder}\n`;
  txt += `[supportGlossaryEmpty] Glosario Vacío: ${dict.supportGlossaryEmpty}\n`;
  txt += `[supportResourcesTitle] Título Recursos: ${dict.supportResourcesTitle}\n`;
  txt += `[supportResourcesSubtitle] Subtítulo Recursos: ${dict.supportResourcesSubtitle}\n`;
  txt += `[supportResourcesAuthor] Etiqueta Autor: ${dict.supportResourcesAuthor}\n`;
  txt += `[supportResourcesPublisher] Etiqueta Editorial: ${dict.supportResourcesPublisher}\n`;
  txt += `[supportResourcesYear] Etiqueta Año: ${dict.supportResourcesYear}\n`;
  txt += `Tipos de Recursos:\n`;
  txt += `  - Libro: ${dict.supportResourcesTypeBook}\n`;
  txt += `  - Conferencia: ${dict.supportResourcesTypeConference}\n`;
  txt += `  - Discurso: ${dict.supportResourcesTypeSpeech}\n`;
  txt += `  - Manual: ${dict.supportResourcesTypeManual}\n`;
  txt += `  - Vídeo: ${dict.supportResourcesTypeVideo}\n`;
  txt += `  - PDF: ${dict.supportResourcesTypePdf}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `10. BUZÓN DE MENSAJES (MAILBOX)\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[supportMailboxTitle] Título Buzón: ${dict.supportMailboxTitle}\n`;
  txt += `[supportMailboxSubtitle] Subtítulo Buzón: ${dict.supportMailboxSubtitle}\n`;
  txt += `[supportMailboxPrivateCheckTitle] Checkbox Privacidad Título: ${dict.supportMailboxPrivateCheckTitle}\n`;
  txt += `[supportMailboxPrivateCheckText] Checkbox Privacidad Texto: ${dict.supportMailboxPrivateCheckText}\n`;
  txt += `[supportMailboxLabelCategory] Etiqueta Categoría: ${dict.supportMailboxLabelCategory}\n`;
  txt += `Categorías:\n`;
  txt += `  - Opinión: ${dict.supportMailboxCategoryOpinion}\n`;
  txt += `  - Error: ${dict.supportMailboxCategoryError}\n`;
  txt += `  - Pregunta: ${dict.supportMailboxCategoryQuestion}\n`;
  txt += `  - Otro: ${dict.supportMailboxCategoryOther}\n`;
  txt += `[supportMailboxLabelMessage] Etiqueta Mensaje: ${dict.supportMailboxLabelMessage}\n`;
  txt += `[supportMailboxPlaceholderMessage] Placeholder Mensaje: ${dict.supportMailboxPlaceholderMessage}\n`;
  txt += `[supportMailboxBtnSend] Botón Enviar: ${dict.supportMailboxBtnSend}\n`;
  txt += `[supportMailboxBtnSending] Botón Enviando: ${dict.supportMailboxBtnSending}\n`;
  txt += `[supportMailboxSuccessTitle] Título Éxito Envío: ${dict.supportMailboxSuccessTitle}\n`;
  txt += `[supportMailboxSuccessText] Texto Éxito Envío: ${dict.supportMailboxSuccessText}\n`;
  txt += `[supportMailboxBtnSendAnother] Botón Enviar Otro: ${dict.supportMailboxBtnSendAnother}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `11. ENCABEZADOS Y PIE DE PÁGINA EN DESCARGA TXT / PDF\n`;
  txt += `---------------------------------------------------------------------\n`;
  txt += `[downloadHeader] Encabezado: ${dict.downloadHeader}\n`;
  txt += `[downloadPracticeTitle] Título Práctica: ${dict.downloadPracticeTitle}\n`;
  txt += `[downloadDate] Fecha: ${dict.downloadDate}\n`;
  txt += `[downloadResponsesHeader] Sección Respuestas: ${dict.downloadResponsesHeader}\n`;
  txt += `[downloadAforismosHeader] Sección Aforismos: ${dict.downloadAforismosHeader}\n`;
  txt += `[downloadNotesHeader] Sección Notas: ${dict.downloadNotesHeader}\n`;
  txt += `[downloadNotesEmpty] Notas Vacías: ${dict.downloadNotesEmpty}\n`;
  txt += `[downloadFooterQuote] Cita de Cierre: ${dict.downloadFooterQuote}\n\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `12. ETIQUETAS DE LOS 8 PASOS EN AFORISMOS (STEP LABELS 1-8)\n`;
  txt += `---------------------------------------------------------------------\n`;
  for (let i = 1; i <= 8; i++) {
    txt += `Paso ${i}: ${(stepLabels as any)[i][code]}\n`;
  }
  txt += `\n`;

  txt += `---------------------------------------------------------------------\n`;
  txt += `13. GUION Y TEXTOS DE RELAJACIÓN GUIADA (RELAXATION PLAYER)\n`;
  txt += `---------------------------------------------------------------------\n`;
  relaxationPhases.forEach((p, idx) => {
    txt += `--- Fase ${idx + 1}: ${(p.title as any)[code]} ---\n`;
    txt += `Subtítulo: ${(p.subtitle as any)[code]}\n`;
    txt += `Texto: ${(p.text as any)[code]}\n\n`;
  });

  fs.writeFileSync(filename, txt, 'utf8');
  fs.writeFileSync(path.join(publicDir, filename), txt, 'utf8');
  console.log('Fichero creado exitosamente:', filename);
});
