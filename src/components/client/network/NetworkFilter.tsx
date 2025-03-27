
import { Button } from "@/components/ui/button";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useProfile } from "@/hooks/useProfile";

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
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  const getLevelCount = (level: string) => {
    if (!networkStats) return 0;
    
    switch (level) {
      case "1": return networkStats.level1Count;
      case "2": return networkStats.level2Count;
      case "3": return networkStats.level3Count;
      case "4": return networkStats.level4Count;
      default: return 0;
    }
  };

  return (
    <div className="sticky top-20 z-10 space-y-2">
      {NETWORK_LEVELS.map((level) => (
        <Button
          key={level.value}
          variant="outline"
          className={`w-full justify-between text-left px-4 py-3 rounded-lg transition-all relative hover:bg-transparent
            ${level.value === selectedLevel && level.value !== 'all'
              ? 'ring-2 ring-[#8425af] ring-offset-0 border-none bg-transparent before:absolute before:inset-[1px] before:border before:border-[#8425af] before:rounded-[7px] text-[#8425af]'
              : level.value === 'all'
                ? "bg-[#5f0889] text-white hover:bg-[#5f0889]"
                : "border border-[#8425af] hover:border-[#8425af] hover:text-[#8425af]"
            }`}
          onClick={() => onLevelChange(level.value)}
        >
          <span>{level.label}</span>
          {level.value !== 'all' && (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {getLevelCount(level.value)}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
