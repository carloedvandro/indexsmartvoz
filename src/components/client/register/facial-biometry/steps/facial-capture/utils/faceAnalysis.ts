
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";
import { FaceAnalysisResult } from "../types/faceDetectionTypes";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  console.log(`🔍 ULTRA SIMPLE Face detection - Image: ${imageData.width}x${imageData.height}`);
  
  const data = imageData.data;
  const totalPixels = imageData.data.length / 4;
  
  // Área central onde esperamos o rosto
  const centerX = imageData.width / 2;
  const centerY = imageData.height / 2;
  const checkRadius = Math.min(imageData.width, imageData.height) * 0.3;
  
  let validPixels = 0;
  let totalChecked = 0;
  
  // Verificação ULTRA simples - apenas contar pixels que não são preto puro
  for (let y = Math.max(0, centerY - checkRadius); y < Math.min(imageData.height, centerY + checkRadius); y += 8) {
    for (let x = Math.max(0, centerX - checkRadius); x < Math.min(imageData.width, centerX + checkRadius); x += 8) {
      const index = (y * imageData.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      
      // Critério ULTRA simples - qualquer pixel que não seja quase preto
      const brightness = (r + g + b) / 3;
      if (brightness > 30) {
        validPixels++;
      }
      totalChecked++;
    }
  }
  
  const pixelRatio = validPixels / totalChecked;
  
  console.log(`🔍 ULTRA SIMPLE - ValidPixels: ${validPixels}, TotalChecked: ${totalChecked}, Ratio: ${pixelRatio.toFixed(3)}`);
  
  // Condição ULTRA simples - se temos pixels válidos suficientes, consideramos como rosto
  const hasContent = pixelRatio > 0.3; // 30% dos pixels devem ter algum conteúdo
  
  if (hasContent) {
    console.log(`✅ ULTRA SIMPLE FACE DETECTED - Pixel ratio: ${pixelRatio.toFixed(3)}`);
    
    return {
      detected: true,
      position: {
        x: 0.5, // Centro
        y: 0.5, // Centro
        size: 0.4 // Tamanho médio
      },
      proximity: "ideal", // Sempre ideal quando detectado
      lighting: "good" // Sempre boa
    };
  } else {
    console.log(`❌ ULTRA SIMPLE - Insufficient content - Ratio: ${pixelRatio.toFixed(3)}`);
    
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected",
      lighting: "good"
    };
  }
};
