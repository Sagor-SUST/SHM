
import React, { useMemo } from 'react';
import { PhysicsState, VectorData } from '../types';
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
  const cx = 250;
  const cy = 250;

  // Particle Position
  const px = cx + radius * Math.cos(theta);
  const py = cy - radius * Math.sin(theta); // SVG y is inverted

  // Shadow Position (on horizontal diameter projected to screen)
  const shadowX = cx + radius * Math.cos(theta);
  const shadowY = 480; // Fixed screen line at the bottom

  // Vectors
  const velocityMag = radius * omega * 0.5; // Scale for visual
  const accelMag = radius * Math.pow(omega, 2) * 0.2; // Scale for visual

  // Tangent Velocity
  const vx = -velocityMag * Math.sin(theta);
  const vy = -velocityMag * Math.cos(theta);

  // Centripetal Acceleration (towards center)
  const ax = -accelMag * Math.cos(theta);
  const ay = accelMag * Math.sin(theta);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 600 550"
        className="w-full h-full max-w-2xl overflow-visible"
      >
        {/* Shadow Screen (Vertical line interpreted as ground for this view) */}
        <line 
          x1="50" y1="480" x2="450" y2="480" 
          stroke={COLORS.screen} strokeWidth="4" 
          strokeDasharray="4 4" 
        />
        <text x="460" y="485" fill={COLORS.screen} className="text-xs math-font">SCREEN</text>

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

        {/* Projection Lines (Torch from center casting shadow) */}
        {showVectors.projection && (
          <g>
            <line
              x1={cx}
              y1={cy}
              x2={px}
              y2={py}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            {/* Vertical projection line showing how particle maps to x-axis */}
            <line
              x1={px}
              y1={py}
              x2={shadowX}
              y2={shadowY}
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
               className="text-xs math-font"
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
            <text x={px + vx + 5} y={py + vy + 5} fill={COLORS.velocity} className="text-sm math-font">v</text>
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
            <text x={px + ax/2} y={py + ay/2 - 10} fill={COLORS.acceleration} className="text-sm math-font">a</text>
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

        {/* Torch Icon at Center */}
        <g transform={`translate(${cx-10}, ${cy-10})`} className="opacity-80">
          <circle cx="10" cy="10" r="12" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 10 10 L 30 10 L 30 5 L 40 10 L 30 15 L 30 10" fill="none" stroke="white" />
        </g>

        {/* Shadow on the Screen */}
        <circle
          cx={shadowX}
          cy={shadowY}
          r="6"
          fill={COLORS.shadow}
          className="glow-white opacity-90"
        />
        <text x={shadowX - 10} y={shadowY + 25} fill="white" className="text-xs math-font font-bold">x = r cos(ωt)</text>

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
      
      {/* Floating Indicators */}
      <div className="absolute top-4 left-4 space-y-2 pointer-events-none">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <span className="text-xs text-slate-300 font-medium">Uniform Circular Motion (UCM)</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span className="text-xs text-slate-300 font-medium">Simple Harmonic Motion (SHM)</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
