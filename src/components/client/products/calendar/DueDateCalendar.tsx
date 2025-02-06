
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
      className="rounded-md border bg-white"
      disabled={(date) => !dueDates.includes(date.getDate())}
    />
  );
}
