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
  onSelect?: (value: string) => void;
  internetOptions: InternetOption[];
  plans?: any[];
}

export function InternetSelector({ 
  selectedInternet, 
  onInternetChange,
  onSelect,
  internetOptions,
  plans = [] 
}: InternetSelectorProps) {
  const handleChange = (value: string) => {
    onInternetChange(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  const options = plans.length > 0 ? plans : internetOptions;

  return (
    <div>
      <span className="text-sm font-medium mb-1 block">Internet</span>
      <Select value={selectedInternet} onValueChange={handleChange}>
        <SelectTrigger className="bg-white h-[42px]">
          <SelectValue placeholder="Escolher o plano" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem 
              key={option.value || option.code} 
              value={option.value || option.code}
              className="hover:bg-[#8425af] hover:text-white focus:bg-[#8425af] focus:text-white"
            >
              {option.label || option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}