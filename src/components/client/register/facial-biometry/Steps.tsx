
import { Check } from "lucide-react";

interface StepsProps {
  currentStep: string;
}

export const Steps = ({ currentStep }: StepsProps) => {
  // Definindo os passos principais do processo
  const steps = [
    { id: 'cpf-verification', label: 'Insira os primeiros 5 dígitos do seu CPF para iniciar', index: 1 },
    { id: 'camera-access', label: 'Libere acesso a câmera do aparelho', index: 2 },
    { id: 'capture-instructions', label: 'Dica para captura das imagens', index: 3 },
    { id: 'facial-capture', label: 'Enquadre o rosto para captura de selfie', index: 4 },
    { id: 'facial-analysis', label: 'Imagem em análise', index: 5 },
    { id: 'document-instructions', label: 'Dicas para captura de documento', index: 6 },
    { id: 'document-type', label: 'Selecione o tipo de documento que será enviado', index: 7 },
    { id: 'document-front', label: 'Enquadre o documento para captura', index: 8 },
    { id: 'document-back', label: 'Enquadre o documento para captura', index: 8 },
    { id: 'document-analysis', label: 'Imagem em análise', index: 9 },
    { id: 'completion', label: 'Processo de biometria concluído', index: 10 },
  ];

  // Encontrar o passo atual
  const currentStepObj = steps.find(step => step.id === currentStep) || steps[0];
  const currentIndex = currentStepObj.index;
  
  // Filtrar os passos para exibir apenas os marcadores únicos (sem repetição de índice)
  const uniqueDisplaySteps = steps.filter((step, index, self) => 
    index === self.findIndex(s => s.index === step.index)
  );

  return (
    <div className="mb-8">
      <div className="flex flex-col space-y-4">
        {uniqueDisplaySteps.map((step) => {
          const isActive = step.index === currentIndex;
          const isCompleted = step.index < currentIndex;
          
          return (
            <div key={step.id} className="flex items-start">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 
                ${isCompleted ? 'bg-[#8425af] text-white' : 
                 isActive ? 'border-2 border-[#8425af] text-[#8425af]' : 
                 'border-2 border-gray-300 text-gray-400'}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.index}</span>
                )}
              </div>
              <span className={`text-sm mt-1 ${
                isActive ? 'text-[#8425af] font-semibold' : 
                isCompleted ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
