
import { DerivationStep } from './types';

export const DERIVATION_STEPS: DerivationStep[] = [
  {
    id: 1,
    title: "Angular Position",
    formula: "θ = ωt",
    description: "The particle moves along the circle with constant angular velocity ω. Its angle θ increases linearly with time."
  },
  {
    id: 2,
    title: "Vertical Projection",
    formula: "y = r sin(θ)",
    description: "The shadow's height on the vertical screen is the projection of the radius vector onto the y-axis."
  },
  {
    id: 3,
    title: "Displacement Equation",
    formula: "y(t) = r sin(ωt)",
    description: "Substituting θ = ωt gives the vertical position of the shadow as a sinusoidal function of time."
  },
  {
    id: 4,
    title: "Velocity",
    formula: "v_y = dy/dt = rω cos(ωt)",
    description: "The vertical velocity of the shadow is the derivative of its position, oscillating with phase shifted by 90°."
  },
  {
    id: 5,
    title: "Acceleration",
    formula: "a_y = dv_y/dt = -rω² sin(ωt)",
    description: "Differentiating velocity reveals that acceleration is proportional to the negative of the displacement."
  },
  {
    id: 6,
    title: "SHM Conclusion",
    formula: "a = -ω²y",
    description: "Since y = r sin(ωt), we find a = -ω²y. This confirms the shadow performs Simple Harmonic Motion."
  }
];

export const COLORS = {
  background: '#020617',
  particle: '#22d3ee', // Cyan
  radius: '#94a3b8',   // Slate
  velocity: '#facc15', // Yellow
  acceleration: '#f472b6', // Pink/Fuchsia
  shadow: '#ffffff',   // White
  screen: '#1e293b',   // Dark Blue
  lightRay: 'rgba(34, 211, 238, 0.05)'
};
