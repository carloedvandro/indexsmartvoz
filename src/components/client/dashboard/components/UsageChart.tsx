
import { DataUsageState } from "../types/dataUsage";

interface UsageChartProps {
  dataUsage: DataUsageState;
  getUsageInfo: () => JSX.Element;
}

export const UsageChart = ({ dataUsage, getUsageInfo }: UsageChartProps) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#8425af"
            strokeWidth="8"
            fill="none"
            strokeDasharray="351.86"
            strokeDashoffset={351.86 * (1 - dataUsage.percentage / 100)}
          />
          {dataUsage.bonusTotal > 0 && (
            <circle
              cx="64"
              cy="64"
              r="48"
              stroke="#e5e7eb"
              strokeWidth="4"
              fill="none"
            />
          )}
          {dataUsage.bonusTotal > 0 && (
            <circle
              cx="64"
              cy="64"
              r="48"
              stroke="#ff6b6b"
              strokeWidth="4"
              fill="none"
              strokeDasharray="301.59"
              strokeDashoffset={301.59 * (1 - dataUsage.bonusPercentage / 100)}
            />
          )}
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          {getUsageInfo()}
        </div>
      </div>
    </div>
  );
};
