
export const FACE_DETECTION_CONFIG = {
  // Threshold mais baixo para facilitar a detecção
  DETECTION_THRESHOLD: 0.008,
  
  // Área central onde o rosto deve estar - expandida
  FACE_RADIUS_X_MULTIPLIER: 0.35,
  FACE_RADIUS_Y_MULTIPLIER: 0.45,
  FACE_AREA_MULTIPLIER: 1.2,
  
  // Configurações de iluminação
  MIN_BRIGHTNESS: 70,
  MAX_BRIGHTNESS: 220,
  IDEAL_MIN_BRIGHTNESS: 100,
  IDEAL_MAX_BRIGHTNESS: 200,
  
  // Configurações de tom de pele
  MIN_FLESH_TONE: {
    r: 60,
    g: 45,
    b: 30
  },
  MIN_BRIGHTNESS_FLESH: 60,
  MAX_BRIGHTNESS_FLESH: 220,
  MAX_RG_DIFFERENCE: 50,
  MIN_RB_DIFFERENCE: 8,
  
  // Configurações de amostragem
  SAMPLING_STEP: 3,
  BRIGHTNESS_SAMPLING_STEP: 4,
  
  // Configurações de detecção
  MIN_FACE_PIXELS: 150,
  MIN_CONTRAST_RATIO: 0.3,
  MAX_CONTRAST_RATIO: 8,
  
  // Configurações de centralização
  MAX_DISTANCE_FROM_CENTER: 0.5,
  
  // Configurações de proximidade
  TOO_CLOSE_SIZE: 0.7,
  TOO_FAR_SIZE: 0.1,
  
  // Configurações de detecção consecutiva
  CONSECUTIVE_DETECTIONS_NEEDED: 3,
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 5,
  
  // Intervalo de detecção
  DETECTION_INTERVAL: 150
} as const;
