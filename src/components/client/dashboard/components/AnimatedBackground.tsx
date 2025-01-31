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

    // Sound wave parameters
    const waveCount = 50;
    const waveSegments = 128;
    const waves: THREE.Line[] = [];
    const waveAmplitudes: number[] = [];
    
    // Theme colors with sound wave aesthetics
    const colors = [
      new THREE.Color('#9333EA'), // Deep Purple
      new THREE.Color('#A855F7'), // Medium Purple
      new THREE.Color('#6366F1'), // Indigo
      new THREE.Color('#F472B6')  // Pink
    ];

    // Create multiple sound waves
    for (let i = 0; i < waveCount; i++) {
      const waveGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(waveSegments * 3);
      
      for (let j = 0; j < waveSegments; j++) {
        const x = (j / waveSegments) * 60 - 30;
        positions[j * 3] = x;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = i * 0.5 - 15;
      }
      
      waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const waveMaterial = new THREE.LineBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      });
      
      const wave = new THREE.Line(waveGeometry, waveMaterial);
      waves.push(wave);
      waveAmplitudes.push(Math.random() * 2 + 1);
      scene.add(wave);
    }

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.x * 0.3;
      targetRotation.y = mouse.y * 0.2;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 30;

    // Animation with wave movement
    const animate = () => {
      requestAnimationFrame(animate);

      // Update waves with smooth animation
      waves.forEach((wave, index) => {
        const positions = wave.geometry.attributes.position.array as Float32Array;
        const time = Date.now() * 0.001;
        const amplitude = waveAmplitudes[index];
        
        for (let i = 0; i < waveSegments; i++) {
          const x = positions[i * 3];
          positions[i * 3 + 1] = Math.sin(x * 0.2 + time + index * 0.5) * amplitude;
        }
        
        wave.geometry.attributes.position.needsUpdate = true;
        
        // Add subtle wave rotation
        wave.rotation.y = Math.sin(time * 0.1) * 0.1;
      });

      // Smooth camera movement
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;
      
      camera.position.x = Math.sin(currentRotation.x) * 30;
      camera.position.y = Math.sin(currentRotation.y) * 30;
      camera.lookAt(scene.position);

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

    // Cleanup
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
        background: 'linear-gradient(to bottom, #0F172A, #1E293B)',
        opacity: 0.9 
      }}
    />
  );
}