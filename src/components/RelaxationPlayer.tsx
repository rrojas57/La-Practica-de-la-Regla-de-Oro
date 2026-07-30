import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Sparkles, Headphones, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RelaxationPlayerProps {
  theme?: "light" | "dark";
  lang?: "es" | "en" | "fr" | "de" | "pt";
  onClose?: () => void;
}

export default function RelaxationPlayer({ theme = "light", lang = "es", onClose }: RelaxationPlayerProps) {
  const isDark = theme === "dark";

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number>(0); // 0: Intro, 1: Externa, 2: Interna, 3: Mental, 4: Listo
  const [breathState, setBreathState] = useState<"in" | "hold" | "out">("in");

  // Audio refs & state
  const realAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentPhaseRef = useRef(currentPhase);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    currentPhaseRef.current = currentPhase;
  }, [currentPhase]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Phase texts in Spanish, English, French, German, Portuguese
  const phases = [
    {
      title: {
        es: "Preparación",
        en: "Preparation",
        fr: "Préparation",
        de: "Vorbereitung",
        pt: "Preparação"
      },
      subtitle: {
        es: "Acomódate en una postura confortable",
        en: "Settle into a comfortable posture",
        fr: "Installez-vous dans une posture confortable",
        de: "Machen Sie es sich bequem",
        pt: "Acomode-se numa postura confortável"
      },
      text: {
        es: "Busca una postura cómoda, cierra suavemente los ojos si lo deseas y prepárate para soltar el ruido y las tensiones del día. Respira lenta y profundamente.",
        en: "Find a comfortable position, gently close your eyes if you wish, and prepare to release the noise and tension of the day. Breathe slowly and deeply.",
        fr: "Trouvez une position confortable, fermez doucement les yeux si vous le souhaitez et préparez-vous à libérer le bruit et la tension de la journée. Respirez lentement et profondément.",
        de: "Finden Sie eine bequeme Position, schließen Sie sanft die Augen, wenn Sie möchten, und bereiten Sie sich darauf vor, den Lärm und die Spannungen des Tages loszulassen. Atmen Sie langsam und tief.",
        pt: "Encontre uma posição confortável, feche suavemente os olhos se desejar e prepare-se para libertar o ruído e as tensões do dia. Respire lenta e profundamente."
      }
    },
    {
      title: {
        es: "1. Relajación Externa",
        en: "1. External Relaxation",
        fr: "1. Relaxation Externe",
        de: "1. Äußere Entspannung",
        pt: "1. Relaxamento Externo"
      },
      subtitle: {
        es: "Aquietar el cuerpo físico",
        en: "Quieting the physical body",
        fr: "Calmer le corps physique",
        de: "Den physischen Körper beruhigen",
        pt: "Aquietar o corpo físico"
      },
      text: {
        es: "Comenzamos por relajar los músculos del cuerpo. Relaja tu frente, tus mejillas, tus mandíbulas, tu lengua y tu garganta. Deja que tus ojos caigan pesados. Siente el cuello flojo, los hombros y los brazos cayendo pesados. Relaja tu pecho, tu abdomen, tus piernas y tus pies. Siente todo tu cuerpo completamente suelto y en paz.",
        en: "We begin by relaxing the muscles of the body. Relax your forehead, cheeks, jaws, tongue, and throat. Let your eyes fall heavy. Feel your neck loose, your shoulders and arms falling heavy. Relax your chest, abdomen, legs, and feet. Feel your entire body completely loose and at peace.",
        fr: "Nous commençons par détendre les muscles du corps. Relâchez votre front, vos joues, vos mâchoires, votre langue et votre gorge. Laissez vos yeux devenir lourds. Sentez votre cou souple, vos épaules et vos bras tomber lourdement. Relâchez votre poitrine, votre abdomen, vos jambes et vos pieds. Sentez tout votre corps complètement relâché et en paix.",
        de: "Wir beginnen mit der Entspannung der Körpermuskeln. Entspannen Sie Stirn, Wangen, Kiefer, Zunge und Rachen. Lassen Sie Ihre Augen schwer werden. Fühlen Sie den Nacken locker, Schultern und Arme schwer herabsinken. Entspannen Sie Brust, Bauch, Beine und Füße. Fühlen Sie Ihren ganzen Körper vollkommen locker und in Frieden.",
        pt: "Começamos por relaxar os músculos do corpo. Relaxe a testa, as bochechas, as mandíbulas, a língua e a garganta. Deixe os olhos caírem pesados. Sinta o pescoço solto, os ombros e os braços a cair pesados. Relaxe o peito, o abdómen, as pernas e os pés. Sinta todo o seu corpo completamente solto e em paz."
      }
    },
    {
      title: {
        es: "2. Relajación Interna",
        en: "2. Internal Relaxation",
        fr: "2. Relaxation Interne",
        de: "2. Innere Entspannung",
        pt: "2. Relaxamento Interno"
      },
      subtitle: {
        es: "Aquietar el pecho y órganos",
        en: "Quieting the chest and organs",
        fr: "Calmer la poitrine et les organes",
        de: "Brust und Organe beruhigen",
        pt: "Aquietar o peito e os órgãos"
      },
      text: {
        es: "Ahora relajamos las tensiones internas. Siente tu pecho por dentro, relaja tus pulmones y calma tu corazón. Siente tu estómago e intestinos, soltando cualquier nudo, tensión o contractura. Registra tu interior blando, cálido y luminoso, como un refugio de paz.",
        en: "Now we relax internal tensions. Feel your chest inside, relax your lungs, and calm your heart. Feel your stomach and intestines, releasing any knots, tension, or tightness. Notice your soft, warm, and luminous interior, like a refuge of peace.",
        fr: "Maintenant, nous relâchons les tensions internes. Sentez l'intérieur de votre poitrine, détendez vos poumons et calmez votre cœur. Sentez votre estomac et vos intestins, libérant tout nœud, tension ou crispation. Prenez conscience de votre intérieur doux, chaleureux et lumineux, comme un refuge de paix.",
        de: "Jetzt entspannen wir die inneren Spannungen. Fühlen Sie Ihre Brust von innen, entspannen Sie Ihre Lungen und beruhigen Sie Ihr Herz. Fühlen Sie Ihren Magen und Darm und lösen Sie jeden Knoten, jede Spannung oder Verkrampfung. Nehmen Sie Ihr Inneres weich, warm und leuchtend wahr, wie einen Zufluchtsort des Friedens.",
        pt: "Agora relaxamos as tensões internas. Sinta o peito por dentro, relaxe os pulmões e acalme o coração. Sinta o estômago e os intestinos, soltando qualquer nó, tensão ou contração. Registe o seu interior suave, caloroso e luminoso, como um refúgio de paz."
      }
    },
    {
      title: {
        es: "3. Relajación Mental",
        en: "3. Mental Relaxation",
        fr: "3. Relaxation Mentale",
        de: "3. Mentale Entspannung",
        pt: "3. Relaxamento Mental"
      },
      subtitle: {
        es: "Silencio y paz mental",
        en: "Silence and mental peace",
        fr: "Silence et paix mentale",
        de: "Stille und geistiger Frieden",
        pt: "Silêncio e paz mental"
      },
      text: {
        es: "Finalmente, relaja tu mente. Deja pasar las preocupaciones y pensamientos como nubes en el viento. No te detengas en ninguno de ellos. Si aparece una imagen, déjala ir suavemente. Siente tu mente silenciosa, vacía y tranquila, como un lago cristalino en absoluta calma.",
        en: "Finally, relax your mind. Let worries and thoughts pass by like clouds in the wind. Do not dwell on any of them. If an image appears, gently let it go. Feel your mind silent, empty, and peaceful, like a crystal-clear lake in absolute stillness.",
        fr: "Enfin, détendez votre esprit. Laissez passer les soucis et les pensées comme des nuages dans le vent. Ne vous arrêtez sur aucun d'eux. Si une image apparaît, laissez-la partir doucement. Sentez votre esprit silencieux, vide et tranquille, comme un lac cristallin dans un calme absolu.",
        de: "Schließlich entspannen Sie Ihren Geist. Lassen Sie Sorgen und Gedanken wie Wolken im Wind vorüberziehen. Verweilen Sie bei keinem von ihnen. Wenn ein Bild erscheint, lassen Sie es sanft gehen. Fühlen Sie Ihren Geist still, leer und friedlich, wie einen kristallklaren See in absoluter Windstille.",
        pt: "Finalmente, relaxe a mente. Deixe passar as preocupações e pensamentos como nuvens ao vento. Não se detenha em nenhum deles. Si aparecer uma imagem, deixe-a ir suavemente. Sinta a mente silenciosa, vazia e tranquila, como um lago cristalino em absoluta calma."
      }
    },
    {
      title: {
        es: "Estado de Paz Listo",
        en: "Peaceful State Ready",
        fr: "État de Paix Prêt",
        de: "Friedlicher Zustand bereit",
        pt: "Estado de Paz Pronto"
      },
      subtitle: {
        es: "Unidad interna para la práctica",
        en: "Internal unity for your practice",
        fr: "Unité interne pour la pratique",
        de: "Innere Einheit für die Praxis",
        pt: "Unidade interna para a prática"
      },
      text: {
        es: "Has alcanzado un estado de calma, silencio y coherencia. Estás en la mejor disposición para iniciar tu reflexión sobre la Regla de Oro. Cuando lo desees, continúa hacia el ejercicio.",
        en: "You have reached a state of calm, silence, and coherence. You are in the best condition to begin your reflection on the Golden Rule. Whenever you are ready, continue to the exercise.",
        fr: "Vous avez atteint un état de calme, de silence et de cohérence. Vous êtes dans les meilleures dispositions pour commencer votre réflexion sur la Règle d'Or. Quand vous le souhaitez, continuez vers l'exercice.",
        de: "Sie haben einen Zustand der Ruhe, Stille und Kohärenz erreicht. Sie sind bestens vorbereitet, um Ihre Reflexion über die Goldene Regel zu beginnen. Wenn Sie möchten, fahren Sie mit der Übung fort.",
        pt: "Alcançou um estado de calma, silêncio e coerência. Está na melhor disposição para iniciar a sua reflexão sobre a Regra de Ouro. Quando desejar, continue para o exercício."
      }
    }
  ];

  // Breath Cycle Animation (4s inhale, 4s hold, 4s exhale)
  useEffect(() => {
    if (!isPlaying || currentPhase === 4) return;

    const interval = setInterval(() => {
      setBreathState((prev) => {
        if (prev === "in") return "hold";
        if (prev === "hold") return "out";
        return "in";
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, currentPhase]);

  // Reload audio on language change
  useEffect(() => {
    if (realAudioRef.current) {
      realAudioRef.current.pause();
      realAudioRef.current.currentTime = 0;
      setCurrentPhase(0);
      currentPhaseRef.current = 0;
      realAudioRef.current.load();
      if (isPlaying) {
        realAudioRef.current.playbackRate = 0.80;
        realAudioRef.current.play().catch(err => {
          console.warn("Language switch audio play error:", err);
          speakPhase(0);
        });
      }
    }
  }, [lang]);

  const speakPhase = (phaseIdx: number) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = phases[phaseIdx].text[lang] || phases[phaseIdx].text["es"];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 
      lang === "es" ? "es-ES" :
      lang === "en" ? "en-US" :
      lang === "fr" ? "fr-FR" :
      lang === "de" ? "de-DE" : "pt-PT";
    utterance.rate = 0.72; // Very slow, calm, tranquil pace for meditation

    utterance.onend = () => {
      if (isPlayingRef.current && phaseIdx < 4) {
        const nextPhase = phaseIdx + 1;
        setCurrentPhase(nextPhase);
        currentPhaseRef.current = nextPhase;
        if (nextPhase < 4) {
          setTimeout(() => {
            if (isPlayingRef.current) {
              speakPhase(nextPhase);
            }
          }, 4500); // 4.5 seconds pause between meditation phases
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    isPlayingRef.current = nextPlaying;

    if (nextPlaying) {
      if (realAudioRef.current) {
        realAudioRef.current.playbackRate = 0.80; // Slower playback for tranquil state
        realAudioRef.current.play().then(() => {
          if (realAudioRef.current) {
            realAudioRef.current.playbackRate = 0.80;
          }
        }).catch(err => {
          console.warn("Failed to play audio element, falling back to speech synthesis:", err);
          speakPhase(currentPhase);
        });
      } else {
        speakPhase(currentPhase);
      }
    } else {
      if (realAudioRef.current) {
        realAudioRef.current.pause();
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handlePhaseSelect = (num: number) => {
    setCurrentPhase(num);
    currentPhaseRef.current = num;
    const audio = realAudioRef.current;
    if (audio) {
      const validDuration = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 90;
      const startRatios = [0, 0.20, 0.45, 0.70, 0.95];
      audio.currentTime = validDuration * startRatios[num];
      if (isPlaying) {
        audio.playbackRate = 0.80;
        audio.play().catch(err => console.warn(err));
      }
    } else if (isPlaying) {
      speakPhase(num);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentPhase(0);
    currentPhaseRef.current = 0;
    setBreathState("in");
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (realAudioRef.current) {
      realAudioRef.current.currentTime = 0;
      realAudioRef.current.pause();
    }
  };

  const activeText = phases[currentPhase].text[lang] || phases[currentPhase].text["es"];
  const activeTitle = phases[currentPhase].title[lang] || phases[currentPhase].title["es"];
  const activeSubtitle = phases[currentPhase].subtitle[lang] || phases[currentPhase].subtitle["es"];

  return (
    <div 
      className={`rounded-2xl border p-6 shadow-md transition-all relative overflow-hidden ${
        isDark 
          ? "bg-slate-900/90 border-slate-800 text-slate-100 shadow-slate-950/20" 
          : "bg-white border-slate-150 text-slate-900 shadow-slate-100/50"
      }`}
      id="relaxation-meditation-player"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none" />

      {/* Header section */}
      <div className="flex items-center justify-between gap-4 border-b pb-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
            <Headphones className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight uppercase flex items-center gap-1">
              <span>{lang === "es" ? "Paz Mental: Relajación Guiada" : "Mental Peace: Guided Relaxation"}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <p className="text-[10px] text-slate-400">
              {lang === "es" && "Relajación Externa, Interna y Mental de Silo"}
              {lang === "en" && "Silo's External, Internal, and Mental Relaxation"}
              {lang === "fr" && "Relaxation externe, interne et mentale de Silo"}
              {lang === "de" && "Silos äußere, innere und mentale Entspannung"}
              {lang === "pt" && "Relaxamento Externo, Interno e Mental de Silo"}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className={`text-xs px-2.5 py-1 rounded-lg border transition ${
              isDark 
                ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700" 
                : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
            }`}
          >
            {lang === "es" && "Cerrar"}
            {lang === "en" && "Close"}
            {lang === "fr" && "Fermer"}
            {lang === "de" && "Schließen"}
            {lang === "pt" && "Fechar"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Visual Breathing Circle Guidance */}
        <div className="md:col-span-5 flex flex-col items-center justify-center py-4 space-y-4 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/60 pr-0 md:pr-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Pulsing Breathing Circle */}
            <AnimatePresence>
              <motion.div
                animate={{
                  scale: currentPhase === 4 ? 1.0 : isPlaying ? (breathState === "in" ? 1.4 : breathState === "hold" ? 1.4 : 0.95) : 1.0,
                  opacity: isPlaying ? [0.15, 0.25, 0.15] : 0.1,
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                className="absolute inset-0 bg-amber-500 rounded-full"
              />
            </AnimatePresence>

            <motion.div
              animate={{
                scale: currentPhase === 4 ? 1.0 : isPlaying ? (breathState === "in" ? 1.25 : breathState === "hold" ? 1.25 : 0.85) : 1.0,
                backgroundColor: currentPhase === 4 ? "#10b981" : isPlaying ? (breathState === "in" ? "#f59e0b" : breathState === "hold" ? "#d97706" : "#f59e0b") : "#cbd5e1"
              }}
              transition={{
                duration: 4,
                ease: "easeInOut"
              }}
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-slate-950 shadow-md text-xs font-bold z-10 transition-colors"
            >
              {currentPhase === 4 ? (
                <Check className="w-8 h-8 text-white" />
              ) : isPlaying ? (
                <span className="text-white text-center text-[10px] leading-tight uppercase tracking-wider">
                  {breathState === "in" && (
                    <>
                      {lang === "es" && "Inhala"}
                      {lang === "en" && "Inhale"}
                      {lang === "fr" && "Inspirer"}
                      {lang === "de" && "Einatmen"}
                      {lang === "pt" && "Inalar"}
                    </>
                  )}
                  {breathState === "hold" && (
                    <>
                      {lang === "es" && "Retén"}
                      {lang === "en" && "Hold"}
                      {lang === "fr" && "Retenir"}
                      {lang === "de" && "Anhalten"}
                      {lang === "pt" && "Reter"}
                    </>
                  )}
                  {breathState === "out" && (
                    <>
                      {lang === "es" && "Exhala"}
                      {lang === "en" && "Exhale"}
                      {lang === "fr" && "Expirer"}
                      {lang === "de" && "Ausatmen"}
                      {lang === "pt" && "Exalar"}
                    </>
                  )}
                </span>
              ) : (
                <Play className="w-8 h-8 text-slate-500 fill-slate-500/20 translate-x-0.5" />
              )}
            </motion.div>
          </div>

          <div className="text-center">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {lang === "es" && "Ritmo Respiratorio"}
              {lang === "en" && "Breathing Rhythm"}
              {lang === "fr" && "Rythme respiratoire"}
              {lang === "de" && "Atemrhythmus"}
              {lang === "pt" && "Ritmo Respiratório"}
            </span>
            <p className="text-xs font-semibold text-amber-500 mt-1">
              {currentPhase === 4 
                ? (
                  <>
                    {lang === "es" && "Disposición de calma lograda"}
                    {lang === "en" && "State of calm achieved"}
                    {lang === "fr" && "Disposition de calme obtenue"}
                    {lang === "de" && "Zustand der Ruhe erreicht"}
                    {lang === "pt" && "Disposição de calma alcançada"}
                  </>
                )
                : isPlaying 
                  ? (
                    <>
                      {lang === "es" && "Respiración profunda..."}
                      {lang === "en" && "Deep breathing..."}
                      {lang === "fr" && "Respiration profonde..."}
                      {lang === "de" && "Tiefes Atmen..."}
                      {lang === "pt" && "Respiração profunda..."}
                    </>
                  ) 
                  : (
                    <>
                      {lang === "es" && "Pulsa Escuchar para iniciar"}
                      {lang === "en" && "Click Listen to begin"}
                      {lang === "fr" && "Appuyez sur Écouter pour commencer"}
                      {lang === "de" && "Drücken Sie Anhören zum Starten"}
                      {lang === "pt" && "Pressione Ouvir para iniciar"}
                    </>
                  )}
            </p>
          </div>
        </div>

        {/* Right Side: Text narration & Controls */}
        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
          
          {/* Phase Track Indicator */}
          <div className="flex gap-1.5 justify-between">
            {[0, 1, 2, 3, 4].map((num) => {
              const isActive = currentPhase === num;
              const isPast = currentPhase > num;
              
              return (
                <button 
                  key={num} 
                  type="button"
                  onClick={() => handlePhaseSelect(num)}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
                    isActive 
                      ? "bg-amber-500 ring-2 ring-amber-500/30" 
                      : isPast 
                      ? "bg-emerald-500" 
                      : isDark ? "bg-slate-800" : "bg-slate-200"
                  }`}
                  title={`${phases[num].title[lang]} - ${phases[num].subtitle[lang]}`}
                />
              );
            })}
          </div>

          {/* Core Content Box */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                currentPhase === 4 
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                  : isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
              }`}>
                {activeTitle}
              </span>
              <span className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                • {activeSubtitle}
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhase}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`text-sm font-semibold leading-relaxed ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {activeText}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Simplified Controls: ONLY Play/Pause and Reset buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/40">
            <button
              onClick={handlePlayPause}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs tracking-wider uppercase transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
              <span>
                {isPlaying ? (
                  <>
                    {lang === "es" && "Pausar"}
                    {lang === "en" && "Pause"}
                    {lang === "fr" && "Pause"}
                    {lang === "de" && "Pause"}
                    {lang === "pt" && "Pausar"}
                  </>
                ) : (
                  <>
                    {lang === "es" && "Escuchar"}
                    {lang === "en" && "Listen"}
                    {lang === "fr" && "Écouter"}
                    {lang === "de" && "Anhören"}
                    {lang === "pt" && "Ouvir"}
                  </>
                )}
              </span>
            </button>

            <button
              onClick={handleReset}
              title={
                lang === "es" ? "Reiniciar relajación" :
                lang === "en" ? "Restart relaxation" :
                lang === "fr" ? "Réinitialiser la relaxation" :
                lang === "de" ? "Entspannung zurücksetzen" :
                "Reiniciar relaxamento"
              }
              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                isDark ? "bg-slate-850 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Human Voice Audio Element */}
      <audio
        ref={realAudioRef}
        src={`/relax_${lang}.mp3`}
        preload="auto"
        onPlay={() => {
          if (realAudioRef.current) {
            realAudioRef.current.playbackRate = 0.80;
          }
        }}
        onCanPlay={() => {
          if (realAudioRef.current) {
            realAudioRef.current.playbackRate = 0.80;
          }
        }}
        onError={(e) => {
          const el = e.currentTarget;
          if (!el.src.includes(`/relax/${lang}.mp3`)) {
            el.src = `/relax/${lang}.mp3`;
            el.load();
            if (isPlaying) {
              el.playbackRate = 0.80;
              el.play().catch(err => console.warn(err));
            }
          }
        }}
        onTimeUpdate={() => {
          const audio = realAudioRef.current;
          if (!audio || audio.seeking) return;
          
          if (audio.playbackRate !== 0.80) {
            audio.playbackRate = 0.80;
          }

          const time = audio.currentTime;
          const validDuration = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 90;
          const ratio = time / validDuration;

          let targetPhase = 0;
          if (ratio >= 0.92) targetPhase = 4;
          else if (ratio >= 0.68) targetPhase = 3;
          else if (ratio >= 0.42) targetPhase = 2;
          else if (ratio >= 0.18) targetPhase = 1;

          if (targetPhase !== currentPhaseRef.current) {
            setCurrentPhase(targetPhase);
            currentPhaseRef.current = targetPhase;
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
          setCurrentPhase(4);
          currentPhaseRef.current = 4;
        }}
      />

    </div>
  );
}
