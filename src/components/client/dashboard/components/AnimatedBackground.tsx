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
    const particleCount = 2000;
    const meteorCount = 25;
    
    // Theme colors with more vibrant options
    const colors = [
      new THREE.Color('#9333EA'), // Vivid Purple
      new THREE.Color('#A855F7'), // Bright Purple
      new THREE.Color('#6366F1'), // Indigo
      new THREE.Color('#F472B6')  // Pink
    ];

    // Star field with larger particles
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starColors = new Float32Array(particleCount * 3);
    const starSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const color = colors[Math.floor(Math.random() * colors.length)];
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;

      // Varying star sizes
      starSizes[i] = Math.random() * 0.2 + 0.1;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Enhanced meteors with longer trails
    const meteors: THREE.Line[] = [];
    const meteorTrails: THREE.Line[] = [];

    for (let i = 0; i < meteorCount; i++) {
      const meteorGeometry = new THREE.BufferGeometry();
      const points = [];
      const trailLength = 30; // Longer trails
      
      for (let j = 0; j < trailLength; j++) {
        points.push(new THREE.Vector3(
          Math.random() * 120 - 60,
          Math.random() * 120 - 60,
          Math.random() * 120 - 60
        ));
      }
      
      meteorGeometry.setFromPoints(points);
      
      const meteorMaterial = new THREE.LineBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.8,
        linewidth: 2
      });
      
      const meteor = new THREE.Line(meteorGeometry, meteorMaterial);
      meteors.push(meteor);
      scene.add(meteor);

      // Enhanced trail effect
      const trailGeometry = new THREE.BufferGeometry();
      const trailMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        linewidth: 1
      });
      
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      meteorTrails.push(trail);
      scene.add(trail);
    }

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let currentRotation = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.x * 0.5;
      targetRotation.y = mouse.y * 0.3;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 35;

    // Animation with enhanced meteor movement
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate star field
      starField.rotation.y += 0.0003;
      starField.rotation.x += 0.0001;

      // Update meteors with varying speeds
      meteors.forEach((meteor, index) => {
        const positions = meteor.geometry.attributes.position.array as Float32Array;
        const trail = meteorTrails[index];
        const trailPositions = [];
        
        // Enhanced meteor movement
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] -= 0.4 + Math.random() * 0.2; // Varying x speed
          positions[i + 1] -= 0.3 + Math.random() * 0.1; // Varying y speed
          
          // Reset position with random entry points
          if (positions[i] < -60) {
            positions[i] = 60;
            positions[i + 1] = Math.random() * 120 - 60;
            positions[i + 2] = Math.random() * 120 - 60;
          }
          
          trailPositions.push(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          );
        }
        
        meteor.geometry.attributes.position.needsUpdate = true;
        
        // Update trail with fade effect
        trail.geometry.setFromPoints(trailPositions.map((value, index) => 
          new THREE.Vector3(
            trailPositions[index * 3],
            trailPositions[index * 3 + 1],
            trailPositions[index * 3 + 2]
          )
        ));
      });

      // Smooth camera movement
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;
      
      camera.position.x = Math.sin(currentRotation.x) * 35;
      camera.position.y = Math.sin(currentRotation.y) * 35;
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
        background: 'linear-gradient(to bottom, #0F172A, #1E293B)',
        opacity: 0.9 
      }}
    />
  );
}