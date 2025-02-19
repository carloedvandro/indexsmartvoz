
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
          variant={selectedLevel === level.value ? "default" : "outline"}
          className="w-full justify-between text-left px-4"
          onClick={() => onLevelChange(level.value)}
        >
          <span>{level.label}</span>
          <span className="opacity-0">→</span>
        </Button>
      ))}
    </div>
  );
};
