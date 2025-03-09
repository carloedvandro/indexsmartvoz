
import { StatsCard } from "@/components/ui/stats-card";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {cardData.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
};
