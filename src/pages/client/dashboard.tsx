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
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden">
        <ClientSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-0.5">
              <div className="pl-10 grid grid-cols-1 md:grid-cols-3 gap-0.5">
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
              <div className="pl-10 mt-0.5">
                <NetworkStatsCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}