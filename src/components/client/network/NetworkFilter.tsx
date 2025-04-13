
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface NetworkFilterProps {
  filterTerm: string;
  setFilterTerm: (value: string) => void;
}

export const NetworkFilter = ({ filterTerm, setFilterTerm }: NetworkFilterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar membro na rede..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="pl-10 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};
