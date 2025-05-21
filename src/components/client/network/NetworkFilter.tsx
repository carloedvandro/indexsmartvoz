
import { motion } from "framer-motion";
import { useState } from "react";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  const levels = [
    { value: "all", label: "Todos os Níveis" },
    { value: "1", label: "Nível 1" },
    { value: "2", label: "Nível 2" },
    { value: "3", label: "Nível 3" },
    { value: "4", label: "Nível 4" }
    // Removido os níveis 5 e 6, já que o sistema é limitado a 4 níveis
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Filtrar por Nível</h3>
      <div className="space-y-2">
        {levels.map((level) => (
          <motion.button
            key={level.value}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedLevel === level.value
                ? "bg-[#8425af]/10 text-[#8425af] font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onLevelChange(level.value)}
            whileTap={{ scale: 0.98 }}
          >
            {level.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
