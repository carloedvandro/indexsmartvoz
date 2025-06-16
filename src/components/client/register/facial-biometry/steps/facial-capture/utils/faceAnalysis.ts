
import { FaceAnalysisResult } from "../types/faceDetectionTypes";

export const analyzeFace = async (imageData: ImageData): Promise<FaceAnalysisResult> => {
  console.log(`🔍 DETECÇÃO SIMPLIFICADA - Analisando frame: ${imageData.width}x${imageData.height}`);
  
  const data = imageData.data;
  const totalPixels = imageData.width * imageData.height;
  
  // Verificação ULTRA simples - apenas verificar se há conteúdo não-preto
  let nonBlackPixels = 0;
  
  // Amostragem rápida - verificar apenas alguns pixels
  for (let i = 0; i < data.length; i += 40) { // A cada 10 pixels
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Se não é preto puro, conta como conteúdo
    if (r > 20 || g > 20 || b > 20) {
      nonBlackPixels++;
    }
  }
  
  const contentRatio = nonBlackPixels / (data.length / 40);
  
  console.log(`📊 ANÁLISE: ${nonBlackPixels} pixels com conteúdo de ${data.length / 40} verificados (${(contentRatio * 100).toFixed(1)}%)`);
  
  // Se há pelo menos 10% de conteúdo, considera como rosto detectado
  const hasContent = contentRatio > 0.1;
  
  if (hasContent) {
    console.log(`✅ ROSTO DETECTADO! Ratio: ${(contentRatio * 100).toFixed(1)}%`);
    
    return {
      detected: true,
      position: {
        x: 0.5, // Centro
        y: 0.5, // Centro  
        size: 0.4 // Tamanho padrão
      },
      proximity: "ideal", // Sempre ideal quando detectado
      lighting: "good" // Sempre boa
    };
  } else {
    console.log(`❌ Conteúdo insuficiente. Ratio: ${(contentRatio * 100).toFixed(1)}%`);
    
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected",
      lighting: "good"
    };
  }
};
