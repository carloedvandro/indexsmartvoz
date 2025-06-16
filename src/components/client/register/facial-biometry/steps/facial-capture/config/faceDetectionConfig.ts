
export const FACE_DETECTION_CONFIG = {
  // Threshold EXTREMAMENTE flexível
  DETECTION_THRESHOLD: 0.001, // Muito baixo para detectar qualquer presença
  
  // Área central muito permissiva
  FACE_RADIUS_X_MULTIPLIER: 0.5,
  FACE_RADIUS_Y_MULTIPLIER: 0.6,
  FACE_AREA_MULTIPLIER: 1.5,
  
  // Iluminação super flexível
  MIN_BRIGHTNESS: 20,
  MAX_BRIGHTNESS: 255,
  IDEAL_MIN_BRIGHTNESS: 30,
  IDEAL_MAX_BRIGHTNESS: 240,
  
  // Tom de pele super flexível
  MIN_FLESH_TONE: {
    r: 10,
    g: 10,
    b: 10
  },
  MIN_BRIGHTNESS_FLESH: 20,
  MAX_BRIGHTNESS_FLESH: 255,
  MAX_RG_DIFFERENCE: 100,
  MIN_RB_DIFFERENCE: 0,
  
  // Amostragem mais espaçada para performance
  SAMPLING_STEP: 5,
  BRIGHTNESS_SAMPLING_STEP: 6,
  
  // Critérios mínimos
  MIN_FACE_PIXELS: 20,
  MIN_CONTRAST_RATIO: 0.05,
  MAX_CONTRAST_RATIO: 20,
  
  // Centralização muito flexível
  MAX_DISTANCE_FROM_CENTER: 0.8,
  
  // Proximidade muito flexível
  TOO_CLOSE_SIZE: 0.9,
  TOO_FAR_SIZE: 0.02,
  
  // Detecções consecutivas reduzidas
  CONSECUTIVE_DETECTIONS_NEEDED: 1,
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 8,
  
  // Intervalo mais rápido
  DETECTION_INTERVAL: 80,
  
  // Características faciais super flexíveis
  MIN_FACE_FEATURES: 0,
  MIN_FACE_SYMMETRY: 0.05,
  MIN_FACE_ASPECT_RATIO: 0.5,
  MAX_FACE_ASPECT_RATIO: 3.0,
  MIN_SKIN_CONSISTENCY: 0.05,
  MAX_COLOR_VARIATION: 1.0
} as const;
