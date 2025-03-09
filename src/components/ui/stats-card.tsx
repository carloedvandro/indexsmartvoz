
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number | ReactNode;
  className?: string;
  color?: string;
}

export function StatsCard({ title, value, className, color = "#5f0889" }: StatsCardProps) {
  return (
    <div className={`relative rounded-xl border border-gray-200 bg-white p-4 ${className}`}>
      <div className="pl-2">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
