
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface UsageInfoDisplayProps {
  label: string;
  used: number;
  limit: number;
  unit: string;
  isUnlimited?: boolean;
}

export const UsageInfoDisplay: React.FC<UsageInfoDisplayProps> = ({
  label,
  used,
  limit,
  unit,
  isUnlimited = false
}) => {
  const percentage = isUnlimited ? 100 : Math.min((used / limit) * 100, 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600">
          {isUnlimited ? (
            'Ilimitado'
          ) : (
            `${used}${unit} de ${limit}${unit}`
          )}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
