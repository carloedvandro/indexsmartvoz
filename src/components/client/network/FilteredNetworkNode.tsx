
import { motion } from "framer-motion";
import { NetworkMember } from "./types";
import { ProfileInfo } from "./components/ProfileInfo";
import { ExpandButton } from "./components/ExpandButton";
import { UserNodeInfo } from "./components/UserNodeInfo";
import { NetworkNodeChildren } from "./components/NetworkNodeChildren";
import { NodePositioner } from "./components/NodePositioner";

interface FilteredNetworkNodeProps {
  member: NetworkMember;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const FilteredNetworkNode = ({ member, onToggle, expandedNodes }: FilteredNetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isActive = member.user.status === 'active';
  const currentLevel = 1; // For filtered views, we show everything at level 1
  
  const handleToggle = () => onToggle(member.id);

  return (
    <NodePositioner member={member}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative w-full overflow-hidden mb-6 FilteredNetworkNode"
        data-user-id={member.user.custom_id}
        data-member-name={member.user.full_name}
        data-node-id={member.id}
        data-custom-id={member.user.custom_id}
      >
        <div className="flex items-start w-full">
          {hasChildren && (
            <ExpandButton isExpanded={isExpanded} onClick={handleToggle} />
          )}
          
          <UserNodeInfo 
            member={member} 
            isActive={isActive} 
            currentLevel={currentLevel} 
          />
        </div>

        <ProfileInfo member={member} isFilteredView={true} />
        
        {hasChildren && isExpanded && (
          <NetworkNodeChildren 
            children={member.children} 
            onToggle={onToggle} 
            expandedNodes={expandedNodes} 
          />
        )}
      </motion.div>
    </NodePositioner>
  );
};
