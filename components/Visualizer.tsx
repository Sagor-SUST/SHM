
import React from 'react';
import { PhysicsState } from '../types';
import { COLORS } from '../constants';

interface VisualizerProps {
  state: PhysicsState;
  showVectors: {
    radius: boolean;
    velocity: boolean;
    acceleration: boolean;
    projection: boolean;
  };
}

const Visualizer: React.FC<VisualizerProps> = ({ state, showVectors }) => {
  const { time, omega, radius } = state;
  const theta = omega * time;

  // Center of the circular motion
  const cx = 220;
  const cy = 250;

  // Particle Position
  const px = cx + radius * Math.cos(theta);
  const py = cy - radius * Math.sin(theta); 

  // Vertical Screen Position (on the right)
  const screenX = 520;
  const shadowY = py;

  // Vector Scaling
  const velocityMag = radius * omega * 0.4;
  const accelMag = radius * Math.pow(omega, 2) * 0.15;

  // Velocity (Tangent)
  const vx = -velocityMag * Math.sin(theta);
  const vy = -velocityMag * Math.cos(theta);

  // Acceleration (Towards Center)
  const ax = -accelMag * Math.cos(theta);
  const ay = accelMag * Math.sin(theta);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 600 550"
        className="w-full h-full max-w-2xl overflow-visible"
      >
        <defs>
          <linearGradient id="torchBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.15)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
          <radialGradient id="shadowGlow">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>

        {/* Large Torch / Light Source on the left */}
        <g transform={`translate(10, ${cy - 40})`} className="glow-cyan">
           {/* Torch Body */}
           <path d="M 0 10 L 50 0 L 50 80 L 0 70 Z" fill="#1e293b" stroke="#22d3ee" strokeWidth="3" />
           <rect x="50" y="5" width="10" height="70" fill="#22d3ee" className="opacity-80" />
           {/* Inner glow of the lens */}
           <ellipse cx="55" cy="40" rx="4" ry="35" fill="white" />
        </g>

        {/* Main Light Beam Area */}
        {showVectors.projection && (
          <rect 
            x="60" 
            y={cy - radius - 20} 
            width={screenX - 60} 
            height={radius * 2 + 40} 
            fill="url(#torchBeam)" 
            className="pointer-events-none"
          />
        )}

        {/* Parallel Light Rays from Left to Right */}
        {showVectors.projection && (
          <g opacity="0.4">
            {[...Array(13)].map((_, i) => (
              <line
                key={i}
                x1="60"
                y1={cy - radius - 10 + (i * (radius * 2 + 20)) / 12}
                x2={screenX}
                y2={cy - radius - 10 + (i * (radius * 2 + 20)) / 12}
                stroke="rgba(34, 211, 238, 0.2)"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Vertical Screen */}
        <line 
          x1={screenX} y1="40" x2={screenX} y2="460" 
          stroke={COLORS.screen} strokeWidth="8" 
          strokeLinecap="round"
        />
        <text x={screenX - 20} y="30" fill={COLORS.screen} className="text-[12px] font-bold math-font text-right">SCREEN</text>

        {/* Circular Path */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="2"
          strokeDasharray="8 8"
        />

        {/* Focal ray highlighting the particle's specific shadow path */}
        {showVectors.projection && (
          <g className="glow-cyan">
            <line
              x1="60"
              y1={py}
              x2={px}
              y2={py}
              stroke="#22d3ee"
              strokeWidth="3"
              strokeDasharray="5 3"
              className="opacity-60"
            />
            <line
              x1={px}
              y1={py}
              x2={screenX}
              y2={py}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeDasharray="2 4"
            />
          </g>
        )}

        {/* Radius Vector */}
        {showVectors.radius && (
          <g className="glow-white">
            <line
              x1={cx}
              y1={cy}
              x2={px}
              y2={py}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r="4" fill="#94a3b8" />
            <text x={cx + 10} y={cy - 10} fill="#94a3b8" className="text-sm math-font italic font-bold">r</text>
            
            {/* Angle Indicator */}
            <path
              d={`M ${cx + 40} ${cy} A 40 40 0 0 0 ${cx + 40 * Math.cos(theta)} ${cy - 40 * Math.sin(theta)}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text 
               x={cx + 50 * Math.cos(theta / 2)} 
               y={cy - 50 * Math.sin(theta / 2)} 
               fill="#fbbf24" 
               className="text-[12px] math-font font-bold"
            >
              θ
            </text>
          </g>
        )}

        {/* Velocity Vector (Tangent) */}
        {showVectors.velocity && (
          <g className="glow-amber">
            <line
              x1={px}
              y1={py}
              x2={px + vx}
              y2={py + vy}
              stroke={COLORS.velocity}
              strokeWidth="4"
              markerEnd="url(#arrowhead-v)"
            />
            <text x={px + vx + 5} y={py + vy + 5} fill={COLORS.velocity} className="text-[12px] math-font font-bold">v</text>
          </g>
        )}

        {/* Acceleration Vector (Centripetal) */}
        {showVectors.acceleration && (
          <g className="glow-fuchsia">
            <line
              x1={px}
              y1={py}
              x2={px + ax}
              y2={py + ay}
              stroke={COLORS.acceleration}
              strokeWidth="4"
              markerEnd="url(#arrowhead-a)"
            />
            <text x={px + ax/2} y={py + ay/2 - 15} fill={COLORS.acceleration} className="text-[12px] math-font font-bold">a</text>
          </g>
        )}

        {/* The Particle itself */}
        <circle
          cx={px}
          cy={py}
          r="10"
          fill={COLORS.particle}
          className="glow-cyan"
        />

        {/* The Shadow on the Vertical Screen - Enlarged and Glowing */}
        <g className="glow-white">
          <circle
            cx={screenX}
            cy={shadowY}
            r="12"
            fill="url(#shadowGlow)"
            className="opacity-100"
          />
          <circle
            cx={screenX}
            cy={shadowY}
            r="6"
            fill="white"
          />
          <text 
            x={screenX + 20} 
            y={shadowY + 5} 
            fill="white" 
            className="text-sm math-font font-bold tracking-tight"
          >
            y = r sin(ωt)
          </text>
        </g>

        {/* Arrowhead Definitions */}
        <defs>
          <marker id="arrowhead-v" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.velocity} />
          </marker>
          <marker id="arrowhead-a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.acceleration} />
          </marker>
        </defs>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 space-y-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                <span className="text-[11px] text-slate-200 font-bold uppercase tracking-widest">Particle Position (UCM)</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_12px_white]"></div>
                <span className="text-[11px] text-slate-200 font-bold uppercase tracking-widest">Shadow Projection (SHM)</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
