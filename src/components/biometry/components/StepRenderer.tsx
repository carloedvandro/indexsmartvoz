
import { BiometryFlowState } from "../hooks/useBiometryFlow";

interface StepRendererProps {
  state: BiometryFlowState;
  onNext: () => void;
  onError: (error: string) => void;
  onComplete?: (data: any) => void;
}

export const StepRenderer = ({ state, onNext, onError, onComplete }: StepRendererProps) => {
  const renderStep = () => {
    switch (state.currentStep) {
      case 'instructions':
        return (
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-4">Verificação Biométrica</h2>
            <p className="mb-6">Vamos fazer sua verificação facial</p>
            <button 
              onClick={onNext}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Iniciar
            </button>
          </div>
        );
      
      case 'camera':
        return (
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-4">Câmera</h2>
            <p className="mb-6">Posicione seu rosto na câmera</p>
            <button 
              onClick={onNext}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Capturar
            </button>
          </div>
        );
      
      case 'processing':
        return (
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-4">Processando...</h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">Sucesso!</h2>
            <p className="mb-6">Verificação concluída</p>
            <button 
              onClick={() => onComplete?.({ verified: true })}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Continuar
            </button>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-4 text-red-600">Erro</h2>
            <p className="mb-6">{state.error}</p>
            <button 
              onClick={() => onError('Erro na verificação')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
};
