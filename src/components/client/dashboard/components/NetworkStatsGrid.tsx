import { StatCard } from "../charts/StatCard";

interface NetworkStatsGridProps {
  cardData: Array<{
    title: string;
    value: string;
    data: Array<{
      name: string;
      value: number;
    }>;
    color: string;
  }>;
}

export const NetworkStatsGrid = ({ cardData }: NetworkStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <div key={index} className="w-full">
          <StatCard
            title={card.title}
            value={card.value}
            data={card.data}
            color="#5f0889"
          />
        </div>
      ))}
    </div>
  );
};