import React, { useState, useEffect } from 'react';
import { GROUNDING_TEXTS } from '../constants';

interface GroundingExerciseProps {
  onComplete: () => void;
}

const GroundingExercise: React.FC<GroundingExerciseProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isBreathing, setIsBreathing] = useState(true);

  useEffect(() => {
    // Slower pacing for breathing
    const timer = setTimeout(() => {
      if (step < GROUNDING_TEXTS.length - 1) {
        setStep(prev => prev + 1);
      } else {
        setIsBreathing(false);
      }
    }, 5000); // 5 seconds per thought

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 md:p-8 text-center animate-fade-in relative">
      
      <div className={`transition-all duration-[2000ms] ease-in-out ${isBreathing ? 'opacity-100 transform scale-100' : 'opacity-0 scale-95 hidden'}`}>
        <div className="mb-12 relative flex items-center justify-center">
            {/* Inner Light Visualization */}
            <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-violet-900/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-violet-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.1)] animate-breathe">
                <div className="w-2 h-2 bg-tamkin-glow rounded-full shadow-[0_0_20px_rgba(192,132,252,0.8)]"></div>
            </div>
        </div>
        <p className="text-lg md:text-2xl text-violet-100/80 font-light max-w-xl leading-relaxed tracking-wide drop-shadow-lg">
          {GROUNDING_TEXTS[step]}
        </p>
      </div>

      {!isBreathing && (
        <div className="animate-fade-in flex flex-col items-center">
          <div className="mb-8 w-1 h-16 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"></div>
          <h2 className="text-3xl font-light text-violet-100 mb-6 tracking-wide">The foundation is set.</h2>
          <p className="text-violet-300/60 mb-12 max-w-md mx-auto leading-relaxed">
            There is no rush here. <br/>
            Only the quiet construction of your own clarity.
          </p>
          <button
            onClick={onComplete}
            className="px-10 py-4 border border-violet-500/30 text-violet-100 font-light tracking-widest text-sm rounded-full hover:bg-violet-500/10 hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-700"
          >
            ENTER THE SPACE
          </button>
        </div>
      )}
    </div>
  );
};

export default GroundingExercise;