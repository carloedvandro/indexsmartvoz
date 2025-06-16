
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
    
    // Threshold mais rigoroso para garantir 100% de detecção
    const threshold = 0.025; // Aumentado para ser mais rigoroso
    
    // Área central onde o rosto deve estar
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.3;
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.4;
    
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    let darkPixels = 0;
    let brightPixels = 0;
    let totalBrightness = 0;
    let pixelCount = 0;
    
    // Análise de iluminação geral da imagem
    for (let y = 0; y < imageData.height; y += 3) {
      for (let x = 0; x < imageData.width; x += 3) {
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
    
    // Determinar qualidade da iluminação
    let lighting: "good" | "poor" | "too-dark" | "too-bright" = "poor";
    if (averageBrightness < 80) {
      lighting = "too-dark";
    } else if (averageBrightness > 200) {
      lighting = "too-bright";
    } else if (averageBrightness >= 120 && averageBrightness <= 180) {
      lighting = "good";
    } else {
      lighting = "poor";
    }
    
    // Verificar tons de pele apenas se a iluminação for boa
    if (lighting === "good") {
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
            
            // Detecção de tom de pele mais rigorosa
            const brightness = (r + g + b) / 3;
            const isFleshTone = 
              r > 80 && g > 60 && b > 40 && // Mínimos mais altos para boa iluminação
              r >= g && g >= b && // Padrão de tom de pele
              r - b > 15 && // Diferença vermelho-azul
              brightness > 80 && brightness < 200 && // Faixa de brilho mais restrita
              Math.abs(r - g) < 40 && // Vermelho e verde próximos
              (r + g) > (b * 1.8); // Tons quentes dominantes
            
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
    }
    
    const ratio = skinTonePixels / totalPixels;
    const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
    
    console.log("🔍 Face detection - Ratio:", ratio, "Threshold:", threshold, "Contrast:", contrastRatio, "Lighting:", lighting, "AvgBrightness:", averageBrightness.toFixed(1));
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    // Critérios mais rigorosos: só detecta com boa iluminação
    if (lighting === "good" && 
        ratio > threshold && 
        facePixelsCount > 300 && // Aumentado para ser mais rigoroso
        contrastRatio > 0.5 && contrastRatio < 6) { // Contraste mais rigoroso
      
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está bem centralizado
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < 0.3; // Mais rigoroso
      
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
        console.log("✅ Face detected - Size:", faceSize.toFixed(3), "Centered:", isCentered, "Proximity:", proximity, "Lighting:", lighting);
      } else {
        console.log("❌ Face not centered enough - Distance:", distanceFromFrameCenter.toFixed(3));
      }
    } else {
      console.log("❌ Face not detected - Ratio:", ratio.toFixed(4), "FacePixelsCount:", facePixelsCount, "Contrast:", contrastRatio.toFixed(2), "Lighting:", lighting);
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
    const consecutiveDetectionsNeeded = 5; // Aumentado para 5 detecções consecutivas
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 3;
    
    console.log("🔄 Starting rigorous face detection with lighting check");
    
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
              
              // Amostra área central
              const centerX = img.width * 0.1;
              const centerY = img.height * 0.1;
              const width = img.width * 0.8;
              const height = img.height * 0.8;
              
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
    }, 200); // Interval um pouco mais lento para análise mais rigorosa

    return () => {
      console.log("🛑 Clearing rigorous face detection interval");
      clearInterval(interval);
    };
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected, facePosition, faceProximity, lightingQuality };
};
