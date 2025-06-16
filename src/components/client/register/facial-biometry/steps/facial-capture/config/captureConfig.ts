
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configurações rigorosas para garantir captura precisa
  REQUIRED_CONSECUTIVE_FRAMES: 30, // Aumentado para 30 frames (6 segundos)
  VALIDATION_INTERVAL: 200, // Validação a cada 200ms
  MAX_CAPTURE_TIME: 45000, // Tempo máximo de 45 segundos
  
  // Validação rigorosa para estabilidade
  REQUIRED_STABLE_FRAMES: 8, // Aumentado para 8 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.2, // Threshold mais rigoroso
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
