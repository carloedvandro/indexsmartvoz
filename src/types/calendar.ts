
export interface CalendarStyle {
  id: string;
  name: string;
  theme_color: string;
  hover_color: string;
  border_radius: string;
  date_font_size: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
}
