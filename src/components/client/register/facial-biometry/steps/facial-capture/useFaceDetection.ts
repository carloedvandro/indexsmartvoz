
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
    
    // Threshold muito baixo para detecção mais fácil
    const threshold = 0.01;
    
    // Área central onde o rosto deve estar (muito flexível)
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.5;
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.6;
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    
    // Verificar tons de pele em área muito ampla
    for (let y = 0; y < imageData.height; y += 3) { // Skip mais pixels para performance
      for (let x = 0; x < imageData.width; x += 3) {
        const dx = (x - centerX) / faceRadiusX;
        const dy = (y - centerY) / faceRadiusY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        if (distanceFromCenter <= 1.5) { // Área muito ampla
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Detecção de tom de pele muito ampla
          if (
            r > 10 && g > 5 && b > 3 &&
            r >= g - 30 && r >= b - 30 &&
            Math.max(r, g, b) - Math.min(r, g, b) < 200 &&
            r + g + b > 30
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
    
    console.log("🔍 Face detection - Ratio:", ratio, "Threshold:", threshold, "SkinPixels:", skinTonePixels);
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    if (ratio > threshold && facePixelsCount > 50) { // Mínimo muito baixo
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está razoavelmente centralizado (muito flexível)
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.8; // Muito flexível
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > 0.8) {
          proximity = "too-close";
        } else if (faceSize < 0.08) {
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
      } else {
        // Mesmo não centralizado, detectar o rosto
        detectedFace = true;
        proximity = "ideal"; // Considerar ideal mesmo não centralizado
      }
      
      console.log("✅ Face detected - Size:", faceSize, "Centered:", isCentered, "Proximity:", proximity);
    } else {
      console.log("❌ Face not detected - Low ratio or insufficient pixels");
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
    const consecutiveNoDetectionsNeeded = 10; // Mais tolerante
    
    console.log("🔄 Starting face detection interval");
    
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
              const centerX = img.width * 0.02;
              const centerY = img.height * 0.02;
              const width = img.width * 0.96;
              const height = img.height * 0.96;
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(result => {
                console.log("📊 Face detection result:", result);
                
                if (result.detected) {
                  detectionCount++;
                  noDetectionCount = 0;
                  setFaceProximity(result.proximity);
                  setFacePosition(result.position);
                  
                  if (detectionCount >= consecutiveDetectionsNeeded) {
                    setFaceDetected(true);
                    console.log("✅ Face detected and set to true");
                  }
                } else {
                  noDetectionCount++;
                  detectionCount = 0;
                  
                  if (noDetectionCount >= consecutiveNoDetectionsNeeded) {
                    setFaceDetected(false);
                    setFaceProximity("not-detected");
                    console.log("❌ Face detection lost");
                  }
                }
              });
            }
          };
        }
      }
    }, 200); // Interval menos frequente para melhor performance

    return () => {
      console.log("🛑 Clearing face detection interval");
      clearInterval(interval);
    };
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected, facePosition, faceProximity };
};
