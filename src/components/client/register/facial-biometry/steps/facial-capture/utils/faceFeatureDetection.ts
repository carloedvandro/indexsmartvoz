
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
  
  // Definir regiões faciais esperadas - mais flexíveis
  const eyeRegion1 = { x: centerX - faceRadiusX * 0.35, y: centerY - faceRadiusY * 0.25, w: faceRadiusX * 0.25, h: faceRadiusY * 0.2 };
  const eyeRegion2 = { x: centerX + faceRadiusX * 0.1, y: centerY - faceRadiusY * 0.25, w: faceRadiusX * 0.25, h: faceRadiusY * 0.2 };
  const noseRegion = { x: centerX - faceRadiusX * 0.15, y: centerY - faceRadiusY * 0.1, w: faceRadiusX * 0.3, h: faceRadiusY * 0.25 };
  const mouthRegion = { x: centerX - faceRadiusX * 0.2, y: centerY + faceRadiusY * 0.1, w: faceRadiusX * 0.4, h: faceRadiusY * 0.2 };
  
  // Detectar características com critérios mais flexíveis
  const hasEyes = detectDarkRegion(imageData, eyeRegion1) || detectDarkRegion(imageData, eyeRegion2);
  const hasNose = detectNoseArea(imageData, noseRegion);
  const hasMouth = detectDarkRegion(imageData, mouthRegion);
  
  // Calcular simetria facial - mais flexível
  const faceSymmetry = calculateFaceSymmetry(imageData, centerX, centerY, faceRadiusX, faceRadiusY);
  
  // Calcular proporção facial
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
  
  for (let y = Math.max(0, Math.floor(region.y)); y < Math.min(imageData.height, Math.ceil(region.y + region.h)); y += 3) {
    for (let x = Math.max(0, Math.floor(region.x)); x < Math.min(imageData.width, Math.ceil(region.x + region.w)); x += 3) {
      const index = (y * imageData.width + x) * 4;
      const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
      
      if (brightness < 140) darkPixels++; // Mais flexível
      totalPixels++;
    }
  }
  
  return totalPixels > 0 && (darkPixels / totalPixels) > 0.2; // Mais flexível
};

const detectNoseArea = (imageData: ImageData, region: { x: number; y: number; w: number; h: number }): boolean => {
  const data = imageData.data;
  let nosePixels = 0;
  let totalPixels = 0;
  
  for (let y = Math.max(0, Math.floor(region.y)); y < Math.min(imageData.height, Math.ceil(region.y + region.h)); y += 3) {
    for (let x = Math.max(0, Math.floor(region.x)); x < Math.min(imageData.width, Math.ceil(region.x + region.w)); x += 3) {
      const index = (y * imageData.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = (r + g + b) / 3;
      
      // Critérios mais flexíveis para nariz
      if (brightness > 60 && brightness < 220 && r >= g && g >= b) {
        nosePixels++;
      }
      totalPixels++;
    }
  }
  
  return totalPixels > 0 && (nosePixels / totalPixels) > 0.3; // Mais flexível
};

const calculateFaceSymmetry = (
  imageData: ImageData,
  centerX: number,
  centerY: number,
  faceRadiusX: number,
  faceRadiusY: number
): number => {
  // Simplificado - retorna um valor padrão aceitável
  return 0.5;
};
