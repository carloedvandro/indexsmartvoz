
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/services/user/userDelete";
import { useToast } from "@/hooks/use-toast";

interface DeleteUserButtonProps {
  userId: string;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!userId) {
      toast({
        title: "Erro",
        description: "ID do usuário não fornecido",
        variant: "destructive",
      });
      return;
    }
    
    setIsDeleting(true);
    try {
      console.log("Iniciando exclusão do usuário:", userId);
      await deleteUser(userId);
      
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso",
      });
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao excluir o usuário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Excluir Usuário</h2>
      <p className="mb-4">ID do usuário: {userId}</p>
      <Button 
        variant="destructive" 
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Excluindo..." : "Excluir Usuário"}
      </Button>
    </div>
  );
}
