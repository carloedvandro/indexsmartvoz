import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export const loadFaceApiModels = async (): Promise<boolean> => {
  if (modelsLoaded) return true;
  
  try {
    console.log("📦 Carregando modelos face-api.js...");
    
    // Carrega modelos do CDN se não estiverem localmente
    const MODEL_URL = 'https://cdn.jsdelivr.net/npm/face-api.js/models';
    
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    ]);
    
    modelsLoaded = true;
    console.log("✅ Modelos face-api.js carregados com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao carregar modelos face-api.js:", error);
    return false;
  }
};

export const detectFaceWithFaceApi = async (
  video: HTMLVideoElement
): Promise<{
  detected: boolean;
  position: { x: number; y: number; size: number };
  proximity: "ideal" | "too-close" | "too-far" | "not-detected";
  lighting: "good" | "poor" | "too-dark" | "too-bright";
  confidence: number;
}> => {
  try {
    if (!modelsLoaded) {
      await loadFaceApiModels();
    }

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 416,
      scoreThreshold: 0.5
    });

    const detection = await faceapi.detectSingleFace(video, options);
    
    if (!detection) {
      return {
        detected: false,
        position: { x: 0, y: 0, size: 0 },
        proximity: "not-detected",
        lighting: "good",
        confidence: 0
      };
    }

    const box = detection.box;
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    
    // Calcular proximidade baseada no tamanho da face
    const faceArea = box.width * box.height;
    const videoArea = video.videoWidth * video.videoHeight;
    const faceRatio = faceArea / videoArea;
    
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "ideal";
    
    if (faceRatio > 0.4) {
      proximity = "too-close";
    } else if (faceRatio < 0.08) {
      proximity = "too-far";
    }

    // Verificar se o rosto está centrado no oval
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const ovalCenterX = videoWidth / 2;
    const ovalCenterY = videoHeight / 2;
    const ovalWidth = 260;
    const ovalHeight = 340;

    const isInOval = 
      Math.abs(centerX - ovalCenterX) < ovalWidth / 2 &&
      Math.abs(centerY - ovalCenterY) < ovalHeight / 2;

    if (!isInOval && proximity === "ideal") {
      proximity = "too-far"; // Força ajuste de posição
    }

    // Detectar qualidade da iluminação (básico)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = ctx.getImageData(box.x, box.y, box.width, box.height);
      const data = imageData.data;
      
      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        totalBrightness += brightness;
      }
      
      const avgBrightness = totalBrightness / (data.length / 4);
      
      let lighting: "good" | "poor" | "too-dark" | "too-bright" = "good";
      if (avgBrightness < 50) {
        lighting = "too-dark";
      } else if (avgBrightness > 200) {
        lighting = "too-bright";
      } else if (avgBrightness < 80 || avgBrightness > 180) {
        lighting = "poor";
      }

      return {
        detected: true,
        position: { x: centerX, y: centerY, size: Math.max(box.width, box.height) },
        proximity,
        lighting,
        confidence: detection.score
      };
    }

    return {
      detected: true,
      position: { x: centerX, y: centerY, size: Math.max(box.width, box.height) },
      proximity,
      lighting: "good",
      confidence: detection.score
    };

  } catch (error) {
    console.error("❌ Erro na detecção face-api.js:", error);
    return {
      detected: false,
      position: { x: 0, y: 0, size: 0 },
      proximity: "not-detected",
      lighting: "good",
      confidence: 0
    };
  }
};

// Função para síntese de voz
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