export function BarcodeInstructions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Confira como você encontra o código de barras do SIM card</h2>
      
      <div className="flex items-center justify-between max-w-xl mx-auto relative">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#8425af] flex items-center justify-center text-white">✓</div>
          <span className="text-sm font-medium text-gray-700">Identidade</span>
        </div>

        <div className="flex-1 h-[2px] bg-[#8425af]"></div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#8425af] border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <span className="text-sm font-medium text-[#8425af]">SIM Card</span>
        </div>

        <div className="flex-1 h-[2px] bg-gray-200"></div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          </div>
          <span className="text-sm font-medium text-gray-500">Linhas</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
        <p className="text-gray-600">
          O código de barras está impresso no cartão do Chip, tem 20 números e começa com 8955, conforme o exemplo:
        </p>

        <div className="mt-8 flex justify-center">
          <img 
            src="/lovable-uploads/d69533d2-3f69-40d2-a116-76c824330a2a.png" 
            alt="Exemplo de código de barras do chip"
            className="max-w-[1000px] w-full"
          />
        </div>
      </div>
    </div>
  );
}