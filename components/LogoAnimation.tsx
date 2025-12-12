import React, { useEffect, useState } from 'react';
import { IconSparkles } from './Icons';

interface LogoAnimationProps {
  onComplete: () => void;
}

export const LogoAnimation: React.FC<LogoAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence the animation stages
    const t1 = setTimeout(() => setStage(1), 500); // Start fade in
    const t2 = setTimeout(() => setStage(2), 2000); // Expand/Text reveal
    const t3 = setTimeout(() => setStage(3), 3500); // Exit fade
    const t4 = setTimeout(onComplete, 4000); // Finish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center transition-opacity duration-700 ${stage === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative">
        {/* Glow Background */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] transition-all duration-1000 ${stage >= 1 ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`}></div>
        
        <div className="flex items-center gap-4 relative z-10">
            {/* The "K" Logo Animation */}
            <div className={`relative flex items-center justify-center w-24 h-24 transition-all duration-1000 transform ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} ${stage === 2 ? 'translate-x-0' : ''}`}>
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <defs>
                        <linearGradient id="k-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                    {/* Stylized K Path */}
                    <path 
                        d="M 30 20 L 30 80 M 30 50 L 70 20 M 30 50 L 70 80" 
                        stroke="url(#k-gradient)" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                        className="animate-draw-k"
                        style={{
                            strokeDasharray: 200,
                            strokeDashoffset: stage >= 1 ? 0 : 200,
                            transition: 'stroke-dashoffset 1.5s ease-out'
                        }}
                    />
                </svg>
                <div className={`absolute -top-2 -right-2 transition-opacity duration-1000 delay-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <IconSparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
            </div>

            {/* Text Reveal */}
            <div className={`overflow-hidden transition-all duration-1000 ease-out ${stage >= 2 ? 'w-48 opacity-100 ml-2' : 'w-0 opacity-0'}`}>
                <h1 className="text-5xl font-display font-bold text-white tracking-tight whitespace-nowrap">
                    rati<span className="text-indigo-500">.</span>ai
                </h1>
            </div>
        </div>
        
        {/* Loading Bar */}
        <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 h-0.5 bg-gray-800 rounded-full overflow-hidden w-32 transition-opacity duration-500 ${stage >= 1 && stage < 3 ? 'opacity-100' : 'opacity-0'}`}>
             <div className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 w-full origin-left animate-progress-loading"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress-loading {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};