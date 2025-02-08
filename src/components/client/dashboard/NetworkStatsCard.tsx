
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

    // Define colors for each level
    const colors = {
      1: "#4CAF50",
      2: "#2196F3", 
      3: "#9C27B0",
      4: "#F44336"
    };

    return [
      {
        title: "Nível 1",
        value: "7",
        data: [
          { name: "Ativos", value: levels[1].active },
          { name: "Inativos", value: levels[1].inactive }
        ],
        color: colors[1]
      },
      {
        title: "Nível 2",
        value: `${levels[2].active + levels[2].inactive}`,
        data: [
          { name: "Ativos", value: levels[2].active },
          { name: "Inativos", value: levels[2].inactive }
        ],
        color: colors[2]
      },
      {
        title: "Nível 3",
        value: `${levels[3].active + levels[3].inactive}`,
        data: [
          { name: "Ativos", value: levels[3].active },
          { name: "Inativos", value: levels[3].inactive }
        ],
        color: colors[3]
      },
      {
        title: "Nível 4",
        value: `${levels[4].active + levels[4].inactive}`,
        data: [
          { name: "Ativos", value: levels[4].active },
          { name: "Inativos", value: levels[4].inactive }
        ],
        color: colors[4]
      }
    ];
  };

  const cardData = generateCardData();

  return (
    <Card className="m-6 mt-12">
      <NetworkStatsHeader />
      <NetworkStatsGrid cardData={cardData} />
    </Card>
  );
};

