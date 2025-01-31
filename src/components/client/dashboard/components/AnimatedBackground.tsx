import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Grid parameters
    const gridSize = 20;
    const gridDivisions = 20;
    const pointSize = 0.05;

    // Create grid lines
    const gridGeometry = new THREE.BufferGeometry();
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: '#9b87f5',
      transparent: true,
      opacity: 0.3
    });

    const vertices = [];
    for (let i = -gridSize; i <= gridSize; i += gridSize / gridDivisions) {
      // Horizontal lines
      vertices.push(-gridSize, i, 0);
      vertices.push(gridSize, i, 0);
      
      // Vertical lines
      vertices.push(i, -gridSize, 0);
      vertices.push(i, gridSize, 0);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridLines);

    // Create glowing points
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsMaterial = new THREE.PointsMaterial({
      color: '#6E59A5',
      size: pointSize,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const pointsVertices = [];
    for (let i = -gridSize; i <= gridSize; i += gridSize / gridDivisions) {
      for (let j = -gridSize; j <= gridSize; j += gridSize / gridDivisions) {
        pointsVertices.push(i, j, 0);
      }
    }

    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsVertices, 3));
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Position camera
    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate grid based on mouse position
      gridLines.rotation.x = mouse.y * 0.2;
      gridLines.rotation.y = mouse.x * 0.2;
      points.rotation.x = mouse.y * 0.2;
      points.rotation.y = mouse.x * 0.2;

      // Add subtle wave animation
      const time = Date.now() * 0.001;
      gridLines.position.z = Math.sin(time) * 0.5;
      points.position.z = Math.sin(time) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        background: 'linear-gradient(to bottom, #E5DEFF, #D3E4FD)',
        opacity: 0.9 
      }}
    />
  );
}