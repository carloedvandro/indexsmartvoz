import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { LoadingState } from "@/components/client/dashboard/LoadingState";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { WarpBackground } from "@/components/ui/warp-background";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: networkStats, isLoading: networkLoading } = useNetworkStats(profile?.id);

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  if (profileLoading || networkLoading) {
    return <LoadingState />;
  }

  if (profileError || !profile) {
    navigate("/client/login");
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <WarpBackground
        beamsPerSide={5}
        beamSize={8}
        beamDelayMax={2}
        beamDelayMin={0.2}
        beamDuration={2}
        perspective={150}
        gridColor="rgba(111, 89, 165, 0.1)"
      >
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pt-6">
              <div className="w-full">
                <ProfileCard profile={profile} />
              </div>
              <div className="w-full">
                <NetworkCard 
                  networkStats={networkStats} 
                  onClick={handleNetworkClick} 
                />
              </div>
              <div className="w-full">
                <PlansCard />
              </div>
            </div>
            <div className="px-4 pt-6 pb-8">
              <NetworkStatsCard />
            </div>
          </div>
        </main>
      </WarpBackground>
    </div>
  );
}