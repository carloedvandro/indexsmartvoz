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

    // Create tunnel material with custom shader
    const tunnelMaterial = new THREE.ShaderMaterial({
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
          
          // Add wave motion
          vec3 pos = position;
          float wave = sin(pos.z * 0.5 + uTime) * 0.1;
          pos.x += wave;
          pos.y += wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Create tunnel effect
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);
          
          // Purple theme colors
          vec3 color1 = vec3(0.608, 0.529, 0.961); // #9b87f5
          vec3 color2 = vec3(0.494, 0.349, 0.647); // #7E69AB
          vec3 color3 = vec3(0.431, 0.349, 0.647); // #6E59A5
          
          // Animate colors
          float t = sin(uTime * 0.5) * 0.5 + 0.5;
          vec3 tunnelColor = mix(
            mix(color1, color2, t),
            color3,
            smoothstep(0.0, 0.8, dist)
          );
          
          // Add glow effect
          float glow = exp(-2.0 * dist);
          tunnelColor += glow * 0.5;
          
          // Add rings
          float rings = sin(dist * 20.0 - uTime * 2.0) * 0.5 + 0.5;
          tunnelColor += rings * 0.2;
          
          // Add transparency for depth effect
          float alpha = smoothstep(1.0, 0.2, dist);
          
          gl_FragColor = vec4(tunnelColor, alpha * 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Create tunnel segments
    const tunnelSegments: THREE.Mesh[] = [];
    const numSegments = 20;
    const segmentSpacing = 0.5;

    for (let i = 0; i < numSegments; i++) {
      const radius = 2 + Math.sin(i * 0.2) * 0.5;
      const geometry = new THREE.TorusGeometry(radius, 0.2, 32, 64);
      const segment = new THREE.Mesh(geometry, tunnelMaterial);
      
      segment.position.z = -i * segmentSpacing;
      segment.rotation.z = i * 0.1;
      
      scene.add(segment);
      tunnelSegments.push(segment);
    }

    // Position camera
    camera.position.z = 5;

    // Mouse movement
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      tunnelMaterial.uniforms.uMouse.value = mouse;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      tunnelMaterial.uniforms.uTime.value = elapsedTime * 0.5;
      
      // Animate tunnel segments
      tunnelSegments.forEach((segment, i) => {
        segment.position.z += 0.02;
        if (segment.position.z > 5) {
          segment.position.z = -numSegments * segmentSpacing;
        }
        
        segment.rotation.z = elapsedTime * 0.1 + i * 0.1;
        segment.rotation.x = Math.sin(elapsedTime * 0.2 + i * 0.1) * 0.1;
      });

      // Camera movement
      camera.position.x = Math.sin(elapsedTime * 0.5) * 0.5;
      camera.position.y = Math.cos(elapsedTime * 0.5) * 0.5;
      camera.lookAt(0, 0, -10);

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