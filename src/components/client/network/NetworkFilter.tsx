
import React from "react";
import { Button } from "@/components/ui/button";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold text-lg mb-4">Filtrar por Nível</h3>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => onLevelChange("all")}
          className={`${
            selectedLevel === "all" 
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          } w-full justify-start`}
          variant={selectedLevel === "all" ? "default" : "outline"}
          style={{ 
            backgroundColor: selectedLevel === "all" ? "#660099" : "",
            borderColor: selectedLevel === "all" ? "#660099" : ""
          }}
        >
          Todos os Níveis
        </Button>
        
        <Button
          onClick={() => onLevelChange("1")}
          className={`${
            selectedLevel === "1" 
              ? "border-purple-500 text-purple-700" 
              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          } w-full justify-start`}
          variant="outline"
          style={{ 
            borderColor: selectedLevel === "1" ? "#660099" : "",
            color: selectedLevel === "1" ? "#660099" : "" 
          }}
        >
          Nível 1
        </Button>
        
        <Button
          onClick={() => onLevelChange("2")}
          className={`${
            selectedLevel === "2" 
              ? "border-purple-500 text-purple-700" 
              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          } w-full justify-start`}
          variant="outline"
          style={{ 
            borderColor: selectedLevel === "2" ? "#660099" : "",
            color: selectedLevel === "2" ? "#660099" : "" 
          }}
        >
          Nível 2
        </Button>
        
        <Button
          onClick={() => onLevelChange("3")}
          className={`${
            selectedLevel === "3" 
              ? "border-purple-500 text-purple-700" 
              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          } w-full justify-start`}
          variant="outline"
          style={{ 
            borderColor: selectedLevel === "3" ? "#660099" : "",
            color: selectedLevel === "3" ? "#660099" : "" 
          }}
        >
          Nível 3
        </Button>
        
        <Button
          onClick={() => onLevelChange("4")}
          className={`${
            selectedLevel === "4" 
              ? "border-purple-500 text-purple-700" 
              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          } w-full justify-start`}
          variant="outline"
          style={{ 
            borderColor: selectedLevel === "4" ? "#660099" : "",
            color: selectedLevel === "4" ? "#660099" : "" 
          }}
        >
          Nível 4
        </Button>
      </div>
    </div>
  );
};
