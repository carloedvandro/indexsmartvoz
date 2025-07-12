import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface VerificationRejectedStepProps {
  onRetry: () => void;
}

export const VerificationRejectedStep = ({ onRetry }: VerificationRejectedStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Card principal com erro */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 p-6 mb-6">
          
          {/* Ícone de erro centralizado */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-6">
              Verificação Reprovada
            </h1>
          </div>

          {/* Explicação */}
          <div className="text-white/90 text-center mb-6">
            <p className="leading-relaxed">
              Nossa equipe da SmartVoz não conseguiu confirmar que os dados do documento e da selfie pertencem à mesma pessoa.
            </p>
          </div>

          {/* Motivos comuns */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Motivos comuns:</h3>
            <ul className="text-white/90 space-y-2">
              <li>• Documento de terceiros</li>
              <li>• Rosto não visível</li>
              <li>• Divergência nos dados</li>
            </ul>
          </div>
          
          {/* Aviso de segurança */}
          <div className="text-white/90 text-center">
            <p>Por segurança, seu acesso foi bloqueado.</p>
          </div>
        </div>

        {/* Botão de tentar novamente */}
        <Button
          onClick={onRetry}
          className="w-full py-4 bg-white text-[#5f0889] hover:bg-white/90 font-bold text-lg rounded-full"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};