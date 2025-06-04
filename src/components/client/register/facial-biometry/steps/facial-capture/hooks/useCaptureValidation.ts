
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

  // RESET IMMEDIATE when conditions are not met
  const resetCapture = useCallback((reason?: string): ValidationResult => {
    console.log("🔴 RESETANDO CAPTURA:", reason || "Condições não atendidas");
    
    if (reason) {
      toast({
        title: "Captura Resetada",
        description: reason,
        variant: "destructive",
      });
    }
    
    return {
      isValid: false,
      shouldReset: true,
      reason
    };
  }, [toast]);

  // Validate capture conditions
  const validateCaptureConditions = useCallback((): ValidationResult => {
    // If not capturing, no validation needed
    if (!isCapturing) return { isValid: true };

    // IMMEDIATE VALIDATION: If lost face or left ideal position, STOP EVERYTHING
    if (!faceDetected || faceProximity !== "ideal") {
      const reason = !faceDetected 
        ? "Rosto não detectado durante a captura" 
        : "Rosto fora da posição ideal";
      return resetCapture(reason);
    }

    // Check capture timeout
    if (captureStartTime && Date.now() - captureStartTime > 15000) {
      return resetCapture("Tempo limite da captura excedido");
    }

    return { isValid: true };
  }, [faceDetected, faceProximity, isCapturing, captureStartTime, resetCapture]);

  // Check if should start capture
  const shouldStartCapture = useCallback(() => {
    return faceDetected && faceProximity === "ideal";
  }, [faceDetected, faceProximity]);

  return {
    validateCaptureConditions,
    shouldStartCapture,
    resetCapture
  };
};
