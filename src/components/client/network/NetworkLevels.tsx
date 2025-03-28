
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NetworkLevels() {
  const [searchParams, setSearchParams] = useSearchParams();

  const levels = [
    { title: "1° Nível", value: "1" },
    { title: "2° Nível", value: "2" },
    { title: "3° Nível", value: "3" },
    { title: "4° Nível", value: "4" },
    { title: "Todos os Níveis", value: "all" }
  ];

  const currentLevel = searchParams.get("level") || "1";

  const handleLevelClick = (level: string) => {
    setSearchParams({ level });
  };

  return (
    <div className="space-y-2">
      {levels.map((level) => (
        <Button
          key={level.value}
          variant={level.value === currentLevel ? "default" : "outline"}
          className={
            level.value === currentLevel
              ? "w-full bg-[#5438a0] hover:bg-[#4a3195]"
              : level.value === "all"
                ? "w-full bg-[#5438a0] text-white hover:bg-[#4a3195]"
                : "w-full border-[#5438a0] text-[#5438a0] hover:bg-[#5438a0] hover:text-white"
          }
          onClick={() => handleLevelClick(level.value)}
        >
          {level.title}
        </Button>
      ))}
    </div>
  );
}
