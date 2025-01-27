interface StepHeaderProps {
  step: string;
}

export function StepHeader({ step }: StepHeaderProps) {
  const getTitle = () => {
    switch (step) {
      case "cpf":
        return "Validação Biométrica";
      case "camera-tips":
        return "Libere acesso à câmera";
      case "facial-tips":
        return "Dica para captura das imagens";
      case "facial":
        return "Enquadre o rosto para captura de selfie";
      case "facial-processing":
        return "Imagem em análise";
      case "document-tips":
        return "Dicas para captura de documento";
      case "document-type":
        return "Selecione o tipo de documento";
      case "document-front":
        return "Enquadre o documento para captura";
      case "document-processing":
        return "Imagem em análise";
      case "complete":
        return "Biometria Concluída!";
      default:
        return "";
    }
  };

  return (
    <div className="text-center space-y-2">
      <h2 className="text-lg font-semibold">
        {getTitle()}
      </h2>
      {step.includes("processing") && (
        <p className="text-sm text-gray-500">
          Aguarde um instante
        </p>
      )}
    </div>
  );
}