
import React from 'react';
import { ProfileWithSponsor } from '@/types/profile';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  // Get the full name from profile, or use "Usuário" as fallback
  const fullName = profile.full_name || "Usuário";
  
  return (
    <div className="px-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h1 className="text-3xl font-bold text-[#0E1C36]">Olá, {fullName}</h1>
        <p className="text-gray-600 mt-1">Aqui está uma visão geral das contas da sua empresa:</p>
      </div>
    </div>
  );
}
