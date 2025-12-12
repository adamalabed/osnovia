import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Brain, 
  Zap, 
  Layout, 
  Check, 
  Mic,
  MessageSquare,
  Play,
  Pause,
  Clock,
  Calendar,
  Moon,
  ChevronRight,
  Shield,
  Wind,
  X,
  Send,
  Hexagon,
  TrendingUp,
  Menu,
  Link as LinkIcon,
  CheckCircle2,
  Battery,
  Settings,
  BookOpen,
  User,
  Smartphone,
  Watch
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
    .fade-enter { animation: fadeEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeEnter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

    .breath-circle { animation: breath 8s infinite ease-in-out; }
    @keyframes breath {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.5); opacity: 0.2; }
    }

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

// --- COMPONENT: BREATHING CIRCLE ---
const BreathingCircle = () => (
  <div className="relative w-48 h-48 flex items-center justify-center mx-auto my-8">
    <div className="absolute inset-0 bg-blue-500 rounded-full breath-circle blur-xl" />
    <div className="absolute inset-4 border border-blue-500/30 rounded-full" />
    <div className="text-center z-10">
      <div className="font-mono text-xs text-blue-300 mb-1">BOX BREATH</div>
      <div className="font-mono text-2xl text-white">4-4-4-4</div>
    </div>
  </div>
);

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

// --- PAGE 2: SUCCESS AUDIT (ONBOARDING) ---
const SuccessAudit = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [environment, setEnvironment] = useState(50);
  const [selectedFailure, setSelectedFailure] = useState(null);

  const nextStep = () => {
    if (step === 1) setStep(2);
    else onComplete();
  };

  return (
    <div className="h-screen flex flex-col p-8 bg-[#121212]">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full fade-enter">
        <div className="mb-12">
           <div className="font-mono text-xs text-blue-500 mb-2">STEP 0{step} // AUDIT</div>
           <h2 className="text-3xl font-light text-white leading-tight">
             {step === 1 ? "Integrate Data Streams" : "Baseline State Assessment"}
           </h2>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <p className="text-zinc-400 text-sm mb-8">Grant access for context-aware protocols.</p>
            {[
              { icon: Calendar, label: "Calendar", detail: "Schedule Sync" },
              { icon: Activity, label: "Health Data", detail: "Bio-Metrics" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#1E1E1E] border border-zinc-800 rounded">
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-zinc-800 rounded-full"><item.icon size={16} /></div>
                   <div>
                     <div className="text-white text-sm">{item.label}</div>
                     <div className="text-zinc-500 text-[10px] font-mono">{item.detail}</div>
                   </div>
                 </div>
                 <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <div className="space-y-4">
               <label className="text-sm text-zinc-400">Primary Failure Point Today</label>
               <div className="grid grid-cols-2 gap-3">
                 {['Brain Fog', 'Anxiety', 'Fatigue', 'Chaos'].map(f => (
                   <button 
                     key={f}
                     onClick={() => setSelectedFailure(f)}
                     className={`p-3 text-xs font-mono border rounded transition-all ${selectedFailure === f ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                   >
                     {f}
                   </button>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between text-sm text-zinc-400">
                 <span>Environment Check</span>
                 <span className="text-white font-mono">{environment}%</span>
               </div>
               <div className="relative pt-6">
                 <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-widest absolute top-0 w-full">
                   <span>Chaotic</span>
                   <span>Organized</span>
                 </div>
                 <input 
                    type="range" 
                    value={environment} 
                    onChange={(e) => setEnvironment(e.target.value)} 
                    className="w-full"
                 />
               </div>
            </div>
          </div>
        )}

        <button onClick={nextStep} className="mt-12 w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
          {step === 1 ? "Connect & Continue" : "Generate Protocol"}
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
             {card.type} PRIORITY
           </div>
           <h1 className="text-4xl font-light text-white mb-2">{card.title}</h1>
           <p className="text-zinc-400 text-lg font-light">{card.subtitle}</p>
        </div>

        {/* The Why */}
        <div className="mb-12 p-6 bg-[#1E1E1E] rounded border-l-2 border-blue-500">
          <h3 className="font-mono text-xs text-blue-500 uppercase mb-2">System Logic</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {card.logic || "Your physiological state indicates a need for this specific intervention to optimize cognitive output."}
          </p>
        </div>

        {/* The Tool */}
        <div className="mb-12">
          <h3 className="font-mono text-xs text-zinc-500 uppercase mb-4">Active Tool</h3>
          {card.id === 1 && <BreathingCircle />}
          {card.id === 2 && (
             <div className="p-8 bg-[#1E1E1E] rounded flex flex-col items-center justify-center border border-zinc-800">
               <div className="font-mono text-4xl text-white mb-4">90:00</div>
               <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-mono uppercase tracking-widest hover:bg-blue-500">
                 <Play size={12} /> Start Timer
               </button>
             </div>
          )}
          {card.id === 3 && (
            <div className="p-6 bg-[#1E1E1E] rounded border border-zinc-800">
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle2 size={16} className="text-zinc-600" /> Wear Structured Jacket (Navy)</li>
                <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle2 size={16} className="text-zinc-600" /> Clear desk surface entirely</li>
                <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle2 size={16} className="text-zinc-600" /> Adjust lighting to cool white</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#121212] to-transparent">
        <button 
          onClick={onComplete}
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
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {children}
      </main>
      
      {/* Bottom Dock */}
      <div className="fixed bottom-0 w-full bg-[#121212]/90 backdrop-blur border-t border-zinc-900 pb-safe pt-2">
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
const MissionControl = ({ onCardClick, cards }) => {
  return (
    <div className="p-6 pt-12 fade-enter">
      {/* Heads-Up Display */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl text-white font-light mb-1">Good Morning, Alex.</h1>
          <div className="flex items-center gap-2 text-xs font-mono text-orange-500">
            <Activity size={12} />
            <span>STATUS: HIGH-STAKES (2PM PITCH)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] rounded-full border border-zinc-800">
          <Battery size={14} className="text-emerald-500" />
          <span className="text-xs font-mono text-white">72%</span>
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
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{card.type} PROTOCOL</span>
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
    </div>
  );
};

// PAGE 6: THE VAULT
const Vault = () => (
  <div className="p-6 pt-12 fade-enter">
    <h2 className="text-2xl text-white font-light mb-8">Intelligence Vault</h2>
    <div className="space-y-6">
      {[
        { cat: 'STYLE', title: 'The Executive Uniform', sub: '3 Brands for your Body Type' },
        { cat: 'BIO-HACK', title: 'Cognitive Endurance', sub: 'Supplement Stack v4.0' },
        { cat: 'PSYCH', title: 'Conflict Resolution', sub: 'Mental Models for Negotiation' }
      ].map((item, i) => (
        <div key={i} className="flex gap-4 p-4 bg-[#1E1E1E] border border-zinc-800 rounded">
          <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center text-zinc-400">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-blue-500 uppercase mb-1">{item.cat}</div>
            <div className="text-white text-sm mb-1">{item.title}</div>
            <div className="text-zinc-500 text-xs">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// PAGE 7: EVOLUTION
const Evolution = () => (
  <div className="p-6 pt-12 fade-enter">
    <h2 className="text-2xl text-white font-light mb-8">Evolution Metrics</h2>
    
    {/* Radar Chart Mockup */}
    <div className="relative aspect-square bg-[#1E1E1E] rounded-lg border border-zinc-800 mb-8 flex items-center justify-center">
       <div className="absolute top-4 left-4 font-mono text-xs text-zinc-500">CAPACITY BALANCE</div>
       <svg viewBox="0 0 100 100" className="w-64 h-64 opacity-90">
          <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="#333" strokeWidth="0.5" />
          <polygon points="50,15 85,50 50,70 30,50" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="1" />
       </svg>
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">BIO</div>
       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">PSYCH</div>
       <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white">EXEC</div>
       <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white">ENV</div>
    </div>

    <div className="bg-[#1E1E1E] p-4 rounded border border-zinc-800">
      <div className="flex justify-between text-xs font-mono mb-2">
        <span className="text-zinc-400">CYCLE: ADAPTATION</span>
        <span className="text-white">WEEK 3/6</span>
      </div>
      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full w-[50%] bg-orange-500" />
      </div>
    </div>
  </div>
);

// PAGE 8: SETTINGS
const SettingsView = () => (
  <div className="p-6 pt-12 fade-enter">
    <h2 className="text-2xl text-white font-light mb-8">System Core</h2>
    
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Integrations</h3>
        <div className="space-y-2">
          {['Google Calendar', 'Oura Ring', 'Apple Health'].map(item => (
            <div key={item} className="flex items-center justify-between p-3 bg-[#1E1E1E] border border-zinc-800 rounded">
              <span className="text-sm text-white">{item}</span>
              <div className="w-8 h-4 bg-emerald-900 rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-emerald-500 rounded-full" /></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Bio-Profile</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-[#1E1E1E] border border-zinc-800 rounded">
            <span className="text-sm text-zinc-400">Chronotype</span>
            <span className="text-sm text-white font-mono">Wolf (Late)</span>
          </div>
          <div className="flex justify-between p-3 bg-[#1E1E1E] border border-zinc-800 rounded">
             <span className="text-sm text-zinc-400">Dietary</span>
             <span className="text-sm text-white font-mono">Intermittent</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function OsnoviaPlatform() {
  const [view, setView] = useState('GATEWAY'); // GATEWAY, ONBOARDING, DASHBOARD
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCard, setActiveCard] = useState(null);
  const [consultantOpen, setConsultantOpen] = useState(false);
  
  const [cards, setCards] = useState([
    { id: 1, type: 'BIO-PRIMER', title: 'Morning Protocol', subtitle: 'Cold Exposure + 30g Protein', logic: 'Your sleep latency was high. Cold exposure will reset cortisol rhythm.', completed: false },
    { id: 2, type: 'FOCUS BLOCK', title: 'Deep Work Window', subtitle: '10:00 AM – 11:30 AM. No Phone.', logic: 'Scheduled before your high-stakes pitch to ensure cognitive peak.', completed: false },
    { id: 3, type: 'ENV DESIGN', title: 'Authority Frame', subtitle: 'Wear Structured Jacket. Clear desk.', logic: 'Environmental order reduces background anxiety processing by 20%.', completed: false },
  ]);

  const handleCardComplete = () => {
    setCards(cards.map(c => c.id === activeCard.id ? { ...c, completed: true } : c));
    setActiveCard(null);
  };

  // View Routing
  if (view === 'GATEWAY') return <Gateway onLogin={() => setView('ONBOARDING')} />;
  if (view === 'ONBOARDING') return <SuccessAudit onComplete={() => setView('DASHBOARD')} />;

  return (
    <DashboardLayout currentView={activeTab} setView={setActiveTab}>
      
      {activeTab === 'dashboard' && <MissionControl cards={cards} onCardClick={setActiveCard} />}
      {activeTab === 'vault' && <Vault />}
      {activeTab === 'evolution' && <Evolution />}
      {activeTab === 'settings' && <SettingsView />}

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

      {/* Consultant Chat Overlay (Simplified Mock) */}
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