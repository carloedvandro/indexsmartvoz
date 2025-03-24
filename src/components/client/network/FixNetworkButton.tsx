
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { WrenchIcon } from "lucide-react";

interface FixNetworkButtonProps {
  userId: string;
  id?: string;
  className?: string;
}

export const FixNetworkButton = ({ userId, id, className }: FixNetworkButtonProps) => {
  const [isFixing, setIsFixing] = useState(false);
  const queryClient = useQueryClient();

  const handleFix = async () => {
    if (!userId) {
      toast.error("ID do usuário não encontrado");
      return;
    }
    
    try {
      setIsFixing(true);
      toast.info("Verificando relacionamentos de rede...");

      // 1. Check if this user has a network entry
      const { data: userNetworkData, error: userNetworkError } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (userNetworkError) {
        console.error("Error checking network:", userNetworkError);
        toast.error("Erro ao verificar rede");
        return;
      }

      // Create network entry if it doesn't exist
      if (!userNetworkData) {
        const { data: newNetwork, error: createError } = await supabase
          .from("network")
          .insert({
            user_id: userId,
            level: 1
          })
          .select();

        if (createError) {
          console.error("Error creating network entry:", createError);
          toast.error("Erro ao criar entrada de rede");
          return;
        }

        toast.success("Entrada de rede criada com sucesso");
      }

      // 2. Find all users with this user as sponsor but no network connection
      const { data: sponsoredProfiles, error: sponsoredError } = await supabase
        .from("profiles")
        .select("id, custom_id, full_name")
        .eq("sponsor_id", userId);

      if (sponsoredError) {
        console.error("Error finding sponsored profiles:", sponsoredError);
        toast.error("Erro ao buscar perfis patrocinados");
        return;
      }

      if (!sponsoredProfiles || sponsoredProfiles.length === 0) {
        toast.info("Nenhum perfil patrocinado encontrado");
        setIsFixing(false);
        return;
      }

      // Get the network ID for this user
      const { data: networkEntry, error: networkEntryError } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (networkEntryError || !networkEntry) {
        console.error("Error getting network entry:", networkEntryError);
        toast.error("Erro ao obter entrada de rede");
        setIsFixing(false);
        return;
      }

      // 3. Check and create network entries for sponsored users
      let fixedCount = 0;
      let createdCount = 0;
      
      for (const profile of sponsoredProfiles) {
        // Check if they already have a network entry
        const { data: existingNetwork, error: existingNetworkError } = await supabase
          .from("network")
          .select("id, parent_id")
          .eq("user_id", profile.id)
          .maybeSingle();

        if (existingNetworkError) {
          console.error(`Error checking network for ${profile.full_name}:`, existingNetworkError);
          continue;
        }

        if (!existingNetwork) {
          // Create new network entry
          const { error: createNetworkError } = await supabase
            .from("network")
            .insert({
              user_id: profile.id,
              parent_id: networkEntry.id,
              level: 2 // Direct child
            });

          if (createNetworkError) {
            console.error(`Error creating network for ${profile.full_name}:`, createNetworkError);
            continue;
          }

          createdCount++;
        } else if (existingNetwork.parent_id !== networkEntry.id) {
          // Update existing network entry
          const { error: updateNetworkError } = await supabase
            .from("network")
            .update({
              parent_id: networkEntry.id,
              level: 2 // Direct child
            })
            .eq("id", existingNetwork.id);

          if (updateNetworkError) {
            console.error(`Error updating network for ${profile.full_name}:`, updateNetworkError);
            continue;
          }

          fixedCount++;
        }
      }

      if (createdCount > 0 || fixedCount > 0) {
        let message = "";
        if (createdCount > 0) {
          message += `Criado ${createdCount} relacionamento(s) de rede. `;
        }
        if (fixedCount > 0) {
          message += `Corrigido ${fixedCount} relacionamento(s) de rede.`;
        }
        toast.success(message);
      } else {
        toast.info("Todos os relacionamentos de rede estão corretos");
      }

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['networkData', userId] });
      
    } catch (error) {
      console.error("Error fixing network:", error);
      toast.error("Erro ao corrigir rede");
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleFix}
      disabled={isFixing}
      id={id}
      className={className || ""}
    >
      <WrenchIcon className="h-4 w-4 mr-2" />
      {isFixing ? "Corrigindo..." : "Corrigir Relações"}
    </Button>
  );
};
