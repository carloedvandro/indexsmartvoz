
import React from 'react';
import { ProfileCard } from "./ProfileCard";
import { NetworkCard } from "./NetworkCard";
import { SalesDetailsCard } from "./stats/SalesDetailsCard";
import { ProfileWithSponsor } from '@/types/profile';

interface DashboardCardsProps {
  profile: ProfileWithSponsor;
  networkStats: {
    level1Count: number;
    level2Count: number;
    level3Count: number;
    level4Count: number;
  } | null;
  handleNetworkClick: () => void;
}

export function DashboardCards({ profile, networkStats, handleNetworkClick }: DashboardCardsProps) {
  return (
    <div className="container">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="w-full max-w-[420px] mx-auto">
          <SalesDetailsCard />
        </div>
        <div className="w-full max-w-[420px] mx-auto">
          <ProfileCard profile={profile} />
        </div>
        <div className="w-full max-w-[420px] mx-auto">
          <NetworkCard 
            networkStats={networkStats} 
            onClick={handleNetworkClick} 
          />
        </div>
      </div>
    </div>
  );
}
