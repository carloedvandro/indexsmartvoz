import { cn } from "@/lib/utils";

type LaserStyle = "line" | "cross" | "corners" | "frame" | "scanner";

interface ScannerOverlayProps {
  laserStyle?: LaserStyle;
}

export function ScannerOverlay({ laserStyle = "line" }: ScannerOverlayProps) {
  const getLaserContent = () => {
    switch (laserStyle) {
      case "line":
        return (
          <div className="absolute left-0 w-full h-0.5 bg-red-600 animate-scanner" />
        );
      case "cross":
        return (
          <>
            <div className="absolute left-0 w-full h-0.5 bg-red-600" />
            <div className="absolute top-0 w-0.5 h-full bg-red-600" />
          </>
        );
      case "corners":
        return (
          <>
            {/* Cantos superiores */}
            <div className="absolute top-0 left-0 w-8 h-0.5 bg-red-600" />
            <div className="absolute top-0 left-0 w-0.5 h-8 bg-red-600" />
            <div className="absolute top-0 right-0 w-8 h-0.5 bg-red-600" />
            <div className="absolute top-0 right-0 w-0.5 h-8 bg-red-600" />
            {/* Cantos inferiores */}
            <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-600" />
            <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-red-600" />
            <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-red-600" />
            <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-red-600" />
          </>
        );
      case "frame":
        return (
          <div className="absolute inset-0 border-2 border-red-600 animate-pulse" />
        );
      case "scanner":
        return (
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-red-600 to-transparent animate-scanner" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[280px] h-[100px] border-2 border-[#8425af] rounded-lg">
        {getLaserContent()}
      </div>
    </div>
  );
}