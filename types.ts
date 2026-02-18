
export interface PhysicsState {
  time: number;
  omega: number; // Angular velocity
  radius: number;
  phase: number;
  isPaused: boolean;
}

export interface VectorData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  color: string;
  visible: boolean;
}

export interface DerivationStep {
  id: number;
  title: string;
  formula: string;
  description: string;
}
