import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, ChevronRight, ChevronLeft, Headphones, Heart, Info, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RelaxationPlayerProps {
  theme?: "light" | "dark";
  lang?: "es" | "en";
  onClose?: () => void;
}

export default function RelaxationPlayer({ theme = "light", lang = "es", onClose }: RelaxationPlayerProps) {
  const isDark = theme === "dark";
  
  // Voice profiles mapping to custom rates and pitches for slow, warm, opaque/calm timbre (two options: female and male)
  const voiceProfiles = {
    f1: { 
      label: { 
        es: "Voz Femenina Cálida (Pecho y Pausada)", 
        en: "Warm Female Voice (Chest & Slow)" 
      }, 
      gender: "female", 
      pitch: 0.84,  // Lowered pitch for pectoral/warm resonance
      rate: 0.32,   // Ralentizado a la mitad para una locución sumamente pausada e isócrona
      volume: 0.55  // Low volume/intensity
    },
    m1: { 
      label: { 
        es: "Voz Masculina Profunda (Pecho y Pausada)", 
        en: "Deep Male Voice (Chest & Slow)" 
      }, 
      gender: "male", 
      pitch: 0.68,  // Substantially lowered pitch for deep pectoral resonance
      rate: 0.32,   // Ralentizado a la mitad para una locución sumamente pausada e isócrona
      volume: 0.55  // Low volume/intensity
    }
  };

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number>(0); // 0: Intro, 1: Externa, 2: Interna, 3: Mental, 4: Listo
  const [isMuted, setIsMuted] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const [breathState, setBreathState] = useState<"in" | "hold" | "out">("in");
  const [breathCount, setBreathCount] = useState(0);

  // Voice systems
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<"f1" | "m1">("f1");

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const filtered = allVoices.filter(v => v.lang.startsWith(lang));
      setVoices(filtered);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [lang]);

  // References for Web Audio API (Synthesizer Pad)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  // Text-To-Speech references
  const speechUttRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Phase texts in Spanish and English
  const phases = [
    {
      title: { es: "Preparación", en: "Preparation" },
      subtitle: { es: "Acomódate en una postura confortable", en: "Settle into a comfortable posture" },
      text: {
        es: "Busca una postura cómoda, cierra suavemente los ojos si lo deseas y prepárate para soltar el ruido y las tensiones del día. Respira lenta y profundamente.",
        en: "Find a comfortable position, gently close your eyes if you wish, and prepare to release the noise and tension of the day. Breathe slowly and deeply."
      },
      duration: 24 // segundos (duplicado para voz lenta)
    },
    {
      title: { es: "1. Relajación Externa", en: "1. External Relaxation" },
      subtitle: { es: "Aquietar el cuerpo físico", en: "Quieting the physical body" },
      text: {
        es: "Comenzamos por relajar los músculos del cuerpo. Relaja tu frente, tus mejillas, tus mandíbulas, tu lengua y tu garganta. Deja que tus ojos caigan pesados. Siente el cuello flojo, los hombros y los brazos cayendo pesados. Relaja tu pecho, tu abdomen, tus piernas y tus pies. Siente todo tu cuerpo completamente suelto y en paz.",
        en: "We begin by relaxing the muscles of the body. Relax your forehead, cheeks, jaws, tongue, and throat. Let your eyes fall heavy. Feel your neck loose, your shoulders and arms falling heavy. Relax your chest, abdomen, legs, and feet. Feel your entire body completely loose and at peace."
      },
      duration: 70 // segundos (duplicado para voz lenta)
    },
    {
      title: { es: "2. Relajación Interna", en: "2. Internal Relaxation" },
      subtitle: { es: "Aquietar el pecho y órganos", en: "Quieting the chest and organs" },
      text: {
        es: "Ahora relajamos las tensiones internas. Siente tu pecho por dentro, relaja tus pulmones y calma tu corazón. Siente tu estómago e intestinos, soltando cualquier nudo, tensión o contractura. Registra tu interior blando, cálido y luminoso, como un refugio de paz.",
        en: "Now we relax internal tensions. Feel your chest inside, relax your lungs, and calm your heart. Feel your stomach and intestines, releasing any knots, tension, or tightness. Notice your soft, warm, and luminous interior, like a refuge of peace."
      },
      duration: 60 // segundos (duplicado para voz lenta)
    },
    {
      title: { es: "3. Relajación Mental", en: "3. Mental Relaxation" },
      subtitle: { es: "Silencio y paz mental", en: "Silence and mental peace" },
      text: {
        es: "Finalmente, relaja tu mente. Deja pasar las preocupaciones y pensamientos como nubes en el viento. No te detengas en ninguno de ellos. Si aparece una imagen, déjala ir suavemente. Siente tu mente silenciosa, vacía y tranquila, como un lago cristalino en absoluta calma.",
        en: "Finally, relax your mind. Let worries and thoughts pass by like clouds in the wind. Do not dwell on any of them. If an image appears, gently let it go. Feel your mind silent, empty, and peaceful, like a crystal-clear lake in absolute stillness."
      },
      duration: 60 // segundos (duplicado para voz lenta)
    },
    {
      title: { es: "Estado de Paz Listo", en: "Peaceful State Ready" },
      subtitle: { es: "Unidad interna para la práctica", en: "Internal unity for your practice" },
      text: {
        es: "Has alcanzado un estado de calma, silencio y coherencia. Estás en la mejor disposición para iniciar tu reflexión sobre la Regla de Oro. Cuando lo desees, continúa hacia el ejercicio.",
        en: "You have reached a state of calm, silence, and coherence. You are in the best condition to begin your reflection on the Golden Rule. Whenever you are ready, continue to the exercise."
      },
      duration: 20 // segundos (duplicado para voz lenta)
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
      setBreathCount(b => b + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, currentPhase]);

  // Handle phase-by-phase automatic progression
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentPhase < phases.length - 1) {
        handleNextPhase();
      } else {
        setIsPlaying(false);
      }
    }, phases[currentPhase].duration * 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase]);

  // Voice Text-To-Speech logic
  useEffect(() => {
    if (isPlaying && useVoice && currentPhase < 4) {
      speakCurrentPhase();
    } else {
      stopSpeaking();
    }
    return () => stopSpeaking();
  }, [isPlaying, currentPhase, useVoice, lang]);

  // Ambient sound synthesizer pad (Web Audio API)
  const initSynth = () => {
    if (audioCtxRef.current) return;

    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Filter (Low pass to make it very deep, warm, and dark)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Create three warm oscillators for an ambient major chord/perfect triad
      // Base frequency 110 Hz (A2), 137.5 Hz (C#3), 165 Hz (E3) - super calming chord
      const freqs = [110, 137.5, 165];
      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sawtooth" : "sine"; // Sawtooth has rich harmonics filtered heavily, sine is pure
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const oscGain = ctx.createGain();
        // Lower volume for higher pitches, base oscillator a bit louder
        oscGain.gain.setValueAtTime(i === 0 ? 0.3 : 0.15, ctx.currentTime);
        
        // Subtle slow LFO style detuning to create a moving pad
        const detuneSpeed = 0.1 + i * 0.05;
        const detuneAmount = 5 + i * 2;
        
        osc.connect(oscGain);
        oscGain.connect(filter);
        return osc;
      });

      oscs.forEach(osc => osc.start());
      oscsRef.current = oscs;

      // Slow volume fade-in
      masterGain.gain.linearRampToValueAtTime(isMuted ? 0.0 : 0.15, ctx.currentTime + 3.0);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked in this context:", e);
    }
  };

  const startSynth = () => {
    if (!audioCtxRef.current) {
      initSynth();
    } else {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(isMuted ? 0.0 : 0.15, audioCtxRef.current.currentTime + 1.5);
      }
    }
  };

  const stopSynth = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0, audioCtxRef.current.currentTime + 1.5);
    }
  };

  const toggleMuteSynth = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioCtxRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(nextMuted ? 0.0 : 0.15, audioCtxRef.current.currentTime + 0.5);
    }
  };

  // Speaks the current text
  const speakCurrentPhase = () => {
    if (!("speechSynthesis" in window)) return;
    
    window.speechSynthesis.cancel(); // Stop anything else

    let text = phases[currentPhase].text[lang];
    
    // Rhythmic, isochronous pause-injection for maximum relaxation effectiveness and generous silences
    if (lang === "es") {
      text = text
        .replace(/,/g, ", ... ")
        .replace(/\. /g, ". ... ... ")
        .replace(/ y /g, " ... y ... ");
    } else {
      text = text
        .replace(/,/g, ", ... ")
        .replace(/\. /g, ". ... ... ")
        .replace(/ and /g, " ... and ... ");
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "es" ? "es-ES" : "en-US";
    
    const profile = voiceProfiles[selectedProfile];
    utterance.rate = profile.rate;
    utterance.pitch = profile.pitch;
    utterance.volume = profile.volume; // Moderate-low intensity to internalize attention

    // Find a voice matching the profile gender
    const targetGender = profile.gender;
    const langVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices().filter(v => v.lang.startsWith(lang));
    
    let selectedVoice = langVoices.find(v => {
      const name = v.name.toLowerCase();
      if (targetGender === "female") {
        return name.includes("helena") || name.includes("paulina") || name.includes("sabina") || name.includes("female") || name.includes("laura") || name.includes("monica") || name.includes("maria") || name.includes("google") || name.includes("femenina") || name.includes("zira") || name.includes("hazel");
      } else {
        return name.includes("pablo") || name.includes("julio") || name.includes("male") || name.includes("david") || name.includes("alvaro") || name.includes("daniel") || name.includes("jorge") || name.includes("masculina");
      }
    });

    // If no perfect gender match, just fall back gracefully
    if (!selectedVoice && langVoices.length > 0) {
      if (targetGender === "male" && langVoices.length > 1) {
        selectedVoice = langVoices[1];
      } else {
        selectedVoice = langVoices[0];
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Store reference
    speechUttRef.current = utterance;
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handlePlayPause = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    
    if (nextPlaying) {
      startSynth();
    } else {
      stopSynth();
      stopSpeaking();
    }
  };

  const handleNextPhase = () => {
    stopSpeaking();
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1);
    } else {
      setIsPlaying(false);
      stopSynth();
    }
  };

  const handlePrevPhase = () => {
    stopSpeaking();
    if (currentPhase > 0) {
      setCurrentPhase(prev => prev - 1);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setIsPlaying(false);
    setCurrentPhase(0);
    setBreathCount(0);
    setBreathState("in");
    stopSynth();
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (audioCtxRef.current) {
        try {
          oscsRef.current.forEach(osc => osc.stop());
          audioCtxRef.current.close();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const activeText = phases[currentPhase].text[lang];
  const activeTitle = phases[currentPhase].title[lang];
  const activeSubtitle = phases[currentPhase].subtitle[lang];

  return (
    <div 
      className={`rounded-2xl border p-6 shadow-md transition-all relative overflow-hidden ${
        isDark 
          ? "bg-slate-900/90 border-slate-800 text-slate-100 shadow-slate-950/20" 
          : "bg-white border-slate-150 text-slate-900 shadow-slate-100/50"
      }`}
      id="relaxation-meditation-player"
    >
      {/* Absolute graphic glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none" />

      {/* Header section with instructions */}
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
              {lang === "es" ? "Relajación Externa, Interna y Mental de Silo" : "Silo's External, Internal, and Mental Relaxation"}
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
            {lang === "es" ? "Cerrar" : "Close"}
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
                  {breathState === "in" && (lang === "es" ? "Inhala" : "Inhale")}
                  {breathState === "hold" && (lang === "es" ? "Retén" : "Hold")}
                  {breathState === "out" && (lang === "es" ? "Exhala" : "Exhale")}
                </span>
              ) : (
                <Play className="w-8 h-8 text-slate-500 fill-slate-500/20 translate-x-0.5" />
              )}
            </motion.div>
          </div>

          <div className="text-center">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {lang === "es" ? "Ritmo Respiratorio" : "Breathing Rhythm"}
            </span>
            <p className="text-xs font-semibold text-amber-500 mt-1">
              {currentPhase === 4 
                ? (lang === "es" ? "Disposición de calma lograda" : "State of calm achieved")
                : isPlaying 
                  ? `${lang === "es" ? "Respiración profunda..." : "Deep breathing..."}` 
                  : (lang === "es" ? "Pulsa Play para iniciar" : "Click Play to begin")}
            </p>
          </div>
        </div>

        {/* Right Side: Text narration & Active Controls */}
        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
          
          {/* Phase Track Indicator */}
          <div className="flex gap-1.5 justify-between">
            {[0, 1, 2, 3, 4].map((num) => {
              const isActive = currentPhase === num;
              const isPast = currentPhase > num;
              
              return (
                <div 
                  key={num} 
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    isActive 
                      ? "bg-amber-500" 
                      : isPast 
                      ? "bg-emerald-500" 
                      : isDark ? "bg-slate-850" : "bg-slate-100"
                  }`}
                  title={phases[num].title[lang]}
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

          {/* Sound & Meditation preferences options */}
          <div className="flex flex-wrap gap-4 items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/40">
            <div className="flex items-center gap-4">
              {/* Music Pad Toggle */}
              <button
                onClick={toggleMuteSynth}
                className={`p-2 rounded-lg border transition flex items-center gap-1.5 text-[10px] font-bold cursor-pointer ${
                  isMuted 
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20" 
                    : isDark
                    ? "bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-750 hover:text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
                title={lang === "es" ? "Sintetizador de música de fondo" : "Background synthesizer music"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{lang === "es" ? "Sonido Zen" : "Zen Sound"}</span>
              </button>

              {/* TTS Voice Toggle & Profile Selector */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setUseVoice(!useVoice)}
                  className={`p-2 rounded-lg border transition flex items-center gap-1.5 text-[10px] font-bold cursor-pointer ${
                    !useVoice 
                      ? "bg-slate-750 border-slate-700 text-slate-400" 
                      : isDark
                      ? "bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-750 hover:text-white"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                  title={lang === "es" ? "Voz guía sintetizada" : "Synthesized voice guide"}
                >
                  <Heart className={`w-3.5 h-3.5 ${useVoice ? "text-red-400 animate-pulse fill-red-400/20" : ""}`} />
                  <span>{lang === "es" ? "Voz Guía" : "Voice Guide"}</span>
                </button>

                {useVoice && (
                  <select
                    value={selectedProfile}
                    onChange={(e) => {
                      const nextProfile = e.target.value as "f1" | "m1";
                      setSelectedProfile(nextProfile);
                      // Dynamically re-speak if speaking
                      if (isPlaying) {
                        setTimeout(() => {
                          speakCurrentPhase();
                        }, 50);
                      }
                    }}
                    className={`text-[10px] font-bold px-2 py-2 rounded-lg border outline-none cursor-pointer transition ${
                      isDark 
                        ? "bg-slate-800 border-slate-750 text-slate-200 hover:border-slate-700 hover:bg-slate-850" 
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                    title={lang === "es" ? "Selecciona el estilo de voz" : "Select voice style"}
                  >
                    {Object.entries(voiceProfiles).map(([key, prof]) => (
                      <option key={key} value={key}>
                        {prof.label[lang]}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Core Playback controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPhase}
                disabled={currentPhase === 0}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  currentPhase === 0 
                    ? "opacity-40 cursor-not-allowed" 
                    : isDark ? "bg-slate-800 border-slate-750 text-slate-300 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                className={`px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-lg text-xs tracking-wider uppercase transition flex items-center gap-1.5 shadow-sm cursor-pointer`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? (lang === "es" ? "Pausar" : "Pause") : (lang === "es" ? "Escuchar" : "Listen")}</span>
              </button>

              <button
                onClick={handleNextPhase}
                disabled={currentPhase === phases.length - 1}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  currentPhase === phases.length - 1 
                    ? "opacity-40 cursor-not-allowed" 
                    : isDark ? "bg-slate-800 border-slate-750 text-slate-300 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                title={lang === "es" ? "Reiniciar relajación" : "Restart relaxation"}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  isDark ? "bg-slate-850 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
