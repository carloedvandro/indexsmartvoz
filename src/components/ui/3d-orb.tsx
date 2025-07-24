import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface OrbProps {
  className?: string;
  size?: number;
  color?: string;
  intensity?: number;
  speed?: number;
}

export function Orb3D({ 
  className,
  size = 100,
  color = '#9b87f5',
  intensity = 0.8,
  speed = 0.01
}: OrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create orb
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create shader material for the orb
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 color;
      uniform float intensity;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        float pulse = sin(time * 2.0) * 0.1 + 0.9;
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        
        vec3 finalColor = color * intensity * pulse;
        float alpha = fresnel * 0.8 + 0.2;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity }
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float intensity;
        varying vec3 vNormal;
        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(color * intensity, fresnel * 0.3);
        }
      `,
      uniforms: {
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity * 0.5 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * speed;
      material.uniforms.time.value = time;
      
      orb.rotation.y += speed;
      orb.rotation.x += speed * 0.5;
      glow.rotation.y -= speed * 0.5;
      glow.rotation.x -= speed * 0.3;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, [size, color, intensity, speed]);

  return (
    <div 
      ref={mountRef} 
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    />
  );
}