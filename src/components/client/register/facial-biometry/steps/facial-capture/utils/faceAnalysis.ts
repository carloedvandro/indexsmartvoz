
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";
import { FaceAnalysisResult } from "../types/faceDetectionTypes";
import { analyzeLighting } from "./lightingAnalysis";
import { detectSkinTone } from "./skinToneDetection";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  const totalPixels = imageData.data.length / 4;
  
  // Área central onde o rosto deve estar - expandida
  const centerX = imageData.width / 2;
  const centerY = imageData.height / 2;
  const faceRadiusX = Math.min(imageData.width, imageData.height) * FACE_DETECTION_CONFIG.FACE_RADIUS_X_MULTIPLIER;
  const faceRadiusY = Math.min(imageData.width, imageData.height) * FACE_DETECTION_CONFIG.FACE_RADIUS_Y_MULTIPLIER;
  
  // Análise de iluminação
  const lightingAnalysis = analyzeLighting(imageData);
  
  console.log(`🔍 Face detection - Lighting: ${lightingAnalysis.quality}, AvgBrightness: ${lightingAnalysis.averageBrightness.toFixed(1)}`);
  
  let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
  let detectedFace = false;
  let facePos = { x: 0, y: 0, size: 0 };
  
  // Análise de tom de pele apenas se iluminação for boa
  if (lightingAnalysis.quality === "good") {
    const skinToneAnalysis = detectSkinTone(imageData, centerX, centerY, faceRadiusX, faceRadiusY);
    
    const ratio = skinToneAnalysis.skinTonePixels / totalPixels;
    
    console.log(`🔍 Face detection - Ratio: ${ratio.toFixed(6)} Threshold: ${FACE_DETECTION_CONFIG.DETECTION_THRESHOLD} FacePixels: ${skinToneAnalysis.facePixelsCount} Contrast: ${skinToneAnalysis.contrastRatio.toFixed(2)}`);
    
    // Critérios mais permissivos para detecção
    if (
      ratio > FACE_DETECTION_CONFIG.DETECTION_THRESHOLD && 
      skinToneAnalysis.facePixelsCount > FACE_DETECTION_CONFIG.MIN_FACE_PIXELS &&
      skinToneAnalysis.contrastRatio > FACE_DETECTION_CONFIG.MIN_CONTRAST_RATIO && 
      skinToneAnalysis.contrastRatio < FACE_DETECTION_CONFIG.MAX_CONTRAST_RATIO
    ) {
      const avgX = skinToneAnalysis.facePixelsSum.x / skinToneAnalysis.facePixelsCount;
      const avgY = skinToneAnalysis.facePixelsSum.y / skinToneAnalysis.facePixelsCount;
      
      const faceSize = Math.sqrt(skinToneAnalysis.facePixelsCount / totalPixels) * 2;
      
      // Verificar se o rosto está bem centralizado - mais permissivo
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      const isCentered = distanceFromFrameCenter < FACE_DETECTION_CONFIG.MAX_DISTANCE_FROM_CENTER;
      
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      if (isCentered) {
        if (faceSize > FACE_DETECTION_CONFIG.TOO_CLOSE_SIZE) {
          proximity = "too-close";
        } else if (faceSize < FACE_DETECTION_CONFIG.TOO_FAR_SIZE) {
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
        console.log(`✅ Face detected - Size: ${faceSize.toFixed(3)}, Centered: ${isCentered}, Proximity: ${proximity}, Lighting: ${lightingAnalysis.quality}`);
      } else {
        console.log(`❌ Face not centered enough - Distance: ${distanceFromFrameCenter.toFixed(3)}`);
      }
    } else {
      console.log(`❌ Face not detected - Ratio: ${ratio.toFixed(6)}, FacePixelsCount: ${skinToneAnalysis.facePixelsCount}, Contrast: ${skinToneAnalysis.contrastRatio.toFixed(2)}`);
    }
  }
  
  return { 
    detected: detectedFace, 
    position: facePos,
    proximity: proximity,
    lighting: lightingAnalysis.quality
  };
};
