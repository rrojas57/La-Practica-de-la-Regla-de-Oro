import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Download, Sparkles, Image as ImageIcon, Check, Loader2, Info, Copy, ExternalLink } from "lucide-react";
import { AforismoOutput } from "../data/helpLists";

interface SiloSchemaTableProps {
  answers: Record<number, string>;
  aforismos: AforismoOutput[];
  customAforismos: Record<string, string>;
  theme?: "light" | "dark";
  lang?: "es" | "en" | "fr" | "de" | "pt";
}

export default function SiloSchemaTable({
  answers,
  aforismos,
  customAforismos,
  theme = "light",
  lang = "es"
}: SiloSchemaTableProps) {
  const isDark = theme === "dark";
  const tableRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Retrieve individual answers or defaults
  const getAns = (num: number) => {
    if (answers[num] && answers[num].trim() !== "") return answers[num];
    if (lang === "fr") return "(En attente de réponse)";
    if (lang === "de") return "(Ausstehende Antwort)";
    if (lang === "pt") return "(Pendente de resposta)";
    if (lang === "en") return "(Pending response)";
    return "(Pendiente de responder)";
  };

  // Get active aforismo text (original or customized)
  const getAfText = (id: string) => {
    if (customAforismos[id] !== undefined) {
      return customAforismos[id];
    }
    const af = aforismos.find(a => a.id === id);
    return af ? af.text : "";
  };

  // Formatted strings for optional aforismos
  const af_6_8 = getAfText("6+8");
  const af_opt_1 = getAfText("opcional-1");
  const af_opt_2 = getAfText("opcional-2");
  const af_opt_3 = getAfText("opcional-3");

  // Handle PNG image generation and download using html2canvas
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyTextSuccess, setCopyTextSuccess] = useState(false);
  const [isCaptureFailed, setIsCaptureFailed] = useState(false);
  const [modalTab, setModalTab] = useState<"image" | "text">("image");

  const handleCopyImageToClipboard = async () => {
    if (!capturedImageUrl) return;
    try {
      const response = await fetch(capturedImageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error("Failed to copy image: ", err);
      // Fallback: alert/message (handled by state visually)
    }
  };

  const getFormattedTextWorksheet = () => {
    return `==================================================
${lang === "es" ? "FICHA DE TRABAJO: LA REGLA DE ORO" : "WORKSHEET: THE GOLDEN RULE"}
${lang === "es" ? "Basado en la Escuela de Silo" : "Based on Silo's School"}
==================================================

${lang === "es" ? "I. CONCIENCIA DE SÍ, INSPIRADA E INTENCIONADA" : "I. SELF-CONSCIOUSNESS, INSPIRED AND INTENTIONAL"}
--------------------------------------------------
3. ¿Cómo pido que me trate? (Virtud opuesta a 1 y ese trato doy):
   "${getAns(3)}"

4. ¿Cómo lo hago? (Con la Virtud opuesta a 2):
   "${getAns(4)}"

${lang === "es" ? "II. TRANSICIONES Y NIVELES" : "II. TRANSITIONS AND LEVELS"}
--------------------------------------------------
5. ¿Cómo caigo de nivel 3 a 2? (Sentimiento de caída):
   "${getAns(5)}"

6. ¿Cómo subo de nivel 2 a 3? (Acción de subida):
   "${getAns(6)}"

7. ¿Cómo caigo de nivel 4 a 1? (Sentimiento de caída):
   "${getAns(7)}"

8. ¿Cómo subo de nivel 1 a 4? (Acción de subida):
   "${getAns(8)}"

${lang === "es" ? "III. CONCIENCIA PERTURBADA, COMPULSIVA, MECÁNICA" : "III. PERTURBED, COMPULSIVE, MECHANICAL AND COMPENSATORY"}
--------------------------------------------------
2. ¿Cómo me siento y qué hago frente a 1? (Sufrimiento/Reacción):
   "${getAns(2)}"

1. ¿Qué maltrato rechazo? (Forma de maltrato):
   "${getAns(1)}"

--------------------------------------------------
${lang === "es" ? "IV. PEDIDOS O AFORISMOS" : "IV. REQUESTS OR APHORISMS"}
--------------------------------------------------
* ${lang === "es" ? "AFORISMO PRINCIPAL (6+8):" : "PRINCIPAL APHORISM (6+8):"}
  "${af_6_8}"

* ${lang === "es" ? "OPCIONAL I (Superación de Crisis):" : "OPTIONAL I (Overcoming Crisis):"}
  "${af_opt_1}"

* ${lang === "es" ? "OPCIONAL II (Resolución Conflicto):" : "OPTIONAL II (Conflict Resolution):"}
  "${af_opt_2}"

* ${lang === "es" ? "OPCIONAL III (Trascendencia del Rechazo):" : "OPTIONAL III (Rejection Transcendence):"}
  "${af_opt_3}"

==================================================
${lang === "es" ? "Generado el" : "Generated on"}: ${new Date().toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}
`;
  };

  const handleCopyTextWorksheet = () => {
    const text = getFormattedTextWorksheet();
    navigator.clipboard.writeText(text).then(() => {
      setCopyTextSuccess(true);
      setTimeout(() => setCopyTextSuccess(false), 3000);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
      // Fallback using legacy selection if navigator.clipboard is blocked
      const el = document.getElementById("fallback-textarea") as HTMLTextAreaElement;
      if (el) {
        try {
          el.select();
          document.execCommand("copy");
          setCopyTextSuccess(true);
          setTimeout(() => setCopyTextSuccess(false), 3000);
        } catch (copyErr) {
          console.error("ExecCommand fallback failed:", copyErr);
        }
      }
    });
  };

  const handleDownloadImage = async () => {
    if (!tableRef.current) return;
    setIsCapturing(true);
    setIsCaptureFailed(false);
    setModalTab("image"); // reset to image view by default on download attempt

    try {
      // Small delay to ensure render is settled
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Capture options for high-quality scaling
      const canvas = await html2canvas(tableRef.current, {
        scale: 2, // 2x resolution for super crisp text
        useCORS: true,
        backgroundColor: isDark ? "#020617" : "#ffffff", // solid dark/light background
        logging: false,
      });

      // Convert canvas to image url for modal backup display
      const imgUrl = canvas.toDataURL("image/png");
      setCapturedImageUrl(imgUrl);
      setShowModal(true);

      // Programmatic trigger download using Blob (much more robust in sandboxed iframes)
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `ficha_regla_de_oro_2026.png`;
        link.href = url;
        
        // Append to DOM to satisfy browser requirements in restricted iframes
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleanup
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);
      }, "image/png");

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error("Error generating image with html2canvas:", e);
      setIsCaptureFailed(true);
      setModalTab("text"); // switch directly to copyable text tab since image failed
      // Open the modal anyway so the user can copy the text format and read instruction guides!
      setShowModal(true);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="space-y-6" id="silo-schema-section">
      
      {/* Visual Header / Actions bar */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 ${
        isDark ? "border-slate-800" : "border-slate-100"
      }`}>
        <div className="space-y-1">
          <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            <ImageIcon className="w-4 h-4 text-amber-500" />
            {lang === "es" ? "Ficha Resumen Oficial de la Práctica (Formato Descargable)" : "Official Practice Worksheet (Downloadable Format)"}
          </h3>
          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {lang === "es" 
              ? "Este esquema organiza visualmente la conciencia según la Escuela de Silo. Úsalo para repasar la coherencia del ejercicio."
              : "This schema visually organizes consciousness according to Silo's School. Use it to check the coherence of your exercise."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* Action 1: Text Copy (Sandbox-safe & instant) */}
          <button
            onClick={handleCopyTextWorksheet}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-sm border ${
              copyTextSuccess
                ? "bg-emerald-600 border-emerald-600 text-white"
                : isDark
                ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
            }`}
          >
            {copyTextSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>{lang === "es" ? "¡Ficha Copiada!" : "Worksheet Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{lang === "es" ? "Copiar Ficha como Texto" : "Copy Worksheet as Text"}</span>
              </>
            )}
          </button>

          {/* Action 2: Image Generation */}
          <button
            onClick={handleDownloadImage}
            disabled={isCapturing}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-sm ${
              isCapturing
                ? "bg-slate-400 text-white cursor-not-allowed"
                : downloadSuccess
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : isDark
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-slate-950"
            }`}
          >
            {isCapturing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{lang === "es" ? "Generando Imagen..." : "Generating Image..."}</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>{lang === "es" ? "¡Descargada!" : "Downloaded!"}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{lang === "es" ? "Descargar Ficha en Imagen (PNG)" : "Download PNG Worksheet"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DESCRIPTIVE HELP PANEL / INSTRUCTION GUIDE */}
      <div className={`p-5 rounded-2xl border text-xs leading-relaxed transition-all ${
        isDark 
          ? "bg-slate-900/40 border-slate-800 text-slate-300" 
          : "bg-amber-500/5 border-amber-500/10 text-slate-700"
      }`}>
        <div className="flex gap-2.5 items-start">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className={`font-bold text-sm ${isDark ? "text-amber-400" : "text-amber-900"}`}>
              {lang === "es" ? "💡 Guía para Guardar y Exportar tu Ficha" : "💡 Guidelines to Save and Export your Worksheet"}
            </h4>
            <p>
              {lang === "es"
                ? "Tienes varias alternativas infalibles para guardar tu Ficha de Trabajo con tus 3 aforismos opcionales ya integrados, incluso si estás en un entorno de pruebas o dispositivo móvil:"
                : "You have several foolproof alternatives to save your Worksheet with your 3 customized optional aphorisms already integrated, even inside testing sandbox environments or mobile devices:"}
            </p>
            <ul className="list-disc pl-4 space-y-1.5 font-medium">
              <li>
                <strong>{lang === "es" ? "1. Descarga Automática:" : "1. Automatic Download:"}</strong>{" "}
                {lang === "es" 
                  ? "Haz clic en el botón superior 'Descargar Ficha en Imagen (PNG)' para intentar guardarla de forma directa."
                  : "Click the top button 'Download PNG Worksheet' to attempt a direct file download."}
              </li>
              <li>
                <strong>{lang === "es" ? "2. Panel de Alternativas y Guardado Manual (Recomendado):" : "2. Alternative Methods & Manual Save (Recommended):"}</strong>{" "}
                {lang === "es"
                  ? "Al hacer clic en el botón superior de descarga, también se abrirá automáticamente un panel emergente seguro. Desde allí podrás:"
                  : "Clicking the top download button will also automatically open a secure pop-up. From there you can:"}
                <div className="pl-4 mt-1 space-y-1 text-[11px] opacity-90">
                  • <strong>{lang === "es" ? "Abrir en Nueva Pestaña:" : "Open in New Tab:"}</strong> {lang === "es" ? "Visualiza la imagen a tamaño completo fuera del visor de la app para guardarla con el navegador de forma nativa." : "View the image full screen outside the app's iframe sandbox to save it with your browser natively."}
                  <br />
                  • <strong>{lang === "es" ? "Copiar al Portapapeles:" : "Copy to Clipboard:"}</strong> {lang === "es" ? "Copia la imagen al instante para pegarla directamente en WhatsApp, Telegram, correo electrónico o Word." : "Copy the image instantly to paste it directly into WhatsApp, Telegram, email, or Word."}
                  <br />
                  • <strong>{lang === "es" ? "Guardar con Clic Derecho:" : "Save with Right-Click:"}</strong> {lang === "es" ? "Haz clic derecho directamente sobre la vista previa de la imagen generada en el modal y elige 'Guardar imagen como...'." : "Right-click directly over the generated image preview inside the modal and choose 'Save image as...'."}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SCHEMA WORKSPACE (The element captured by html2canvas) */}
      <div className="overflow-x-auto pb-4">
        <div 
          ref={tableRef}
          style={{ width: "960px" }} // Fixed width to ensure optimal, proportional canvas resolution
          className={`p-6 border rounded-2xl mx-auto shadow-md ${
            isDark 
              ? "bg-slate-950 border-slate-800 text-slate-100" 
              : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          {/* Main Title Metadata in the captured card */}
          <div className="flex justify-between items-center border-b pb-4 mb-4 border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-black tracking-tight uppercase text-amber-500">
                {lang === "es" ? "Ficha de Trabajo • La Regla de Oro" : "Worksheet • The Golden Rule"}
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">
                {lang === "es" ? "Basado en la Escuela de Silo" : "Based on Silo's School"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                {lang === "es" ? "Método No Violencia Activa" : "Active Nonviolence Method"}
              </span>
            </div>
          </div>

          {/* TWO COLUMN GRID TABLE STRUCTURE MATCHING THE USER ATTACHMENT */}
          <div className="grid grid-cols-12 border-2 border-slate-900 dark:border-slate-700">
            
            {/* COLUMN 1 (SPAN 8): CONCIENCIA DE SÍ & PERTURBADA GRID */}
            <div className="col-span-8 flex flex-col border-r-2 border-slate-900 dark:border-slate-700">
              
              {/* TOP HEADER LEFT: CONCIENCIA DE SÍ, INSPIRADA E INTENCIONADA */}
              <div className="bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-900 dark:border-slate-700 py-2.5 px-3 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                  {lang === "es" ? "CONCIENCIA DE SÍ, INSPIRADA E INTENCIONADA" : "SELF-CONSCIOUSNESS, INSPIRED AND INTENTIONAL"}
                </span>
              </div>

              {/* ROW 1: Points 3 and 4 */}
              <div className="grid grid-cols-2 border-b-2 border-slate-900 dark:border-slate-700 min-h-[140px]">
                {/* Point 3 */}
                <div className="p-4 border-r-2 border-slate-900 dark:border-slate-700 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-600 block">
                      {lang === "es" 
                        ? "3 ¿Qué trato pido recibir?: con la Virtud opuesta a 1 y ese trato doy." 
                        : "3 What treatment do I ask to receive?: with the opposite Virtue to 1 and that treatment I give."}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block italic">
                      {lang === "es"
                        ? "¿Cómo doy ese trato? (Paso a la acción: describe cómo vas a dar tú este mismo trato a los demás)"
                        : "How do I give that treatment? (Action step)"}
                    </span>
                  </div>
                  <p className="text-sm font-bold italic text-indigo-600 dark:text-amber-300 leading-relaxed pt-2">
                    "{getAns(3)}"
                  </p>
                </div>

                {/* Point 4 */}
                <div className="p-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-600 block">
                      {lang === "es" 
                        ? "4 ¿Cómo lo hago? (Buen trato elegido opuesto a 2)." 
                        : "4 How do I do it? (Chosen good treatment opposite to 2)."}
                    </span>
                  </div>
                  <p className="text-sm font-bold italic text-indigo-600 dark:text-amber-300 leading-relaxed pt-2">
                    "{getAns(4)}"
                  </p>
                </div>
              </div>

              {/* ROW 2: Middle Transitions (Points 5, 6, X Spacer, 7, 8) */}
              <div className="grid grid-cols-11 border-b-2 border-slate-900 dark:border-slate-700 min-h-[140px]">
                
                {/* Point 5 (Span 2) */}
                <div className="col-span-2 p-3 border-r-2 border-slate-900 dark:border-slate-700 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-rose-500 block leading-tight">
                    {lang === "es" ? "5 ¿Cómo caigo de nivel 3 a 2?" : "5 How do I fall from level 3 to 2?"}
                  </span>
                  <p className="text-xs font-bold italic text-slate-800 dark:text-slate-200 leading-normal pt-1.5 line-clamp-4">
                    {getAns(5)}
                  </p>
                </div>

                {/* Point 6 (Span 3) */}
                <div className="col-span-3 p-3 border-r-2 border-slate-900 dark:border-slate-700 flex flex-col justify-between bg-emerald-500/5">
                  <span className="text-[9px] font-black uppercase text-emerald-600 block leading-tight">
                    {lang === "es" ? "6 ¿Cómo subo de nivel 2 a 3?" : "6 How do I rise from level 2 to 3?"}
                  </span>
                  <p className="text-xs font-bold italic text-indigo-600 dark:text-amber-300 leading-normal pt-1.5 line-clamp-4">
                    {getAns(6)}
                  </p>
                </div>

                {/* DOUBLE LINE / CROSS "X" SPACER (Span 1) */}
                <div className="col-span-1 border-r-2 border-slate-900 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 relative">
                  <svg className="w-full h-full absolute inset-0 text-slate-400 dark:text-slate-600 opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="10" y1="10" x2="90" y2="90" stroke={isDark ? "#475569" : "#94a3b8"} strokeWidth="2.5" />
                    <line x1="90" y1="10" x2="10" y2="90" stroke={isDark ? "#475569" : "#94a3b8"} strokeWidth="2.5" />
                  </svg>
                  <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-950 px-0.5 z-10 select-none">
                    X
                  </span>
                </div>

                {/* Point 7 (Span 2) */}
                <div className="col-span-2 p-3 border-r-2 border-slate-900 dark:border-slate-700 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-rose-500 block leading-tight">
                    {lang === "es" ? "7 ¿Cómo caigo del buen trato elegido (4) al maltrato (1)?" : "7 How do I fall from chosen good treatment (4) to 1?"}
                  </span>
                  <p className="text-xs font-bold italic text-slate-800 dark:text-slate-200 leading-normal pt-1.5 line-clamp-4">
                    {getAns(7)}
                  </p>
                </div>

                {/* Point 8 (Span 3) */}
                <div className="col-span-3 p-3 flex flex-col justify-between bg-emerald-500/5">
                  <span className="text-[9px] font-black uppercase text-emerald-600 block leading-tight">
                    {lang === "es" ? "8 ¿Cómo subo de la actitud de rechazo/maltrato (1) al buen trato elegido (4)?" : "8 How do I rise from rejection (1) to chosen good treatment (4)?"}
                  </span>
                  <p className="text-xs font-bold italic text-indigo-600 dark:text-amber-300 leading-normal pt-1.5 line-clamp-4">
                    {getAns(8)}
                  </p>
                </div>

              </div>

              {/* ROW 3: Points 2 and 1 */}
              <div className="grid grid-cols-2 min-h-[140px]">
                {/* Point 2 */}
                <div className="p-4 border-r-2 border-slate-900 dark:border-slate-700 flex flex-col justify-between bg-slate-900/5 dark:bg-slate-900/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 block">
                      {lang === "es" 
                        ? "2 ¿Cómo me siento y qué hago frente a 1?" 
                        : "2 How do I feel and what do I do about 1?"}
                    </span>
                  </div>
                  <p className="text-sm font-bold italic text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                    "{getAns(2)}"
                  </p>
                </div>

                {/* Point 1 */}
                <div className="p-4 flex flex-col justify-between bg-slate-900/5 dark:bg-slate-900/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 block">
                      {lang === "es" 
                        ? "1 ¿Qué maltrato rechazo?" 
                        : "1 What mistreatment do I reject?"}
                    </span>
                  </div>
                  <p className="text-sm font-bold italic text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                    "{getAns(1)}"
                  </p>
                </div>
              </div>

              {/* BOTTOM FOOTER LEFT: CONCIENCIA PERTURBADA, COMPULSIVA, MECÁNICA Y COMPENSATORIA */}
              <div className="bg-slate-100 dark:bg-slate-900 border-t-2 border-slate-900 dark:border-slate-700 py-2.5 px-3 text-center mt-auto">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                  {lang === "es" ? "CONCIENCIA PERTURBADA, COMPULSIVA, MECÁNICA Y COMPENSATORIA" : "PERTURBED, COMPULSIVE, MECHANICAL AND COMPENSATORY CONSCIOUSNESS"}
                </span>
              </div>

            </div>

            {/* COLUMN 2 (SPAN 4): PEDIDOS O AFORISMOS */}
            <div className="col-span-4 flex flex-col bg-slate-100 dark:bg-slate-900 border-l-2 border-slate-900 dark:border-slate-700">
              
              {/* TOP HEADER RIGHT: PEDIDOS O AFORISMOS */}
              <div className="bg-slate-250 dark:bg-slate-800 border-b-2 border-slate-900 dark:border-slate-700 py-2.5 px-3 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-amber-400 block">
                  {lang === "es" ? "PEDIDOS O AFORISMOS" : "REQUESTS OR APHORISMS"}
                </span>
              </div>

              {/* 4 Rows of Aforismos */}
              <div className="flex-1 flex flex-col justify-between divide-y-2 divide-slate-900 dark:divide-slate-700">
                
                {/* Row 1: Aforismo 6+8 */}
                <div className="p-3.5 flex-1 flex flex-col justify-center bg-amber-500/10 dark:bg-amber-950/40">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400 block mb-1.5">
                    {lang === "es" ? "Aforismo Principal 6+8" : "Principal Aphorism 6+8"}
                  </span>
                  <p className="text-xs font-bold text-amber-950 dark:text-amber-200 leading-relaxed">
                    {af_6_8}
                  </p>
                </div>

                {/* Row 2: Opcional I */}
                <div className="p-3.5 flex-1 flex flex-col justify-center bg-slate-50 dark:bg-slate-900">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 block mb-1.5 leading-tight">
                    {lang === "es" ? "Opcional I: Para evitar 2 ante 1, doy el trato de 3, haciendo 4" : "Optional I: To avoid 2 before 1, I offer 3 doing 4"}
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {af_opt_1}
                  </p>
                </div>

                {/* Row 3: Opcional II */}
                <div className="p-3.5 flex-1 flex flex-col justify-center bg-slate-50 dark:bg-slate-900">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 block mb-1.5 leading-tight">
                    {lang === "es" ? "Opcional II: Por 5 caigo a 2, pero por 6 subo a 3" : "Optional II: Through 5 I fall to 2, but through 6 I rise to 3"}
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {af_opt_2}
                  </p>
                </div>

                {/* Row 4: Opcional III */}
                <div className="p-3.5 flex-1 flex flex-col justify-center bg-slate-50 dark:bg-slate-900">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 block mb-1.5 leading-tight">
                    {lang === "es" ? "Opcional III: Por 7 caigo a 1 pero por 8 subo a 4" : "Optional III: Through 7 I fall to 1 but through 8 I rise to 4"}
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {af_opt_3}
                  </p>
                </div>

              </div>

              {/* BOTTOM FOOTER RIGHT: PEDIDOS O AFORISMOS */}
              <div className="bg-slate-250 dark:bg-slate-800 border-t-2 border-slate-900 dark:border-slate-700 py-2.5 px-3 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-amber-400 block">
                  {lang === "es" ? "PEDIDOS O AFORISMOS" : "REQUESTS OR APHORISMS"}
                </span>
              </div>

            </div>

          </div>

          {/* Footer citation inside the image itself */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-150 dark:border-slate-850 text-[9px] text-slate-400 dark:text-slate-500">
            <span>{lang === "es" ? "© 2026 - Ejercicio de Reflexión y Reconciliación" : "© 2026 - Reflection & Reconciliation Exercise"}</span>
            <span>{lang === "es" ? "Desarrollado con humildad y bondad por R.E.R.H." : "Developed with humility and kindness by R.E.R.H."}</span>
          </div>
        </div>
      </div>

      {/* FALLBACK MANUAL DOWNLOAD & PREVIEW DIALOG MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className={`w-full max-w-4xl rounded-2xl border p-6 my-8 shadow-2xl transition-all ${
            isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
          }`}>
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                <h3 className="text-md font-extrabold uppercase tracking-tight">
                  {lang === "es" ? "Ficha de Trabajo Oficial" : "Official Practice Worksheet"}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition font-black"
              >
                ✕
              </button>
            </div>

            {/* Error banner if html2canvas crashed */}
            {isCaptureFailed && (
              <div className="p-4 rounded-xl mb-4 text-xs leading-relaxed flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400">
                <Info className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
                <div>
                  <p className="font-bold mb-1">
                    {lang === "es" 
                      ? "⚠️ Generación de Imagen Bloqueada por Seguridad de la Pestaña" 
                      : "⚠️ Image Generation Blocked by Tab Security Policies"}
                  </p>
                  <p className="mb-2">
                    {lang === "es"
                      ? "El navegador está bloqueando la captura de pantalla debido a las restricciones de seguridad del visor (iframe) en este editor. ¡No te preocupes! Tu trabajo está totalmente seguro:"
                      : "The browser is blocking screen capture due to safety restrictions of this iframe. Don't worry! Your work is fully safe:"}
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 font-medium">
                    <li>
                      <strong>{lang === "es" ? "Abrir en Nueva Ventana (Recomendado):" : "Open in New Window (Recommended):"}</strong>{" "}
                      {lang === "es"
                        ? "Haz clic en el botón de pantalla completa (ícono de compartir o ventana externa) en la esquina superior derecha de la vista previa del editor para abrir la app en una nueva pestaña normal. Allí la descarga en PNG funcionará de inmediato de forma nativa."
                        : "Click the full screen button (share icon or external window) on the top-right corner of the editor panel to open the app in a new regular tab. There, PNG downloads will work natively."}
                    </li>
                    <li>
                      <strong>{lang === "es" ? "Copiar Ficha como Texto (Inmediato):" : "Copy Worksheet as Text (Immediate):"}</strong>{" "}
                      {lang === "es"
                        ? "Usa la pestaña 'Ficha en Texto (TXT)' de abajo para copiar un resumen perfectamente formateado de toda tu práctica y pegarlo en Word, WhatsApp, Telegram o Notas. ¡Así no perderás nada de tu trabajo!"
                        : "Use the 'Worksheet in Text (TXT)' tab below to copy a perfectly formatted summary of your practice and paste it anywhere."}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Warning Alert / Help for Sandbox iframe restriction (If capture succeeded but user may still have download issues) */}
            {!isCaptureFailed && (
              <div className="p-4 rounded-xl mb-4 text-xs leading-relaxed flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-bold mb-1">
                    {lang === "es" ? "💡 Alternativas eficientes de exportación si la descarga directa no responde:" : "💡 Efficient export alternatives if the direct download doesn't respond:"}
                  </p>
                  <p className="mb-2">
                    {lang === "es" 
                      ? "Los visores incrustados (iframes) a veces restringen la descarga de archivos. Elige cualquiera de estas 3 alternativas instantáneas para guardar tus aforismos editados:"
                      : "Embedded iframe viewers sometimes restrict direct file downloads. Choose any of these 3 instant alternatives to save your work:"}
                  </p>
                  <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                    <li>
                      <strong>{lang === "es" ? "Copiar al Portapapeles (Rápido):" : "Copy to Clipboard (Fast):"}</strong> {lang === "es" ? "Haz clic en 'Copiar al Portapapeles' abajo para copiar la imagen y pegarla directamente en WhatsApp, Telegram o Word." : "Click 'Copy to Clipboard' below to copy the image and paste it directly into WhatsApp, Telegram, or Word."}
                    </li>
                    <li>
                      <strong>{lang === "es" ? "Guardar imagen desde abajo:" : "Save image from preview:"}</strong> {lang === "es" ? "Haz clic derecho en la vista previa de la imagen y selecciona 'Guardar imagen como...' (o mantén pulsado en tu móvil)." : "Right-click the image preview below and select 'Save image as...' (or tap and hold on mobile)."}
                    </li>
                    <li>
                      <strong>{lang === "es" ? "Copiar Ficha en Texto:" : "Copy Worksheet as Text:"}</strong> {lang === "es" ? "Usa la pestaña de Texto para copiar de inmediato todos tus textos formateados en un formato listo para almacenar." : "Use the Text tab to instantly copy all your formatted texts in a format ready to store."}
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Modal Tabs Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-4">
              <button
                onClick={() => setModalTab("image")}
                disabled={isCaptureFailed}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition duration-150 ${
                  isCaptureFailed ? "opacity-40 cursor-not-allowed" : ""
                } ${
                  modalTab === "image"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang === "es" ? "🖼️ Ficha en Imagen (PNG)" : "🖼️ Image Worksheet (PNG)"}
              </button>
              <button
                onClick={() => setModalTab("text")}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition duration-150 ${
                  modalTab === "text"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang === "es" ? "📝 Ficha en Texto (TXT)" : "📝 Text Worksheet (TXT)"}
              </button>
            </div>

            {/* Tabs Contents */}
            {modalTab === "image" && capturedImageUrl && !isCaptureFailed ? (
              /* Scrollable Image Preview Container */
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-[45vh] overflow-y-auto bg-slate-950 flex justify-center p-4 mb-6">
                <img 
                  src={capturedImageUrl} 
                  alt="Ficha de Trabajo" 
                  className="max-w-full h-auto object-contain border border-slate-800 shadow-2xl rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : modalTab === "text" ? (
              /* Scrollable Text Formatted Area with copy support */
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{lang === "es" ? "Texto de la ficha listo para copiar y archivar:" : "Worksheet text ready to copy and archive:"}</span>
                  <button
                    onClick={handleCopyTextWorksheet}
                    className="flex items-center gap-1 text-amber-500 hover:text-amber-400 font-bold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copyTextSuccess ? (lang === "es" ? "¡Copiado!" : "Copied!") : (lang === "es" ? "Copiar" : "Copy")}</span>
                  </button>
                </div>
                <textarea
                  id="fallback-textarea"
                  readOnly
                  value={getFormattedTextWorksheet()}
                  className={`w-full h-64 p-3.5 font-mono text-xs rounded-xl border leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                    isDark 
                      ? "bg-slate-950 border-slate-800 text-slate-300" 
                      : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                  onClick={(e) => {
                    (e.target as HTMLTextAreaElement).select();
                  }}
                />
              </div>
            ) : (
              /* Capture failed image fallback message */
              <div className="p-8 text-center border border-dashed rounded-xl border-slate-800 text-slate-500 mb-6 text-xs">
                {lang === "es" 
                  ? "La imagen no está disponible en esta pestaña debido a las directivas de seguridad. Por favor, usa la pestaña '📝 Ficha en Texto (TXT)' de arriba para recuperar tus textos, o abre la app en una nueva pestaña normal."
                  : "The image is not available in this tab due to security settings. Please use the '📝 Text Worksheet (TXT)' tab above to get your texts, or open the app in a new regular tab."}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              
              {/* Left Group: Dynamic Alternatives */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                {modalTab === "image" && capturedImageUrl && (
                  <>
                    {/* 1. Open in new tab (Native Anchor to bypass Sandbox) */}
                    <a
                      href={capturedImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-150 w-full sm:w-auto text-center ${
                        isDark ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "bg-indigo-100 hover:bg-indigo-200 text-indigo-900"
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{lang === "es" ? "Abrir en Nueva Pestaña" : "Open in New Tab"}</span>
                    </a>

                    {/* 2. Copy image to Clipboard */}
                    <button
                      onClick={handleCopyImageToClipboard}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-150 w-full sm:w-auto ${
                        copySuccess
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : isDark
                          ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copySuccess ? (lang === "es" ? "¡Imagen Copiada!" : "Image Copied!") : (lang === "es" ? "Copiar Imagen" : "Copy Image")}</span>
                    </button>
                  </>
                )}

                {modalTab === "text" && (
                  <button
                    onClick={handleCopyTextWorksheet}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-150 w-full sm:w-auto ${
                      copyTextSuccess
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : isDark
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {copyTextSuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copyTextSuccess ? (lang === "es" ? "¡Texto Copiado!" : "Text Copied!") : (lang === "es" ? "Copiar Ficha de Texto" : "Copy Text Worksheet")}</span>
                  </button>
                )}
              </div>

              {/* Right Group: Direct Triggers */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto sm:justify-end">
                {modalTab === "image" && capturedImageUrl && (
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.download = `ficha_regla_de_oro_2026.png`;
                      link.href = capturedImageUrl;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-150 w-full sm:w-auto ${
                      isDark ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === "es" ? "Reintentar Descarga" : "Retry Download"}</span>
                  </button>
                )}
                
                <button
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition duration-150 w-full sm:w-auto ${
                    isDark 
                      ? "bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-750" 
                      : "bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300"
                  }`}
                >
                  {lang === "es" ? "Cerrar" : "Close"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
