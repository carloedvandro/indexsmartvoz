
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface PhoneModelProps {
  containerClassName?: string;
}

export const PhoneModel: React.FC<PhoneModelProps> = ({ containerClassName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.background.set('#ffffff00'); // Transparent background
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true  // Enable transparency
    });
    renderer.setSize(24, 24);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear container and append renderer
    const container = containerRef.current;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Create phone body
    const phoneGeometry = new THREE.BoxGeometry(1.2, 2, 0.1);
    const phoneMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x5f0889,
      shininess: 100
    });
    const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    scene.add(phone);
    
    // Create phone screen
    const screenGeometry = new THREE.BoxGeometry(1, 1.7, 0.01);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x222222
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.06;
    phone.add(screen);
    
    // Create signal waves
    const signalCurve1 = new THREE.EllipseCurve(
      0, 0,                 // center
      0.6, 0.6,             // x radius, y radius
      0, Math.PI,           // start angle, end angle
      false,                // clockwise
      0                     // rotation
    );
    const signalCurve2 = new THREE.EllipseCurve(
      0, 0, 0.8, 0.8, 0, Math.PI, false, 0
    );
    const signalCurve3 = new THREE.EllipseCurve(
      0, 0, 1.0, 1.0, 0, Math.PI, false, 0
    );
    
    const signalPoints1 = signalCurve1.getPoints(30);
    const signalPoints2 = signalCurve2.getPoints(30);
    const signalPoints3 = signalCurve3.getPoints(30);
    
    const signalGeometry1 = new THREE.BufferGeometry().setFromPoints(signalPoints1);
    const signalGeometry2 = new THREE.BufferGeometry().setFromPoints(signalPoints2);
    const signalGeometry3 = new THREE.BufferGeometry().setFromPoints(signalPoints3);
    
    const signalMaterial = new THREE.LineBasicMaterial({ 
      color: 0x5f0889,
      transparent: true,
      opacity: 0.7,
      linewidth: 2
    });
    
    const signalWave1 = new THREE.Line(signalGeometry1, signalMaterial);
    const signalWave2 = new THREE.Line(signalGeometry2, signalMaterial);
    const signalWave3 = new THREE.Line(signalGeometry3, signalMaterial);
    
    signalWave1.position.set(0, 0.9, 0.2);
    signalWave2.position.set(0, 1.1, 0.2);
    signalWave3.position.set(0, 1.3, 0.2);
    
    phone.add(signalWave1);
    phone.add(signalWave2);
    phone.add(signalWave3);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);
    
    // Rotate phone for better view
    phone.rotation.y = 0.2;
    phone.rotation.x = 0.1;
    
    // Animation for signal waves
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Pulse animation for signal waves
      const time = Date.now() * 0.001;
      
      signalWave1.material.opacity = 0.4 + Math.sin(time * 1.0) * 0.3;
      signalWave2.material.opacity = 0.4 + Math.sin(time * 1.0 + 0.5) * 0.3;
      signalWave3.material.opacity = 0.4 + Math.sin(time * 1.0 + 1.0) * 0.3;
      
      // Gentle rotation
      phone.rotation.y = 0.2 + Math.sin(time * 0.3) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      phoneGeometry.dispose();
      phoneMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      signalGeometry1.dispose();
      signalGeometry2.dispose();
      signalGeometry3.dispose();
      signalMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div ref={containerRef} className={containerClassName} style={{ width: '24px', height: '24px' }} />
  );
};
