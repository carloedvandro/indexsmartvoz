
import React from 'react';
import { ProfileWithSponsor } from '@/types/profile';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  // Use full_name property or fallback to a default greeting

  const fullName = profile?.full_name?.split(" ")[0] || "Usuário";
  
  return (
    <div className='container mb-0 pb-0'>
      <h1 className="text-2xl font-bold text-[#0E1C36] mb-0 pb-0">Olá, {fullName}</h1>
    </div>
  );
}
