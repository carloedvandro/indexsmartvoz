
import { useState } from "react";
import { EIDScanner } from "./EIDScanner";
import { Button } from "@/components/ui/button";

type EIDFormProps = {
  onSubmit: (eid: string) => void;
  onBack: () => void;
  deviceType: 'android' | 'ios';
};

export function EIDForm({ onSubmit, onBack, deviceType }: EIDFormProps) {
  const [showScanner, setShowScanner] = useState(false);

  const handleStartScanning = () => {
    setShowScanner(true);
  };

  const handleScanResult = (eid: string) => {
    console.log("📋 [EID-FORM] EID escaneado:", eid);
    setShowScanner(false);
    onSubmit(eid);
  };

  const handleBackFromScanner = () => {
    setShowScanner(false);
  };

  if (showScanner) {
    return (
      <EIDScanner
        onResult={handleScanResult}
        onBack={handleBackFromScanner}
        deviceType={deviceType}
      />
    );
  }

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6 pt-44">
      <div className="text-center space-y-2">
        
        <h2 className="text-xl font-semibold text-gray-800">Escaneamento do EID</h2>
        <p className="text-gray-600 text-sm max-w-[320px] mx-auto">
          Vamos escanear o código EID do seu dispositivo para ativar o eSIM
        </p>
      </div>

      <div className="space-y-4 text-sm text-gray-600">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Como encontrar o EID:</h3>
          <ol className="space-y-1 text-blue-700">
            <li>1. Ligue para *#06# no seu celular</li>
            <li>2. Procure pela linha "EID" na tela</li>
            <li>3. O EID tem 32 dígitos e letras</li>
            <li>4. Clique em "Escanear EID" abaixo</li>
          </ol>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Importante:</strong> Certifique-se de que o EID esteja bem visível na tela 
            antes de iniciar o escaneamento.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mt-8 gap-4">
        <Button 
          type="button"
          variant="outline"
          className="flex-1 border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          type="button"
          className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3"
          onClick={handleStartScanning}
        >
          Escanear EID
        </Button>
      </div>
    </div>
  );
}
