
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DDDInputProps {
  ddd: string;
  onDDDChange: (value: string) => void;
}

export function DDDInput({ ddd, onDDDChange }: DDDInputProps) {
  // Lista de DDDs mais comuns
  const ddds = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", 
    "21", "22", "24", "27", "28", "31", "32", "33", "34", 
    "35", "37", "38", "41", "42", "43", "44", "45", "46", 
    "47", "48", "49", "51", "53", "54", "55", "61", "62", 
    "63", "64", "65", "66", "67", "68", "69", "71", "73", 
    "74", "75", "77", "79", "81", "82", "83", "84", "85", 
    "86", "87", "88", "89", "91", "92", "93", "94", "95", 
    "96", "97", "98", "99"
  ];

  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium">DDD</label>
      <Select value={ddd} onValueChange={onDDDChange}>
        <SelectTrigger className="bg-white h-[40px] border-[#8425af] focus:ring-[#8425af] hover:border-[#8425af] focus:border-[#8425af] text-sm w-full">
          <SelectValue placeholder="Selecione o DDD" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-white max-h-[179px] overflow-y-auto w-full">
          {ddds.map((dddOption) => (
            <SelectItem 
              key={dddOption} 
              value={dddOption}
              className="cursor-pointer py-1.5 px-2 bg-white hover:bg-[#8425af] hover:text-white focus:bg-[#8425af] focus:text-white data-[state=checked]:bg-[#8425af] data-[state=checked]:text-white"
            >
              {dddOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
