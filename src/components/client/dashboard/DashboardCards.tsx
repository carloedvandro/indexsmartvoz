
import React from 'react';
import { ProfileCard } from "./ProfileCard";
import { NetworkCard } from "./NetworkCard";
import { PlansCard } from "./PlansCard";
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
    <div className="px-4 max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-24 -mt-[72px]">
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
  );
}
