
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

let faceDetection: FaceDetection | null = null;
let camera: Camera | null = null;
let isProcessing = false;

export const initializeMediaPipe = async (): Promise<boolean> => {
  try {
    console.log("📦 Inicializando MediaPipe Face Detection...");
    
    // Limpar instância anterior se existir
    if (faceDetection) {
      console.log("🧹 Limpando instância anterior do MediaPipe...");
      await cleanupMediaPipe();
    }
    
    faceDetection = new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      }
    });

    faceDetection.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5,
    });

    console.log("✅ MediaPipe Face Detection inicializado com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar MediaPipe:", error);
    return false;
  }
};

export const detectFaceWithMediaPipe = async (
  video: HTMLVideoElement
): Promise<{
  detected: boolean;
  position: { x: number; y: number; size: number };
  proximity: "ideal" | "too-close" | "too-far" | "not-detected";
  lighting: "good" | "poor" | "too-dark" | "too-bright";
  confidence: number;
}> => {
  try {
    // Verificar se já está processando para evitar sobrecarga
    if (isProcessing) {
      console.log("⚠️ MediaPipe já está processando, pulando frame");
      return {
        detected: false,
        position: { x: 0, y: 0, size: 0 },
        proximity: "not-detected",
        lighting: "good",
        confidence: 0
      };
    }

    if (!faceDetection) {
      const initialized = await initializeMediaPipe();
      if (!initialized) {
        throw new Error("MediaPipe não pôde ser inicializado");
      }
    }

    isProcessing = true;

    return new Promise((resolve) => {
      if (!faceDetection) {
        isProcessing = false;
        resolve({
          detected: false,
          position: { x: 0, y: 0, size: 0 },
          proximity: "not-detected",
          lighting: "good",
          confidence: 0
        });
        return;
      }

      // Timeout para evitar travamento
      const timeout = setTimeout(() => {
        console.warn("⏰ MediaPipe timeout - liberando processamento");
        isProcessing = false;
        resolve({
          detected: false,
          position: { x: 0, y: 0, size: 0 },
          proximity: "not-detected",
          lighting: "good",
          confidence: 0
        });
      }, 3000);

      faceDetection.onResults((results) => {
        clearTimeout(timeout);
        isProcessing = false;

        if (!results.detections || results.detections.length === 0) {
          resolve({
            detected: false,
            position: { x: 0, y: 0, size: 0 },
            proximity: "not-detected",
            lighting: "good",
            confidence: 0
          });
          return;
        }

        const detection = results.detections[0];
        const box = detection.boundingBox;
        
        if (!box) {
          resolve({
            detected: false,
            position: { x: 0, y: 0, size: 0 },
            proximity: "not-detected",
            lighting: "good",
            confidence: 0
          });
          return;
        }

        // Converter coordenadas normalizadas para pixels
        const centerX = (box.xCenter || 0) * video.videoWidth;
        const centerY = (box.yCenter || 0) * video.videoHeight;
        const width = (box.width || 0) * video.videoWidth;
        const height = (box.height || 0) * video.videoHeight;
        
        const faceArea = width * height;
        const videoArea = video.videoWidth * video.videoHeight;
        const faceRatio = faceArea / videoArea;
        
        let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "ideal";
        
        if (faceRatio > 0.4) {
          proximity = "too-close";
        } else if (faceRatio < 0.08) {
          proximity = "too-far";
        }

        const ovalCenterX = video.videoWidth / 2;
        const ovalCenterY = video.videoHeight / 2;
        const ovalWidth = 260;
        const ovalHeight = 340;

        const isInOval = 
          Math.abs(centerX - ovalCenterX) < ovalWidth / 2 &&
          Math.abs(centerY - ovalCenterY) < ovalHeight / 2;

        if (!isInOval && proximity === "ideal") {
          proximity = "too-far";
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let lighting: "good" | "poor" | "too-dark" | "too-bright" = "good";
        
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          
          const imageData = ctx.getImageData(
            centerX - width/2, 
            centerY - height/2, 
            width, 
            height
          );
          const data = imageData.data;
          
          let totalBrightness = 0;
          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            totalBrightness += brightness;
          }
          
          const avgBrightness = totalBrightness / (data.length / 4);
          
          if (avgBrightness < 50) {
            lighting = "too-dark";
          } else if (avgBrightness > 200) {
            lighting = "too-bright";
          } else if (avgBrightness < 80 || avgBrightness > 180) {
            lighting = "poor";
          }
        }

        const confidence = (detection as any).detectionConfidence || 0.5;

        resolve({
          detected: true,
          position: { x: centerX, y: centerY, size: Math.max(width, height) },
          proximity,
          lighting,
          confidence
        });
      });

      try {
        faceDetection.send({ image: video });
      } catch (error) {
        clearTimeout(timeout);
        isProcessing = false;
        console.error("❌ Erro ao enviar frame para MediaPipe:", error);
        resolve({
          detected: false,
          position: { x: 0, y: 0, size: 0 },
          proximity: "not-detected",
          lighting: "good",
          confidence: 0
        });
      }
    });

  } catch (error) {
    isProcessing = false;
    console.error("❌ Erro na detecção MediaPipe:", error);
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected",
      lighting: "good",
      confidence: 0
    };
  }
};

export const speakInstruction = (text: string) => {
  try {
    const synth = window.speechSynthesis;
    
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 0.8;
    
    synth.speak(utterance);
  } catch (error) {
    console.error("❌ Erro na síntese de voz:", error);
  }
};

// Função de limpeza aprimorada
export const cleanupMediaPipe = async (): Promise<void> => {
  console.log("🧹 INICIANDO limpeza COMPLETA do MediaPipe...");
  
  try {
    // Parar qualquer processamento ativo
    isProcessing = false;
    
    // Parar síntese de voz
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      console.log("🔇 Síntese de voz cancelada");
    }
    
    // Limpar FaceDetection
    if (faceDetection) {
      console.log("🛑 Fechando MediaPipe FaceDetection...");
      try {
        faceDetection.close();
        console.log("✅ MediaPipe FaceDetection fechado");
      } catch (error) {
        console.warn("⚠️ Erro ao fechar FaceDetection:", error);
      }
      faceDetection = null;
    }
    
    // Limpar Camera
    if (camera) {
      console.log("🛑 Parando MediaPipe Camera...");
      try {
        camera.stop();
        console.log("✅ MediaPipe Camera parada");
      } catch (error) {
        console.warn("⚠️ Erro ao parar Camera:", error);
      }
      camera = null;
    }
    
    // Aguardar um pouco para garantir limpeza
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("✅ Limpeza COMPLETA do MediaPipe concluída!");
    
  } catch (error) {
    console.error("❌ Erro durante limpeza do MediaPipe:", error);
  }
};
