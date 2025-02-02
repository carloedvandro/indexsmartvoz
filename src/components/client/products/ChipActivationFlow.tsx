import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { useToast } from "@/hooks/use-toast";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
};

interface ChipActivationFlowProps {
  currentStep: number;
  selectedLines: Line[];
  scanningIndex: number | null;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
  onUpdateBarcode: (index: number, barcode: string) => void;
  onScanningClose: () => void;
}

export function ChipActivationFlow({
  currentStep,
  selectedLines,
  scanningIndex,
  onBack,
  onContinue,
  onStartScanning,
  onUpdateBarcode,
  onScanningClose,
}: ChipActivationFlowProps) {
  const { toast } = useToast();

  const handleScanResult = (index: number, barcode: string) => {
    console.log("Barcode scanned:", barcode);
    onUpdateBarcode(index, barcode);
    toast({
      title: "Código escaneado com sucesso",
      description: "O código do chip foi registrado.",
    });
    onScanningClose();
  };

  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => handleScanResult(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
        <CardContent className="pt-6 space-y-8">
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Tenha o novo chip SIM card com você</h2>
                <p className="text-gray-600">
                  Compre o chip pré-pago sem cadastro nas lojas de qualquer comércio. Não pode comprar nas lojas Vivo.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Só coloque o chip SIM card no aparelho quando concluir a troca</h2>
                <p className="text-gray-600">
                  Assim você tem certeza de que a linha já está vinculada ao novo chip SIM card
                </p>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Confira como você encontra o código de barras do SIM card</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
                <p className="text-gray-600">
                  O código de barras está impresso no cartão do Vivo Chip, tem 20 números e começa com 8955, conforme o exemplo:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                  <img 
                    src="/lovable-uploads/06e11f81-b8d8-4bd1-8412-e680efe9803f.png" 
                    alt="Exemplo de código de barras do SIM card"
                    className="w-[90%] h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Escaneie o código de barra do chip</h2>
              <div className="space-y-4">
                {selectedLines.map((line, index) => (
                  <div key={line.id} className="flex flex-col space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Código de barras do SIM card</p>
                          <p className="text-sm text-gray-500">Linha: {line.ddd}</p>
                        </div>
                        <Button
                          onClick={() => onStartScanning(index)}
                          className="bg-[#8425af] hover:bg-[#6c1e8f]"
                        >
                          {line.barcode ? 'Escanear novamente' : 'Escanear código'}
                        </Button>
                      </div>
                    </div>
                    {line.barcode && (
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm font-medium text-gray-700">Código escaneado:</p>
                        <p className="text-sm font-mono">{line.barcode}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={onBack}
              type="button"
            >
              Voltar
            </Button>
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f]"
              onClick={onContinue}
              disabled={currentStep === 6 && selectedLines.some(line => !line.barcode)}
              type="button"
            >
              {currentStep === 6 ? 'Finalizar' : 'Continuar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}