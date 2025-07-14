
interface StatusDisplayProps {
  status: string;
}

export const StatusDisplay = ({ status }: StatusDisplayProps) => {
  return (
    <>
      <div className="mt-3 text-lg text-white text-center">
        Posicione o documento na área visível
      </div>

      <div className="text-white text-center mt-0.5 min-h-[24px] px-4">
        {status}
      </div>
    </>
  );
};
