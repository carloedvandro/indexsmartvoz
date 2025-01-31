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

    // Create particle systems
    const particleCount = 3000;
    const meteorCount = 15;
    
    // Theme colors
    const colors = [
      new THREE.Color('#9b87f5'), // Primary Purple
      new THREE.Color('#7E69AB'), // Secondary Purple
      new THREE.Color('#6E59A5'), // Tertiary Purple
      new THREE.Color('#8B5CF6')  // Vivid Purple
    ];

    // Star field
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const color = colors[Math.floor(Math.random() * colors.length)];
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Meteors
    const meteors: THREE.Line[] = [];
    const meteorTrails: THREE.Line[] = [];

    for (let i = 0; i < meteorCount; i++) {
      const meteorGeometry = new THREE.BufferGeometry();
      const points = [];
      const trailLength = 20;
      
      for (let j = 0; j < trailLength; j++) {
        points.push(new THREE.Vector3(
          Math.random() * 100 - 50,
          Math.random() * 100 - 50,
          Math.random() * 100 - 50
        ));
      }
      
      meteorGeometry.setFromPoints(points);
      
      const meteorMaterial = new THREE.LineBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6
      });
      
      const meteor = new THREE.Line(meteorGeometry, meteorMaterial);
      meteors.push(meteor);
      scene.add(meteor);

      // Trail effect
      const trailGeometry = new THREE.BufferGeometry();
      const trailMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
      });
      
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      meteorTrails.push(trail);
      scene.add(trail);
    }

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.x * 0.3;
      targetRotation.y = mouse.y * 0.2;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate star field
      starField.rotation.y += 0.0005;
      starField.rotation.x += 0.0002;

      // Update meteors
      meteors.forEach((meteor, index) => {
        const positions = meteor.geometry.attributes.position.array as Float32Array;
        const trail = meteorTrails[index];
        const trailPositions = [];
        
        // Move meteor
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] -= 0.3; // Move in x direction
          positions[i + 1] -= 0.2; // Move in y direction
          
          // Reset position when meteor goes out of view
          if (positions[i] < -50) {
            positions[i] = 50;
            positions[i + 1] = Math.random() * 100 - 50;
            positions[i + 2] = Math.random() * 100 - 50;
          }
          
          // Add point to trail
          trailPositions.push(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          );
        }
        
        meteor.geometry.attributes.position.needsUpdate = true;
        
        // Update trail
        trail.geometry.setFromPoints(trailPositions.map((value, index) => 
          new THREE.Vector3(
            trailPositions[index * 3],
            trailPositions[index * 3 + 1],
            trailPositions[index * 3 + 2]
          )
        ));
      });

      // Smooth camera movement
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      
      camera.position.x = Math.sin(currentRotation.x) * 30;
      camera.position.y = Math.sin(currentRotation.y) * 30;
      camera.lookAt(scene.position);

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
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
        opacity: 0.9 
      }}
    />
  );
}