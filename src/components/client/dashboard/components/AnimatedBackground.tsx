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
    const particleCount = 3500;
    const orbitCount = 5;
    const particlesPerOrbit = particleCount / orbitCount;
    const orbitRadii = [3, 5, 7, 9, 11];
    const orbitSpeeds = [0.001, 0.0008, 0.0006, 0.0004, 0.0002];
    
    const particles: THREE.Points[] = [];
    const particleGroups: THREE.Group[] = [];

    // Theme colors as THREE.Color objects with improved gradient
    const colors = [
      new THREE.Color('#5f0889').multiplyScalar(1.2), // primary (brightened)
      new THREE.Color('#9b87f5'), // secondary
      new THREE.Color('#6E59A5'), // accent
      new THREE.Color('#8B5CF6'), // purple
      new THREE.Color('#7C3AED')  // violet
    ];

    orbitRadii.forEach((radius, orbitIndex) => {
      const positions = new Float32Array(particlesPerOrbit * 3);
      const particleColors = new Float32Array(particlesPerOrbit * 3);
      const orbitGroup = new THREE.Group();

      // Create particles for this orbit with improved distribution
      for (let i = 0; i < particlesPerOrbit; i++) {
        const angle = (i / particlesPerOrbit) * Math.PI * 2;
        const variance = (Math.random() - 0.5) * 0.5; // Add some randomness
        const x = Math.cos(angle) * (radius + variance);
        const y = Math.sin(angle) * (radius + variance);
        const z = (Math.random() - 0.5) * 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Enhanced color gradient with smooth transitions
        const color = colors[orbitIndex];
        const intensity = 0.8 + Math.random() * 0.4; // Random brightness variation
        particleColors[i * 3] = color.r * intensity;
        particleColors[i * 3 + 1] = color.g * intensity;
        particleColors[i * 3 + 2] = color.b * intensity;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });

      const particleSystem = new THREE.Points(geometry, material);
      orbitGroup.add(particleSystem);
      particles.push(particleSystem);
      particleGroups.push(orbitGroup);
      scene.add(orbitGroup);
    });

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.x * 0.4;
      targetRotation.y = mouse.y * 0.25;
      
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 20;

    // Animation with improved smoothness
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation interpolation with damping
      const dampingFactor = isMouseMoving ? 0.08 : 0.03;
      currentRotation.x += (targetRotation.x - currentRotation.x) * dampingFactor;
      currentRotation.y += (targetRotation.y - currentRotation.y) * dampingFactor;

      // Rotate each orbit group with enhanced movement
      particleGroups.forEach((group, index) => {
        group.rotation.z += orbitSpeeds[index];
        group.rotation.x = currentRotation.y;
        group.rotation.y = currentRotation.x;
        
        // Add subtle floating motion
        group.position.y = Math.sin(Date.now() * 0.001 + index) * 0.1;
      });

      // Dynamic particle effects
      const time = Date.now() * 0.001;
      particles.forEach((particle, index) => {
        const material = particle.material as THREE.PointsMaterial;
        // Smooth size pulsing
        material.size = 0.12 + Math.sin(time * 0.8 + index) * 0.04;
        // Gentle opacity variation
        material.opacity = 0.85 + Math.sin(time * 0.4 + index) * 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Improved resize handling with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      clearTimeout(resizeTimeout);
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