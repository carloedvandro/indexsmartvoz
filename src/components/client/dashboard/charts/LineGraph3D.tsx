import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const dataPoints = [
  { x: 0, y: 0.5, z: 0 },
  { x: 1, y: 0.7, z: 0 },
  { x: 2, y: 0.9, z: 0 },
  { x: 3, y: 0.8, z: 0 },
  { x: 4, y: 0.6, z: 0 },
  { x: 5, y: 0.4, z: 0 },
  { x: 6, y: 0.3, z: 0 },
  { x: 7, y: 0.5, z: 0 },
];

interface LineGraph3DProps {
  variant: 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5';
}

export const LineGraph3D: React.FC<LineGraph3DProps> = ({ variant }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8f9fa);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(5, 5, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create curve from data points
    const curve = new THREE.CatmullRomCurve3(
      dataPoints.map(point => new THREE.Vector3(point.x, point.y, point.z))
    );

    // Gradient materials based on variant
    const gradientMaterials = {
      gradient1: {
        colors: [0x4ade80, 0x22c55e], // Verde
        name: "Emerald Flow"
      },
      gradient2: {
        colors: [0xd946ef, 0x9333ea], // Roxo
        name: "Royal Pulse"
      },
      gradient3: {
        colors: [0xec4899, 0xbe185d], // Rosa
        name: "Rose Wave"
      },
      gradient4: {
        colors: [0x3b82f6, 0x1d4ed8], // Azul
        name: "Ocean Drift"
      },
      gradient5: {
        colors: [0xef4444, 0xb91c1c], // Vermelho
        name: "Ruby Surge"
      }
    };

    const selectedGradient = gradientMaterials[variant];

    // Create animated gradient material
    const gradientTexture = new THREE.Texture(createGradientCanvas(selectedGradient.colors));
    gradientTexture.needsUpdate = true;

    const material = new THREE.MeshPhongMaterial({
      map: gradientTexture,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    // Create geometry
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.3, 20, false);
    const tube = new THREE.Mesh(tubeGeometry, material);
    scene.add(tube);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate gradient
      tube.rotation.y = Math.sin(time) * 0.1;
      tube.scale.y = 1 + Math.sin(time) * 0.1;

      // Update controls and render
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [variant]);

  // Helper function to create gradient canvas
  const createGradientCanvas = (colors: number[]) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, `#${colors[0].toString(16)}`);
    gradient.addColorStop(1, `#${colors[1].toString(16)}`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    return canvas;
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
    />
  );
};