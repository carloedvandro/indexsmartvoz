import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { LoadingState } from "@/components/client/dashboard/LoadingState";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";

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
    <div className="min-h-screen bg-[#F8F9FE]">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 pb-32 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="w-full">
          <NetworkStatsCard />
        </div>
      </div>
    </div>
  );
}