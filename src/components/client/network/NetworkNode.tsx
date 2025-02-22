
import { motion } from "framer-motion";
import { RotateCw, Users, Calendar, GraduationCap, Users2, UserPlus2, UserCheck, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NetworkMember } from "./types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NetworkNodeProps {
  member: NetworkMember;
  depth?: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const NetworkNode = ({ member, depth = 0, onToggle, expandedNodes }: NetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isActive = member.user.status === 'active';
  
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";

  const formattedDate = member.user.registration_date 
    ? format(parseISO(member.user.registration_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    : null;

  const calculateTotalTeamSize = (node: NetworkMember): number => {
    if (!node.children || node.children.length === 0) {
      return 0;
    }
    
    return node.children.reduce((total, child) => {
      return total + 1 + calculateTotalTeamSize(child);
    }, 0);
  };

  const totalTeamSize = calculateTotalTeamSize(member);
  const StatusIcon = isActive ? UserCheck : UserX;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative w-full ${depth > 0 ? 'mt-10' : ''}`}
      style={{ 
        marginLeft: depth === 0 ? '-3px' : '5px',
        width: `calc(100% - ${depth === 0 ? -3 : 5}px)`,
        marginTop: '3mm'
      }}
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
          <div className="relative">
            <Avatar className={`h-14 w-14 border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
              <AvatarImage src={profileImage} alt={member.user.full_name || "Profile"} />
              <AvatarFallback>
                <Users className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <StatusIcon 
              className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white p-0.5 ${
                isActive ? 'text-green-500' : 'text-red-500'
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-black truncate">
                {member.user.full_name || "Usuário"}
              </h3>
              <span className={`text-xs font-semibold ${
                isActive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isActive ? 'Ativo' : 'Pendente'}
              </span>
            </div>

            <div className="space-y-1 text-sm mt-2">
              <div className="flex items-center gap-2 text-black">
                <GraduationCap className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
                <span className="truncate">Meu ID: {member.user.custom_id || "-"}</span>
              </div>
              
              {formattedDate && (
                <div className="flex items-center gap-2 text-black">
                  <Calendar className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
                  <span className="truncate">Cadastro: {formattedDate}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-black">
                <UserPlus2 className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
                <span>Diretos: {member.children?.length || 0}</span>
              </div>
              
              <div className="flex items-center gap-2 text-black">
                <Users2 className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
                <span>Equipe: {totalTeamSize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2 mb-2">
          {member.children.map((child) => (
            <NetworkNode
              key={child.id}
              member={child}
              depth={depth + 1}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
