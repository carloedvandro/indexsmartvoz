
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseCaptureValidationProps {
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing: boolean;
  captureStartTime: number | null;
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
  captureStartTime
}: UseCaptureValidationProps) => {
  const { toast } = useToast();

  // Reset IMEDIATO quando condições não são atendidas
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET IMEDIATO DA CAPTURA:", reason || "Condições perdidas");
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, []);

  // Validação RIGOROSA das condições de captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    // Se não está capturando, não precisa validar
    if (!isCapturing) return { isValid: true };

    // VALIDAÇÃO CRÍTICA: Se perdeu rosto ou posição ideal, PARAR TUDO
    if (!faceDetected) {
      return resetCapture("Rosto não detectado durante captura");
    }

    if (faceProximity !== "ideal") {
      return resetCapture("Rosto fora da posição ideal durante captura");
    }

    // Verificar timeout
    if (captureStartTime && Date.now() - captureStartTime > 15000) {
      return resetCapture("Tempo limite da captura excedido");
    }

    return { isValid: true };
  }, [faceDetected, faceProximity, isCapturing, captureStartTime, resetCapture]);

  // Verificar se deve iniciar captura (condições RIGOROSAS)
  const shouldStartCapture = useCallback(() => {
    return faceDetected && faceProximity === "ideal";
  }, [faceDetected, faceProximity]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    resetCapture
  };
};
