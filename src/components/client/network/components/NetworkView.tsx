
import { NetworkMember } from "../types";
import { NetworkNode } from "../NetworkNode";
import { FilteredNetworkNode } from "../FilteredNetworkNode";

interface NetworkViewProps {
  filteredData: NetworkMember[];
  selectedLevel: string;
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
}

export const NetworkView = ({
  filteredData,
  selectedLevel,
  expandedNodes,
  toggleNode
}: NetworkViewProps) => {
  const isAllLevels = selectedLevel === "all";

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <p className="text-gray-700 text-lg">Nenhum membro encontrado neste nível.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedLevel === "all" ? (
        filteredData.map((member) => (
          <NetworkNode
            key={member.id}
            member={member}
            onToggle={toggleNode}
            expandedNodes={expandedNodes}
            isAllLevels={true}
          />
        ))
      ) : (
        filteredData.map((member) => (
          <FilteredNetworkNode
            key={member.id}
            member={member}
            onToggle={toggleNode}
            expandedNodes={expandedNodes}
            isAllLevels={false}
          />
        ))
      )}
    </div>
  );
};
