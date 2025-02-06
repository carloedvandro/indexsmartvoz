
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
        available: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white",
        holiday: "text-blue-600 font-medium"
      }}
      className="rounded-md border bg-white col-span-2 w-full max-w-lg mx-auto p-4
        [&_.rdp-months]:w-full 
        [&_.rdp-month]:w-full 
        [&_.rdp-table]:w-full 
        [&_.rdp-cell]:p-0
        [&_.rdp-head_cell]:p-2.5 
        [&_.rdp-head_cell]:text-sm 
        [&_.rdp-head_cell]:font-medium
        [&_.rdp-head_cell:first-child]:text-blue-600
        [&_.rdp-head_cell]:text-gray-600
        [&_.rdp-day]:w-10 
        [&_.rdp-day]:h-10
        [&_.rdp-day]:text-center
        [&_.rdp-day]:text-sm
        [&_.rdp-day]:font-medium
        [&_.rdp-day]:text-gray-600
        [&_.rdp-day]:rounded-none
        [&_.rdp-day_button]:w-full
        [&_.rdp-day_button]:h-full
        [&_.rdp-day_button]:font-medium
        [&_.rdp-tbody]:grid 
        [&_.rdp-tbody]:grid-cols-7 
        [&_.rdp-tbody]:gap-0
        [&_.rdp-tfoot]:hidden
        [&_.rdp-nav_button]:hover:bg-transparent
        [&_.rdp-nav_button]:focus:shadow-none
        [&_.rdp-nav_button_previous]:text-gray-600
        [&_.rdp-nav_button_next]:text-gray-600
        [&_.rdp-caption]:mb-4
        [&_.rdp-caption_label]:text-lg
        [&_.rdp-caption_label]:font-medium
        [&_.rdp-caption_label]:text-gray-800
        scrollbar-hide overflow-hidden"
      disabled={(date) => !dueDates.includes(date.getDate())}
    />
  );
}
