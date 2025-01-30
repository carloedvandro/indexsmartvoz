import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface DataPoint {
  x: number;
  y: number;
  z: number;
}

export interface LineGraph3DProps {
  variant: 'ribbon' | 'tube' | 'particles' | 'neon' | 'wave';
  data?: DataPoint[];
  color?: string;
}

// Default data points if none provided
const defaultDataPoints = [
  { x: 0, y: 0.5, z: 0 },
  { x: 1, y: 0.7, z: 0 },
  { x: 2, y: 0.9, z: 0 },
  { x: 3, y: 0.8, z: 0 },
  { x: 4, y: 0.6, z: 0 },
  { x: 5, y: 0.4, z: 0 },
  { x: 6, y: 0.3, z: 0 },
  { x: 7, y: 0.5, z: 0 },
];

export const LineGraph3D: React.FC<LineGraph3DProps> = ({ 
  variant, 
  data = defaultDataPoints,
  color = '#D6BCFA'
}) => {
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
      data.map(point => new THREE.Vector3(point.x, point.y, point.z))
    );

    // Different visualizations based on variant
    switch (variant) {
      case 'ribbon':
        createRibbon(scene, curve);
        break;
      case 'tube':
        createTube(scene, curve);
        break;
      case 'particles':
        createParticles(scene, curve);
        break;
      case 'neon':
        createNeonLine(scene, curve);
        break;
      case 'wave':
        createWave(scene, curve);
        break;
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
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
  }, [variant, data, color]);

  // Visualization methods
  const createRibbon = (scene: THREE.Scene, curve: THREE.CatmullRomCurve3) => {
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.MeshPhongMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    const ribbon = new THREE.Mesh(geometry, material);
    scene.add(ribbon);
  };

  const createTube = (scene: THREE.Scene, curve: THREE.CatmullRomCurve3) => {
    const geometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
    const material = new THREE.MeshPhongMaterial({
      color,
      transparent: true,
      opacity: 0.8,
    });

    const tube = new THREE.Mesh(geometry, material);
    scene.add(tube);
  };

  const createParticles = (scene: THREE.Scene, curve: THREE.CatmullRomCurve3) => {
    const points = curve.getPoints(200);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const material = new THREE.PointsMaterial({
      color,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
  };

  const createNeonLine = (scene: THREE.Scene, curve: THREE.CatmullRomCurve3) => {
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const material = new THREE.LineBasicMaterial({
      color,
      linewidth: 2,
    });

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Add glow effect
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          gl_FragColor = vec4(color, 1.0) * intensity;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const glowGeometry = new THREE.TubeGeometry(curve, 100, 0.2, 8, false);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
  };

  const createWave = (scene: THREE.Scene, curve: THREE.CatmullRomCurve3) => {
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const material = new THREE.LineBasicMaterial({
      color,
      linewidth: 2,
    });

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Add animated wave effect
    const waveGeometry = new THREE.PlaneGeometry(8, 2, 32, 32);
    const waveMaterial = new THREE.MeshPhongMaterial({
      color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });

    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = Math.PI / 2;
    wave.position.y = -0.5;
    scene.add(wave);

    // Animate vertices
    const positions = waveGeometry.attributes.position.array;
    let phase = 0;

    function animateWave() {
      phase += 0.1;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(phase + positions[i] / 2) * 0.3;
      }
      waveGeometry.attributes.position.needsUpdate = true;
      requestAnimationFrame(animateWave);
    }
    animateWave();
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] rounded-xl overflow-hidden"
    />
  );
};