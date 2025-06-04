
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Security settings - MAIS RIGOROSO para captura
  REQUIRED_CONSECUTIVE_FRAMES: 30, // Reduzido para 30 frames (3 segundos) para ser mais responsivo
  VALIDATION_INTERVAL: 50, // Validação a cada 50ms (mais frequente)
  MAX_CAPTURE_TIME: 10000, // Tempo máximo reduzido para 10 segundos
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
