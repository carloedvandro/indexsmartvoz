
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Security settings - Balanceado entre segurança e usabilidade
  REQUIRED_CONSECUTIVE_FRAMES: 30, // Reduzido para 30 frames (3 segundos) para captura mais rápida
  VALIDATION_INTERVAL: 150, // Validação a cada 150ms (mais estável)
  MAX_CAPTURE_TIME: 20000, // Tempo máximo de 20 segundos
  
  // Validação de estabilidade - Mais permissiva
  REQUIRED_STABLE_FRAMES: 5, // Reduzido para 5 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.08, // Threshold mais permissivo
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
