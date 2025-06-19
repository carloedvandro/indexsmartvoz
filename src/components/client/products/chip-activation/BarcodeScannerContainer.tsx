
import { BarcodeScanner } from "./BarcodeScanner";

interface BarcodeScannerContainerProps {
  scanningIndex: number | null;
  onUpdateBarcode: (index: number, barcode: string) => void;
  onScanningClose: () => void;
}

export function BarcodeScannerContainer({
  scanningIndex,
  onUpdateBarcode,
  onScanningClose
}: BarcodeScannerContainerProps) {
  if (scanningIndex === null) {
    return null;
  }
  
  return (
    <BarcodeScanner
      onResult={(result) => onUpdateBarcode(scanningIndex, result)}
      onClose={onScanningClose}
    />
  );
}
