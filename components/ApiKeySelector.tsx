import React, { useState } from 'react';
import { IconKey, IconSparkles, IconMail, IconArrowRight } from './Icons';
import { promptApiKeySelection } from '../services/geminiService';

interface ApiKeySelectorProps {
  onKeySelected: () => void;
  onUserNameSet: (name: string) => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected, onUserNameSet }) => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleConnect = async () => {
    try {
      setError(null);
      await promptApiKeySelection();
      onKeySelected(); 
    } catch (err: any) {
      console.error("Key selection error:", err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        setError("Session expired. Please try again.");
      } else {
        setError("Failed to connect. Please try again.");
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const name = email.split('@')[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      onUserNameSet(formattedName);
      setEmailSubmitted(true);
    }
  };

  return (
    // Changed: Uses min-h-screen instead of fixed height to ensure scrolling always works naturally
    <div className="min-h-screen w-full bg-[#050505] relative flex flex-col items-center justify-center p-4">
      {/* Abstract Flow Background */}
      <div className="fixed top-[-10%] left-[-20%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-indigo-900/20 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-fuchsia-900/15 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen pointer-events-none"></div>
      
      {/* Container - Reduced max-width for mobile */}
      <div className="w-full max-w-[340px] md:max-w-lg z-10 my-4">
          <div className="glass-panel p-0.5 rounded-2xl md:rounded-3xl shadow-2xl">
            <div className="bg-[#0a0a0a]/90 p-6 md:p-12 rounded-[14px] md:rounded-[22px] relative overflow-hidden">
              
              {/* Header */}
              <div className="text-center mb-6 md:mb-10">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 mb-3 md:mb-6 border border-white/10">
                  <IconSparkles className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
                
                {/* Reduced Text Sizes */}
                <h1 className="text-xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 md:mb-3">
                  Krati<span className="text-indigo-500">.</span>ai
                </h1>
                <p className="text-gray-400 font-light text-xs md:text-lg">
                  Generative imagery for the modern web.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-xs md:text-sm text-center animate-in fade-in">
                  {error}
                </div>
              )}

              <div className="space-y-4 md:space-y-6">
                  {/* Email Input */}
                  {!emailSubmitted ? (
                      <form onSubmit={handleEmailSubmit} className="relative group animate-in fade-in slide-in-from-bottom-2">
                          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                              <IconMail className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <input 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email..."
                              className="w-full bg-[#18181b] border border-white/10 text-white pl-9 md:pl-11 pr-10 md:pr-12 py-3 md:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all placeholder-gray-600 font-medium text-sm md:text-base"
                              required
                          />
                           <button 
                              type="submit" 
                              disabled={!email.trim()} 
                              className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 px-2.5 md:px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center"
                          >
                              <IconArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </button>
                      </form>
                  ) : (
                      <div className="animate-in fade-in zoom-in-95">
                           <div className="bg-[#18181b]/50 border border-white/5 rounded-xl p-3 md:p-4 flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                  </div>
                                  <div className="min-w-0">
                                      <p className="text-gray-400 text-[10px] md:text-xs">Logged in as</p>
                                      <p className="text-white font-medium text-sm truncate max-w-[140px]">{email}</p>
                                  </div>
                              </div>
                              <button onClick={() => setEmailSubmitted(false)} className="text-[10px] md:text-xs text-gray-500 hover:text-white underline whitespace-nowrap ml-2">Change</button>
                           </div>
                           
                           <div className="relative flex py-2 items-center mb-4 md:mb-6">
                              <div className="flex-grow border-t border-white/5"></div>
                              <span className="flex-shrink-0 mx-3 md:mx-4 text-gray-600 text-[10px] md:text-xs font-medium uppercase tracking-widest">Action Required</span>
                              <div className="flex-grow border-t border-white/5"></div>
                           </div>

                          <button
                          onClick={handleConnect}
                          className="group relative w-full flex items-center justify-center gap-2.5 md:gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 md:py-4 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-900/20"
                          >
                          <IconKey className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base">Connect API Key</span>
                          </button>
                          <p className="text-center text-[10px] text-gray-500 mt-3 px-2">
                              A valid Google Cloud API Key is required.
                          </p>
                      </div>
                  )}
                  
                  {!emailSubmitted && (
                      <div className="text-center">
                           <button onClick={() => setEmailSubmitted(true)} className="text-[10px] md:text-xs text-gray-600 hover:text-gray-400 transition-colors">
                               Skip email step
                           </button>
                      </div>
                  )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 text-center pb-2">
            <p className="text-[10px] md:text-xs text-gray-600">Powered by Gemini 3 Pro • Google Labs Style</p>
          </div>
      </div>
    </div>
  );
};