
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configurações muito simples para garantir funcionamento
  REQUIRED_CONSECUTIVE_FRAMES: 10, // Apenas 10 frames (1 segundo)
  VALIDATION_INTERVAL: 100, // Validação a cada 100ms
  MAX_CAPTURE_TIME: 10000, // Tempo máximo de 10 segundos
  
  // Validação muito permissiva
  REQUIRED_STABLE_FRAMES: 1, // Apenas 1 frame estável
  FACE_STABILITY_THRESHOLD: 0.5, // Threshold muito permissivo
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
