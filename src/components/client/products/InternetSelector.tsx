
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
  showPrice?: boolean;
}

export function InternetSelector({ 
  selectedInternet, 
  onInternetChange, 
  internetOptions,
  showPrice = true
}: InternetSelectorProps) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium">Internet</label>
      <Select value={selectedInternet} onValueChange={onInternetChange}>
        <SelectTrigger className="bg-white h-[40px] border-[#8425af] focus:ring-[#8425af] hover:border-[#8425af] focus:border-[#8425af] text-sm w-[163px]">
          <SelectValue placeholder="Escolher o plano" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="bg-white max-h-[179px] overflow-y-auto w-auto min-w-[163px]"
          align="start"
          sideOffset={5}
        >
          {internetOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="cursor-pointer py-1.5 px-2 bg-white hover:bg-white focus:bg-white focus:text-[#8425af] data-[state=checked]:bg-white data-[state=checked]:text-[#8425af]"
            >
              <span>{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
