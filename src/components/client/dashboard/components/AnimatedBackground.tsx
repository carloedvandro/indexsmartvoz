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

    // Create nebula material with custom shader
    const nebulaMaterial = new THREE.ShaderMaterial({
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
          float wave = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * 0.1;
          pos.z += wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Noise functions
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        vec2 rotate(vec2 v, float a) {
          float s = sin(a);
          float c = cos(a);
          mat2 m = mat2(c, -s, s, c);
          return m * v;
        }
        
        void main() {
          // Create nebula effect
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);
          
          // Soft colors
          vec3 color1 = vec3(0.898, 0.871, 1.000); // #E5DEFF
          vec3 color2 = vec3(0.827, 0.412, 0.671); // #D369AB
          vec3 color3 = vec3(0.608, 0.529, 0.961); // #9b87f5
          
          // Time-based rotation
          vec2 rotatedUv = rotate(vUv - center, uTime * 0.1) + center;
          
          // Create layers of noise
          float noise1 = random(rotatedUv * 2.0 + uTime * 0.1);
          float noise2 = random(rotatedUv * 4.0 - uTime * 0.2);
          float noise3 = random(rotatedUv * 8.0 + uTime * 0.3);
          
          // Combine noise layers
          float combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
          
          // Create nebula shape
          float nebula = smoothstep(0.2, 0.8, combinedNoise);
          
          // Mix colors based on noise and position
          vec3 finalColor = mix(
            mix(color1, color2, nebula),
            color3,
            smoothstep(0.4, 0.6, dist + sin(uTime * 0.5) * 0.1)
          );
          
          // Add glow effect
          float glow = exp(-2.0 * dist);
          finalColor += glow * 0.3;
          
          // Add subtle pulsing
          float pulse = sin(uTime * 0.5) * 0.1 + 0.9;
          finalColor *= pulse;
          
          // Set transparency for depth effect
          float alpha = smoothstep(1.0, 0.2, dist) * 0.9;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Create nebula plane
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 32, 32);
    const nebula = new THREE.Mesh(planeGeometry, nebulaMaterial);
    scene.add(nebula);

    // Position camera
    camera.position.z = 2.5;

    // Mouse movement
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      nebulaMaterial.uniforms.uMouse.value = mouse;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      nebulaMaterial.uniforms.uTime.value = elapsedTime * 0.5;
      
      // Subtle camera movement
      camera.position.x = Math.sin(elapsedTime * 0.2) * 0.2;
      camera.position.y = Math.cos(elapsedTime * 0.2) * 0.2;
      camera.lookAt(0, 0, 0);

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
        background: 'linear-gradient(to bottom, #E5DEFF, #D3E4FD)',
        opacity: 0.9 
      }}
    />
  );
}