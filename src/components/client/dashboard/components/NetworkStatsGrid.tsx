import { StatCard } from "../charts/StatCard";
import { formatCurrency } from "@/utils/format";

interface NetworkStatsGridProps {
  cardData: Array<{
    title: string;
    value: string;
    data: Array<{ name: string; value: number }>;
    color: string;
  }>;
}

export const NetworkStatsGrid = ({ cardData }: NetworkStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cardData.map((card, index) => (
        <div key={index} className="w-full">
          <StatCard
            title={card.title}
            value={card.value}
            data={card.data}
            color={card.color}
          />
        </div>
      ))}
    </div>
  );
};