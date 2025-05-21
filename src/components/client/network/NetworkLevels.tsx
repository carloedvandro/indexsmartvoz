
import React from "react";
import { ChevronDown } from "lucide-react";

interface NetworkLevelsProps {
  level: string;
  onChange: (level: string) => void;
}

export const NetworkLevels: React.FC<NetworkLevelsProps> = ({ level, onChange }) => {
  const levels = [
    { value: "all", label: "Todos os Níveis" },
    { value: "1", label: "Nível 1" },
    { value: "2", label: "Nível 2" },
    { value: "3", label: "Nível 3" },
    { value: "4", label: "Nível 4" }
    // Removido níveis acima de 4
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const selectedLabel = levels.find((l) => l.value === level)?.label || "Todos os Níveis";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white w-full flex items-center justify-between px-4 py-2 border rounded-md"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          {levels.map((l) => (
            <button
              key={l.value}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                l.value === level ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onChange(l.value);
                setIsOpen(false);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
