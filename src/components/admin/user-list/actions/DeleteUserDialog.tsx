
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ProfileWithSponsor } from "@/types/profile";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  userName: string;
  user?: ProfileWithSponsor;
}

export function DeleteUserDialog({ 
  isOpen, 
  onOpenChange, 
  onDelete, 
  userName, 
  user 
}: DeleteUserDialogProps) {
  // Format display name - if userName is empty, try to get info from user object
  const displayName = userName || (user ? (user.full_name || user.email || user.custom_id || "Usuário") : "Usuário");
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Tem certeza que deseja excluir o usuário "{displayName}"? Esta ação não pode ser desfeita.
            </p>
            
            {user && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                <h4 className="font-medium mb-2">Informações do usuário:</h4>
                <ul className="space-y-1">
                  {user.full_name && <li><span className="font-medium">Nome:</span> {user.full_name}</li>}
                  {user.email && <li><span className="font-medium">Email:</span> {user.email}</li>}
                  {user.custom_id && <li><span className="font-medium">ID:</span> {user.custom_id}</li>}
                  {user.status && <li><span className="font-medium">Status:</span> {user.status}</li>}
                  {user.sponsor && <li><span className="font-medium">Afiliado:</span> {user.sponsor.full_name || user.sponsor.email}</li>}
                </ul>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
