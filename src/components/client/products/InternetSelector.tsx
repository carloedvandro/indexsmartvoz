
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
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium">Internet</label>
      <Select value={selectedInternet} onValueChange={onInternetChange}>
        <SelectTrigger className="bg-white h-[40px] border-[#5f0889] focus:ring-[#5f0889] hover:border-[#5f0889] focus:border-[#5f0889] text-sm w-full">
          <SelectValue placeholder="Escolher o plano" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-white max-h-[179px] overflow-y-auto w-full">
          {internetOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="cursor-pointer py-1.5 px-2 bg-white hover:bg-[#5f0889] hover:text-white focus:bg-[#5f0889] focus:text-white data-[state=checked]:bg-[#5f0889] data-[state=checked]:text-white"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
