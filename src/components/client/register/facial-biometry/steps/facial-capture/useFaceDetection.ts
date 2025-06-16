
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

interface FaceDetectionResult {
  faceDetected: boolean;
  facePosition: { x: number; y: number; size: number };
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  lightingQuality: "good" | "poor" | "too-dark" | "too-bright";
}

export const useFaceDetection = (
  webcamRef: RefObject<Webcam>,
  isProcessing: boolean,
  cameraActive: boolean
): FaceDetectionResult => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0, size: 0 });
  const [faceProximity, setFaceProximity] = useState<"ideal" | "too-close" | "too-far" | "not-detected">("not-detected");
  const [lightingQuality, setLightingQuality] = useState<"good" | "poor" | "too-dark" | "too-bright">("poor");

  const checkFace = async (imageData: ImageData): Promise<{
    detected: boolean, 
    position: {x: number, y: number, size: number}, 
    proximity: "ideal" | "too-close" | "too-far" | "not-detected",
    lighting: "good" | "poor" | "too-dark" | "too-bright"
  }> => {
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    // Threshold mais baixo para facilitar a detecção
    const threshold = 0.008; // Reduzido de 0.025 para 0.008
    
    // Área central onde o rosto deve estar - expandida
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.35; // Aumentado de 0.3
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.45; // Aumentado de 0.4
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    let darkPixels = 0;
    let brightPixels = 0;
    let totalBrightness = 0;
    let pixelCount = 0;
    
    // Análise de iluminação geral da imagem
    for (let y = 0; y < imageData.height; y += 4) { // Amostragem mais rápida
      for (let x = 0; x < imageData.width; x += 4) {
        const index = (y * imageData.width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const brightness = (r + g + b) / 3;
        totalBrightness += brightness;
        pixelCount++;
      }
    }
    
    const averageBrightness = totalBrightness / pixelCount;
    
    // Determinar qualidade da iluminação - critérios mais flexíveis
    let lighting: "good" | "poor" | "too-dark" | "too-bright" = "poor";
    if (averageBrightness < 70) { // Reduzido de 80
      lighting = "too-dark";
    } else if (averageBrightness > 220) { // Aumentado de 200
      lighting = "too-bright";
    } else if (averageBrightness >= 100 && averageBrightness <= 200) { // Expandido de 120-180
      lighting = "good";
    } else {
      lighting = "good"; // Considerando mais situações como "good"
    }
    
    // Verificar tons de pele com critérios mais flexíveis
    if (lighting === "good") {
      for (let y = 0; y < imageData.height; y += 3) { // Amostragem mais densa
        for (let x = 0; x < imageData.width; x += 3) {
          const dx = (x - centerX) / faceRadiusX;
          const dy = (y - centerY) / faceRadiusY;
          const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
          
          if (distanceFromCenter <= 1.2) { // Área expandida de 1.0 para 1.2
            const index = (y * imageData.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            
            // Detecção de tom de pele mais permissiva
            const brightness = (r + g + b) / 3;
            const isFleshTone = 
              r > 60 && g > 45 && b > 30 && // Mínimos reduzidos
              r >= g && g >= b && // Padrão de tom de pele
              r - b > 8 && // Diferença vermelho-azul reduzida
              brightness > 60 && brightness < 220 && // Faixa de brilho expandida
              Math.abs(r - g) < 50 && // Tolerância aumentada
              (r + g) > (b * 1.5); // Critério mais flexível
            
            if (isFleshTone) {
              skinTonePixels++;
              facePixelsSum.x += x;
              facePixelsSum.y += y;
              facePixelsCount++;
              
              if (brightness > 110) brightPixels++;
              if (brightness < 110) darkPixels++;
            }
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
    
    console.log("🔍 Face detection - Ratio:", ratio.toFixed(6), "Threshold:", threshold, "FacePixels:", facePixelsCount, "Contrast:", contrastRatio.toFixed(2), "Lighting:", lighting, "AvgBrightness:", averageBrightness.toFixed(1));
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    // Critérios mais permissivos para detecção
    if (lighting === "good" && 
        ratio > threshold && 
        facePixelsCount > 150 && // Reduzido de 300
        contrastRatio > 0.3 && contrastRatio < 8) { // Mais flexível
      
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está bem centralizado - mais permissivo
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.5; // Mais permissivo de 0.3 para 0.5
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > 0.7) { // Ajustado
          proximity = "too-close";
        } else if (faceSize < 0.1) { // Ajustado
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
        console.log("✅ Face detected - Size:", faceSize.toFixed(3), "Centered:", isCentered, "Proximity:", proximity, "Lighting:", lighting);
      } else {
        console.log("❌ Face not centered enough - Distance:", distanceFromFrameCenter.toFixed(3));
      }
    } else {
      console.log("❌ Face not detected - Ratio:", ratio.toFixed(6), "FacePixelsCount:", facePixelsCount, "Contrast:", contrastRatio.toFixed(2), "Lighting:", lighting);
    }
    
    return { 
      detected: detectedFace, 
      position: facePos,
      proximity: proximity,
      lighting: lighting
    };
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 3; // Reduzido de 5
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 5; // Aumentado de 3 para dar mais chances
    
    console.log("🔄 Starting face detection with more flexible parameters");
    
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
              const centerY = img.height * 0.05;
              const width = img.width * 0.9; // Aumentado de 0.8
              const height = img.height * 0.9;
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(result => {
                setLightingQuality(result.lighting);
                
                console.log("📊 Face detection result:", result);
                
                if (result.detected && result.lighting === "good") {
                  detectionCount++;
                  noDetectionCount = 0;
                  setFaceProximity(result.proximity);
                  setFacePosition(result.position);
                  
                  if (detectionCount >= consecutiveDetectionsNeeded) {
                    setFaceDetected(true);
                    console.log("✅ Face confirmed after", detectionCount, "consecutive detections with good lighting");
                  }
                } else {
                  noDetectionCount++;
                  detectionCount = 0;
                  
                  if (noDetectionCount >= consecutiveNoDetectionsNeeded) {
                    setFaceDetected(false);
                    setFaceProximity("not-detected");
                    console.log("❌ Face detection lost or poor lighting");
                  }
                }
              });
            }
          };
        }
      }
    }, 150); // Ligeiramente mais rápido: 150ms

    return () => {
      console.log("🛑 Clearing face detection interval");
      clearInterval(interval);
    };
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected, facePosition, faceProximity, lightingQuality };
};
