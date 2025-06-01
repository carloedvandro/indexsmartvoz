
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
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create Brazil map shape (more detailed)
    const brazilShape = new THREE.Shape();
    brazilShape.moveTo(-3, 2);
    brazilShape.lineTo(-2.5, 3);
    brazilShape.lineTo(-1, 3.2);
    brazilShape.lineTo(0, 3.5);
    brazilShape.lineTo(1.5, 3.2);
    brazilShape.lineTo(2.5, 2.8);
    brazilShape.lineTo(3, 2);
    brazilShape.lineTo(3.5, 1);
    brazilShape.lineTo(3.8, 0);
    brazilShape.lineTo(3.5, -0.5);
    brazilShape.lineTo(3, -1);
    brazilShape.lineTo(2.5, -2);
    brazilShape.lineTo(2, -2.8);
    brazilShape.lineTo(1.5, -3.2);
    brazilShape.lineTo(0.5, -3.8);
    brazilShape.lineTo(0, -4);
    brazilShape.lineTo(-0.5, -3.8);
    brazilShape.lineTo(-1, -3.5);
    brazilShape.lineTo(-1.5, -3);
    brazilShape.lineTo(-2, -2.5);
    brazilShape.lineTo(-2.5, -2);
    brazilShape.lineTo(-3, -1);
    brazilShape.lineTo(-3.2, 0);
    brazilShape.lineTo(-3, 1);
    brazilShape.lineTo(-3, 2);

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 3,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    const geometry = new THREE.ExtrudeGeometry(brazilShape, extrudeSettings);
    
    // Create purple gradient material similar to Vivo's map
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0x8b2db8), // Purple color like Vivo
      transparent: true,
      opacity: 0.95
    });

    const brazilMesh = new THREE.Mesh(geometry, material);
    scene.add(brazilMesh);

    // Add more location pins to match Vivo's coverage
    const pinGeometry = new THREE.ConeGeometry(0.04, 0.15, 8);
    const pinMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const locations = [
      // Norte
      { x: -1.5, y: 2, z: 0.4 },
      { x: -0.5, y: 2.5, z: 0.4 },
      { x: 0.5, y: 2.2, z: 0.4 },
      // Nordeste
      { x: 1.8, y: 1.5, z: 0.4 },
      { x: 2.2, y: 0.8, z: 0.4 },
      { x: 2.5, y: 0.2, z: 0.4 },
      { x: 2.8, y: -0.5, z: 0.4 },
      // Centro-Oeste
      { x: -0.8, y: 0.5, z: 0.4 },
      { x: 0, y: 0, z: 0.4 },
      { x: 0.8, y: 0.3, z: 0.4 },
      // Sudeste
      { x: 1, y: -1.2, z: 0.4 },
      { x: 1.5, y: -1.8, z: 0.4 },
      { x: 0.8, y: -2.2, z: 0.4 },
      { x: 0.2, y: -2.5, z: 0.4 },
      // Sul
      { x: 0, y: -3, z: 0.4 },
      { x: -0.5, y: -2.8, z: 0.4 },
      { x: -1, y: -2.5, z: 0.4 },
      // Outros pontos
      { x: -1.8, y: 1, z: 0.4 },
      { x: -2, y: 0, z: 0.4 },
      { x: -1.5, y: -1, z: 0.4 },
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
      
      brazilMesh.rotation.z += 0.003;
      
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
