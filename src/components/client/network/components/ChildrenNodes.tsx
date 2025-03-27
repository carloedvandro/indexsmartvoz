
import { NetworkMember } from "../types";
import { NetworkNode } from "../NetworkNode";

interface ChildrenNodesProps {
  children: NetworkMember[];
  depth: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
  isAllLevels: boolean;
  isVaniaTree: boolean;
}

export const ChildrenNodes = ({ 
  children, 
  depth, 
  onToggle, 
  expandedNodes, 
  isAllLevels,
  isVaniaTree
}: ChildrenNodesProps) => {
  return (
    <div className={`mt-6 space-y-4 mb-8 ${isVaniaTree ? 'ml-[25.5px]' : 'ml-5'}`}>
      {children.map((child) => (
        <NetworkNode
          key={child.id}
          member={child}
          depth={depth + 1}
          onToggle={onToggle}
          expandedNodes={expandedNodes}
          isAllLevels={isAllLevels}
        />
      ))}
    </div>
  );
};
