
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NoDataTooltipProps {
  children: React.ReactNode;
  show: boolean;
}

export function NoDataTooltip({ children, show }: NoDataTooltipProps) {
  if (!show) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white px-3 py-2 rounded-md text-sm border-0">
          <p>Não há dados para visualizar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
