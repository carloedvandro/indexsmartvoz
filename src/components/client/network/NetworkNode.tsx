
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { NetworkMember } from "./types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UserAvatar } from "./components/UserAvatar";
import { UserDetails } from "./components/UserDetails";
import { calculateTotalTeamSize } from "./utils/networkUtils";

interface NetworkNodeProps {
  member: NetworkMember;
  depth?: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
  isAllLevels?: boolean;
}

export const NetworkNode = ({ member, depth = 0, onToggle, expandedNodes, isAllLevels = true }: NetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isActive = member.user.status === 'active';
  
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";

  const formattedDate = member.user.registration_date 
    ? format(parseISO(member.user.registration_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    : null;

  const totalTeamSize = calculateTotalTeamSize(member);
  const currentLevel = depth + 1;

  const isRuiTree = member.user.full_name === 'Rui Barbosa' || 
                    (member.parent_id && member.user.custom_id?.startsWith('rui-'));
  
  const isVaniaTree = member.user.custom_id === 'vania' || 
                     (member.parent_id && member.user.custom_id?.startsWith('vania-'));

  const isDavidForgat = member.user.full_name === 'David Forgat';
  
  const isCarolinaTree = member.user.full_name?.trim() === 'Carolina Bezzera e Silva';
  
  const isRubensTree = member.user.full_name === 'Rubens Valin';
  
  // Adding 4px additional right margin when showing all levels (isAllLevels is true)
  const allLevelsMargin = isAllLevels ? '4px' : '0px';
  
  const style = {
    marginLeft: isDavidForgat ? `calc(-9px + ${allLevelsMargin})` : // David mantém a margem original + novo ajuste
                isCarolinaTree ? `calc(29mm + ${allLevelsMargin})` : // Carolina 29mm para direita + novo ajuste
                isRubensTree ? `calc(5.5mm + ${allLevelsMargin})` : // Rubens 5.5mm para direita + novo ajuste
                depth === 2 ? `calc(8px + ${allLevelsMargin})` : 
                isRuiTree ? `calc(10px + ${allLevelsMargin})` : 
                member.user.custom_id === 'vania' ? `calc(25.5px + ${allLevelsMargin})` :
                (depth === 0 ? `calc(-3px + ${allLevelsMargin})` : `calc(5px + ${allLevelsMargin})`),
    width: `calc(100% - ${depth === 0 ? -3 : 5}px)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative w-full overflow-visible ${depth > 0 ? 'mt-10' : ''} mb-12`}
      style={style}
    >
      <div className="flex items-start gap-2 w-full">
        {hasChildren && (
          <ToggleButton 
            isExpanded={isExpanded} 
            onToggle={() => onToggle(member.id)} 
          />
        )}
        
        <div className="flex items-start gap-3 flex-1">
          <UserAvatar 
            profileImage={profileImage}
            fullName={member.user.full_name}
            isActive={isActive}
            level={currentLevel}
          />

          <UserDetails 
            fullName={member.user.full_name}
            isActive={isActive}
            customId={member.user.custom_id}
            formattedDate={formattedDate}
            directCount={member.children?.length || 0}
            teamSize={totalTeamSize}
          />
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <ChildrenNodes 
          children={member.children}
          depth={depth}
          onToggle={onToggle}
          expandedNodes={expandedNodes}
          isAllLevels={isAllLevels}
          isVaniaTree={isVaniaTree}
        />
      )}
    </motion.div>
  );
};

interface ToggleButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const ToggleButton = ({ isExpanded, onToggle }: ToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="p-1 hover:text-primary rounded-full flex-shrink-0"
      style={{ marginTop: '4mm', marginLeft: '-0.5mm' }}
      aria-label={isExpanded ? "Recolher" : "Expandir"}
    >
      <RotateCw 
        className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        style={{ color: '#660099' }}
      />
    </button>
  );
};

interface ChildrenNodesProps {
  children: NetworkMember[];
  depth: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
  isAllLevels: boolean;
  isVaniaTree: boolean;
}

const ChildrenNodes = ({ 
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
