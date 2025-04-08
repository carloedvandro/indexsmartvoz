
import React from 'react';
import { MonthCard } from './MonthCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MonthData {
  month: string;
  day: string;
  active: boolean;
  upValue: number;
  downValue: number;
}

interface MonthsCarouselProps {
  months: MonthData[];
  activeMonth: string;
  setActiveMonth: (month: string) => void;
}

export function MonthsCarousel({ months, activeMonth, setActiveMonth }: MonthsCarouselProps) {
  // Calculate total up and down values
  const totalUpValue = months.reduce((sum, month) => sum + month.upValue, 0);
  const totalDownValue = months.reduce((sum, month) => sum + month.downValue, 0);

  return (
    <div className="px-6 mb-6 relative">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-gray-400/30 hover:bg-gray-400/50 text-white h-8 w-8 rounded-full" />
        <CarouselContent className="py-2">
          {months.map((monthData, index) => (
            <CarouselItem key={index} className="basis-auto md:basis-1/3 lg:basis-1/5 pl-2 pr-2 first:pl-2 last:pr-2">
              <MonthCard 
                month={monthData.month} 
                day={monthData.day} 
                active={monthData.month === activeMonth} 
                onClick={() => setActiveMonth(monthData.month)}
                upValue={monthData.upValue}
                downValue={monthData.downValue}
              />
            </CarouselItem>
          ))}
          
          {/* Total Card */}
          <CarouselItem className="basis-auto md:basis-1/3 lg:basis-1/5 pl-2 pr-2 last:pr-2">
            <div className="min-w-full p-4 rounded-xl text-center bg-[#0E1C36] text-white shadow">
              <div className="font-medium">Total</div>
              <div className="flex justify-center mt-2 text-sm">
                <span className="mr-2 text-green-400">↑ {totalUpValue}</span>
                <span className="text-red-400">↓ {totalDownValue}</span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-gray-400/30 hover:bg-gray-400/50 text-white h-8 w-8 rounded-full" />
      </Carousel>
    </div>
  );
}
