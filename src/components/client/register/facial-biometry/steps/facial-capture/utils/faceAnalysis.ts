
import { FACE_DETECTION_CONFIG } from "../config/faceDetectionConfig";
import { FaceAnalysisResult } from "../types/faceDetectionTypes";
import { analyzeLighting } from "./lightingAnalysis";
import { detectAdvancedSkinTone } from "./advancedSkinDetection";
import { detectFaceFeatures } from "./faceFeatureDetection";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  const totalPixels = imageData.data.length / 4;
  
  // Área central onde o rosto deve estar
  const centerX = imageData.width / 2;
  const centerY = imageData.height / 2;
  const faceRadiusX = Math.min(imageData.width, imageData.height) * FACE_DETECTION_CONFIG.FACE_RADIUS_X_MULTIPLIER;
  const faceRadiusY = Math.min(imageData.width, imageData.height) * FACE_DETECTION_CONFIG.FACE_RADIUS_Y_MULTIPLIER;
  
  // Análise de iluminação
  const lightingAnalysis = analyzeLighting(imageData);
  
  console.log(`🔍 Face detection - Image: ${imageData.width}x${imageData.height}, Lighting: ${lightingAnalysis.quality}, AvgBrightness: ${lightingAnalysis.averageBrightness.toFixed(1)}`);
  
  let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
  let detectedFace = false;
  let facePos = { x: 0, y: 0, size: 0 };
  
  // Análise de tom de pele SEMPRE, independente da iluminação
  const skinToneAnalysis = detectAdvancedSkinTone(imageData, centerX, centerY, faceRadiusX, faceRadiusY);
  
  // Detecção de características faciais
  const faceFeatures = detectFaceFeatures(imageData, centerX, centerY, faceRadiusX, faceRadiusY);
  
  const ratio = skinToneAnalysis.skinTonePixels / totalPixels;
  
  // Contar características faciais detectadas
  const featuresCount = [faceFeatures.hasEyes, faceFeatures.hasNose, faceFeatures.hasMouth].filter(Boolean).length;
  
  console.log(`🔍 Face analysis - Ratio: ${ratio.toFixed(6)} (threshold: ${FACE_DETECTION_CONFIG.DETECTION_THRESHOLD})`);
  console.log(`🔍 Features: ${featuresCount}/3 (Eyes: ${faceFeatures.hasEyes}, Nose: ${faceFeatures.hasNose}, Mouth: ${faceFeatures.hasMouth})`);
  console.log(`🔍 SkinPixels: ${skinToneAnalysis.skinTonePixels}, MinPixels: ${FACE_DETECTION_CONFIG.MIN_FACE_PIXELS}`);
  console.log(`🔍 Contrast: ${skinToneAnalysis.contrastRatio.toFixed(2)} (range: ${FACE_DETECTION_CONFIG.MIN_CONTRAST_RATIO}-${FACE_DETECTION_CONFIG.MAX_CONTRAST_RATIO})`);
  console.log(`🔍 Symmetry: ${faceFeatures.faceSymmetry.toFixed(2)}, AspectRatio: ${faceFeatures.aspectRatio.toFixed(2)}`);
  console.log(`🔍 SkinConsistency: ${skinToneAnalysis.skinConsistency.toFixed(2)}, ColorVariation: ${skinToneAnalysis.colorVariation.toFixed(2)}`);
  
  // Critérios mais relaxados para detecção
  const validRatio = ratio > FACE_DETECTION_CONFIG.DETECTION_THRESHOLD;
  const validPixelCount = skinToneAnalysis.facePixelsCount > FACE_DETECTION_CONFIG.MIN_FACE_PIXELS;
  const validContrast = skinToneAnalysis.contrastRatio > FACE_DETECTION_CONFIG.MIN_CONTRAST_RATIO && 
                       skinToneAnalysis.contrastRatio < FACE_DETECTION_CONFIG.MAX_CONTRAST_RATIO;
  const validFeatures = featuresCount >= FACE_DETECTION_CONFIG.MIN_FACE_FEATURES;
  const validSymmetry = faceFeatures.faceSymmetry > FACE_DETECTION_CONFIG.MIN_FACE_SYMMETRY;
  const validAspectRatio = faceFeatures.aspectRatio >= FACE_DETECTION_CONFIG.MIN_FACE_ASPECT_RATIO && 
                          faceFeatures.aspectRatio <= FACE_DETECTION_CONFIG.MAX_FACE_ASPECT_RATIO;
  const validSkinConsistency = skinToneAnalysis.skinConsistency > FACE_DETECTION_CONFIG.MIN_SKIN_CONSISTENCY;
  const validColorVariation = skinToneAnalysis.colorVariation < FACE_DETECTION_CONFIG.MAX_COLOR_VARIATION;
  
  console.log(`✅ Validation - Ratio: ${validRatio}, Pixels: ${validPixelCount}, Contrast: ${validContrast}, Features: ${validFeatures}`);
  console.log(`✅ Validation - Symmetry: ${validSymmetry}, Aspect: ${validAspectRatio}, Skin: ${validSkinConsistency}, Variation: ${validColorVariation}`);
  
  // Condições mais relaxadas - apenas precisa de ratio e pixels válidos OU algumas características
  if (
    (validRatio && validPixelCount) || 
    (validFeatures && validPixelCount) ||
    (skinToneAnalysis.skinTonePixels > 50 && featuresCount >= 1) // Condição super relaxada
  ) {
    const avgX = skinToneAnalysis.facePixelsSum.x / Math.max(skinToneAnalysis.facePixelsCount, 1);
    const avgY = skinToneAnalysis.facePixelsSum.y / Math.max(skinToneAnalysis.facePixelsCount, 1);
    
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
    
    console.log(`🎯 Face position - AvgX: ${avgX.toFixed(1)}, AvgY: ${avgY.toFixed(1)}, Size: ${faceSize.toFixed(3)}`);
    console.log(`🎯 Distance from center: ${distanceFromFrameCenter.toFixed(3)} (max: ${FACE_DETECTION_CONFIG.MAX_DISTANCE_FROM_CENTER}), Centered: ${isCentered}`);
    
    if (isCentered) {
      if (faceSize > FACE_DETECTION_CONFIG.TOO_CLOSE_SIZE) {
        proximity = "too-close";
      } else if (faceSize < FACE_DETECTION_CONFIG.TOO_FAR_SIZE) {
        proximity = "too-far";
      } else {
        proximity = "ideal";
      }
      detectedFace = true;
      console.log(`✅ FACE DETECTED - Size: ${faceSize.toFixed(3)}, Features: ${featuresCount}/3, Proximity: ${proximity}`);
    } else {
      console.log(`❌ Face not centered - Distance: ${distanceFromFrameCenter.toFixed(3)}`);
    }
  } else {
    const failedChecks = [
      !validRatio && 'ratio',
      !validPixelCount && 'pixels',
      !validContrast && 'contrast',
      !validFeatures && 'features',
      !validSymmetry && 'symmetry',
      !validAspectRatio && 'aspect',
      !validSkinConsistency && 'skin',
      !validColorVariation && 'variation'
    ].filter(Boolean);
    
    console.log(`❌ Face validation failed: ${failedChecks.join(', ')}`);
  }
  
  return { 
    detected: detectedFace, 
    position: facePos,
    proximity: proximity,
    lighting: lightingAnalysis.quality
  };
};
