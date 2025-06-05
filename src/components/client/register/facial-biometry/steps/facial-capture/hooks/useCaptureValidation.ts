
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

  // Reset mais tolerante - apenas para condições críticas
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET DA CAPTURA:", reason || "Condições críticas perdidas");
    
    toast({
      title: "Captura Interrompida",
      description: reason || "Posicione o rosto no oval e mantenha estável",
      variant: "destructive",
      duration: 2000,
    });
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, [toast]);

  // Validação mais tolerante das condições de captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    // Se não está capturando, não precisa validar
    if (!isCapturing) return { isValid: true };

    // VALIDAÇÃO CRÍTICA: Face detectada (com tolerância)
    if (!faceDetected) {
      return resetCapture("Rosto não detectado - Posicione no oval");
    }

    // VALIDAÇÃO CRÍTICA: Proximidade ideal (com mais tolerância)
    if (faceProximity === "not-detected") {
      return resetCapture("Posição inadequada - Centralize no oval");
    }

    // Apenas resetar para proximidade muito fora do ideal
    if (faceProximity === "too-close") {
      return resetCapture("Muito próximo - Afaste um pouco");
    }
    
    if (faceProximity === "too-far") {
      return resetCapture("Muito longe - Aproxime um pouco");
    }

    // Verificar timeout
    if (captureStartTime && Date.now() - captureStartTime > 20000) {
      return resetCapture("Tempo limite excedido - Tente novamente");
    }

    return { isValid: true };
  }, [faceDetected, faceProximity, isCapturing, captureStartTime, resetCapture]);

  // Verificar se deve iniciar captura (condições mais permissivas)
  const shouldStartCapture = useCallback(() => {
    return faceDetected && faceProximity === "ideal";
  }, [faceDetected, faceProximity]);

  // Validação mais permissiva para captura
  const validateForCapture = useCallback(() => {
    return faceDetected && faceProximity === "ideal";
  }, [faceDetected, faceProximity]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
