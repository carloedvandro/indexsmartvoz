import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DDDInput } from "./DDDInput";
import { InternetSelector } from "./InternetSelector";
import { PriceSummary } from "./PriceSummary";

interface PlanSelectionStepProps {
  selectedLines: Line[];
  setSelectedLines: (lines: Line[]) => void;
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
}

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
};

export function PlanSelectionStep({
  selectedLines,
  setSelectedLines,
  selectedDueDate,
  setSelectedDueDate,
}: PlanSelectionStepProps) {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const { data, error } = await supabase
          .from('network_plans')
          .select('*')
          .eq('active', true);
        
        if (error) {
          console.error('Error fetching plans:', error);
          return;
        }

        if (data) {
          setPlans(data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    }

    fetchPlans();
  }, []);

  const addLine = () => {
    const newLine: Line = {
      id: selectedLines.length + 1,
      internet: "",
      type: "",
      ddd: "",
      price: 0,
    };
    setSelectedLines([...selectedLines, newLine]);
  };

  const removeLine = (id: number) => {
    setSelectedLines(selectedLines.filter((line) => line.id !== id));
  };

  const updateLine = (id: number, field: keyof Line, value: string | number) => {
    setSelectedLines(
      selectedLines.map((line) => {
        if (line.id === id) {
          if (field === 'internet') {
            const selectedPlan = plans.find(p => p.code === value);
            return { 
              ...line, 
              [field]: String(value), // Ensure value is converted to string
              price: selectedPlan ? selectedPlan.price : 0
            };
          }
          return { ...line, [field]: value };
        }
        return line;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {selectedLines.map((line) => (
          <div key={line.id} className="space-y-4">
            <InternetSelector
              selectedInternet={line.internet}
              onInternetChange={(value) => updateLine(line.id, "internet", value)}
              plans={plans}
              internetOptions={[]}
            />
            <DDDInput
              value={line.ddd}
              onChange={(value) => updateLine(line.id, "ddd", value)}
            />
            {selectedLines.length > 1 && (
              <button
                onClick={() => removeLine(line.id)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remover linha
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedLines.length < 3 && (
        <button
          onClick={addLine}
          className="text-[#8425af] hover:text-[#6c1e8f] text-sm"
        >
          + Adicionar outra linha
        </button>
      )}

      <PriceSummary
        selectedLines={selectedLines}
        selectedDueDate={selectedDueDate}
        setSelectedDueDate={setSelectedDueDate}
      />
    </div>
  );
}