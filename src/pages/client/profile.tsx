
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { ProfileForm } from "@/components/client/profile/ProfileForm";
import { ProfileHeader } from "@/components/client/profile/ProfileHeader";
import { LoadingState } from "@/components/ui/LoadingState";

export default function ClientProfile() {
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
      <ProfileHeader onBack={() => navigate(-1)} />
      <div className="container mx-auto px-4 py-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
