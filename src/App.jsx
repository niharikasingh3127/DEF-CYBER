import React, { useState, useEffect, useRef } from 'react';
import { Shield, Activity, Map as MapIcon, Radio, Lock, Search, FileText, Database, Plus, Cpu, Phone, Mail, Siren } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './fire'; 

// --- IMPORT YOUR CUSTOM COMPONENTS ---
import IntelMap from './IntelMap'; 
import Chatbot from './Chatbot';
import Login from './Login';
import RapidResponse from './RapidResponse';
import CivilianDashboard from './CivilianDashboard';

// --- SOUND URL (Sci-Fi Alert) ---
const ALERT_AUDIO_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"; 

// --- SUB-VIEWS FOR ADMIN ---

const DashboardView = ({ incomingThreats, onAddThreat }) => {
  const [newType, setNewType] = useState('');
  const [newSource, setNewSource] = useState('');

  return (
    <div className="flex flex-col items-center w-full max-w-5xl animate-in fade-in zoom-in duration-500">
      <div className="w-full bg-slate-900/90 border-y-2 border-cyan-500/50 p-6 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col items-center text-center backdrop-blur-sm">
        <h3 className="text-cyan-400 font-bold tracking-[0.3em] mb-4 uppercase text-sm flex items-center gap-2">
          <Cpu size={16} className="animate-spin-slow"/> Manual Threat Override
        </h3>
        <div className="flex gap-4 w-full justify-center">
          <input type="text" placeholder="THREAT TYPE" value={newType} onChange={(e) => setNewType(e.target.value)}
            className="bg-black/50 border border-slate-700 text-cyan-50 px-4 py-2 w-64 text-center focus:border-cyan-400 outline-none uppercase tracking-widest text-xs" />
          <input type="text" placeholder="ORIGIN SOURCE" value={newSource} onChange={(e) => setNewSource(e.target.value)}
            className="bg-black/50 border border-slate-700 text-cyan-50 px-4 py-2 w-64 text-center focus:border-cyan-400 outline-none uppercase tracking-widest text-xs" />
          <button onClick={() => { if(newType && newSource) { onAddThreat(newType, newSource); setNewType(''); setNewSource(''); }}}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
            <Plus size={16} /> Inject Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 w-full">
        {/* KPI Cards */}
        {[ 
          { label: 'Active Incidents', val: incomingThreats.length, color: incomingThreats.length > 0 ? 'text-red-500 animate-pulse' : 'text-white' }, 
          { label: 'Espionage Flags', val: '14', color: 'text-red-500' },
          { label: 'Network Integrity', val: '98.2%', color: 'text-emerald-400' },
          { label: 'Auto-Mitigated', val: '845', color: 'text-cyan-400' }
        ].map((kpi, idx) => (
          <div key={idx} className="col-span-3 bg-slate-900/50 border border-slate-700/50 p-6 flex flex-col items-center justify-center hover:bg-slate-800/80 transition-all cursor-crosshair group">
            <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase group-hover:text-cyan-400 transition-colors">{kpi.label}</p>
            <p className={`text-4xl font-bold mt-2 font-mono ${kpi.color} drop-shadow-md`}>{kpi.val}</p>
          </div>
        ))}

        {/* Dynamic Radar */}
        <div className="col-span-8 bg-black/40 border border-slate-700 h-[28rem] relative overflow-hidden flex flex-col items-center justify-center text-center group">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           <div className="w-[450px] h-[450px] border border-cyan-500/20 rounded-full absolute animate-pulse"></div>
           <div className="w-[300px] h-[300px] border border-cyan-500/40 rounded-full absolute"></div>
           <div className="w-[150px] h-[150px] border border-cyan-500/60 rounded-full absolute flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
           </div>
           <div className="absolute w-full h-full rounded-full border-t border-cyan-500/50 bg-gradient-to-t from-transparent to-cyan-500/10 animate-spin-slow origin-center"></div>
           <p className="z-10 text-xl font-bold tracking-[0.5em] text-cyan-500/80 mt-40 bg-black/50 px-4 py-1 border-x border-cyan-500/30">LIVE SURVEILLANCE</p>
        </div>

        {/* Threat Feed - CONNECTED TO MONGODB */}
        <div className="col-span-4 bg-slate-900/80 border border-slate-700 h-[28rem] p-0 overflow-hidden flex flex-col">
          <h3 className="font-bold text-slate-100 bg-red-900/20 border-b border-red-500/30 p-4 text-center tracking-widest text-xs">REAL-TIME THREAT FEED</h3>
          <div className="overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {incomingThreats.length === 0 ? (
                <div className="text-center mt-10 text-slate-500 text-xs">
                    <p>SECURE LINK ESTABLISHED.</p>
                    <p>WAITING FOR DATA...</p>
                </div>
            ) : (
                incomingThreats.map((t, index) => (
                <div key={index} className="p-3 bg-slate-950 border border-slate-800 hover:border-red-500/50 transition-all cursor-pointer group animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center mb-1">
                    <span className="text-red-400 font-bold text-[10px] tracking-wider uppercase bg-red-500/10 px-2 py-0.5 rounded group-hover:bg-red-500 group-hover:text-white transition-colors">
                        {t.type || 'UNKNOWN THREAT'}
                    </span> 
                    <span className="text-[10px] text-slate-600 font-mono group-hover:text-slate-400">
                        {t.timestamp ? new Date(t.timestamp).toLocaleTimeString() : 'LIVE'}
                    </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono pl-1">SRC: {t.source || 'Unknown'}</div>
                </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const IntelMapView = () => (<div className="h-full w-full bg-black relative flex flex-col"><div className="flex-1"><IntelMap /></div></div>);
const ForensicsView = () => (<div className="w-full max-w-4xl grid grid-cols-2 gap-8 animate-in slide-in-from-right duration-300"><div className="bg-slate-900 border border-slate-700 p-8"><h3 className="flex items-center justify-center gap-3 text-lg font-bold text-amber-500 mb-8 tracking-widest"><FileText /> EVIDENCE LOCKER</h3><div className="space-y-4">{['suspect_device_01.img', 'intercepted_packet.pcap', 'malware_payload.exe'].map((file, i) => (<div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-slate-700 hover:bg-amber-900/10 cursor-pointer transition-colors"><span className="font-mono text-sm text-slate-300">{file}</span><span className="text-[10px] bg-slate-800 px-2 py-1 text-slate-400 border border-slate-600">ENCRYPTED</span></div>))}</div></div><div className="bg-slate-900 border border-slate-700 p-8 flex flex-col items-center justify-center text-center"><Search size={80} className="text-slate-800 mb-6" /><p className="text-slate-500 tracking-widest text-sm">SELECT A FILE TO BEGIN DECRYPTION</p></div></div>);
const SatLinkView = () => (<div className="flex flex-col items-center justify-center w-full h-full animate-in fade-in duration-500"><div className="flex items-center gap-4 mb-8"><div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div><h2 className="text-2xl font-bold tracking-[0.3em] text-slate-200">SAT-LINK INTERFACE</h2></div><div className="w-full max-w-2xl bg-black border border-slate-800 p-6 font-mono text-green-500 text-sm shadow-2xl relative"><div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_#22c55e]"></div><p className="mb-2"> INITIALIZING UPLINK HANDSHAKE...</p><p className="mb-2"> FREQUENCY: 14.5 GHZ</p><p className="mb-2"> ENCRYPTION: AES-256-GCM</p><p className="animate-pulse mt-6 text-green-400"> WAITING FOR SIGNAL...</p></div></div>);

// --- MAIN APP COMPONENT ---

function App() {
  const [userRole, setUserRole] = useState(null); 
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSending, setIsSending] = useState(false);
  const [threats, setThreats] = useState([]); 
  
  // UseRef to play sound only once per update if needed
  const audioRef = useRef(new Audio(ALERT_AUDIO_URL));

  // --- 1. FETCH DATA & PLAY SOUND ---
  useEffect(() => {
    if (userRole === 'admin') {
        const fetchThreats = () => {
            fetch('http://localhost:5000/api/incidents')
            .then(res => res.json())
            .then(data => {
                setThreats(data);
                
                // --- SOUND LOGIC ---
                // If there are threats in the database, play the ALERT sound
                if (data.length > 0) {
                    audioRef.current.play().catch(error => {
                        console.log("Audio blocked until user interaction:", error);
                    });
                }
            })
            .catch(err => console.error("Failed to fetch secure data:", err));
        };

        // Fetch immediately on login
        fetchThreats();

        // Optional: Auto-refresh every 5 seconds to catch new family reports live
        const interval = setInterval(fetchThreats, 5000);
        return () => clearInterval(interval);
    }
  }, [userRole]);

  // LOGIN CHECK
  if (!userRole) {
    return <Login onLogin={(role) => setUserRole(role)} />;
  }

  if (userRole === 'family' || userRole === 'veteran') {
    return <CivilianDashboard role={userRole} onLogout={() => setUserRole(null)} />;
  }

  // --- 2. SEND DATA TO SERVER ---
  const addThreat = async (type, source) => {
    const newThreatData = {
        type: type,
        source: source,
        riskScore: 90,
        status: 'NEW'
    };

    try {
        const response = await fetch('http://localhost:5000/api/incidents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newThreatData)
        });
        
        if (response.ok) {
            const savedThreat = await response.json();
            setThreats([savedThreat, ...threats]);
        }
    } catch (error) {
        alert("Failed to save to Database. Is server running?");
    }
  };

  const handleEscalation = async () => {
    setIsSending(true);
    await addThreat("High Level Espionage", "Manual Escalation Protocol");
    alert("✅ ESCALATION LOGGED IN SECURE VAULT");
    setIsSending(false);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-cyan-50 font-sans overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900/50 backdrop-blur-md border-r border-slate-800 flex flex-col z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)] overflow-y-auto custom-scrollbar h-full">
        <div className="p-8 border-b border-slate-800 flex flex-col items-center justify-center text-center">
          <Shield className="text-cyan-500 w-12 h-12 mb-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          <h1 className="font-bold text-2xl tracking-[0.2em] text-cyan-400">DEF-CYBER</h1>
          <p className="text-[9px] text-slate-500 tracking-[0.3em] mt-1">UNIT 772 // SECURE</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-3 mt-4">
          {['Dashboard', 'Rapid Response', 'Intel Map', 'Forensics', 'Sat-Link'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 group border-r-2 ${
                activeTab === item ? 'bg-cyan-950/30 border-cyan-400 text-cyan-400' : 'border-transparent hover:bg-slate-800/50 text-slate-500 hover:text-slate-300'
              }`}>
              {item === 'Dashboard' && <Activity size={18} />}
              {item === 'Rapid Response' && <Siren size={18} className="text-red-500" />}
              {item === 'Intel Map' && <MapIcon size={18} />}
              {item === 'Forensics' && <Database size={18} />}
              {item === 'Sat-Link' && <Radio size={18} />}
              <span className="uppercase tracking-widest text-xs font-bold">{item}</span>
            </button>
          ))}
          <button onClick={() => setActiveTab('chatbot')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 group border-r-2 ${activeTab === 'chatbot' ? 'bg-cyan-950/30 border-cyan-400 text-cyan-400' : 'border-transparent hover:bg-slate-800/50 text-slate-500 hover:text-slate-300'}`}>
            <span className="mr-3">🤖</span><span className="uppercase tracking-widest text-xs font-bold">NEURAL LINK</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
            <button onClick={() => setUserRole(null)} className="w-full text-xs text-red-500 border border-red-900/50 p-2 hover:bg-red-900/20">
                TERMINATE SESSION
            </button>
        </div>

        <div className="p-4 border-t-2 border-slate-800/60 bg-gradient-to-b from-slate-900/80 to-black relative overflow-hidden group flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-[3000ms] ease-linear pointer-events-none"></div>
            <h4 className="text-[9px] font-bold text-red-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-3 relative z-10">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span></span> ACTIVE UPLINES
            </h4>
            <div className="space-y-3 font-mono relative z-10">
                <div className="flex items-center gap-3 p-2 rounded-md border border-slate-800/50 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all duration-300 cursor-pointer group/item">
                    <div className="p-2 text-cyan-500 bg-slate-900/80 rounded border border-slate-700 group-hover/item:border-cyan-400 group-hover/item:text-cyan-300 group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all relative overflow-hidden"><Phone size={16} className="animate-pulse" /></div>
                     <div><p className="text-[8px] text-slate-500 uppercase tracking-widest mb-0.5">Secure Voice Line</p><p className="text-xs text-slate-200 tracking-wider font-bold">1-800-DEF-772</p></div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-md border border-slate-800/50 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all duration-300 cursor-pointer group/item">
                    <div className="p-2 text-cyan-500 bg-slate-900/80 rounded border border-slate-700 group-hover/item:border-cyan-400 group-hover/item:text-cyan-300 group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all relative overflow-hidden"><Mail size={16} className="animate-pulse" /></div>
                     <div><p className="text-[8px] text-slate-500 uppercase tracking-widest mb-0.5">Encrypted Mail</p><p className="text-xs text-slate-200 tracking-wider font-bold">HQ@UNIT772.MIL</p></div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-slate-800 via-cyan-900/20 to-slate-800"></div>
        </div>
      </div> 

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-slate-900/30 border-b border-slate-800 flex items-center justify-between px-10 backdrop-blur-sm">
          <h2 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase flex items-center gap-3"><Lock size={14} className="text-slate-600"/> Incident Command Center</h2>
          <button onClick={handleEscalation} disabled={isSending} className={`px-6 py-2 rounded-sm font-bold tracking-widest text-xs transition-all duration-300 flex items-center gap-3 border ${isSending ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'}`}>{isSending ? 'TRANSMITTING...' : 'INITIATE ESCALATION'}</button>
        </header>

        <main className="flex-1 overflow-y-auto p-10 flex flex-col items-center justify-start">
          {activeTab === 'Dashboard' && <DashboardView incomingThreats={threats} onAddThreat={addThreat} />}
          {activeTab === 'Rapid Response' && <RapidResponse />}
          {activeTab === 'Intel Map' && <IntelMapView />}
          {activeTab === 'Forensics' && <ForensicsView />}
          {activeTab === 'Sat-Link' && <SatLinkView />}
          {activeTab === 'chatbot' && <Chatbot />}
        </main>
      </div>
    </div>
  );
}

export default App;