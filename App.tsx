
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Visualizer from './components/Visualizer';
import Graph from './components/Graph';
import Derivation from './components/Derivation';
import { PhysicsState } from './types';
import { Play, Pause, RotateCcw, Activity, ArrowRight, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<PhysicsState>({
    time: 0,
    omega: 2.0,
    radius: 120,
    phase: 0,
    isPaused: false,
  });

  const [showVectors, setShowVectors] = useState({
    radius: true,
    velocity: false,
    acceleration: false,
    projection: true,
  });

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined && !state.isPaused) {
      const deltaTime = (time - lastTimeRef.current) / 1000;
      setState(prev => ({
        ...prev,
        time: prev.time + deltaTime
      }));
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [state.isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const togglePause = () => setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  const reset = () => {
    setState(prev => ({ ...prev, time: 0 }));
    lastTimeRef.current = undefined;
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden text-slate-200 selection:bg-cyan-500/30">
      {/* Sidebar: Mathematical Derivation */}
      <aside className="w-96 border-r border-slate-800 flex flex-col p-6 bg-slate-900/20 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-white tracking-tight">SHM Lab</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">UCM to SHM Derivation</p>
            </div>
        </div>
        
        <Derivation />
      </aside>

      {/* Main Lab Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header/Controls */}
        <header className="p-6 flex items-center justify-between border-b border-slate-800/50">
            <div className="flex gap-4">
                <button 
                  onClick={togglePause}
                  className="p-3 bg-white text-slate-950 rounded-full hover:bg-cyan-100 transition-colors shadow-lg shadow-white/5"
                >
                    {state.isPaused ? <Play fill="currentColor" size={20} /> : <Pause fill="currentColor" size={20} />}
                </button>
                <button 
                  onClick={reset}
                  className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors border border-slate-700"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="flex items-center gap-8 bg-slate-900/40 p-2 px-6 rounded-2xl border border-slate-800 backdrop-blur-md">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Angular Velocity (ω)</span>
                    <input 
                      type="range" min="0.5" max="5" step="0.1" 
                      value={state.omega} 
                      onChange={(e) => setState(prev => ({ ...prev, omega: parseFloat(e.target.value) }))}
                      className="w-32 accent-cyan-400"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Amplitude (r)</span>
                    <input 
                      type="range" min="50" max="180" step="1" 
                      value={state.radius} 
                      onChange={(e) => setState(prev => ({ ...prev, radius: parseFloat(e.target.value) }))}
                      className="w-32 accent-amber-400"
                    />
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Time (t)</span>
                    <span className="text-lg font-mono text-cyan-400">{state.time.toFixed(2)}s</span>
                </div>
            </div>
        </header>

        {/* Interaction/Visualizer Section */}
        <div className="flex-1 relative flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center min-h-0">
            <Visualizer state={state} showVectors={showVectors} />
          </div>

          {/* Side Controls/Graphs */}
          <div className="w-full md:w-80 border-l border-slate-800/50 p-6 flex flex-col gap-6 bg-slate-900/10 backdrop-blur-sm">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Settings2 size={16} className="text-slate-400" />
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vector Analysis</h3>
                </div>
                {Object.entries(showVectors).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs text-slate-400 capitalize group-hover:text-white transition-colors">
                            {key === 'projection' ? 'Light Rays' : `${key} vector`}
                        </span>
                        <div 
                          onClick={() => setShowVectors(v => ({ ...v, [key]: !value }))}
                          className={`w-10 h-5 rounded-full transition-all duration-300 relative border ${
                            value ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-800 border-slate-700'
                          }`}
                        >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all duration-300 ${value ? 'left-5.5 ml-5' : 'left-0.5'}`} />
                        </div>
                    </label>
                ))}
            </div>

            <div className="flex-1 min-h-[200px]">
                <Graph state={state} />
            </div>
            
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    "Simple Harmonic Motion is the projection of uniform circular motion onto any diameter."
                </p>
            </div>
          </div>
        </div>

        {/* Instructional Toast */}
        <div className="absolute bottom-6 left-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-full animate-pulse">
                <ArrowRight size={14} className="text-cyan-400" />
            </div>
            <p className="text-[10px] font-semibold text-cyan-200">
                Observe how the shadow matches the real-time graph.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
