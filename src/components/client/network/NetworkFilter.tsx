
import { Button } from "@/components/ui/button";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

const NETWORK_LEVELS = [
  { value: "1", label: "1° Nível" },
  { value: "2", label: "2° Nível" },
  { value: "3", label: "3° Nível" },
  { value: "4", label: "4° Nível" },
  { value: "all", label: "Todos os Níveis" },
] as const;

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full max-w-[300px]">
      {NETWORK_LEVELS.map((level) => (
        <Button
          key={level.value}
          variant={level.value === "all" ? "default" : "outline"}
          className={`w-full justify-start text-left px-4 rounded-lg overflow-hidden ${
            level.value === "all" ? "bg-purple-700 hover:bg-purple-800 text-white" : 
            selectedLevel === level.value ? "bg-gray-100" : ""
          }`}
          onClick={() => onLevelChange(level.value)}
        >
          {level.label}
        </Button>
      ))}
    </div>
  );
}
