
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

let faceDetection: FaceDetection | null = null;
let camera: Camera | null = null;
let isInitialized = false;

// Função para falar instruçoes
export const speakInstruction = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
};

// Inicializar MediaPipe
export const initializeMediaPipe = async (): Promise<boolean> => {
  try {
    if (isInitialized && faceDetection) {
      return true;
    }

    console.log("🟢 Inicializando MediaPipe Face Detection...");
    
    faceDetection = new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      }
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    await faceDetection.initialize();
    
    isInitialized = true;
    console.log("✅ MediaPipe inicializado com sucesso");
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar MediaPipe:", error);
    return false;
  }
};

// Função principal de detecção com MediaPipe
export const detectFaceWithMediaPipe = async (video: HTMLVideoElement) => {
  try {
    if (!faceDetection || !isInitialized) {
      console.log("⚠️ MediaPipe não inicializado");
      return {
        detected: false,
        position: { x: 0, y: 0, size: 0 },
        proximity: "not-detected" as const,
        lighting: "good" as const,
        confidence: 0
      };
    }

    // Criar canvas para capturar frame do vídeo
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error("Não foi possível criar contexto do canvas");
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      faceDetection!.onResults((results) => {
        if (results.detections && results.detections.length > 0) {
          const detection = results.detections[0];
          const bbox = detection.boundingBox;
          
          // Calcular posição e tamanho
          const centerX = bbox.xCenter * canvas.width;
          const centerY = bbox.yCenter * canvas.height;
          const width = bbox.width * canvas.width;
          const height = bbox.height * canvas.height;
          const size = Math.max(width, height);

          // Determinar proximidade baseada no tamanho
          let proximity: "ideal" | "too-close" | "too-far" | "not-detected";
          if (size < 150) {
            proximity = "too-far";
          } else if (size > 300) {
            proximity = "too-close";
          } else {
            proximity = "ideal";
          }

          // Análise básica de iluminação
          const lighting = analyzeLighting(ctx, bbox, canvas.width, canvas.height);

          console.log(`🎯 MediaPipe detectou rosto: posição (${centerX.toFixed(0)}, ${centerY.toFixed(0)}), tamanho: ${size.toFixed(0)}, proximidade: ${proximity}`);

          resolve({
            detected: true,
            position: { x: centerX, y: centerY, size },
            proximity,
            lighting,
            confidence: 0.8 // MediaPipe não fornece score direto, usar valor fixo
          });
        } else {
          console.log("👤 Nenhum rosto detectado pelo MediaPipe");
          resolve({
            detected: false,
            position: { x: 0, y: 0, size: 0 },
            proximity: "not-detected" as const,
            lighting: "good" as const,
            confidence: 0
          });
        }
      });

      // Processar imagem
      faceDetection!.send({ image: imageData });
    });
  } catch (error) {
    console.error("❌ Erro na detecção MediaPipe:", error);
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected" as const,
      lighting: "good" as const,
      confidence: 0
    };
  }
};

// Análise de iluminação
const analyzeLighting = (
  ctx: CanvasRenderingContext2D,
  bbox: any,
  canvasWidth: number,
  canvasHeight: number
): "good" | "poor" | "too-dark" | "too-bright" => {
  try {
    // Área da face
    const x = Math.max(0, (bbox.xCenter - bbox.width/2) * canvasWidth);
    const y = Math.max(0, (bbox.yCenter - bbox.height/2) * canvasHeight);
    const width = Math.min(canvasWidth - x, bbox.width * canvasWidth);
    const height = Math.min(canvasHeight - y, bbox.height * canvasHeight);

    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    
    let totalBrightness = 0;
    let pixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      totalBrightness += brightness;
      pixelCount++;
    }

    const averageBrightness = totalBrightness / pixelCount;

    if (averageBrightness < 50) return "too-dark";
    if (averageBrightness > 200) return "too-bright";
    if (averageBrightness < 80 || averageBrightness > 180) return "poor";
    return "good";
  } catch (error) {
    console.error("Erro na análise de iluminação:", error);
    return "good";
  }
};

// Cleanup
export const cleanupMediaPipe = () => {
  try {
    if (camera) {
      camera.stop();
      camera = null;
    }
    if (faceDetection) {
      faceDetection.close();
      faceDetection = null;
    }
    isInitialized = false;
    console.log("🛑 MediaPipe limpo");
  } catch (error) {
    console.error("Erro ao limpar MediaPipe:", error);
  }
};
