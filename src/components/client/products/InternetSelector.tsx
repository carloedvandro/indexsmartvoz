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
  selectedInternet: string;
  onInternetChange: (value: string) => void;
  internetOptions: InternetOption[];
}

export function InternetSelector({ 
  selectedInternet, 
  onInternetChange, 
  internetOptions 
}: InternetSelectorProps) {
  return (
    <Select value={selectedInternet} onValueChange={onInternetChange}>
      <SelectTrigger className="bg-white h-[52px] relative">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-600 absolute -top-6 transition-all">Internet</span>
          <SelectValue className="pt-1" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white">
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
  );
}