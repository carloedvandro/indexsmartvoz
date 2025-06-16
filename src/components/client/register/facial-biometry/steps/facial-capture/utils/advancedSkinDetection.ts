
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
  
  // Análise mais rigorosa de tom de pele
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
        
        // Critérios mais rigorosos para tom de pele humana
        const brightness = (r + g + b) / 3;
        const isValidSkinTone = validateHumanSkinTone(r, g, b, brightness);
        
        if (isValidSkinTone) {
          skinTonePixels++;
          facePixelsSum.x += x;
          facePixelsSum.y += y;
          facePixelsCount++;
          skinColors.push({ r, g, b });
          
          if (brightness > 120) brightPixels++;
          if (brightness < 120) darkPixels++;
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
  // Critérios mais rigorosos para tom de pele humana
  
  // 1. Brightness range mais restritivo
  if (brightness < 70 || brightness > 210) return false;
  
  // 2. Padrão RGB característico de pele humana
  if (!(r >= g && g >= b)) return false;
  
  // 3. Diferenças mínimas entre canais
  const rg_diff = r - g;
  const rb_diff = r - b;
  const gb_diff = g - b;
  
  if (rg_diff < 8 || rb_diff < 15 || gb_diff < 5) return false;
  if (rg_diff > 40 || rb_diff > 80 || gb_diff > 50) return false;
  
  // 4. Proporções específicas de pele humana
  const rg_ratio = r / Math.max(g, 1);
  const rb_ratio = r / Math.max(b, 1);
  
  if (rg_ratio < 1.1 || rg_ratio > 1.6) return false;
  if (rb_ratio < 1.2 || rb_ratio > 2.5) return false;
  
  // 5. Valores mínimos absolutos
  if (r < 60 || g < 45 || b < 30) return false;
  
  // 6. Teste adicional: soma dos canais deve estar em range específico
  const sum = r + g + b;
  if (sum < 210 || sum > 630) return false;
  
  return true;
};

const calculateSkinConsistency = (skinColors: { r: number; g: number; b: number }[]): number => {
  if (skinColors.length < 10) return 0;
  
  const avgR = skinColors.reduce((sum, color) => sum + color.r, 0) / skinColors.length;
  const avgG = skinColors.reduce((sum, color) => sum + color.g, 0) / skinColors.length;
  const avgB = skinColors.reduce((sum, color) => sum + color.b, 0) / skinColors.length;
  
  let totalVariation = 0;
  skinColors.forEach(color => {
    const variation = Math.abs(color.r - avgR) + Math.abs(color.g - avgG) + Math.abs(color.b - avgB);
    totalVariation += variation;
  });
  
  const avgVariation = totalVariation / skinColors.length;
  return Math.max(0, 1 - avgVariation / 100); // Normalizado entre 0 e 1
};

const calculateColorVariation = (skinColors: { r: number; g: number; b: number }[]): number => {
  if (skinColors.length < 5) return 1; // Muita variação se poucos pixels
  
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
  return avgVariation / 100; // Normalizado
};
