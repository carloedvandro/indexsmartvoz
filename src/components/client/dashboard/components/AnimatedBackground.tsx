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

    // Create bubble material with custom shader
    const bubbleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Add floating motion
          vec3 pos = position;
          float wave = sin(pos.x + uTime) * cos(pos.z + uTime) * 0.2;
          pos.y += wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Create gradient effect
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Purple theme colors
          vec3 color1 = vec3(0.608, 0.529, 0.961); // #9b87f5
          vec3 color2 = vec3(0.431, 0.349, 0.647); // #6E59A5
          vec3 color3 = vec3(0.839, 0.737, 0.980); // #D6BCFA
          
          // Animate colors
          float t = sin(uTime * 0.5) * 0.5 + 0.5;
          vec3 gradientColor = mix(
            mix(color1, color2, t),
            color3,
            smoothstep(0.0, 0.8, dist)
          );
          
          // Add glow effect
          float glow = 1.0 - smoothstep(0.0, 0.8, dist);
          gradientColor += glow * 0.2;
          
          // Add transparency
          float alpha = smoothstep(1.0, 0.2, dist);
          
          gl_FragColor = vec4(gradientColor, alpha * 0.7);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Create multiple bubbles
    const bubbles: THREE.Mesh[] = [];
    const numBubbles = 15;

    for (let i = 0; i < numBubbles; i++) {
      const size = Math.random() * 2 + 1;
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const bubble = new THREE.Mesh(geometry, bubbleMaterial);
      
      // Random position
      bubble.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      scene.add(bubble);
      bubbles.push(bubble);
    }

    // Position camera
    camera.position.z = 15;

    // Mouse movement
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      bubbleMaterial.uniforms.uMouse.value = mouse;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      bubbleMaterial.uniforms.uTime.value = elapsedTime * 0.5;
      
      // Animate bubbles
      bubbles.forEach((bubble, i) => {
        const speed = 0.2 + (i % 3) * 0.1;
        bubble.position.y = Math.sin(elapsedTime * speed + i) * 0.5;
        bubble.rotation.z = Math.sin(elapsedTime * speed * 0.5) * 0.2;
        bubble.rotation.x = Math.cos(elapsedTime * speed * 0.3) * 0.1;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
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
        background: 'linear-gradient(to bottom, #1A1F2C, #2D3748)',
        opacity: 0.9 
      }}
    />
  );
}