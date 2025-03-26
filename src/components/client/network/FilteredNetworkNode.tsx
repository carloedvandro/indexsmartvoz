
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Users, Calendar, GraduationCap, Users2, UserPlus2, UserCheck, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { NetworkMember } from "./types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

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
      className="relative w-full overflow-hidden"
    >
      <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg w-full">
        <div className="flex items-start gap-2">
          {hasChildren && (
            <button
              onClick={() => onToggle(member.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label={isExpanded ? "Recolher" : "Expandir"}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          <div className="w-full">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
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

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-black truncate">
                    {member.user.full_name || "Usuário"}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {isActive ? 'Ativo' : 'Pendente'}
                  </span>
                </div>

                <div className="space-y-1 text-sm mt-2">
                  <div className="flex items-center gap-2 text-black">
                    <GraduationCap className="h-4 w-4" style={{ color: '#660099' }} />
                    <span className="truncate">Meu ID: {member.user.custom_id || "Não definido"}</span>
                  </div>
                  
                  {formattedDate && (
                    <div className="flex items-center gap-2 text-black">
                      <Calendar className="h-4 w-4" style={{ color: '#660099' }} />
                      <span className="truncate">Cadastro: {formattedDate}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-black">
                    <UserPlus2 className="h-4 w-4" style={{ color: '#660099' }} />
                    <span>Diretos: {member.children?.length || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-black">
                    <Users2 className="h-4 w-4" style={{ color: '#660099' }} />
                    <span>Equipe: {totalTeamSize}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
