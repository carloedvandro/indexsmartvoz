
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

  // Reset IMEDIATO quando condições não são atendidas
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET IMEDIATO DA CAPTURA:", reason || "Condições perdidas");
    
    toast({
      title: "Captura Resetada",
      description: reason || "Mantenha o rosto na posição ideal",
      variant: "destructive",
      duration: 3000,
    });
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, [toast]);

  // Validação SUPER RIGOROSA das condições de captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    // Se não está capturando, não precisa validar
    if (!isCapturing) return { isValid: true };

    // VALIDAÇÃO CRÍTICA OBRIGATÓRIA: Face detectada
    if (!faceDetected) {
      return resetCapture("Rosto não detectado - Centralize no oval");
    }

    // VALIDAÇÃO CRÍTICA OBRIGATÓRIA: Proximidade ideal
    if (faceProximity !== "ideal") {
      const proximityMessage = faceProximity === "too-close" 
        ? "Muito próximo - Afaste um pouco"
        : faceProximity === "too-far"
        ? "Muito longe - Aproxime um pouco"
        : "Posição inadequada";
      return resetCapture(proximityMessage);
    }

    // Verificar estabilidade da posição do rosto
    if (facePosition.x === 0 && facePosition.y === 0) {
      return resetCapture("Posição do rosto instável");
    }

    // Verificar timeout
    if (captureStartTime && Date.now() - captureStartTime > 15000) {
      return resetCapture("Tempo limite excedido - Tente novamente");
    }

    return { isValid: true };
  }, [faceDetected, faceProximity, isCapturing, captureStartTime, facePosition, resetCapture]);

  // Verificar se deve iniciar captura (condições SUPER RIGOROSAS)
  const shouldStartCapture = useCallback(() => {
    const canStart = faceDetected && 
                    faceProximity === "ideal" && 
                    facePosition.x > 0 && 
                    facePosition.y > 0;
    
    if (!canStart) {
      console.log("❌ Não pode iniciar captura:", { 
        faceDetected, 
        faceProximity, 
        facePosition 
      });
    }
    
    return canStart;
  }, [faceDetected, faceProximity, facePosition]);

  // Validação tripla para segurança máxima
  const validateForCapture = useCallback(() => {
    return faceDetected && 
           faceProximity === "ideal" && 
           facePosition.x > 0 && 
           facePosition.y > 0;
  }, [faceDetected, faceProximity, facePosition]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
