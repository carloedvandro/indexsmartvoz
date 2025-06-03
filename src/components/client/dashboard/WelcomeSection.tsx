
import React from 'react';
import { ProfileWithSponsor } from '@/types/profile';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  // Use full_name property or fallback to a default greeting
  const fullName = profile.full_name || "Usuário";
  
  return (
    <h1 className="text-3xl font-bold text-[#0E1C36] ml-[22px]">Olá, {fullName}</h1>
  );
}
