import { cn } from "@/lib/utils";

type LaserStyle = "line";

interface ScannerOverlayProps {
  laserStyle?: LaserStyle;
}

export function ScannerOverlay({ laserStyle = "line" }: ScannerOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[284px] h-[100px] border-2 border-[#8425af] rounded-lg">
        <div className="absolute left-0 w-full h-0.5 bg-red-600 animate-scanner" />
      </div>
    </div>
  );
}