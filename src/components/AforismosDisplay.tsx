import { AforismoOutput } from "../data/helpLists";
import { Copy, Check, Quote, Heart, Download, Sparkles, Pencil, RotateCcw, Info, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AforismosDisplayProps {
  aforismos: AforismoOutput[];
  rawAnswers: Record<number, string>;
  onUpdateAforismo: (id: string, text: string) => void;
  onResetAforismo: (id: string) => void;
  customAforismos: Record<string, string>;
  onDownloadAll?: () => void;
  theme?: "light" | "dark";
  lang?: "es" | "en";
}

export default function AforismosDisplay({
  aforismos,
  rawAnswers,
  onUpdateAforismo,
  onResetAforismo,
  customAforismos,
  onDownloadAll,
  theme = "light",
  lang = "es"
}: AforismosDisplayProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showFormulaHelper, setShowFormulaHelper] = useState<boolean>(true);
  
  const isDark = theme === "dark";

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Human-friendly titles for the 8 steps to help the user substitute
  const stepLabels: Record<number, { es: string, en: string, color: string }> = {
    1: { es: "1. Forma de Maltrato", en: "1. Type of Mistreatment", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
    2: { es: "2. Sufrimiento / Reacción", en: "2. Suffering / Reaction", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
    3: { es: "3. Virtud Guía", en: "3. Guide Virtue", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    4: { es: "4. Acción Solidaria", en: "4. Solidary Action", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    5: { es: "5. Sentimiento de Caída", en: "5. Falling Feeling", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
    6: { es: "6. Acción de Subida 1", en: "6. Rising Action 1", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    7: { es: "7. Sentimiento de Caída", en: "7. Falling Feeling", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
    8: { es: "8. Acción de Subida 2", en: "8. Rising Action 2", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  };

  return (
    <div className="space-y-8" id="aforismos-display-container">
      
      {/* Header section */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
        isDark ? "border-slate-800" : "border-slate-100"
      }`}>
        <div className="space-y-2 max-w-3xl">
          <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            {lang === "es" ? "Personalizador de Aforismos" : "Aphorism Customizer"}
          </h3>
          <p className={`text-sm font-medium leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            {lang === "es" 
              ? "Revisa la fórmula, consulta tus respuestas de referencia y edita y construye el texto de cada uno para que sea el adecuado para ti."
              : "Review the formula, consult your reference answers, and customize and build the text of each one so it is right for you."}
          </p>
          <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {lang === "es" 
              ? "Y recuerda que los aforismos son frases o sentencias breves que funcionan como ideas fuerza o una declaración de las acciones que queremos poner en marcha para superar la contradicción o el sufrimiento trabajados en el ejercicio."
              : "And remember that aphorisms are short sentences or phrases that function as core driving ideas or a declaration of the actions we want to implement to overcome the contradiction or suffering addressed in the exercise."}
          </p>
        </div>
        
        {onDownloadAll && (
          <button
            onClick={onDownloadAll}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition duration-150 cursor-pointer ${
              isDark 
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" 
                : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{lang === "es" ? "Descargar Todo" : "Download All"}</span>
          </button>
        )}
      </div>

      {/* FORMULA REFERENCE HELPER PANEL */}
      <div className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
        isDark ? "bg-slate-900/60 border-slate-800/80" : "bg-slate-50/50 border-slate-200/60"
      }`}>
        <button
          onClick={() => setShowFormulaHelper(!showFormulaHelper)}
          className={`w-full px-5 py-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider cursor-pointer ${
            isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-950"
          }`}
        >
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500" />
            {lang === "es" ? "Consultar tus Respuestas de Referencia (Puntos 1 al 8)" : "Consult your Reference Answers (Points 1 to 8)"}
          </span>
          {showFormulaHelper ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence initial={false}>
          {showFormulaHelper && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`border-t px-5 pb-5 pt-4 ${
                isDark ? "border-slate-800" : "border-slate-150/50"
              }`}
            >
              <p className={`text-xs mb-4 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {lang === "es" 
                  ? "Sustituye mentalmente cada número de la fórmula por las respuestas que pusiste en el cuestionario. Utiliza estos valores para pulir la redacción final a tu gusto:"
                  : "Mentally replace each number in the formula with the answers you filled in the questionnaire. Use these values to polish the final wording as you wish:"}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                  const label = stepLabels[num][lang];
                  const colorClass = stepLabels[num].color;
                  const value = rawAnswers[num] || (lang === "es" ? "(Vacío)" : "(Empty)");
                  
                  return (
                    <div 
                      key={num} 
                      className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                        isDark ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-150/60"
                      }`}
                    >
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border w-fit ${colorClass} mb-1.5`}>
                        {label}
                      </span>
                      <p className={`font-semibold line-clamp-2 ${isDark ? "text-slate-200" : "text-slate-850"}`}>
                        "{value}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid of Aforismos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aforismos.map((af, idx) => {
          const isCopied = copiedId === af.id;
          const isPrimary = af.id === "6+8";
          const isEdited = customAforismos[af.id] !== undefined;
          const isCurrentlyEditing = editingId === af.id;
          const currentText = customAforismos[af.id] !== undefined ? customAforismos[af.id] : af.text;

          return (
            <motion.div
              key={af.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative rounded-2xl border p-6 flex flex-col justify-between overflow-hidden shadow-xs transition-all duration-300 ${
                isPrimary
                  ? isDark
                    ? "border-amber-900/60 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/15 ring-1 ring-amber-950"
                    : "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/30 ring-1 ring-amber-100/60"
                  : isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-100 bg-white"
              }`}
            >
              <div>
                {/* Card top banner/tag */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${
                        isPrimary 
                          ? isDark ? "bg-amber-900 text-amber-100" : "bg-amber-100 text-amber-900" 
                          : isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                      }`}>
                        {af.title}
                      </span>
                      {isEdited && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-0.5`}>
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{lang === "es" ? "Pulido" : "Polished"}</span>
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] font-mono ${isDark ? "text-slate-450" : "text-slate-500"}`}>
                      {lang === "es" ? "Pauta:" : "Pattern:"} {af.formula}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Edit button */}
                    <button
                      onClick={() => setEditingId(isCurrentlyEditing ? null : af.id)}
                      title={lang === "es" ? "Editar redacción del aforismo" : "Edit aphorism text"}
                      className={`p-2 rounded-lg border transition duration-150 cursor-pointer ${
                        isCurrentlyEditing
                          ? "bg-amber-500 border-amber-500 text-slate-950 hover:bg-amber-600"
                          : isDark
                          ? "bg-slate-800 border-slate-700 text-slate-350 hover:text-white hover:bg-slate-750"
                          : "bg-slate-50 border-slate-150 text-slate-650 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(currentText, af.id)}
                      title={lang === "es" ? "Copiar aforismo" : "Copy aphorism"}
                      className={`p-2 rounded-lg border transition duration-150 cursor-pointer ${
                        isCopied
                          ? isDark 
                            ? "bg-emerald-950/60 border-emerald-900 text-emerald-400" 
                            : "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : isDark
                          ? "bg-slate-800 border-slate-700 text-slate-350 hover:text-white hover:bg-slate-750"
                          : "bg-slate-50 border-slate-150 text-slate-650 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Central text displaying/editing the Aforismo */}
                <div className="my-4">
                  {isCurrentlyEditing ? (
                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        value={currentText}
                        onChange={(e) => onUpdateAforismo(af.id, e.target.value)}
                        className={`w-full px-3 py-2 text-sm font-semibold rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 leading-relaxed transition-colors duration-150 ${
                          isDark 
                            ? "bg-slate-950/60 text-slate-100 border-slate-805 focus:border-amber-500" 
                            : "bg-slate-50 text-slate-850 border-slate-205 focus:border-amber-500"
                        }`}
                        placeholder={lang === "es" ? "Escribe tu redacción personalizada aquí..." : "Write your customized wording here..."}
                      />
                      
                      <div className="flex items-center justify-between gap-3">
                        <p className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                          {lang === "es" ? "Escribe con tus propias palabras respetando el sentido profundo de la fórmula." : "Write in your own words, respecting the formula's deep meaning."}
                        </p>
                        
                        <div className="flex gap-2 shrink-0">
                          {isEdited && (
                            <button
                              onClick={() => {
                                onResetAforismo(af.id);
                                setEditingId(null);
                              }}
                              className={`px-2.5 py-1.5 border rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                                isDark
                                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750 hover:text-white"
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                              }`}
                              title={lang === "es" ? "Restaurar sugerencia automática" : "Restore automatic suggestion"}
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>{lang === "es" ? "Deshacer" : "Revert"}</span>
                            </button>
                          )}
                          <button
                            onClick={() => setEditingId(null)}
                            className={`px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-[10px] font-extrabold transition flex items-center gap-1 cursor-pointer shadow-xs`}
                          >
                            <Check className="w-3 h-3" />
                            <span>{lang === "es" ? "Listo" : "Done"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setEditingId(af.id)}
                      className={`flex gap-3 items-start relative cursor-pointer group p-2.5 -m-2.5 rounded-xl transition ${
                        isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50/50"
                      }`}
                      title={lang === "es" ? "Hacer clic para editar texto" : "Click to edit text"}
                    >
                      <Quote className={`w-8 h-8 shrink-0 rotate-180 transition-colors duration-200 ${
                        isPrimary 
                          ? isDark ? "text-amber-800/30 group-hover:text-amber-600/50" : "text-amber-200 group-hover:text-amber-300" 
                          : isDark ? "text-slate-800 group-hover:text-slate-700" : "text-slate-100 group-hover:text-slate-200"
                      }`} />
                      <div className="space-y-1 w-full">
                        <p className={`font-bold tracking-tight text-base sm:text-lg leading-relaxed ${
                          isPrimary 
                            ? isDark ? "text-amber-100 font-extrabold" : "text-amber-950 font-extrabold"
                            : isDark ? "text-slate-200" : "text-slate-850"
                        }`}>
                          {currentText}
                        </p>
                        <span className={`text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1 ${
                          isPrimary ? "text-amber-550" : "text-slate-400"
                        }`}>
                          <Pencil className="w-2.5 h-2.5" />
                          <span>{lang === "es" ? "Clic para editar e integrar tu estilo" : "Click to edit and integrate your style"}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Graphic bottom element */}
              <div className={`mt-4 pt-4 border-t flex items-center justify-between text-[10px] text-slate-400 ${
                isDark ? "border-slate-805" : "border-slate-100/60"
              }`}>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>{lang === "es" ? "La Regla de Oro" : "The Golden Rule"}</span>
                </span>
                <span>{lang === "es" ? "Reflexión Activa" : "Active Reflection"}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
