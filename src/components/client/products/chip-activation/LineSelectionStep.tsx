
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ScanLine } from "lucide-react";

interface LineSelectionStepProps {
  selectedLines: Array<{
    number: string;
    barcode?: string;
  }>;
  onAddLine: (phoneNumber: string) => void;
  onRemoveLine: (index: number) => void;
  onScanBarcode: (index: number) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function LineSelectionStep({ 
  selectedLines,
  onAddLine,
  onRemoveLine,
  onScanBarcode,
  onBack,
  onContinue
}: LineSelectionStepProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddLine = () => {
    if (phoneNumber) {
      onAddLine(phoneNumber);
      setPhoneNumber("");
    }
  };

  const isFormValid = selectedLines.length > 0 && !selectedLines.some(line => !line.barcode || line.barcode.length !== 20);

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
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
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button 
                onClick={handleAddLine}
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
                      className="pr-10"
                      readOnly
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => onScanBarcode(index)}
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

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f]"
            onClick={onContinue}
            disabled={!isFormValid}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
