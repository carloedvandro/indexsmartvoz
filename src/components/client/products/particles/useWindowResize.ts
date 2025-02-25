
import { MutableRefObject, useEffect } from 'react';
import * as THREE from 'three';

export function useWindowResize(
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>,
  rendererRef: MutableRefObject<THREE.WebGLRenderer | null>,
) {
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cameraRef, rendererRef]);
}
