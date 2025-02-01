import { Input } from "@/components/ui/input";

interface DDDInputProps {
  ddd: string;
  onDDDChange: (value: string) => void;
}

export function DDDInput({ ddd, onDDDChange }: DDDInputProps) {
  return (
    <div className="flex flex-col relative">
      <span className="text-sm text-gray-600 absolute -top-6">DDD</span>
      <Input 
        placeholder="DDD" 
        maxLength={2} 
        className="bg-white h-[52px] pt-1" 
        value={ddd}
        onChange={(e) => onDDDChange(e.target.value)}
      />
    </div>
  );
}