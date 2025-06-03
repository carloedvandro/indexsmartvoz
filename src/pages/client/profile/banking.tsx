
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { BankingForm } from "@/components/client/profile/banking/BankingForm";
import { BankingHeader } from "@/components/client/profile/banking/BankingHeader";
import { LoadingState } from "@/components/client/dashboard/LoadingState";

export default function ClientBanking() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();

  const handleBack = () => {
    console.log("Voltando para o perfil...");
    // Navega diretamente para a página de perfil
    navigate("/client/profile");
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Perfil não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BankingHeader onBack={handleBack} />
      <BankingForm profile={profile} />
    </div>
  );
}
