
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Configurações mais simples e diretas
  REQUIRED_CONSECUTIVE_FRAMES: 20, // Reduzido para 20 frames (2 segundos)
  VALIDATION_INTERVAL: 100, // Validação a cada 100ms
  MAX_CAPTURE_TIME: 15000, // Tempo máximo de 15 segundos
  
  // Validação de estabilidade simplificada
  REQUIRED_STABLE_FRAMES: 3, // Apenas 3 frames estáveis
  FACE_STABILITY_THRESHOLD: 0.1, // Threshold mais permissivo
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
