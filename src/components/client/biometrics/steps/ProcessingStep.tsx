export function ProcessingStep() {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Processando</h3>
        <p className="text-sm text-gray-500">
          Aguarde enquanto processamos suas imagens...
        </p>
      </div>
    </div>
  );
}