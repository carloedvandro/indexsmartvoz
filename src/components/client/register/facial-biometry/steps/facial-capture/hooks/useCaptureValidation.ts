
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

  // Reset para condições inválidas ou timeout
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET DA CAPTURA:", reason || "Condições inválidas");
    
    toast({
      title: "Captura Interrompida",
      description: reason || "Posicione seu rosto corretamente no oval",
      variant: "destructive",
      duration: 2000,
    });
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, [toast]);

  // Validação rigorosa das condições de captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    console.log("🔍 Validating conditions - Capturing:", isCapturing, "Face:", faceDetected, "Proximity:", faceProximity);
    
    // Se não está capturando, não precisa validar
    if (!isCapturing) return { isValid: true };

    // Verificar timeout
    if (captureStartTime && Date.now() - captureStartTime > CAPTURE_CONFIG.MAX_CAPTURE_TIME) {
      return resetCapture("Tempo limite excedido");
    }

    // Verificar se rosto ainda está detectado e na posição ideal
    if (!faceDetected) {
      return resetCapture("Rosto não detectado - posicione-se no oval");
    }

    if (faceProximity !== "ideal") {
      return resetCapture("Ajuste sua posição no oval");
    }

    return { isValid: true };
  }, [isCapturing, captureStartTime, faceDetected, faceProximity, resetCapture]);

  // Verificar se deve iniciar captura - APENAS rosto detectado E na posição ideal
  const shouldStartCapture = useCallback(() => {
    const should = faceDetected && faceProximity === "ideal";
    console.log("🚀 Should start capture:", should, "Face detected:", faceDetected, "Proximity:", faceProximity);
    return should;
  }, [faceDetected, faceProximity]);

  // Validação para cada frame - rosto detectado E na posição ideal
  const validateForCapture = useCallback(() => {
    const valid = faceDetected && faceProximity === "ideal";
    console.log("✅ Frame validation:", valid, "Face detected:", faceDetected, "Proximity:", faceProximity);
    return valid;
  }, [faceDetected, faceProximity]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture,
    resetCapture
  };
};
