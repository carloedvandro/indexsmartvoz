
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";

interface FaceFeatureResult {
  hasEyes: boolean;
  hasNose: boolean;
  hasMouth: boolean;
  faceSymmetry: number;
  aspectRatio: number;
}

export const detectFaceFeatures = (
  imageData: ImageData,
  centerX: number,
  centerY: number,
  faceRadiusX: number,
  faceRadiusY: number
): FaceFeatureResult => {
  const data = imageData.data;
  
  // Definir regiões faciais esperadas
  const eyeRegion1 = { x: centerX - faceRadiusX * 0.3, y: centerY - faceRadiusY * 0.2, w: faceRadiusX * 0.2, h: faceRadiusY * 0.15 };
  const eyeRegion2 = { x: centerX + faceRadiusX * 0.1, y: centerY - faceRadiusY * 0.2, w: faceRadiusX * 0.2, h: faceRadiusY * 0.15 };
  const noseRegion = { x: centerX - faceRadiusX * 0.1, y: centerY - faceRadiusY * 0.05, w: faceRadiusX * 0.2, h: faceRadiusY * 0.2 };
  const mouthRegion = { x: centerX - faceRadiusX * 0.15, y: centerY + faceRadiusY * 0.15, w: faceRadiusX * 0.3, h: faceRadiusY * 0.15 };
  
  // Detectar regiões mais escuras (olhos/boca)
  const hasEyes = detectDarkRegion(imageData, eyeRegion1) && detectDarkRegion(imageData, eyeRegion2);
  const hasNose = detectNoseArea(imageData, noseRegion);
  const hasMouth = detectDarkRegion(imageData, mouthRegion);
  
  // Calcular simetria facial
  const faceSymmetry = calculateFaceSymmetry(imageData, centerX, centerY, faceRadiusX, faceRadiusY);
  
  // Calcular proporção facial (deve estar próxima da proporção humana)
  const aspectRatio = faceRadiusY / faceRadiusX;
  
  return {
    hasEyes,
    hasNose,
    hasMouth,
    faceSymmetry,
    aspectRatio
  };
};

const detectDarkRegion = (imageData: ImageData, region: { x: number; y: number; w: number; h: number }): boolean => {
  const data = imageData.data;
  let darkPixels = 0;
  let totalPixels = 0;
  
  for (let y = Math.max(0, Math.floor(region.y)); y < Math.min(imageData.height, Math.ceil(region.y + region.h)); y += 2) {
    for (let x = Math.max(0, Math.floor(region.x)); x < Math.min(imageData.width, Math.ceil(region.x + region.w)); x += 2) {
      const index = (y * imageData.width + x) * 4;
      const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
      
      if (brightness < 120) darkPixels++;
      totalPixels++;
    }
  }
  
  return totalPixels > 0 && (darkPixels / totalPixels) > 0.3;
};

const detectNoseArea = (imageData: ImageData, region: { x: number; y: number; w: number; h: number }): boolean => {
  const data = imageData.data;
  let nosePixels = 0;
  let totalPixels = 0;
  
  for (let y = Math.max(0, Math.floor(region.y)); y < Math.min(imageData.height, Math.ceil(region.y + region.h)); y += 2) {
    for (let x = Math.max(0, Math.floor(region.x)); x < Math.min(imageData.width, Math.ceil(region.x + region.w)); x += 2) {
      const index = (y * imageData.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = (r + g + b) / 3;
      
      // Nariz geralmente tem tom de pele mas pode ser ligeiramente mais claro/escuro
      if (brightness > 80 && brightness < 200 && r > g && g > b) {
        nosePixels++;
      }
      totalPixels++;
    }
  }
  
  return totalPixels > 0 && (nosePixels / totalPixels) > 0.4;
};

const calculateFaceSymmetry = (
  imageData: ImageData,
  centerX: number,
  centerY: number,
  faceRadiusX: number,
  faceRadiusY: number
): number => {
  const data = imageData.data;
  let symmetryScore = 0;
  let comparisons = 0;
  
  // Comparar pixels dos lados esquerdo e direito
  for (let y = centerY - faceRadiusY * 0.5; y < centerY + faceRadiusY * 0.5; y += 4) {
    for (let offset = 10; offset < faceRadiusX * 0.8; offset += 8) {
      const leftX = Math.floor(centerX - offset);
      const rightX = Math.floor(centerX + offset);
      
      if (leftX >= 0 && rightX < imageData.width && y >= 0 && y < imageData.height) {
        const leftIndex = (Math.floor(y) * imageData.width + leftX) * 4;
        const rightIndex = (Math.floor(y) * imageData.width + rightX) * 4;
        
        const leftBrightness = (data[leftIndex] + data[leftIndex + 1] + data[leftIndex + 2]) / 3;
        const rightBrightness = (data[rightIndex] + data[rightIndex + 1] + data[rightIndex + 2]) / 3;
        
        const difference = Math.abs(leftBrightness - rightBrightness);
        symmetryScore += Math.max(0, 50 - difference) / 50;
        comparisons++;
      }
    }
  }
  
  return comparisons > 0 ? symmetryScore / comparisons : 0;
};
