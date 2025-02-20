
import React from 'react';
import { Line } from 'recharts';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DataPoint {
  date: string;
  usage: number;
}

interface DataUsageChartProps {
  dataUsage: DataPoint[];
}

export const DataUsageChart: React.FC<DataUsageChartProps> = ({ dataUsage }) => {
  if (!dataUsage?.length) return null;

  return (
    <div className="h-[200px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataUsage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#8425af"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
