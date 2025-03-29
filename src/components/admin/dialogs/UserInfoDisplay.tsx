
import { ProfileWithSponsor } from "@/types/profile";
import { formatDate } from "@/utils/format";

interface UserInfoDisplayProps {
  user: ProfileWithSponsor | null;
}

export function UserInfoDisplay({ user }: UserInfoDisplayProps) {
  if (!user) return null;
  
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md border">
      <h3 className="text-sm font-semibold mb-2">Informações do usuário</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {user.id && <div><span className="font-medium">ID: </span>{user.id}</div>}
        {user.created_at && <div><span className="font-medium">Criado em: </span>{formatDate(user.created_at)}</div>}
        {user.updated_at && <div><span className="font-medium">Atualizado em: </span>{formatDate(user.updated_at)}</div>}
        {user.sponsor && (
          <div><span className="font-medium">Afiliado: </span>{user.sponsor.full_name || user.sponsor.email || user.sponsor.custom_id}</div>
        )}
      </div>
    </div>
  );
}
