import { ReactNode } from "react";

interface ChartContainerProps {
  children: ReactNode;
}

export const ChartContainer = ({ children }: ChartContainerProps) => {
  return (
    <div className="w-full space-y-4 p-6 flex flex-col items-center">
      {children}
      <div className="h-[280px] w-full max-w-[1700px]">
        {children}
      </div>
    </div>
  );
};