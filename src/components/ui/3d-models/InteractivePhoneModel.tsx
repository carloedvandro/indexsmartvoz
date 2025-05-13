
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useWindowResize } from '@/components/client/products/particles/useWindowResize';

interface InteractivePhoneModelProps {
  color?: string;
  autoRotate?: boolean;
  height?: string;
  width?: string;
  className?: string;
  showControls?: boolean;
}

export const InteractivePhoneModel: React.FC<InteractivePhoneModelProps> = ({
  color = '#660099',
  autoRotate = true,
  height = '400px',
  width = '100%',
  className = '',
  showControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const phoneRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(autoRotate);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    if (showControls) {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = isRotating;
      controls.autoRotateSpeed = 2;
      controls.minDistance = 3;
      controls.maxDistance = 10;
      controlsRef.current = controls;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // Create phone model
    createDetailedPhoneModel(color);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      } else if (phoneRef.current && isRotating) {
        phoneRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };

    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color, isRotating, showControls]);

  // Handle window resize
  useWindowResize(cameraRef, rendererRef);

  // Create a more detailed phone model
  const createDetailedPhoneModel = (phoneColor: string) => {
    if (!sceneRef.current) return;

    // Group to hold the phone
    const phoneGroup = new THREE.Group();

    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(2, 4, 0.2);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: phoneColor,
      transparent: true,
      opacity: 0.9,
      shininess: 100
    });
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);

    // Round the corners with additional geometry
    const cornerRadius = 0.2;
    const cornerGeometry = new THREE.CylinderGeometry(cornerRadius, cornerRadius, 4, 32);
    const cornerMaterial = new THREE.MeshPhongMaterial({ color: phoneColor });
    
    // Left edge
    const leftEdge = new THREE.Mesh(cornerGeometry, cornerMaterial);
    leftEdge.position.set(-1, 0, 0);
    leftEdge.rotation.z = Math.PI / 2;
    phoneGroup.add(leftEdge);
    
    // Right edge
    const rightEdge = new THREE.Mesh(cornerGeometry, cornerMaterial);
    rightEdge.position.set(1, 0, 0);
    rightEdge.rotation.z = Math.PI / 2;
    phoneGroup.add(rightEdge);

    // Screen
    const screenGeometry = new THREE.BoxGeometry(1.9, 3.8, 0.05);
    const screenMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      shininess: 150
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.12;
    phoneGroup.add(screen);

    // Create a screen texture with a gradient
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 256, 512);
      gradient.addColorStop(0, '#8a2be2');
      gradient.addColorStop(0.5, '#4169e1');
      gradient.addColorStop(1, '#00bfff');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 512);
      
      // Add some UI elements to the screen
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      
      // App icons
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
          ctx.fillRect(
            20 + i * 60, 
            100 + j * 65, 
            40, 
            40
          );
        }
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    const displayMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8
    });
    
    const displayGeometry = new THREE.PlaneGeometry(1.85, 3.7);
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.15;
    phoneGroup.add(display);

    // Camera bump
    const cameraBumpGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
    const cameraBumpMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const cameraBump = new THREE.Mesh(cameraBumpGeometry, cameraBumpMaterial);
    cameraBump.position.set(0, 1.4, -0.15);
    phoneGroup.add(cameraBump);

    // Camera lenses
    const lensGeometry = new THREE.CircleGeometry(0.15, 32);
    const lensMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    
    // Main camera lens
    const mainLens = new THREE.Mesh(lensGeometry, lensMaterial);
    mainLens.position.set(-0.2, 1.5, -0.1);
    mainLens.rotation.x = Math.PI * -0.5;
    phoneGroup.add(mainLens);
    
    // Secondary camera lens
    const secondaryLens = new THREE.Mesh(lensGeometry, lensMaterial);
    secondaryLens.position.set(0.2, 1.3, -0.1);
    secondaryLens.rotation.x = Math.PI * -0.5;
    secondaryLens.scale.set(0.8, 0.8, 0.8);
    phoneGroup.add(secondaryLens);

    // Add to the scene
    sceneRef.current.add(phoneGroup);
    phoneRef.current = phoneGroup;
    setIsLoading(false);
  };

  // Toggle rotation
  const toggleRotation = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !isRotating;
    }
    setIsRotating(!isRotating);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="w-full rounded-lg overflow-hidden"
        style={{ height, width }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-25">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
      
      {showControls && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            className={`p-2 rounded-full bg-white shadow-md ${isRotating ? 'text-purple-600' : 'text-gray-600'}`}
            onClick={toggleRotation}
            title={isRotating ? "Parar rotação" : "Iniciar rotação"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
