
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
  disabled?: boolean;
}

export function DDDInput({ ddd, onDDDChange, disabled = false }: DDDInputProps) {
  // Lista de DDDs do Brasil
  const ddds = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", // São Paulo
    "21", "22", "24", // Rio de Janeiro
    "27", "28", // Espírito Santo
    "31", "32", "33", "34", "35", "37", "38", // Minas Gerais
    "41", "42", "43", "44", "45", "46", // Paraná
    "47", "48", "49", // Santa Catarina
    "51", "53", "54", "55", // Rio Grande do Sul
    "61", // Distrito Federal
    "62", "64", // Goiás
    "63", // Tocantins
    "65", "66", // Mato Grosso
    "67", // Mato Grosso do Sul
    "68", // Acre
    "69", // Rondônia
    "71", "73", "74", "75", "77", // Bahia
    "79", // Sergipe
    "81", "87", // Pernambuco
    "82", // Alagoas
    "83", // Paraíba
    "84", // Rio Grande do Norte
    "85", "88", // Ceará
    "86", "89", // Piauí
    "91", "93", "94", // Pará
    "92", "97", // Amazonas
    "95", // Roraima
    "96", // Amapá
    "98", "99", // Maranhão
  ];

  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium">DDD</label>
      <Select value={ddd} onValueChange={onDDDChange} disabled={disabled}>
        <SelectTrigger 
          className={`bg-white h-[40px] border-[#8425af] focus:ring-[#8425af] hover:border-[#8425af] focus:border-[#8425af] text-left pl-3 text-sm w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <SelectValue placeholder="Selecione o DDD" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-white max-h-[178px] overflow-y-auto w-full">
          {ddds.map((dddOption) => (
            <SelectItem 
              key={dddOption} 
              value={dddOption}
              className="cursor-pointer py-1.5 px-2 bg-white hover:bg-white focus:bg-white focus:text-[#8425af] data-[state=checked]:bg-white data-[state=checked]:text-[#8425af]"
            >
              {dddOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
