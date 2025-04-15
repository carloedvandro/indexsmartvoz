
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, RotateCcw } from "lucide-react";

export default function SiteModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f7);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;
    
    // Create building model
    const createBuilding = () => {
      // Base building
      const buildingGeometry = new THREE.BoxGeometry(2, 3, 2);
      const buildingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x6c5ce7,
        transparent: true,
        opacity: 0.8,
      });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.y = 1.5;
      scene.add(building);
      
      // Roof
      const roofGeometry = new THREE.ConeGeometry(1.8, 1, 4);
      const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xa29bfe });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 3.5;
      roof.rotation.y = Math.PI / 4;
      scene.add(roof);
      
      // Windows
      const windowGeometry = new THREE.PlaneGeometry(0.5, 0.8);
      const windowMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xdfe6e9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      
      // Front windows
      const frontWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
      frontWindow1.position.set(-0.5, 1.5, 1.01);
      scene.add(frontWindow1);
      
      const frontWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
      frontWindow2.position.set(0.5, 1.5, 1.01);
      scene.add(frontWindow2);
      
      const frontWindow3 = new THREE.Mesh(windowGeometry, windowMaterial);
      frontWindow3.position.set(-0.5, 2.5, 1.01);
      scene.add(frontWindow3);
      
      const frontWindow4 = new THREE.Mesh(windowGeometry, windowMaterial);
      frontWindow4.position.set(0.5, 2.5, 1.01);
      scene.add(frontWindow4);
      
      // Door
      const doorGeometry = new THREE.PlaneGeometry(0.8, 1.2);
      const doorMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2d3436,
        side: THREE.DoubleSide 
      });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, 0.6, 1.01);
      scene.add(door);
      
      // Ground
      const groundGeometry = new THREE.CircleGeometry(10, 32);
      const groundMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x81ecec,
        side: THREE.DoubleSide 
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = Math.PI / 2;
      ground.position.y = 0;
      scene.add(ground);
      
      // Add some trees
      const createTree = (x: number, z: number) => {
        const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8);
        const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, 0.25, z);
        scene.add(trunk);
        
        const leavesGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
        const leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x00b894 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(x, 0.8, z);
        scene.add(leaves);
      };
      
      // Add some trees around
      createTree(-3, -3);
      createTree(3, -3);
      createTree(-3, 3);
      createTree(3, 3);
      createTree(-4, 0);
      createTree(4, 0);
      createTree(0, -4);
      createTree(0, 4);
    };
    
    createBuilding();
    setIsLoading(false);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [autoRotate]);
  
  return (
    <div className="flex flex-col w-full h-screen">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft size={20} />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-center text-gray-800">Interactive 3D Site Model</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          <RotateCcw size={20} className={autoRotate ? "animate-spin-slow" : ""} />
          {autoRotate ? "Stop Rotation" : "Auto Rotate"}
        </Button>
      </header>
      <main className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        <div className="absolute inset-0" ref={containerRef}></div>
        <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Interactive 360° Site Model</h2>
          <p className="text-gray-700">
            This is an interactive 3D model of our site. You can:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Click and drag to rotate the view</li>
            <li>Scroll to zoom in and out</li>
            <li>Toggle auto-rotation with the button above</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
