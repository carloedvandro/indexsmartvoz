
import { FaceAnalysisResult, LightingAnalysis, SkinToneAnalysis } from "../types/faceDetectionTypes";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  console.log(`🔍 ANALISANDO FACE - Dados: ${imageData.width}x${imageData.height}`);
  
  // Análise básica de pixels para fallback
  const lightingAnalysis = analyzeLighting(imageData);
  const skinToneAnalysis = analyzeSkinTone(imageData);
  
  // Detectar se há rosto baseado em análise de tons de pele
  const faceDetected = skinToneAnalysis.skinTonePixels > 1000;
  
  if (!faceDetected) {
    console.log("❌ Nenhum rosto detectado na análise de fallback");
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected",
      lighting: lightingAnalysis.quality
    };
  }

  // Calcular posição aproximada do rosto
  const centerX = skinToneAnalysis.facePixelsSum.x / skinToneAnalysis.facePixelsCount;
  const centerY = skinToneAnalysis.facePixelsSum.y / skinToneAnalysis.facePixelsCount;
  const faceSize = Math.sqrt(skinToneAnalysis.skinTonePixels);

  // Determinar proximidade baseada no tamanho detectado
  let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "ideal";
  if (faceSize > 150) {
    proximity = "too-close";
  } else if (faceSize < 50) {
    proximity = "too-far";
  }

  console.log(`✅ Rosto detectado na análise de fallback - Posição: (${centerX.toFixed(0)}, ${centerY.toFixed(0)}), Tamanho: ${faceSize.toFixed(0)}`);

  return {
    detected: true,
    position: { x: centerX, y: centerY, size: faceSize },
    proximity,
    lighting: lightingAnalysis.quality
  };
};

const analyzeLighting = (imageData: ImageData): LightingAnalysis => {
  const data = imageData.data;
  let totalBrightness = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    totalBrightness += brightness;
  }
  
  const averageBrightness = totalBrightness / (data.length / 4);
  
  let quality: "good" | "poor" | "too-dark" | "too-bright" = "good";
  if (averageBrightness < 50) {
    quality = "too-dark";
  } else if (averageBrightness > 200) {
    quality = "too-bright";
  } else if (averageBrightness < 80 || averageBrightness > 180) {
    quality = "poor";
  }
  
  return { quality, averageBrightness };
};

const analyzeSkinTone = (imageData: ImageData): SkinToneAnalysis => {
  const data = imageData.data;
  const width = imageData.width;
  let skinTonePixels = 0;
  let facePixelsCount = 0;
  let facePixelsSum = { x: 0, y: 0 };
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Detectar tons de pele básicos
    if (r > 95 && g > 40 && b > 20 && 
        Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
        Math.abs(r - g) > 15 && r > g && r > b) {
      skinTonePixels++;
      
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      
      facePixelsSum.x += x;
      facePixelsSum.y += y;
      facePixelsCount++;
    }
  }
  
  return {
    skinTonePixels,
    facePixelsCount: Math.max(facePixelsCount, 1),
    facePixelsSum,
    contrastRatio: skinTonePixels / (data.length / 4)
  };
};
