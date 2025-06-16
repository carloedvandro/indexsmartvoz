
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configurações mais rigorosas para garantir captura apenas de rostos reais
  REQUIRED_CONSECUTIVE_FRAMES: 20, // Aumentado de 10 para 20 frames (2 segundos)
  VALIDATION_INTERVAL: 100, // Validação a cada 100ms
  MAX_CAPTURE_TIME: 15000, // Tempo máximo de 15 segundos
  
  // Validação mais rigorosa
  REQUIRED_STABLE_FRAMES: 5, // Aumentado de 1 para 5 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.3, // Threshold mais rigoroso
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
