
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Smartphone, CreditCard, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ChipTypeSelectionProps {
  onSelect: (type: 'physical' | 'virtual') => void;
  onBack: () => void;
}

export function ChipTypeSelection({ onSelect, onBack }: ChipTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<'physical' | 'virtual' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  const chipOptions = [
    {
      id: 'physical' as const,
      title: 'Chip Físico (SIM-card)',
      description: 'Ativação tradicional com chip físico que será inserido no aparelho',
      icon: CreditCard,
      features: [
        'Chip físico tradicional',
        'Inserção manual no aparelho',
        'Compatível com todos os aparelhos',
        'Processo de ativação padrão'
      ]
    },
    {
      id: 'virtual' as const,
      title: 'Chip Virtual (eSIM)',
      description: 'Ativação digital sem necessidade de chip físico',
      icon: Smartphone,
      features: [
        'Ativação 100% digital',
        'Sem necessidade de chip físico',
        'Compatível com aparelhos modernos',
        'Ativação mais rápida'
      ]
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Tipo de Ativação
        </h2>
        <p className="text-gray-600">
          Escolha como deseja ativar sua linha
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <RadioGroup
          value={selectedType || ''}
          onValueChange={(value) => setSelectedType(value as 'physical' | 'virtual')}
          className="space-y-4"
        >
          {chipOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedType === option.id;
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Label
                  htmlFor={option.id}
                  className="cursor-pointer"
                >
                  <Card className={`transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="mt-1"
                        />
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              isSelected ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              <Icon className={`h-6 w-6 ${
                                isSelected ? 'text-blue-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {option.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="pl-2 space-y-1">
                            {option.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center space-x-2 text-sm text-gray-600"
                              >
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </motion.div>
            );
          })}
        </RadioGroup>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col space-y-3"
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="w-full h-12 text-lg"
        >
          Continuar
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
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
