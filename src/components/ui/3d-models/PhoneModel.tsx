
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useWindowResize } from '@/components/client/products/particles/useWindowResize';

interface PhoneModelProps {
  color?: string;
  autoRotate?: boolean;
  scale?: number;
  className?: string;
}

export const PhoneModel: React.FC<PhoneModelProps> = ({ 
  color = '#ff5500', 
  autoRotate = true,
  scale = 1,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const phoneRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Setup the scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create phone model
    createPhoneModel(color);
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (phoneRef.current && autoRotate) {
        phoneRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color]);
  
  // Handle window resize
  useWindowResize(cameraRef, rendererRef);
  
  // Create the phone model
  const createPhoneModel = (phoneColor: string) => {
    if (!sceneRef.current) return;
    
    // Group to hold the phone
    const phoneGroup = new THREE.Group();
    
    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(1.5 * scale, 3 * scale, 0.1 * scale);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: phoneColor,
      transparent: true,
      opacity: 0.9,
      shininess: 100
    });
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);
    
    // Screen
    const screenGeometry = new THREE.BoxGeometry(1.4 * scale, 2.8 * scale, 0.02 * scale);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111111,
      shininess: 150
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.06 * scale;
    phoneGroup.add(screen);
    
    // Camera bump
    const cameraBumpGeometry = new THREE.CircleGeometry(0.1 * scale, 32);
    const cameraBumpMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const cameraBump = new THREE.Mesh(cameraBumpGeometry, cameraBumpMaterial);
    cameraBump.position.set(0, 1.2 * scale, 0.1 * scale);
    cameraBump.rotation.x = Math.PI * -0.5;
    phoneGroup.add(cameraBump);
    
    // Home button (for older phone models)
    const buttonGeometry = new THREE.CircleGeometry(0.15 * scale, 32);
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const homeButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    homeButton.position.set(0, -1.2 * scale, 0.06 * scale);
    homeButton.rotation.x = Math.PI * -0.5;
    phoneGroup.add(homeButton);
    
    // Add to the scene
    sceneRef.current.add(phoneGroup);
    phoneRef.current = phoneGroup;
    setIsLoaded(true);
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`phone-model-container h-64 w-64 ${className}`}
      style={{ margin: '0 auto' }}
    >
      {!isLoaded && (
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
};
