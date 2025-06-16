
export interface FaceDetectionResult {
  faceDetected: boolean;
  facePosition: { x: number; y: number; size: number };
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  lightingQuality: "good" | "poor" | "too-dark" | "too-bright";
}

export interface FaceAnalysisResult {
  detected: boolean;
  position: { x: number; y: number; size: number };
  proximity: "ideal" | "too-close" | "too-far" | "not-detected";
  lighting: "good" | "poor" | "too-dark" | "too-bright";
}

export interface LightingAnalysis {
  quality: "good" | "poor" | "too-dark" | "too-bright";
  averageBrightness: number;
}

export interface SkinToneAnalysis {
  skinTonePixels: number;
  facePixelsCount: number;
  facePixelsSum: { x: number; y: number };
  contrastRatio: number;
}
