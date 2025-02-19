
import { CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (value: string) => void;
}

export const NetworkFilter = ({
  selectedLevel,
  onLevelChange,
}: NetworkFilterProps) => {
  return (
    <div>
      <CardTitle className="text-lg font-semibold mb-4">
        Filtrar por Graduação
      </CardTitle>
      <RadioGroup
        value={selectedLevel}
        onValueChange={onLevelChange}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all">Todos</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id="level1" />
          <Label htmlFor="level1">Graduação 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="2" id="level2" />
          <Label htmlFor="level2">Graduação 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id="level3" />
          <Label htmlFor="level3">Graduação 3</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="4" id="level4" />
          <Label htmlFor="level4">Graduação 4</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="5" id="level5" />
          <Label htmlFor="level5">Graduação 5</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
