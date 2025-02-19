
import { Button } from "@/components/ui/button";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  const levels = [
    { value: "1", label: "1° Nível" },
    { value: "2", label: "2° Nível" },
    { value: "3", label: "3° Nível" },
    { value: "4", label: "4° Nível" },
    { value: "all", label: "Todos os Níveis" },
  ];

  return (
    <div className="flex flex-col space-y-2 w-full">
      {levels.map((level) => (
        <Button
          key={level.value}
          variant="outline"
          className={`w-full text-left px-4 ${
            level.value === "all" 
              ? "bg-[#660099] hover:bg-[#4B0082] text-white border-0" 
              : selectedLevel === level.value
              ? "bg-[#660099] hover:bg-[#4B0082] text-white border-0"
              : "bg-white hover:bg-gray-50 border-0"
          }`}
          onClick={() => onLevelChange(level.value)}
        >
          {level.label}
        </Button>
      ))}
    </div>
  );
};
