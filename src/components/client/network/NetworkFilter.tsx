
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
    <div className="sticky top-20 z-10 space-y-2">
      {NETWORK_LEVELS.map((level) => (
        <Button
          key={level.value}
          variant={selectedLevel === level.value ? "default" : "outline"}
          className={`w-full justify-between text-left px-4 py-3 rounded-lg transition-all ${
            level.value === 'all' 
              ? selectedLevel === level.value 
                ? "bg-[#8425af] hover:bg-[#6c1e8f] text-white"
                : "border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              : selectedLevel === level.value 
                ? "border border-[#8425af] text-[#8425af] bg-white"
                : "border border-gray-200 hover:border-[#8425af] hover:bg-white hover:text-[#8425af]"
          }`}
          onClick={() => onLevelChange(level.value)}
        >
          <span>{level.label}</span>
          <span className="opacity-0">→</span>
        </Button>
      ))}
    </div>
  );
}
