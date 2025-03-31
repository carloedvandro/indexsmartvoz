
import React from "react";
import { Plus, Minus } from "lucide-react";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:text-primary rounded-full flex-shrink-0"
      style={{ marginTop: '4mm', marginLeft: '-0.5mm' }}
      aria-label={isExpanded ? "Recolher" : "Expandir"}
    >
      {isExpanded ? (
        <Minus
          className="h-4 w-4"
          style={{ color: '#660099', strokeWidth: 3 }}
        />
      ) : (
        <Plus
          className="h-4 w-4"
          style={{ color: '#660099', strokeWidth: 3 }}
        />
      )}
    </button>
  );
};
