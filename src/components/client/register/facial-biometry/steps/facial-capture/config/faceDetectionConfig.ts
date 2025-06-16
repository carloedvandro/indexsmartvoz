
export const FACE_DETECTION_CONFIG = {
  // Threshold MUITO mais flexível para permitir mais detecções
  DETECTION_THRESHOLD: 0.003, // Reduzido drasticamente de 0.008
  
  // Área central onde o rosto deve estar - ainda mais permissiva
  FACE_RADIUS_X_MULTIPLIER: 0.4, // Aumentado de 0.35
  FACE_RADIUS_Y_MULTIPLIER: 0.5, // Aumentado de 0.45
  FACE_AREA_MULTIPLIER: 1.3, // Aumentado de 1.2
  
  // Configurações de iluminação ainda mais flexíveis
  MIN_BRIGHTNESS: 40, // Reduzido de 60
  MAX_BRIGHTNESS: 250, // Aumentado de 230
  IDEAL_MIN_BRIGHTNESS: 60, // Reduzido de 80
  IDEAL_MAX_BRIGHTNESS: 220, // Aumentado de 200
  
  // Configurações de tom de pele MUITO mais flexíveis
  MIN_FLESH_TONE: {
    r: 30, // Reduzido de 50
    g: 20, // Reduzido de 35
    b: 15  // Reduzido de 25
  },
  MIN_BRIGHTNESS_FLESH: 30, // Reduzido de 50
  MAX_BRIGHTNESS_FLESH: 250, // Aumentado de 230
  MAX_RG_DIFFERENCE: 70, // Aumentado de 50
  MIN_RB_DIFFERENCE: 5, // Reduzido de 10
  
  // Configurações de amostragem
  SAMPLING_STEP: 4, // Aumentado de 3 para melhor performance
  BRIGHTNESS_SAMPLING_STEP: 5, // Aumentado de 4
  
  // Configurações de detecção MUITO mais flexíveis
  MIN_FACE_PIXELS: 50, // Reduzido de 100
  MIN_CONTRAST_RATIO: 0.1, // Reduzido de 0.2
  MAX_CONTRAST_RATIO: 10, // Aumentado de 8
  
  // Configurações de centralização mais flexíveis
  MAX_DISTANCE_FROM_CENTER: 0.6, // Aumentado de 0.5
  
  // Configurações de proximidade
  TOO_CLOSE_SIZE: 0.8, // Aumentado de 0.7
  TOO_FAR_SIZE: 0.05, // Reduzido de 0.08
  
  // Configurações de detecção consecutiva
  CONSECUTIVE_DETECTIONS_NEEDED: 2, // Reduzido de 3
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 6, // Aumentado de 5
  
  // Intervalo de detecção
  DETECTION_INTERVAL: 100, // Reduzido de 150 para mais responsividade
  
  // Critérios para características faciais MUITO mais flexíveis
  MIN_FACE_FEATURES: 0, // Reduzido de 1 - não exige características específicas
  MIN_FACE_SYMMETRY: 0.1, // Reduzido drasticamente de 0.3
  MIN_FACE_ASPECT_RATIO: 0.8, // Reduzido de 1.0
  MAX_FACE_ASPECT_RATIO: 2.5, // Aumentado de 2.0
  MIN_SKIN_CONSISTENCY: 0.1, // Reduzido drasticamente de 0.3
  MAX_COLOR_VARIATION: 0.8 // Aumentado de 0.5
} as const;
