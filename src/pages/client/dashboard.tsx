
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { Carousel3D } from "@/components/client/dashboard/Carousel3D";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  const handleNetworkClick = useCallback(() => {
    navigate('/client/network');
  }, [navigate]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader />
      
      {/* Novo Carrossel 3D */}
      <div className="rounded-lg overflow-hidden shadow-xl">
        <Carousel3D />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileCard profile={profile} />
        <NetworkCard 
          networkStats={networkStats || {
            level1Count: 0,
            level2Count: 0,
            level3Count: 0,
            level4Count: 0
          }}
          onClick={handleNetworkClick}
        />
        <NetworkStatsCard />
        <PlansCard />
      </div>
    </div>
  );
}
