
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { isSunday } from "date-fns";

interface DueDateCalendarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  dueDates: number[];
  selectedStyle: null;
}

export function DueDateCalendar({
  date,
  onDateSelect,
  dueDates,
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
      className="rounded-md border bg-white w-full p-4"
      classNames={{
        day_today: "text-center w-full",
        day: "h-9 w-9 text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 mx-auto",
        head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] text-center",
        cell: "h-9 w-9 text-center relative p-0 text-center justify-center items-center [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 text-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-center",
        table: "w-full border-collapse space-y-1 text-center",
      }}
      disabled={(date) => !dueDates.includes(date.getDate())}
    />
  );
}
