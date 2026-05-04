import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Lock, Smartphone, CheckCircle, ChevronRight, X } from 'lucide-react';

const RapidResponse = () => {
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState({});

  const protocols = [
    {
      id: 'phishing',
      title: 'PHISHING / MALICIOUS LINK',
      icon: <AlertTriangle size={32} className="text-amber-500" />,
      color: 'border-amber-500/50',
      desc: 'Executed if user clicked a suspicious link or downloaded an unknown attachment.',
      steps: [
        "IMMEDIATELY disconnect device from WiFi/Data.",
        "Do NOT enter any passwords or codes.",
        "Take a screenshot of the message/email for evidence.",
        "Run a full offline antivirus scan.",
        "Change passwords from a DIFFERENT, secure device."
      ]
    },
    {
      id: 'ransomware',
      title: 'RANSOMWARE INFECTION',
      icon: <Lock size={32} className="text-red-500" />,
      color: 'border-red-500/50',
      desc: 'Active file encryption detected. Files are being locked.',
      steps: [
        "HARD SHUTDOWN immediately (Hold power button).",
        "Disconnect all backup drives and USBs.",
        "Do NOT pay the ransom. It funds the enemy.",
        "Contact Unit 772 IT Cell via secure line.",
        "Isolate device from the network."
      ]
    },
    {
      id: 'sextortion',
      title: 'SEXTORTION / BLACKMAIL',
      icon: <ShieldAlert size={32} className="text-purple-500" />,
      color: 'border-purple-500/50',
      desc: 'Threats to leak private photos or sensitive data.',
      steps: [
        "Do NOT reply or negotiate with the attacker.",
        "Do NOT send money. Demands never end.",
        "Screenshot all threats, profiles, and messages.",
        "Lock down social media accounts (highest privacy settings).",
        "Report profile to the platform immediately."
      ]
    },
    {
      id: 'device',
      title: 'STOLEN / LOST DEVICE',
      icon: <Smartphone size={32} className="text-blue-500" />,
      color: 'border-blue-500/50',
      desc: 'Physical compromise of secure hardware.',
      steps: [
        "Initiate remote wipe via 'Find My Device' protocols.",
        "Call service provider to block SIM/IMEI.",
        "Log out of all sessions remotely.",
        "Change all banking and email pins.",
        "File an FIR and submit copy to Unit 772."
      ]
    }
  ];

  const toggleStep = (step) => {
    setCheckedSteps(prev => ({ ...prev, [step]: !prev[step] }));
  };

  return (
    <div className="w-full h-full p-8 flex flex-col items-center animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="w-full max-w-5xl mb-6 border-b border-slate-800 pb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold tracking-[0.2em] text-red-500 flex items-center gap-3">
          <span className="animate-pulse">🚨</span> RAPID RESPONSE PROTOCOLS
        </h2>
        <p className="text-slate-400 font-mono text-sm mt-2">SELECT INCIDENT TYPE TO INITIATE MITIGATION PLAYBOOK</p>
      </div>

      {/* UPDATED LINE BELOW: 
          Changed h-[60vh] to h-[calc(100vh-12rem)] 
          This forces the container to take up all remaining screen space.
      */}
      <div className="flex gap-8 w-full max-w-6xl h-[calc(100vh-12rem)]">
        
        {/* LEFT: Cards Selection */}
        <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto pr-2 custom-scrollbar content-start">
          {protocols.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedProtocol(p); setCheckedSteps({}); }}
              className={`text-left p-6 bg-slate-900/50 border-l-4 ${p.color} hover:bg-slate-800 transition-all group relative overflow-hidden flex-shrink-0`}
            >
              <div className="flex items-start gap-4 z-10 relative">
                <div className="p-3 bg-black/40 rounded-lg border border-slate-700">{p.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-200 tracking-wider mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">{p.desc}</p>
                </div>
                <ChevronRight className="ml-auto text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT: Active Checklist Panel */}
        <div className="flex-1 bg-black/60 border border-slate-700 p-8 relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {selectedProtocol ? (
            <>
              <div className="mb-6 flex justify-between items-start flex-shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 tracking-widest mb-2">PROTOCOL: {selectedProtocol.title}</h3>
                  <p className="text-xs text-red-400 font-mono uppercase">STATUS: ACTIVE MITIGATION IN PROGRESS</p>
                </div>
                <button onClick={() => setSelectedProtocol(null)} className="text-slate-500 hover:text-white"><X /></button>
              </div>

              {/* Scrollable Checklist Area */}
              <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                {selectedProtocol.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => toggleStep(step)}
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 ${
                      checkedSteps[step] 
                        ? 'bg-emerald-900/20 border-emerald-500/50 opacity-50' 
                        : 'bg-slate-900 border-slate-700 hover:border-cyan-500'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      checkedSteps[step] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'
                    }`}>
                      {checkedSteps[step] && <CheckCircle size={16} className="text-black" />}
                    </div>
                    <p className={`font-mono text-sm ${checkedSteps[step] ? 'text-emerald-500 line-through' : 'text-slate-300'}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress Bar (Fixed at bottom) */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex-shrink-0">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>PROTOCOL COMPLETION</span>
                  <span>{Math.round((Object.keys(checkedSteps).length / selectedProtocol.steps.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${(Object.keys(checkedSteps).length / selectedProtocol.steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShieldAlert size={64} className="text-slate-600 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-slate-400 tracking-widest">AWAITING INPUT</h3>
              <p className="text-xs text-slate-600 font-mono mt-2">SELECT A THREAT VECTOR TO LOAD COUNTERMEASURES</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RapidResponse;