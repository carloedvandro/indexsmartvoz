
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useParticlesSetup } from './particles/useParticlesSetup';
import { useParticlesAnimation } from './particles/useParticlesAnimation';
import { useWindowResize } from './particles/useWindowResize';
import { ParticlesBackgroundProps } from './particles/types';

const ParticlesBackground = ({ style = 'default' }: ParticlesBackgroundProps) => {
  const {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
    particlesRef,
  } = useParticlesSetup(style);

  useParticlesAnimation(
    style,
    sceneRef,
    rendererRef,
    cameraRef,
    particlesRef
  );

  useWindowResize(cameraRef, rendererRef);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticlesBackground;
