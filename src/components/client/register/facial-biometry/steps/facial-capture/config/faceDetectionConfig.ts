
export const FACE_DETECTION_CONFIG = {
  // Configuração ULTRA simples para garantir detecção
  DETECTION_THRESHOLD: 0.0001, // Praticamente zero
  
  // Intervalos rápidos
  DETECTION_INTERVAL: 150,
  
  // Detecções necessárias reduzidas ao mínimo
  CONSECUTIVE_DETECTIONS_NEEDED: 1, // Apenas 1 detecção
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 3, // 3 frames para perder
  
  // Valores flexíveis
  FACE_RADIUS_X_MULTIPLIER: 0.4,
  FACE_RADIUS_Y_MULTIPLIER: 0.5,
  FACE_AREA_MULTIPLIER: 1.2,
  
  // Iluminação sempre aceita
  MIN_BRIGHTNESS: 5,
  MAX_BRIGHTNESS: 255,
  IDEAL_MIN_BRIGHTNESS: 10,
  IDEAL_MAX_BRIGHTNESS: 250,
  
  // Tom de pele ultra flexível
  MIN_FLESH_TONE: {
    r: 10,
    g: 10,
    b: 10
  },
  MIN_BRIGHTNESS_FLESH: 15,
  MAX_BRIGHTNESS_FLESH: 255,
  MAX_RG_DIFFERENCE: 200,
  MIN_RB_DIFFERENCE: 0,
  
  // Amostragem simples
  SAMPLING_STEP: 10,
  BRIGHTNESS_SAMPLING_STEP: 15,
  
  // Critérios mínimos
  MIN_FACE_PIXELS: 1,
  MIN_CONTRAST_RATIO: 0.01,
  MAX_CONTRAST_RATIO: 100,
  
  // Centralização muito flexível
  MAX_DISTANCE_FROM_CENTER: 1.0,
  
  // Proximidade ultra flexível
  TOO_CLOSE_SIZE: 0.98,
  TOO_FAR_SIZE: 0.01,
  
  // Características faciais flexíveis
  MIN_FACE_FEATURES: 0,
  MIN_FACE_SYMMETRY: 0.01,
  MIN_FACE_ASPECT_RATIO: 0.2,
  MAX_FACE_ASPECT_RATIO: 5.0,
  MIN_SKIN_CONSISTENCY: 0.01,
  MAX_COLOR_VARIATION: 5.0
} as const;
