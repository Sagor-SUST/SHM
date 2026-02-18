
import React, { useState } from 'react';
import { DERIVATION_STEPS } from '../constants';

const Derivation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {DERIVATION_STEPS.map((step, idx) => (
          <div
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeStep === idx
                ? 'bg-slate-800/80 border-cyan-500 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/30 border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep === idx ? 'text-cyan-400' : 'text-slate-500'}`}>
                    Step {step.id}
                </span>
                <span className="text-xs text-slate-400">{step.title}</span>
            </div>
            <div className={`text-lg font-bold math-font mb-2 ${activeStep === idx ? 'text-white' : 'text-slate-400'}`}>
              {step.formula}
            </div>
            {activeStep === idx && (
              <p className="text-xs text-slate-300 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl mt-4">
          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Final Conclusion</div>
          <div className="text-2xl font-bold math-font text-white text-center glow-white py-2">
            d²x/dt² = -ω²x
          </div>
          <p className="text-center text-[11px] text-cyan-200 mt-2 italic opacity-80">
            The acceleration is directly proportional to displacement and opposite in direction.
          </p>
      </div>
    </div>
  );
};

export default Derivation;
