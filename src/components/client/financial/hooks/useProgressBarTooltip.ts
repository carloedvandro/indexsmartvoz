
import { useState } from "react";

export function useProgressBarTooltip() {
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    position: { x: number; y: number };
    value: number;
    paymentMethod: 'pix' | 'boleto';
  }>({
    visible: false,
    position: { x: 0, y: 0 },
    value: 0,
    paymentMethod: 'pix'
  });

  const handleProgressBarHover = (event: React.MouseEvent, amount: number, status: string, enter: boolean) => {
    if (enter) {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const progressWidth = rect.width;

      // Dividir a barra em duas partes: 60% Pix (esquerda) e 40% Boleto (direita)
      const pixWidth = progressWidth * 0.6;
      const isPixArea = mouseX <= pixWidth;

      const paymentMethod: 'pix' | 'boleto' = isPixArea ? 'pix' : 'boleto';
      const value = isPixArea ? amount * 0.6 : amount * 0.4; // 60% Pix, 40% Boleto

      setTooltipState({
        visible: true,
        position: {
          x: rect.left + mouseX,
          y: rect.top
        },
        value,
        paymentMethod
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
