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
      <div className="flex h-screen">
        <ClientSidebar />
        <main className="flex-1 bg-[#F8F9FE]">
          <DashboardHeader />
          <div className="h-[calc(100vh-64px)] overflow-auto">
            <div className="container mx-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <ProfileCard profile={profile} />
                <NetworkCard networkStats={networkStats} onClick={handleNetworkClick} />
                <PlansCard />
              </div>
              <NetworkStatsCard />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}