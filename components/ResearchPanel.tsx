import React from 'react';
import { RESEARCH_PAPERS, KNOWLEDGE_EXPANSION_QUERIES } from '../constants';

interface ResearchPanelProps {
  onClose: () => void;
}

const ResearchPanel: React.FC<ResearchPanelProps> = ({ onClose }) => {
  return (
    <div className="h-full overflow-y-auto p-8 bg-[#0f0f1f]/95 text-tamkin-star custom-scrollbar">
      <div className="flex justify-between items-center mb-10 sticky top-0 bg-[#0f0f1f]/95 py-4 border-b border-tamkin-core/40 z-10 backdrop-blur-sm">
        <h2 className="text-xl font-light tracking-wide text-tamkin-star">Architectural Basis</h2>
        <button 
          onClick={onClose}
          className="p-2 text-tamkin-light/50 hover:text-tamkin-light transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <p className="text-sm text-tamkin-star/60 mb-8 leading-7 border-l-2 border-tamkin-core pl-4">
        This is not a random generation. <br/>
        This logic is structurally grounded in the following frameworks.
      </p>

      {/* Living Knowledge Base Section */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-tamkin-light uppercase tracking-[0.2em] mb-4">Living Knowledge Base</h3>
        <div className="bg-tamkin-cosmic/50 p-5 rounded-xl border border-tamkin-core/30 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
           </div>
           <p className="text-xs text-tamkin-star/50 mb-3">The guide actively searches for new patterns in:</p>
           <ul className="space-y-2">
             {KNOWLEDGE_EXPANSION_QUERIES.map((query, i) => (
               <li key={i} className="text-xs text-tamkin-light/80 font-mono border-b border-dashed border-tamkin-core/20 pb-1 w-fit">
                 {query}
               </li>
             ))}
           </ul>
        </div>
      </div>

      <div className="space-y-6">
        {RESEARCH_PAPERS.map((paper, index) => (
          <div key={index} className="bg-tamkin-core/10 p-6 rounded-xl border border-tamkin-core/20 hover:border-tamkin-light/30 transition-colors duration-500 hover:bg-tamkin-core/20">
            <h3 className="text-lg text-tamkin-star font-normal mb-2 tracking-wide leading-snug">{paper.title}</h3>
            <p className="text-[10px] text-tamkin-light/60 uppercase tracking-widest mb-4 font-sans">{paper.authors}</p>
            <div className="mb-4">
              <p className="text-xs font-medium text-tamkin-light/80 mb-1">Core Concept</p>
              <p className="text-sm text-tamkin-star/70 leading-relaxed font-light">{paper.coreConcept}</p>
            </div>
            <div className="bg-[#0f0f1f]/50 p-4 rounded-lg border border-tamkin-core/10">
              <p className="text-xs font-medium text-tamkin-light mb-1">Architectural Insight</p>
              <p className="text-sm text-tamkin-star/60 italic font-light">{paper.insight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPanel;