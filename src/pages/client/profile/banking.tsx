
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { BankingForm } from "@/components/client/profile/banking/BankingForm";
import { BankingHeader } from "@/components/client/profile/banking/BankingHeader";
import { LoadingState } from "@/components/ui/LoadingState";

export default function ClientBanking() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();

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
      <BankingHeader onBack={() => navigate(-1)} />
      <BankingForm profile={profile} />
    </div>
  );
}
