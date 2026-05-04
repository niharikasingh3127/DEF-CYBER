import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, ScanLine, Users, Award } from 'lucide-react';

const Login = ({ onLogin }) => {
  // Toggle between 'admin' (Official) and 'user' (Family/Veteran)
  const [loginType, setLoginType] = useState('admin'); 
  
  // Form States
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('family'); // Default selection for user tab
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      // --- AUTHENTICATION LOGIC ---
      
      // 1. ADMIN LOGIN CHECK
      if (loginType === 'admin') {
       // NEW (Smart - ignores case)
if (id.toLowerCase() === 'admin' && password === '1234') {
          onLogin('admin'); // Success: Send 'admin' role
        } else {
          setError(true);
          setLoading(false);
        }
      } 
      
      // 2. USER LOGIN CHECK
      else {
        // In a real app, you would check database here. 
        // For demo: any ID works if password is 'password'
        if (password === 'password') {
          onLogin(userRole); // Success: Send 'family' or 'veteran'
        } else {
          setError(true);
          setLoading(false);
        }
      }
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#020617] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] font-mono text-cyan-500 overflow-hidden relative">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-md border-2 border-slate-700 shadow-2xl relative">
        
        {/* TAB SWITCHER */}
        <div className="flex border-b border-slate-700">
          <button 
            onClick={() => { setLoginType('admin'); setError(false); }}
            className={`flex-1 py-4 text-xs font-bold tracking-widest transition-all ${loginType === 'admin' ? 'bg-cyan-900/20 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            OFFICIAL LOGIN
          </button>
          <button 
            onClick={() => { setLoginType('user'); setError(false); }}
            className={`flex-1 py-4 text-xs font-bold tracking-widest transition-all ${loginType === 'user' ? 'bg-amber-900/10 text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            FAMILY / VETERAN
          </button>
        </div>

        <div className="p-8">
          {/* Header Icons */}
          <div className="flex flex-col items-center mb-8">
            <div className={`p-4 rounded-full border mb-4 animate-pulse ${loginType === 'admin' ? 'bg-cyan-900/20 border-cyan-500/50 text-cyan-400' : 'bg-amber-900/20 border-amber-500/50 text-amber-500'}`}>
               {loginType === 'admin' ? <Shield size={40} /> : <Users size={40} />}
            </div>
            <h1 className={`text-2xl font-bold tracking-[0.2em] ${loginType === 'admin' ? 'text-white' : 'text-amber-50'}`}>
              {loginType === 'admin' ? 'DEF-CYBER' : 'DEFENCE COMMUNITY'}
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-slate-500 mt-2">
              {loginType === 'admin' ? 'RESTRICTED ACCESS // LEVEL 5' : 'SECURE PERSONAL PORTAL'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            
            {/* IF USER: Show Role Selection Dropdown */}
            {loginType === 'user' && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button 
                  type="button"
                  onClick={() => setUserRole('family')}
                  className={`p-3 border text-xs font-bold flex flex-col items-center gap-2 transition-all ${userRole === 'family' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-slate-700 text-slate-500'}`}
                >
                  <Users size={20} /> FAMILY
                </button>
                <button 
                  type="button"
                  onClick={() => setUserRole('veteran')}
                  className={`p-3 border text-xs font-bold flex flex-col items-center gap-2 transition-all ${userRole === 'veteran' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-slate-700 text-slate-500'}`}
                >
                  <Award size={20} /> VETERAN
                </button>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-400">
                {loginType === 'admin' ? 'Operator ID' : (userRole === 'veteran' ? 'Service Number' : 'Dependent ID')}
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full bg-black/50 border border-slate-700 p-3 pl-10 text-sm text-white focus:border-cyan-500 outline-none transition-all uppercase tracking-wider"
                  placeholder="ENTER ID"
                />
                <ScanLine size={16} className="absolute left-3 top-3.5 text-slate-600" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-400">Password</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-slate-700 p-3 pl-10 text-sm text-white focus:border-cyan-500 outline-none transition-all tracking-widest"
                  placeholder="••••••••"
                />
                <Lock size={16} className="absolute left-3 top-3.5 text-slate-600" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs bg-red-950/30 p-2 border border-red-900/50">
                <AlertTriangle size={14} />
                <span>INVALID CREDENTIALS</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 font-bold tracking-[0.2em] text-sm uppercase transition-all duration-300 ${
                loading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : loginType === 'admin' 
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              }`}
            >
              {loading ? 'VERIFYING...' : 'ACCESS PORTAL'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;