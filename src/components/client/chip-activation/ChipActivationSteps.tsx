import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ScanLine } from "lucide-react";

interface ChipActivationStepsProps {
  currentStep: number;
  phoneNumber: string;
  selectedLines: Array<{
    number: string;
    barcode?: string;
  }>;
  onPhoneNumberChange: (value: string) => void;
  onAddLine: () => void;
  onRemoveLine: (index: number) => void;
  onStartScanning: (index: number) => void;
  handleBack: () => void;
  handleContinue: () => void;
  handleUpdateBarcode: (index: number, barcode: string) => void;
}

export function ChipActivationSteps({
  currentStep,
  phoneNumber,
  selectedLines,
  onPhoneNumberChange,
  onAddLine,
  onRemoveLine,
  onStartScanning,
  handleBack,
  handleContinue,
  handleUpdateBarcode
}: ChipActivationStepsProps) {
  const isContinueDisabled = () => {
    if (currentStep === 3) {
      return selectedLines.length === 0 || selectedLines.some(line => !line.barcode || line.barcode.length !== 20);
    }
    return false;
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Tenha os novos chips SIM cards com você</h2>
              <p className="text-gray-600">
                Compre nas lojas Vivo, pela Central de Relacionamento ou via Gerente que atende sua empresa
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Vamos confirmar sua identidade</h2>
              <p className="text-gray-600">
                Isso deixa o processo e seus dados ainda mais seguros
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Só coloque os chips SIM cards nos aparelhos quando concluir a troca</h2>
              <p className="text-gray-600">
                Assim você tem certeza de que a linha da sua empresa já está vinculada ao novo chip SIM card
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h3 className="text-lg font-medium">Precisa trocar ou ativar o chip virtual eSIM?</h3>
              <p className="text-gray-600">
                Clique em Voltar e procure pela linha. Depois, acesse Gerenciar linha e escolha Trocar pra eSIM ou Ativar eSIM
              </p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Confira como você encontra o código de barras do SIM card</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
              <p className="text-gray-600">
                O código de barras está impresso no cartão do Vivo Chip, tem 20 números e começa com 8955, conforme o exemplo:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <img 
                  src="/lovable-uploads/f5d55154-a62e-475f-b8de-b65ac463b3fc.png" 
                  alt="Exemplo de código de barras do SIM card"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Você precisa trocar o chip de quais linhas?</h2>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Identidade</span>
              <span>SIM Card</span>
              <span>Linhas</span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                <p className="text-sm">Não coloque o novo chip no aparelho antes de concluir a transferência</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-medium">Dá pra buscar e selecionar até 10 linhas</p>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Escolha o DDD"
                  value={phoneNumber}
                  onChange={(e) => onPhoneNumberChange(e.target.value)}
                />
                <Button 
                  onClick={onAddLine}
                  className="whitespace-nowrap bg-[#8425af] hover:bg-[#6c1e8f]"
                >
                  Selecionar
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">LINHAS SELECIONADAS</span>
                  <span className="text-gray-600">{selectedLines.length} DE 10</span>
                </div>
                
                {selectedLines.map((line, index) => (
                  <div key={index} className="space-y-2 p-4 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Linha {line.number}</span>
                        <span className="text-gray-500 ml-4">Conta: {Math.random().toString().slice(2, 12)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveLine(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <Input
                        placeholder="Código de barras do SIM card"
                        value={line.barcode || ""}
                        onChange={(e) => handleUpdateBarcode(index, e.target.value)}
                        className="pr-10"
                        readOnly
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => onStartScanning(index)}
                      >
                        <ScanLine className="h-4 w-4 text-[#8425af]" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      O código de barras tem 20 números. {
                        line.barcode 
                          ? `Faltam ${20 - line.barcode.length}`
                          : "Faltam 20"
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between gap-4">
          {currentStep > 1 && (
            <Button 
              variant="outline"
              className="flex-1"
              onClick={handleBack}
            >
              Voltar
            </Button>
          )}
          {currentStep === 1 && (
            <div className="flex-1" /> // Empty div to maintain layout with flex justify-between
          )}
          <Button 
            className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f]"
            onClick={handleContinue}
            disabled={isContinueDisabled()}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
