
import React from 'react';
import { ProfileWithSponsor } from '@/types/profile';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  // Use full_name property or fallback to a default greeting
  const fullName = profile.full_name || "Usuário";
  
  return (
    <div className="container">
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h1 className="text-3xl font-bold text-[#0E1C36]">Olá, {fullName}</h1>
      </div>
    </div>
  );
}
