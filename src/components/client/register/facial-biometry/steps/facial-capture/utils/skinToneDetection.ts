
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";
import { SkinToneAnalysis } from "../types/faceDetectionTypes";

export const detectSkinTone = (
  imageData: ImageData,
  centerX: number,
  centerY: number,
  faceRadiusX: number,
  faceRadiusY: number
): SkinToneAnalysis => {
  const data = imageData.data;
  let skinTonePixels = 0;
  let facePixelsSum = { x: 0, y: 0 };
  let facePixelsCount = 0;
  let darkPixels = 0;
  let brightPixels = 0;
  
  // Verificar tons de pele com critérios mais flexíveis
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
        
        // Detecção de tom de pele mais permissiva
        const brightness = (r + g + b) / 3;
        const isFleshTone = 
          r > FACE_DETECTION_CONFIG.MIN_FLESH_TONE.r && 
          g > FACE_DETECTION_CONFIG.MIN_FLESH_TONE.g && 
          b > FACE_DETECTION_CONFIG.MIN_FLESH_TONE.b &&
          r >= g && g >= b && // Padrão de tom de pele
          r - b > FACE_DETECTION_CONFIG.MIN_RB_DIFFERENCE &&
          brightness > FACE_DETECTION_CONFIG.MIN_BRIGHTNESS_FLESH && 
          brightness < FACE_DETECTION_CONFIG.MAX_BRIGHTNESS_FLESH &&
          Math.abs(r - g) < FACE_DETECTION_CONFIG.MAX_RG_DIFFERENCE &&
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
  
  const contrastRatio = darkPixels > 0 ? brightPixels / darkPixels : 0;
  
  return {
    skinTonePixels,
    facePixelsCount,
    facePixelsSum,
    contrastRatio
  };
};
