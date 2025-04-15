
import { StatCard } from "../charts/StatCard";

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
    <>
      {cardData.map((card, index) => (
        <div 
          key={index} 
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-200/20"
        >
          <h3 className="text-lg font-medium mb-2">{card.title}</h3>
          <p className="text-2xl font-bold" style={{ color: card.color }}>
            {card.value}
          </p>
        </div>
      ))}
    </>
  );
};
