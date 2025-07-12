import React from 'react';
import { Button } from '@/components/ui/button';
import { XCircle, AlertTriangle, RotateCcw } from 'lucide-react';

interface VerificationRejectedStepProps {
  onRetry: () => void;
}

export const VerificationRejectedStep = ({ onRetry }: VerificationRejectedStepProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        
        {/* Ícone de erro */}
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Verificação Reprovada
          </h1>
        </div>

        {/* Card com explicação */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-red-500/30 p-6 space-y-4">
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-white/90 leading-relaxed">
                Nossa equipe da SmartVoz não conseguiu confirmar que os dados do documento 
                e da selfie pertencem à mesma pessoa.
              </p>
            </div>
          </div>

          {/* Motivos comuns */}
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Motivos comuns:
            </h3>
            <ul className="text-red-100 text-sm space-y-1">
              <li>• Documento de terceiros</li>
              <li>• Rosto não visível na selfie</li>
              <li>• Divergência nos dados</li>
              <li>• Qualidade da imagem inadequada</li>
              <li>• Documento danificado ou ilegível</li>
            </ul>
          </div>

          {/* Aviso de segurança */}
          <div className="border-t border-red-500/20 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <p className="text-white/80 text-sm">
                Por segurança, seu acesso foi bloqueado temporariamente.
              </p>
            </div>
          </div>
        </div>

        {/* Dicas para nova tentativa */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">💡 Dicas para uma nova tentativa:</h3>
          <ul className="text-blue-100 text-sm space-y-1">
            <li>• Use boa iluminação</li>
            <li>• Mantenha o documento limpo e reto</li>
            <li>• Certifique-se de que seu rosto está bem visível</li>
            <li>• Use seu próprio documento</li>
          </ul>
        </div>

        {/* Botão de tentar novamente */}
        <Button
          onClick={onRetry}
          className="w-full py-4 bg-white text-[#5f0889] hover:bg-white/90 font-bold text-lg rounded-full flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Tentar Novamente
        </Button>

        {/* Informação de suporte */}
        <div className="text-center">
          <p className="text-xs text-white/60 mb-2">
            Precisa de ajuda? Entre em contato com nosso suporte.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span className="text-white/70">Verificação por</span>
            <span className="text-white font-semibold">Serasa Experian</span>
          </div>
        </div>
      </div>
    </div>
  );
};