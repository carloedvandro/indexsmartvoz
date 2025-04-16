
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";

export const NetworkStatsCard = () => {
  return (
    <Card className="w-full">
      <NetworkStatsHeader />
      <CardContent className="py-4">
        <NetworkStatsGrid />
      </CardContent>
    </Card>
  );
};
