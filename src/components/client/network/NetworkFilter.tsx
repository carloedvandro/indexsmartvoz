
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
    <div className="sticky top-20 z-10">
      {NETWORK_LEVELS.map((level) => (
        <Button
          key={level.value}
          variant={selectedLevel === level.value ? "default" : "outline"}
          className={`w-full text-left px-4 mb-2 rounded-lg overflow-hidden ${
            selectedLevel === level.value 
              ? "bg-[#5f0889] hover:bg-[#4a0668]" 
              : "hover:bg-[#5f0889] hover:text-white"
          } ${level.value === 'all' ? 'justify-center' : 'justify-between'}`}
          onClick={() => onLevelChange(level.value)}
        >
          <span>{level.label}</span>
          {level.value !== 'all' && <span className="opacity-0">→</span>}
        </Button>
      ))}
    </div>
  );
}
