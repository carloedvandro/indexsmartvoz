import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, User, Calendar, CreditCard, Shield } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        
        {/* Ícone de sucesso */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Verificação Concluída
          </h1>
          <p className="text-white/90">
            Sua identidade foi verificada com sucesso!
          </p>
        </div>

        {/* Card com dados verificados */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 space-y-4">
          
          {/* Foto do usuário */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30">
              <img 
                src={selfieImage} 
                alt="Foto do usuário" 
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Desfazer espelhamento
              />
            </div>
          </div>

          {/* Dados verificados */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-white/60" />
              <div>
                <p className="text-xs text-white/60 uppercase">Nome Completo</p>
                <p className="text-white font-medium">{userData.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-white/60" />
              <div>
                <p className="text-xs text-white/60 uppercase">CPF</p>
                <p className="text-white font-medium">{userData.cpf}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-white/60" />
              <div>
                <p className="text-xs text-white/60 uppercase">Data de Nascimento</p>
                <p className="text-white font-medium">{userData.birthDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-white/60" />
              <div>
                <p className="text-xs text-white/60 uppercase">Protocolo da Verificação</p>
                <p className="text-white font-medium font-mono">{protocol}</p>
              </div>
            </div>
          </div>

          {/* Selo de verificação */}
          <div className="border-t border-white/20 pt-4">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-white/80">Verificado por</span>
              <span className="text-white font-semibold">Serasa Experian</span>
            </div>
          </div>
        </div>

        {/* Mensagem adicional */}
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <p className="text-green-100 text-sm">
            🎉 Parabéns! Sua identidade foi confirmada com sucesso. 
            Agora você pode prosseguir para escolher seu plano.
          </p>
        </div>

        {/* Botão de continuar */}
        <Button
          onClick={onContinue}
          className="w-full py-4 bg-white text-[#5f0889] hover:bg-white/90 font-bold text-lg rounded-full"
        >
          Avançar para Seleção de Plano
        </Button>

        {/* Informação de segurança */}
        <div className="text-center">
          <p className="text-xs text-white/60">
            Seus dados estão protegidos e serão utilizados apenas para 
            verificação de identidade conforme nossa política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};