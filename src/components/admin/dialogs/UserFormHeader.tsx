
import { ProfileWithSponsor } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

interface UserFormHeaderProps {
  user: ProfileWithSponsor | null;
}

export function UserFormHeader({ user }: UserFormHeaderProps) {
  return (
    <div className="bg-[#5438a0] text-white p-4 flex items-center">
      <div className="bg-[#4a3195] p-2 rounded-full mr-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM6 12a6 6 0 1112 0v0M5.25 19h13.5c.414 0 .75-.336.75-.75 0-2.5-2.5-7.25-7.5-7.25S4.5 15.75 4.5 18.25c0 .414.336.75.75.75z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <DialogTitle className="text-xl font-bold m-0">{user?.id ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
      
      <div className="ml-auto text-sm">
        Página inicial do administrador &gt; Lista de Usuário &gt; {user?.id ? 'Editar Usuário' : 'Adicionar Usuário'}
      </div>
    </div>
  );
}
