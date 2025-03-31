
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { NetworkMember } from "./types";
import { UserAvatar } from "./components/UserAvatar";
import { ProfileInfo } from "./components/ProfileInfo";
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
  
  const isMarcioSilva = member.user.full_name === 'Marcio Bettanzos da Silva';
  const isCarloGoncalves = member.user.full_name === 'Carlo Edvandro Camera Gonçalves';
  const isRudneyNobrega = member.user.full_name === 'Rudney de Souza Nobrega';
  const isGesiaAlmeida = member.user.full_name === 'Gesia Almeida Dos Santos';
  
  console.log('Nome do usuário:', member.user.full_name);
  console.log('ID personalizado:', member.user.custom_id);
  console.log('Margem aplicada:', leftMargin, 'Margem vertical:', topMargin);
  
  if (isRudneyNobrega) {
    console.log('RUDNEY ENCONTRADO!', member);
    console.log('Margem que será aplicada:', leftMargin);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative w-full ${depth > 0 ? 'mt-10' : ''} mb-6`}
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
          <button
            onClick={() => onToggle(member.id)}
            className="p-1 hover:text-primary rounded-full flex-shrink-0"
            style={{ marginTop: '4mm', marginLeft: '-0.5mm' }}
            aria-label={isExpanded ? "Recolher" : "Expandir"}
          >
            {isExpanded ? (
              <Minus
                className="h-4 w-4"
                style={{ color: '#660099', strokeWidth: 3 }}
              />
            ) : (
              <Plus
                className="h-4 w-4"
                style={{ color: '#660099', strokeWidth: 3 }}
              />
            )}
          </button>
        )}
        
        <div className="flex items-start gap-3 flex-1">
          <UserAvatar 
            name={member.user.full_name} 
            isActive={isActive} 
            currentLevel={currentLevel} 
          />

          <div className="flex-1 min-w-0">
            <div className={`flex flex-col gap-1 ${isGesiaAlmeida ? '' : ''}`} style={{ 
              marginTop: isGesiaAlmeida ? 'calc(4mm + 4px)' : '4mm' 
            }}>
              <h3 className="text-base font-semibold text-black truncate">
                {member.user.full_name || "Usuário"}
              </h3>
              <span className={`text-xs font-semibold ${
                isActive ? 'text-green-600' : 'text-red-600'
              }`}>
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
