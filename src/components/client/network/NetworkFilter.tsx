import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="p-4">
      <div className="flex flex-col space-y-2">
        {levels.map((level) => (
          <Button
            key={level.value}
            variant={selectedLevel === level.value ? "default" : "outline"}
            className="w-full justify-start text-left"
            onClick={() => onLevelChange(level.value)}
          >
            {level.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};