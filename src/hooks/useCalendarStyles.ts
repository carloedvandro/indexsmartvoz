
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface CalendarStyle {
  id: string;
  name: string;
  theme_color: string;
  hover_color: string;
  border_radius: number;
  date_font_size: number;
  created_at: string;
}

export const useCalendarStyles = () => {
  const [styles, setStyles] = useState<CalendarStyle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        // Como a tabela calendar_styles não existe, retornamos estilos padrão
        const defaultStyles: CalendarStyle[] = [
          {
            id: '1',
            name: 'Padrão',
            theme_color: '#3b82f6',
            hover_color: '#2563eb',
            border_radius: 8,
            date_font_size: 14,
            created_at: new Date().toISOString()
          }
        ];
        
        setStyles(defaultStyles);
      } catch (error) {
        console.error('Erro ao buscar estilos:', error);
        setStyles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStyles();
  }, []);

  return {
    styles,
    isLoading
  };
};
