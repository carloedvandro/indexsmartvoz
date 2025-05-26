
interface PaymentTooltipProps {
  totalAmount: number;
  isVisible: boolean;
}

export function PaymentTooltip({ totalAmount, isVisible }: PaymentTooltipProps) {
  const formatCurrencyBR = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPaymentBreakdown = (totalAmount: number) => {
    const pixAmount = totalAmount * 0.6;
    const boletoAmount = totalAmount * 0.4;
    return { pixAmount, boletoAmount };
  };

  if (!isVisible) return null;

  const { pixAmount, boletoAmount } = getPaymentBreakdown(totalAmount);

  return (
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded text-sm whitespace-nowrap z-10">
      <div className="text-center">
        <div>Pix: {formatCurrencyBR(pixAmount)}</div>
        <div>Boleto: {formatCurrencyBR(boletoAmount)}</div>
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
    </div>
  );
}
