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

    // Create tunnel geometry with more segments for smoother appearance
    const geometry = new THREE.CylinderGeometry(3, 3, 80, 64, 64, true);
    geometry.scale(-1, 1, 1); // Invert the cylinder

    // Create dynamic gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048; // Higher resolution
    canvas.height = 2048;
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#5f0889');
    gradient.addColorStop(0.3, '#9b87f5');
    gradient.addColorStop(0.6, '#6E59A5');
    gradient.addColorStop(1, '#5f0889');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 8); // More texture repetition

    // Enhanced shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        texture: { value: texture },
        mouseX: { value: 0 },
        mouseY: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Enhanced wave effect
          float wave = sin(position.y * 0.1 + time) * 0.2;
          wave += cos(position.x * 0.1 + time * 0.8) * 0.1;
          
          vec3 pos = position;
          pos.x += wave + mouseX * 0.5;
          pos.z += wave + mouseY * 0.5;
          
          // Spiral effect
          float angle = time * 0.2;
          pos.x += sin(pos.y * 0.2 + angle) * 0.3;
          pos.z += cos(pos.y * 0.2 + angle) * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D texture;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Dynamic UV coordinates
          vec2 uv = vUv;
          uv.y += time * 0.15; // Faster scrolling
          uv.x += sin(vPosition.y * 0.05 + time * 0.2) * 0.1;
          
          vec4 color = texture2D(texture, uv);
          
          // Enhanced effects
          float brightness = 1.0 + sin(time * 2.0) * 0.2;
          float alpha = 0.8 + sin(vPosition.y * 0.1 + time) * 0.2;
          
          // Add sparkle effect
          float sparkle = pow(sin(vPosition.y * 10.0 + time * 3.0) * 0.5 + 0.5, 2.0);
          color.rgb += vec3(sparkle) * 0.3;
          
          // Pulse effect
          color.rgb *= brightness;
          
          gl_FragColor = color;
          gl_FragColor.a = alpha;
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

      // Smooth uniform updates
      material.uniforms.time.value += 0.015;
      material.uniforms.mouseX.value += (mouseX - material.uniforms.mouseX.value) * 0.05;
      material.uniforms.mouseY.value += (mouseY - material.uniforms.mouseY.value) * 0.05;

      // Dynamic tunnel rotation
      tunnel.rotation.z += 0.002;
      tunnel.rotation.x = Math.sin(material.uniforms.time.value * 0.1) * 0.1;

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