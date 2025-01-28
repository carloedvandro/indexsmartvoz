import { Button } from "@/components/ui/button";
import { CreditCard, FileText } from "lucide-react";

interface DocumentTypeSelectorProps {
  documentType: "rg" | "cnh" | "outro";
  onSelect: (type: "rg" | "cnh" | "outro") => void;
}

export function DocumentTypeSelector({ documentType, onSelect }: DocumentTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Selecione o Documento</h3>
        <p className="text-sm text-gray-500">
          Escolha qual documento você deseja utilizar para a validação
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={documentType === "rg" ? "default" : "outline"}
          onClick={() => onSelect("rg")}
          className={`flex flex-col items-center p-6 gap-2 ${
            documentType === "rg" ? "bg-purple-600 hover:bg-purple-700" : ""
          }`}
        >
          <CreditCard className="h-8 w-8" />
          <span>RG</span>
        </Button>

        <Button
          variant={documentType === "cnh" ? "default" : "outline"}
          onClick={() => onSelect("cnh")}
          className={`flex flex-col items-center p-6 gap-2 ${
            documentType === "cnh" ? "bg-purple-600 hover:bg-purple-700" : ""
          }`}
        >
          <FileText className="h-8 w-8" />
          <span>CNH</span>
        </Button>
      </div>
    </div>
  );
}