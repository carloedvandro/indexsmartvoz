
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Define colors for each region
    const regionColors = {
      norte: 0x4CAF50,      // Green
      nordeste: 0x2196F3,   // Blue
      centrooeste: 0xFFC107, // Yellow/Orange
      sudeste: 0xF44336,    // Red
      sul: 0x9C27B0         // Purple
    };

    // Create Norte region (Amazon area)
    const norteShape = new THREE.Shape();
    norteShape.moveTo(-3, 1.5);
    norteShape.lineTo(-2.5, 3);
    norteShape.lineTo(-1, 3.2);
    norteShape.lineTo(0, 3.5);
    norteShape.lineTo(1.5, 3.2);
    norteShape.lineTo(2, 2.5);
    norteShape.lineTo(1.5, 2);
    norteShape.lineTo(0.5, 1.8);
    norteShape.lineTo(-0.5, 2);
    norteShape.lineTo(-1.5, 1.8);
    norteShape.lineTo(-2.5, 1.5);
    norteShape.lineTo(-3, 1.5);

    // Create Nordeste region
    const nordesteShape = new THREE.Shape();
    nordesteShape.moveTo(1.5, 2);
    nordesteShape.lineTo(2, 2.5);
    nordesteShape.lineTo(3, 2);
    nordesteShape.lineTo(3.5, 1);
    nordesteShape.lineTo(3.8, 0);
    nordesteShape.lineTo(3.5, -0.5);
    nordesteShape.lineTo(2.8, -0.2);
    nordesteShape.lineTo(2, 0.5);
    nordesteShape.lineTo(1.5, 1.2);
    nordesteShape.lineTo(1.5, 2);

    // Create Centro-Oeste region
    const centrooeste = new THREE.Shape();
    centrooeste.moveTo(-2.5, 1.5);
    centrooeste.lineTo(-0.5, 2);
    centrooeste.lineTo(0.5, 1.8);
    centrooeste.lineTo(1.5, 1.2);
    centrooeste.lineTo(2, 0.5);
    centrooeste.lineTo(1.5, -0.5);
    centrooeste.lineTo(0.5, -0.8);
    centrooeste.lineTo(-0.5, -0.5);
    centrooeste.lineTo(-1.5, 0);
    centrooeste.lineTo(-2.5, 0.5);
    centrooeste.lineTo(-2.5, 1.5);

    // Create Sudeste region
    const sudesteShape = new THREE.Shape();
    sudesteShape.moveTo(0.5, -0.8);
    sudesteShape.lineTo(1.5, -0.5);
    sudesteShape.lineTo(2.5, -1);
    sudesteShape.lineTo(2.8, -2);
    sudesteShape.lineTo(2, -2.5);
    sudesteShape.lineTo(1.5, -2.8);
    sudesteShape.lineTo(0.8, -2.5);
    sudesteShape.lineTo(0.2, -2);
    sudesteShape.lineTo(0, -1.5);
    sudesteShape.lineTo(0.5, -0.8);

    // Create Sul region
    const sulShape = new THREE.Shape();
    sulShape.moveTo(0.2, -2);
    sulShape.lineTo(0.8, -2.5);
    sulShape.lineTo(1.5, -2.8);
    sulShape.lineTo(0.5, -3.8);
    sulShape.lineTo(0, -4);
    sulShape.lineTo(-0.5, -3.8);
    sulShape.lineTo(-1, -3.5);
    sulShape.lineTo(-1.5, -3);
    sulShape.lineTo(-1, -2.5);
    sulShape.lineTo(-0.5, -2.2);
    sulShape.lineTo(0.2, -2);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };

    // Create region meshes
    const regions = [
      { shape: norteShape, color: regionColors.norte, name: 'Norte' },
      { shape: nordesteShape, color: regionColors.nordeste, name: 'Nordeste' },
      { shape: centrooeste, color: regionColors.centrooeste, name: 'Centro-Oeste' },
      { shape: sudesteShape, color: regionColors.sudeste, name: 'Sudeste' },
      { shape: sulShape, color: regionColors.sul, name: 'Sul' }
    ];

    regions.forEach(region => {
      const geometry = new THREE.ExtrudeGeometry(region.shape, extrudeSettings);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(region.color),
        transparent: true,
        opacity: 0.9
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.z = 0;
      scene.add(mesh);
    });

    // Add some location pins
    const pinGeometry = new THREE.ConeGeometry(0.03, 0.12, 8);
    const pinMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const locations = [
      { x: -1.5, y: 2.5, z: 0.3 }, // Norte
      { x: 2.5, y: 1, z: 0.3 },    // Nordeste
      { x: -0.5, y: 0.5, z: 0.3 }, // Centro-Oeste
      { x: 1, y: -1.5, z: 0.3 },   // Sudeste
      { x: -0.2, y: -3, z: 0.3 },  // Sul
    ];

    locations.forEach(pos => {
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      pin.position.set(pos.x, pos.y, pos.z);
      pin.castShadow = true;
      scene.add(pin);
    });

    // Position camera for better view
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Static render - no animation
    renderer.render(scene, camera);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleMapClick = () => {
    window.open('https://mapadecobertura.vivo.com.br/', '_blank');
  };

  return (
    <div className="relative">
      <div ref={mountRef} className="w-full flex justify-center" />
      <div className="text-center mt-6">
        <button 
          onClick={handleMapClick}
          className="bg-transparent border-2 border-[#ff0066] text-[#ff0066] px-8 py-3 rounded-full font-semibold hover:bg-[#ff0066] hover:text-white transition-all duration-300 flex items-center mx-auto gap-2"
        >
          <span className="text-lg">📡</span>
          CONSULTE O MAPA DE COBERTURA
        </button>
      </div>
    </div>
  );
}
