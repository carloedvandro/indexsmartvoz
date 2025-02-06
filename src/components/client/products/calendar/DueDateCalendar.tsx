
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarStyle } from "./CalendarStyleSelector";

interface DueDateCalendarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  dueDates: number[];
  selectedStyle: CalendarStyle | null;
}

export function DueDateCalendar({
  date,
  onDateSelect,
  dueDates,
  selectedStyle
}: DueDateCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={onDateSelect}
      locale={ptBR}
      modifiers={{
        available: (date) => dueDates.includes(date.getDate())
      }}
      modifiersClassNames={{
        available: `bg-[${selectedStyle?.theme_color || '#9b87f5'}] text-white hover:bg-[${selectedStyle?.hover_color || '#7E69AB'}] hover:text-white shadow-md`
      }}
      className={`rounded-md border bg-white col-span-2 [&_.rdp-cell]:justify-center [&_.rdp-cell]:flex [&_.rdp-table]:w-full [&_.rdp-head_div]:justify-center [&_.rdp-head_div]:w-full [&_.rdp-caption]:justify-center [&_.rdp]:justify-center [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-day]:w-12 [&_.rdp-day]:h-12 [&_.rdp-day]:rounded-[${selectedStyle?.border_radius || '0.5rem'}] [&_.rdp-day]:flex [&_.rdp-day]:items-center [&_.rdp-day]:justify-center [&_.rdp-cell]:p-0 [&_.rdp-tbody]:justify-center [&_.rdp-tbody]:grid [&_.rdp-tbody]:grid-cols-7 [&_.rdp-tbody]:gap-1 [&_.rdp-table]:grid [&_.rdp-table]:grid-cols-7 [&_.rdp-table]:gap-1 [&_.rdp-day_span]:text-[${selectedStyle?.date_font_size || '1rem'}] [&_.rdp-day_span]:font-medium scrollbar-hide overflow-hidden`}
      disabled={(date) => !dueDates.includes(date.getDate())}
    />
  );
}
