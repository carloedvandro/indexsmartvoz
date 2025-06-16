
import { analyzeFace } from "./faceAnalysis";
import { FaceAnalysisResult } from "../types/faceDetectionTypes";

export const detectFaceInFrame = async (video: HTMLVideoElement): Promise<FaceAnalysisResult> => {
  console.log(`🎥 CAPTURANDO FRAME: ${video.videoWidth}x${video.videoHeight}`);
  
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  if (!context) {
    throw new Error("Could not get canvas context");
  }

  // Definir dimensões do canvas
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  console.log(`🖼️ Canvas criado: ${canvas.width}x${canvas.height}`);
  
  // Desenhar o frame do vídeo no canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Obter dados da imagem
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
  console.log(`📊 ImageData obtido: ${imageData.width}x${imageData.height}, ${imageData.data.length} bytes`);
  
  // Analisar o frame
  return await analyzeFace(imageData);
};
