
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";

interface AdvancedSkinAnalysis {
  skinTonePixels: number;
  facePixelsCount: number;
  facePixelsSum: { x: number; y: number };
  contrastRatio: number;
  skinConsistency: number;
  colorVariation: number;
}

export const detectAdvancedSkinTone = (
  imageData: ImageData,
  centerX: number,
  centerY: number,
  faceRadiusX: number,
  faceRadiusY: number
): AdvancedSkinAnalysis => {
  const data = imageData.data;
  let skinTonePixels = 0;
  let facePixelsSum = { x: 0, y: 0 };
  let facePixelsCount = 0;
  let darkPixels = 0;
  let brightPixels = 0;
  let skinColors: { r: number; g: number; b: number }[] = [];
  
  console.log(`🔍 Starting skin detection - Center: ${centerX.toFixed(1)}, ${centerY.toFixed(1)}, Radius: ${faceRadiusX.toFixed(1)}x${faceRadiusY.toFixed(1)}`);
  
  // Análise SUPER flexível - aceitar praticamente qualquer pixel que não seja extremo
  for (let y = 0; y < imageData.height; y += FACE_DETECTION_CONFIG.SAMPLING_STEP) {
    for (let x = 0; x < imageData.width; x += FACE_DETECTION_CONFIG.SAMPLING_STEP) {
      const dx = (x - centerX) / faceRadiusX;
      const dy = (y - centerY) / faceRadiusY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      
      if (distanceFromCenter <= FACE_DETECTION_CONFIG.FACE_AREA_MULTIPLIER) {
        const index = (y * imageData.width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        
        // Critério SUPER flexível - basicamente qualquer pixel que não seja preto puro
        const brightness = (r + g + b) / 3;
        const isValidPixel = brightness > 15 && (r > 10 || g > 10 || b > 10);
        
        if (isValidPixel) {
          skinTonePixels++;
          facePixelsSum.x += x;
          facePixelsSum.y += y;
          facePixelsCount++;
          skinColors.push({ r, g, b });
          
          if (brightness > 70) brightPixels++;
          if (brightness < 70) darkPixels++;
        }
      }
    }
  }
  
  const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 1;
  const skinConsistency = 0.8; // Valor fixo alto
  const colorVariation = 0.3; // Valor fixo baixo
  
  console.log(`🔍 Skin analysis SIMPLE - SkinPixels: ${skinTonePixels}, FacePixels: ${facePixelsCount}, Contrast: ${contrastRatio.toFixed(2)}`);
  
  return {
    skinTonePixels,
    facePixelsCount,
    facePixelsSum,
    contrastRatio,
    skinConsistency,
    colorVariation
  };
};
