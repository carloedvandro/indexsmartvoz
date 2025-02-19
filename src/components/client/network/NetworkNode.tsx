
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Users, Calendar, GraduationCap, Users2, UserPlus2, UserCheck, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
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
      className="relative w-full"
      style={{ 
        marginLeft: `${depth * 12}px`,
        width: `calc(100% - ${depth * 12}px)`
      }}
    >
      {depth > 1 && (
        <div 
          className="absolute left-[-12px] top-1/2 w-3 h-px bg-gray-300"
          style={{
            transform: "translateY(-50%)"
          }}
        />
      )}
      <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow overflow-visible" style={{ width: 'calc(100% + 8px)' }}>
        <div className="flex items-start w-full">
          <div className="flex items-start gap-2 w-full">
            {hasChildren && (
              <button
                onClick={() => onToggle(member.id)}
                className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
                aria-label={isExpanded ? "Recolher" : "Expandir"}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
            )}
            <div className="w-full min-w-0">
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative">
                    <Avatar className={`h-12 w-12 border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
                      <AvatarImage src={profileImage} alt={member.user.full_name || "Profile"} />
                      <AvatarFallback>
                        <Users className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <StatusIcon 
                      className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white p-0.5 ${
                        isActive ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 -ml-4">
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-black truncate mb-0.5">
                      {member.user.full_name || "Usuário"}
                    </h3>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isActive ? 'Ativo' : 'Pendente'}
                      </span>
                    </div>
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
          </div>
        </div>
      </Card>
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
