
export const FACE_DETECTION_CONFIG = {
  // Threshold mais rigoroso para reduzir falsos positivos
  DETECTION_THRESHOLD: 0.012, // Aumentado de 0.008
  
  // Área central onde o rosto deve estar - mais restritiva
  FACE_RADIUS_X_MULTIPLIER: 0.3, // Reduzido de 0.35
  FACE_RADIUS_Y_MULTIPLIER: 0.4, // Reduzido de 0.45
  FACE_AREA_MULTIPLIER: 1.0, // Reduzido de 1.2
  
  // Configurações de iluminação
  MIN_BRIGHTNESS: 80, // Aumentado de 70
  MAX_BRIGHTNESS: 200, // Reduzido de 220
  IDEAL_MIN_BRIGHTNESS: 100,
  IDEAL_MAX_BRIGHTNESS: 180, // Reduzido de 200
  
  // Configurações de tom de pele mais rigorosas
  MIN_FLESH_TONE: {
    r: 70, // Aumentado de 60
    g: 50, // Aumentado de 45
    b: 35  // Aumentado de 30
  },
  MIN_BRIGHTNESS_FLESH: 70, // Aumentado de 60
  MAX_BRIGHTNESS_FLESH: 200, // Reduzido de 220
  MAX_RG_DIFFERENCE: 35, // Reduzido de 50
  MIN_RB_DIFFERENCE: 15, // Aumentado de 8
  
  // Configurações de amostragem
  SAMPLING_STEP: 2, // Reduzido de 3 para mais precisão
  BRIGHTNESS_SAMPLING_STEP: 3, // Reduzido de 4
  
  // Configurações de detecção mais rigorosas
  MIN_FACE_PIXELS: 200, // Aumentado de 150
  MIN_CONTRAST_RATIO: 0.4, // Aumentado de 0.3
  MAX_CONTRAST_RATIO: 6, // Reduzido de 8
  
  // Configurações de centralização mais rigorosas
  MAX_DISTANCE_FROM_CENTER: 0.35, // Reduzido de 0.5
  
  // Configurações de proximidade
  TOO_CLOSE_SIZE: 0.65, // Reduzido de 0.7
  TOO_FAR_SIZE: 0.12, // Aumentado de 0.1
  
  // Configurações de detecção consecutiva
  CONSECUTIVE_DETECTIONS_NEEDED: 5, // Aumentado de 3
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 3, // Reduzido de 5
  
  // Intervalo de detecção
  DETECTION_INTERVAL: 120, // Reduzido de 150 para mais responsividade
  
  // Novos critérios para características faciais
  MIN_FACE_FEATURES: 2, // Mínimo de características detectadas (olhos, nariz, boca)
  MIN_FACE_SYMMETRY: 0.6, // Mínimo de simetria facial
  MIN_FACE_ASPECT_RATIO: 1.1, // Proporção mínima altura/largura
  MAX_FACE_ASPECT_RATIO: 1.8, // Proporção máxima altura/largura
  MIN_SKIN_CONSISTENCY: 0.5, // Consistência mínima do tom de pele
  MAX_COLOR_VARIATION: 0.3 // Variação máxima de cor permitida
} as const;
