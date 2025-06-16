
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configurações mais rigorosas para garantir captura apenas de rostos reais com boa iluminação
  REQUIRED_CONSECUTIVE_FRAMES: 25, // Aumentado para 25 frames (5 segundos)
  VALIDATION_INTERVAL: 100, // Validação a cada 100ms
  MAX_CAPTURE_TIME: 20000, // Tempo máximo de 20 segundos
  
  // Validação mais rigorosa
  REQUIRED_STABLE_FRAMES: 8, // Aumentado para 8 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.2, // Threshold mais rigoroso
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
