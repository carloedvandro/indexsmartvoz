
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
  
  // Análise mais flexível de tom de pele
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
        
        // Critérios mais flexíveis para tom de pele humana
        const brightness = (r + g + b) / 3;
        const isValidSkinTone = validateHumanSkinTone(r, g, b, brightness);
        
        if (isValidSkinTone) {
          skinTonePixels++;
          facePixelsSum.x += x;
          facePixelsSum.y += y;
          facePixelsCount++;
          skinColors.push({ r, g, b });
          
          if (brightness > 100) brightPixels++;
          if (brightness < 100) darkPixels++;
        }
      }
    }
  }
  
  const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
  const skinConsistency = calculateSkinConsistency(skinColors);
  const colorVariation = calculateColorVariation(skinColors);
  
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
  // Critérios mais flexíveis para tom de pele humana
  
  // 1. Brightness range mais flexível
  if (brightness < 40 || brightness > 240) return false;
  
  // 2. Padrão RGB característico de pele humana - mais flexível
  if (r < g || g < b) return false;
  
  // 3. Diferenças mínimas entre canais - mais flexíveis
  const rg_diff = r - g;
  const rb_diff = r - b;
  const gb_diff = g - b;
  
  if (rg_diff < 3 || rb_diff < 8 || gb_diff < 2) return false;
  if (rg_diff > 60 || rb_diff > 100 || gb_diff > 70) return false;
  
  // 4. Proporções específicas de pele humana - mais flexíveis
  const rg_ratio = r / Math.max(g, 1);
  const rb_ratio = r / Math.max(b, 1);
  
  if (rg_ratio < 1.05 || rg_ratio > 2.0) return false;
  if (rb_ratio < 1.1 || rb_ratio > 3.0) return false;
  
  // 5. Valores mínimos absolutos - mais flexíveis
  if (r < 40 || g < 30 || b < 20) return false;
  
  // 6. Teste adicional: soma dos canais deve estar em range específico - mais flexível
  const sum = r + g + b;
  if (sum < 120 || sum > 720) return false;
  
  return true;
};

const calculateSkinConsistency = (skinColors: { r: number; g: number; b: number }[]): number => {
  if (skinColors.length < 5) return 0.5; // Valor neutro se poucos pixels
  
  const avgR = skinColors.reduce((sum, color) => sum + color.r, 0) / skinColors.length;
  const avgG = skinColors.reduce((sum, color) => sum + color.g, 0) / skinColors.length;
  const avgB = skinColors.reduce((sum, color) => sum + color.b, 0) / skinColors.length;
  
  let totalVariation = 0;
  skinColors.forEach(color => {
    const variation = Math.abs(color.r - avgR) + Math.abs(color.g - avgG) + Math.abs(color.b - avgB);
    totalVariation += variation;
  });
  
  const avgVariation = totalVariation / skinColors.length;
  return Math.max(0, 1 - avgVariation / 150); // Mais flexível
};

const calculateColorVariation = (skinColors: { r: number; g: number; b: number }[]): number => {
  if (skinColors.length < 3) return 0.3; // Valor aceitável se poucos pixels
  
  const variations: number[] = [];
  for (let i = 0; i < skinColors.length - 1; i++) {
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
  return avgVariation / 150; // Mais flexível
};
