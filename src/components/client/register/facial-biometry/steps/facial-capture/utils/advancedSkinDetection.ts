
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
  
  // Análise MUITO mais flexível de tom de pele
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
        
        // Critérios MUITO mais flexíveis para tom de pele humana
        const brightness = (r + g + b) / 3;
        const isValidSkinTone = validateHumanSkinTone(r, g, b, brightness);
        
        if (isValidSkinTone) {
          skinTonePixels++;
          facePixelsSum.x += x;
          facePixelsSum.y += y;
          facePixelsCount++;
          skinColors.push({ r, g, b });
          
          if (brightness > 80) brightPixels++;
          if (brightness < 80) darkPixels++;
        }
      }
    }
  }
  
  const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
  const skinConsistency = calculateSkinConsistency(skinColors);
  const colorVariation = calculateColorVariation(skinColors);
  
  console.log(`🔍 Skin analysis - SkinPixels: ${skinTonePixels}, FacePixels: ${facePixelsCount}, Contrast: ${contrastRatio.toFixed(2)}`);
  
  return {
    skinTonePixels,
    facePixelsCount,
    facePixelsSum,
    contrastRatio,
    skinConsistency,
    colorVariation
  };
};

const validateHumanSkinTone = (r: number, g: number, b: number, brightness: number): boolean => {
  // Critérios MUITO mais flexíveis para tom de pele humana
  
  // 1. Brightness range MUITO mais flexível
  if (brightness < 20 || brightness > 250) return false;
  
  // 2. Valores mínimos absolutos MUITO mais flexíveis
  if (r < 20 || g < 15 || b < 10) return false;
  
  // 3. Teste básico: evitar cores muito saturadas ou incomuns
  const sum = r + g + b;
  if (sum < 60 || sum > 750) return false;
  
  // 4. Evitar cores claramente não-humanas (azul muito forte, verde muito forte)
  if (b > r + 50 || g > r + 60) return false;
  
  // 5. Permitir praticamente qualquer tom que não seja extremo
  return true;
};

const calculateSkinConsistency = (skinColors: { r: number; g: number; b: number }[]): number => {
  if (skinColors.length < 3) return 0.8; // Valor alto se poucos pixels (mais permissivo)
  
  const avgR = skinColors.reduce((sum, color) => sum + color.r, 0) / skinColors.length;
  const avgG = skinColors.reduce((sum, color) => sum + color.g, 0) / skinColors.length;
  const avgB = skinColors.reduce((sum, color) => sum + color.b, 0) / skinColors.length;
  
  let totalVariation = 0;
  skinColors.forEach(color => {
    const variation = Math.abs(color.r - avgR) + Math.abs(color.g - avgG) + Math.abs(color.b - avgB);
    totalVariation += variation;
  });
  
  const avgVariation = totalVariation / skinColors.length;
  return Math.max(0, 1 - avgVariation / 200); // Ainda mais flexível
};

const calculateColorVariation = (skinColors: { r: number; g: number; b: number }[]): number => {
  if (skinColors.length < 2) return 0.1; // Valor baixo se poucos pixels (mais permissivo)
  
  const variations: number[] = [];
  for (let i = 0; i < Math.min(skinColors.length - 1, 50); i++) { // Limitar para performance
    const color1 = skinColors[i];
    const color2 = skinColors[i + 1];
    const variation = Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
    );
    variations.push(variation);
  }
  
  const avgVariation = variations.reduce((sum, v) => sum + v, 0) / variations.length;
  return avgVariation / 200; // Ainda mais flexível
};
