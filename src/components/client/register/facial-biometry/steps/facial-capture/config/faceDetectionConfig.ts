
export const FACE_DETECTION_CONFIG = {
  // Threshold mais flexível para reduzir falsos negativos
  DETECTION_THRESHOLD: 0.008, // Reduzido de 0.012
  
  // Área central onde o rosto deve estar - mais permissiva
  FACE_RADIUS_X_MULTIPLIER: 0.35, // Aumentado de 0.3
  FACE_RADIUS_Y_MULTIPLIER: 0.45, // Aumentado de 0.4
  FACE_AREA_MULTIPLIER: 1.2, // Aumentado de 1.0
  
  // Configurações de iluminação mais flexíveis
  MIN_BRIGHTNESS: 60, // Reduzido de 80
  MAX_BRIGHTNESS: 230, // Aumentado de 200
  IDEAL_MIN_BRIGHTNESS: 80, // Reduzido de 100
  IDEAL_MAX_BRIGHTNESS: 200, // Aumentado de 180
  
  // Configurações de tom de pele mais flexíveis
  MIN_FLESH_TONE: {
    r: 50, // Reduzido de 70
    g: 35, // Reduzido de 50
    b: 25  // Reduzido de 35
  },
  MIN_BRIGHTNESS_FLESH: 50, // Reduzido de 70
  MAX_BRIGHTNESS_FLESH: 230, // Aumentado de 200
  MAX_RG_DIFFERENCE: 50, // Aumentado de 35
  MIN_RB_DIFFERENCE: 10, // Reduzido de 15
  
  // Configurações de amostragem
  SAMPLING_STEP: 3, // Aumentado de 2 para melhor performance
  BRIGHTNESS_SAMPLING_STEP: 4, // Aumentado de 3
  
  // Configurações de detecção mais flexíveis
  MIN_FACE_PIXELS: 100, // Reduzido de 200
  MIN_CONTRAST_RATIO: 0.2, // Reduzido de 0.4
  MAX_CONTRAST_RATIO: 8, // Aumentado de 6
  
  // Configurações de centralização mais flexíveis
  MAX_DISTANCE_FROM_CENTER: 0.5, // Aumentado de 0.35
  
  // Configurações de proximidade
  TOO_CLOSE_SIZE: 0.7, // Aumentado de 0.65
  TOO_FAR_SIZE: 0.08, // Reduzido de 0.12
  
  // Configurações de detecção consecutiva
  CONSECUTIVE_DETECTIONS_NEEDED: 3, // Reduzido de 5
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 5, // Aumentado de 3
  
  // Intervalo de detecção
  DETECTION_INTERVAL: 150, // Aumentado de 120
  
  // Critérios para características faciais mais flexíveis
  MIN_FACE_FEATURES: 1, // Reduzido de 2
  MIN_FACE_SYMMETRY: 0.3, // Reduzido de 0.6
  MIN_FACE_ASPECT_RATIO: 1.0, // Reduzido de 1.1
  MAX_FACE_ASPECT_RATIO: 2.0, // Aumentado de 1.8
  MIN_SKIN_CONSISTENCY: 0.3, // Reduzido de 0.5
  MAX_COLOR_VARIATION: 0.5 // Aumentado de 0.3
} as const;
