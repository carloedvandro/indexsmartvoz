
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { NetworkMember } from "./types";
import { UserAvatar } from "./components/UserAvatar";
import { ProfileInfo } from "./components/ProfileInfo";

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

  // Log for debugging
  console.log("Renderizando membro filtrado:", member.user.full_name, "com ID:", member.user.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full overflow-hidden"
    >
      <div className="flex items-start w-full">
        {hasChildren && (
          <button
            onClick={() => onToggle(member.id)}
            className="p-1 hover:text-primary rounded-full flex-shrink-0"
            style={{ marginTop: '4mm', marginLeft: '-0.5mm' }}
            aria-label={isExpanded ? "Recolher" : "Expandir"}
          >
            <RotateCw 
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              style={{ color: '#660099' }}
            />
          </button>
        )}
        
        <div className="flex items-start gap-3 flex-1">
          <UserAvatar 
            name={member.user.full_name} 
            isActive={isActive} 
            currentLevel={currentLevel} 
          />

          <div className="flex-col min-w-0">
            <div className="flex flex-col" style={{ marginTop: '4mm', marginBottom: '2mm' }}>
              <h3 className="text-base font-semibold text-black truncate">
                {member.user.full_name || "Usuário"}
              </h3>
              <span className={`text-xs font-semibold ${
                isActive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isActive ? 'Ativo' : 'Pendente'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Always render the ProfileInfo component */}
      <ProfileInfo member={member} isFilteredView={true} />
      
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2 mb-2 ml-[25.5px]">
          {member.children.map((child) => (
            <FilteredNetworkNode
              key={child.id}
              member={child}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
