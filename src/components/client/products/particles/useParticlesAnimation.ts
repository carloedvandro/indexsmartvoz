
import { MutableRefObject, useEffect } from 'react';
import * as THREE from 'three';
import { ParticleStyle } from './types';
import { particleConfigs } from './configs';

export function useParticlesAnimation(
  style: ParticleStyle,
  sceneRef: MutableRefObject<THREE.Scene | null>,
  rendererRef: MutableRefObject<THREE.WebGLRenderer | null>,
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>,
  particlesRef: MutableRefObject<THREE.Points | null>
) {
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    const config = particleConfigs[style];
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(config.count * 3);
    const velocityArray = new Float32Array(config.count);

    for (let i = 0; i < config.count * 3; i += 3) {
      if (style === 'matrix') {
        // Distribui as partículas em uma grade mais organizada para o efeito matrix
        posArray[i] = (Math.random() - 0.5) * config.spread;     // X
        posArray[i + 1] = Math.random() * config.spread * 2;     // Y (altura)
        posArray[i + 2] = (Math.random() - 0.5) * (config.spread / 2); // Z (mais próximo)
        velocityArray[i / 3] = Math.random() * 0.02 + 0.01; // Velocidade individual
      } else {
        posArray[i] = (Math.random() - 0.5) * config.spread;
        posArray[i + 1] = (Math.random() - 0.5) * config.spread;
        posArray[i + 2] = (Math.random() - 0.5) * config.spread;
      }
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: config.size,
      color: config.color,
      transparent: true,
      opacity: config.opacity,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particles);
    particlesRef.current = particles;

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (particlesRef.current) {
        switch (style) {
          case "matrix":
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
              // Move cada partícula para baixo com sua velocidade individual
              positions[i + 1] -= velocityArray[i / 3];
              
              // Quando a partícula chega ao fundo, reseta para o topo
              if (positions[i + 1] < -config.spread) {
                positions[i + 1] = config.spread;
                // Varia levemente a posição X e Z ao resetar
                positions[i] = (Math.random() - 0.5) * config.spread;
                positions[i + 2] = (Math.random() - 0.5) * (config.spread / 2);
              }
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
            break;

          case "fireflies":
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
            const firefliesPositions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < firefliesPositions.length; i += 3) {
              const time = Date.now() * 0.001;
              const offset = i * 0.1;
              particlesMaterial.opacity = 0.3 + Math.sin(time + offset) * 0.3;
            }
            break;

          case "stars":
            particlesRef.current.rotation.x += 0.0001;
            particlesRef.current.rotation.y += 0.0001;
            break;

          case "snow":
            particlesRef.current.rotation.y += 0.0002;
            particlesRef.current.position.y = (Math.sin(Date.now() * 0.0005) * 0.5) - 0.5;
            break;

          default:
            particlesRef.current.rotation.x += 0.002;
            particlesRef.current.rotation.y += 0.001;
            particlesRef.current.rotation.z += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
      }

      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      sceneRef.current?.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [style, sceneRef, rendererRef, cameraRef, particlesRef]);
}
