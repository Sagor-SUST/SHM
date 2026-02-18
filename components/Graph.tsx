
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PhysicsState } from '../types';
import { COLORS } from '../constants';

interface GraphProps {
  state: PhysicsState;
}

const Graph: React.FC<GraphProps> = ({ state }) => {
  const { time, omega, radius } = state;

  // Generate data points for the last few cycles
  const data = useMemo(() => {
    const points = [];
    const duration = 10; // 10 seconds of history
    const step = 0.1;
    for (let t = time - duration; t <= time; t += step) {
      if (t < 0) continue;
      points.push({
        t: parseFloat(t.toFixed(1)),
        x: radius * Math.cos(omega * t),
      });
    }
    return points;
  }, [time, omega, radius]);

  return (
    <div className="w-full h-full p-2 bg-slate-950/40 rounded-xl border border-slate-800 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest math-font">Displacement vs Time</h3>
        <span className="text-[10px] text-cyan-400 font-mono">x(t) = {radius.toFixed(0)} cos({omega.toFixed(1)}t)</span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="t" 
            hide 
            domain={['dataMin', 'dataMax']} 
          />
          <YAxis 
            domain={[-radius - 20, radius + 20]} 
            hide
          />
          <Area
            type="monotone"
            dataKey="x"
            stroke={COLORS.particle}
            fill="url(#colorX)"
            strokeWidth={2}
            isAnimationActive={false}
          />
          <defs>
            <linearGradient id="colorX" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.particle} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={COLORS.particle} stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
