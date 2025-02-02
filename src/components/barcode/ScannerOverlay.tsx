interface ScannerOverlayProps {
  error: string | null;
}

export function ScannerOverlay({ error }: ScannerOverlayProps) {
  return (
    <>
      <div className="absolute inset-0 border-2 border-[#8425af] rounded pointer-events-none">
        <div className="absolute inset-x-0 top-[48%] bottom-[48%] bg-[#8425af]/10 border-y border-[#8425af]" />
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-500 text-center">
          {error}
        </div>
      )}
    </>
  );
}