
import React from 'react';
import { ProfileWithSponsor } from '@/types/profile';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  // Use full name from profile, with fallback to 'Usuário'
  const fullName = profile.full_name || "Shalon David";
  
  return (
    <div className="px-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h1 className="text-3xl font-bold text-[#0E1C36]">Olá, {fullName}</h1>
      </div>
    </div>
  );
}
