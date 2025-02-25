
export type ParticleStyle = "default" | "stars" | "fireflies" | "snow" | "matrix";

export interface ParticlesBackgroundProps {
  style?: ParticleStyle;
}

export interface ParticleConfig {
  count: number;
  size: number;
  color: string;
  opacity: number;
  spread: number;
}
