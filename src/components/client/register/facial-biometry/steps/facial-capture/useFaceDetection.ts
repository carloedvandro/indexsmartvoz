
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

interface FaceDetectionResult {
  faceDetected: boolean;
  facePosition: { x: number; y: number; size: number };
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
}

export const useFaceDetection = (
  webcamRef: RefObject<Webcam>,
  isProcessing: boolean,
  cameraActive: boolean
): FaceDetectionResult => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0, size: 0 });
  const [faceProximity, setFaceProximity] = useState<"ideal" | "too-close" | "too-far" | "not-detected">("not-detected");

  const checkFace = async (imageData: ImageData): Promise<{detected: boolean, position: {x: number, y: number, size: number}, proximity: "ideal" | "too-close" | "too-far" | "not-detected"}> => {
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    // Threshold mais baixo para detecção mais sensível
    const threshold = 0.02;
    
    // Área central onde o rosto deve estar (mais flexível)
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.4;
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.5;
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    
    // Verificar tons de pele em área maior
    for (let y = 0; y < imageData.height; y += 2) { // Skip pixels para performance
      for (let x = 0; x < imageData.width; x += 2) {
        const dx = (x - centerX) / faceRadiusX;
        const dy = (y - centerY) / faceRadiusY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        if (distanceFromCenter <= 1.2) { // Área mais ampla
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Detecção de tom de pele mais ampla
          if (
            r > 15 && g > 8 && b > 5 &&
            r >= g - 25 && r >= b - 25 &&
            Math.max(r, g, b) - Math.min(r, g, b) < 180 &&
            r + g + b > 50
          ) {
            skinTonePixels++;
            facePixelsSum.x += x;
            facePixelsSum.y += y;
            facePixelsCount++;
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    if (ratio > threshold && facePixelsCount > 100) { // Mínimo de pixels menor
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está razoavelmente centralizado (muito mais flexível)
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.6; // Muito mais flexível
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > 0.7) {
          proximity = "too-close";
        } else if (faceSize < 0.12) {
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
      } else {
        // Mesmo não centralizado, detectar o rosto
        detectedFace = true;
        proximity = "not-detected";
      }
    }
    
    return { 
      detected: detectedFace, 
      position: facePos,
      proximity: proximity 
    };
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 1; // Apenas 1 detecção necessária
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 5;
    
    const interval = setInterval(async () => {
      if (webcamRef.current && !isProcessing && cameraActive) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              
              // Amostra área quase completa
              const centerX = img.width * 0.05;
              const centerY = img.height * 0.05;
              const width = img.width * 0.9;
              const height = img.height * 0.9;
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(result => {
                console.log("Face detection result:", result); // Debug
                
                if (result.detected) {
                  detectionCount++;
                  noDetectionCount = 0;
                  setFaceProximity(result.proximity);
                  setFacePosition(result.position);
                  
                  if (detectionCount >= consecutiveDetectionsNeeded) {
                    setFaceDetected(true);
                  }
                } else {
                  noDetectionCount++;
                  detectionCount = 0;
                  
                  if (noDetectionCount >= consecutiveNoDetectionsNeeded) {
                    setFaceDetected(false);
                    setFaceProximity("not-detected");
                  }
                }
              });
            }
          };
        }
      }
    }, 100); // Interval mais frequente

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected, facePosition, faceProximity };
};
