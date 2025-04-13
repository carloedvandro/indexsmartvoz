
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

  // Calculate margin and style based on view type
  const marginClass = isFilteredView ? "ml-[2.3px]" : "ml-[-17.5mm]"; 
  
  // Ajustado para 6px a mais (estava apenas 8mm)
  const marginTop = isFilteredView ? "calc(3mm + 15.2px + 6px)" : "calc(8mm + 6px)";

  return (
    <div className={`space-y-1 text-sm ${marginClass} profile-info-container`} style={{ marginTop }}>
      <div className="flex items-center gap-2 text-black">
        <GraduationCap className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
        <span className="truncate">Meu ID: Smartvoz</span>
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
