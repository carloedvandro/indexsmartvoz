
import { Input } from "@/components/ui/input";

type IMEIInputProps = {
  imei: string;
  onChange: (value: string) => void;
  isValid: boolean;
};

export function IMEIInput({ imei, onChange, isValid }: IMEIInputProps) {
  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="Digite o IMEI"
        value={imei}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 15) {
            onChange(value);
          }
        }}
        className="w-full text-center text-lg rounded-lg border border-[#8425af] focus:outline-none focus:ring-0 focus:border-[#8425af] hover:border-[#8425af]"
      />
      <p className="text-xs text-gray-500 text-center">
        {15 - imei.length} dígitos restantes
      </p>
    </div>
  );
}
