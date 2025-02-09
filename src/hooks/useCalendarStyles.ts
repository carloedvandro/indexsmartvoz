
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarStyle } from "@/types/calendar";

export const useCalendarStyles = () => {
  return useQuery({
    queryKey: ["calendar-styles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calendar_styles")
        .select("*")
        .eq("active", true)
        .single();

      if (error) {
        console.error("Error fetching calendar styles:", error);
        throw error;
      }

      return data as CalendarStyle;
    },
  });
};
