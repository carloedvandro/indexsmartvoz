
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NetworkLevels() {
  const [searchParams, setSearchParams] = useSearchParams();

  const levels = [
    { title: "1° Nível", value: "1" },
    { title: "2° Nível", value: "2" },
    { title: "3° Nível", value: "3" },
    { title: "4° Nível", value: "4" },
  ];

  const currentLevel = searchParams.get("level") || "1";

  const handleLevelClick = (level: string) => {
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("level", level);
      return newParams;
    });
  };

  return (
    <Card className="p-4 mb-6 bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-3">Níveis da Rede</h3>
      <div className="flex flex-col gap-2">
        {levels.map((level) => (
          <Button
            key={level.value}
            variant={currentLevel === level.value ? "default" : "outline"}
            className={`w-full justify-start ${
              currentLevel === level.value
                ? "bg-[#5438a0] hover:bg-[#4a3195] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleLevelClick(level.value)}
          >
            {level.title}
          </Button>
        ))}
      </div>
    </Card>
  );
}
