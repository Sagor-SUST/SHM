
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
  const screenX = 500;
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
        {/* Background Light Beam (Volumetric effect) */}
        {showVectors.projection && (
          <defs>
            <linearGradient id="torchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
            </linearGradient>
          </defs>
        )}

        {/* Torch on the left */}
        <g transform="translate(20, 230)" className="glow-cyan opacity-80">
           <path d="M 0 10 L 30 0 L 30 40 L 0 30 Z" fill="#1e293b" stroke="#22d3ee" strokeWidth="2" />
           <rect x="30" y="5" width="5" height="30" fill="#22d3ee" />
           {/* Light source indicator */}
           <circle cx="35" cy="20" r="4" fill="white" />
        </g>

        {/* Parallel Light Rays from Left to Right */}
        {showVectors.projection && (
          <g opacity="0.3">
            {[...Array(9)].map((_, i) => (
              <line
                key={i}
                x1="40"
                y1={cy - radius + (i * radius * 2) / 8}
                x2={screenX}
                y2={cy - radius + (i * radius * 2) / 8}
                stroke="rgba(34, 211, 238, 0.1)"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Vertical Screen */}
        <line 
          x1={screenX} y1="50" x2={screenX} y2="450" 
          stroke={COLORS.screen} strokeWidth="6" 
          strokeLinecap="round"
        />
        <text x={screenX + 10} y="40" fill={COLORS.screen} className="text-[10px] font-bold math-font">VERTICAL SCREEN</text>

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

        {/* Torch-to-Particle ray (Projection) */}
        {showVectors.projection && (
          <g>
            <line
              x1="40"
              y1={py}
              x2={px}
              y2={py}
              stroke="rgba(34, 211, 238, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <line
              x1={px}
              y1={py}
              x2={screenX}
              y2={py}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="2 2"
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
            <text x={cx + 10} y={cy - 10} fill="#94a3b8" className="text-sm math-font italic">r</text>
            
            {/* Angle Indicator */}
            <path
              d={`M ${cx + 40} ${cy} A 40 40 0 0 0 ${cx + 40 * Math.cos(theta)} ${cy - 40 * Math.sin(theta)}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text 
               x={cx + 45 * Math.cos(theta / 2)} 
               y={cy - 45 * Math.sin(theta / 2)} 
               fill="#fbbf24" 
               className="text-[10px] math-font"
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
              strokeWidth="3"
              markerEnd="url(#arrowhead-v)"
            />
            <text x={px + vx + 5} y={py + vy + 5} fill={COLORS.velocity} className="text-[10px] math-font">v</text>
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
              strokeWidth="3"
              markerEnd="url(#arrowhead-a)"
            />
            <text x={px + ax/2} y={py + ay/2 - 10} fill={COLORS.acceleration} className="text-[10px] math-font">a</text>
          </g>
        )}

        {/* Particle */}
        <circle
          cx={px}
          cy={py}
          r="8"
          fill={COLORS.particle}
          className="glow-cyan"
        />

        {/* Shadow on the Vertical Screen */}
        <g className="glow-white">
          <circle
            cx={screenX}
            cy={shadowY}
            r="8"
            fill={COLORS.shadow}
            className="opacity-90"
          />
          <text x={screenX + 15} y={shadowY + 5} fill="white" className="text-xs math-font font-bold">y = r sin(ωt)</text>
        </g>

        {/* Definitions of Arrows */}
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
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Circular Motion (θ)</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_white]"></div>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">SHM Shadow (y)</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
