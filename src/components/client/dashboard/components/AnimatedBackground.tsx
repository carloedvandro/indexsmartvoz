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

    // Create tunnel geometry
    const geometry = new THREE.CylinderGeometry(2, 2, 50, 32, 50, true);
    geometry.scale(-1, 1, 1); // Invert the cylinder so we see the inside

    // Create gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#5f0889');
    gradient.addColorStop(0.5, '#9b87f5');
    gradient.addColorStop(1, '#6E59A5');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 4);

    // Create material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        texture: { value: texture },
        mouseX: { value: 0 },
        mouseY: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Add wave effect
          float wave = sin(pos.y * 0.2 + time) * 0.1;
          pos.x += wave;
          pos.z += wave;
          
          // Add mouse influence
          pos.x += mouseX * 0.5;
          pos.y += mouseY * 0.5;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D texture;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          uv.y += time * 0.1; // Scrolling effect
          
          vec4 color = texture2D(texture, uv);
          
          // Add pulse effect
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          color.rgb *= pulse;
          
          gl_FragColor = color;
          gl_FragColor.a = 0.7; // Set transparency
        }
      `,
      transparent: true,
      side: THREE.BackSide
    });

    const tunnel = new THREE.Mesh(geometry, material);
    scene.add(tunnel);

    // Position camera
    camera.position.z = 5;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update uniforms
      material.uniforms.time.value += 0.01;
      material.uniforms.mouseX.value += (mouseX - material.uniforms.mouseX.value) * 0.05;
      material.uniforms.mouseY.value += (mouseY - material.uniforms.mouseY.value) * 0.05;

      // Rotate tunnel
      tunnel.rotation.z += 0.001;

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
        background: 'linear-gradient(to bottom, #ffffff, #f8f9fe)',
        opacity: 0.8 
      }}
    />
  );
}