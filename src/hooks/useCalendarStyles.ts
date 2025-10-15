
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CalendarStyle = {
  id: string;
  name: string;
  theme_color: string;
  hover_color: string;
  border_radius: string;
  date_font_size: string;
}

export function useCalendarStyles() {
  return useQuery({
    queryKey: ['calendar-styles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calendar_styles')
        .select('*')
        .eq('name', 'default')
        .single();

      if (error) throw error;
      return data as CalendarStyle;
    }
  });
}
