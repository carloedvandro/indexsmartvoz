
import { Calendar, GraduationCap, Users2, UserPlus2 } from "lucide-react";

interface UserDetailsProps {
  fullName: string | null;
  isActive: boolean;
  customId: string | null;
  formattedDate: string | null;
  directCount: number;
  teamSize: number;
}

export const UserDetails = ({ 
  fullName, 
  isActive, 
  customId, 
  formattedDate, 
  directCount, 
  teamSize 
}: UserDetailsProps) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col gap-1" style={{ marginTop: '4mm' }}>
        <h3 className="text-base font-semibold text-black truncate">
          {fullName || "Usuário"}
        </h3>
        <span className={`text-xs font-semibold ${
          isActive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isActive ? 'Ativo' : 'Pendente'}
        </span>
      </div>

      <div className="space-y-3 text-sm mt-8">
        <div className="flex items-center gap-2 text-black">
          <GraduationCap className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
          <span className="truncate">Meu ID: {customId || "Não definido"}</span>
        </div>
        
        {formattedDate && (
          <div className="flex items-center gap-2 text-black">
            <Calendar className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
            <span className="truncate">Cadastro: {formattedDate}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-black">
          <UserPlus2 className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
          <span>Diretos: {directCount}</span>
        </div>
        
        <div className="flex items-center gap-2 text-black">
          <Users2 className="h-4 w-4 flex-shrink-0" style={{ color: '#660099' }} />
          <span>Equipe: {teamSize}</span>
        </div>
      </div>
    </div>
  );
};
