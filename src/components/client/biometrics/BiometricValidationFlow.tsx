import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiometricValidation } from "./BiometricValidation";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

export function BiometricValidationFlow() {
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBiometricValidation, setShowBiometricValidation] = useState(false);

  useEffect(() => {
    if (profile && profile.facial_validation_status === 'pending') {
      setShowBiometricValidation(true);
      toast({
        title: "Validação Biométrica Necessária",
        description: "Por favor, complete a validação biométrica para continuar.",
      });
    } else if (profile && profile.facial_validation_status === 'approved') {
      navigate("/client/dashboard");
    }
  }, [profile, navigate]);

  return showBiometricValidation ? <BiometricValidation /> : null;
}