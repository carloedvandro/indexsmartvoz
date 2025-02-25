
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InternetOption {
  value: string;
  label: string;
  price: number;
}

interface InternetSelectorProps {
  selectedInternet: string | undefined;
  onInternetChange: (value: string) => void;
  internetOptions: InternetOption[];
}

export function InternetSelector({ 
  selectedInternet, 
  onInternetChange, 
  internetOptions 
}: InternetSelectorProps) {
  return (
    <div>
      <span className="text-sm font-medium mb-1 block">Internet</span>
      <Select value={selectedInternet} onValueChange={onInternetChange}>
        <SelectTrigger className="bg-white h-[42px] border-[#8425af] focus:ring-[#8425af] hover:border-[#8425af]">
          <SelectValue placeholder="Escolher o plano" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-white max-h-[179px] overflow-y-auto w-full">
          {internetOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="hover:bg-[#8425af] hover:text-white focus:bg-[#8425af] focus:text-white"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
