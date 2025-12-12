import React, { useState, useEffect, useRef } from 'react';
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
  Zap
} from 'lucide-react';

// --- STYLES & FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600&display=swap');
    
    :root {
      --bg-deep: #121212;
      --bg-slate: #18181B;
      --bg-card: #27272A;
      --text-primary: #F3F4F6;
      --text-secondary: #9CA3AF;
      --accent-blue: #3B82F6; 
      --accent-orange: #F97316;
      --success: #10B981;
      --font-mono: 'JetBrains Mono', monospace;
      --font-sans: 'Inter', sans-serif;
    }

    body {
      background-color: var(--bg-deep);
      color: var(--text-primary);
      font-family: var(--font-sans);
      overflow-x: hidden;
      margin: 0;
    }

    /* Utilities */
    .font-mono { font-family: var(--font-mono); }
    .text-accent { color: var(--accent-blue); }
    .bg-accent { background-color: var(--accent-blue); }
    
    /* Animations */
    .fade-enter { animation: fadeEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeEnter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

    .breath-active { animation: breath 8s infinite ease-in-out; }
    @keyframes breath {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.5); opacity: 0.2; }
    }

    .animate-blink { animation: blink 1s step-end infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

    /* Custom Slider */
    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: var(--text-primary);
      cursor: pointer;
      margin-top: -8px;
      box-shadow: 0 0 10px rgba(255,255,255,0.5);
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #333;
      border-radius: 2px;
    }
    
    /* Scrollbar hide */
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// --- HELPER: PROTOCOL GENERATOR ---
// Generates specific cards based on assessment inputs
const generateProtocol = (data) => {
  const cards = [];
  let idCounter = 1;

  // 1. BIO CARD Logic
  if (data.sleepQuality < 50) {
    cards.push({
      id: idCounter++,
      type: 'BIO-PRIMER',
      title: 'Cortisol Reset',
      subtitle: 'Cold Exposure + 30g Protein',
      logic: 'Sleep quality was reported as suboptimal (<50%). Cold exposure is required to force a cortisol reset and clear adenosine.',
      toolType: 'TIMER',
      duration: 180, // 3 min cold shower
      completed: false
    });
  } else {
    cards.push({
      id: idCounter++,
      type: 'BIO-PRIMER',
      title: 'Zone 2 Activation',
      subtitle: '15 Min Fasted Movement',
      logic: 'Sleep quality is optimal. Capitalize on high recovery with fasted movement to peak metabolic rate.',
      toolType: 'TIMER',
      duration: 900, // 15 min
      completed: false
    });
  }

  // 2. PSYCH/WORK CARD Logic
  if (data.failurePoint === 'Anxiety') {
    cards.push({
      id: idCounter++,
      type: 'PSYCH-ANCHOR',
      title: 'Physiological Sighs',
      subtitle: 'Double Inhale, Long Exhale',
      logic: 'You reported Anxiety as a primary blocker. This breathing protocol directly engages the parasympathetic nervous system to lower heart rate.',
      toolType: 'BREATH',
      completed: false
    });
  } else if (data.failurePoint === 'Brain Fog') {
    cards.push({
      id: idCounter++,
      type: 'FOCUS-BLOCK',
      title: 'Deep Work Sprint',
      subtitle: '90 Min / 40Hz Binaural Beats',
      logic: 'For Brain Fog, we use high-frequency binaural beats to stimulate beta wave production and cut through cognitive haze.',
      toolType: 'TIMER',
      duration: 5400, // 90 min
      completed: false
    });
  } else {
    // Default
    cards.push({
      id: idCounter++,
      type: 'EXECUTION',
      title: 'Momentum Block',
      subtitle: '3 Tasks / 45 Minutes',
      logic: 'To counter general fatigue or procrastination, we use a shorter, high-intensity block to build dopamine momentum.',
      toolType: 'TIMER',
      duration: 2700,
      completed: false
    });
  }

  // 3. ENV CARD Logic
  if (data.environmentScore < 60) {
    cards.push({
      id: idCounter++,
      type: 'ENV-DESIGN',
      title: 'Visual Field Clear',
      subtitle: 'Remove all non-essential items',
      logic: 'Low environmental score correlates with high cortisol. Clearing your visual field reduces background processing load by up to 20%.',
      toolType: 'CHECKLIST',
      items: ['Clear desk surface', 'Phone in drawer', 'Adjust lighting to cool white'],
      completed: false
    });
  } else {
    cards.push({
      id: idCounter++,
      type: 'STYLE-ARCH',
      title: 'Authority Framing',
      subtitle: 'Structure Jacket / Ironed Shirt',
      logic: 'Environment is stable. Now we optimize for "Enclothed Cognition" to boost subjective authority and confidence.',
      toolType: 'CHECKLIST',
      items: ['Wear structured jacket', 'Grooming check', 'Scent anchor (Cologne/Perfume)'],
      completed: false
    });
  }

  return cards;
};

// --- COMPONENT: FOCUS TIMER ---
const FocusTimer = ({ durationSeconds = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional sound or notification here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(durationSeconds);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8 bg-[#1E1E1E] rounded flex flex-col items-center justify-center border border-zinc-800">
      <div className="font-mono text-5xl text-white mb-6 tracking-widest">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        <button 
          onClick={toggle}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-colors ${isActive ? 'bg-zinc-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
        >
          {isActive ? <Pause size={14} /> : <Play size={14} />} {isActive ? 'Pause' : 'Start Focus'}
        </button>
        <button 
          onClick={reset}
          className="p-3 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: INTERACTIVE BREATHING CIRCLE ---
const InteractiveBreathingCircle = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState('Ready');

  useEffect(() => {
    if (!active) {
      setPhase('Ready');
      return;
    }
    
    // Simple mock cycle for UI feedback
    const phases = ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Hold (4s)'];
    let i = 0;
    setPhase(phases[0]);
    
    const interval = setInterval(() => {
      i = (i + 1) % phases.length;
      setPhase(phases[i]);
    }, 4000); // 4 second box breathing

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <div className={`absolute inset-0 bg-blue-500 rounded-full blur-xl transition-all duration-[4000ms] ${active ? 'breath-active' : 'opacity-0 scale-50'}`} />
        <div className={`absolute inset-4 border-2 border-blue-500/30 rounded-full transition-all duration-[4000ms] ${active ? 'scale-110' : 'scale-100'}`} />
        <div className="text-center z-10">
          <div className="font-mono text-xs text-blue-300 mb-1">BOX BREATH</div>
          <div className="font-mono text-xl text-white animate-pulse">{phase}</div>
        </div>
      </div>
      
      <button 
        onClick={() => setActive(!active)}
        className={`px-8 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-colors ${active ? 'bg-zinc-800 text-zinc-300' : 'bg-blue-600 text-white'}`}
      >
        {active ? 'Stop Session' : 'Begin Breathing'}
      </button>
    </div>
  );
};

// --- PAGE 1: GATEWAY (LOGIN) ---
const Gateway = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");

  const handleEnter = () => {
    setLoading(true);
    const logs = ["Authenticating...", "Fetching Biological Profile...", "Syncing Capacity Architecture...", "System Ready."];
    let i = 0;
    const interval = setInterval(() => {
      setLog(logs[i]);
      i++;
      if (i >= logs.length) {
        clearInterval(interval);
        setTimeout(onLogin, 500);
      }
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#121212] to-[#121212]" />
      
      <div className="z-10 text-center space-y-12 max-w-sm w-full">
        <div className="space-y-6">
          <Hexagon size={48} strokeWidth={1} className="text-white mx-auto animate-pulse" />
          <h1 className="font-mono text-xs tracking-[0.3em] text-zinc-500">OSNOVIA SYSTEMS</h1>
        </div>

        {!loading ? (
          <div className="space-y-8 fade-enter">
            <h2 className="text-2xl font-light text-white">Initialize Your Protocol</h2>
            
            <div className="space-y-4">
              <button onClick={handleEnter} className="w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Enter System
              </button>
              <div className="text-zinc-600 text-xs font-mono">or via Magic Link</div>
            </div>
          </div>
        ) : (
          <div className="font-mono text-xs text-blue-500 h-8">
            {`> ${log}`}
            <span className="animate-blink">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGE 2: SUCCESS AUDIT (ENHANCED ONBOARDING) ---
const SuccessAudit = ({ onComplete, updateGlobalState, globalState }) => {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState({
    integrations: { calendar: false, health: false },
    failurePoint: null,
    environmentScore: 50,
    sleepQuality: 70
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else {
      // Finalize and generate
      updateGlobalState('assessment', localData);
      const generatedCards = generateProtocol(localData);
      updateGlobalState('protocol', generatedCards);
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleIntegration = (key) => {
    setLocalData(prev => ({
      ...prev,
      integrations: { ...prev.integrations, [key]: !prev.integrations[key] }
    }));
  };

  return (
    <div className="h-screen flex flex-col p-8 bg-[#121212]">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
         <button 
            onClick={prevStep} 
            disabled={step === 1}
            className={`p-2 rounded-full border border-zinc-800 ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
         >
           <ChevronLeft size={20} />
         </button>
         <div className="font-mono text-xs text-blue-500">STEP 0{step} // 04</div>
         <div className="w-8" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full fade-enter">
        <h2 className="text-3xl font-light text-white leading-tight mb-12">
          {step === 1 && "Integrate Data Streams"}
          {step === 2 && "Primary Constraint"}
          {step === 3 && "Environment Audit"}
          {step === 4 && "Biological Status"}
        </h2>

        {/* STEP 1: INTEGRATIONS */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-zinc-400 text-sm mb-8">Connect external data for context-aware protocols. Optional.</p>
            {[
              { id: 'calendar', icon: Calendar, label: "Calendar", detail: "Schedule Sync" },
              { id: 'health', icon: Activity, label: "Health Data", detail: "Bio-Metrics" }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => toggleIntegration(item.id)}
                className={`w-full flex items-center justify-between p-4 border rounded transition-all ${localData.integrations[item.id] ? 'bg-[#1E1E1E] border-blue-500' : 'bg-[#1E1E1E] border-zinc-800 hover:border-zinc-600'}`}
              >
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-zinc-800 rounded-full"><item.icon size={16} className="text-zinc-400" /></div>
                   <div className="text-left">
                     <div className="text-white text-sm">{item.label}</div>
                     <div className="text-zinc-500 text-[10px] font-mono">{item.detail}</div>
                   </div>
                 </div>
                 <div className={`h-2 w-2 rounded-full transition-all ${localData.integrations[item.id] ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-zinc-700'}`} />
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: FAILURE POINT */}
        {step === 2 && (
          <div className="space-y-4">
             <label className="text-sm text-zinc-400">What is your primary failure point today?</label>
             <div className="grid grid-cols-2 gap-3">
               {['Brain Fog', 'Anxiety', 'Fatigue', 'Chaos'].map(f => (
                 <button 
                   key={f}
                   onClick={() => setLocalData({...localData, failurePoint: f})}
                   className={`p-4 text-xs font-mono border rounded transition-all ${localData.failurePoint === f ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                 >
                   {f}
                 </button>
               ))}
             </div>
          </div>
        )}

        {/* STEP 3: ENVIRONMENT */}
        {step === 3 && (
          <div className="space-y-8">
             <p className="text-sm text-zinc-400">Rate your current physical environment.</p>
             <div className="relative pt-6">
               <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-widest absolute top-0 w-full">
                 <span>Chaotic</span>
                 <span>Organized</span>
               </div>
               <input 
                  type="range" 
                  min="0" max="100"
                  value={localData.environmentScore} 
                  onChange={(e) => setLocalData({...localData, environmentScore: parseInt(e.target.value)})} 
                  className="w-full"
               />
               <div className="mt-4 text-center font-mono text-2xl text-white">{localData.environmentScore}%</div>
             </div>
          </div>
        )}

        {/* STEP 4: SLEEP / BIO */}
        {step === 4 && (
          <div className="space-y-8">
             <p className="text-sm text-zinc-400">How was your sleep quality last night?</p>
             <div className="relative pt-6">
               <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-widest absolute top-0 w-full">
                 <span>Fragmented</span>
                 <span>Restorative</span>
               </div>
               <input 
                  type="range" 
                  min="0" max="100"
                  value={localData.sleepQuality} 
                  onChange={(e) => setLocalData({...localData, sleepQuality: parseInt(e.target.value)})} 
                  className="w-full"
               />
               <div className="mt-4 text-center font-mono text-2xl text-white">{localData.sleepQuality}%</div>
             </div>
          </div>
        )}

        <button onClick={nextStep} className="mt-12 w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
          {step === 4 ? "Generate Protocol" : "Continue"}
        </button>
      </div>
    </div>
  );
};

// --- PAGE 4: PROTOCOL DETAIL (DRILL DOWN) ---
const ProtocolDetail = ({ card, onClose, onComplete }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col slide-up">
      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <button onClick={onClose} className="p-2 -ml-2 text-zinc-500 hover:text-white"><X /></button>
        <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Protocol 0{card.id}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="mb-8">
           <div className="inline-block px-2 py-1 bg-blue-900/30 text-blue-400 font-mono text-[10px] uppercase mb-4 rounded border border-blue-900/50">
             {card.type}
           </div>
           <h1 className="text-4xl font-light text-white mb-2">{card.title}</h1>
           <p className="text-zinc-400 text-lg font-light">{card.subtitle}</p>
        </div>

        {/* The Why */}
        <div className="mb-12 p-6 bg-[#1E1E1E] rounded border-l-2 border-blue-500">
          <h3 className="font-mono text-xs text-blue-500 uppercase mb-2">System Logic</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {card.logic}
          </p>
        </div>

        {/* The Active Tool */}
        <div className="mb-12">
          <h3 className="font-mono text-xs text-zinc-500 uppercase mb-4">Active Tool</h3>
          {card.toolType === 'TIMER' && <FocusTimer durationSeconds={card.duration} />}
          {card.toolType === 'BREATH' && <InteractiveBreathingCircle />}
          {card.toolType === 'CHECKLIST' && (
            <div className="p-6 bg-[#1E1E1E] rounded border border-zinc-800">
              <ul className="space-y-4">
                {card.items && card.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-zinc-300">
                    <CheckCircle2 size={16} className="text-zinc-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#121212] to-transparent">
        <button 
          onClick={() => onComplete(card.id)}
          className="w-full py-4 bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
        >
          <Check size={16} /> Mark Complete
        </button>
      </div>
    </div>
  );
};

// --- CORE LAYOUT & NAVIGATION ---
const DashboardLayout = ({ children, currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', icon: Layout, label: 'Mission' },
    { id: 'vault', icon: BookOpen, label: 'Vault' },
    { id: 'evolution', icon: TrendingUp, label: 'Evolution' },
    { id: 'settings', icon: Settings, label: 'Core' },
  ];

  return (
    <div className="h-screen bg-[#121212] flex flex-col relative">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>
      
      {/* Bottom Dock */}
      <div className="fixed bottom-0 w-full bg-[#121212]/90 backdrop-blur border-t border-zinc-900 pb-8 pt-2 z-20">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-1 p-2 ${currentView === item.id ? 'text-white' : 'text-zinc-600'}`}
            >
              <item.icon size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- VIEWS ---

// PAGE 3: MISSION CONTROL
const MissionControl = ({ onCardClick, cards, assessment }) => {
  const statusMessage = assessment.failurePoint === 'Anxiety' ? 'HIGH CORTISOL DETECTED' : 
                        assessment.sleepQuality < 60 ? 'RECOVERY MODE ACTIVE' : 'PEAK PERFORMANCE';
  
  const statusColor = assessment.sleepQuality < 60 ? 'text-orange-500' : 'text-emerald-500';

  return (
    <div className="p-6 pt-12 fade-enter">
      {/* Heads-Up Display */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl text-white font-light mb-1">Good Morning.</h1>
          <div className={`flex items-center gap-2 text-xs font-mono ${statusColor}`}>
            <Activity size={12} />
            <span>STATUS: {statusMessage}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] rounded-full border border-zinc-800">
          <Battery size={14} className={statusColor} />
          <span className="text-xs font-mono text-white">{assessment.sleepQuality}%</span>
        </div>
      </div>

      {/* Daily Trinity */}
      <div className="space-y-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            onClick={() => onCardClick(card)}
            className={`
              group p-6 rounded-lg border transition-all cursor-pointer relative overflow-hidden
              ${card.completed ? 'bg-[#121212] border-zinc-800 opacity-50' : 'bg-[#1E1E1E] border-zinc-800 hover:border-zinc-600'}
            `}
          >
            <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{card.type}</span>
               <div className={`h-4 w-4 rounded border flex items-center justify-center ${card.completed ? 'bg-emerald-900 border-emerald-900 text-emerald-500' : 'border-zinc-600'}`}>
                 {card.completed && <Check size={10} />}
               </div>
            </div>
            <h3 className="text-xl text-white font-light mb-1">{card.title}</h3>
            <p className="text-sm text-zinc-400 mb-4">{card.subtitle}</p>
            
            <div className="flex items-center gap-2 text-xs font-mono text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>INITIALIZE</span> <ChevronRight size={12} />
            </div>
          </div>
        ))}
      </div>
      
      {cards.length === 0 && (
         <div className="text-center mt-12 text-zinc-500 text-sm">No protocols generated yet. Complete audit.</div>
      )}
    </div>
  );
};

// PAGE 6: THE VAULT (FUNCTIONAL)
const Vault = () => {
  const [filter, setFilter] = useState('ALL');
  
  const content = [
    { cat: 'STYLE', title: 'The Executive Uniform', sub: '3 Brands for your Body Type' },
    { cat: 'BIO', title: 'Cognitive Endurance', sub: 'Supplement Stack v4.0' },
    { cat: 'PSYCH', title: 'Conflict Resolution', sub: 'Mental Models for Negotiation' },
    { cat: 'BIO', title: 'Huberman Sleep Kit', sub: 'Protocols for Deep Rest' },
    { cat: 'PSYCH', title: 'Dopamine Detox', sub: 'Resetting baseline motivation' }
  ];

  const filteredContent = filter === 'ALL' ? content : content.filter(c => c.cat === filter);

  return (
    <div className="p-6 pt-12 fade-enter">
      <h2 className="text-2xl text-white font-light mb-6">Intelligence Vault</h2>
      
      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
         {['ALL', 'BIO', 'PSYCH', 'STYLE'].map(cat => (
           <button 
             key={cat} 
             onClick={() => setFilter(cat)}
             className={`px-4 py-2 rounded text-xs font-mono border transition-colors ${filter === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      <div className="space-y-4">
        {filteredContent.map((item, i) => (
          <div key={i} className="flex gap-4 p-4 bg-[#1E1E1E] border border-zinc-800 rounded hover:border-zinc-600 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
              {item.cat === 'BIO' ? <Zap size={20} /> : item.cat === 'PSYCH' ? <Brain size={20} /> : <Wind size={20} />}
            </div>
            <div>
              <div className="text-[10px] font-mono text-blue-500 uppercase mb-1">{item.cat}</div>
              <div className="text-white text-sm mb-1 group-hover:underline">{item.title}</div>
              <div className="text-zinc-500 text-xs">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PAGE 7: EVOLUTION (REACTIVE)
const Evolution = ({ stats }) => {
  // Simple calculation for chart points based on completion
  // Center is 50,50. Range is roughly 10-50 radius.
  const bioVal = 10 + (stats.bio * 4); // max 40
  const psychVal = 10 + (stats.psych * 4);
  const envVal = 10 + (stats.env * 4);
  
  // Triangle points
  // Top (Bio): 50, 50-bioVal
  // Bottom Right (Psych): 50 + psychVal*0.86, 50 + psychVal*0.5
  // Bottom Left (Env): 50 - envVal*0.86, 50 + envVal*0.5
  
  const points = `
    50,${50 - bioVal} 
    ${50 + psychVal * 0.86},${50 + psychVal * 0.5} 
    ${50 - envVal * 0.86},${50 + envVal * 0.5}
  `;

  return (
    <div className="p-6 pt-12 fade-enter">
      <h2 className="text-2xl text-white font-light mb-8">Evolution Metrics</h2>
      
      {/* Reactive Radar Chart */}
      <div className="relative aspect-square bg-[#1E1E1E] rounded-lg border border-zinc-800 mb-8 flex items-center justify-center">
         <div className="absolute top-4 left-4 font-mono text-xs text-zinc-500">REAL-TIME BALANCE</div>
         <svg viewBox="0 0 100 100" className="w-64 h-64 opacity-90 transition-all duration-1000">
            {/* Background Grid */}
            <polygon points="50,10 85,70 15,70" fill="none" stroke="#333" strokeWidth="0.5" />
            <polygon points="50,30 67,60 33,60" fill="none" stroke="#333" strokeWidth="0.5" />
            
            {/* Dynamic Data */}
            <polygon points={points} fill="rgba(59, 130, 246, 0.4)" stroke="#3B82F6" strokeWidth="2" />
            
            {/* Dots */}
            <circle cx="50" cy={50 - bioVal} r="2" fill="#fff" />
            <circle cx={50 + psychVal * 0.86} cy={50 + psychVal * 0.5} r="2" fill="#fff" />
            <circle cx={50 - envVal * 0.86} cy={50 + envVal * 0.5} r="2" fill="#fff" />
         </svg>
         
         <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">BIO ({stats.bio})</div>
         <div className="absolute bottom-2 right-4 text-[10px] font-mono text-white">PSYCH ({stats.psych})</div>
         <div className="absolute bottom-2 left-4 text-[10px] font-mono text-white">ENV ({stats.env})</div>
      </div>

      <div className="bg-[#1E1E1E] p-4 rounded border border-zinc-800">
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-zinc-400">CYCLE: ADAPTATION</span>
          <span className="text-white">WEEK 3/6</span>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-[65%] bg-orange-500" />
        </div>
        <p className="mt-4 text-xs text-zinc-500">Consistent execution detected in Biological Primers. Recommended focus shift to Environmental Design next sprint.</p>
      </div>
    </div>
  );
};

// PAGE 8: SETTINGS (FUNCTIONAL)
const SettingsView = ({ settings, updateSettings }) => {
  return (
    <div className="p-6 pt-12 fade-enter">
      <h2 className="text-2xl text-white font-light mb-8">System Core</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Integrations</h3>
          <div className="space-y-2">
            {['Calendar', 'Health', 'Oura'].map(item => (
              <button 
                key={item} 
                onClick={() => updateSettings(item.toLowerCase(), !settings[item.toLowerCase()])}
                className="w-full flex items-center justify-between p-3 bg-[#1E1E1E] border border-zinc-800 rounded hover:border-zinc-600"
              >
                <span className="text-sm text-white">{item}</span>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${settings[item.toLowerCase()] ? 'bg-emerald-900' : 'bg-zinc-700'}`}>
                   <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${settings[item.toLowerCase()] ? 'bg-emerald-500 right-1' : 'bg-zinc-400 left-1'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Bio-Profile</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-3 bg-[#1E1E1E] border border-zinc-800 rounded">
              <span className="text-sm text-zinc-400">Chronotype</span>
              <select className="bg-transparent text-sm text-white font-mono text-right focus:outline-none">
                <option>Wolf (Late)</option>
                <option>Lion (Early)</option>
                <option>Bear (Mid)</option>
              </select>
            </div>
            <div className="flex justify-between p-3 bg-[#1E1E1E] border border-zinc-800 rounded">
               <span className="text-sm text-zinc-400">Dietary</span>
               <select className="bg-transparent text-sm text-white font-mono text-right focus:outline-none">
                <option>Intermittent</option>
                <option>Paleo</option>
                <option>Keto</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function OsnoviaPlatform() {
  const [view, setView] = useState('GATEWAY'); // GATEWAY, ONBOARDING, DASHBOARD
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCard, setActiveCard] = useState(null);
  const [consultantOpen, setConsultantOpen] = useState(false);
  
  // --- GLOBAL STATE ---
  const [globalState, setGlobalState] = useState({
    user: { name: 'Alex' },
    settings: { calendar: false, health: false, oura: false },
    assessment: { sleepQuality: 50, failurePoint: null, environmentScore: 50 },
    cards: [],
    stats: { bio: 2, psych: 3, env: 4 } // 1-10 scale
  });

  const updateGlobalState = (key, value) => {
    setGlobalState(prev => {
      // Logic for evolving stats when completing cards
      if (key === 'completeCard') {
         const card = prev.cards.find(c => c.id === value);
         const newStats = { ...prev.stats };
         if (card.type.includes('BIO')) newStats.bio = Math.min(10, newStats.bio + 1);
         if (card.type.includes('PSYCH') || card.type.includes('FOCUS')) newStats.psych = Math.min(10, newStats.psych + 1);
         if (card.type.includes('ENV') || card.type.includes('STYLE')) newStats.env = Math.min(10, newStats.env + 1);
         
         return { 
           ...prev, 
           cards: prev.cards.map(c => c.id === value ? { ...c, completed: true } : c),
           stats: newStats
         };
      }
      
      // Update specific cards directly
      if (key === 'protocol') return { ...prev, cards: value };
      
      // Update settings or assessment
      return { ...prev, [key]: value };
    });
  };

  const updateSettings = (key, val) => {
    setGlobalState(prev => ({ ...prev, settings: { ...prev.settings, [key]: val } }));
  };

  const handleCardComplete = (id) => {
    updateGlobalState('completeCard', id);
    setActiveCard(null);
  };

  // View Routing
  if (view === 'GATEWAY') return <Gateway onLogin={() => setView('ONBOARDING')} />;
  if (view === 'ONBOARDING') return (
    <SuccessAudit 
      onComplete={() => setView('DASHBOARD')} 
      updateGlobalState={updateGlobalState}
      globalState={globalState}
    />
  );

  return (
    <DashboardLayout currentView={activeTab} setView={setActiveTab}>
      <GlobalStyles />

      {activeTab === 'dashboard' && (
        <MissionControl 
          cards={globalState.cards} 
          onCardClick={setActiveCard} 
          assessment={globalState.assessment} 
        />
      )}
      {activeTab === 'vault' && <Vault />}
      {activeTab === 'evolution' && <Evolution stats={globalState.stats} />}
      {activeTab === 'settings' && (
        <SettingsView 
          settings={globalState.settings} 
          updateSettings={updateSettings} 
        />
      )}

      {/* Overlays */}
      {activeCard && (
        <ProtocolDetail 
          card={activeCard} 
          onClose={() => setActiveCard(null)} 
          onComplete={handleCardComplete}
        />
      )}

      {/* Pocket Consultant FAB */}
      {activeTab === 'dashboard' && !activeCard && (
        <button 
          onClick={() => setConsultantOpen(true)}
          className="fixed bottom-24 right-6 h-14 px-6 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-900/30 flex items-center gap-3 transition-all z-20"
        >
           <MessageSquare size={20} className="text-white" />
           <span className="text-xs font-mono font-bold text-white uppercase">Assist</span>
        </button>
      )}

      {/* Consultant Chat Overlay */}
      {consultantOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
           <div className="bg-[#18181B] h-[80vh] rounded-t-2xl p-4 flex flex-col slide-up">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                   <span className="font-mono text-xs text-white uppercase tracking-widest">System Consultant</span>
                </div>
                <button onClick={() => setConsultantOpen(false)}><X className="text-zinc-500" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                 <div className="self-end bg-zinc-800 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto text-sm text-zinc-300">
                   I'm feeling super anxious about this negotiation.
                 </div>
                 <div className="self-start bg-blue-900/20 border border-blue-900/50 p-3 rounded-lg rounded-tl-none max-w-[85%] text-sm text-blue-100 leading-relaxed">
                   Understood. Your cortisol is peaking. Do NOT drink more coffee. I have adjusted your afternoon block to 'Active Recovery'. Take a 10-minute walk now.
                 </div>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-2">
                 <button className="p-3 rounded-full bg-zinc-800 text-zinc-400"><Mic size={20} /></button>
                 <input type="text" placeholder="Type message..." className="flex-1 bg-zinc-900 rounded-full px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500" />
                 <button className="p-3 rounded-full bg-blue-600 text-white"><Send size={18} /></button>
              </div>
           </div>
        </div>
      )}

    </DashboardLayout>
  );
}