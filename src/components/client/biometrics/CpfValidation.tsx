import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateCPF } from "@/utils/cpfValidation";
import { AlertCircle } from "lucide-react";

interface CpfValidationProps {
  onValidCpf: (cpf: string) => void;
}

export function CpfValidation({ onValidCpf }: CpfValidationProps) {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setCpf(value);
    setError("");
  };

  const handleSubmit = () => {
    if (validateCPF(cpf)) {
      onValidCpf(cpf);
    } else {
      setError("CPF inválido. Por favor, verifique os números digitados.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Digite seu CPF</h3>
        <p className="text-sm text-gray-500">
          Precisamos do seu CPF para iniciar a validação
        </p>
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Digite apenas os números"
          value={cpf}
          onChange={handleCpfChange}
          maxLength={11}
          className="text-center text-lg"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={cpf.length !== 11}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Continuar
      </Button>
    </div>
  );
}