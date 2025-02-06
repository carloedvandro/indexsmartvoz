
import { InternetSelector } from "../InternetSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Line {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
}

interface PlanSelectionFormProps {
  selectedLines: Line[];
  onInternetChange: (value: string) => void;
  onDDDChange: (value: string) => void;
  internetOptions: { value: string; label: string; price: number; }[];
  ddds: string[];
  isFreePlan: boolean;
}

export function PlanSelectionForm({
  selectedLines,
  onInternetChange,
  onDDDChange,
  internetOptions,
  ddds,
  isFreePlan
}: PlanSelectionFormProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full">
        <InternetSelector
          selectedInternet={selectedLines[0]?.internet || undefined}
          onInternetChange={onInternetChange}
          internetOptions={internetOptions}
        />
      </div>
      {!isFreePlan && (
        <div className="w-full">
          <span className="text-sm font-medium mb-1 block">DDD</span>
          <Select value={selectedLines[0]?.ddd || ""} onValueChange={onDDDChange}>
            <SelectTrigger className="bg-white h-[42px]">
              <SelectValue placeholder="DDD" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white max-h-[178px] overflow-y-auto w-full">
              {ddds.map((dddOption) => (
                <SelectItem 
                  key={dddOption} 
                  value={dddOption}
                  className="hover:bg-[#8425af] hover:text-white focus:bg-[#8425af] focus:text-white"
                >
                  {dddOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
