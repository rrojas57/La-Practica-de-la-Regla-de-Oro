import { useState, useEffect } from "react";
import { STEPS, generateAforismos, INTRODUCTION_TEXT } from "./data/helpLists";
import { translations, STEPS_EN, generateAforismosTranslated } from "./data/translations";
import IntroSection from "./components/IntroSection";
import InteractiveMap from "./components/InteractiveMap";
import HelpWordsPanel from "./components/HelpWordsPanel";
import AforismosDisplay from "./components/AforismosDisplay";
import HistorySection, { SavedPractice } from "./components/HistorySection";
import SupportSection from "./components/SupportSection";
import {
  Sparkles,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Save,
  RotateCcw,
  BookOpenCheck,
  Award,
  ChevronRight,
  ClipboardList,
  Heart,
  FileText,
  BookmarkCheck,
  Sun,
  Moon,
  ShieldCheck,
  Lock,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Initial answers structure
const EMPTY_ANSWERS: Record<number, string> = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: ""
};

// Standard resolved example data (from third image example)
const EXAMPLE_ANSWERS: Record<number, string> = {
  1: "Excluyentes",
  2: "Sufro y me alejo aislándome",
  3: "Consideración e inclusión",
  4: "Me acerco y aprecio a los demás",
  5: "Inseguridad",
  6: "Expreso lo que siento y pienso",
  7: "Hartazgo",
  8: "Conecto con lo Humano en mí y en otros"
};

const EXAMPLE_ANSWERS_EN: Record<number, string> = {
  1: "Excluding",
  2: "I suffer and distance myself, isolating myself",
  3: "Consideration and inclusion",
  4: "I approach and appreciate others",
  5: "Insecurity",
  6: "I express what I feel and think",
  7: "Burnout",
  8: "I connect with the Human in me and in others"
};

export default function App() {
  // Language selection: 'es' | 'en' (Defaults to Spanish always on first load)
  const [lang, setLang] = useState<"es" | "en">("es");
  const t = translations[lang];
  const stepsList = lang === "es" ? STEPS : STEPS_EN;

  // Navigation tabs: 'intro' | 'practice' | 'history' | 'support'
  const [activeTab, setActiveTab] = useState<"intro" | "practice" | "history" | "support">("intro");
  
  // Questionnaire states
  const [answers, setAnswers] = useState<Record<number, string>>(EMPTY_ANSWERS);
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");
  const [practiceTitle, setPracticeTitle] = useState<string>("");
  
  // Show optional help panel state
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Reset showHelp state whenever the step changes to encourage reflection first
  useEffect(() => {
    setShowHelp(false);
  }, [currentStepId]);
  
  // History state
  const [savedPractices, setSavedPractices] = useState<SavedPractice[]>([]);
  
  // Alerts or toast messages
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("regla_de_oro_theme");
    return (savedTheme === "dark" || savedTheme === "light") ? savedTheme : "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("regla_de_oro_theme", newTheme);
    showToast(`${t.toastThemeChanged}${newTheme === "light" ? (lang === "es" ? "Claro" : "Light") : (lang === "es" ? "Oscuro" : "Dark")}`);
  };

  // Load history on mount
  useEffect(() => {
    const rawHistory = localStorage.getItem("regla_de_oro_practicas");
    if (rawHistory) {
      try {
        setSavedPractices(JSON.parse(rawHistory));
      } catch (e) {
        console.error("Error loading practices history:", e);
      }
    }
  }, []);

  // Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentStep = stepsList.find((s) => s.id === currentStepId)!;

  // Answers list calculation
  const totalSteps = stepsList.length;
  const answeredCount = Object.values(answers).filter(
    (val): val is string => typeof val === "string" && val.trim() !== ""
  ).length;
  const progressPercent = Math.round((answeredCount / totalSteps) * 100);
  const isPracticeReady = answeredCount === totalSteps;

  // Handle single word input change
  const handleInputChange = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepId]: val
    }));
  };

  // Click on word suggestion
  const handleSelectWord = (word: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepId]: word
    }));
    // Auto-advance is pleasant but let's keep it manual so they can read and feel confident
  };

  // Navigating steps
  const handleNextStep = () => {
    if (currentStepId < totalSteps) {
      setCurrentStepId(currentStepId + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepId > 1) {
      setCurrentStepId(currentStepId - 1);
    }
  };

  // Reset current form
  const handleResetForm = () => {
    if (confirm(t.actionResetConfirm)) {
      setAnswers(EMPTY_ANSWERS);
      setCurrentStepId(1);
      setNotes("");
      setPracticeTitle("");
      showToast(t.toastFormReset);
    }
  };

  // Save current practice to history
  const handleSavePractice = () => {
    if (!answers[1] || !answers[2]) {
      showToast(t.toastFormCheck);
      return;
    }

    const title = practiceTitle.trim() !== "" 
      ? practiceTitle.trim() 
      : lang === "es" ? `Superar el rechazo de "${answers[1] || "..."}"` : `Overcoming the rejection of "${answers[1] || "..."}"`;

    const newPractice: SavedPractice = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      title,
      answers,
      notes: notes.trim()
    };

    const updated = [newPractice, ...savedPractices];
    setSavedPractices(updated);
    localStorage.setItem("regla_de_oro_practicas", JSON.stringify(updated));
    showToast(t.toastPracticeSaved);
  };

  // Load a saved practice back into workspace
  const handleLoadPractice = (practice: SavedPractice) => {
    setAnswers(practice.answers);
    setCurrentStepId(1);
    setNotes(practice.notes || "");
    setPracticeTitle(practice.title);
    setActiveTab("practice");
    showToast(`${t.toastPracticeLoaded}"${practice.title}"`);
  };

  // Delete a practice from history
  const handleDeletePractice = (id: string) => {
    const updated = savedPractices.filter((p) => p.id !== id);
    setSavedPractices(updated);
    localStorage.setItem("regla_de_oro_practicas", JSON.stringify(updated));
    showToast(t.toastPracticeDeleted);
  };

  // Load example values
  const handleLoadExample = () => {
    setAnswers(lang === "es" ? EXAMPLE_ANSWERS : EXAMPLE_ANSWERS_EN);
    setCurrentStepId(1);
    setNotes(lang === "es" 
      ? "Este es el ejemplo clásico de aplicación de la Regla de Oro, abordando la violencia externa del trato excluyente mediante la consideración e inclusión, superando el sufrimiento defensivo y la desconfianza por medio de la comunicación honesta."
      : "This is the classic example of applying the Golden Rule, addressing the external violence of excluding treatment through consideration and inclusion, overcoming defensive suffering and distrust through honest communication.");
    setPracticeTitle(lang === "es" ? "Ejemplo - Superación del Trato Excluyente" : "Example - Overcoming Excluding Treatment");
    setActiveTab("practice");
    showToast(t.toastExampleLoaded);
  };

  // Load custom example answers from SupportSection
  const handleLoadExampleAnswers = (exampleAnswers: Record<number, string>, title: string) => {
    setAnswers(exampleAnswers);
    setCurrentStepId(1);
    setNotes(lang === "es" 
      ? `Este es el ejercicio de reflexión cargado desde los ejemplos de apoyo de la aplicación: "${title}". Úsalo como inspiración para tu propio trabajo.`
      : `This is the reflection exercise loaded from the application's support examples: "${title}". Use it as inspiration for your own work.`);
    setPracticeTitle(title);
    setActiveTab("practice");
    showToast(t.toastPracticeReady);
  };

  // Start new empty practice
  const handleStartNewPractice = () => {
    setAnswers(EMPTY_ANSWERS);
    setCurrentStepId(1);
    setNotes("");
    setPracticeTitle("");
    setActiveTab("practice");
  };

  // Download all aforismos as a text file
  const handleDownloadAll = () => {
    const aforismos = generateAforismosTranslated(answers, lang);
    const textContent = `
=========================================
${t.downloadHeader}
=========================================
${t.downloadPracticeTitle}${practiceTitle || (lang === "es" ? "Mi reflexión" : "My reflection")}
${t.downloadDate}${new Date().toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}

${t.downloadResponsesHeader}
1. ${stepsList[0].shortName}: "${answers[1] || "___"}"
2. ${stepsList[1].shortName}: "${answers[2] || "___"}"
3. ${stepsList[2].shortName}: "${answers[3] || "___"}"
4. ${stepsList[3].shortName}: "${answers[4] || "___"}"
5. ${stepsList[4].shortName}: "${answers[5] || "___"}"
6. ${stepsList[5].shortName}: "${answers[6] || "___"}"
7. ${stepsList[6].shortName}: "${answers[7] || "___"}"
8. ${stepsList[7].shortName}: "${answers[8] || "___"}"

${t.downloadAforismosHeader}
-----------------------------------------
${aforismos.map(af => `${af.title.toUpperCase()}\n${af.text}\n-----------------------------------------`).join("\n\n")}

${t.downloadNotesHeader}
${notes || t.downloadNotesEmpty}

=========================================
${t.downloadFooterQuote}
=========================================
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${lang === "es" ? "Regla_de_Oro" : "Golden_Rule"}_${practiceTitle.replace(/\s+/g, "_") || "reflexion"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(t.toastDownloadSuccess);
  };

  // Generate the active aforismos list
  const currentAforismos = generateAforismosTranslated(answers, lang);

  // Simultaneous preview in-progress (Aforismo 6+8 & Opcional 1 preview)
  const renderSimultaneousPreview = () => {
    const p1 = answers[1] ? answers[1].toUpperCase() : "___";
    const p2 = answers[2] ? answers[2].toUpperCase() : "___";
    const p3 = answers[3] ? answers[3].toUpperCase() : "___";
    const p4 = answers[4] ? answers[4].toUpperCase() : "___";
    const p6 = answers[6] ? answers[6].toUpperCase() : "___";
    const p8 = answers[8] ? answers[8].toUpperCase() : "___";

    const isDark = theme === "dark";

    return (
      <div className={`rounded-2xl p-5 border space-y-4 transition-colors duration-200 ${
        isDark ? "bg-amber-950/10 border-amber-900/30 text-slate-200" : "bg-amber-50/70 border-amber-200/50"
      }`} id="simultaneous-preview">
        <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${
          isDark ? "text-amber-400" : "text-amber-900"
        }`}>
          <Award className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{t.previewTitle}</span>
        </div>
        
        <div className="space-y-3">
          {/* Main rising formula preview */}
          <div className={`p-3 rounded-xl border shadow-xs transition-colors duration-200 ${
            isDark ? "bg-slate-900 border-amber-950/50" : "bg-white border-amber-100"
          }`}>
            <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">
              {t.previewMainTitle}
            </span>
            <p className={`text-sm font-bold mt-1 italic ${
              isDark ? "text-amber-300" : "text-amber-950"
            }`}>
              "{p6}, {p8.startsWith("BY ") || p8.startsWith("POR ") || p8 === "___" ? p8 : (lang === "es" ? "POR " : "BY ") + p8}."
            </p>
          </div>

          {/* Golden aforismo preview */}
          <div className={`p-3 rounded-xl border shadow-xs transition-colors duration-200 ${
            isDark ? "bg-slate-900 border-amber-950/50" : "bg-white border-amber-100"
          }`}>
            <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">
              {t.previewGoldenTitle}
            </span>
            <p className={`text-xs font-semibold mt-1 ${
              isDark ? "text-amber-400/90" : "text-amber-900/90"
            }`}>
              {lang === "es" ? (
                <>
                  Para evitar <span className="underline">{p2.toLowerCase()}</span> ante <span className="underline">{p1.toLowerCase()}</span>, doy el trato de <span className="underline">{p3.toLowerCase()}</span>, haciendo <span className="underline">{p4.toLowerCase()}</span>.
                </>
              ) : (
                <>
                  To avoid <span className="underline">{p2.toLowerCase()}</span> before <span className="underline">{p1.toLowerCase()}</span>, I offer the treatment of <span className="underline">{p3.toLowerCase()}</span>, by doing <span className="underline">{p4.toLowerCase()}</span>.
                </>
              )}
            </p>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-450 italic">
          {t.previewHint}
        </p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`} id="app-root">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-slate-100 px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800 text-sm font-medium"
            id="toast-notification"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Header */}
      <header className={`sticky top-0 z-40 shadow-xs border-b transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"
      }`} id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab("intro")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/10 group-hover:scale-105 transition duration-200">
              <Heart className="w-5 h-5 fill-amber-100 text-amber-100 shrink-0" />
            </div>
            <div>
              <span className={`font-display font-bold tracking-tight text-base sm:text-lg block leading-none ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                {t.logoTitle}
              </span>
              <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-0.5 block leading-none">
                {t.logoSubtitle}
              </span>
            </div>
          </div>

          {/* Navigation tabs & Theme toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className={`flex gap-1 p-1 rounded-xl border transition-colors ${
              theme === "dark" ? "bg-slate-900/80 border-slate-800" : "bg-slate-100/80 border-slate-200/50"
            }`}>
              <button
                onClick={() => setActiveTab("intro")}
                id="tab-btn-intro"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  activeTab === "intro"
                    ? theme === "dark" ? "bg-slate-800 text-white shadow-xs" : "bg-white text-slate-900 shadow-xs"
                    : theme === "dark" ? "text-slate-400 hover:text-slate-250" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.tabIntro}</span>
              </button>
              <button
                onClick={() => setActiveTab("practice")}
                id="tab-btn-practice"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  activeTab === "practice"
                    ? theme === "dark" ? "bg-slate-800 text-white shadow-xs" : "bg-white text-slate-900 shadow-xs"
                    : theme === "dark" ? "text-slate-400 hover:text-slate-250" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.tabPractice}</span>
                {answeredCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                    {answeredCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                id="tab-btn-history"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  activeTab === "history"
                    ? theme === "dark" ? "bg-slate-800 text-white shadow-xs" : "bg-white text-slate-900 shadow-xs"
                    : theme === "dark" ? "text-slate-400 hover:text-slate-250" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.tabHistory}</span>
                {savedPractices.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    theme === "dark" ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-700"
                  }`}>
                    {savedPractices.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("support")}
                id="tab-btn-support"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  activeTab === "support"
                    ? theme === "dark" ? "bg-slate-800 text-white shadow-xs" : "bg-white text-slate-900 shadow-xs"
                    : theme === "dark" ? "text-slate-400 hover:text-slate-250" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.tabSupport}</span>
              </button>
            </nav>

            {/* Language Selector */}
            <button
              onClick={() => {
                const nextLang = lang === "es" ? "en" : "es";
                setLang(nextLang);
                showToast(nextLang === "es" ? "Idioma cambiado a Español" : "Language switched to English");
              }}
              id="language-switcher-btn"
              className={`px-2 sm:px-2.5 py-2 text-xs font-extrabold rounded-xl border transition cursor-pointer flex items-center gap-1 uppercase tracking-wider ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-850 hover:text-amber-300"
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
              }`}
              title={lang === "es" ? "Change to English" : "Cambiar a Español"}
            >
              <span>{lang === "es" ? "ES" : "EN"}</span>
            </button>

            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              id="theme-switcher-btn"
              className={`p-2 sm:p-2.5 rounded-xl border transition cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-850 hover:text-amber-300"
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
              }`}
              title={theme === "light" ? t.themeToggleDark : t.themeToggleLight}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INTRO SECTION */}
          {activeTab === "intro" && (
            <motion.div
              key="intro-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <IntroSection 
                onStart={handleStartNewPractice}
                onLoadExample={handleLoadExample}
                theme={theme}
                lang={lang}
              />
            </motion.div>
          )}

          {/* TAB 2: ACTIVE PRACTICE WORKSPACE */}
          {activeTab === "practice" && (
            <motion.div
              key="practice-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-10"
            >
              {/* Top progress metadata bar */}
              <div className={`rounded-2xl border p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-200 ${
                theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
              }`}>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                      {t.practiceTitleLabel}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  </div>
                  <input
                    type="text"
                    placeholder={t.practiceTitlePlaceholder}
                    value={practiceTitle}
                    onChange={(e) => setPracticeTitle(e.target.value)}
                    id="input-practice-title"
                    className={`text-base sm:text-lg font-bold bg-transparent border-b border-dashed w-full max-w-xl pb-1 focus:outline-none transition-colors ${
                      theme === "dark" 
                        ? "text-slate-100 border-slate-700 hover:border-slate-500 focus:border-amber-500" 
                        : "text-slate-800 border-slate-200 hover:border-slate-400 focus:border-amber-500"
                    }`}
                  />
                </div>

                {/* Progress badge */}
                <div className="flex items-center gap-4">
                  <div className="text-right space-y-1">
                    <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{t.practiceProgressLabel}</span>
                    <p className={`text-sm font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{answeredCount} {lang === "es" ? "de" : "of"} {totalSteps}{t.practiceCompletedCount}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center relative transition-colors ${
                    theme === "dark" ? "border-slate-800 bg-slate-850" : "border-slate-100 bg-slate-50"
                  }`}>
                    <div className="text-xs font-extrabold text-amber-500">{progressPercent}%</div>
                  </div>
                </div>
              </div>

              {/* Privacy Warning Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors duration-200 ${
                theme === "dark" 
                  ? "bg-emerald-950/15 border-emerald-900/40 text-slate-300" 
                  : "bg-emerald-50/60 border-emerald-100 text-slate-700"
              }`}>
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    theme === "dark" ? "text-emerald-400" : "text-emerald-800"
                  }`}>
                    {t.practicePrivacyTitle}
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    {t.practicePrivacyText}
                  </p>
                </div>
              </div>

              {/* Core visual layout splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Step Questionnaire and help cards (Span 5 on desktop) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Step Card Question */}
                  <div className={`rounded-2xl border p-6 shadow-sm space-y-5 relative overflow-hidden transition-colors ${
                    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                  }`} id="wizard-container">
                    
                    {/* Background visual highlight */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                      currentStep.type === 'luminous' 
                        ? 'bg-amber-500' 
                        : currentStep.type === 'dark' 
                        ? 'bg-indigo-600' 
                        : currentStep.direction === 'up'
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    }`} />

                    {/* Step tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                        {t.practiceQuestionLabel} {currentStepId} {lang === "es" ? "de" : "of"} {totalSteps}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentStep.type === 'luminous'
                          ? theme === "dark" ? 'bg-amber-950/80 text-amber-300 border border-amber-900/40' : 'bg-amber-100 text-amber-800'
                          : currentStep.type === 'dark'
                          ? theme === "dark" ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-900/40' : 'bg-indigo-100 text-indigo-950'
                          : theme === "dark" ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {currentStep.type === 'luminous' ? t.practiceTypeLuminous : currentStep.type === 'dark' ? t.practiceTypeDark : t.practiceTypeTransition}
                      </span>
                    </div>

                    {/* Prominent Question */}
                    <div className="space-y-2">
                      <h3 className={`text-lg sm:text-xl font-bold font-display leading-snug ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}>
                        {currentStep.question}
                      </h3>
                      <p className={`text-xs sm:text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}>
                        {currentStep.description}
                      </p>
                    </div>

                    {/* Word Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        {t.practiceInputWordLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={currentStep.placeholder}
                        value={answers[currentStepId] || ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                        id={`input-step-${currentStepId}`}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/10 ${
                          theme === "dark" 
                            ? "bg-slate-800 hover:bg-slate-750 focus:bg-slate-800 text-slate-100 border-slate-750 focus:border-amber-500" 
                            : "bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-slate-800 border-slate-200 focus:border-amber-500"
                        }`}
                      />
                    </div>

                    {/* Wizard Nav buttons */}
                    <div className={`flex items-center justify-between pt-2 border-t ${
                      theme === "dark" ? "border-slate-800" : "border-slate-150/50"
                    }`}>
                      <button
                        onClick={handlePrevStep}
                        disabled={currentStepId === 1}
                        className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                          theme === "dark" 
                            ? "bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-750 hover:text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{t.practiceBtnPrev}</span>
                      </button>

                      {currentStepId < totalSteps ? (
                        <button
                          onClick={handleNextStep}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            theme === "dark" 
                              ? "bg-slate-100 text-slate-900 hover:bg-white" 
                              : "bg-slate-900 text-white hover:bg-slate-800"
                          }`}
                        >
                          <span>{t.practiceBtnNext}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                          {t.practiceBtnLastPrompt}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Suggestions Help panel (Optional) */}
                  {!showHelp ? (
                    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors duration-200 ${
                      theme === "dark" 
                        ? "bg-slate-900/60 border-slate-800 text-slate-300" 
                        : "bg-slate-50 border-slate-200/60 text-slate-700"
                    }`}>
                      <p className="text-xs font-medium leading-relaxed">
                        {t.practiceHelpPrompt}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowHelp(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                          theme === "dark"
                            ? "bg-amber-600/25 text-amber-300 border border-amber-900/40 hover:bg-amber-600/40"
                            : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {t.practiceBtnHelp}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <HelpWordsPanel
                        categories={currentStep.categories}
                        helpDescription={currentStep.helpDescription}
                        onSelectWord={handleSelectWord}
                        selectedWord={answers[currentStepId]}
                        theme={theme}
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowHelp(false)}
                          className={`text-[11px] font-bold underline transition cursor-pointer ${
                            theme === "dark" ? "text-slate-400 hover:text-slate-250" : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          {t.practiceBtnHideHelp}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Simultaneous Construction Preview */}
                  {renderSimultaneousPreview()}

                </div>

                {/* Right side: Interactive Map (Span 7 on desktop) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className={`rounded-2xl border p-6 shadow-sm transition-colors duration-200 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                  }`}>
                    <InteractiveMap
                      answers={answers}
                      currentStepId={currentStepId}
                      onSelectStep={(id) => setCurrentStepId(id)}
                      theme={theme}
                      lang={lang}
                    />
                  </div>

                  {/* Notes / Journaling pad */}
                  <div className={`rounded-2xl border p-6 shadow-xs space-y-3 transition-colors duration-200 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                  }`}>
                    <h4 className={`font-bold text-sm flex items-center gap-1.5 ${
                      theme === "dark" ? "text-slate-100" : "text-slate-800"
                    }`}>
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>{lang === "es" ? "Tus notas o diario de la reflexión (Opcional):" : "Your notes or reflection journal (Optional):"}</span>
                    </h4>
                    <textarea
                      rows={3}
                      placeholder={lang === "es" ? "Usa este espacio para detallar más la situación externa, escribir sobre los cambios corporales que experimentas o documentar tus compromisos..." : "Use this space to elaborate on the external situation, write down physical changes you feel, or document your commitments..."}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none transition duration-150 focus:ring-2 focus:ring-amber-500/10 ${
                        theme === "dark" 
                          ? "bg-slate-800 text-slate-100 border-slate-750 focus:border-amber-500 focus:bg-slate-800" 
                          : "bg-slate-50 text-slate-700 border-slate-200 focus:border-amber-500 focus:bg-white"
                      }`}
                    />
                  </div>

                  {/* Workspace Actions Panel */}
                  <div className={`rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md transition-colors duration-200 ${
                    theme === "dark" ? "bg-slate-900 border border-slate-800 text-white" : "bg-slate-900 text-white"
                  }`}>
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-bold text-sm text-amber-400 flex items-center justify-center sm:justify-start gap-1">
                        <Save className="w-4 h-4" />
                        <span>{t.practiceSaveSessionTitle}</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        {t.practiceSaveSessionDesc}
                      </p>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        onClick={handleResetForm}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-755 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t.practiceBtnReset}</span>
                      </button>
                      <button
                        onClick={handleSavePractice}
                        className="flex-1 sm:flex-none px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>{t.practiceBtnSave}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Dynamic Final synthesis if completed */}
              <div className={`pt-8 border-t transition-colors duration-200 ${
                theme === "dark" ? "border-slate-850" : "border-slate-200/60"
              }`}>
                <AnimatePresence>
                  {isPracticeReady ? (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                      id="results-panel"
                    >
                      <div className={`rounded-2xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-200 ${
                        theme === "dark" ? "bg-emerald-950/20 border-emerald-900/40" : "bg-emerald-50 border-emerald-100"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md">
                            <BookOpenCheck className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={`font-bold text-base sm:text-lg ${
                              theme === "dark" ? "text-emerald-300" : "text-slate-900"
                            }`}>
                              {t.practiceCompleteTitle}
                            </h3>
                            <p className={`text-xs sm:text-sm ${
                              theme === "dark" ? "text-emerald-400" : "text-slate-600"
                            }`}>
                              {t.practiceCompleteDesc}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={handleSavePractice}
                          className={`px-6 py-3 rounded-xl text-xs font-bold transition duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                            theme === "dark" 
                              ? "bg-slate-800 hover:bg-slate-755 text-slate-100 border border-slate-700" 
                              : "bg-slate-900 hover:bg-slate-800 text-white"
                          }`}
                        >
                          <Save className="w-4 h-4 text-emerald-400" />
                          <span>{t.practiceBtnSaveHistory}</span>
                        </button>
                      </div>

                      <AforismosDisplay
                        aforismos={currentAforismos}
                        onDownloadAll={handleDownloadAll}
                        theme={theme}
                        lang={lang}
                      />
                    </motion.div>
                  ) : (
                    <div className={`rounded-2xl border p-8 text-center max-w-lg mx-auto space-y-4 transition-colors duration-200 ${
                      theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                    }`}>
                      <ClipboardList className={`w-10 h-10 mx-auto ${
                        theme === "dark" ? "text-slate-600" : "text-slate-300"
                      }`} />
                      <div className="space-y-1">
                        <h4 className={`font-bold text-sm ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{t.practiceSynthesisOnWayTitle}</h4>
                        <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          {lang === "es" ? `Responde las ${totalSteps} preguntas del cuestionario para generar el conjunto de aforismos interactivos y de superación personal. Actualmente llevas ${answeredCount} de ${totalSteps}.` : `Answer all ${totalSteps} questions of the questionnaire to generate your set of interactive self-improvement aphorisms. Currently you have answered ${answeredCount} of ${totalSteps}.`}
                        </p>
                      </div>
                      
                      {/* Interactive map prompt buttons */}
                      <div className="flex justify-center gap-1.5 flex-wrap pt-2">
                        {stepsList.map(s => {
                          const answered = !!answers[s.id];
                          return (
                            <button
                              key={s.id}
                              onClick={() => setCurrentStepId(s.id)}
                              className={`w-7 h-7 rounded-full text-xs font-bold border transition duration-150 cursor-pointer ${
                                currentStepId === s.id
                                  ? "bg-amber-600 text-white border-amber-600"
                                  : answered
                                  ? theme === "dark" ? "bg-emerald-950/40 text-emerald-300 border-emerald-900/30" : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : theme === "dark" ? "bg-slate-800 text-slate-400 border-slate-750 hover:bg-slate-750" : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {s.id}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* TAB 3: SAVED REFLECTIONS HISTORY */}
          {activeTab === "history" && (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <HistorySection
                practices={savedPractices}
                onSelectPractice={handleLoadPractice}
                onDeletePractice={handleDeletePractice}
                onStartNew={handleStartNewPractice}
                theme={theme}
                lang={lang}
              />
            </motion.div>
          )}

          {/* TAB 4: SUPPORT MATERIALS & ANONYMOUS MAILBOX */}
          {activeTab === "support" && (
            <motion.div
              key="support-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <SupportSection
                theme={theme}
                onLoadExampleAnswers={handleLoadExampleAnswers}
                showToast={showToast}
                lang={lang}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Decorative Warm Footer */}
      <footer className={`border-t mt-16 py-8 text-xs text-center transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-100 text-slate-500"
      }`} id="app-footer">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className={`font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{lang === "es" ? "\"La Práctica de la Regla de Oro\"" : "\"The Golden Rule Practice\""}</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            {lang === "es" ? "Una herramienta basada en la metodología de la no violencia activa para promover la coherencia personal, la paz mental y la reconciliación humana." : "A tool based on the methodology of active nonviolence to promote personal coherence, mental peace, and human reconciliation."}
          </p>
          <div className={`text-[10px] pt-2 border-t flex flex-wrap justify-center gap-4 ${
            theme === "dark" ? "border-slate-900 text-slate-500" : "border-slate-100/60 text-slate-400"
          }`}>
            <span>© {new Date().getFullYear()} - {lang === "es" ? "Basado en la Escuela de Silo" : "Based on Silo's School"}</span>
            <span>•</span>
            <span>{lang === "es" ? "Guardado local privado (Sin base de datos)" : "Private local storage (No database required)"}</span>
            <span>•</span>
            <span>{lang === "es" ? "Desarrollado con amor y respeto" : "Developed with love and respect"}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
