
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus } from "lucide-react";
import { UserActions } from "./UserActions";
import { ProfileWithSponsor } from "@/types/profile";
import { updateProfile } from "@/services/user/userUpdate";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/utils/format";

interface ExpandableRowProps {
  user: ProfileWithSponsor;
  index: number;
  isSelected: boolean;
  isExpanded: boolean;
  toggleSelection: () => void;
  toggleExpand: () => void;
  onEdit: (user: any) => void;
  displayCustomId: (user: any) => string;
  onDelete?: (userId: string) => void;
}

export const ExpandableRow = ({
  user,
  index,
  isSelected,
  isExpanded,
  toggleSelection,
  toggleExpand,
  onEdit,
  displayCustomId,
  onDelete
}: ExpandableRowProps) => {
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [lastSignIn, setLastSignIn] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndUpdateMobile = async () => {
      if (!user.id) return;

      try {
        const { data: latestUserData, error: fetchError } = await supabase
          .from("profiles")
          .select("mobile, whatsapp")
          .eq("id", user.id)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
          return;
        }

        let mobileToUse = "";
        let shouldUpdate = false;

        if (latestUserData.mobile && latestUserData.mobile.trim() !== "") {
          mobileToUse = latestUserData.mobile;
          shouldUpdate = false;
        } else if (latestUserData.whatsapp && latestUserData.whatsapp.trim() !== "") {
          mobileToUse = latestUserData.whatsapp;
          shouldUpdate = true;
        } else {
          mobileToUse = "+5588993734779";
          shouldUpdate = true;
        }

        setMobileNumber(mobileToUse);

        if (shouldUpdate) {
          await updateProfile(user.id, {
            mobile: mobileToUse
          });
          console.log("Mobile number updated for user:", user.full_name, "to", mobileToUse);
        }
      } catch (error) {
        console.error("Error in fetch and update process:", error);
      }
    };

    // Fetch last sign in date from user's profile information
    // Since we can't directly access auth.users table, we'll use the updated_at field from profiles
    // as an approximate indication of last activity
    const fetchLastActivity = async () => {
      if (!user.id) return;
      
      try {
        // Use profile's updated_at as a proxy for last sign in
        setLastSignIn(user.updated_at || null);
      } catch (error) {
        console.error("Error fetching last activity date:", error);
        setLastSignIn(null);
      }
    };

    fetchUserAndUpdateMobile();
    fetchLastActivity();
  }, [user.id, user.updated_at]);
  
  return (
    <>
      <TableRow className="border-b">
        <TableCell>
          <div className="flex items-center">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={toggleSelection}
              className="rounded border-gray-300 mr-2"
            />
            <span className="font-medium">{index + 1}</span>
            <button 
              className="ml-1 text-indigo-600 focus:outline-none"
              onClick={toggleExpand}
            >
              {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{user.full_name}</span>
            {displayCustomId(user) && (
              <span className="text-sm text-gray-500">Meu ID: {displayCustomId(user)}</span>
            )}
            <span className="text-sm text-blue-500">{user.email}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="italic text-gray-700">Plano não adquirido!</span>
            <a href="#" className="text-sm text-blue-500 hover:underline">Editar Plano</a>
          </div>
        </TableCell>
        <TableCell>
          {user.status === "pending" ? (
            <span className="text-red-500 font-medium">Pendente</span>
          ) : (
            <span className="text-green-500 font-medium">Ativo</span>
          )}
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{user?.sponsor?.full_name || "Não possui"}</span>
            {user?.sponsor?.custom_id && (
              <span className="text-sm text-gray-500">ID: {user.sponsor.custom_id}</span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <UserActions user={user} onEdit={onEdit} onDelete={onDelete} />
        </TableCell>
      </TableRow>
      
      {isExpanded && (
        <TableRow className="bg-gray-50">
          <TableCell className="w-10"></TableCell>
          <TableCell>
            <div className="text-sm text-gray-600">
              <p>Comissões Totais: R$0,00</p>
              <p>Celular: {mobileNumber}</p>
              <p>Último acesso: {formatDate(lastSignIn)}</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="text-sm text-gray-600">
              <p>Vendas/Comissões</p>
              <p>R$0,00 / R$0,00</p>
            </div>
          </TableCell>
          <TableCell>
          </TableCell>
          <TableCell>
            <div className="text-sm text-gray-600">
              <p>Comissão Paga: R$0,00</p>
            </div>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
    </>
  );
};
