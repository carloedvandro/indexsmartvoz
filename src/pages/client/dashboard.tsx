import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { RevenueChart } from "@/components/client/dashboard/charts/RevenueChart";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { useProfile } from "@/hooks/useProfile";
import { generateRevenueData } from "@/components/client/dashboard/utils/statsUtils";

export default function ClientDashboard() {
  const { data: profile } = useProfile();
  const revenueData = generateRevenueData();

  return (
    <div className="min-h-screen bg-gray-50/40">
      <DashboardHeader />
      <main className="container mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <ProfileCard profile={profile} />
          </div>
          <div className="md:col-span-8">
            <PlansCard />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <RevenueChart data={revenueData} variant="neon" />
          <NetworkStatsCard />
        </div>
      </main>
    </div>
  );
}