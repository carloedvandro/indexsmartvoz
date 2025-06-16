
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
    
    // Threshold mais rigoroso para detecção real de rosto
    const threshold = 0.03; // Aumentado de 0.01 para 0.03
    
    // Área central onde o rosto deve estar (mais restritiva)
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.3; // Reduzido de 0.5 para 0.3
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.4; // Reduzido de 0.6 para 0.4
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    let darkPixels = 0; // Para detectar olhos/sobrancelhas
    let brightPixels = 0; // Para detectar testa/bochechas
    
    // Verificar tons de pele em área mais restrita
    for (let y = 0; y < imageData.height; y += 2) { // Melhor precisão
      for (let x = 0; x < imageData.width; x += 2) {
        const dx = (x - centerX) / faceRadiusX;
        const dy = (y - centerY) / faceRadiusY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        if (distanceFromCenter <= 1.0) { // Área mais restrita
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Detecção de tom de pele mais rigorosa
          const brightness = (r + g + b) / 3;
          const isFleshTone = 
            r > 80 && g > 50 && b > 30 && // Mínimos mais altos
            r >= g && g >= b && // Padrão de tom de pele
            r - b > 15 && // Diferença vermelho-azul
            brightness > 70 && brightness < 220 && // Faixa de brilho
            Math.abs(r - g) < 50; // Vermelho e verde próximos
          
          if (isFleshTone) {
            skinTonePixels++;
            facePixelsSum.x += x;
            facePixelsSum.y += y;
            facePixelsCount++;
            
            if (brightness > 120) brightPixels++;
            if (brightness < 100) darkPixels++;
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
    
    console.log("🔍 Face detection - Ratio:", ratio, "Threshold:", threshold, "Contrast:", contrastRatio, "SkinPixels:", skinTonePixels);
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    // Critérios mais rigorosos para detecção de rosto
    if (ratio > threshold && 
        facePixelsCount > 200 && // Mínimo mais alto
        contrastRatio > 0.5 && contrastRatio < 5) { // Deve ter contraste (olhos/sobrancelhas vs pele)
      
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está bem centralizado (mais rigoroso)
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.4; // Mais rigoroso, era 0.8
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > 0.6) { // Ajustado
          proximity = "too-close";
        } else if (faceSize < 0.15) { // Ajustado
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
      console.log("❌ Face not detected - Low quality or insufficient features");
    }
    
    return { 
      detected: detectedFace, 
      position: facePos,
      proximity: proximity 
    };
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 3; // Precisa de 3 detecções consecutivas
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 5; // Mais rápido para perder detecção
    
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
              
              // Amostra área central apenas
              const centerX = img.width * 0.1;
              const centerY = img.height * 0.1;
              const width = img.width * 0.8;
              const height = img.height * 0.8;
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(result => {
                console.log("📊 Face detection result:", result);
                
                if (result.detected && result.proximity === "ideal") {
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
                  
                  if (result.detected) {
                    setFaceProximity(result.proximity);
                    setFacePosition(result.position);
                  }
                  
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
    }, 300); // Interval um pouco mais lento para estabilidade

    return () => {
      console.log("🛑 Clearing face detection interval");
      clearInterval(interval);
    };
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected, facePosition, faceProximity };
};
