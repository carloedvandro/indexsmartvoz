
import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCurrencyInput, parseCurrencyInput, formatCurrencyDisplay } from "@/utils/format";

interface CurrencyInputProps extends Omit<React.ComponentProps<"input">, 'onChange' | 'value'> {
  value?: number;
  onChange?: (value: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value = 0, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(
      value > 0 ? formatCurrencyDisplay(value) : ''
    );

    React.useEffect(() => {
      if (value !== undefined) {
        const formattedValue = value > 0 ? formatCurrencyDisplay(value) : '';
        setDisplayValue(formattedValue);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const formatted = formatCurrencyInput(inputValue);
      const numericValue = parseCurrencyInput(formatted);
      
      setDisplayValue(formatted);
      
      if (onChange) {
        onChange(numericValue);
      }
    };

    return (
      <input
        type="text"
        className={cn(
          "flex h-9 w-full rounded-md bg-white px-3 py-1 text-base font-medium text-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 border-2 border-[#660099]",
          className
        )}
        style={{
          backgroundColor: 'white !important',
          WebkitBoxShadow: 'none !important',
          WebkitTextFillColor: 'black !important',
          boxShadow: 'none !important'
        }}
        value={displayValue}
        onChange={handleChange}
        autoComplete="off"
        ref={ref}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
