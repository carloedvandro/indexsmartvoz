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

    // Create particle systems
    const particleCount = 2000;
    const particlesPerSystem = particleCount / 2;
    
    // Theme colors
    const colors = [
      new THREE.Color('#9b87f5'), // Primary Purple
      new THREE.Color('#7E69AB'), // Secondary Purple
      new THREE.Color('#6E59A5'), // Tertiary Purple
      new THREE.Color('#8B5CF6')  // Vivid Purple
    ];

    const particleSystems: THREE.Points[] = [];
    const particleGroups: THREE.Group[] = [];

    // Create two particle systems with different behaviors
    for (let i = 0; i < 2; i++) {
      const positions = new Float32Array(particlesPerSystem * 3);
      const colors = new Float32Array(particlesPerSystem * 3);
      const group = new THREE.Group();

      for (let j = 0; j < particlesPerSystem; j++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 3 + Math.random() * 2;

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color().setHSL(0.75 + Math.random() * 0.1, 0.6, 0.6);
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particleSystem = new THREE.Points(geometry, material);
      group.add(particleSystem);
      particleSystems.push(particleSystem);
      particleGroups.push(group);
      scene.add(group);
    }

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.x * 0.2;
      targetRotation.y = mouse.y * 0.1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 10;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation interpolation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;

      // Rotate particle groups with different speeds
      particleGroups.forEach((group, index) => {
        const speed = 0.0003 * (index + 1);
        group.rotation.y += speed;
        group.rotation.x = currentRotation.y * 0.5;
        group.rotation.z = currentRotation.x * 0.5;
      });

      // Dynamic particle effects
      const time = Date.now() * 0.0005;
      particleSystems.forEach((system, index) => {
        const positions = system.geometry.attributes.position.array as Float32Array;
        const colors = system.geometry.attributes.color.array as Float32Array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];
          
          // Subtle position animation
          positions[i] = x + Math.sin(time + x) * 0.01;
          positions[i + 1] = y + Math.cos(time + y) * 0.01;
          positions[i + 2] = z + Math.sin(time + z) * 0.01;
          
          // Color pulsation
          const hue = 0.75 + Math.sin(time + i) * 0.05;
          const color = new THREE.Color().setHSL(hue, 0.6, 0.6);
          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;
        }
        
        system.geometry.attributes.position.needsUpdate = true;
        system.geometry.attributes.color.needsUpdate = true;
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