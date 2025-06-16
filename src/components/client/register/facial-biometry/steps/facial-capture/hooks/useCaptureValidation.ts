
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { CAPTURE_CONFIG } from "../config/captureConfig";

interface UseCaptureValidationProps {
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing: boolean;
  captureStartTime: number | null;
  facePosition: { x: number; y: number; size: number };
}

interface ValidationResult {
  isValid: boolean;
  shouldReset?: boolean;
  reason?: string;
}

export const useCaptureValidation = ({
  faceDetected,
  faceProximity,
  isCapturing,
  captureStartTime,
  facePosition
}: UseCaptureValidationProps) => {
  const { toast } = useToast();

  // Validação muito simples das condições de captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    console.log("🔍 VALIDAÇÃO SIMPLES - Capturando:", isCapturing, "Rosto:", faceDetected);
    
    // Se não está capturando, sempre válido
    if (!isCapturing) return { isValid: true };

    // Verificar timeout (bem generoso)
    if (captureStartTime && Date.now() - captureStartTime > CAPTURE_CONFIG.MAX_CAPTURE_TIME * 2) {
      console.log("⏰ Timeout - mas continuando...");
      // Não resetar por timeout, só avisar
    }

    // SEMPRE válido se há rosto detectado
    if (faceDetected) {
      return { isValid: true };
    }

    // Só resetar se não há rosto por muito tempo
    return { isValid: true }; // Sempre válido para não interromper
  }, [isCapturing, captureStartTime, faceDetected, faceProximity]);

  // Verificar se deve iniciar captura - APENAS rosto detectado
  const shouldStartCapture = useCallback(() => {
    const should = faceDetected; // Apenas detectado, não importa proximidade
    console.log("🚀 DEVE INICIAR CAPTURA:", should, "Rosto detectado:", faceDetected);
    return should;
  }, [faceDetected]);

  // Validação para cada frame - apenas rosto detectado
  const validateForCapture = useCallback(() => {
    const valid = faceDetected; // Apenas detectado
    console.log("✅ VALIDAÇÃO FRAME:", valid, "Rosto detectado:", faceDetected);
    return valid;
  }, [faceDetected]);

  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET (desabilitado):", reason);
    return { isValid: true, shouldReset: false }; // Nunca resetar
  }, []);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
