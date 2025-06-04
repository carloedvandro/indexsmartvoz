
// Configuration constants for facial capture
export const CAPTURE_CONFIG = {
  // Security settings - MORE RIGOROUS for capture
  REQUIRED_CONSECUTIVE_FRAMES: 50, // Increased to 50 frames (5 seconds)
  VALIDATION_INTERVAL: 100, // Validation every 100ms
  MAX_CAPTURE_TIME: 15000, // Maximum timeout of 15 seconds
  
  // Progress calculation
  get PROGRESS_INCREMENT() {
    return 100 / this.REQUIRED_CONSECUTIVE_FRAMES;
  }
} as const;
