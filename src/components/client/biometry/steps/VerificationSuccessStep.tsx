import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface VerificationSuccessStepProps {
  protocol: string;
  userData: {
    name: string;
    cpf: string;
    birthDate: string;
  };
  selfieImage: string;
  onContinue: () => void;
}

export const VerificationSuccessStep = ({ 
  protocol, 
  userData, 
  selfieImage, 
  onContinue 
}: VerificationSuccessStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Card principal com dados da verificação */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 p-6 mb-6">
          
          {/* Ícone de sucesso centralizado */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Verificação Concluída!
            </h1>
            
            <p className="text-white/90 text-center leading-relaxed">
              Sua identidade foi verificada com sucesso<br />
              Todos os documentos foram validados e<br />
              você está pronto para prosseguir
            </p>
          </div>

          {/* Dados do usuário */}
          <div className="space-y-3 text-white">
            <div>
              <span className="text-white/80 text-sm">Nome: </span>
              <span className="font-medium">{userData.name}</span>
            </div>
            
            <div>
              <span className="text-white/80 text-sm">CPF: </span>
              <span className="font-medium">{userData.cpf}</span>
            </div>
            
            <div>
              <span className="text-white/80 text-sm">Nascimento: </span>
              <span className="font-medium">{userData.birthDate}</span>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <span className="text-white/80 text-sm">Protocolo: </span>
              <span className="font-bold text-lg">{protocol}</span>
            </div>
          </div>
        </div>

        {/* Botão de avançar */}
        <Button
          onClick={onContinue}
          className="w-full py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-bold text-lg rounded-lg"
        >
          Avançar
        </Button>
      </div>
    </div>
  );
};