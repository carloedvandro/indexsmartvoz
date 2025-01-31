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

    // Create particles
    const particleCount = 1500; // Aumentado número de partículas
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position - distribuição mais ampla
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Velocity - movimento mais suave
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      // Tamanhos variados para mais profundidade
      sizes[i] = Math.random() * 0.2;

      // Color - esquema de cores atualizado
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Rosa suave
        colors[i * 3] = 0.957;     // 244/255
        colors[i * 3 + 1] = 0.839; // 214/255
        colors[i * 3 + 2] = 0.961; // 245/255
      } else if (colorChoice < 0.6) {
        // Roxo médio
        colors[i * 3] = 0.686;     // 175/255
        colors[i * 3 + 1] = 0.529; // 135/255
        colors[i * 3 + 2] = 0.918; // 234/255
      } else {
        // Azul claro
        colors[i * 3] = 0.839;     // 214/255
        colors[i * 3 + 1] = 0.898; // 229/255
        colors[i * 3 + 2] = 0.980; // 250/255
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Textura personalizada para partículas
    const sprite = new THREE.TextureLoader().load('/placeholder.svg');
    
    const material = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      map: sprite,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction com efeito mais suave
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotation.x = mouse.y * 0.5;
      targetRotation.y = mouse.x * 0.5;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 20;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Suavizar rotação
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      // Update particle positions
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        // Apply velocity with wave effect
        positions[i * 3] += velocities[i * 3] + Math.sin(Date.now() * 0.001 + i) * 0.01;
        positions[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(Date.now() * 0.001 + i) * 0.01;
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Mouse influence suave
        const dx = mouse.x * 0.05;
        const dy = mouse.y * 0.05;
        
        positions[i * 3] += dx * 0.01;
        positions[i * 3 + 1] += dy * 0.01;

        // Boundary check com wrap-around suave
        const bound = 15;
        if (Math.abs(positions[i * 3]) > bound) {
          positions[i * 3] *= -0.95;
          velocities[i * 3] *= -1;
        }
        if (Math.abs(positions[i * 3 + 1]) > bound) {
          positions[i * 3 + 1] *= -0.95;
          velocities[i * 3 + 1] *= -1;
        }
        if (Math.abs(positions[i * 3 + 2]) > bound) {
          positions[i * 3 + 2] *= -0.95;
          velocities[i * 3 + 2] *= -1;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Rotação suave do sistema de partículas
      particles.rotation.x = currentRotation.x;
      particles.rotation.y = currentRotation.y;
      particles.rotation.z += 0.0003;

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
        background: 'linear-gradient(135deg, #F5EDFF 0%, #E5F1FF 50%, #F0E6FF 100%)',
        opacity: 0.9 
      }}
    />
  );
}