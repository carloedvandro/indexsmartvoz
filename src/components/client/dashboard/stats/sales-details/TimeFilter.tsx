
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TimePeriod, getTimePeriodLabel } from "./salesDetailsData";

interface TimeFilterProps {
  activePeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export function TimeFilter({ activePeriod, onPeriodChange }: TimeFilterProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <p className="text-sm font-medium text-black">Período:</p>
      </div>
      <ToggleGroup 
        type="single" 
        value={activePeriod}
        onValueChange={(value: TimePeriod) => {
          if (value) onPeriodChange(value);
        }}
        className="justify-start border rounded-md p-1 bg-gray-50"
      >
        <ToggleGroupItem 
          value="daily" 
          className="text-xs px-3 py-1 data-[state=on]:bg-white data-[state=on]:shadow-sm"
          aria-label="Visualizar dados diários"
        >
          Diário
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="weekly" 
          className="text-xs px-3 py-1 data-[state=on]:bg-white data-[state=on]:shadow-sm"
          aria-label="Visualizar dados semanais"
        >
          Semanal
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="monthly" 
          className="text-xs px-3 py-1 data-[state=on]:bg-white data-[state=on]:shadow-sm"
          aria-label="Visualizar dados mensais"
        >
          Mensal
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
