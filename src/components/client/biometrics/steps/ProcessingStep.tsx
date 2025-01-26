export function ProcessingStep() {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="flex justify-center">
        <div className="w-32 h-32 bg-purple-100 rounded-lg flex items-center justify-center">
          <img 
            src="/lovable-uploads/10d7ad3a-1267-437b-867e-92233f1f538f.png" 
            alt="Document analysis"
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Analisando imagem</h3>
        <p className="text-sm text-gray-500">
          Estamos analisando a imagem
        </p>
        <p className="text-purple-600 font-medium">
          Carregando...
        </p>
      </div>
    </div>
  );
}