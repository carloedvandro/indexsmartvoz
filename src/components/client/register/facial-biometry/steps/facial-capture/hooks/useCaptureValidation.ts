
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

  // Verificar se deve iniciar captura - apenas rosto detectado
  const shouldStartCapture = useCallback(() => {
    const should = faceDetected;
    console.log("🚀 DEVE INICIAR CAPTURA:", should, "Rosto detectado:", faceDetected);
    return should;
  }, [faceDetected]);

  // Validação mais simples - apenas verificar se rosto está detectado
  const validateForCapture = useCallback(() => {
    const valid = faceDetected;
    console.log("✅ VALIDAÇÃO SIMPLES:", valid, "Rosto detectado:", faceDetected);
    return valid;
  }, [faceDetected]);

  const validateCaptureConditions = useCallback((): ValidationResult => {
    // Se não está capturando, usar validação normal
    if (!isCapturing) {
      return { isValid: faceDetected };
    }

    // Durante captura: se perder rosto, resetar
    if (!faceDetected) {
      console.log("🔴 ROSTO PERDIDO - Resetando captura");
      return { 
        isValid: false, 
        shouldReset: true, 
        reason: "Rosto não detectado" 
      };
    }

    return { isValid: true };
  }, [isCapturing, faceDetected]);

  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET CAPTURA:", reason);
    toast({
      title: "Captura Reiniciada",
      description: reason || "Posicione o rosto no oval novamente",
      variant: "destructive",
    });
    return { isValid: false, shouldReset: true };
  }, [toast]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
