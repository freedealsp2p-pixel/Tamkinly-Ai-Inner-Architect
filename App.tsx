import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ResearchPanel from './components/ResearchPanel';
import GroundingExercise from './components/GroundingExercise';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.GROUNDING);
  const [showResources, setShowResources] = useState(false);

  const handleGroundingComplete = () => {
    setCurrentView(AppView.CHAT);
  };

  const toggleResources = () => {
    setShowResources(!showResources);
  };

  return (
    <div className="flex flex-col w-full h-full text-tamkin-star selection:bg-violet-600/30">
      
      {/* Cosmic Atmosphere Layers */}
      {/* 1. Deep starfield noise (simulated with opacity) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      {/* 2. Central 'Crystal Source' Glow */}
      <div className="absolute bottom-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-violet-900/20 blur-[120px] pointer-events-none animate-breathe"></div>
      
      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 h-full transition-all duration-500 ease-in-out relative z-10 ${showResources ? 'mr-0 md:mr-[400px]' : ''}`}>
        
        {/* Header */}
        <header className="flex-none h-16 md:h-24 border-b border-violet-500/10 flex items-center justify-between px-4 md:px-12 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3 md:gap-5">
             {/* Abstract Avatar: Subtle Phantom Crystal */}
             <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center opacity-90">
                {/* Outer crystal shape */}
                <div className="absolute w-6 h-6 md:w-7 md:h-7 border border-violet-400/30 rotate-45 rounded-[2px] shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-spin-slow"></div>
                {/* Inner core */}
                <div className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-violet-200/80 rounded-full blur-[1px] shadow-[0_0_10px_rgba(192,132,252,0.8)]"></div>
             </div>
             
             <div className="flex flex-col justify-center">
                <h1 className="text-sm md:text-base tracking-[0.15em] text-violet-100/90 font-light flex items-center gap-2 md:gap-3">
                  <span className="uppercase font-sans">Tamkinly</span>
                </h1>
                <span className="text-[8px] md:text-[10px] text-violet-400/50 tracking-[0.2em] uppercase mt-0.5 font-sans hidden sm:block">Inner Architect</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             {currentView === AppView.CHAT && (
                <button 
                  onClick={() => setCurrentView(AppView.GROUNDING)}
                  className="hidden md:block text-[10px] uppercase tracking-widest text-violet-400/40 hover:text-violet-200 transition-colors duration-700"
                >
                  Recenter
                </button>
             )}
             <button
               onClick={toggleResources}
               className={`p-2 md:p-3 rounded-full transition-all duration-500 ${showResources ? 'text-violet-200 bg-violet-500/20' : 'text-violet-500/40 hover:text-violet-200 hover:bg-white/5'}`}
               title="Architectural Basis"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                 <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
               </svg>
             </button>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-hidden relative">
          {currentView === AppView.GROUNDING && (
            <GroundingExercise onComplete={handleGroundingComplete} />
          )}
          
          {currentView === AppView.CHAT && (
             <ChatInterface />
          )}

          {/* Micro-Prompt Footer (Desktop Only) */}
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-0 opacity-30 hidden md:block">
             <span className="text-[10px] uppercase tracking-[0.4em] text-violet-300/50 font-light animate-pulse">
               Notice • Pause • Explore
             </span>
          </div>
        </main>
      </div>

      {/* Side Panel (Resources) */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] glass-panel shadow-[-40px_0_100px_rgba(0,0,0,0.8)] transform transition-transform duration-700 ease-out z-30 ${showResources ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ResearchPanel onClose={() => setShowResources(false)} />
      </div>

      {/* Mobile overlay */}
      {showResources && (
        <div 
          className="fixed inset-0 bg-[#05020a]/90 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setShowResources(false)}
        />
      )}
    </div>
  );
};

export default App;