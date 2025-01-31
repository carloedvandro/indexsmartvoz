import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create wave points
    const waveCount = 100;
    const waves = new Array(5).fill(null).map((_, waveIndex) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(waveCount * 3);
      const colors = new Float32Array(waveCount * 3);

      for (let i = 0; i < waveCount; i++) {
        const x = (i - waveCount / 2) * 0.3;
        const y = Math.sin(i * 0.2) * 0.5;
        const z = -5 + waveIndex * 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Gradient colors from purple to light blue
        const color = new THREE.Color();
        color.setHSL(0.75 + waveIndex * 0.05, 0.6, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 2,
        transparent: true,
        opacity: 0.7,
      });

      return new THREE.Line(geometry, material);
    });

    waves.forEach(wave => scene.add(wave));

    // Position camera
    camera.position.z = 10;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotation.x = mouse.y * 0.3;
      targetRotation.y = mouse.x * 0.3;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      // Update wave positions
      waves.forEach((wave, waveIndex) => {
        const positions = wave.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < waveCount; i++) {
          const time = Date.now() * 0.001;
          const offset = i * 0.2 + waveIndex * 0.3;
          
          // Create wave motion
          positions[i * 3 + 1] = 
            Math.sin(time + offset) * 0.3 + // Base wave
            Math.sin(time * 1.5 + offset * 2) * 0.1 + // Secondary wave
            Math.sin(time * 2 + offset * 3) * 0.05; // Tertiary wave
        }
        wave.geometry.attributes.position.needsUpdate = true;
        
        // Rotate waves based on mouse position
        wave.rotation.x = currentRotation.x;
        wave.rotation.y = currentRotation.y;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        background: '#403E43',
        opacity: 0.95 
      }}
    />
  );
}