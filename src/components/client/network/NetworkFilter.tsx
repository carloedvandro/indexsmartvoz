import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (value: string) => void;
}

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Filtrar por nível:</span>
      </div>
      <Select
        value={selectedLevel}
        onValueChange={onLevelChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o nível" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os níveis</SelectItem>
          <SelectItem value="1">Nível 1</SelectItem>
          <SelectItem value="2">Nível 2</SelectItem>
          <SelectItem value="3">Nível 3</SelectItem>
          <SelectItem value="4">Nível 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};