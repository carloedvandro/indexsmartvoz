
import { FaceAnalysisResult } from "../types/faceDetectionTypes";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  console.log(`🔍 ANÁLISE FACIAL APRIMORADA - Frame: ${imageData.width}x${imageData.height}`);
  
  const data = imageData.data;
  
  // Análise mais rigorosa - verificar características faciais reais
  const centerX = Math.floor(imageData.width / 2);
  const centerY = Math.floor(imageData.height / 2);
  
  // Analisar múltiplas regiões para detectar características faciais
  const faceRegions = [
    { x: centerX - 60, y: centerY - 80, w: 120, h: 40, name: "testa" }, // Região da testa
    { x: centerX - 40, y: centerY - 40, w: 20, h: 20, name: "olho_esquerdo" }, // Olho esquerdo
    { x: centerX + 20, y: centerY - 40, w: 20, h: 20, name: "olho_direito" }, // Olho direito
    { x: centerX - 15, y: centerY - 10, w: 30, h: 30, name: "nariz" }, // Região do nariz
    { x: centerX - 30, y: centerY + 20, w: 60, h: 25, name: "boca" } // Região da boca
  ];
  
  let validRegions = 0;
  let skinTonePixels = 0;
  let totalAnalyzedPixels = 0;
  let brightnessSum = 0;
  
  // Analisar cada região facial
  for (const region of faceRegions) {
    let regionSkinPixels = 0;
    let regionPixels = 0;
    let regionBrightness = 0;
    
    for (let y = Math.max(0, region.y); y < Math.min(imageData.height, region.y + region.h); y += 2) {
      for (let x = Math.max(0, region.x); x < Math.min(imageData.width, region.x + region.w); x += 2) {
        const index = (y * imageData.width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        
        const brightness = (r + g + b) / 3;
        brightnessSum += brightness;
        totalAnalyzedPixels++;
        regionPixels++;
        regionBrightness += brightness;
        
        // Detectar tom de pele humano com critérios mais rigorosos
        const isHumanSkinTone = 
          r > 60 && g > 40 && b > 30 && // Valores mínimos para tom de pele
          r >= g && g >= b && // Padrão típico de tom de pele
          r - b >= 15 && // Diferença suficiente entre vermelho e azul
          r - g <= 60 && // Não muito vermelho
          brightness >= 80 && brightness <= 220 && // Faixa de brilho adequada
          Math.abs(r - g) <= 40; // Consistência entre vermelho e verde
        
        if (isHumanSkinTone) {
          regionSkinPixels++;
          skinTonePixels++;
        }
      }
    }
    
    // Uma região é válida se tem pelo menos 30% de pixels com tom de pele
    const regionSkinRatio = regionPixels > 0 ? regionSkinPixels / regionPixels : 0;
    const regionAvgBrightness = regionPixels > 0 ? regionBrightness / regionPixels : 0;
    
    if (regionSkinRatio >= 0.25 && regionAvgBrightness >= 70 && regionAvgBrightness <= 200) {
      validRegions++;
      console.log(`✅ Região ${region.name} válida: ${(regionSkinRatio * 100).toFixed(1)}% tom de pele`);
    } else {
      console.log(`❌ Região ${region.name} inválida: ${(regionSkinRatio * 100).toFixed(1)}% tom de pele`);
    }
  }
  
  const averageBrightness = totalAnalyzedPixels > 0 ? brightnessSum / totalAnalyzedPixels : 0;
  const skinRatio = totalAnalyzedPixels > 0 ? skinTonePixels / totalAnalyzedPixels : 0;
  
  console.log(`📊 ANÁLISE COMPLETA - Regiões válidas: ${validRegions}/5, Tom de pele: ${(skinRatio * 100).toFixed(1)}%, Brilho: ${averageBrightness.toFixed(1)}`);
  
  // Critérios rigorosos para detectar rosto humano:
  // - Pelo menos 3 das 5 regiões faciais devem ser válidas
  // - Pelo menos 15% dos pixels devem ter tom de pele humano
  // - Iluminação adequada
  const hasValidFace = 
    validRegions >= 3 && 
    skinRatio >= 0.15 && 
    averageBrightness >= 80 && 
    averageBrightness <= 200;
  
  if (hasValidFace) {
    console.log(`✅ ROSTO HUMANO DETECTADO! Regiões: ${validRegions}/5, Tom de pele: ${(skinRatio * 100).toFixed(1)}%`);
    
    return {
      detected: true,
      position: {
        x: 0.5,
        y: 0.5,
        size: 0.4
      },
      proximity: "ideal",
      lighting: "good"
    };
  } else {
    console.log(`❌ Rosto não detectado ou não humano. Regiões: ${validRegions}/5, Tom de pele: ${(skinRatio * 100).toFixed(1)}%`);
    
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected",
      lighting: "good"
    };
  }
};
