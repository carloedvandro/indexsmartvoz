
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
        available: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-normal",
        holiday: "text-[#ea384c] font-normal"
      }}
      className="rounded-md border bg-white w-full -mt-[20px] overflow-hidden"
      classNames={{
        day_today: "font-normal",
        day: "h-10 w-10 p-0 font-normal text-black text-center flex items-center justify-center aria-selected:opacity-100 hover:bg-gray-100 focus:bg-gray-100",
        head_cell: "text-muted-foreground font-normal text-[0.8rem] w-10 flex items-center justify-center",
        cell: "text-center h-10 w-10 p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        table: "w-full border-collapse",
        nav: "space-x-1 flex items-center justify-between px-1 pt-1 pb-3",
        caption: "text-lg font-medium pt-1 uppercase tracking-wide text-blue-500",
        row: "flex w-full mt-2"
      }}
      disabled={(date) => !dueDates.includes(date.getDate())}
    />
  );
}
