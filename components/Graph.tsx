
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PhysicsState } from '../types';
import { COLORS } from '../constants';

interface GraphProps {
  state: PhysicsState;
}

const Graph: React.FC<GraphProps> = ({ state }) => {
  const { time, omega, radius } = state;

  const data = useMemo(() => {
    const points = [];
    const duration = 8; 
    const step = 0.05;
    for (let t = time - duration; t <= time; t += step) {
      if (t < 0) continue;
      points.push({
        t: parseFloat(t.toFixed(2)),
        y: radius * Math.sin(omega * t),
      });
    }
    return points;
  }, [time, omega, radius]);

  return (
    <div className="w-full h-full p-4 bg-slate-950/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4 px-2">
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest math-font mb-1">Live Waveform</h3>
          <p className="text-xs text-cyan-400 font-mono">y(t) = {radius.toFixed(0)} sin({omega.toFixed(1)}t)</p>
        </div>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="t" hide domain={['dataMin', 'dataMax']} />
            <YAxis domain={[-radius - 20, radius + 20]} hide />
            <Area
              type="monotone"
              dataKey="y"
              stroke={COLORS.particle}
              fill="url(#colorY)"
              strokeWidth={3}
              isAnimationActive={false}
            />
            <defs>
              <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.particle} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={COLORS.particle} stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
