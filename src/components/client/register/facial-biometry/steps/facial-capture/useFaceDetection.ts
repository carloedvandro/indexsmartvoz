
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
    
    // Threshold mais baixo para melhor detecção
    const threshold = 0.03;
    
    // Área central onde o rosto deve estar
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.35;
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.45;
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    
    // Verificar tons de pele na região oval central
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const dx = (x - centerX) / faceRadiusX;
        const dy = (y - centerY) / faceRadiusY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        if (distanceFromCenter <= 1.0) {
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Detecção de tom de pele mais flexível
          if (
            r > 20 && g > 10 && b > 5 &&
            r >= g - 20 && r >= b - 20 &&
            Math.max(r, g, b) - Math.min(r, g, b) < 150 &&
            r + g + b > 60
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
    
    if (ratio > threshold && facePixelsCount > 0) {
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está centralizado (mais flexível)
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.4; // Mais flexível
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > 0.6) {
          proximity = "too-close";
        } else if (faceSize < 0.15) {
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
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
    const consecutiveDetectionsNeeded = 1;
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 3;
    
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
              
              // Amostra área maior para detecção
              const centerX = img.width * 0.1;
              const centerY = img.height * 0.1;
              const width = img.width * 0.8;
              const height = img.height * 0.8;
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(result => {
                if (result.detected) {
                  detectionCount++;
                  noDetectionCount = 0;
                  setFaceProximity(result.proximity);
                  
                  if (detectionCount >= consecutiveDetectionsNeeded) {
                    setFaceDetected(true);
                    setFacePosition(result.position);
                  }
                } else {
                  noDetectionCount++;
                  detectionCount = 0;
                  
                  if (noDetectionCount >= consecutiveNoDetectionsNeeded && faceDetected) {
                    setFaceDetected(false);
                    setFaceProximity("not-detected");
                  }
                }
              });
            }
          };
        }
      }
    }, 150); // Intervalo um pouco maior para melhor performance

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive, webcamRef, faceDetected]);

  return { faceDetected, facePosition, faceProximity };
};
