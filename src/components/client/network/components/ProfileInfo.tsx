
import { Calendar, GraduationCap, Users2, UserPlus2 } from "lucide-react";
import { NetworkMember } from "../types";
import { calculateTotalTeamSize } from "../utils/layoutUtils";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProfileInfoProps {
  member: NetworkMember;
  isFilteredView?: boolean;
}

export const ProfileInfo = ({ member, isFilteredView = false }: ProfileInfoProps) => {
  const formattedDate = member.user.registration_date 
    ? format(parseISO(member.user.registration_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    : null;
  
  const totalTeamSize = calculateTotalTeamSize(member);

  // Apply different margins based on view type - removing the negative margin
  const marginClass = isFilteredView ? "ml-0" : "ml-[-17mm]"; // Ajustado para mover mais para a esquerda

  return (
    <div className={`space-y-1 text-sm ${marginClass}`} style={{ marginTop: '8mm' }}>
      <div className="flex items-center gap-2 text-black">
        <GraduationCap className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
        <span className="truncate">Meu ID: {member.user.custom_id || "Não definido"}</span>
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
  );
};
