import { ReactNode } from "react";

interface ScannerContainerProps {
  children: ReactNode;
}

export function ScannerContainer({ children }: ScannerContainerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-[420px] mx-auto">
        {children}
      </div>
    </div>
  );
}