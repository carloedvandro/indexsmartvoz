
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

let faceDetection: FaceDetection | null = null;
let camera: Camera | null = null;

export const initializeMediaPipe = async (): Promise<boolean> => {
  try {
    console.log("📦 Inicializando MediaPipe Face Detection...");
    
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
    if (!faceDetection) {
      const initialized = await initializeMediaPipe();
      if (!initialized) {
        throw new Error("MediaPipe não pôde ser inicializado");
      }
    }

    return new Promise((resolve) => {
      if (!faceDetection) {
        resolve({
          detected: false,
          position: { x: 0, y: 0, size: 0 },
          proximity: "not-detected",
          lighting: "good",
          confidence: 0
        });
        return;
      }

      faceDetection.onResults((results) => {
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
        
        // Calcular proximidade baseada no tamanho da face
        const faceArea = width * height;
        const videoArea = video.videoWidth * video.videoHeight;
        const faceRatio = faceArea / videoArea;
        
        let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "ideal";
        
        if (faceRatio > 0.4) {
          proximity = "too-close";
        } else if (faceRatio < 0.08) {
          proximity = "too-far";
        }

        // Verificar se o rosto está centrado no oval
        const ovalCenterX = video.videoWidth / 2;
        const ovalCenterY = video.videoHeight / 2;
        const ovalWidth = 260;
        const ovalHeight = 340;

        const isInOval = 
          Math.abs(centerX - ovalCenterX) < ovalWidth / 2 &&
          Math.abs(centerY - ovalCenterY) < ovalHeight / 2;

        if (!isInOval && proximity === "ideal") {
          proximity = "too-far"; // Força ajuste de posição
        }

        // Detectar qualidade da iluminação
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

        resolve({
          detected: true,
          position: { x: centerX, y: centerY, size: Math.max(width, height) },
          proximity,
          lighting,
          confidence: detection.score?.[0] || 0
        });
      });

      // Processar o frame do vídeo
      faceDetection.send({ image: video });
    });

  } catch (error) {
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

// Função para síntese de voz (mantida)
export const speakInstruction = (text: string) => {
  try {
    const synth = window.speechSynthesis;
    
    // Cancelar qualquer fala anterior
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

// Cleanup function
export const cleanupMediaPipe = () => {
  if (faceDetection) {
    faceDetection.close();
    faceDetection = null;
  }
  if (camera) {
    camera.stop();
    camera = null;
  }
};
