
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { NetworkMember } from "./types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UserAvatar } from "./components/UserAvatar";
import { UserDetails } from "./components/UserDetails";
import { calculateTotalTeamSize } from "./utils/networkUtils";

interface FilteredNetworkNodeProps {
  member: NetworkMember;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const FilteredNetworkNode = ({ member, onToggle, expandedNodes }: FilteredNetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isActive = member.user.status === 'active';
  
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";

  const formattedDate = member.user.registration_date 
    ? format(parseISO(member.user.registration_date), "dd/MM/yyyy 'às' HH:mm'h'", { locale: ptBR })
    : null;

  const totalTeamSize = calculateTotalTeamSize(member);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full overflow-visible mb-16"
    >
      <div className="flex items-start gap-2 w-full">
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
            profileImage={profileImage}
            fullName={member.user.full_name}
            isActive={isActive}
            level={member.level || ""}
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
        <div className="mt-6 space-y-4 mb-4 ml-5">
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
