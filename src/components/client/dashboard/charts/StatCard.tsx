import { Card } from "@/components/ui/card";
import { LineGraph3D } from "./LineGraph3D";

interface StatCardProps {
  title: string;
  value: string;
  data: Array<{ name: string; value: number }>;
  color: string;
}

export const StatCard = ({ title, value, data, color }: StatCardProps) => {
  return (
    <Card className="p-6 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-muted-foreground pl-1">{title}</h3>
        <p className="text-2xl font-semibold mt-1 pl-1">{value}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <LineGraph3D data={data} color={color} />
      </div>
    </Card>
  );
};