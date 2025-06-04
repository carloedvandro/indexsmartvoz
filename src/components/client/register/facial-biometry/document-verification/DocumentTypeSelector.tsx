
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DocumentTypeSelectorProps {
  selectedDocType: 'rg' | 'cnh' | null;
  onDocTypeChange: (value: 'rg' | 'cnh') => void;
}

export const DocumentTypeSelector = ({ selectedDocType, onDocTypeChange }: DocumentTypeSelectorProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-4">Documento de Identidade</h3>
      
      <RadioGroup
        value={selectedDocType || ''}
        onValueChange={onDocTypeChange}
        className="mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rg" id="rg" />
          <Label htmlFor="rg">RG</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cnh" id="cnh" />
          <Label htmlFor="cnh">CNH</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
