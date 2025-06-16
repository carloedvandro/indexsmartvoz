
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configuração mais rápida para captura
  REQUIRED_CONSECUTIVE_FRAMES: 15, // Reduzido para 15 frames (3 segundos)
  VALIDATION_INTERVAL: 200, // Validação a cada 200ms
  MAX_CAPTURE_TIME: 30000, // Tempo máximo de 30 segundos
  
  // Validação menos rigorosa
  REQUIRED_STABLE_FRAMES: 3, // Apenas 3 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.3, // Threshold mais flexível
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
