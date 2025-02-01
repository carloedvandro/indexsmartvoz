import { Card } from "@/components/ui/card";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useProfile } from "@/hooks/useProfile";

// Sample data for demonstration
const cardData = [
  {
    title: "Total de Ganhos",
    value: "R$ 12.459,00",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    })),
    color: "#00d71c",
  },
  {
    title: "Ganhos Pendentes",
    value: "R$ 2.459,00",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    })),
    color: "#ff0000",
  },
  {
    title: "Ganhos do Mês",
    value: "R$ 459,00",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    })),
    color: "#5f0889",
  },
];

const glassVariants = [
  "glass-effect-1",
  "glass-effect-2",
  "glass-effect-3",
  "glass-effect-4",
  "glass-effect-5",
];

export function NetworkStatsCard() {
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  return (
    <div className="space-y-8">
      <NetworkStatsHeader />
      <div className="grid grid-cols-1 gap-8">
        {glassVariants.map((variant, index) => (
          <Card
            key={variant}
            className={`p-6 ${variant} transition-all duration-300 hover:shadow-xl`}
          >
            <h3 className="text-xl font-semibold mb-4">
              Modelo de Vidro {index + 1}
            </h3>
            <NetworkStatsGrid cardData={cardData} />
          </Card>
        ))}
      </div>
    </div>
  );
}