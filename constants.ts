
import { DerivationStep } from './types';

export const DERIVATION_STEPS: DerivationStep[] = [
  {
    id: 1,
    title: "Angular Position",
    formula: "θ = ωt",
    description: "The particle moves with constant angular velocity ω. Its angular position θ at time t is the product of ω and t."
  },
  {
    id: 2,
    title: "Horizontal Projection",
    formula: "x = r cos(θ)",
    description: "The shadow's position on the x-axis is the horizontal projection of the radius vector r."
  },
  {
    id: 3,
    title: "Displacement Equation",
    formula: "x(t) = r cos(ωt)",
    description: "Substituting θ = ωt into the projection gives the periodic displacement function."
  },
  {
    id: 4,
    title: "Velocity",
    formula: "v = dx/dt = -rω sin(ωt)",
    description: "Differentiating displacement with respect to time gives the instantaneous velocity of the shadow."
  },
  {
    id: 5,
    title: "Acceleration",
    formula: "a = dv/dt = -rω² cos(ωt)",
    description: "Differentiating velocity reveals the acceleration, which is proportional to -cos(ωt)."
  },
  {
    id: 6,
    title: "SHM Conclusion",
    formula: "a = -ω²x",
    description: "Since x = r cos(ωt), we find a = -ω²x. This is the defining equation of Simple Harmonic Motion."
  }
];

export const COLORS = {
  background: '#020617',
  particle: '#22d3ee', // Cyan
  radius: '#94a3b8',   // Slate
  velocity: '#facc15', // Yellow
  acceleration: '#f472b6', // Pink/Fuchsia
  shadow: '#ffffff',   // White
  screen: '#1e293b'    // Dark Blue
};
