
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

interface PaymentDetailsDialogProps {
  user: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentDetailsDialog = ({ user, isOpen, onOpenChange }: PaymentDetailsDialogProps) => {
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
          <DialogTitle className="text-xl">Detalhes de pagamento do usuário</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p>Carregando detalhes do usuário...</p>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Dados bancários</h3>
              <div className="grid grid-cols-4 gap-4 border rounded-md p-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Nome do banco</p>
                  <p className="font-medium">{userDetails?.bank_name || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Número de conta</p>
                  <p className="font-medium">{userDetails?.account_number || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Nome da conta</p>
                  <p className="font-medium">{userDetails?.account_name || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Código IFSC</p>
                  <p className="font-medium">{userDetails?.ifsc_code || "-"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">E-mails do Paypal</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium">{userDetails?.paypal_email || "-"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Detalhes do Usuário</h3>
              <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Primeiro nome</p>
                  <p className="font-medium">{userDetails?.full_name?.split(' ')[0] || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Sobrenome</p>
                  <p className="font-medium">
                    {userDetails?.full_name ? userDetails.full_name.split(' ').slice(1).join(' ') : "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Usuário</p>
                  <p className="font-medium">{userDetails?.custom_id || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium">{userDetails?.email || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{userDetails?.mobile || userDetails?.phone || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium">{userDetails?.address || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Estado</p>
                  <p className="font-medium">{userDetails?.state || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">País</p>
                  <p className="font-medium">{userDetails?.country || "-"}</p>
                </div>
              </div>
            </div>
          </>
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
