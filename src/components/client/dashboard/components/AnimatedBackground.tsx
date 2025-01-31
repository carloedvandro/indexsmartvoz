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

    // Create grid material with custom shader
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uMouseX;
        uniform float uMouseY;
        
        varying vec3 vPosition;
        
        void main() {
          vec3 pos = position;
          
          // Add wave motion
          float wave = sin(pos.x * 0.5 + uTime) * cos(pos.z * 0.5 + uTime) * 0.2;
          pos.y += wave;
          
          // Mouse influence
          float dist = distance(pos.xz, vec2(uMouseX, uMouseY) * 5.0);
          float influence = smoothstep(2.0, 0.0, dist) * 0.5;
          pos.y += influence;
          
          vPosition = pos;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        
        void main() {
          // Grid effect
          float grid = abs(fract(vPosition.x) - 0.5) + abs(fract(vPosition.z) - 0.5);
          grid = smoothstep(0.9, 0.1, grid);
          
          // Gradient colors (purple theme)
          vec3 color1 = vec3(0.608, 0.529, 0.961);  // #9b87f5
          vec3 color2 = vec3(0.431, 0.349, 0.647);  // #6E59A5
          vec3 finalColor = mix(color1, color2, vPosition.y * 0.5 + 0.5);
          
          // Add glow effect
          float glow = pow(grid, 2.0) * 0.8;
          finalColor = mix(finalColor, vec3(1.0), glow);
          
          gl_FragColor = vec4(finalColor, 0.7);
        }
      `,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide
    });

    // Create grid geometry
    const gridGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    scene.add(grid);

    // Position camera
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      gridMaterial.uniforms.uTime.value = elapsedTime * 0.5;
      gridMaterial.uniforms.uMouseX.value += (mouseX - gridMaterial.uniforms.uMouseX.value) * 0.1;
      gridMaterial.uniforms.uMouseY.value += (mouseY - gridMaterial.uniforms.uMouseY.value) * 0.1;
      
      // Rotate grid slightly
      grid.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;

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