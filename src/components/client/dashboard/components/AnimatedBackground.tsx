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

    // Create orbital particle systems
    const particleCount = 3000;
    const orbitCount = 5;
    const particlesPerOrbit = particleCount / orbitCount;
    const orbitRadii = [3, 5, 7, 9, 11];
    const orbitSpeeds = [0.001, 0.0008, 0.0006, 0.0004, 0.0002];
    
    const particles: THREE.Points[] = [];
    const particleGroups: THREE.Group[] = [];

    // Theme colors
    const colors = [
      new THREE.Color('#5f0889'), // primary
      new THREE.Color('#9b87f5'), // secondary
      new THREE.Color('#6E59A5'), // accent
      new THREE.Color('#8B5CF6'), // purple
      new THREE.Color('#7C3AED')  // violet
    ];

    orbitRadii.forEach((radius, orbitIndex) => {
      const positions = new Float32Array(particlesPerOrbit * 3);
      const colors = new Float32Array(particlesPerOrbit * 3);
      const orbitGroup = new THREE.Group();

      // Create particles for this orbit
      for (let i = 0; i < particlesPerOrbit; i++) {
        const angle = (i / particlesPerOrbit) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Color gradient
        const color = colors[orbitIndex % colors.length];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(geometry, material);
      orbitGroup.add(particleSystem);
      particles.push(particleSystem);
      particleGroups.push(orbitGroup);
      scene.add(orbitGroup);
    });

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 20;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate each orbit group
      particleGroups.forEach((group, index) => {
        group.rotation.z += orbitSpeeds[index];
        group.rotation.x += orbitSpeeds[index] * 0.5;

        // Mouse influence
        group.rotation.y += mouse.x * 0.0001;
        group.position.y += mouse.y * 0.001;
      });

      // Pulsing effect
      particles.forEach((particle, index) => {
        const scale = 1 + Math.sin(Date.now() * 0.001 + index) * 0.1;
        particle.scale.set(scale, scale, scale);
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
        background: 'linear-gradient(to bottom, #E5DEFF, #D3E4FD)',
        opacity: 0.9 
      }}
    />
  );
}