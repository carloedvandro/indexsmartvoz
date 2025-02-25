
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

    for (let i = 0; i < config.count * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * config.spread;
      posArray[i + 1] = (Math.random() - 0.5) * config.spread;
      posArray[i + 2] = (Math.random() - 0.5) * config.spread;
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
          case "fireflies":
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
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

          case "matrix":
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.0003) * 0.3;
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
