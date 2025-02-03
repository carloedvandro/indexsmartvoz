interface DDDInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DDDInput({ value, onChange }: DDDInputProps) {
  return (
    <div>
      <span className="text-sm font-medium mb-1 block">DDD</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o DDD"
        className="w-full h-[42px] px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8425af] focus:border-transparent"
        maxLength={2}
      />
    </div>
  );
}