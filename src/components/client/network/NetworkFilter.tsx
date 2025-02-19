
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
    <div className="flex flex-col">
      {levels.slice(0, 4).map((level) => (
        <Button
          key={level.value}
          variant={selectedLevel === level.value ? "default" : "outline"}
          className="w-full justify-start px-4 rounded-none"
          onClick={() => onLevelChange(level.value)}
        >
          {level.label}
        </Button>
      ))}
      
      <Button
        variant={selectedLevel === "all" ? "default" : "outline"}
        className="w-full justify-start px-4 rounded-none bg-purple-700 text-white hover:bg-purple-800"
        onClick={() => onLevelChange("all")}
      >
        Todos os Níveis
      </Button>
    </div>
  );
};
