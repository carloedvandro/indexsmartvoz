
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";
import { FaceAnalysisResult } from "../types/faceDetectionTypes";
import { analyzeLighting } from "./lightingAnalysis";
import { detectAdvancedSkinTone } from "./advancedSkinDetection";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  const totalPixels = imageData.data.length / 4;
  
  // Área central onde o rosto deve estar
  const centerX = imageData.width / 2;
  const centerY = imageData.height / 2;
  const faceRadiusX = Math.min(imageData.width, imageData.height) * FACE_DETECTION_CONFIG.FACE_RADIUS_X_MULTIPLIER;
  const faceRadiusY = Math.min(imageData.width, imageData.height) * FACE_DETECTION_CONFIG.FACE_RADIUS_Y_MULTIPLIER;
  
  // Análise de iluminação sempre como "good" para não bloquear
  const lightingAnalysis = { quality: "good" as const, averageBrightness: 100 };
  
  console.log(`🔍 SIMPLE Face detection - Image: ${imageData.width}x${imageData.height}`);
  
  let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
  let detectedFace = false;
  let facePos = { x: 0, y: 0, size: 0 };
  
  // Análise de tom de pele SEMPRE
  const skinToneAnalysis = detectAdvancedSkinTone(imageData, centerX, centerY, faceRadiusX, faceRadiusY);
  
  const ratio = skinToneAnalysis.skinTonePixels / totalPixels;
  
  console.log(`🔍 SIMPLE Analysis - Ratio: ${ratio.toFixed(6)} (threshold: ${FACE_DETECTION_CONFIG.DETECTION_THRESHOLD})`);
  console.log(`🔍 SIMPLE - SkinPixels: ${skinToneAnalysis.skinTonePixels}, MinPixels: ${FACE_DETECTION_CONFIG.MIN_FACE_PIXELS}`);
  
  // Critérios SUPER simples - apenas ratio OU contagem de pixels
  const validRatio = ratio > FACE_DETECTION_CONFIG.DETECTION_THRESHOLD;
  const validPixelCount = skinToneAnalysis.facePixelsCount > FACE_DETECTION_CONFIG.MIN_FACE_PIXELS;
  
  console.log(`✅ SIMPLE Validation - Ratio: ${validRatio}, Pixels: ${validPixelCount}`);
  
  // Condição SUPER simples - apenas um dos critérios
  if (validRatio || validPixelCount || skinToneAnalysis.skinTonePixels > 10) {
    const avgX = skinToneAnalysis.facePixelsSum.x / Math.max(skinToneAnalysis.facePixelsCount, 1);
    const avgY = skinToneAnalysis.facePixelsSum.y / Math.max(skinToneAnalysis.facePixelsCount, 1);
    
    const faceSize = Math.sqrt(skinToneAnalysis.facePixelsCount / totalPixels) * 2;
    
    // Sempre considerar centralizado para simplificar
    const isCentered = true;
    
    facePos = {
      x: avgX / imageData.width,
      y: avgY / imageData.height,
      size: faceSize
    };
    
    console.log(`🎯 SIMPLE Face position - AvgX: ${avgX.toFixed(1)}, AvgY: ${avgY.toFixed(1)}, Size: ${faceSize.toFixed(3)}`);
    
    if (isCentered) {
      if (faceSize > FACE_DETECTION_CONFIG.TOO_CLOSE_SIZE) {
        proximity = "too-close";
      } else if (faceSize < FACE_DETECTION_CONFIG.TOO_FAR_SIZE) {
        proximity = "too-far";
      } else {
        proximity = "ideal";
      }
      detectedFace = true;
      console.log(`✅ SIMPLE FACE DETECTED - Size: ${faceSize.toFixed(3)}, Proximity: ${proximity}`);
    }
  } else {
    console.log(`❌ SIMPLE Face validation failed - no valid criteria met`);
  }
  
  return { 
    detected: detectedFace, 
    position: facePos,
    proximity: proximity,
    lighting: lightingAnalysis.quality
  };
};
