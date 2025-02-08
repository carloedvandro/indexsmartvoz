
import { useProfile } from "@/hooks/useProfile";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { Card } from "@/components/ui/card";

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || '');

  const generateCardData = () => {
    const levels = {
      1: { active: 0, inactive: 0 },
      2: { active: 0, inactive: 0 },
      3: { active: 0, inactive: 0 },
      4: { active: 0, inactive: 0 },
    };

    const countMembers = (members) => {
      members.forEach((member) => {
        if (member.level >= 1 && member.level <= 4) {
          if (member.user?.status?.toLowerCase() === "active") {
            levels[member.level].active++;
          } else {
            levels[member.level].inactive++;
          }
        }

        if (member.children?.length > 0) {
          countMembers(member.children);
        }
      });
    };

    if (networkData) {
      countMembers(networkData);
    }

    return [
      {
        title: "Nível 1",
        value: levels[1].active + levels[1].inactive,
        activeCount: levels[1].active,
        inactiveCount: levels[1].inactive
      },
      {
        title: "Nível 2",
        value: levels[2].active + levels[2].inactive,
        activeCount: levels[2].active,
        inactiveCount: levels[2].inactive
      },
      {
        title: "Nível 3",
        value: levels[3].active + levels[3].inactive,
        activeCount: levels[3].active,
        inactiveCount: levels[3].inactive
      },
      {
        title: "Nível 4",
        value: levels[4].active + levels[4].inactive,
        activeCount: levels[4].active,
        inactiveCount: levels[4].inactive
      }
    ];
  };

  const cardData = generateCardData();

  return (
    <Card className="m-6">
      <NetworkStatsHeader />
      <NetworkStatsGrid cardData={cardData} />
    </Card>
  );
};
