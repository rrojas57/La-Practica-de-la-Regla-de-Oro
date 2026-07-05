import { AforismoOutput } from "../data/helpLists";
import { Copy, Check, Quote, Heart, Download, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface AforismosDisplayProps {
  aforismos: AforismoOutput[];
  onDownloadAll?: () => void;
  theme?: "light" | "dark";
  lang?: "es" | "en";
}

export default function AforismosDisplay({ aforismos, onDownloadAll, theme = "light", lang = "es" }: AforismosDisplayProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isDark = theme === "dark";

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8" id="aforismos-display-container">
      {/* Header section */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
        isDark ? "border-slate-800" : "border-slate-100"
      }`}>
        <div>
          <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            <Sparkles className="w-5 h-5 text-amber-500" />
            {lang === "es" ? "Tus Ideas Fuerza y Aforismos Generados" : "Your Force Ideas and Generated Aphorisms"}
          </h3>
          <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {lang === "es" ? "Fórmulas y sentencias lógicas construidas de forma simultánea a partir de tu reflexión." : "Formulas and logical statements built simultaneously from your reflection."}
          </p>
        </div>
        
        {onDownloadAll && (
          <button
            onClick={onDownloadAll}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition duration-150 cursor-pointer ${
              isDark 
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" 
                : "bg-slate-900 hover:bg-slate-800 text-white"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{lang === "es" ? "Descargar Todas" : "Download All"}</span>
          </button>
        )}
      </div>

      {/* Grid of Aforismos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aforismos.map((af, idx) => {
          const isCopied = copiedId === af.id;
          const isPrimary = af.id === "6+8";

          return (
            <motion.div
              key={af.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl border p-6 flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-300 ${
                isPrimary
                  ? isDark
                    ? "border-amber-900/60 bg-gradient-to-br from-amber-950/35 to-orange-950/20 ring-1 ring-amber-950"
                    : "border-amber-200 bg-gradient-to-br from-amber-50/60 to-orange-50/40 ring-1 ring-amber-100/60"
                  : isDark
                  ? "border-slate-800 bg-slate-900 hover:shadow-md"
                  : "border-slate-100 bg-white hover:shadow-md"
              }`}
            >
              {/* Card top banner/tag */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${
                    isPrimary 
                      ? isDark ? "bg-amber-900 text-amber-100" : "bg-amber-100 text-amber-900" 
                      : isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                  }`}>
                    {af.title}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {af.formula}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(af.text, af.id)}
                  title={lang === "es" ? "Copiar aforismo" : "Copy aphorism"}
                  className={`p-2 rounded-lg border transition duration-150 cursor-pointer ${
                    isCopied
                      ? isDark 
                        ? "bg-emerald-950/60 border-emerald-900 text-emerald-450" 
                        : "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : isDark
                      ? "bg-slate-800 border-slate-700 text-slate-450 hover:text-slate-250 hover:bg-slate-750"
                      : "bg-slate-50 border-slate-150 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Central text displaying the Aforismo */}
              <div className="my-3 flex gap-3 items-start relative">
                <Quote className={`w-8 h-8 shrink-0 rotate-180 ${
                  isPrimary 
                    ? isDark ? "text-amber-800/40" : "text-amber-200" 
                    : isDark ? "text-slate-800" : "text-slate-100"
                }`} />
                <p className={`font-bold tracking-tight text-base sm:text-lg leading-relaxed ${
                  isPrimary 
                    ? isDark ? "text-amber-100 font-extrabold" : "text-amber-950 font-extrabold"
                    : isDark ? "text-slate-200" : "text-slate-850"
                }`}>
                  {af.text}
                </p>
              </div>

              {/* Graphic bottom element */}
              <div className={`mt-4 pt-4 border-t flex items-center justify-between text-[10px] text-slate-400 ${
                isDark ? "border-slate-800" : "border-slate-100/60"
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
