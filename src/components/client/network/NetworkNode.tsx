
import { motion } from "framer-motion";
import { NetworkMember } from "./types";
import { UserAvatar } from "./components/UserAvatar";
import { ProfileInfo } from "./components/ProfileInfo";
import { ExpandButton } from "./components/ExpandButton";
import { calculateNodeMargin, calculateNodeVerticalMargin } from "./utils/layoutUtils";

interface NetworkNodeProps {
  member: NetworkMember;
  depth?: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
  isAllLevels?: boolean;
}

export const NetworkNode = ({ 
  member, 
  depth = 0, 
  onToggle, 
  expandedNodes, 
  isAllLevels = true 
}: NetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isActive = member.user.status === 'active';
  const currentLevel = depth + 1;
  
  const isVaniaTree = member.user.custom_id === 'vania' || 
                     (member.parent_id && member.user.custom_id?.startsWith('vania-'));
  
  const leftMargin = calculateNodeMargin(member, depth, isAllLevels);
  const topMargin = calculateNodeVerticalMargin(member);
  
  const width = `calc(100% - ${depth === 0 ? -3 : 5}px)`;
  
  const handleToggle = () => onToggle(member.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative w-full ${depth > 0 ? 'mt-10' : ''} mb-6 NetworkNode`}
      style={{ 
        marginLeft: leftMargin, 
        marginTop: topMargin !== '0px' ? topMargin : undefined,
        width 
      }}
      data-user-id={member.user.custom_id}
      data-member-name={member.user.full_name}
      data-node-id={member.id}
      data-custom-id={member.user.custom_id}
    >
      <div className="flex items-start gap-2 w-full">
        {hasChildren && (
          <ExpandButton isExpanded={isExpanded} onClick={handleToggle} />
        )}
        
        <div className="flex items-start gap-3 flex-1">
          <UserAvatar 
            name={member.user.full_name} 
            isActive={isActive} 
            currentLevel={currentLevel} 
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1" style={{ marginTop: '4mm' }}>
              <h3 className="text-base font-semibold text-black truncate">
                {member.user.full_name || "Usuário"}
              </h3>
              <span className={`text-xs font-semibold ${
                isActive ? 'text-green-600' : 'text-red-600 pending-status'
              }`} style={{ position: 'relative', top: isActive ? '0' : '2px' }}>
                {isActive ? 'Ativo' : 'Pendente'}
              </span>
            </div>

            <ProfileInfo member={member} isFilteredView={false} />
          </div>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className={`mt-6 space-y-6 mb-6 ${isVaniaTree ? 'ml-[25.5px]' : ''}`}>
          {member.children.map((child) => (
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
      )}
    </motion.div>
  );
};
