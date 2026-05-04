import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, FileText, Home, LogOut, HeartPulse, Send, ChevronDown, Phone } from 'lucide-react';

const CivilianDashboard = ({ role, onLogout }) => {
  const isVeteran = role === 'veteran';
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'report', 'guide'
  
  // Form State
  const [incidentType, setIncidentType] = useState('Financial Fraud');
  const [reportText, setReportText] = useState('');

  // --- DATABASE LOGIC ---
  const sendReport = async () => {
    if (!reportText) {
        alert("Please describe the incident first.");
        return;
    }

    const reportData = {
      type: incidentType, 
      source: isVeteran ? "Veteran Portal" : "Family Portal",
      riskScore: incidentType === "SOS PANIC" ? 99 : 70,
      status: "NEW",
      timestamp: new Date()
    };

    try {
      const response = await fetch('http://localhost:5000/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });

      if (response.ok) {
        alert("✅ REPORT SUBMITTED SECURELY");
        setReportText('');
        setActiveTab('overview'); // Return to home after submit
      }
    } catch (error) {
      alert("❌ SERVER ERROR: Ensure Node.js server is running.");
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
      
      {/* --- LEFT SIDEBAR (Matches your photo) --- */}
      <div className="w-64 bg-slate-900/90 backdrop-blur-md border-r border-slate-800 flex flex-col z-20">
        
        {/* Header */}
        <div className="p-8 flex flex-col items-center border-b border-slate-800">
          <div className="p-3 bg-rose-500/20 rounded-full text-rose-500 mb-3">
             <Home size={32} />
          </div>
          <h1 className="font-bold text-lg tracking-widest text-white">FAMILY NETWORK</h1>
          <p className="text-[10px] text-slate-500 uppercase mt-1">ID: 992-Alpha</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-4 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-xs tracking-widest uppercase ${
                activeTab === 'overview' ? 'bg-slate-800 border-l-4 border-emerald-400 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
            }`}
          >
             <Home size={18} /> OVERVIEW
          </button>

          <button 
            onClick={() => setActiveTab('report')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-xs tracking-widest uppercase ${
                activeTab === 'report' ? 'bg-slate-800 border-l-4 border-amber-500 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
            }`}
          >
             <AlertTriangle size={18} /> REPORT
          </button>

          <button 
            onClick={() => setActiveTab('guide')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all font-bold text-xs tracking-widest uppercase ${
                activeTab === 'guide' ? 'bg-slate-800 border-l-4 border-blue-500 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
            }`}
          >
             <FileText size={18} /> GUIDE
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors">
            <LogOut size={14} /> LOGOUT
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto p-10 relative">
        
        {/* Header Bar */}
        <header className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-400">
                {activeTab}
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-full">
                <Phone size={14} className="text-emerald-400"/>
                <span className="text-xs font-bold text-emerald-400">HELPLINE: 1930</span>
            </div>
        </header>

        {/* VIEW 1: OVERVIEW (Stacked Cards) */}
        {activeTab === 'overview' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Status Card */}
                <div className="w-full bg-slate-900/80 border-l-4 border-emerald-500 p-8 rounded-r-lg flex justify-between items-center shadow-lg">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Current Safety Status</h3>
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-mono font-bold">
                            <ShieldCheck size={18} /> NO ACTIVE THREATS DETECTED
                        </div>
                    </div>
                    <div className="text-right text-slate-500 text-xs">
                        <p className="uppercase mb-1">LAST SCAN</p>
                        <p className="text-slate-300 font-bold">Today, 08:30 AM</p>
                    </div>
                </div>

                {/* Report Widget */}
                <div onClick={() => setActiveTab('report')} className="w-full bg-slate-900/50 border border-slate-800 p-8 rounded-lg hover:border-amber-500 transition-all cursor-pointer group">
                    <AlertTriangle className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-lg font-bold text-white mb-1">Report Incident</h3>
                    <p className="text-sm text-slate-500">Report cyberbullying or suspicious messages.</p>
                </div>

                {/* Guide Widget */}
                <div className="w-full bg-slate-900/50 border border-slate-800 p-8 rounded-lg hover:border-blue-500 transition-all cursor-pointer group">
                    <FileText className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-lg font-bold text-white mb-1">Digital Hygiene Guide</h3>
                    <p className="text-sm text-slate-500">Download checklist for online safety.</p>
                </div>

            </div>
        )}

        {/* VIEW 2: REPORT FORM (Matches your photo) */}
        {activeTab === 'report' && (
            <div className="flex items-center justify-center h-[80%] animate-in zoom-in duration-300">
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 p-8 rounded-lg shadow-2xl relative overflow-hidden">
                    
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                        <AlertTriangle className="text-amber-500" size={28} />
                        <h3 className="text-xl font-bold text-amber-500 tracking-widest uppercase">Report an Incident</h3>
                    </div>

                    {/* Dropdown for Incident Type */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Incident Type</label>
                        <div className="relative">
                            <select 
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                className="w-full bg-black/50 border border-slate-600 text-white p-4 appearance-none outline-none focus:border-amber-500 transition-colors font-bold"
                            >
                                <option>Financial Fraud</option>
                                <option>Cyberbullying / Harassment</option>
                                <option>Identity Theft</option>
                                <option>Suspicious Link / SMS</option>
                                <option>Hacked Social Media</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-4 text-slate-500 pointer-events-none" size={20} />
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="mb-8">
                        <textarea 
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                            className="w-full h-32 bg-black/50 border border-slate-600 p-4 text-white placeholder-slate-600 outline-none focus:border-amber-500 transition-colors resize-none"
                            placeholder="Describe what happened..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button 
                            onClick={sendReport}
                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/20"
                        >
                            <Send size={18} /> Submit Report
                        </button>
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className="px-6 text-slate-500 hover:text-white font-bold text-xs uppercase"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CivilianDashboard;