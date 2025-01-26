interface CaptureStatusProps {
  isAligned: boolean;
  countdown: number | null;
  side: "front" | "back";
  isCaptured: boolean;
}

export function CaptureStatus({ isAligned, countdown, side, isCaptured }: CaptureStatusProps) {
  if (isCaptured) {
    return (
      <p className="text-center text-sm text-gray-500">
        Clique em repetir caso a imagem não esteja legível
      </p>
    );
  }

  if (isAligned) {
    return (
      <p className="text-center text-sm text-gray-500">
        {countdown !== null
          ? `Mantenha o documento parado. Capturando em ${countdown} segundos...`
          : "Mantenha o documento parado..."}
      </p>
    );
  }

  return (
    <p className="text-center text-sm text-gray-500">
      {side === "front"
        ? "Centralize a frente do documento no retângulo"
        : "Agora centralize o verso do documento"}
    </p>
  );
}