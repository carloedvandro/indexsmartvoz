
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

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

  // Reset apenas para condições críticas
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET DA CAPTURA:", reason || "Condições perdidas");
    
    toast({
      title: "Captura Interrompida",
      description: reason || "Posicione o rosto no oval e tente novamente",
      variant: "destructive",
      duration: 2000,
    });
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, [toast]);

  // Validação muito simples das condições de captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    // Se não está capturando, não precisa validar
    if (!isCapturing) return { isValid: true };

    // Apenas verificar se o rosto está detectado
    if (!faceDetected) {
      return resetCapture("Rosto não detectado");
    }

    // Verificar timeout
    if (captureStartTime && Date.now() - captureStartTime > 15000) {
      return resetCapture("Tempo limite excedido");
    }

    return { isValid: true };
  }, [faceDetected, isCapturing, captureStartTime, resetCapture]);

  // Verificar se deve iniciar captura - condições mínimas
  const shouldStartCapture = useCallback(() => {
    return faceDetected && (faceProximity === "ideal" || faceProximity === "too-close" || faceProximity === "too-far");
  }, [faceDetected, faceProximity]);

  // Validação para cada frame - muito permissiva
  const validateForCapture = useCallback(() => {
    return faceDetected; // Apenas rosto detectado
  }, [faceDetected]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
