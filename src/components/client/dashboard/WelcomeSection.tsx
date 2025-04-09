
import React from 'react';
import { ProfileWithSponsor } from '@/types/profile';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  return (
    <div className="px-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-full">
        <h1 className="text-3xl font-bold text-[#0E1C36]">Olá, {profile.full_name?.split(' ')[0] || 'Usuário'}</h1>
        <p className="text-gray-600 mt-1">Aqui está uma visão geral das contas da sua empresa:</p>
      </div>
    </div>
  );
}
