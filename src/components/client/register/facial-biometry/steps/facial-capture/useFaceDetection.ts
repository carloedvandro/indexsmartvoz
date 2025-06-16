
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
    
    // Threshold mais sensível para melhor detecção
    const threshold = 0.015; // Reduzido de 0.03 para 0.015
    
    // Área central onde o rosto deve estar
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.35; // Aumentado de 0.3 para 0.35
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.45; // Aumentado de 0.4 para 0.45
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    let darkPixels = 0; // Para detectar olhos/sobrancelhas
    let brightPixels = 0; // Para detectar testa/bochechas
    
    // Verificar tons de pele em área expandida
    for (let y = 0; y < imageData.height; y += 2) {
      for (let x = 0; x < imageData.width; x += 2) {
        const dx = (x - centerX) / faceRadiusX;
        const dy = (y - centerY) / faceRadiusY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        if (distanceFromCenter <= 1.0) {
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Detecção de tom de pele mais flexível
          const brightness = (r + g + b) / 3;
          const isFleshTone = 
            r > 60 && g > 40 && b > 20 && // Mínimos mais baixos
            r >= g && g >= b && // Padrão de tom de pele
            r - b > 10 && // Diferença vermelho-azul reduzida
            brightness > 50 && brightness < 240 && // Faixa de brilho expandida
            Math.abs(r - g) < 60; // Vermelho e verde com tolerância maior
          
          if (isFleshTone) {
            skinTonePixels++;
            facePixelsSum.x += x;
            facePixelsSum.y += y;
            facePixelsCount++;
            
            if (brightness > 100) brightPixels++;
            if (brightness < 120) darkPixels++;
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
    
    console.log("🔍 Face detection - Ratio:", ratio, "Threshold:", threshold, "Contrast:", contrastRatio, "SkinPixels:", skinTonePixels, "FacePixelsCount:", facePixelsCount);
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    // Critérios mais flexíveis para detecção de rosto
    if (ratio > threshold && 
        facePixelsCount > 150 && // Reduzido de 200 para 150
        contrastRatio > 0.3 && contrastRatio < 8) { // Contraste mais flexível
      
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está centralizado (mais flexível)
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.6; // Mais flexível, era 0.4
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > 0.65) { // Ajustado
          proximity = "too-close";
        } else if (faceSize < 0.12) { // Ajustado
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
        console.log("✅ Face detected - Size:", faceSize, "Centered:", isCentered, "Proximity:", proximity);
      } else {
        console.log("❌ Face not centered enough - Distance:", distanceFromFrameCenter);
      }
    } else {
      console.log("❌ Face not detected - Ratio:", ratio, "FacePixelsCount:", facePixelsCount, "Contrast:", contrastRatio);
    }
    
    return { 
      detected: detectedFace, 
      position: facePos,
      proximity: proximity 
    };
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 2; // Reduzido de 3 para 2 detecções consecutivas
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 4; // Reduzido de 5 para 4
    
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
              
              // Amostra área central expandida
              const centerX = img.width * 0.05; // Reduzido de 0.1
              const centerY = img.height * 0.05; // Reduzido de 0.1
              const width = img.width * 0.9; // Aumentado de 0.8
              const height = img.height * 0.9; // Aumentado de 0.8
              
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
                    console.log("✅ Face confirmed after", detectionCount, "consecutive detections");
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
    }, 250); // Interval um pouco mais rápido para melhor responsividade

    return () => {
      console.log("🛑 Clearing face detection interval");
      clearInterval(interval);
    };
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected, facePosition, faceProximity };
};
