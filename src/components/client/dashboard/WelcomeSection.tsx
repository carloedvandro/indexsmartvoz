
import React, { useEffect } from 'react';
import { ProfileWithSponsor } from '@/types/profile';
import { updateFullName } from '@/services/profileService';
import { useToast } from '@/hooks/use-toast';

interface WelcomeSectionProps {
  profile: ProfileWithSponsor;
}

export function WelcomeSection({ profile }: WelcomeSectionProps) {
  const { toast } = useToast();
  
  useEffect(() => {
    const updateName = async () => {
      // Check if the name needs to be updated to "Shalon David"
      if (profile?.full_name !== "Shalon David") {
        try {
          await updateFullName(profile.id, "Shalon David");
          toast({
            title: "Nome atualizado",
            description: "Seu nome foi atualizado para Shalon David.",
            duration: 3000
          });
        } catch (error) {
          console.error("Failed to update name:", error);
          toast({
            title: "Erro",
            description: "Não foi possível atualizar seu nome.",
            variant: "destructive"
          });
        }
      }
    };
    
    if (profile?.id) {
      updateName();
    }
  }, [profile?.id]);
  
  // Use full_name property or fallback to a default greeting
  const fullName = profile.full_name || "Usuário";
  
  return (
    <div className="px-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h1 className="text-3xl font-bold text-[#0E1C36]">Olá, {fullName}</h1>
      </div>
    </div>
  );
}
