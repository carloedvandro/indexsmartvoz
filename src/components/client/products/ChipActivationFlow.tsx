
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Smartphone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
};

interface ChipActivationFlowProps {
  onBack: () => void;
}

export function ChipActivationFlow({ onBack }: ChipActivationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      icon: Package,
      title: "Receber o Chip",
      description: "Aguarde o recebimento do seu chip físico em casa"
    },
    {
      icon: Smartphone,
      title: "Inserir no Aparelho",
      description: "Insira o chip no slot do seu aparelho celular"
    },
    {
      icon: CheckCircle,
      title: "Ativação Automática",
      description: "A linha será ativada automaticamente em alguns minutos"
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const Icon = currentStepData.icon;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Ativação de Chip Físico
        </h2>
        <p className="text-gray-600">
          Siga os passos para ativar sua nova linha
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl">
              Etapa {currentStep} de {steps.length}
            </CardTitle>
            <h3 className="text-lg font-semibold text-gray-800">
              {currentStepData.title}
            </h3>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              {currentStepData.description}
            </p>
            
            {currentStep === 1 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Seu chip será enviado para o endereço cadastrado. 
                  O prazo de entrega é de 3 a 5 dias úteis.
                </p>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Dica:</strong> Desligue o aparelho antes de inserir o chip. 
                  Certifique-se de que o chip está na posição correta.
                </p>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Sucesso!</strong> Sua linha estará ativa em alguns minutos. 
                  Você receberá um SMS de confirmação.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Indicador de progresso */}
      <div className="flex justify-center space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index + 1 === currentStep
                ? 'bg-blue-600'
                : index + 1 < currentStep
                ? 'bg-green-600'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col space-y-3"
      >
        {currentStep < steps.length && (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="w-full h-12 text-lg"
          >
            Próxima Etapa
          </Button>
        )}
        
        {currentStep === steps.length && (
          <Button
            onClick={() => window.location.href = '/client/dashboard'}
            className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
          >
            Finalizar
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full h-12 text-lg"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar
        </Button>
      </motion.div>
    </div>
  );
}
