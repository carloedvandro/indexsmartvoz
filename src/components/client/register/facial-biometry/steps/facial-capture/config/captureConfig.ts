
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Security settings - MUITO MAIS RIGOROSO para segurança
  REQUIRED_CONSECUTIVE_FRAMES: 60, // Aumentado para 60 frames (6 segundos) para captura mais segura
  VALIDATION_INTERVAL: 100, // Validação a cada 100ms (mais estável)
  MAX_CAPTURE_TIME: 15000, // Tempo máximo de 15 segundos
  
  // Validação de estabilidade
  REQUIRED_STABLE_FRAMES: 10, // Frames estáveis antes de começar a contar
  FACE_STABILITY_THRESHOLD: 0.05, // Threshold para considerar rosto estável
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
