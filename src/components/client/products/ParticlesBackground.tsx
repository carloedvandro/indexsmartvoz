
import { ParticlesBackgroundProps } from './particles/types';
import { useParticlesSetup } from './particles/useParticlesSetup';
import { useParticlesAnimation } from './particles/useParticlesAnimation';
import { useWindowResize } from './particles/useWindowResize';

export function ParticlesBackground({ style = "default" }: ParticlesBackgroundProps) {
  const {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
    particlesRef,
  } = useParticlesSetup(style);

  useParticlesAnimation(style, sceneRef, rendererRef, cameraRef, particlesRef);
  useWindowResize(cameraRef, rendererRef);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
  );
}
