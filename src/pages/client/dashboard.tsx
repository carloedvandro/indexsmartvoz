
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { Carousel3D } from "@/components/client/dashboard/Carousel3D";

export default function ClientDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader />
      
      {/* Novo Carrossel 3D */}
      <div className="rounded-lg overflow-hidden shadow-xl">
        <Carousel3D />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileCard />
        <NetworkCard />
        <NetworkStatsCard />
        <PlansCard />
      </div>
    </div>
  );
}
