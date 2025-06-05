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

  // Reset apenas para timeout
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET DA CAPTURA:", reason || "Timeout");
    
    toast({
      title: "Captura Interrompida",
      description: reason || "Tente novamente",
      variant: "destructive",
      duration: 2000,
    });
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, [toast]);

  // Validação muito simples - apenas timeout
  const validateCaptureConditions = useCallback((): ValidationResult => {
    console.log("🔍 Validating conditions - Capturing:", isCapturing, "Face:", faceDetected);
    
    // Se não está capturando, não precisa validar
    if (!isCapturing) return { isValid: true };

    // Verificar apenas timeout
    if (captureStartTime && Date.now() - captureStartTime > CAPTURE_CONFIG.MAX_CAPTURE_TIME) {
      return resetCapture("Tempo limite excedido");
    }

    return { isValid: true };
  }, [isCapturing, captureStartTime, resetCapture]);

  // Verificar se deve iniciar captura - apenas rosto detectado
  const shouldStartCapture = useCallback(() => {
    const should = faceDetected;
    console.log("🚀 Should start capture:", should, "Face detected:", faceDetected);
    return should;
  }, [faceDetected]);

  // Validação para cada frame - apenas rosto detectado
  const validateForCapture = useCallback(() => {
    const valid = faceDetected;
    console.log("✅ Frame validation:", valid, "Face detected:", faceDetected);
    return valid;
  }, [faceDetected]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
