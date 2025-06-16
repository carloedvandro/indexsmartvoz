
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configurações mais tolerantes para evitar interrupções durante captura
  REQUIRED_CONSECUTIVE_FRAMES: 20, // Reduzido para 20 frames (4 segundos)
  VALIDATION_INTERVAL: 150, // Validação mais espaçada - 150ms
  MAX_CAPTURE_TIME: 30000, // Tempo máximo de 30 segundos
  
  // Validação mais permissiva
  REQUIRED_STABLE_FRAMES: 5, // Reduzido para 5 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.3, // Threshold mais permissivo
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
