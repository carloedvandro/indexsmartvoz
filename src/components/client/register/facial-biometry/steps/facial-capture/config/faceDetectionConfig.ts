
export const FACE_DETECTION_CONFIG = {
  // Configuração mais rigorosa para detectar apenas rostos humanos
  DETECTION_THRESHOLD: 0.5, // Threshold mais alto
  
  // Intervalos de detecção
  DETECTION_INTERVAL: 200, // Intervalo um pouco mais lento para análise mais precisa
  
  // Detecções necessárias
  CONSECUTIVE_DETECTIONS_NEEDED: 3, // Requer 3 detecções consecutivas
  CONSECUTIVE_NO_DETECTIONS_NEEDED: 5, // 5 frames para perder detecção
  
  // Valores para análise facial
  FACE_RADIUS_X_MULTIPLIER: 0.4,
  FACE_RADIUS_Y_MULTIPLIER: 0.5,
  FACE_AREA_MULTIPLIER: 1.2,
  
  // Iluminação adequada para detecção facial humana
  MIN_BRIGHTNESS: 80,
  MAX_BRIGHTNESS: 200,
  IDEAL_MIN_BRIGHTNESS: 100,
  IDEAL_MAX_BRIGHTNESS: 180,
  
  // Critérios rigorosos para tom de pele humano
  MIN_FLESH_TONE: {
    r: 60, // Mínimo mais alto para vermelho
    g: 40, // Mínimo mais alto para verde
    b: 30  // Mínimo mais alto para azul
  },
  MIN_BRIGHTNESS_FLESH: 80,
  MAX_BRIGHTNESS_FLESH: 220,
  MAX_RG_DIFFERENCE: 40, // Diferença máxima entre vermelho e verde
  MIN_RB_DIFFERENCE: 15, // Diferença mínima entre vermelho e azul
  
  // Amostragem mais detalhada
  SAMPLING_STEP: 2, // Amostragem mais densa
  BRIGHTNESS_SAMPLING_STEP: 3,
  
  // Critérios mais rigorosos
  MIN_FACE_PIXELS: 100, // Mínimo de pixels com tom de pele
  MIN_CONTRAST_RATIO: 0.5,
  MAX_CONTRAST_RATIO: 3.0,
  
  // Centralização
  MAX_DISTANCE_FROM_CENTER: 0.3,
  
  // Proximidade
  TOO_CLOSE_SIZE: 0.8,
  TOO_FAR_SIZE: 0.1,
  
  // Características faciais necessárias
  MIN_FACE_FEATURES: 3, // Mínimo de 3 características faciais detectadas
  MIN_FACE_SYMMETRY: 0.6,
  MIN_FACE_ASPECT_RATIO: 0.7,
  MAX_FACE_ASPECT_RATIO: 1.4,
  MIN_SKIN_CONSISTENCY: 0.15, // Pelo menos 15% de pixels com tom de pele
  MAX_COLOR_VARIATION: 2.0
} as const;
