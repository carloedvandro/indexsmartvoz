
import { ParticleStyle, ParticleConfig } from './types';

export const particleConfigs: Record<ParticleStyle, ParticleConfig> = {
  fireflies: {
    count: 100,
    size: 0.05,
    color: '#ffaa00',
    opacity: 0.6,
    spread: 10,
  },
  stars: {
    count: 2000,
    size: 0.005,
    color: '#ffffff',
    opacity: 0.8,
    spread: 20,
  },
  snow: {
    count: 3000,
    size: 0.02,
    color: '#ffffff',
    opacity: 0.4,
    spread: 15,
  },
  matrix: {
    count: 2000,
    size: 0.02,
    color: '#ff1d8e',
    opacity: 0.6,
    spread: 25,
  },
  default: {
    count: 1500,
    size: 0.02,
    color: '#9b87f5',
    opacity: 1,
    spread: 15,
  },
};
