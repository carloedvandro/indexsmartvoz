
import React from "react";
import { NetworkMember } from "../types";
import { FilteredNetworkNode } from "../FilteredNetworkNode";

interface NetworkNodeChildrenProps {
  children: NetworkMember[];
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const NetworkNodeChildren: React.FC<NetworkNodeChildrenProps> = ({ 
  children, 
  onToggle, 
  expandedNodes 
}) => {
  if (!children || children.length === 0) return null;
  
  return (
    <div className="mt-6 space-y-6 mb-6 ml-[25.5px]">
      {children.map((child) => (
        <FilteredNetworkNode
          key={child.id}
          member={child}
          onToggle={onToggle}
          expandedNodes={expandedNodes}
        />
      ))}
    </div>
  );
};
