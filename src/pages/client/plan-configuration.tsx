
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { DDDInput } from "@/components/client/products/DDDInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePlanSelection } from "@/contexts/PlanSelectionContext";
import { useToast } from "@/hooks/use-toast";

export default function PlanConfiguration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedPlan, setSelectionData } = usePlanSelection();
  const [selectedDDD, setSelectedDDD] = useState<string>("");
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(null);

  if (!selectedPlan) {
    navigate('/client/plan-selection');
    return null;
  }

  const handleContinue = () => {
    if (!selectedDDD || !selectedDueDate) {
      if (!selectedDDD) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, selecione um DDD antes de continuar",
          variant: "destructive",
        });
      } else if (!selectedDueDate) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, selecione uma data de vencimento antes de continuar",
          variant: "destructive",
        });
      }
      return;
    }

    // Salvar dados da seleção
    setSelectionData({
      internet: selectedPlan.gb,
      ddd: selectedDDD,
      dueDate: selectedDueDate,
      price: selectedPlan.price
    });

    // Ir para cadastro
    navigate("/client/register");
  };

  const handleBack = () => {
    navigate("/client/plan-selection");
  };

  const isDisabled = !selectedDDD || !selectedDueDate;

  return (
    <div className="min-h-screen bg-white">
      {/* Header com logo */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>
      </div>

      <div className="pt-24 px-4 max-w-md mx-auto">
        <div className="space-y-6">
          {/* Plano selecionado */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-lg">{selectedPlan.name}</h3>
              <div className="text-3xl font-bold">{selectedPlan.gb}</div>
              <div className="text-xl">R$ {selectedPlan.price.toFixed(2)}/mês</div>
            </CardContent>
          </Card>

          {/* Configurações */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Configure seu plano</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Selecione seu DDD</label>
                <DDDInput
                  ddd={selectedDDD}
                  onDDDChange={setSelectedDDD}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Data de vencimento</label>
                <DueDateSelector
                  selectedDueDate={selectedDueDate}
                  setSelectedDueDate={setSelectedDueDate}
                />
              </div>
            </div>
          </div>

          {/* Resumo do preço */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total mensal:</span>
                <span className="text-2xl font-bold text-purple-600">
                  R$ {selectedPlan.price.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Botões de navegação */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar
            </Button>
            <Button
              onClick={handleContinue}
              disabled={isDisabled}
              className="flex-1 flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Continuar
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
