import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { LoadingState } from "@/components/client/dashboard/LoadingState";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: networkStats, isLoading: networkLoading } = useNetworkStats(profile?.id);

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  if (profileLoading || networkLoading) {
    return <LoadingState />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <ClientSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 max-w-[1400px] w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
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
              <NetworkStatsCard />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}