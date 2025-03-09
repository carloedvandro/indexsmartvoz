
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
          variant="outline"
          className={`w-full justify-between text-left px-4 py-3 rounded-lg transition-all relative hover:bg-transparent
            ${level.value === selectedLevel && level.value !== 'all'
              ? 'ring-2 ring-[#5f0889] ring-offset-0 border-none bg-transparent before:absolute before:inset-[1px] before:border before:border-[#5f0889] before:rounded-[7px] text-[#5f0889]'
              : level.value === 'all'
                ? "bg-[#5f0889] text-white hover:bg-[#5f0889]"
                : "border border-[#5f0889] hover:border-[#5f0889] hover:text-[#5f0889]"
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
