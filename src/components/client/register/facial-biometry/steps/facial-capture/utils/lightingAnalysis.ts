
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";
import { LightingAnalysis } from "../types/faceDetectionTypes";

export const analyzeLighting = (imageData: ImageData): LightingAnalysis => {
  const data = imageData.data;
  let totalBrightness = 0;
  let pixelCount = 0;
  
  // Análise de iluminação geral da imagem
  for (let y = 0; y < imageData.height; y += FACE_DETECTION_CONFIG.BRIGHTNESS_SAMPLING_STEP) {
    for (let x = 0; x < imageData.width; x += FACE_DETECTION_CONFIG.BRIGHTNESS_SAMPLING_STEP) {
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
  
  // Determinar qualidade da iluminação - critérios mais flexíveis
  let quality: "good" | "poor" | "too-dark" | "too-bright" = "poor";
  
  if (averageBrightness < FACE_DETECTION_CONFIG.MIN_BRIGHTNESS) {
    quality = "too-dark";
  } else if (averageBrightness > FACE_DETECTION_CONFIG.MAX_BRIGHTNESS) {
    quality = "too-bright";
  } else if (
    averageBrightness >= FACE_DETECTION_CONFIG.IDEAL_MIN_BRIGHTNESS && 
    averageBrightness <= FACE_DETECTION_CONFIG.IDEAL_MAX_BRIGHTNESS
  ) {
    quality = "good";
  } else {
    quality = "good"; // Considerando mais situações como "good"
  }
  
  return {
    quality,
    averageBrightness
  };
};
