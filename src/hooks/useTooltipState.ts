
import { useState } from "react";

interface TooltipState {
  visible: boolean;
  position: { x: number; y: number };
  value: number;
  paymentMethod: 'pix' | 'boleto';
}

export function useTooltipState() {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    visible: false,
    position: { x: 0, y: 0 },
    value: 0,
    paymentMethod: 'pix'
  });

  const handleProgressBarHover = (event: React.MouseEvent, amount: number, paymentMethod: string, enter: boolean) => {
    if (enter) {
      const rect = event.currentTarget.getBoundingClientRect();
      
      setTooltipState({
        visible: true,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.top
        },
        value: amount,
        paymentMethod: paymentMethod as 'pix' | 'boleto'
      });
    } else {
      setTooltipState(prev => ({ ...prev, visible: false }));
    }
  };

  return {
    tooltipState,
    handleProgressBarHover
  };
}
