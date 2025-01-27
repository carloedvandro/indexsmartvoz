interface StepHeaderProps {
  step: string;
}

export function StepHeader({ step }: StepHeaderProps) {
  const getTitle = () => {
    switch (step) {
      case "cpf":
        return "Vamos confirmar sua identidade";
      case "camera-tips":
        return "Prepare sua câmera";
      case "facial":
        return "Captura Facial";
      case "document-tips":
        return "Prepare seu documento";
      case "document-type":
        return "Selecione o documento";
      case "document-front":
        return "Documento - Frente";
      case "document-back":
        return "Documento - Verso";
      case "processing":
        return "Processando";
      case "complete":
        return "Deu certo!";
      default:
        return "";
    }
  };

  return (
    <h2 className="text-lg font-semibold text-center">
      {getTitle()}
    </h2>
  );
}