
import { InternetSelector } from "@/components/client/products/InternetSelector";
import { DDDInput } from "@/components/client/products/DDDInput";

interface InternetOption {
  value: string;
  label: string;
  price: number;
}

interface PlanSelectionFormProps {
  selectedInternet: string;
  setSelectedInternet: (internet: string) => void;
  selectedDDD: string;
  setSelectedDDD: (ddd: string) => void;
  internetOptions: InternetOption[];
}

export function PlanSelectionForm({
  selectedInternet,
  setSelectedInternet,
  selectedDDD,
  setSelectedDDD,
  internetOptions
}: PlanSelectionFormProps) {
  return (
    <div className="w-full max-w-[340px] mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InternetSelector
            selectedInternet={selectedInternet}
            onInternetChange={setSelectedInternet}
            internetOptions={internetOptions}
            showPrice={false}
          />
        </div>
        <div>
          <DDDInput
            ddd={selectedDDD}
            onDDDChange={setSelectedDDD}
          />
        </div>
      </div>
    </div>
  );
}
