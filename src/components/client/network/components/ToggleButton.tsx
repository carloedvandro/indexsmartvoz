
import { RotateCw } from "lucide-react";

interface ToggleButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const ToggleButton = ({ isExpanded, onToggle }: ToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="p-1 hover:text-primary rounded-full flex-shrink-0"
      style={{ marginTop: '4mm', marginLeft: '-0.5mm' }}
      aria-label={isExpanded ? "Recolher" : "Expandir"}
    >
      <RotateCw 
        className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        style={{ color: '#660099' }}
      />
    </button>
  );
};
