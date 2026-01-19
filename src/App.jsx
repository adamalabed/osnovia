import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Layout, 
  Check, 
  Mic, 
  MessageSquare, 
  Play, 
  Pause,
  RotateCcw,
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Send, 
  Hexagon, 
  TrendingUp, 
  CheckCircle2, 
  Battery, 
  Settings, 
  BookOpen,
  User,
  Smartphone,
  Watch,
  Wind,
  Brain,
  Zap,
  Droplets,
  Utensils,
  Moon,
  Dna,
  Network,
  Bell,
  Shield,
  LogOut
} from 'lucide-react';

// --- STYLES & LIQUID GLASS THEME ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
    
    :root {
      /* Apple-esque Dark Mode Palette */
      --bg-deep: #000000;
      --text-primary: #FFFFFF;
      --text-secondary: rgba(235, 235, 245, 0.6); /* Apple's standard secondary text */
      --text-tertiary: rgba(235, 235, 245, 0.3);
      --accent-blue: #0A84FF; /* iOS Blue */
      --accent-indigo: #5E5CE6;
      --accent-orange: #FF9F0A;
      --accent-green: #30D158;
      --accent-red: #FF453A;
      
      --font-main: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    body {
      background-color: var(--bg-deep);
      color: var(--text-primary);
      font-family: var(--font-main);
      overflow-x: hidden;
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* --- LIQUID GLASS MATERIAL --- */
    /* The core of the "Apple" look: Heavy blur, translucency, subtle borders */
    
    .liquid-bg-layer {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: -1;
      background: #000;
      overflow: hidden;
    }

    /* Floating Orbs for "Liquid" feel */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.6;
      animation: float 20s infinite ease-in-out;
    }
    .orb-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, #0A84FF 0%, transparent 70%); animation-delay: 0s; }
    .orb-2 { bottom: -10%; right: -10%; width: 60vw; height: 60vw; background: radial-gradient(circle, #5E5CE6 0%, transparent 70%); animation-delay: -5s; }
    .orb-3 { top: 40%; left: 40%; width: 40vw; height: 40vw; background: radial-gradient(circle, #30D158 0%, transparent 70%); opacity: 0.3; animation-delay: -10s; }

    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }

    .glass-panel {
      background: rgba(30, 30, 35, 0.4); /* Darker translucent base */
      backdrop-filter: blur(40px) saturate(180%); /* iOS style heavy blur */
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 
        0 4px 24px -1px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1); /* Inner light lip */
      border-radius: 24px; /* Large rounded corners */
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    .glass-panel:active {
      transform: scale(0.98);
      background: rgba(40, 40, 45, 0.5);
    }

    .glass-dock {
      background: rgba(20, 20, 20, 0.7);
      backdrop-filter: blur(50px) saturate(180%);
      -webkit-backdrop-filter: blur(50px) saturate(180%);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Typography Utilities */
    .text-secondary { color: var(--text-secondary); }
    .text-caption { font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--text-tertiary); font-weight: 600; }
    .font-mono { font-family: var(--font-mono); letter-spacing: -0.02em; }
    
    /* UI Elements */
    .btn-liquid {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px; /* Pill shape */
      color: white;
      font-weight: 500;
      transition: all 0.2s;
    }
    .btn-liquid:hover { background: rgba(255, 255, 255, 0.2); }
    .btn-primary {
      background: #fff;
      color: #000;
      border-radius: 999px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
    }

    /* Animations */
    .fade-enter { animation: fadeEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeEnter { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    
    .slide-up-modal { animation: slideUpModal 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
    @keyframes slideUpModal { from { transform: translateY(100%); } to { transform: translateY(0); } }

    /* Custom Range Slider (iOS style) */
    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 28px;
      width: 28px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
      margin-top: -12px;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: rgba(255,255,255,0.2);
      border-radius: 2px;
    }
    
    .scrollbar-hide::-webkit-scrollbar { display: none; }
  `}</style>
);

// --- LOGIC: THE 5-PILLAR PROTOCOL GENERATOR ---
const generateProtocol = (data) => {
  const cards = [];
  let idCounter = 1;

  // 1. SLEEP PILLAR
  if (data.sleepQuality < 60) {
    cards.push({
      id: idCounter++,
      pillar: 'SLEEP',
      type: 'RECOVERY',
      title: 'Cortisol Flush',
      subtitle: 'Cold Exposure + Sunlight',
      logic: 'Sleep efficiency < 60%. Circadian anchor required to reset adenosine receptors.',
      toolType: 'TIMER',
      duration: 180,
      completed: false,
      color: 'accent-orange'
    });
  } else {
    cards.push({
      id: idCounter++,
      pillar: 'ACTIVITY',
      type: 'ACTIVATION',
      title: 'Metabolic Prime',
      subtitle: 'Zone 2 Fasted Cardio',
      logic: 'Sleep optimal. System ready for high-output metabolic conditioning.',
      toolType: 'TIMER',
      duration: 1200,
      completed: false,
      color: 'accent-green'
    });
  }

  // 2. COGNITIVE/STRESS PILLAR
  if (data.failurePoint === 'Anxiety') {
    cards.push({
      id: idCounter++,
      pillar: 'STRESS',
      type: 'REGULATION',
      title: 'Vagus Nerve Reset',
      subtitle: 'Physiological Sigh Protocol',
      logic: 'High anxiety detected. Direct intervention on parasympathetic nervous system required.',
      toolType: 'BREATH',
      completed: false,
      color: 'accent-blue'
    });
  } else if (data.failurePoint === 'Brain Fog') {
    cards.push({
      id: idCounter++,
      pillar: 'COGNITIVE',
      type: 'FOCUS',
      title: 'Neural Drive',
      subtitle: '90m Sprint / 40Hz Binaural',
      logic: 'Cognitive load reported as "Foggy". Beta-wave stimulation required.',
      toolType: 'TIMER',
      duration: 5400,
      completed: false,
      color: 'accent-indigo'
    });
  } else {
    cards.push({
      id: idCounter++,
      pillar: 'COGNITIVE',
      type: 'FLOW',
      title: 'Deep Work Block',
      subtitle: 'Single-Task Execution',
      logic: 'Baseline stable. Optimize for flow state duration.',
      toolType: 'TIMER',
      duration: 3600,
      completed: false,
      color: 'accent-indigo'
    });
  }

  // 3. NUTRITION/ENV PILLAR
  if (data.biomarkersConnected) {
    cards.push({
      id: idCounter++,
      pillar: 'NUTRITION',
      type: 'BIOCHEM',
      title: 'Glucose Stabilization',
      subtitle: 'High-Protein / Low-GI',
      logic: 'Biomarker sync indicates insulin sensitivity window. Prioritize protein.',
      toolType: 'CHECKLIST',
      items: ['30g Protein Intake', 'No caffeine after 2PM', 'Hydration + Electrolytes'],
      completed: false,
      color: 'accent-green'
    });
  } else {
    cards.push({
      id: idCounter++,
      pillar: 'ENVIRONMENT',
      type: 'AESTHETICS',
      title: 'Context Design',
      subtitle: 'Visual Field Optimization',
      logic: 'External order regulates internal state. Reduce visual noise.',
      toolType: 'CHECKLIST',
      items: ['Clear workspace', 'Phone in "Deep Stealth" mode', 'Set lighting to cool spectrum'],
      completed: false,
      color: 'text-secondary'
    });
  }

  return cards;
};

// --- COMPONENT: SYSTEM MAP ---
const SystemMap = ({ assessment }) => {
  return (
    <div className="glass-panel p-6 mb-8 relative overflow-hidden group">
      {/* Background Sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex justify-between items-center relative z-10">
        {/* Node 1 */}
        <div className="flex flex-col items-center gap-3">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg border border-white/10 ${assessment.sleepQuality < 60 ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
              <Moon size={20} />
           </div>
           <span className="text-caption">Sleep</span>
        </div>

        {/* Dynamic Connector */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative mx-4">
           <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-mono text-secondary">
             IMPACTS
           </div>
        </div>

        {/* Node 2 */}
        <div className="flex flex-col items-center gap-3">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg border border-white/10 ${assessment.failurePoint === 'Anxiety' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
              <Activity size={20} />
           </div>
           <span className="text-caption">Stress</span>
        </div>

         {/* Dynamic Connector */}
         <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative mx-4">
           <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-mono text-secondary">
             REGULATES
           </div>
        </div>

        {/* Node 3 */}
        <div className="flex flex-col items-center gap-3">
           <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg border border-white/10 bg-white/5">
              <Brain size={20} className="text-white/70" />
           </div>
           <span className="text-caption">Focus</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5">
        <p className="text-sm text-secondary leading-relaxed">
          <span className="text-white font-medium">Insight:</span> Sleep fragmentation ({assessment.sleepQuality}%) is destabilizing your cortisol baseline, manifesting as <span className="text-white">"{assessment.failurePoint || 'Fatigue'}"</span>.
        </p>
      </div>
    </div>
  );
};

// --- COMPONENT: FOCUS TIMER ---
const FocusTimer = ({ durationSeconds = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) setIsActive(false);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setIsActive(false); setTimeLeft(durationSeconds); };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / durationSeconds) * 100;

  return (
    <div className="glass-panel p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Progress Fill */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-500/10 transition-all duration-1000 ease-linear" style={{ height: `${progress}%` }} />
      
      <div className="font-mono text-6xl text-white mb-8 tracking-tighter tabular-nums relative z-10" style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}>{formatTime(timeLeft)}</div>
      
      <div className="flex gap-4 relative z-10">
        <button onClick={toggle} className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-white/10 backdrop-blur-md text-white' : 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105'}`}>
          {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button onClick={reset} className="h-16 w-16 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md text-secondary hover:bg-white/10 transition-all">
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: BREATHING ---
const InteractiveBreathingCircle = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState('Ready');

  useEffect(() => {
    if (!active) { setPhase('Ready'); return; }
    const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    let i = 0;
    setPhase(phases[0]);
    const interval = setInterval(() => { i = (i + 1) % phases.length; setPhase(phases[i]); }, 4000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Outer Glow layers */}
        <div className={`absolute inset-0 bg-blue-500/30 rounded-full blur-3xl transition-all duration-[4000ms] ease-in-out ${active ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`} />
        <div className={`absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl transition-all duration-[4000ms] ease-in-out ${active ? 'scale-125 delay-100' : 'scale-50'}`} />
        
        {/* Main Circle */}
        <div className={`relative w-full h-full rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${active ? 'scale-110 bg-white/5' : 'scale-100 bg-transparent'}`}>
            <div className="text-center z-10">
            <div className="text-caption text-blue-300 mb-2 tracking-widest">VAGUS RESET</div>
            <div className="text-3xl font-light text-white tracking-tight">{phase}</div>
            </div>
        </div>
      </div>
      
      <button onClick={() => setActive(!active)} className={`px-10 py-4 rounded-full font-medium tracking-wide transition-all ${active ? 'bg-white/10 text-white backdrop-blur-md border border-white/10' : 'bg-white text-black shadow-lg hover:scale-105'}`}>
        {active ? 'End Session' : 'Begin Breathing'}
      </button>
    </div>
  );
};

// --- PAGE 1: GATEWAY ---
const Gateway = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");

  const handleEnter = () => {
    setLoading(true);
    const logs = ["Connecting to Core...", "Syncing Biomarkers...", "Calibrating Neural Profile...", "Ready."];
    let i = 0;
    const interval = setInterval(() => {
      setLog(logs[i]);
      i++;
      if (i >= logs.length) { clearInterval(interval); setTimeout(onLogin, 500); }
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="liquid-bg-layer">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="z-10 text-center space-y-12 max-w-sm w-full glass-panel p-12 !rounded-[40px] border-opacity-20 bg-opacity-30">
        <div className="space-y-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-white/20 to-transparent border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-2xl">
            <Hexagon size={40} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-caption text-secondary tracking-[0.4em]">OSNOVIA OS</h1>
        </div>
        {!loading ? (
          <div className="space-y-6 fade-enter">
            <h2 className="text-4xl font-semibold text-white tracking-tight">System<br/>Optimization</h2>
            <button onClick={handleEnter} className="w-full py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-opacity-90 transition-all hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              Initialize
            </button>
          </div>
        ) : (
          <div className="h-12 flex items-center justify-center">
             <div className="text-sm text-blue-300 font-mono animate-pulse">{log}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGE 2: SUCCESS AUDIT ---
const SuccessAudit = ({ onComplete, updateGlobalState }) => {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState({
    integrations: { calendar: false, health: false, blood: false },
    failurePoint: null,
    environmentScore: 50,
    sleepQuality: 70
  });

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else {
      updateGlobalState('assessment', localData);
      updateGlobalState('protocol', generateProtocol(localData));
      // Sync integrations to global settings
      updateGlobalState('settings', localData.integrations);
      onComplete();
    }
  };

  return (
    <div className="h-screen flex flex-col p-8 relative">
       {/* Background Elements */}
       <div className="liquid-bg-layer">
        <div className="orb orb-1 opacity-40" />
        <div className="orb orb-2 opacity-40" />
      </div>

      <div className="flex items-center justify-between mb-8 z-10">
         <button onClick={() => step > 1 && setStep(step - 1)} className={`w-10 h-10 rounded-full glass-panel flex items-center justify-center ${step === 1 ? 'opacity-0' : ''}`}>
           <ChevronLeft size={20} />
         </button>
         <div className="text-caption text-secondary">Step {step} of 5</div>
         <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full fade-enter z-10">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
          {step === 1 && "Data Streams"}
          {step === 2 && "Biomarkers"}
          {step === 3 && "Bottleneck"}
          {step === 4 && "Environment"}
          {step === 5 && "Recovery"}
        </h2>
        <p className="text-lg text-secondary mb-12 font-light">
          {step === 1 && "Connect your digital ecosystem."}
          {step === 2 && "Sync metabolic data for precision."}
          {step === 3 && "What is currently limiting you?"}
          {step === 4 && "Rate your physical context."}
          {step === 5 && "Subjective restoration score."}
        </p>

        <div className="glass-panel p-2 rounded-[32px]">
        {step === 1 && (
          <div className="space-y-2 p-2">
            {[{ id: 'calendar', icon: Calendar, label: "Calendar", detail: "Stress Load" }, { id: 'health', icon: Activity, label: "Health", detail: "HRV / Sleep" }].map((item) => (
              <button key={item.id} onClick={() => setLocalData(p => ({...p, integrations: {...p.integrations, [item.id]: !p.integrations[item.id]}}))} 
                className={`w-full flex items-center justify-between p-4 rounded-[24px] transition-all duration-300 ${localData.integrations[item.id] ? 'bg-white text-black' : 'hover:bg-white/5 text-white'}`}>
                 <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-full ${localData.integrations[item.id] ? 'bg-black/10' : 'bg-white/10'}`}><item.icon size={20} /></div>
                   <div className="text-left"><div className="font-semibold text-base">{item.label}</div><div className={`text-xs ${localData.integrations[item.id] ? 'text-black/60' : 'text-white/40'}`}>{item.detail}</div></div>
                 </div>
                 {localData.integrations[item.id] && <CheckCircle2 size={24} className="text-green-500" />}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="p-8 flex flex-col items-center text-center gap-6">
             <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${localData.integrations.blood ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(48,209,88,0.4)]' : 'bg-white/5 text-secondary border border-white/10'}`}>
                <Droplets size={32} />
             </div>
             <button onClick={() => setLocalData(p => ({...p, integrations: {...p.integrations, blood: !p.integrations.blood}}))} className="btn-liquid px-6 py-2">
               {localData.integrations.blood ? "Data Synced" : "Upload PDF Panel"}
             </button>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-2 p-2">
             {['Brain Fog', 'Anxiety', 'Fatigue', 'Chaos'].map(f => (
               <button key={f} onClick={() => setLocalData({...localData, failurePoint: f})} 
                 className={`p-6 text-sm font-medium rounded-[24px] transition-all ${localData.failurePoint === f ? 'bg-white text-black shadow-lg scale-[1.02]' : 'bg-white/5 text-secondary hover:bg-white/10'}`}>
                 {f}
               </button>
             ))}
          </div>
        )}

        {step === 4 && (
           <div className="p-8">
             <div className="flex justify-between text-caption mb-6"><span>Chaotic</span><span>Zen</span></div>
             <input type="range" min="0" max="100" value={localData.environmentScore} onChange={(e) => setLocalData({...localData, environmentScore: parseInt(e.target.value)})} />
             <div className="mt-8 text-center text-5xl font-light text-white">{localData.environmentScore}</div>
           </div>
        )}

        {step === 5 && (
           <div className="p-8">
             <div className="flex justify-between text-caption mb-6"><span>Drained</span><span>Charged</span></div>
             <input type="range" min="0" max="100" value={localData.sleepQuality} onChange={(e) => setLocalData({...localData, sleepQuality: parseInt(e.target.value)})} />
             <div className="mt-8 text-center text-5xl font-light text-white">{localData.sleepQuality}%</div>
           </div>
        )}
        </div>

        <button onClick={nextStep} className="mt-8 w-full py-4 bg-white text-black text-sm font-bold rounded-full hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          {step === 5 ? "Generate Protocol" : "Continue"}
        </button>
      </div>
    </div>
  );
};

// --- PAGE 4: PROTOCOL DETAIL ---
const ProtocolDetail = ({ card, onClose, onComplete }) => {
  if (!card) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-8 backdrop-blur-sm bg-black/20">
      <div className="bg-[#1C1C1E] sm:rounded-[40px] rounded-t-[40px] w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden slide-up-modal border border-white/10 relative">
        
        {/* Modal Header */}
        <div className="p-6 flex justify-between items-center border-b border-white/5 bg-white/5 backdrop-blur-xl absolute top-0 w-full z-20">
          <div className="text-caption text-secondary">Protocol Module</div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto pt-24 pb-32 px-8 custom-scrollbar">
           <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mb-6 bg-white/10 text-white border border-white/10`}>
             {card.type}
           </div>
           
           <h1 className="text-4xl font-semibold text-white mb-2">{card.title}</h1>
           <p className="text-xl text-secondary font-light mb-8">{card.subtitle}</p>

           <div className="glass-panel p-6 mb-8 !bg-white/5">
             <h3 className="text-caption mb-3 text-blue-400">Scientific Mechanism</h3>
             <p className="text-secondary leading-relaxed font-light">{card.logic}</p>
           </div>

           <div className="mb-8">
             {card.toolType === 'TIMER' && <FocusTimer durationSeconds={card.duration} />}
             {card.toolType === 'BREATH' && <InteractiveBreathingCircle />}
             {card.toolType === 'CHECKLIST' && (
               <div className="glass-panel p-6">
                 <ul className="space-y-4">
                   {card.items && card.items.map((item, idx) => (
                     <li key={idx} className="flex gap-4 items-center text-secondary">
                       <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                         <div className="w-3 h-3 rounded-full bg-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
                       </div>
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
             )}
           </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E] to-transparent z-20">
          <button onClick={() => onComplete(card.id)} className="w-full py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-lg">
            <Check size={18} /> Complete Session
          </button>
        </div>
      </div>
    </div>
  );
};

// --- VIEWS ---

// SETTINGS VIEW
const SettingsView = ({ settings, updateSettings, user }) => {
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="p-6 pt-12 fade-enter max-w-lg mx-auto pb-32">
      <h2 className="text-3xl font-semibold text-white mb-8">Settings</h2>

      {/* Profile Section */}
      <div className="glass-panel p-4 mb-8 flex items-center gap-4 !rounded-[24px]">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-medium text-lg">{user.name}</div>
          <div className="text-secondary text-sm">Bio-hacker Level 1</div>
        </div>
        <button className="ml-auto px-4 py-2 bg-white/10 rounded-full text-xs font-semibold text-white hover:bg-white/20 transition-colors">Edit</button>
      </div>

      {/* Integrations Group */}
      <h3 className="text-caption text-secondary mb-3 pl-4">Data Sources</h3>
      <div className="glass-panel overflow-hidden mb-8 !rounded-[24px]">
        {[
          { id: 'calendar', icon: Calendar, label: 'Calendar Sync', color: 'bg-red-500' },
          { id: 'health', icon: Activity, label: 'Health Data', color: 'bg-green-500' },
          { id: 'blood', icon: Droplets, label: 'Biomarkers', color: 'bg-pink-500' }
        ].map((item, idx, arr) => (
          <div key={item.id} className={`p-4 flex items-center justify-between ${idx !== arr.length - 1 ? 'border-b border-white/5' : ''}`}>
             <div className="flex items-center gap-3">
               <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-white shadow-md`}>
                 <item.icon size={16} />
               </div>
               <span className="text-white font-medium">{item.label}</span>
             </div>
             <button 
               onClick={() => updateSettings(item.id)}
               className={`w-12 h-7 rounded-full transition-colors duration-300 relative ${settings[item.id] ? 'bg-green-500' : 'bg-white/10'}`}
             >
               <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${settings[item.id] ? 'translate-x-5' : 'translate-x-0'}`} />
             </button>
          </div>
        ))}
      </div>

       {/* System Group */}
       <h3 className="text-caption text-secondary mb-3 pl-4">System Preferences</h3>
       <div className="glass-panel overflow-hidden !rounded-[24px]">
          <div className="p-4 flex items-center justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md">
                 <Zap size={16} />
               </div>
               <span className="text-white font-medium">Haptic Feedback</span>
             </div>
             <button className="w-12 h-7 rounded-full bg-green-500 relative">
               <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full translate-x-5 shadow-sm" />
             </button>
          </div>
           <div className="p-4 flex items-center justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-md">
                 <Bell size={16} />
               </div>
               <span className="text-white font-medium">Push Notifications</span>
             </div>
              <button 
               onClick={() => setNotifications(!notifications)}
               className={`w-12 h-7 rounded-full transition-colors duration-300 relative ${notifications ? 'bg-green-500' : 'bg-white/10'}`}
             >
               <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
             </button>
          </div>
          <div className="p-4 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-md">
                 <Shield size={16} />
               </div>
               <span className="text-white font-medium">Privacy Mode</span>
             </div>
             <button className="w-12 h-7 rounded-full bg-white/10 relative">
               <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full translate-x-0 shadow-sm" />
             </button>
          </div>
       </div>
       
       <button className="mt-8 w-full py-3 bg-red-500/10 text-red-500 font-medium rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
         <LogOut size={16} /> Sign Out
       </button>
       
       <div className="mt-8 text-center text-caption text-secondary/40">
         Osnovia v2.4.0 (Build 9942) <br/> Designed in California
       </div>
    </div>
  );
};

// MISSION CONTROL
const MissionControl = ({ onCardClick, cards, assessment }) => {
  return (
    <div className="p-6 pt-12 fade-enter max-w-lg mx-auto pb-32">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">Good Morning</h1>
          <div className="flex items-center gap-2 text-caption text-green-400">
            <Activity size={12} /> <span>System Optimized</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      </div>

      <SystemMap assessment={assessment} />

      <h2 className="text-xl font-semibold text-white mb-4 pl-1">Directives</h2>
      <div className="space-y-4">
        {cards.map((card) => (
          <div key={card.id} onClick={() => onCardClick(card)} 
            className={`group p-6 rounded-[32px] glass-panel cursor-pointer relative overflow-hidden transition-all duration-300 ${card.completed ? 'opacity-50 grayscale' : 'hover:scale-[1.02] hover:bg-white/10'}`}>
            <div className="flex justify-between items-start mb-2 relative z-10">
               <span className={`text-caption ${card.completed ? 'text-secondary' : 'text-blue-400'}`}>{card.pillar}</span>
               <div className={`h-6 w-6 rounded-full border flex items-center justify-center transition-colors ${card.completed ? 'bg-green-500 border-green-500 text-black' : 'border-white/20'}`}>
                 {card.completed && <Check size={14} strokeWidth={3} />}
               </div>
            </div>
            <h3 className="text-xl text-white font-medium mb-1 relative z-10">{card.title}</h3>
            <p className="text-sm text-secondary relative z-10">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// VAULT
const Vault = () => {
  const [filter, setFilter] = useState('ALL');
  const pillars = ['ALL', 'SLEEP', 'NUTRITION', 'STRESS', 'ACTIVITY', 'COGNITIVE'];
  
  const content = [
    { cat: 'SLEEP', title: 'Huberman Sleep Kit', sub: 'Protocols for Deep Rest', color: 'bg-indigo-500' },
    { cat: 'NUTRITION', title: 'Metabolic Flexibility', sub: 'Glucose management', color: 'bg-green-500' },
    { cat: 'STRESS', title: 'Physiological Sigh', sub: 'Instant anxiety reduction', color: 'bg-blue-500' },
    { cat: 'ACTIVITY', title: 'Zone 2 Training', sub: 'Mitochondrial health', color: 'bg-orange-500' },
    { cat: 'COGNITIVE', title: 'Deep Work Rules', sub: 'Cal Newport Methodology', color: 'bg-purple-500' }
  ];

  const filteredContent = filter === 'ALL' ? content : content.filter(c => c.cat === filter);

  return (
    <div className="p-6 pt-12 fade-enter max-w-lg mx-auto pb-32">
      <h2 className="text-3xl font-semibold text-white mb-6">Library</h2>
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
         {pillars.map(cat => (
           <button key={cat} onClick={() => setFilter(cat)} 
             className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${filter === cat ? 'bg-white text-black' : 'bg-white/10 text-secondary hover:bg-white/20'}`}>
             {cat}
           </button>
         ))}
      </div>
      <div className="space-y-3">
        {filteredContent.map((item, i) => (
          <div key={i} className="flex gap-5 p-5 glass-panel !rounded-[24px] items-center hover:bg-white/10 transition-colors cursor-pointer group">
            <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <div className="text-caption mb-1 opacity-70">{item.cat}</div>
              <div className="text-white font-medium text-lg">{item.title}</div>
              <div className="text-secondary text-sm">{item.sub}</div>
            </div>
            <div className="flex-1 text-right">
              <ChevronRight size={20} className="text-white/20 inline-block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// EVOLUTION
const Evolution = ({ stats }) => {
  const scale = (val) => 10 + (val * 4);
  const pSleep = `50,${50 - scale(stats.sleep)}`;
  const pNut = `${50 + scale(stats.nutrition) * 0.95},${50 - scale(stats.nutrition) * 0.31}`;
  const pAct = `${50 + scale(stats.activity) * 0.59},${50 + scale(stats.activity) * 0.81}`;
  const pStr = `${50 - scale(stats.stress) * 0.59},${50 + scale(stats.stress) * 0.81}`;
  const pCog = `${50 - scale(stats.cognitive) * 0.95},${50 - scale(stats.cognitive) * 0.31}`;
  const polyPoints = `${pSleep} ${pNut} ${pAct} ${pStr} ${pCog}`;

  return (
    <div className="p-6 pt-12 fade-enter max-w-lg mx-auto pb-32">
      <h2 className="text-3xl font-semibold text-white mb-8">Evolution</h2>
      
      <div className="relative aspect-square glass-panel !rounded-full mb-8 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
         <div className="absolute top-8 left-0 right-0 text-center text-caption text-secondary">Bio-Marker Radar</div>
         
         <svg viewBox="0 0 100 100" className="w-72 h-72 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <polygon points="50,10 95,41 79,90 21,90 5,41" fill="white" fillOpacity="0.05" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
            <polygon points="50,30 72,45 64,70 36,70 28,45" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            
            <polygon points={polyPoints} fill="rgba(10, 132, 255, 0.4)" stroke="#0A84FF" strokeWidth="2" strokeLinejoin="round" />
            
            <circle cx="50" cy={50 - scale(stats.sleep)} r="2" fill="white" />
            <circle cx={50 + scale(stats.nutrition) * 0.95} cy={50 - scale(stats.nutrition) * 0.31} r="2" fill="white" />
         </svg>
         
         {/* Labels */}
         <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-md">SLEEP</div>
         <div className="absolute bottom-16 right-6 text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-md">ACT</div>
         <div className="absolute bottom-16 left-6 text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-md">STR</div>
      </div>

      <div className="glass-panel p-6 !rounded-[32px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-secondary font-medium">Cognitive Load</span>
          <span className="text-white font-bold">64%</span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[64%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('GATEWAY');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCard, setActiveCard] = useState(null);
  const [consultantOpen, setConsultantOpen] = useState(false);
  
  const [globalState, setGlobalState] = useState({
    user: { name: 'User' },
    settings: { calendar: false, health: false, blood: false },
    assessment: { sleepQuality: 50, failurePoint: null, environmentScore: 50 },
    cards: [],
    stats: { sleep: 4, nutrition: 3, activity: 5, stress: 3, cognitive: 6 }
  });

  const updateGlobalState = (key, value) => {
    setGlobalState(prev => {
      if (key === 'completeCard') {
         const card = prev.cards.find(c => c.id === value);
         const newStats = { ...prev.stats };
         const p = card.pillar.toLowerCase();
         if (newStats[p]) newStats[p] = Math.min(10, newStats[p] + 1);
         return { 
           ...prev, 
           cards: prev.cards.map(c => c.id === value ? { ...c, completed: true } : c),
           stats: newStats
         };
      }
      if (key === 'protocol') return { ...prev, cards: value };
      if (key === 'settings') return { ...prev, settings: value };
      return { ...prev, [key]: value };
    });
  };

  const updateSettings = (id) => {
    updateGlobalState('settings', { ...globalState.settings, [id]: !globalState.settings[id] });
  };

  if (view === 'GATEWAY') return <><GlobalStyles /><Gateway onLogin={() => setView('ONBOARDING')} /></>;
  if (view === 'ONBOARDING') return <><GlobalStyles /><SuccessAudit onComplete={() => setView('DASHBOARD')} updateGlobalState={updateGlobalState} /></>;

  return (
    <div className="h-screen bg-black flex flex-col relative text-white font-sans overflow-hidden selection:bg-blue-500/30">
      <GlobalStyles />
      
      {/* GLOBAL BACKGROUND */}
      <div className="liquid-bg-layer">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <main className="flex-1 overflow-y-auto pb-24 custom-scrollbar z-10">
        {activeTab === 'dashboard' && <MissionControl cards={globalState.cards} onCardClick={setActiveCard} assessment={globalState.assessment} />}
        {activeTab === 'vault' && <Vault />}
        {activeTab === 'evolution' && <Evolution stats={globalState.stats} />}
        {activeTab === 'settings' && <SettingsView settings={globalState.settings} updateSettings={updateSettings} user={globalState.user} />}
      </main>
      
      {/* GLASS DOCK */}
      <div className="fixed bottom-0 w-full z-30 pb-6 pt-2 px-6">
        <div className="glass-dock h-20 max-w-sm mx-auto rounded-[32px] flex justify-around items-center px-2 shadow-2xl border border-white/10">
          {['dashboard', 'vault', 'evolution', 'settings'].map(id => (
            <button key={id} onClick={() => setActiveTab(id)} className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${activeTab === id ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-secondary hover:text-white hover:bg-white/5'}`}>
              {id === 'dashboard' && <Layout size={24} strokeWidth={activeTab === id ? 2.5 : 2} />}
              {id === 'vault' && <BookOpen size={24} strokeWidth={activeTab === id ? 2.5 : 2} />}
              {id === 'evolution' && <Dna size={24} strokeWidth={activeTab === id ? 2.5 : 2} />}
              {id === 'settings' && <Settings size={24} strokeWidth={activeTab === id ? 2.5 : 2} />}
              {activeTab === id && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white" />}
            </button>
          ))}
        </div>
      </div>

      {activeCard && <ProtocolDetail card={activeCard} onClose={() => setActiveCard(null)} onComplete={(id) => { updateGlobalState('completeCard', id); setActiveCard(null); }} />}
      
      {/* AI FAB */}
      {activeTab === 'dashboard' && !activeCard && (
        <button onClick={() => setConsultantOpen(true)} className="fixed bottom-32 right-6 h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform z-20 text-black">
           <MessageSquare size={24} fill="currentColor" />
        </button>
      )}

      {consultantOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setConsultantOpen(false)}>
           <div className="glass-dock border-t border-white/20 h-[60vh] rounded-t-[40px] p-6 flex flex-col slide-up-modal">
             <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 animate-pulse flex items-center justify-center">
                    <Brain size={16} className="text-white" />
                  </div>
                  <span className="font-semibold text-white">Osnovia AI</span>
               </div>
               <button onClick={() => setConsultantOpen(false)} className="p-2 bg-white/10 rounded-full"><X size={16} className="text-secondary" /></button>
             </div>
             <div className="flex-1 flex flex-col items-center justify-center text-secondary gap-4">
                <Mic size={48} className="opacity-20" />
                <p>How can I assist your optimization today?</p>
             </div>
             <div className="mt-4 flex gap-3">
                <input type="text" placeholder="Ask anything..." className="flex-1 bg-white/5 rounded-full px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-colors border border-white/5" />
                <button className="p-4 bg-white text-black rounded-full shadow-lg"><Send size={20} className="ml-0.5" /></button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}