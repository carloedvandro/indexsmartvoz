
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

  // Validação rigorosa - sempre reinicia quando perde condições ideais
  const validateCaptureConditions = useCallback((): ValidationResult => {
    console.log("🔍 VALIDAÇÃO RIGOROSA - Capturando:", isCapturing, "Rosto:", faceDetected, "Proximidade:", faceProximity);
    
    // Se não está capturando, usar validação normal
    if (!isCapturing) {
      return { isValid: faceDetected && faceProximity === "ideal" };
    }

    // Durante captura: se perder rosto ou sair da posição ideal, RESETAR IMEDIATAMENTE
    if (!faceDetected || faceProximity !== "ideal") {
      console.log("🔴 CONDIÇÕES PERDIDAS - Resetando captura do zero");
      return { 
        isValid: false, 
        shouldReset: true, 
        reason: !faceDetected ? "Rosto não detectado" : "Posição não ideal" 
      };
    }

    // Se tem rosto detectado na posição ideal, continuar
    return { isValid: true };
  }, [isCapturing, faceDetected, faceProximity]);

  // Verificar se deve iniciar captura - apenas rosto detectado na posição ideal
  const shouldStartCapture = useCallback(() => {
    const should = faceDetected && faceProximity === "ideal";
    console.log("🚀 DEVE INICIAR CAPTURA:", should, "Rosto:", faceDetected, "Proximidade:", faceProximity);
    return should;
  }, [faceDetected, faceProximity]);

  // Validação para cada frame - rigorosa: apenas posição ideal
  const validateForCapture = useCallback(() => {
    if (!isCapturing) {
      // Antes de capturar, ser rigoroso
      return faceDetected && faceProximity === "ideal";
    }
    
    // Durante captura: APENAS aceitar posição ideal
    const valid = faceDetected && faceProximity === "ideal";
    console.log("✅ VALIDAÇÃO FRAME (RIGOROSA):", valid, "Rosto:", faceDetected, "Proximidade:", faceProximity);
    
    if (!valid) {
      console.log("❌ Frame inválido - será resetado");
    }
    
    return valid;
  }, [faceDetected, faceProximity, isCapturing]);

  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESET CAPTURA DO ZERO:", reason);
    toast({
      title: "Captura Reiniciada",
      description: reason || "Reposicione o rosto no oval e mantenha a posição",
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
