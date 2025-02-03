import React from 'react';
import { Button } from "../ui/button";

interface ScannerControlsProps {
  onClose: () => void;
  onConfirm: () => void;
  showConfirm: boolean;
}

export function ScannerControls({ onClose, onConfirm, showConfirm }: ScannerControlsProps) {
  return (
    <div className="mt-4 text-center space-y-2">
      <p className="text-sm text-gray-600">
        Posicione o código de barras do chip dentro da área
      </p>
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
        >
          Cancelar
        </Button>
        {showConfirm && (
          <Button
            onClick={onConfirm}
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          >
            Confirmar
          </Button>
        )}
      </div>
    </div>
  );
}