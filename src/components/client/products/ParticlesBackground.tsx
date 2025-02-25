import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticlesBackgroundProps {
  style?: "default" | "stars" | "fireflies" | "snow" | "matrix";
}

export function ParticlesBackground({ style = "default" }: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles setup based on style
    const particlesGeometry = new THREE.BufferGeometry();
    let particlesCount = 1500;
    let particlesMaterial;
    let posArray;

    switch (style) {
      case "fireflies":
        particlesCount = 100;
        posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 10;
          posArray[i + 1] = (Math.random() - 0.5) * 10;
          posArray[i + 2] = (Math.random() - 0.5) * 10;
        }
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.05,
          color: '#ffaa00',
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
        });
        break;

      case "stars":
        particlesCount = 2000;
        posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 20;
          posArray[i + 1] = (Math.random() - 0.5) * 20;
          posArray[i + 2] = (Math.random() - 0.5) * 20;
        }
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.005,
          color: '#ffffff',
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });
        break;

      case "snow":
        particlesCount = 3000;
        posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 15;
          posArray[i + 1] = (Math.random() - 0.5) * 15;
          posArray[i + 2] = (Math.random() - 0.5) * 15;
        }
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: '#ffffff',
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
        });
        break;

      case "matrix":
        particlesCount = 5000;
        posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 25;
          posArray[i + 1] = (Math.random() - 0.5) * 25;
          posArray[i + 2] = (Math.random() - 0.5) * 25;
        }
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.015,
          color: '#00ff00',
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
        });
        break;

      default:
        posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 15;
          posArray[i + 1] = (Math.random() - 0.5) * 15;
          posArray[i + 2] = (Math.random() - 0.5) * 15;
        }
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: '#9b87f5',
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (particlesRef.current) {
        switch (style) {
          case "fireflies":
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
              const time = Date.now() * 0.001;
              const offset = i * 0.1;
              particlesMaterial.opacity = 0.3 + Math.sin(time + offset) * 0.3;
            }
            break;

          case "stars":
            particlesRef.current.rotation.x += 0.0001;
            particlesRef.current.rotation.y += 0.0001;
            break;

          case "snow":
            particlesRef.current.rotation.y += 0.0002;
            particlesRef.current.position.y = (Math.sin(Date.now() * 0.0005) * 0.5) - 0.5;
            break;

          case "matrix":
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.0003) * 0.3;
            break;

          default:
            particlesRef.current.rotation.x += 0.002;
            particlesRef.current.rotation.y += 0.001;
            particlesRef.current.rotation.z += 0.0005;
            particlesRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      cancelAnimationFrame(frame);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [style]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
  );
}
