
import React from "react";
import { TooltipProps } from "./types";

export const ExpenseTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md z-[9999]">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm font-bold">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};
