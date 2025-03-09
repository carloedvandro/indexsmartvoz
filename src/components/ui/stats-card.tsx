
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number | ReactNode;
  className?: string;
  color?: string;
}

export function StatsCard({ title, value, className, color = "#00ca7d" }: StatsCardProps) {
  return (
    <div className={`relative rounded-xl border border-gray-200 bg-white p-4 overflow-hidden ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00ca7d] rounded-l-xl" style={{ backgroundColor: color }} />
      <div className="pl-2">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
