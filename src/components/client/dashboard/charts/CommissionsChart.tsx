
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NetworkCommissionHistory } from "@/types/commission";

export const CommissionsChart = () => {
  const { data: commissions } = useQuery<NetworkCommissionHistory[]>({
    queryKey: ["network_commission_history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("network_commission_history")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching commission history:", error);
        throw error;
      }

      return data;
    }
  });

  const chartData = commissions?.map((commission) => ({
    level: commission.level,
    amount: commission.amount,
    paid: commission.paid,
    date: new Date(commission.created_at).toLocaleDateString()
  })) || [];

  return (
    <div className="w-full h-96">
      {/* Add your chart implementation here */}
    </div>
  );
};
