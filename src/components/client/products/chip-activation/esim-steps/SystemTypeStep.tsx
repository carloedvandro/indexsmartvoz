
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface SystemTypeStepProps {
  systemType: 'android' | 'ios';
  onSystemTypeChange: (value: 'android' | 'ios') => void;
}

export function SystemTypeStep({ systemType, onSystemTypeChange }: SystemTypeStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Vamos começar escolhendo o sistema do celular que vai ter o eSIM ativado</h2>
      
      <div className="bg-gray-700 text-white p-4 rounded-lg flex items-start space-x-2">
        <AlertTriangle className="h-5 w-5 mt-1 flex-shrink-0" />
        <p className="text-sm">O aparelho precisa ter um eSIM pra ter o chip ativado</p>
      </div>

      <RadioGroup value={systemType} onValueChange={onSystemTypeChange}>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="android" id="android" />
            <Label htmlFor="android">Android</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ios" id="ios" />
            <Label htmlFor="ios">iOS (iPhone)</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}

