
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { isSunday } from "date-fns";
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
        available: (date) => dueDates.includes(date.getDate()),
        holiday: (date) => isSunday(date)
      }}
      modifiersClassNames={{
        available: `bg-[${selectedStyle?.theme_color || '#9b87f5'}] text-white hover:bg-[${selectedStyle?.hover_color || '#7E69AB'}] hover:text-white shadow-md`,
        holiday: "text-[#ea384c] font-bold"
      }}
      className="rounded-md border bg-white col-span-2 w-full max-w-lg mx-auto [&_.rdp]:p-0 [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-cell]:p-0 [&_.rdp-head_cell]:p-2 [&_.rdp-head_cell]:text-sm [&_.rdp-head_cell:first-child]:text-[#ea384c] [&_.rdp-head_cell:first-child]:font-bold [&_.rdp-table]:w-full [&_.rdp-table]:border-collapse [&_.rdp-day]:w-10 [&_.rdp-day]:h-10 [&_.rdp-day]:rounded-[${selectedStyle?.border_radius || '0.5rem'}] [&_.rdp-day]:m-0.5 [&_.rdp-day_span]:text-[${selectedStyle?.date_font_size || '1rem'}] [&_.rdp-day_span]:font-medium [&_.rdp-tbody]:grid [&_.rdp-tbody]:grid-cols-7 [&_.rdp-tbody]:gap-0 [&_.rdp-tfoot]:hidden scrollbar-hide overflow-hidden"
      disabled={(date) => !dueDates.includes(date.getDate())}
    />
  );
}
