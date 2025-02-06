
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarStyle = {
  id: string;
  name: string;
  theme_color: string;
  hover_color: string;
  border_radius: string;
  date_font_size: string;
};

interface CalendarStyleSelectorProps {
  selectedStyle: CalendarStyle | null;
  onStyleChange: (style: CalendarStyle) => void;
}

export function CalendarStyleSelector({ 
  selectedStyle, 
  onStyleChange 
}: CalendarStyleSelectorProps) {
  const { data: calendarStyles } = useQuery({
    queryKey: ['calendarStyles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calendar_styles')
        .select('*');
      
      if (error) throw error;
      return data as CalendarStyle[];
    }
  });

  return (
    <Select
      value={selectedStyle?.id}
      onValueChange={(value) => {
        const style = calendarStyles?.find(s => s.id === value);
        if (style) onStyleChange(style);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Escolha o estilo do calendário" />
      </SelectTrigger>
      <SelectContent>
        {calendarStyles?.map((style) => (
          <SelectItem key={style.id} value={style.id}>
            {style.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
