
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function BrazilMap3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(800, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create Brazil map shape (simplified)
    const brazilShape = new THREE.Shape();
    brazilShape.moveTo(-3, 2);
    brazilShape.lineTo(-2, 3);
    brazilShape.lineTo(0, 3.5);
    brazilShape.lineTo(2, 3);
    brazilShape.lineTo(3, 2);
    brazilShape.lineTo(3.5, 0);
    brazilShape.lineTo(3, -1);
    brazilShape.lineTo(2, -3);
    brazilShape.lineTo(0, -4);
    brazilShape.lineTo(-1, -3.5);
    brazilShape.lineTo(-2, -2);
    brazilShape.lineTo(-3, -1);
    brazilShape.lineTo(-3, 2);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };

    const geometry = new THREE.ExtrudeGeometry(brazilShape, extrudeSettings);
    
    // Create gradient material
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0x8b5cf6),
      transparent: true,
      opacity: 0.9
    });

    const brazilMesh = new THREE.Mesh(geometry, material);
    scene.add(brazilMesh);

    // Add location pins
    const pinGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
    const pinMaterial = new THREE.MeshLambertMaterial({ color: 0xff0066 });

    const locations = [
      { x: -1, y: 1.5, z: 0.3 }, // Norte
      { x: 0, y: 0.5, z: 0.3 }, // Centro
      { x: 1, y: -1, z: 0.3 }, // Sul
      { x: -0.5, y: -0.5, z: 0.3 }, // Sudeste
      { x: 1.5, y: 1, z: 0.3 }, // Nordeste
    ];

    locations.forEach(pos => {
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      pin.position.set(pos.x, pos.y, pos.z);
      scene.add(pin);
    });

    // Position camera
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      brazilMesh.rotation.z += 0.005;
      
      renderer.render(scene, camera);
    };

    animate();

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mountRef} className="w-full flex justify-center" />
      <div className="text-center mt-6">
        <button className="bg-transparent border-2 border-[#ff0066] text-[#ff0066] px-8 py-3 rounded-full font-semibold hover:bg-[#ff0066] hover:text-white transition-all duration-300 flex items-center mx-auto gap-2">
          <span className="text-lg">📡</span>
          CONSULTE O MAPA DE COBERTURA
        </button>
      </div>
    </div>
  );
}
