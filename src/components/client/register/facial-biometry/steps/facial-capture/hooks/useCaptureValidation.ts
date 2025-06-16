
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

  // Validação mais tolerante durante captura
  const validateCaptureConditions = useCallback((): ValidationResult => {
    console.log("🔍 VALIDAÇÃO TOLERANTE - Capturando:", isCapturing, "Rosto:", faceDetected);
    
    // Se não está capturando, usar validação normal
    if (!isCapturing) {
      return { isValid: faceDetected && faceProximity === "ideal" };
    }

    // Durante captura, ser MUITO mais tolerante
    // Só parar se perder o rosto completamente por muito tempo
    if (!faceDetected) {
      console.log("⚠️ Rosto perdido durante captura - mas continuando...");
      return { isValid: true }; // Continuar mesmo sem rosto por alguns frames
    }

    // Se tem rosto detectado, sempre válido durante captura
    // Ignorar proximidade durante captura para evitar interrupções
    return { isValid: true };
  }, [isCapturing, faceDetected, faceProximity]);

  // Verificar se deve iniciar captura - apenas rosto detectado na posição ideal
  const shouldStartCapture = useCallback(() => {
    const should = faceDetected && faceProximity === "ideal";
    console.log("🚀 DEVE INICIAR CAPTURA:", should, "Rosto:", faceDetected, "Proximidade:", faceProximity);
    return should;
  }, [faceDetected, faceProximity]);

  // Validação para cada frame - mais tolerante durante captura
  const validateForCapture = useCallback(() => {
    if (!isCapturing) {
      // Antes de capturar, ser rigoroso
      return faceDetected && faceProximity === "ideal";
    }
    
    // Durante captura, apenas verificar se tem rosto (ignorar proximidade)
    const valid = faceDetected;
    console.log("✅ VALIDAÇÃO FRAME (TOLERANTE):", valid, "Rosto detectado:", faceDetected);
    return valid;
  }, [faceDetected, faceProximity, isCapturing]);

  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET CAPTURA:", reason);
    toast({
      title: "Captura Reiniciada",
      description: reason || "Reposicione o rosto no oval",
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
