
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const maxWidth = isMobile ? '320px' : '412px';
  
  return (
    <div className="sticky top-20 z-10 space-y-2 w-full" style={{ maxWidth }}>
      {NETWORK_LEVELS.map((level) => (
        <Button
          key={level.value}
          variant="outline"
          className={`w-full text-left px-4 py-3 rounded-lg transition-all relative hover:bg-transparent
            ${level.value === selectedLevel && level.value !== 'all'
              ? 'ring-2 ring-[#8425af] ring-offset-0 border-none bg-transparent before:absolute before:inset-[1px] before:border before:border-[#8425af] before:rounded-[7px] text-[#8425af]'
              : level.value === 'all'
                ? "bg-[#5f0889] text-white hover:bg-[#5f0889]"
                : "border border-[#8425af] hover:border-[#8425af] hover:text-[#8425af]"
            }`}
          onClick={() => onLevelChange(level.value)}
        >
          <span>{level.label}</span>
        </Button>
      ))}
    </div>
  );
}
