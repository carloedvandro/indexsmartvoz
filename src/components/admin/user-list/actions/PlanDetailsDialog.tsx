
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchProfile } from "@/services/profileService";
import { ProfileWithSponsor } from "@/types/profile";
import { useToast } from "@/hooks/use-toast";

interface PlanDetailsDialogProps {
  user: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlanDetailsDialog = ({ user, isOpen, onOpenChange }: PlanDetailsDialogProps) => {
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState<ProfileWithSponsor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (isOpen && user?.id) {
        setIsLoading(true);
        try {
          const profileData = await fetchProfile(user.id);
          setUserDetails(profileData);
        } catch (error) {
          console.error("Failed to load user details:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os detalhes do usuário.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadUserDetails();
  }, [isOpen, user?.id, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Expiração do Plano</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p>Carregando detalhes do plano...</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="bg-blue-400 text-white p-4 text-center">
              <p>O status do seu plano é <strong>Ativo</strong>. Aguarde enquanto o status do seu plano muda</p>
            </div>
            
            <div className="border border-gray-200 rounded-md">
              <div className="p-4 border-b">
                <h3 className="font-medium">Plano de Associação</h3>
              </div>
              
              <div className="p-4 border-b">
                <h3 className="text-lg mb-2">Planta: <span className="text-green-500 font-semibold">PARCEIRO SMART INTERNET</span></h3>
              </div>
              
              <div className="grid grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <p>Dados do Plano</p>
                </div>
                <div className="p-4">
                  <p>19 de março de 2025 a 31/12/1969</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <p>Restantes Dias</p>
                </div>
                <div className="p-4 text-purple-600">
                  <p>Dias não disponíveis</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <p>Status do Plano</p>
                </div>
                <div className="p-4">
                  <span className="bg-green-400 text-white px-2 py-1 rounded-md text-sm">Ativo</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2">
                <div className="p-4 border-r">
                  <p>Ativo</p>
                </div>
                <div className="p-4">
                  <span className="bg-green-400 text-white px-2 py-1 rounded-md text-sm">Ativo</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="border-gray-300">
                Comprar Novo Plano
              </Button>
            </div>
            
            <div className="text-center text-gray-500 text-sm mt-10">
              <p>Direitos autorais © 2023 Rede de Internet Inteligente</p>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Fechar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
